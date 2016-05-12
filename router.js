var express = require('express');
var router = express.Router();

//For getting data from HTML body
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//For writing to the database
var dbPush = require('./dbCommands/dbAdd');
//For searching for the database
var dbSearch = require('./dbCommands/dbSearch');
//For updating DB documents
var dbUpdate = require('./dbCommands/dbUpdate');

// Log time of all requests....
/*router.use(function timeLog(req, res, next) {
  console.log('Time of Request: ', new Date());
  next();
});*/

router.get('/', function(req, res) {
  //res.send('Hello World');
  //res.render('index.jade');
  res.sendFile(__dirname + '/views/index.html');
});

//CREATION STUFF ######################################################################################
//User creation here
router.get('/user_signup', function(req, res) {
  res.sendFile(__dirname + '/views/user_signup.html');
});

router.post('/user_signup', urlencodedParser, function(req, res) {
    dbPush.addUser(req, res);
});

//Recipe creation here
router.get('/recipe_submit', function(req, res) {
  res.sendFile(__dirname + '/views/recipe_submit.html');
});

router.post('/recipe_submit', urlencodedParser, function(req, res) {
  dbPush.addRecipe(req, res);
});



// RECIPE PAGES ######################################################################################
// Get individual recipes
router.get('/recipe_get', function(req, res) {
  res.sendFile(__dirname + '/views/recipe_get.html');
});

router.get('/recipe', function(req, res) {
  dbSearch.getRecipeByID(req, res);
});


// Recipe search here
router.get('/recipe_search', function(req, res) {
  res.sendFile(__dirname + '/views/recipe_search.html');
});

router.post('/recipe_search_name', function(req, res) {
  dbSearch.searchRecipeName(req, res);
});

router.post('/recipe_search_ingredient', function(req, res) {
  dbSearch.searchRecipeIngr(req, res);
});


// Update recipes here
router.get('/recipe_update', function(req, res) {
  res.sendFile(__dirname + '/views/recipe_update.html');
});

router.post('/recipe_update', urlencodedParser, function(req, res) {
  dbUpdate.updateRecipe(req, res);
});


//Tag recipes
router.get('/recipe_tag', function(req, res) {
  res.sendFile(__dirname + '/views/recipe_tag.html');
});

router.post('/recipe_tag', urlencodedParser, function(req, res) {
  dbUpdate.addTags(req, res);
});


//Comment recipes
router.get('/recipe_comment', function(req, res) {
  res.sendFile(__dirname + '/views/recipe_comment.html');
});

router.post('/recipe_comment', urlencodedParser, function(req, res) {
  dbUpdate.addComment(req, res);
});



// USER STUFF HERE ##################################################################################
//User Login
router.get('/user_login', function(req, res) {
  res.sendFile(__dirname + '/views/user_login.html');
});

router.post('/user_login', urlencodedParser, function(req, res) {
  dbSearch.userLogin(req, res);
});


//Create shopping lists
router.get('/user_shoppinglist', function(req, res) {
  res.sendFile(__dirname + '/views/user_shoppinglist.html');
});

router.post('/user_shoppinglist', urlencodedParser, function(req, res) {
  dbUpdate.updateShoppingList(req, res);
});


//Add note to recipe
router.get('/user_addnote', function(req, res) {
  res.sendFile(__dirname + '/views/user_addnote.html');
});

router.post('/user_addnote', urlencodedParser, function(req, res) {
  dbUpdate.addNote(req, res);
});




module.exports = router;