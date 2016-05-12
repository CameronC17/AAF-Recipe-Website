var GenericFunc = require("../collectionFunctions/genericFunc.js");

exports.filterIngredientList = function (ingrList) {
	//console.log(ingrList);
	var arrayIngr = [];
	var workingArray = [];
	var workingString = "";
	var quantityAmount = "";
	var quantityType = "";
	var foodName = "";
	var lastFoundBreak = 0;

	//Creates an array of each item we'll be manipulating
	/*for (var i = 0; i <= ingrList.length; i++)
	{
		if (ingrList.charAt(i) == ',' || i == ingrList.length)
		{
			for (var j = lastFoundBreak; j < i; j++)
			{
				if (ingrList.charAt(j) != ',')
				{
					if (workingString == "")
					{
						if (ingrList.charAt(j) != ' ')
						{
							workingString += ingrList.charAt(j).toLowerCase();
							lastFoundBreak = i;
						}		
					}
					else
					{						
						workingString += ingrList.charAt(j).toLowerCase();
						lastFoundBreak = i;							
					}
				}
			}
			workingArray.push(workingString);
			workingString = "";
		}
	}*/
	workingArray = GenericFunc.listSeparator(ingrList);
	//console.log(workingArray);
	lastFoundBreak = 0;
	//Checks each split up item if it contains 3 things - quantity, type, food name - and adds to the array
	for (var i = 0; i < workingArray.length; i++)
	{
		for (var j = 0; j < workingArray[i].length; j++)
		{
			if (workingArray[i].charAt(j) != ' ')
			{
				if (!isNaN(workingArray[i].charAt(j)))
					quantityAmount += workingArray[i].charAt(j);
				if (lastFoundBreak == 1)
					quantityType += workingArray[i].charAt(j);
				if (lastFoundBreak > 1)
					foodName += workingArray[i].charAt(j);
			}
			else
			{
				if (lastFoundBreak < 2)
					lastFoundBreak++;
				else
					foodName += workingArray[i].charAt(j);
			}
		}

		if (foodName == "" && quantityType != "")
		{
			foodName = quantityType;
			quantityType = "unit";
		}

		if (quantityAmount && quantityType && foodName)
		{
			var returnArray = quantityCorrection(quantityAmount, quantityType);
			quantityAmount = returnArray[0];
			quantityType = returnArray[1];
			arrayIngr.push({"quantity" : quantityAmount, "quantity type" : quantityType, "food name" : foodName});
		}
		//Reset all stuff for next array
		lastFoundBreak = 0;
		quantityAmount = "";
		quantityType = "";
		foodName = "";
	}
	//console.log(arrayIngr);
	return arrayIngr;	
}

function quantityCorrection(quantityAmount, quantityType) {
	switch (quantityType)
	{
		case "pounds":
			quantityAmount *= 454;
			quantityType = "grams";
			break;
		case "pound":
			quantityAmount *= 454;
			quantityType = "grams";
			break;
		case "ounce":
			quantityAmount *= 28;
			quantityType = "grams";
			break;
		case "ounces":
			quantityAmount *= 28;
			quantityType = "grams";
			break;
	}

	if (quantityAmount > 1000 && (quantityType == "grams" || quantityType == "gram"))
	{
		quantityAmount /= 1000;
		quantityAmount = quantityAmount.toFixed(2);
		quantityType = "kilograms";
	}

	return [quantityAmount, quantityType];
}