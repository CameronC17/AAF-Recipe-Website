var mongodb=require('mongodb');
var MongoClient=mongodb.MongoClient;

var host="127.0.0.1";//ormaybelocalhost
var port=27017;
var db_name="recipewebsite";
var mongodb_url="mongodb://"+host+":"+port+"/"+db_name;

//################################################################## *---***-*-*-
// REMOVE ALL CAPITALS AND CHECK TO MAKE SURE YOU INCLUDE ALL THINGS
//################################################################## *---***-*-*-

var account_data = [
	{'username':'cameronc','password':'hello123','fullName':'cameron chalmers','age':'22','email':'cameronchalmers@hotmail.co.uk','diet':'vegetarian', 'shoppingList':[], 'notes':[]},
	{'username':'robertm','password':'yes123','fullName':'robert madrid','age':'45','email':'robert@lolz.com','diet':'vegan', 'shoppingList':[], 'notes':[]},
	{'username':'davidg','password':'pass123','fullName':'david goodman','age':'32','email':'gavid@doodman.org','diet':'vegetarian', 'shoppingList':[], 'notes':[]},
	{'username':'imgowan','password':'cute123','fullName':'isobel mcgowan','age':'25','email':'imgoing@live.co.uk','diet':'vegetarian', 'shoppingList':[], 'notes':[]},
	{'username':'mysteryman','password':'wow123','fullName':'who knows','age':'99','email':'manof@mystery.com','diet':'vegan', 'shoppingList':[], 'notes':[]}
];

var recipe_data = [
	{'name':'broccoli Pie','author':'robertm','content':'1. boil broccoli 2. put in pie 3. bake pie 20mins','ingredients':[[100, 'gram', 'broccoli'], [200, 'grams', 'spinach']], 'tags':[], 'comments':[]},
	{'name':'haloumi stuffed carrots','author':'imgowan','content':'1. core the carrots 2. crumble haloumi 3. insert haloumi into carrots','ingredients':[[50, 'grams', 'haloumi'], [3, 'unit', 'carrot']], 'tags':[], 'comments':[]}
];

/*var comment_data = [
	{'username':'CameronC', 'recipeID':'12345', 'comment':'It was good', 'date':'29/01/2016 18:42'},
	{'username':'IMGowan', 'recipeID':'54321', 'comment':'Did not like it', 'date':'22/01/2016 09:19'}
];*/

MongoClient.connect(mongodb_url,function(err,db){
	if(err){
		console.log(newDate()+"Failed to connect to "+mongodb_url);
	}else{
		var pushData = db.collection("accounts");
		pushData.insert(account_data,function(err,doc){
		if(err){
			console.log("Error "+err);
		}else{
		console.log(JSON.stringify(doc));
		}
		});
		pushData = db.collection("recipes");
		pushData.insert(recipe_data,function(err,doc){
		if(err){
			console.log("Error "+err);
		}else{
		console.log(JSON.stringify(doc));
		}
		});
		/*pushData = db.collection("comments");
		pushData.insert(comment_data,function(err,doc){
		if(err){
			console.log("Error "+err);
		}else{
		console.log(JSON.stringify(doc));
		}
		});*/
	db.close();	
}
});