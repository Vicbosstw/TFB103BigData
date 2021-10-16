db = connect("localhost:27017/tfb103");
db.users_modifier.drop();

var showCursorItems = function(cursor){
	while (cursor.hasNext()) {
   		printjson(cursor.next());
	}
}

var joe = {
	name:'joe',
	age:30,
	sex:'male'
}
db.users_modifier.insert(joe);

var dbJoe = db.users_modifier.findOne();
print('::: joe:');
printjson(dbJoe);

db.users_modifier.update({_id:dbJoe._id},{$set:{'favorite book':'war and peace'}})

var dbJoe = db.users_modifier.findOne();
print('::: set favorite book joe:');
printjson(dbJoe);

db.users_modifier.update({_id:dbJoe._id},{$set:{'favorite book':'Green Eggs and Ham'}})
var dbJoe = db.users_modifier.findOne();
print('::: set favorite book again joe:');
printjson(dbJoe);

db.users_modifier.update({_id:dbJoe._id},{$set:{'favorite book':['book1','book2','book3']}})
var dbJoe = db.users_modifier.findOne();
print('::: set favorite book array joe:');
printjson(dbJoe);

db.users_modifier.update({_id:dbJoe._id},{$unset:{'favorite book':1}})
var dbJoe = db.users_modifier.findOne();
print('::: unset favorite book joe:');
printjson(dbJoe);


