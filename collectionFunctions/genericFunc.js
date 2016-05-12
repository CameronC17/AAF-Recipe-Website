exports.listSeparator = function (sntList) {
    var rtnArray = [];
    var workingString = "";
    for (var i = 0; i <= sntList.length; i++)
    {
        if (sntList.charAt(i) != ',')
        {
            if ((sntList.charAt(i) == ' ') && (workingString != ""))
                workingString += sntList.charAt(i);
            else if (sntList.charAt(i) != ' ')
                workingString += sntList.charAt(i);
        }        
        if ((sntList.charAt(i) == ',') || (i == sntList.length))
        {
            rtnArray.push(workingString);
            workingString = "";
        }
    }
    return rtnArray;
}