
db = connect("mongodb://localhost:27017/tfb103");

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

//findOneAndShow('usersNonIndex');

print('--------------------------');





// var cursor = db.usersNonIndex.aggregate([
//          {$match:{age:{$gte:60}}},
//          {$limit:3},
//          {$project:{"年紀":"$age","ID":"$_id", "大名":'$username',"唉":"$i","_id":0}},
//          {$project:{'N':'$大名','A':'$年紀',"唉":1}}
//        ]
// )
// showCursorItems(cursor);

// var cursor = db.usersNonIndex.aggregate(
//     [
//         {$match:{age:15}},
//         {$limit:3},
//         {$project:{
//                    'N':'$username',
//                    'age':1,
//                    'add100Years':{$add:['$age',100]},
//                     _id:0
//                    }
//         }
//         // ,
//         // // {$merge: "justin_collection"}
//         // {$out:"coll_0815"}
//      ]
// );
// showCursorItems(cursor);


// db.usersNonIndex.aggregate([{},{},{}])
var cursor = db.usersNonIndex.aggregate([
             {
               $group:{_id:'$age', count : { $sum : 1 }}
             }
        ,
             {$sort:{'_id':1}}
             ,
             {$project:{'age':'$_id',count:1, _id:0}}
             // ,
             // {$out: "group_result_tfb103"}
])
showCursorItems(cursor);




//printjson(db.ttl_coll.stats());
