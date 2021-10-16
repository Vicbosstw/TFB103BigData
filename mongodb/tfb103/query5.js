
var showCursorItems = function(cursor){
	while (cursor.hasNext()) {
   		printjson(cursor.next());
	}
}

const db = connect("mongodb://localhost:27017/tfb103")

db.test.drop();

var user = {name:'Austin',age:30}; db.test.insert(user);
user.name = 'Zoooo'; user.age = 25; db.test.insert(user);
user.name = 'Justin'; user.age = 29; db.test.insert(user);

user.name = 'Hopper'; user.age = 27; db.test.insert(user);
user.name = 'Alan'; user.age = 35; db.test.insert(user);
user.name = 'Lisa'; user.age = 36; db.test.insert(user);

var cursor = db.test.find();
showCursorItems(cursor);





// var cursor = db.test.find().limit(3);
// showCursorItems(cursor);

var cursor1 = db.test.find().limit(3).sort({age: -1});
showCursorItems(cursor1)
print(cursor1)
print("-----------------------")
var cursor2 = db.test.find().sort({age:-1}).limit(3);
showCursorItems(cursor2)
print(cursor2)


//var cursor = db.test.find({},{name:1,_id:0,age:1}).sort({name:-1,age:-1});
// var cursor = db.test.find({},{age:1,_id:0,name:1}).sort({age:-1,name:-1});

//showCursorItems(cursor2);
