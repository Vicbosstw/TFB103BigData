
var showCursorItems = function(cursor){
    while (cursor.hasNext()) {
        printjson(cursor.next());
    }
}

db = connect("mongodb://localhost:27017/tfb103")

db.inventory.drop();

var productA = {name: 'A', quantity: 50, price: 9,  level: 10}
var productB = {name: 'B', quantity: 20, price: 20, level: 30}
var productC = {name: 'C', quantity: 30, price: 30, level: 20}
var productD = {name: 'D', quantity: 30, price: 10, level: 50}
var productE = {name: 'E', quantity: 60, price: 13, level: 60}
var productF = {name: 'F', quantity: 80, price: 20, level:null}
var productG = {name: 'G', quantity: 50, price: 10, level:null}
var productH = {name: 'H', quantity: 10, price: 10}

db.inventory.insert([
    productA,
    productB,
    productC,
    productD,
    productE,
    productF,
    productG,
    productH
]);

// cursor = db.inventory.find({},{_id:0});
// showCursorItems(cursor);


// print('-------------------------------------------')
// cursor = db.inventory.find( 
//                        {
//                          $or:[
//                              {quantity:50}
//                              ,
//                              {
//                                  price:{
//                                      $gt:10,
//                                      $lt:20
//                                      }
//                              }
//                              ,
//                              {price:{$in:[10,20]}}
//                          ]
//                        },
//                     {_id:0,level:0}
// );
// showCursorItems(cursor);



// print('-------------------------------------------')
// cursor = db.inventory.find( {"$and":[ {"quantity":10}, {"price":10} ]},
//                          {"_id":0,"level":0}
// );
// showCursorItems(cursor);


// print('-------------------------------------------')
// cursor = db.inventory.find( {"$and":[
//                              {"quantity":{"$in":[50,30]}},
//                              {"price":10}
//                             ]
//                          },
//                          {_id:0}
// );

// showCursorItems(cursor);





// print('-------------------------------------------')
// cursor = db.inventory.find( {
//                            price:{
//                                    $not:{
//                                           $gte:10
//                                         }
//                                  }
//                          },
//                          {_id:0,price:1,name:1}
// );
// showCursorItems(cursor);



print('-------------------------------------------')
cursor = db.inventory.find({level:null},{_id:0});
showCursorItems(cursor);



// print('-------------------------------------------')
// cursor = db.inventory.find({
//                           level:{
//                                   $in:[null],
//                                   $exists:true
//                                 }
//                         },
//                         {_id:0}
// );
// showCursorItems(cursor);
