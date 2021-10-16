db = connect("localhost:27017/tfb103");

var showCursorItems = function(cursor){
	while (cursor.hasNext()) {
   		printjson(cursor.next());
	}
}

// db.orders.drop();
// db.items.drop();

// db.orders.insert([
//   { "_id" : 1, "item" : "abc", "price" : 12, "ordered" : 2 },
//   { "_id" : 2, "item" : "jkl", "price" : 20, "ordered" : 1 }
// ])

// db.items.insert([
//   { "_id" : 1, "item" : "abc", "description": "product 1", "instock" : 120 },
//   { "_id" : 2, "item" : "def", "description": "product 2", "instock" : 80 },
//   { "_id" : 3, "item" : "jkl", "description": "product 3", "instock" : 60 }
// ])


// cursor = db.orders.aggregate([
//    {
//       $lookup: {
//          from: "items",
//          localField: "item",    // field in the orders collection
//          foreignField: "item",  // field in the items collection
//          as: "fromItems"
//       }
//    }
//    ,
   // {
   //    $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$fromItems", 0 ] }, "$$ROOT" ] } }
   // }
   // ,
//    { $project: { fromItems: 0 } }
// ])

// showCursorItems(cursor)


db.sales.drop();
db.sales.insert( [
   { _id: 1, year: 2017, item: "A", quantity: { "2017Q1": 500, "2017Q2": 500 } },
   { _id: 2, year: 2016, item: "A", quantity: { "2016Q1": 400, "2016Q2": 300, "2016Q3": 0, "2016Q4": 0 } } ,
   { _id: 3, year: 2017, item: "B", quantity: { "2017Q1": 300 } },
   { _id: 4, year: 2016, item: "B", quantity: { "2016Q3": 100, "2016Q4": 250 } }
] )

cursor = db.sales.aggregate( [
   { $group: { _id: "$item", mergedSales: { $mergeObjects: "$quantity" } } }
])

showCursorItems(cursor)


