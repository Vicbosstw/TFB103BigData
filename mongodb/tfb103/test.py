import pymongo
from pymongo import MongoClient
client = MongoClient()
db = client.test_database
for i in db.inventory.find():
    print(i)