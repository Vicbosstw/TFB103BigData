import pymongo
import json

db = pymongo.MongoClient().tfb103

rows = db.orders.aggregate([
   {
      "$lookup": {
         "from": "items",
         "localField": "item",
         "foreignField": "item",
         "as": "fromItems"
      }
   }
   ,
   {
      "$replaceRoot": { "newRoot": { "$mergeObjects": [ { "$arrayElemAt": [ "$fromItems", 0 ] }, "$$ROOT" ] } }
   }
   ,
   { "$project": { "fromItems": 0 } }
])


for row in rows:
  print(row)
