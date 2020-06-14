import threading
import time
import math


runStatus = {}

def DoRun(key, runStatus): 
    for _ in range(100):
        time.sleep(0.7)
        parcel = runStatus[key]
        x = parcel["x"]
        y = parcel["y"]
        decY = parcel["decY"]
        statusGrid = parcel["statusGrid"]

        print(statusGrid)

        if decY and y > 0:
            y -= 1
            statusGrid[x][y] = True
        elif decY and y == 0:
            decY = False
            x -= 1
            statusGrid[x][y] = True
        elif not decY and y < 9:
            y += 1
            statusGrid[x][y] = True
        elif not decY and y == 9:
            decY = True
            x -= 1
            statusGrid[x][y] = True
        
        parcel["x"] = x
        parcel["y"] = y
        parcel["decY"] = decY
        parcel["statusGrid"] = statusGrid
        runStatus[key] = parcel

        # for i in range(10):
        #     for j in range(10):
        #         print(statusGrid[i][j], end='\t')
        #     print('\n')
        # print('\n')




class Controller:
    def __init__(self):
        self.grid = [
            [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
            [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
            [  0,  0,  0,  0,  0,  0,  0,  0, 10,  0 ],
            [  0,  0,  0, 10, 10, 10, 10,  0,  0,  0 ],
            [  0,  0,  0, 10, 15, 20, 10,  0,  0,  0 ],
            [  0,  0,  0, 10, 10, 10, 10,  0,  0,  0 ],
            [  0,  0,  0,  0, 10, 10, 10,  0,  0,  0 ],
            [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
            [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
            [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
        ]
        self.apiKeys = ["Key001", "Key002"]
        self.statusGrid = [[False]*10 for i in range(10)]
        self.parcelH = {}
        self.completed = False
        self.plans = ["Plan001", "Plan002", "Plan003"]

        self.tasks = {}
        self.keyToParcel = {}

        for planId in self.plans:
            parcel = {
                "grid": [[self.grid[i][j] for j in range(10)] for i in range(10)],
                "statusGrid": [[self.statusGrid[i][j] for j in range(10)] for i in range(10)],
                "x": 9,
                "y": 10,
                "decY": True
            }
            self.parcelH[planId] = parcel

    def addKey(self):
        pass

    def getKeys(self):
        return self.apiKeys
    
    def addPlan(self):
        pass

    def getPlans(self):
        return self.plans

    def getGrid(self, data):
        statusG = None
        if data["key"] in self.keyToParcel:
            statusG = self.keyToParcel[data["key"]]["statusGrid"]

        return {
            "grid": self.grid, 
            "statusGrid": statusG
        }

    def getEstimate(self, data):
        statusG = None
        if data["key"] in self.keyToParcel:
            statusG = self.keyToParcel[data["key"]]["statusGrid"]

        flatGrid = []
        for i in range(10):
            for j in range(10):
                if statusG is None or (not statusG[i][j]):
                    flatGrid.append(self.grid[i][j])

        cost = 100 + sum(flatGrid)
        remainingTime = round(len(flatGrid) * 0.7, 2)
        chargePerc = len(flatGrid)
        progress = round(100 - len(flatGrid), 2)
        
        return {
            "cost": cost,
            "time": remainingTime,
            "charge": chargePerc,
            "progress": progress
        }

    def setGrid(self, data):
        self.grid = data
        print(self.grid)
        return self.grid

    def isCompleted(self):
        return self.completed

    def changePlan(self, data):
        self.statusGrid = self.parcelH[data["plan"]]["statusGrid"]
        self.grid = self.parcelH[data["plan"]["grid"]]
        self.completed = self.parcelH[data["plan"]]["completed"]

    def triggerRun(self, data):
        self.keyToParcel[data["key"]] = self.parcelH[data["plan"]]
        t = threading.Thread(target=DoRun, args=[data["key"], self.keyToParcel])
        self.tasks[data["key"]] = t

        print(data)
        print()
        print(self.keyToParcel[data["key"]])

        t.start()

    def resetRun(self, data):
        # self.keyToParcel[data["key"]] = self.parcelH[data["plan"]]
        # self.keyToParcel[data["key"]]["statusGrid"] = \
        #     [[False]*10 for i in range(10)]
        if data["key"] in self.keyToParcel:
            self.keyToParcel[data["key"]]["statusGrid"] = \
                [[False]*10 for i in range(10)]
            self.keyToParcel[data["key"]]["x"] = 9
            self.keyToParcel[data["key"]]["y"] = 10
            self.keyToParcel[data["key"]]["decY"] = True

            print()
            print("Parcel")
            print(self.keyToParcel[data["key"]])
            print()


