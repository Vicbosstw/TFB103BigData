db = connect("mongodb://localhost:27017/tfb103");

var showCursorItems = function(cursor){
    while (cursor.hasNext()) {
        printjson(cursor.next());
    }
}

// var p1 = { "_id" : 1, "name" : "dave123", favorites: [ "chocolate", "cake", "butter", "apples" ] }
// var p2 = { "_id" : 2, "name" : "li", favorites: [ "apples", "pudding", "pie" ] }
// var p3 = { "_id" : 3, "name" : "ahn", favorites: [ "pears", "pecans", "chocolate", "cherries" ] }
// var p4 = { "_id" : 4, "name" : "ty", favorites: [ "ice cream" ] }

// db.test1.drop()
// db.test1.insertMany([p1, p2, p3, p4])
// cursor = db.test1.aggregate([
//    {
//      $project:
//       {
//          name: 1,
//          first: { $arrayElemAt: [ "$favorites", 0 ] },
//          last: { $arrayElemAt: [ "$favorites", -1 ] }
//       }
//    }
// ])
// showCursorItems(cursor)


// var a1 = {_id:1, dict1:{a:1, b:2}, dict2:{c:3}, dict3:{b:3, d:4}}
// db.test2.drop()
// db.test2.insert(a1)
// cursor = db.test2.aggregate(
//   [{
//     $project:{ 
//        dict_all:{$mergeObjects:["$dict1", "$dict2", "$dict3"]} 
//   }}]
// )
// showCursorItems(cursor)


var r1 = { "_id": 1, "name" : { "first" : "John", "last" : "Backus" } }
var r2 = { "_id": 2, "name" : { "first" : "John", "last" : "McCarthy" } }
var r3 = { "_id": 3, "name":  { "first" : "Grace", "last" : "Hopper" } }
//var r4 = { "_id": 4, "firstname": "Ole-Johan", "lastname" : "Dahl" }
db.test3.drop()
db.test3.insertMany([r1, r2, r3])

cursor = db.test3.aggregate([
   { $replaceRoot: { newRoot: "$name" } }
])


// cursor = db.test3.aggregate([
//    { $replaceRoot: { newRoot: { $mergeObjects: [ { _id: "$_id", first: "", last: "" }, "$name" ] } } }
// ])
// showCursorItems(cursor)




