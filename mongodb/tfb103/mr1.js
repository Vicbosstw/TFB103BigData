
db = connect("localhost:27017/tfb103");

var showCursorItems = function(cursor){
	while (cursor.hasNext()) {
   		printjson(cursor.next());
	}
}

var findAllAndShow = function(coll_name){
	print('call findAll');
	var cursor = db[coll_name].find();
    showCursorItems(cursor);
}

var findOneAndShow = function(coll_name){
	printjson(db[coll_name].findOne());
}

db.mr1.drop();

// db.mr1.insert(
//  	[   
// 		{x:1,y:1,yyy:1},
// 		{y:1,z:1},
// 		{z:1,w:1,x:1},
// 		{z:1,yyy:1,ccc: 1},
// 		{x:1,w:1,z:1,yyy:1}
// 	]
// );

// var mapxx = function(){
// 	for(var key in this){
// 		if(key !== '_id'){
// 			emit(key,{count:1}); //丟 key value 給mongodb value固定是{count:1}
// 		}
// 	}
// }

// var mapxxx = function(){
// 	for(var key in this){
// 		if(key !== '_id'){
// 			emit(key,1); 
// 		}
// 	}
// }

// var reducexx = function(key,emits){
// 	total = 0;
// 	for(var i in emits){
// 		total+=emits[i].count;
// 	}
// 	return {count:total}
	
// }

// var reducexxx = function(key,emits){
// 	total = 0;
// 	for(var i of emits){
// 		total+=i;
// 	}
// 	return total
	
// }

// var mrResult = db.runCommand({'mapreduce':'mr1','map':mapxx,'reduce':reducexx,"out":{inline:1}});
// printjson(mrResult);

// var mrResult = db.mr1.mapReduce(mapxx,reducexx,{out:'coll_20210314'});
// findAllAndShow('coll_20210314');

// var mrResult = db.mr1.mapReduce(mapxxx,reducexxx,{out:'coll_20210314x'});
// findAllAndShow('coll_20210314x');





var mapxx = function(){
	emit(this["age"],{count:1});
}

var reducexx = function(key,emits){
	total = 0;
	for(var i in emits){
		total+=emits[i].count;
	}
	return {count:total};
}

var mrResult = db.usersNonIndex.mapReduce(mapxx,reducexx,{out:'coll_20210314x'});
findAllAndShow('coll_20210314x');


// var mrResult = db.runCommand({'mapreduce':'usersNonIndex','map':mapxx,'reduce':reducexx,"out":{inline:1}});
// printjson(mrResult);
