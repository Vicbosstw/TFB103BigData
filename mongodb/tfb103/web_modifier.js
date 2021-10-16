db = connect("localhost:27017/tfb103");

db.webs.drop();

var showCursorItems = function(cursor){
	while (cursor.hasNext()) {
   		printjson(cursor.next());
	}
}

var web1 = {url: 'www.example.com', pageviews: 1}
var web2 = {url: 'www.google.com', pageviews: 1}

db.webs.insert([web1,web2]);
// db.webs.insert(web1);
// db.webs.insert(web2);


// print('::: webs:')
// var cursor = db.webs.find();
// showCursorItems(cursor);

db.webs.update({url: 'www.example.com'},{$inc:{pageviews:1}});
//db.webs.update({},{$inc:{pageviews:1}},false,true);
print('::: pageviews + 1 => webs:')
var cursor = db.webs.find();
showCursorItems(cursor);

db.webs.update({url:'www.google.com'},{$inc:{pageviews:7}});
//db.webs.update({},{$inc:{pageviews:7}},{upsert:false,multi:true});
print('::: pageviews + 7 => webs:')
var cursor = db.webs.find();
showCursorItems(cursor);


