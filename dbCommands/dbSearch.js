var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var host = "127.0.0.1"; // or maybe localhost
var port = 27017;
var db_name = "recipewebsite";
var mongodb_url = "mongodb://" + host + ":" + port + "/" + db_name;
//For objectID...
var ObjectId = require('mongodb').ObjectID;

var searchItem;

exports.searchRecipeName = function (req, res) {
    searchItem = {
        'name': new RegExp(req.body.recipeName.toLowerCase(), "i")
    };
    connectAndGet("recipes", searchItem, res);
}

exports.searchRecipeIngr = function (req, res) {
    searchItem = {
        'ingredients.foodName': new RegExp(req.body.ingrName.toLowerCase(), "i")
    };
    connectAndGet("recipes", searchItem, res);
}

exports.getRecipeByID = function (req, res) {
    console.log(req.query.recipeID);
    //console.log("TEST");
    getItem = {
        "_id": new ObjectId(req.query.recipeID)
    }
    connectAndGet("recipes", getItem, res);
}

exports.userLogin = function (req, res) {
    searchItem = {
        "username" : req.body.username
    }
    exports.connectAndGetFilter("accounts", searchItem, {"username": 1, "password": 1}, function(userResult) {
        if (userResult[0].password == req.body.password)
            console.log("A User has been found, logging in");
        else
            console.log("Wrong username/password combo");
    });
}

function connectAndGet(whatCollection, whatSearch, res) {
MongoClient.connect(mongodb_url, function (err, db) {
    if (err) {
        console.log(new Date() + " Failed to connect to " + mongodb_url);
    } else {
        var searchData = db.collection(whatCollection);
        searchData.find(whatSearch).toArray(function(err, items) {
            res.json(items);
    		db.close();
  		});
    }
});
}

exports.connectAndGetFilter = function (whatCollection, whatSearch, filterItem, callback) {
MongoClient.connect(mongodb_url, function (err, db) {
    if (err) {
        console.log(new Date() + " Failed to connect to " + mongodb_url);
    } else {
        var searchData = db.collection(whatCollection);
        searchData.find(whatSearch, filterItem).toArray(function(err, items) {
            //if (items.length == 1)
            //   callback(items[0]);
            //else
                callback(items);
            db.close();
        });
    }
});
}