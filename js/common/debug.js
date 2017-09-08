var FILTER_LEVEL_ALL = 0;
var FILTER_LEVEL_HIGH = 1;
var FILTER_LEVEL_MEDIUM = 2;
var FILTER_LEVEL_LOW = 3;

var FILTER_TYPE_ALL = 0;
var FILTER_TYPE_LOG = 1;
var FILTER_TYPE_WARNING = 2;

var debugTool = new function(filterDepth=0, filterType="") {
	this.print = function(message, level, type)
	{
		if(checkDepthPermission(filterDepth, level) && checkTypePermission(filterType, type))
			printMessage(message, type);
	}

	this.printMessage = function(message, type)
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

	this.printWarning = function(message)
	{
		console.warn(message);
	}

	this.printNormal = function (message)
	{
		console.log(message);
	}

	this.checkDepthPermission = function(allowedLevel, msgLevel)
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

	this.checkTypePermission = function(allowedType, msgType)
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