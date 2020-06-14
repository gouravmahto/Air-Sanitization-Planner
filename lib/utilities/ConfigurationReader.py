import json

def GetConfiguration(configFilePath = "app.config.json"):
    data = None
    with open(configFilePath) as f:
        data = f.read()
    return json.loads(data)
    