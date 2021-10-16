db = connect("localhost:27017/tfb103");

var showCursorItems = function(cursor){
    while (cursor.hasNext()) {
        printjson(cursor.next());
    }
}

db.newLookupPerson.drop();
db.newLookupTel.drop();

var Justin = {_id:'001', name: "Justin"}
var Alan   = {_id:'002', name: "Alan"}
var Kelly  = {_id:'003', name: "Kelly"}

db.newLookupPerson.insert([Justin,Alan,Kelly]);

var justinTel_1 = { belongTo:'001', tel:"0929888777"}
var justinTel_2 = { belongTo:'001', tel:"0926777890"}
var justinTel_3 = { belongTo:'001', tel:"0927889908"}
var justinTel_4 = { belongTo:'001', tel:"0927889908"}
var justinTel_5 = { belongTo:'001', tel:"0927889908"}

var alanTel_1   = { belongTo:'002', tel:"0299887765"}
var alanTel_2   = { belongTo:'002', tel:"0266771123"}

var KellyTel_1  = { belongTo:'003', tel:"03-44335566"}
var KellyTel_2  = { belongTo:'003', tel:"03-44337788"}

db.newLookupTel.insert(
    [
        justinTel_1, justinTel_2, justinTel_3, justinTel_4, justinTel_5,
        alanTel_1, alanTel_2,
        KellyTel_1, KellyTel_2
    ]
)

cursor = db.newLookupPerson.aggregate(
   [
    {
      "$lookup":
        {
          "from": "newLookupTel",
          "localField": "_id",
          "foreignField": "belongTo",
          "as": "tel_arr"
        }
   }
   ,
   {$sort:{name:1}}
   ,
   {
      $project:{
        '姓名':"$name",
        '電話':"$tel_arr",
        '工號':'$_id',
        _id:0
      }
    }
   ,
    {
      $project:{
        "電話._id":0,
        "電話.belongTo":0
      }
    }
    ,
    {
      $addFields: {
        電話字串陣列: {
          $function: {
            body: `function(telObjectList) {
              retTelStringList = []
              for (const telObject of telObjectList) {
                retTelStringList.push(telObject.tel)
              }
              return retTelStringList
            }`,
            args: ["$電話"],
            lang: "js"
          }
        }
      }
    }
    ,
    {
      $project:{
        "電話":0
      }
    }
  ]
);

showCursorItems(cursor)



