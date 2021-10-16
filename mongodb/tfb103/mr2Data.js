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


var article1 = {
	date:(new Date(2016,5,23)),
	url:"http://A",
	score: 90,
	tags:['mongodb']
}

// emit(this.tags[i],{"urls":[this.url]});
// "c++"       {"urls":["http://A"]}
// "mongodb"   {"urls":["http://A"]}

var article2 = {
	date:(new Date(2016,3,25)),
	url:"http://idealog.co.nz/workplace/2016/01/cpluscplusAndPython",
	score: 90,
	tags:['c++','python']
}

var article3 = {
	date:(new Date(2016,1,25)),
	url:"http://idealog.co.nz/workplace/2016/01/PythonAndBigData",
	score: 90,
	tags:['python','c++']
}

var article4 = {
	date:(new Date(2016,5,25)),
	url:"http://idealog.co.nz/workplace/2016/01/cPlusPlusAndNosql",
	score: 72,
	tags:['c++','java']
}

var article5 = {
	date:(new Date(2016,7,25)),
	url:"http://idealog.co.nz/workplace/2016/01/cplusplusAndMongdbAndJava",
	score: 90,
	tags:['java','mongodb']
}

var article6 = {
	date:(new Date(2017,11,17)),
	url:"http://123",
	score: 90,
	tags:['perl','nosql']
}

db.mr2Data.drop();
db.mr2Data.insert([article1,article2,article3,article4,article5,article6])

map = function(){
	for(var i in this.tags){
		//var recency = (1.0 / ((new Date() - this.date)) * (1000 * 60 * 60 * 24))
		//var score = recency * this.score

		emit(this.tags[i],{"urls":[this.url]});
		//emit(this.tags[i],{"url":this.url});
	}
};


reduce = function(key,emits){

	var total = {urls:[]}
	for(var i in emits){
		emits[i].urls.forEach(function(url){total.urls.push(url)})
		//total.urls.push(emits[i].url)
		//total.score += emits[i].score;
	}
	return total;
}

db.mr2Data.mapReduce(map,reduce,{out:'mr2DataResult'});
findAllAndShow('mr2DataResult');
