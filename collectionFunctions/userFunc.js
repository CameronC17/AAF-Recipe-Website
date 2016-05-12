exports.sortShoppingList = function (listItems, callback) {
	//Combine all items into 1 array
	var ingredientsArr = [];
	//console.log(listItems[0][0].ingredients[0].foodName);
	//console.log(listItems[0][0].ingredients.length);
	//console.log(listItems[0].length);
	for (var i = 0; i < listItems.length; i++)
	{
		for (var j = 0; j < listItems[i][0].ingredients.length; j++)
		{
			ingredientsArr.push(listItems[i][0].ingredients[j]);
		}
	}

	//Builds the shopping list and combines duplicates
	var shoppingList = [];
	for (var i = 0; i < ingredientsArr.length; i++)
	{
		var foodOnListResult = foodOnList(shoppingList, ingredientsArr[i].foodName);
		if (foodOnListResult > -1)
		{
			if (ingredientsArr[i].quantityType == shoppingList[foodOnListResult].quantityType)
			{
				shoppingList[foodOnListResult].quantity += ingredientsArr[i].quantity;
			}
		}
		else
		{
			shoppingList.push(ingredientsArr[i]);
		}
		
	}
	//console.log(shoppingList);
	callback(shoppingList);
}

function foodOnList(foodList, newFoodItem) {
	for (var i = 0; i < foodList.length; i++)
	{
		if (foodList[i].foodName == newFoodItem)
			return i;
	}
	return (-1);
}