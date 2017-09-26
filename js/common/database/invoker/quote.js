var quoteInvoker = new function() {

    // NEEDED FOR QUOTE CREATION DROP DOWNS
    this.getProducts = function() {

        return mockCommunicator.getProducts();
    }

    this.getCropsOfProduct = function(productId) {

        return mockCommunicator.getCropsOfProduct(productId);
    }

    this.getProductOfCrop(cropId) {

        return mockCommunicator.getProduct(mockCommunicator.getCrop(cropId)['productId']);
    }

    this.getOptionTypes = function() {
        
        return mockCommunicator.getOptionTypes();
    }

    this.getOptionsByFarmCropType = function(farmId,cropId,typeId) {
        
        var districtId = mockCommunicator.getFarm(farmId)['districtId'];

        return mockCommunicator.getOptionsByDistrictCropType(districtId,cropId,typeId);
    }

    this.getDamageTypesAvailableForOption = function(tariffOptionId) {

        var tariffOptionDamageTypes =  mockCommunicator.getTariffOptionDamageTypesByTariffOption(tariffOptionId);
        var damageTypes = [];

        for(var i = 0; i < tariffOptionDamageTypes.length; i++) {
            damageTypes.push(mockCommunicator.getDamageType(tariffOptionDamageTypes[i]['damageTypeId']));
        }

        return damageTypes;
    }

    // END


    this.url =  "someUrlToGetToQuoteTable";

    this.create = function (quoteData,quoteLandEntries)  {

        var quoteId = mockCommunicator.createQuote(quoteData);

        for(let i = 0; i < quoteLandEntries.length; i++) {
        	var quoteLandEntry = quoteLandEntries[i];

        	quoteLandEntry['quoteId'] = quoteId;
        	var landEntryId = mockCommunicator.createQuoteLandEntry(quoteLandEntry);

        	if(landEntryId == null) {
        		console.error("A land entry failed to be created. Roll back whole quote entry");
        		return;
        	}
        }

        return quoteId;
    };

    this.getFarmByNameAndBusinessId = function(farmName, businessId) {
        return mockCommunicator.getFarmByNameAndBusinessId(farmName, businessId);
    }

    this.getLandByNameAndFarmId = function(landNumber,farmId) {
        return mockCommunicator.getLandByNameAndFarmId(landNumber,farmId);
    }

    this.getQuote = function(id) {

        return mockCommunicator.getQuote(id);
    };

    this.getQuotes = function() {

    	return mockCommunicator.getQuotes();
    };

    this.getQuoteByQuoteNumber = function(number)
    {
        return mockCommunicator.getQuoteByQuoteNumber(number);
    }

    this.deleteQuote = function(id)
    {
        // Delete the quote land entries
        mockCommunicator.deleteQuoteLandEntryByQuoteId(id);
        // Delete the quote entry
        mockCommunicator.deleteQuote(id);

        // TODO: delete quoteLandEntryDamageTypeTable entry??
    }

    this.getDetailsOfQuote = function(quoteId) {

        var quote = this.getQuote(quoteId);
        
        var quoteNumber = quote['quoteNumber'];
        var dateCreated = quote['dateCreated'];
        var acceptable = quote['acceptable'];

        var businessUnit = clientInvoker.getCleanBusinessUnit(quote['businessUnitId']);
        var broker = quote['brokerId'] == null ? null : brokerInvoker.getCleanBroker(quote['brokerId']);
        var insurer = quote['insurerId'] == null ? null : insurerInvoker.getCleanInsurer(quote['insurerId']);        
        var quoteLinkedTo = quote['linkedToQuoteId'] == null ? null : this.getDetailsOfQuote(quote['linkedToQuoteId']);
        var quoteLandEntries = this.getDetailsOfQuoteLandEntriesOfQuote(quoteId);
        var premium = this.getPremiumOfQuote(quote);
        
        var detailedQuoteObject = 
        {
            'id':quote['id'],
            'quoteNumber':quoteNumber,
            'businessUnit':businessUnit,
            'broker':broker,
            'insurer':insurer,
            'dateCreated':dateCreated,
            'linkedToQuote':quoteLinkedTo,
            'acceptable':acceptable,
            'quoteLandEntries':quoteLandEntries,
            'premium':premium
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

        var allDamageTypesSelected = mockCommunicator.getQuoteLandEntryDamageTypes();
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
        var selectedDamageTypes = this.getTariffOptionDamageTypesOfQuoteLandEntry(quoteLandEntryId);

        var detailedQuoteLandEntryObject = 
        {
            'id':quoteLandEntry['id'],
            'farm':farm,
            'landNumber':quoteLandEntry['landNumber'],
            'crop':crop,
            'cultivar':quoteLandEntry['cultivar'],
            'area':quoteLandEntry['area'],
            'yield':quoteLandEntry['yield'],
            'price':quoteLandEntry['price'],
            'tariffOption':tariffOption,
            'selectedDamageTypes':selectedDamageTypes
        }

        return detailedQuoteLandEntryObject;
    };

    this.getTariffOptionDamageTypesOfQuoteLandEntry = function(quoteLandEntryId) {

        var quoteLandEntryDamageTypes = mockCommunicator.getQuoteLandEntryDamageTypes();
        var selectedDamageTypes = [];

        for(var i = 0; i < quoteLandEntryDamageTypes.length; i++) {

            var quoteLandEntryDamageType = quoteLandEntryDamageTypes[i];

            if(quoteLandEntryDamageType['quoteLandEntryId'] == quoteLandEntryId) {

                var quoteLandEntryDamageTypeId = quoteLandEntryDamageType['id'];
                var tariffOptionDamageType = mockCommunicator.getTariffOptionDamageType(quoteLandEntryDamageType['tariffOptionDamageTypeId']);
                var damageType = mockCommunicator.getDamageType(tariffOptionDamageType['damageTypeId']);

                var selectedDamageType = 
                {
                    'id':quoteLandEntryDamageTypeId,
                    'damageTypeName':damageType['name'],
                    'tariff':tariffOptionDamageType['tariff']
                };

                selectedDamageTypes.push(selectedDamageType);
            }
        }

        return selectedDamageTypes;
    };

    this.getTotalTariffOfQuoteLandEntryById = function(quoteLandEntryId) {

        return this.getTotalTariffOfQuoteLandEntry(mockCommunicator.getQuoteLandEntry(quoteLandEntryId));
    }
    this.getTotalTariffOfQuoteLandEntry = function(quoteLandEntry) {

        var selectedDamageTypes = this.getTariffOptionDamageTypesSelectedOfLandEntry(quoteLandEntry['id']);;

        var totalTariff = 0;

        for(var i=0;i<selectedDamageTypes.length;i++) {

            var tariffOptionDamageType = mockCommunicator.getTariffOptionDamageType(selectedDamageTypes[i]['tariffOptionDamageTypeId']);
            totalTariff += (tariffOptionDamageType['tariff']*1);
        }

        return totalTariff;
    }

    this.getPremiumContributionOfQuoteLandEntryById = function(quoteLandEntryId) {

        return this.getPremiumContributionOfQuoteLandEntry(mockCommunicator.getQuoteLandEntry(quoteLandEntryId));
    }
    this.getPremiumContributionOfQuoteLandEntry = function(quoteLandEntry) {

        var value = this.getValueOfQuoteLandEntry(quoteLandEntry);
        var tariff = this.getTotalTariffOfQuoteLandEntry(quoteLandEntry);

        return value * tariff;
    }

    this.getValueOfQuoteLandEntryById = function(quoteLandEntryId) {

        return this.getValueOfQuoteLandEntry(mockCommunicator.getQuoteLandEntry(quoteLandEntryId));
    }
    this.getValueOfQuoteLandEntry = function(quoteLandEntry) {

        var price = quoteLandEntry['price'];
        var cropYield = quoteLandEntry['yield'];
        var area = quoteLandEntry['area'];

        return (price * cropYield * area);
    }

    this.getPremiumOfQuoteById = function(quoteId) {

        return this.getPremiumOfQuote(mockCommunicator.getQuote(quoteId));
    }
    this.getPremiumOfQuote = function(quote) {

        var quoteLandEntries = this.getLandEntriesOfQuote(quote['id']);
        var premium = 0;

        for(var i = 0; i < quoteLandEntries.length; i++) {

            premium  += this.getPremiumContributionOfQuoteLandEntry(quoteLandEntries[i]);
        }

        return premium;
    }

    this.getTariffOptionType = function(typeId)
    {
        return mockCommunicator.getTariffOptionType(typeId);
    }

    this.getTariffOptionDamageType = function(id)
    {
        return mockCommunicator.getTariffOptionDamageType(id);
    }
}