// var emp1 = {name:'Alen',hireDate:(new Date('2012/03/15')),salary:50000,bonus:10000,'401k':2000}
// var emp2 = {name:'Kelly',hireDate:new Date('2012/07/15'),salary:45000,bonus:2000, '401k':1000}
// var emp3 = {name:'Mavis',hireDate:new Date('2011/02/15'),salary:50000,bonus:10000, '401k':1000}
// var emp4 = {name:'Steven',hireDate:new Date('2010/05/15'),salary:50000,bonus:10000, '401k':1000}
// var emp5 = {name:'Joe',hireDate:new Date('2013/09/15'),salary:50000,bonus:10000, '401k':2000}
// var emp6 = {name:'Austin',hireDate:new Date('2009/01/15'),salary:80000,bonus:20000, '401k':3000}

var emp1 = {firstName:'Alen',lastName:'Huang',hireDate:(new Date('2012/03/15')),salary:50000,bonus:10000,'401k':2000}
var emp2 = {firstName:'Kelly',lastName:'Chu',hireDate:new Date('2012/07/15'),salary:45000,bonus:2000, '401k':1000}
var emp3 = {firstName:'Mavis',lastName:'Li',hireDate:new Date('2011/02/15'),salary:50000,bonus:10000, '401k':1000}
var emp4 = {firstName:'Steven',lastName:'chen',hireDate:new Date('2010/05/15'),salary:50000,bonus:10000, '401k':1000}
var emp5 = {firstName:'Joe',lastName:'Yang',hireDate:new Date('2013/09/15'),salary:50000,bonus:10000, '401k':2000}
var emp6 = {firstName:'Austin',lastName:'Cheng',hireDate:new Date('2009/01/15'),salary:80000,bonus:20000, '401k':3000}

db = connect("mongodb://localhost:27017/tfb103");

db.employee.drop()
db.employee.insert([emp1,emp2,emp3,emp4,emp5,emp6])

var showCursorItems = function(cursor){
	while (cursor.hasNext()) {
   		printjson(cursor.next());
	}
}

// var cursor = db.employee.aggregate({
// 	$project:{
// 		name:'$name',
// 		_id:0,
// 		totalPay:{
// 			$add:["$salary","$bonus"]
// 		}
// 	}
// });
// showCursorItems(cursor);


// var cursor = db.employee.aggregate({
// 	$project:{
// 		name:'$name',
// 		_id:0,
// 		totalPay:{
// 			$subtract:[{$add:["$salary","$bonus"]}, "$401k"] 
// 		}
// 	}
// });
// showCursorItems(cursor);

// var cursor = db.employee.aggregate({
// 	$project:{
// 		name:'$firstName',
// 		_id:0,
// 		hireIn:{$month:'$hireDate'}
// 	}
// });
// showCursorItems(cursor);

// var cursor = db.employee.aggregate({
// 	$project:{
// 		name:'$firstName',
// 		_id:0,
// 		tenure:{
// 			$subtract:[{$year:new Date()},{$year:'$hireDate'}]
// 		}
// 	}
// });
// showCursorItems(cursor);

var cursor = db.employee.aggregate(
{
	'$project':{
		'fname':'$firstName',
        'lname':'$lastName',
		_id:0,
		email:{
			"$concat":[
				{"$substr":['$firstName',0,3]},
				".",
				{"$toLower":"$lastName"},
				"@gmail.com"
			]
			
		}
	}
}
// ,
// {$out: "mailxxx0323"}
);
showCursorItems(cursor);







