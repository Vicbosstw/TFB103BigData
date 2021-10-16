from pymongo import MongoClient


# connection
conn = MongoClient("mongodb://127.0.0.1") 
db = conn["tfb103"]
collection = db.employee
for doc in collection.find():
	print(doc)

list_first_name = [ (employee.get('firstName') +' ' + employee.get('lastName') )for employee in collection.find()]
print('list_first_name: {}'.format(list_first_name))

