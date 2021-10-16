
var showCursorItems = function(cursor){
	while (cursor.hasNext()) {
   		printjson(cursor.next());
	}
}

var findAllAndShow = function(coll_name){
	print('call findAll');
	var cursor = db[coll_name].find({});
    showCursorItems(cursor);
}

const db = connect("mongodb://localhost:27017/tfb103")

// db.ttl_coll.drop();

// db.ttl_coll.createIndex({lastUpdated:1},{expireAfterSeconds:10})

// for(i = 0; i < 10 ; i++){
// 	db.ttl_coll.insert({x:i,lastUpdated:new Date()})
// }

findAllAndShow('ttl_coll');




