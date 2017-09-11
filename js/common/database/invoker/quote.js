var quoteInvoker = new function() {

    this.url =  "someUrlToGetToQuoteTable";

    this.create = function (quoteData,quoteLandEntries)  {

        var quoteId = mockCommunicator.createQuote(quoteData);

        for(let i = 0; i < quoteLandEntries.length; i++) {
        	var quoteLandEntry = quoteLandEntry[i];

        	quoteLandEntry['quoteId'] = quoteId;
        	var landEntryId = mockCommunicator.createQuoteLandEntry();

        	if(landEntryId == null) {
        		console.error("A land entry failed to be created. Roll back whole quote entry");
        		return;
        	}
        }
    };

    this.getQuote = function(id) {

        return mockCommunicator.getQuote(id);
    };

    this.getQuotes = function() {

    	return mockCommunicator.getQuotes();
    };

    this.getDetailsOfQuote = function(quoteId) {

        var quote = this.getQuote(quoteId);
        var quoteLinkedTo = quote['linkedToQuoteId'] == null ? null : this.getDetailsOfQuote(quote['linkedToQuoteId']);
        var businessUnit = mockCommunicator.getBusinessUnit(quote['businessUnitId']);
        var broker = quote['brokerId'] == null ? null : brokerInvoker.getBrokerWithDetails(quote['brokerId']);
        var insurer = quote['insurerId'] == null ? null : insurerInvoker.getInsurerWithDetails(quote['insurerId']);

        var landEntries = this.getLandEntriesOfQuote(quoteId);
        var damageTypesSelected = this.getTariffOptionDamageTypesSelectedOfLandEntry();
        var quoteLandEntries = this.getDetailsOfQuoteLandEntriesOfQuote(quoteId);
        

        var detailedQuoteObject = 
        {
            'id':quote['id'],
            'quoteNumber':quote['quoteNumber'],
            'businessUnit':businessUnit,
            'broker':broker,
            'insurer':insurer,
            'active':quote['active'],
            'dateCreated':quote['dateCreated'],
            'linkedToQuote':quoteLinkedTo,
            'acceptable':quote['acceptable'],
            'quoteLandEntries':quoteLandEntries
        }

        return detailedQuoteObject;
    };

    this.getLandEntriesOfQuote = function(quoteId) {

		var allLandEntries = mockCommunicator.getQuoteLandEntries();
		var landEntries = [];

		for(var i=0;i<allLandEntries.length;i++) {
			var landEntry = allLandEntries[i];
			if(landEntry['quoteId'] == quoteId) {
				landEntries.push(landEntry);
			}
		}

		return landEntries;
    };

    this.getTariffOptionDamageTypesSelectedOfLandEntry = function(id) {

        var allDamageTypesSelected = mockCommunicator.getTariffOptionDamageTypes();
        var damageTypesSelected = [];

        for(var i=0;i<allDamageTypesSelected.length;i++) {
            var damageTypeSelected = allDamageTypesSelected[i];
            if(damageTypeSelected['quoteLandEntryId'] == id) {
                damageTypesSelected.push(damageTypeSelected);
            }
        }

        return damageTypesSelected;
    };

    this.getDetailsOfQuoteLandEntriesOfQuote = function(quoteId) {

        var quoteLandEntries = this.getLandEntriesOfQuote(quoteId);
        var detailedQuoteLandEntriesOfQuote = [];

        for(var i = 0;i<quoteLandEntries.length;i++) {
            var quoteLandEntryId = quoteLandEntries[i]['id'];
            var detailedQuoteLandEntry = this.getDetailsOfQuoteLandEntry(quoteLandEntryId);

            detailedQuoteLandEntriesOfQuote.push(detailedQuoteLandEntry);
        }

        return detailedQuoteLandEntriesOfQuote;
    };

    this.getDetailsOfQuoteLandEntry = function(quoteLandEntryId) {

        var quoteLandEntry = mockCommunicator.getQuoteLandEntry(quoteLandEntryId);
        var farm = mockCommunicator.getFarm(quoteLandEntry['farmId']);
        var crop = mockCommunicator.getCrop(quoteLandEntry['cropId']);
        var tariffOption = mockCommunicator.getTariffOption(quoteLandEntry['tariffOptionId']);
        var tariffOptionDamageTypes = this.getTariffOptionDamageTypesOfQuoteLandEntry(quoteLandEntryId);

        var detailedQuoteLandEntryObject = 
        {
            'id':quoteLandEntry['id'],
            'farm':farm,
            'landNumber':quoteLandEntry['landNumber'],
            'crop':crop,
            'cultivar':quoteLandEntry['cultivar'],
            'area':quoteLandEntry['area'],
            'yield':quoteLandEntry['yield'],
            'tariffOption':tariffOption,
            'selectedDamageTypes':tariffOptionDamageTypes
        }

        return detailedQuoteLandEntryObject;
    };

    this.getTariffOptionDamageTypesOfQuoteLandEntry = function(quoteLandEntryId) {

        var tariffOptionDamageTypes = mockCommunicator.getTariffOptionDamageTypes();
        var selectedDamageTypes = [];

        for(var i = 0; i < tariffOptionDamageTypes.length; i++) {
            if(tariffOptionDamageTypes[i]['quoteLandEntryId'] == quoteLandEntryId) {
                selectedDamageTypes.push(tariffOptionDamageTypes[i]);
            }
        }

        return selectedDamageTypes;
    };
}