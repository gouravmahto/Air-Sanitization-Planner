# import redis
from lib.utilities.ConfigurationReader import *
from lib.Controller import *

import threading
import time

import os


webClientDir = 'web'
def clientDir(relPath):
    return webClientDir + "/" + relPath

@app.route('/images/<path:path>')
def send_images(path):
    return send_from_directory(clientDir('images'), path)

@app.route('/assets/<path:path>')
def send_assets(path):
    return send_from_directory(clientDir('assets'), path)

@app.route('/styles.css')
def send_css():
    return app.send_static_file(clientDir('styles.css'))

@app.route('/painter.html')
def send_painter():
    return app.send_static_file(clientDir('painter.html'))

@app.route('/mapreview.html')
def send_mapreview():
    return app.send_static_file(clientDir('mapreview.html'))

@app.route('/')
def send_index():
    return app.send_static_file(clientDir('index.html'))

@app.route('/addKey')
def api_addKey():
    controller.addKey()
    return jsonify(controller.getKeys())

@app.route('/getKeys')
def api_getKeys():
    return jsonify(controller.getKeys())

@app.route('/addPlan')
def api_addPlan():
    controller.addPlan()
    return jsonify(controller.getPlans())

@app.route('/getPlans')
def api_getPlans():
    return jsonify(controller.getPlans())

@app.route('/getGrid', methods=["POST"])
def api_getGrid():
    data = request.form
    return jsonify(controller.getGrid(data))

@app.route('/setGrid', methods=["POST"])
def api_setGrid():
    data = request.json
    controller.setGrid(data)
    return jsonify(controller.getGrid())

@app.route('/triggerRun', methods=["POST"])
def api_triggerRun():
    data = request.form
    print()
    print(data)
    print()
    controller.triggerRun(data)
    return jsonify(True)
    
@app.route('/changePlan', methods=["POST"])
def api_changePlan():
    data = request.json
    controller.changePlan(data)
    return jsonify(True)

@app.route('/isCompleted', methods=["POST"])
def api_isCompleted():
    return jsonify(controller.isCompleted())

@app.route('/resetRun', methods=["POST"])
def api_resetRun():
    data = request.form
    print()
    print(data)
    print()
    controller.resetRun(data)
    return jsonify(True)

@app.route('/estimate', methods=["POST"])
def api_estimate():
    data = request.form
    return jsonify(controller.getEstimate(data))


if __name__ == '__main__':
    config = GetConfiguration()
    app.run(debug=config["flaskdebug"], host=config["flaskhost"], \
        port=config["flaskport"])
