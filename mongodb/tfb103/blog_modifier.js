db = connect("localhost:27017/tfb103");
db.blog.posts.drop();

var showCursorItems = function(cursor){
	while (cursor.hasNext()) {
   		printjson(cursor.next());
	}
}

var post = {
	title: 'A Blog Post',
	content: '..............',
	author:{
		name:'joe',
		email:'joe@example.com'
	},
	comment:[]
}

db.blog.posts.insert(post);

var dbPost = db.blog.posts.findOne();
print('::: post:');
printjson(dbPost);

db.blog.posts.update({'author.name':'joe'},{$set:{'author.name':'joe schmoe'}});

var dbPost = db.blog.posts.findOne();
print('::: update author name post:');
printjson(dbPost);

db.blog.posts.update({title:'A Blog Post'},
	{$push:{comment:{name:'Justin',email:'justin@gmail.com',content:'nice post.'}}});
var dbPost = db.blog.posts.findOne();
print('::: push comment post:');
printjson(dbPost);

db.blog.posts.update({title:'A Blog Post'},{$push:{comment:{name:'Justin',email:'justin@gmail.com',content:'nice post.'}}});
var dbPost = db.blog.posts.findOne();
print('::: push comment post:');
printjson(dbPost);

db.blog.posts.update({title:'A Blog Post'},{$push:{comment:{name:'Kelly',email:'kelly@gmail.com',content:'nice post1.'}}});
//printjson(db.runCommand({getLastError:1}));
var dbPost = db.blog.posts.findOne();
print('::: push comment again post:');
printjson(dbPost);

db.blog.posts.update({title:'A Blog Post'},{$addToSet:{comment:{name:'Kelly',email:'kelly@gmail.com',content:'nice post2.'}}});
//printjson(db.runCommand({getLastError:1}));
var dbPost = db.blog.posts.findOne();
print('::: addToSet comment again post:');
printjson(dbPost);

db.blog.posts.update({title:'A Blog Post'},{$addToSet:{comment:{name:'Kelly',email:'kelly@gmail.com',content:'nice post2.'}}});
//printjson(db.runCommand({getLastError:1}));
var dbPost = db.blog.posts.findOne();
print('::: addToSet comment again post:');
printjson(dbPost);

