
var showCursorItems = function(cursor){
	while (cursor.hasNext()) {
		printjson(cursor.next());
	}
}

const db = connect("mongodb://localhost:27017/tfb103")

db.tmp.drop();

db.tmp.insert({_id:2,x:15});
db.tmp.insert({_id:2,x:25});


var ResultErr = db.runCommand({getLastError:1});
if(ResultErr.err){
	printjson(ResultErr);
}






