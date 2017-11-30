var FILTER_LEVEL_NONE = -1;
var FILTER_LEVEL_ALL = 0;
var FILTER_LEVEL_HIGH = 1;
var FILTER_LEVEL_MEDIUM = 2;
var FILTER_LEVEL_LOW = 3;

var FILTER_TYPE_NONE = -1;
var FILTER_TYPE_ALL = 0;
var FILTER_TYPE_LOG = 1;
var FILTER_TYPE_WARNING = 2;

var debugTool = new function(filterDepth=FILTER_LEVEL_ALL, filterType=FILTER_TYPE_ALL) {
	this.print = function(message, level, type, headerText=null)
	{
		if(checkDepthPermission(filterDepth, level) && checkTypePermission(filterType, type))

			if(headerText != null) {
				printMessage(headerText, type);
				alert('not null: ' + headerText);
			}
			
			printMessage(message, type);
	}

	function printMessage(message, type)
	{
		switch(type)
		{
			case FILTER_TYPE_LOG:
				printNormal(message);
			break;

			case FILTER_TYPE_WARNING:
				printWarning(message);
			break;
		}
	}

	function printWarning(message)
	{
		console.warn(message);
	}

	function printNormal(message)
	{
		console.log(message);
	}

	function checkDepthPermission(allowedLevel, msgLevel)
	{
		if(allowedLevel == FILTER_LEVEL_ALL)
		{
			return true;
		}
		else if(allowedLevel == msgLevel)
		{
			return true;
		}

		return false;
	}

	function checkTypePermission(allowedType, msgType)
	{
		if(allowedType == FILTER_TYPE_ALL)
		{
			return true;
		}
		else if(allowedType == msgType)
		{
			return true;
		}

		return false;
	}
}