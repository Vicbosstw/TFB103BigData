//db.test_remove_speed.drop();
//print("remove old data");

print("insert begin.......");
for(var i = 0; i < 50000; i++){
	db.test_remove_speed1.insert({foo:'bar',bar:i,z:10-i})
}
print("insert end.......");

var doRemove = function(){
	var start = (new Date()).getTime();
	db.test_remove_speed1.remove({});
	db.test_remove_speed1.findOne();
	var timeDiff = (new Date()).getTime() - start;
	print("Remove took:" + timeDiff + "ms");
}
print("remove begin.......")
doRemove();
print("remove end.......")

print("insert begin.......");
for(var i = 0; i < 50000; i++){
	db.test_remove_speed2.insert({foo:'bar',bar:i,z:10-i})
}
print("insert end.......");

var doDrop = function(){
	var start = (new Date()).getTime();
	db.test_remove_speed2.drop();
	db.test_remove_speed2.findOne();
	var timeDiff = (new Date()).getTime() - start;
	print("Drop took:" + timeDiff + "ms");
}
print("drop begin.......")
doDrop();
print("drop end.......")