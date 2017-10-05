var quoteInvoker = new function() {

    // NEEDED FOR QUOTE CREATION DROP DOWNS
    this.getProducts = function() {

        return mockCommunicator.getProducts();
    }

    this.getCropsOfProduct = function(productId) {

        return mockCommunicator.getCropsOfProduct(productId);
    }

    this.getProductOfCrop = function(cropId) {

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

            var tariffOptionDamageTypeIdArray = quoteLandEntry.tariffOptionDamageTypes;

            for(var j = 0; j < tariffOptionDamageTypeIdArray.length; j++)
            {
                var tObj = {
                    "quoteLandEntryId":landEntryId,
                    "tariffOptionDamageTypeId":tariffOptionDamageTypeIdArray[j].id
                }

                var id = mockCommunicator.createQuoteLandEntryDamageType(tObj);

                if(id == null)
                {
                    console.error("A Quote land damage type entry failed to be created. Roll back whole quote entry");
                    return;
                }
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

    /*this.getLandById = function(landId)
    {
        return mockCommunicator.getLand(landId);
    }*/

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

    this.getTariffOption = function(id)
    {
        return mockCommunicator.getTariffOption(id);
    }

    this.getTariffOptionDamageType = function(id)
    {
        return mockCommunicator.getTariffOptionDamageType(id);
    }
    this.getDamageType = function(id)
    {
        return mockCommunicator.getDamageType(id);
    }

    this.getQouteLandEntryDamageTypesByLandEntryId = function(landEntryId)
    {
        return mockCommunicator.getQouteLandEntryDamageTypesByLandEntryId(landEntryId);
    }

    this.getPerils = function()
    {
        return mockCommunicator.getPerils();
    }

    // New methods

    this.searchForQuote = function(brokerId, quoteNumber, businessUnitName)
    {
        var quotes = [];
        
        if(quoteNumber == "" && businessUnitName == "")
        {
            quotes = mockCommunicator.getQuotes();
        }
        else if(quoteNumber != "" && businessUnitName == "")
        {
            quotes.push(mockCommunicator.getQuoteByQuoteNumber(quoteNumber));
        }
        else if(businessUnitName != "" && quoteNumber == "")
        {
            var businessUnit = mockCommunicator.getBusinessUnitByName(businessUnitName);
            quotes = mockCommunicator.getQuotesByBusinessUnitId(businessUnit.id);
        }
        else
        {
            var businessUnit = mockCommunicator.getBusinessUnitByName(businessUnitName);
            var tQuotes = mockCommunicator.getQuotesByBusinessUnitId(businessUnit.id);
            for(var i = 0; i < tQuotes.length; i++)
            {
                if(tQuotes[i].quoteNumber == quoteNumber)
                {
                    quotes.push(tQuotes[i]);
                }
            }
        }

        // Convert to full quote
        var finalQuotes = [];
        for(var i = 0; i < quotes.length; i++)
        {
            if(quotes[i].brokerId == brokerId)
            {
                finalQuotes.push(getFullQuote(quotes[i]));
            }
        }

        return finalQuotes;
    }

    function getFullQuote(quote)
    {
        quote["businessUnit"] = getBusinessUnit(quote.businessUnitId);
        quote["quoteLandEntries"] = getQuoteLandEntriesByQuoteId(quote.id);

        for(var i = 0; i < quote.quoteLandEntries.length; i++)
        {
            var landEntry = quote.quoteLandEntries[i];
            
            addCropToLandEntry(landEntry, getCrop(landEntry.cropId));

            addQuoteLandEntryDamageTypeToLandEntry(landEntry, getQuoteLandEntryDamageTypesByQuoteLandEntryId(landEntry.id));

            for(var j = 0; j < landEntry.quoteLandEntryDamageType.length; j++)
            {   
                var quoteLandEntryDamageType = landEntry.quoteLandEntryDamageType[j];

                var tariffOptionDamageTypeId = quoteLandEntryDamageType.tariffOptionDamageTypeId;
                addTariffOptionDamageTypeToQuoteLandEntryDamageType(quoteLandEntryDamageType, getTariffOptionDamageTypesByTariffOption(tariffOptionDamageTypeId));

                for(var k = 0; k < quoteLandEntryDamageType.tariffOptionDamageType.length; k++)
                {
                    var tariffOptionDamageType = quoteLandEntryDamageType.tariffOptionDamageType[k];

                    var damageTypeId = tariffOptionDamageType.damageTypeId;
                    addDamageTypeToTariffOptionDamageType(tariffOptionDamageType, getDamageType(damageTypeId));

                    var tariffOptionId = tariffOptionDamageType.tariffOptionId;
                    addTariffOptionToTariffOptionDamageType(tariffOptionDamageType, getTariffOption(tariffOptionId));

                    // Adding values to tariffOption
                    var tariffOption = tariffOptionDamageType.tariffOption;
                    var tariffOptionTypeId = tariffOption.tariffOptionTypeId;
                    addTariffOptionTypeToTariffOption(tariffOption, getTariffOptionType(tariffOptionTypeId));

                    var cropId = tariffOption.cropId;
                    addCropToTariffOption(tariffOption, getCrop(cropId));

                    // Adding values to crop
                    /*var productId = tariffOptionDamageType.tariffOption.crop.productId;
                    quote.quoteLandEntries[i].quoteLandEntryDamageType[j].tariffOptionDamageType[k].tariffOption.crop["product"] = getProduct(productId);

                    var priceUomId = tariffOptionDamageType.tariffOption.crop.priceUomId;
                    quote.quoteLandEntries[i].quoteLandEntryDamageType[j].tariffOptionDamageType[k].tariffOption.crop["priceUom"] = getPriceUom(priceUomId);

                    var areaUomId = tariffOptionDamageType.tariffOption.crop.areaUomId;
                    quote.quoteLandEntries[i].quoteLandEntryDamageType[j].tariffOptionDamageType[k].tariffOption.crop["areaUom"] = getAreaUom(areaUomId);*/
                }
            }
        }

        var totalPremium = 0;
        for(var i = 0; i < quote.quoteLandEntries.length; i++)
        {
            totalPremium += quote.quoteLandEntries[i]["premiumContribution"] = getPremiumContributionOfLandEntry(quote.quoteLandEntries[i]);
        }
        quote["premium"] = totalPremium;

        console.log(quote);

        return quote;
    }

    function getBusinessUnit(id)
    {
        return mockCommunicator.getBusinessUnit(id);
    }

    function getQuoteLandEntriesByQuoteId(id)
    {
        return mockCommunicator.getQuoteLandEntriesByQuoteId(id);
    }

    function getQuoteLandEntryDamageTypesByQuoteLandEntryId(id)
    {
        return mockCommunicator.getQuoteLandEntryDamageTypesByQuoteLandEntryId(id);
    }

    function addQuoteLandEntryDamageTypeToLandEntry(landEntry, quoteLandEntryDamageTypeData)
    {
        landEntry["quoteLandEntryDamageType"] = quoteLandEntryDamageTypeData;
    }

    function getTariffOptionDamageTypesByTariffOption(id)
    {
        return mockCommunicator.getTariffOptionDamageTypesByTariffOption(id);
    }

    function addTariffOptionDamageTypeToQuoteLandEntryDamageType(quoteLandEntryDamageType, tariffOptionDamageTypeData)
    {
        quoteLandEntryDamageType["tariffOptionDamageType"] = tariffOptionDamageTypeData;
    }

    function getDamageType(id)
    {
        return mockCommunicator.getDamageType(id);
    }

    function addDamageTypeToTariffOptionDamageType(tariffOptionDamageType, damageTypeData)
    {
        tariffOptionDamageType["damageType"] = damageTypeData;
    }

    function getTariffOption(id)
    {
        return mockCommunicator.getTariffOption(id);
    }

    function addTariffOptionToTariffOptionDamageType(tariffOptionDamageType, tariffOptionData)
    {
        tariffOptionDamageType["tariffOption"] = tariffOptionData;
    }

    function getTariffOptionType(id)
    {
        return mockCommunicator.getTariffOptionType(id);
    }

    function addTariffOptionTypeToTariffOption(tariffOption, tariffOptionTypeData)
    {
        tariffOption["tariffOptionType"] = tariffOptionTypeData;
    }

    function getCrop(id)
    {
        return mockCommunicator.getCrop(id);
    }

    function addCropToLandEntry(landEntry, cropData)
    {
        landEntry["crop"] = cropData;
    }

    function addCropToTariffOption(tariffOption, cropData)
    {
        tariffOption["crop"] = cropData;
    }

    function getProduct(id)
    {
        return mockCommunicator.getProduct(id);
    }

    function getPriceUom(id)
    {
        return mockCommunicator.getPriceUom(id);
    }

    function getAreaUom(id)
    {
        return mockCommunicator.getAreaUom(id);
    }

    function getPremiumContributionOfLandEntry(landEntry)
    {
        var value = getValueOfLandEntry(landEntry);
        var tariff = getLandEntryTariff(landEntry);

        landEntry["tariff"] = tariff;

        return value * tariff;
    }

    function getValueOfLandEntry(landEntry)
    {
        var price = landEntry['price'];
        var cropYield = landEntry['yield'];
        var area = landEntry['area'];

        return (price * cropYield * area);
    }

    function getLandEntryTariff(landEntry)
    {
        var tariff = 0;

        for(var h  = 0; h < landEntry.quoteLandEntryDamageType.length; h++)
        {
            var quoteLandEntryDamageType = landEntry.quoteLandEntryDamageType[h];
            for(var i = 0; i < quoteLandEntryDamageType.tariffOptionDamageType.length; i++)
            {
                var tariffOptionDamageType = landEntry.quoteLandEntryDamageType[h].tariffOptionDamageType[i];
                tariff += (tariffOptionDamageType['tariff']*1);
            }
        }
        
        return tariff;
    }
}