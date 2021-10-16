
var showCursorItems = function(cursor){
	while (cursor.hasNext()) {
   		printjson(cursor.next());
	}
}

const db = connect("mongodb://localhost:27017/tfb103")

db.tmp.drop();

db.tmp.insert({_id:1,x:15});
db.tmp.insert({_id:2,x:[5,25]});
db.tmp.insert({_id:3,x:[12,13]});
db.tmp.insert({_id:4,x:[50,16]});


// cursor = db.tmp.find({x:{$gt:10,$lt:20}});
// showCursorItems(cursor);

// print("-----------------------------------------------------")

// cursor = db.tmp.find({x:{$elemMatch:{$gte:10,$lt:20}}});
// showCursorItems(cursor);

// cursor.forEach(function(x){
// 	print("data:");
// 	printjson(x);
// });

// cursor = db.tmp.find(
// 		{ 
// 			x:[50,16]
// 		});
// showCursorItems(cursor);



// db.tmp2.drop();
// db.tmp2.insert({ _id: 1, results: [ { product: "abc", score: 10 }, { product: "xyz", score: 5 } ] });
// db.tmp2.insert({ _id: 2, results: [ { product: "abc", score: 8 }, { product: "xyz", score: 7 } ] });
// db.tmp2.insert({ _id: 3, results: [ { product: "abc", score: 7 }, { product: "xyz", score: 8 } ] });

// cursor = db.tmp2.find(
//    { results: { $elemMatch: { product: "xyz", score: { $gte: 8 } } } }
// );
// showCursorItems(cursor);


















