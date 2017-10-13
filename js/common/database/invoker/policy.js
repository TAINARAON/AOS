var policyInvoker = new function() {

    this.createFromQuote = function (quoteId,timeSigned=null)  {

        if(!isValidTime(timeSigned)) {

            timeSigned = util.getCurrentDateTime();
        }
        debugger;
        // Get quote, create policy object from quote object. 
        var quote = quoteInvoker.getQuote(quoteId);
        mockCommunicator.deactivateQuote(quoteId);
        var policy = {

            'policyNumber':generatePolicyNumber(quote),
            'businessUnitId':quote['businessUnitId'],
            'brokerId':quote['brokerId'],
            'insurerId':quote['insurerId'],
            'acceptedOn':timeSigned,
            'linkedToPolicyId':null,
            'active':'1'
        };

        var newPolicyId = savePolicyObject(policy);
        if(newPolicyId == null) {
            alert('error persisting policy object');
            return;
        }

        // Get quoteLandEntries, create policyLandEntries by just replacing quoteId with policyId
        var quoteLandEntries = quoteInvoker.getLandEntriesOfQuote(quoteId);
        
        for(var i = 0; i < quoteLandEntries.length; i++) {

            var quoteLandEntry = quoteLandEntries[i];
            var quoteLandEntryDamageTypes = quoteInvoker.getTariffOptionDamageTypesOfQuoteLandEntry(quoteLandEntry['id']);

            // Create and save policyLandEntry object
            var policyLandEntry = quoteLandEntry;
            delete policyLandEntry['quoteId'];
            policyLandEntry.policyId = newPolicyId;
            // Save policyLandEntryObject
            var newPolicyLandEntryId = savePolicyLandEntryObject(policyLandEntry);
            if(newPolicyLandEntryId == null) {
                alert('failed to save policyLandEntry object. Must revert whole policy object that was saved with ID of '+newPolicyId);
                return;
            }

            for(var j = 0; j < quoteLandEntryDamageTypes.length; j++) {

                var quoteLandEntryDamageType = quoteLandEntryDamageTypes[j];

                var policyLandEntryDamageType = quoteLandEntryDamageType;
                delete policyLandEntryDamageType['quoteLandEntryId'];
                policyLandEntryDamageType['policyLandEntryId'] = newPolicyLandEntryId;
                // save policyLandEntryDamageType
                var newPledtId = savePolicyLandEntryDamageTypeObject(policyLandEntryDamageType);

                if(newPledtId == null) {
                    alert('failed to save policyLandEntryDamageType object. Must revert whole policy object that was saved with ID of '+newPolicyId);
                    return;
                }
            }
        }


        

        // Deactivate all the quote components

        return newPolicyId;
    };


    // TODO
    this.createLinkedPolicy = function(policyObject,timeSigned=null) {

        
    };


    function isValidTime(time) {
        // TODO
        return time != null;
    };

    function savePolicyLandEntryDamageTypeObject(o) {

        return mockCommunicator.createPolicyLandEntryDamageType(o);
    }

    function savePolicyLandEntryObject(policyLandEntry) {

        return mockCommunicator.createPolicyLandEntry(policyLandEntry);
    }
    function savePolicyObject(policy) {

        return mockCommunicator.createPolicy(policy);
    }

    function generatePolicyNumber(quote) {
        return '523465';
    }
    function getCurrentTime() {
        return '2017-08-30 19:01:05';
    }

    // Newly methods
    this.searchForPolicy = function(brokerId, policyNumber, businessUnitName)
    {
        var policies = [];
        if(policyNumber == "" && businessUnitName == "")
        {
            policies = mockCommunicator.getPolicies();
        }
        else if(policyNumber != "" && businessUnitName == "")
        {
            policies.push(mockCommunicator.getPolicyByPolicyNumber(policyNumber));
        }
        else if(businessUnitName != "" && policyNumber == "")
        {
            var businessUnit = mockCommunicator.getBusinessUnitByName(businessUnitName);
            policies = mockCommunicator.getPoliciesByBusinessUnitId(businessUnit.id);
        }
        else
        {
            var businessUnit = mockCommunicator.getBusinessUnitByName(businessUnitName);
            var tPolicies = mockCommunicator.getPoliciesByBusinessUnitId(businessUnit.id);

            for(var i = 0; i < tPolicies.length; i++)
            {
                if(tPolicies[i].policyNumber == policyNumber)
                {
                    policies.push(tPolicies[i]);
                }
            }
        }

        var finalPolicies = [];
        for(var i = 0; i < policies.length; i++)
        {
            if(policies[i].brokerId == brokerId)
            {
                finalPolicies.push(getFullPolicy(policies[i]));
            }
        }

        return finalPolicies;
    }

    function getFullPolicy(policy)
    {
        policy["businessUnit"] = getBusinessUnit(policy.businessUnitId);
        policy["policyLandEntries"] = getPolicyLandEntriesByPolicyId(policy.id);

        for(var i = 0; i < policy.policyLandEntries.length; i++)
        {
            var landEntry = policy.policyLandEntries[i];

            landEntry["farm"] = mockCommunicator.getFarm(landEntry.farmId);
            
            addCropToLandEntry(landEntry, getCrop(landEntry.cropId));

            addPolicyLandEntryDamageTypeToLandEntry(landEntry, getPolicyLandEntryDamageTypesByPolicyLandEntryId(landEntry.id));

            for(var j = 0; j < landEntry.policyLandEntryDamageType.length; j++)
            {   
                var policyLandEntryDamageType = landEntry.policyLandEntryDamageType[j];

                var tariffOptionDamageTypeId = policyLandEntryDamageType.tariffOptionDamageTypeId;
                addTariffOptionDamageTypeTopolicyLandEntryDamageType(policyLandEntryDamageType, getTariffOptionDamageTypesByTariffOption(tariffOptionDamageTypeId));

                for(var k = 0; k < policyLandEntryDamageType.tariffOptionDamageType.length; k++)
                {
                    var tariffOptionDamageType = policyLandEntryDamageType.tariffOptionDamageType[k];

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
                    policy.policyLandEntries[i].policyLandEntryDamageType[j].tariffOptionDamageType[k].tariffOption.crop["product"] = getProduct(productId);

                    var priceUomId = tariffOptionDamageType.tariffOption.crop.priceUomId;
                    policy.policyLandEntries[i].policyLandEntryDamageType[j].tariffOptionDamageType[k].tariffOption.crop["priceUom"] = getPriceUom(priceUomId);

                    var areaUomId = tariffOptionDamageType.tariffOption.crop.areaUomId;
                    policy.policyLandEntries[i].policyLandEntryDamageType[j].tariffOptionDamageType[k].tariffOption.crop["areaUom"] = getAreaUom(areaUomId);*/
                }
            }
        }

        var totalPremium = 0;
        for(var i = 0; i < policy.policyLandEntries.length; i++)
        {
            totalPremium += policy.policyLandEntries[i]["premiumContribution"] = getPremiumContributionOfLandEntry(policy.policyLandEntries[i]);
        }
        policy["premium"] = totalPremium;

        console.log(policy);

        return policy;
    }

    function getBusinessUnit(id)
    {
        return mockCommunicator.getBusinessUnit(id);
    }

    function getPolicyLandEntriesByPolicyId(id)
    {
        return mockCommunicator.getPolicyLandEntriesByPolicyId(id);
    }

    function getPolicyLandEntryDamageTypesByPolicyLandEntryId(id)
    {
        return mockCommunicator.getPolicyLandEntryDamageTypesByPolicyLandEntryId(id);
    }

    function addPolicyLandEntryDamageTypeToLandEntry(landEntry, policyLandEntryDamageTypeData)
    {
        landEntry["policyLandEntryDamageType"] = policyLandEntryDamageTypeData;
    }

    function getTariffOptionDamageTypesByTariffOption(id)
    {
        return mockCommunicator.getTariffOptionDamageTypesByTariffOption(id);
    }

    function addTariffOptionDamageTypeTopolicyLandEntryDamageType(policyLandEntryDamageType, tariffOptionDamageTypeData)
    {
        policyLandEntryDamageType["tariffOptionDamageType"] = tariffOptionDamageTypeData;
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

        for(var h  = 0; h < landEntry.policyLandEntryDamageType.length; h++)
        {
            var policyLandEntryDamageType = landEntry.policyLandEntryDamageType[h];
            for(var i = 0; i < policyLandEntryDamageType.tariffOptionDamageType.length; i++)
            {
                var tariffOptionDamageType = landEntry.policyLandEntryDamageType[h].tariffOptionDamageType[i];
                tariff += (tariffOptionDamageType['tariff']*1);
            }
        }
        
        return tariff;
    }
}