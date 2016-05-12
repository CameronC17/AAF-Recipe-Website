//http://stackoverflow.com/questions/10290621/how-do-i-partially-update-an-object-in-mongodb-so-the-new-object-will-overlay
//https://gist.github.com/sym3tri/858142 - update single field

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var host = "127.0.0.1"; // or maybe localhost
var port = 27017;
var db_name = "recipewebsite";
var mongodb_url = "mongodb://" + host + ":" + port + "/" + db_name;
//For objectID...
var ObjectId = require('mongodb').ObjectID;

//For generic list sorter
var GenericFunc = require("../collectionFunctions/genericFunc.js");
//For recipe sorting functions
var RecipeFunc = require("../collectionFunctions/recipeFunc.js");
//For user functions
var UserFunc = require("../collectionFunctions/userFunc.js");
//For searching DB
var DBSearch = require("../dbCommands/dbSearch.js");


var searchItem;
var updateItem;

exports.updateRecipe = function (req, res) {
    searchItem = {
        "_id": new ObjectId(req.body.recipeID)
    };
    var editItems = {};
    //Seeing what has been requested to change  
    if (req.body.recipeName)
    {
        editItems.name = req.body.recipeName.toLowerCase();
    }
    if (req.body.author)
    {
        editItems.author = req.body.author.toLowerCase();
    }
    if (req.body.instructions)
    {
        editItems.content = req.body.instructions.toLowerCase();
    }
    if (req.body.food)
    {
        editItems.ingredients = RecipeFunc.filterIngredientList(req.body.food.toLowerCase());   
    }

    updateItem = {
        $set : editItems
    };

    console.log(updateItem);
    //connectAndUpdate("recipes", searchItem, updateItem);
}

exports.addTags = function (req, res) {
    searchItem = {
        "_id": new ObjectId(req.body.recipeID)
    };
    var formatTags = GenericFunc.listSeparator(req.body.tagContent);
    var editItems = {
        'tags':formatTags
    }
    var updateItem = {
        $addToSet : editItems
    }
    connectAndUpdate("recipes", searchItem, updateItem);
}

exports.addNote = function (req, res) {
    searchItem = {
        "_id": new ObjectId(req.body.userID)
    };
    var addItems = {
        'notes' : {'recipeID':req.body.recipeID, 'content':req.body.content}
    }  
    var updateItem = {
        $addToSet: addItems
    }
    connectAndUpdate("accounts", searchItem, updateItem);
}

exports.updateShoppingList = function (req, res) {
    var srchUserID = {
        "_id" : new ObjectId(req.body.userID)
    }
    var searchItem = [];
    if (req.body.starterRecipe)
    {
        searchItem.push({"_id": new ObjectId(req.body.starterRecipe)});
    }
    if (req.body.mainRecipe)
    {
        searchItem.push({"_id": new ObjectId(req.body.mainRecipe)});
    }
    if (req.body.dessertRecipe)
    {
        searchItem.push({"_id": new ObjectId(req.body.dessertRecipe)});
    }
    var listItems = [];
    for (var i = 0; i < searchItem.length; i++)
    {
        DBSearch.connectAndGetFilter("recipes", searchItem[i], {"ingredients": 1, "_id": 0}, function(itemList) {
            listItems.push(itemList);
            //If we've reached the total number of recipe ingredient lists, then start the process
            if (listItems.length == searchItem.length)
            {
                UserFunc.sortShoppingList(listItems, function(shoppingList) {
                    var editItems = {
                        'shoppingList':shoppingList
                    }
                    updateItem = {
                        $set: editItems
                    }
                    connectAndUpdate("accounts", srchUserID, updateItem);
                });
            }
        });
    }    
}

exports.addComment = function (req, res) {
    var searchItem = {
        "_id" : new ObjectId(req.body.recipeID)
    }
    var comment_data = {
        "username" : "TheCommenter",
        "comment" : req.body.comment,
        "date" : new Date()
    }
    var editItems = {
        'comments':comment_data
    }
    updateItem = {
        $addToSet: editItems
    }

    connectAndUpdate("recipes", searchItem, updateItem);    
}

function connectAndUpdate(whatCollection, searchItem, updateItem) {
MongoClient.connect(mongodb_url, function (err, db) {
    if (err) {
        console.log(new Date() + " Failed to connect to " + mongodb_url);
    } else {
        var updateData = db.collection(whatCollection);
        // First false = adds document if can not find matching, 2nd false updates all matching docs
        updateData.update(searchItem, updateItem, false, false, function(err, results) {
            if (err)
                console.log(err);
            else
                console.log(results);
            db.close();
        });
    }
});
}

/*function getIngredients(whatCollection, searchItem, filterData, callback) {
MongoClient.connect(mongodb_url, function (err, db) {
    if (err) {
        console.log(new Date() + " Failed to connect to " + mongodb_url);
    } else {
        var searchData = db.collection(whatCollection);
        searchData.find(searchItem, filterData).toArray(function(err, items) {
            //console.log(JSON.stringify(items));
            //callback(JSON.stringify(items));
            callback(items);
            //searchItem = items;
            db.close();
        });
    }
});
}*/