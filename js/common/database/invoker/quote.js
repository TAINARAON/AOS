var quoteInvoker = new function() {

    this.url =  "some_url_to_get_to_quote_table";

    this.create = function (quoteData,quoteLandEntries) 
    {
        var quoteId = mockCommunicator.createQuote(quoteData);

        for(let i = 0; i < quoteLandEntries.length; i++) {
        	var quoteLandEntry = quoteLandEntry[i];

        	quoteLandEntry['quote_id'] = quoteId;
        	var landEntryId = mockCommunicator.createQuoteLandEntry();

        	if(landEntryId == null) {
        		console.error("A land entry failed to be created. Roll back whole quote entry");
        		return;
        	}
        }
    };

    
    this.getQuotes = function(id) {
    	var broker = mockCommunicator.getBroker(id);
    	var user = mockCommunicator.getUser(broker.userId);
		broker.name = user.name;
		broker.surname = user.surname;

		return broker;
    };

    this.getLandEntriesOfQuote = function(id) {

		var allLandEntries = mockCommunicator.getQuoteLandEntries();
		var landEntries = [];

		for(var i=0;i<allLandEntries.length;i++) {
			var landEntry = allLandEntries[i];
			if(landEntry['quote_id'] == id) {
				landEntries.push(landEntry);
			}
		}

		return landEntries;
    }
}