var s1 = {name:'Alan',grade:'B',score:83}
var s2 = {name:'Kelly',grade:'A',score:90}
var s3 = {name:'Hopper',grade:'C',score:77}
var s4 = {name:'Lisa',grade:'B',score:85}
var s5 = {name:'Steven',grade:'A',score:98}
var s6 = {name:'Mavis',grade:'D',score:62}
var s7 = {name:'Joe',grade:'D',score:69}
var s8 = {name:'Jay',grade:'A',score:91}
var s9 = {name:'Eileen',grade:'C',score:72}
var s10 = {name:'Casper',grade:'B',score:89}


var showCursorItems = function(cursor){
	while (cursor.hasNext()) {
   		printjson(cursor.next());
	}
}

const db = connect("mongodb://localhost:27017/tfb103")

db.scores.drop()


db.scores.insert([s1,s2,s3,s4,s5,s6,s7,s8,s9,s10])

printjson(db.scores.distinct("grade",{score:{$gt:60}}))


var cursor = db.scores.aggregate({
	$group:{
		_id:'$grade',
		lowestScore:{$min:'$score'},
		highestScore:{$max:'$score'}
	}
}
,{
	$sort:{_id:1}
}
);

showCursorItems(cursor);

print('-----------------------------');
var cursor = db.scores.aggregate(
{
	$sort:{score:1}
},
{
	$group:{
		_id:'$grade',
		'lowestScore':{$first:'$score'},
		'highestScore':{$last:'$score'}
	}
}
)

showCursorItems(cursor);


