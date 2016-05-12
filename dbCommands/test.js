var testObj = {
	"cat" : "orange",
	$set : { "author" : "DavidoM" }
}

testObj.dog = "woofles";

testObj.'&set' = {'cow' : "alive"};

//testObj.push({"cow" : "alive"});

console.log(testObj);