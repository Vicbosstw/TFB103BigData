db = connect("localhost:27017/tfb103");

var showCursorItems = function(cursor){
	while (cursor.hasNext()) {
   		printjson(cursor.next());
	}
}

db.lookupPerson.drop();
db.lookupTel.drop();




var Justin = {_id:1, tel_group: "tel_justin" , name: "Justin"}

var Alan = {_id:2, tel_group: "tel_alan" , name: "Alan"}

var Kelly = {_id:3, tel_group: "tel_kelly" , name: "Kelly"}

db.lookupPerson.insert([Justin,Alan,Kelly]);


var justinTel_1 = { group:"tel_justin", tel:"0929888777" }
var justinTel_2 = { group:"tel_justin", tel:"0926777890"}
var justinTel_3 = { group:"tel_justin", tel:"0927889908"}
var justinTel_4 = { group:"tel_justin", tel:"0927889908"}
var justinTel_5 = { group:"tel_justin", tel:"0927889908"}

var alanTel_1 = { group:"tel_alan", tel:"0299887765"}
var alanTel_2 = { group:"tel_alan", tel:"026677-1123"}

var KellyTel_1 = { group:"tel_kelly", tel:"03-44335566"}
var KellyTel_2 = { group:"tel_kelly", tel:"03-44337788"}

db.lookupTel.insert([
            justinTel_1,justinTel_2,justinTel_3,justinTel_4,justinTel_5,
						alanTel_1,alanTel_2,
						KellyTel_1,KellyTel_2
					])


// cursor = db.lookupPerson.aggregate(
//    [
// 	{
//       "$lookup":
//         {
//           "from": "lookupTel",
//           "localField": "tel_group",
//           "foreignField": "group",
//           "as": "tel_arr"
//         }
//    }
//    ,
//    {$sort:{name:1}}
//    ,
//    {
//    	  $project:{
//         user:"$name",
//         tels:"$tel_arr",
//         _id:0
//       }
//     }
//    ,
//     {
//    	  $project:{
//         "tels._id":0,
//         "tels.group":0
//       }
//     }
//   ]
// );

// showCursorItems(cursor)

// db.viewPerson.drop();

// db.createView(
//   "viewPerson", //view name
//   "lookupPerson", // source
//   [
// 	{
// 		$lookup:
//         {
//           from: "lookupTel",
//           localField: "tel_group",
//           foreignField: "group",
//           as: "tel_arr"
//         }
// 	}
// 	,
// 	{$sort:{name:1}}
// 	,
//     {
//    	  $project:{
//         user:"$name",
//         tels:"$tel_arr",
//         _id:0
//       }
//     }
//     ,
//     {
//    	  $project:{
//         "tels._id":0,
//         "tels.group":0
//       }
//     }
//   ]

// );

// cursor = db.viewPerson.find();
// showCursorItems(cursor);


db.viewGroupByAge.drop();
db.createView(
  "viewGroupByAge", //view name
  "usersNonIndex", // source
  [
	{
	  $group:{_id:'$age', count : { $sum : 1 }}
	}
	,
	{$sort:{'_id':1}}
	,
	{$project:{'age':'$_id',count:1,_id:0}}
  ]

);

cursor = db.viewGroupByAge.find();
showCursorItems(cursor);



