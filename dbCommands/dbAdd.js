/*
MONGODB CHEAT SHEET - https://blog.codecentric.de/files/2012/12/MongoDB-CheatSheet-v1_0.pdf
Useful commands:
- db.(collection).find().pretty() - returns all entries in a nice format. replace collection with whatever, ie footItems.
- show collections - shows all the collections. useful for the function above
- db.(collection).remove({name: 'blablabla'}) - removes all entries with met criteria
- db.createCollection("newCollection") - creates new collection
- db.(collection).drop() - deletes a collection
- db - tells you what youre currently in
- use (db) - moves to a new db

*/

/*Available collection names:
1. accounts - username, password, full name, age, email, diet

2. recipes - name, author, content, ingredients, notes
recipes -  name, username, main text, list of footItems, notes

3. comments - username, recipeId, comment, date
*/

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var host = "127.0.0.1"; // or maybe localhost
var port = 27017;
var db_name = "recipewebsite";
var mongodb_url = "mongodb://" + host + ":" + port + "/" + db_name;

//For filtering ingredients list
var RecipeFunc = require("../collectionFunctions/recipeFunc.js");

var account_data = {
	'username':'',
	'password':'',
	'fullName':'',
	'age':'',
	'email':'',
	'diet':'',
	'shoppingList':[],
	'notes':[]
};

var recipe_data = {
	'name':'',
	'author':'',
	'content':'',
	'ingredients':[],
	'tags':[],
	'comments':[]
};

var comment_data = {
	'username':'',
	'comment':'',
	'date':''
}

exports.addUser = function (req, res) {
	account_data.username = req.body.username;
	account_data.password = req.body.password;
	account_data.fullName = req.body.fullName;
	account_data.age = req.body.age;
	account_data.email = req.body.email;
	account_data.diet = req.body.diet;
	account_data.shoppingList = [];
	account_data.notes = [];
	connectAndPush("accounts", account_data);
}

exports.addRecipe = function (req, res) {
	recipe_data.name = req.body.name;
	//recipe_data.author = req.body.author;
	recipe_data.author = "example";
	recipe_data.content = req.body.content;
	recipe_data.ingredients = RecipeFunc.filterIngredientList(req.body.food);
	recipe_data.tags = [];
	recipe_data.comments = [];
	connectAndPush("recipes", recipe_data);
}

function connectAndPush(whatCollection, dataContent) {
	MongoClient.connect(mongodb_url, function (err, db) {
    if (err) {
        console.log(new Date() + " Failed to connect to " + mongodb_url);
    } else {
        var pushData = db.collection(whatCollection);
        pushData.insert(dataContent, function(err, doc) {
            if (err) {
                console.log("Error " + err);
            } else {
                console.log(JSON.stringify(doc));
           }
            db.close();
        });
    }
});
}