var damageReportInvoker = new function()
{
	this.getBusinessUnitByBrokerId = function(brokerId)
	{
		// get quiries which has this broker id
		var quotes = mockCommunicator.getQuotesByBrokerId(brokerId);
		// return business units of those quiries
		var businessUnits = [];

		for(var i = 0; i < quotes.length; i++)
		{
			var businessUnit = mockCommunicator.getBusinessUnit(quotes[i].businessUnitId);

			if(!businessUnits.some(item => item === businessUnit))
			{
				businessUnits.push(businessUnit);
			}
		}

		return businessUnits;
	}

	this.getFarmByBusinessUnitId = function(businessUnitId)
	{
		
	}
}