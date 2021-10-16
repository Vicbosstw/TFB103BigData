from bson.code import Code
import pymongo
db = pymongo.MongoClient().tfb103

# mapper = Code("""function(){
# 	for(var key in this){
# 		if(key !== '_id'){
# 			emit(key,{'count':1});
# 		}
# 	}
# }
# """)

# mapper = Code("""function(){
# 	for(var i in this.tags){
# 		emit(this.tags[i],{"urls":[this.url]});
# 	}
# };
# """)




mapper = Code("function(){emit(this['age'],{count:1});}")

reducer = Code(""" 
	function(key,emits){
	total = 0;
	for(var i in emits){
		total+=emits[i].count;
	}
	return {'count':total};
}
""")


# reducer = Code(""" 
# 	function(key,emits){
# 	var total = {urls:[]}
# 	for(var i in emits){
# 		emits[i].urls.forEach(function(url){total.urls.push(url)})
# 	}
# 	return total;
# }
# """)


result = db.usersNonIndex.map_reduce(mapper, reducer, "mr1_result_20200225")

# result = db.mr1.map_reduce(mapper, reducer, "mr1_result_py_20210523")

for row in result.find():
    print(row)

