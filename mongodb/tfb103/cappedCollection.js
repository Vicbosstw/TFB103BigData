
var showCursorItems = function(cursor){
	while (cursor.hasNext()) {
   		printjson(cursor.next());
	}
}

db = connect("mongodb://localhost:27017/tfb103");

db.capped_coll.drop();

db.createCollection('capped_coll',
	{
		capped:true,
		size:20000, //maximum size in bytes for a capped collection.
		max:10 //maximum number of documents  
	}
);
for(i = 0; i < 100 ; i++){
	db.capped_coll.insert({x:i})
}

var cursor = db.capped_coll.find();

showCursorItems(cursor);

//printjson(db.capped_coll.stats());
