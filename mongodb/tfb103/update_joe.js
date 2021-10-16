
var showCursorItems = function(cursor){
	while (cursor.hasNext()) {
   		printjson(cursor.next());
	}
}
//-----------------------------------------
var joe = {name:'joe',friends:32,enemies:2}
print('::: 一開始 joe:')
printjson(joe);

db.users_update.insert(joe);

print('::: insert joe to mongoDB and findOne name = joe to dbJoe:');
var dbJoe = db.users_update.findOne({name:'joe'});
printjson(dbJoe);

print('::: 增加relationship 欄位 dbJoe:');
dbJoe.relationships = {friends: dbJoe.friends, enemies: dbJoe.enemies};
printjson(dbJoe);

dbJoe.username = dbJoe.name;
print('::: 增加username 欄位 dbJoe:');
printjson(dbJoe);

delete dbJoe.friends;
delete dbJoe.enemies;
delete dbJoe.name;
print('::: delete friends, enemies and name  dbJoe:');
printjson(dbJoe)

print('::: update dbJoe to mongoDB');
db.users_update.update({name:'joe'},dbJoe);

print('::: find joe from mongoDB again');
var dbJoe2 = db.users_update.findOne({username:'joe'});
printjson(dbJoe2);




