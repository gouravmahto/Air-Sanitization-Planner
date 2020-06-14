import redis
from lib.utilities.ConfigurationReader import *

def GetDb():
    config = GetConfiguration()
    return redis.Redis(host=config["redishost"], port=config["redisport"])
