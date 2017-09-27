var insurerInvoker = new function() {

    this.url =  "someUrlToGetToInsurerTable";

    this.create = function (userData,insurerData) 
    {
        var newUserId = mockCommunicator.createUser(userData);
		
        if(newUserId == null) {
            return null;
        }

		insurerData.user_id = newUserId;

		return mockCommunicator.createInsurer(insurerData);
    };

    this.getCleanInsurer = function(id) {

    	var insurer = mockCommunicator.getInsurer(id);
    	var user = mockCommunicator.getUser(insurer['userId']);

    	var cleanInsurer = 
    	{
    		'name':user['name'],
    		'surname':user['surname'],
    	};

    	return cleanInsurer;
    }

    this.getAllInsurersClean = function() {

        var insurers = mockCommunicator.getInsurers();
        var cleanInsurers = [];

        for ( var i = 0; i < insurers.length; i++ ) {

            cleanInsurers.push(this.getCleanInsurer(insurers[i]['id']));
        }

        return cleanInsurers;
    }

    this.createTariffOption = function(tariffOption,tariffOptionDamageTypes) {

        var inceptionDelay = mockCommunicator.getInceptionDelay();
        var coverageStartDateTime = util.addTimeToDateTime(util.getCurrentDateTime(),inceptionDelay,'milliseconds');
        tariffOption['coverageStart'] = coverageStartDateTime;

        var coverageEndDateTime = util.addTimeToDateTime(coverageStartDateTime,52,'weeks');
        tariffOption['coverageEnd'] = coverageEndDateTime;

        var newTariffId = mockCommunicator.createTariffOption(tariffOption);

        if(newTariffId != null) {

            for ( var i = 0; i < tariffOptionDamageTypes.length; i++ ) {

                var tariffOptionDamageType = tariffOptionDamageTypes[i];
                tariffOptionDamageType['tariffOptionId'] = newTariffId;

                var newTariffOptionDamageTypeId = mockCommunicator.createTariffOptionDamageType(tariffOptionDamageType);
                
                if(newTariffOptionDamageTypeId == null) {
                    alert('ERROR. Need to revert whole tariff creation.');
                }   
            } 
        } else {
            alert('error. Tariff could not be saved.');
        }

        return newTariffId;
    }

    this.getInsurersWithDetails = function() {

    	var insurers = mockCommunicator.getInsurers();

		for(let i = 0; i< insurers.length; i++) {
			let user = mockCommunicator.getUser(insurers[i]['userId']);
			insurers[i]['name'] = user['name'];
			insurers[i]['surname'] = user['surname'];
		}

		return insurers;
    };

    this.getInsurerByUserId = function(id) {
        return mockCommunicator.getInsurerByUserId(id);
    }

    this.getPriceUoms = function() {
        return mockCommunicator.getPriceUoms();
    }

    this.getAreaUoms = function() {
        return mockCommunicator.getAreaUoms();
    }
    this.getPerils = function() {
        return mockCommunicator.getPerils();
    }

    this.getInsurerWithDetails = function(id) {
    	var insurer = mockCommunicator.getInsurer(id);
    	var user = mockCommunicator.getUser(insurer['userId']);
		insurer['name'] = user['name'];
		insurer['surname'] = user['surname'];

		return insurer;
    }
    this.getOptionTypes = function() {
        return mockCommunicator.getOptionTypes();
    }
    this.getCropsOfProduct = function(productId) {
        return mockCommunicator.getCropsOfProduct(productId);
    }
    this.getDistricts = function() {
        return mockCommunicator.getDistricts();
    }
    this.getProducts = function() {
        return mockCommunicator.getProducts();
    }
    this.getInceptionDelayInSeconds = function() {
        return mockCommunicator.getInceptionDelayInSeconds();
    }
    this.createCrop = function(cropObject) {
        return mockCommunicator.createCrop(cropObject);
    }
    this.createPriceUom = function(priceUomObject) {
        return mockCommunicator.createPriceUom(priceUomObject);
    }
    this.createAreaUom = function(areaUomObject) {
        return mockCommunicator.createAreaUom(areaUomObject);
    }
    this.createPeril = function(perilObject) {
        return mockCommunicator.createDamageType(perilObject);
    }
    this.createDistrict = function(districtObject) {
        return mockCommunicator.createDistrict(districtObject);
    }
    this.getCrops = function() {
        return mockCommunicator.getCrops();
    }
    this.getOptionTypes = function() {
        return mockCommunicator.getOptionTypes();
    }
    this.getDistricts = function() {
        return mockCommunicator.getDistricts();
    }
    this.getDetailsOfTariffs = function(tariffs) {

        var detailedTariffs = [];

        for (var i = 0; i < tariffs.length; i++ ) {

            var tariff = tariffs[i];

            var coverage = tariff['coverage'];
            var coverageStart = tariff['coverageStart'];
            var coverageEnd = tariff['coverageEnd'];
            var tariffOptionTypeId = tariff['tariffOptionTypeId'];
            var cropId = tariff['cropId'];
            var districtId = tariff['districtId'];

            var optionTypeName = mockCommunicator.getTariffOptionType(tariffOptionTypeId)['name'];
            var cropName = mockCommunicator.getCrop(cropId)['name'];
            var districtName = mockCommunicator.getDistrict(districtId)['name'];

            var detailedTariff = {
                'coverage':coverage,
                'coverageStart':coverageStart,
                'coverageEnd':coverageEnd,
                'tariffOptionTypeName':optionTypeName,
                'cropName':cropName,
                'districtName':districtName,
            };

            detailedTariffs.push(detailedTariff);
        }   

        return detailedTariffs;
    }

    this.getDetailsOfCrops = function(crops) {

        var detailedCrops = [];

        for (var i = 0; i < crops.length; i++ ) {

            var productId = crops[i]['productId'];
            var areaUomId = crops[i]['areaUomId'];
            var priceUomId = crops[i]['priceUomId'];

            var productName = mockCommunicator.getProduct(productId)['name'];
            var priceUomName = mockCommunicator.getPriceUom(priceUomId)['name'];
            var areaUomName = mockCommunicator.getAreaUom(areaUomId)['name'];

            var detailedCrop = {
                'name':crops[i]['name'],
                'productName':productName,
                'priceUomName':priceUomName,
                'areaUomName':areaUomName
            };

            detailedCrops.push(detailedCrop);
        }   

        return detailedCrops;
    }

    this.getTariffsByCropDistrictOptionType = function(cropId,districtId,tariffOptionTypeId) {

        var validTariffs = [];
        var tariffs = mockCommunicator.getTariffOptions();

        for ( var i = 0; i < tariffs.length; i++ ) {

            var tariff = tariffs[i];
            // Filter by CropId
            if(cropId != 'ALL') {

                // Break out if doesnt pass
                if(tariff['cropId'] != cropId) {
                    continue;
                }
            }

            // Filter by DistrictId
            if(districtId != 'ALL') {

                // Break out if doesnt pass
                if(tariff['districtId'] != districtId) {
                    continue;
                }
            }

            // Filter by OptionTypeId
            if(tariffOptionTypeId != 'ALL') {

                // Break out if doesnt pass
                if(tariff['tariffOptionTypeId'] != tariffOptionTypeId) {
                    continue;
                }
            }

            // If it has passed all the filters, add to valid tariff array
            validTariffs.push(tariff);
        }

        return validTariffs;
    }

    this.getPriceUoms = function() {
        return mockCommunicator.getPriceUoms();
    }
    this.getAreaUoms = function() {
        return mockCommunicator.getAreaUoms();
    }
    this.getPerils = function() {
        return mockCommunicator.getPerils();
    }
    this.getInceptionDelay = function() {
        return mockCommunicator.getInceptionDelay();
    }
    this.updateInceptionDelay = function(inceptionDelayInMillis) {

        return mockCommunicator.updateInceptionDelay(inceptionDelayInMillis);
    }
    this.getTax = function() {
        return mockCommunicator.getTax();
    }
    this.updateTax = function(inceptionDelayInMillis) {

        return mockCommunicator.updateTax(inceptionDelayInMillis);
    }
    this.getInsuranceAgency = function(id) {
        return mockCommunicator.getInsuranceAgency(id);
    }

}