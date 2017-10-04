var policyInvoker = new function() {

    this.createFromQuote = function (quoteId,timeSigned=null)  {

        if(!isValidTime(timeSigned)) {

            timeSigned = util.getCurrentDateTime();
        }

        // Get quote, create policy object from quote object. 
        var quote = quoteInvoker.getQuote(quoteId);
        mockCommunicator.deactivateQuote(quoteId);
        var policy = {

            'policyNumber':generatePolicyNumber(quote),
            'businessUnitId':quote['businessUnitId'],
            'brokerId':quote['brokerId'],
            'insurerId':quote['insurerId'],
            'signedOn':timeSigned,
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

    this.getPolicies = function()
    {
        var policies = [];

        var tPolicies = mockCommunicator.getPolicies();
        for(var i = 0; i < tPolicies.length; i++)
        {
            policies.push(getFullPolicy(tPolicies[i]));
        }

        return policies;
    }

    function getFullPolicy(policy)
    {
        policy["businessUnit"] = getBusinessUnit(policy.businessUnitId);
        policy["policyLandEntries"] = getPolicyLandEntriesByPolicyId(policy.id);
        for(var i = 0; i < policy.policyLandEntries.length; i++)
        {
            policy.policyLandEntries[i]["policyLandEntryDamageType"] = getPolicyLandEntryDamageTypesByPolicyLandEntryId(policy.policyLandEntries[i].id);

            policy.policyLandEntries[i]["crop"] = getCrop(policy.policyLandEntries[i].cropId);

            for(var j = 0; j < policy.policyLandEntries[i].policyLandEntryDamageType.length; j++)
            {   
                var tariffOptionDamageTypeId = policy.policyLandEntries[i].policyLandEntryDamageType[j].tariffOptionDamageTypeId;
                policy.policyLandEntries[i].policyLandEntryDamageType[j]["tariffOptionDamageType"] = getTariffOptionDamageTypesByTariffOption(tariffOptionDamageTypeId);

                for(var k = 0; k < policy.policyLandEntries[i].policyLandEntryDamageType[j].tariffOptionDamageType.length; k++)
                {
                    var damageTypeId = policy.policyLandEntries[i].policyLandEntryDamageType[j].tariffOptionDamageType[k].damageTypeId;
                    policy.policyLandEntries[i].policyLandEntryDamageType[j].tariffOptionDamageType[k]["damageType"] = getDamageType(damageTypeId);

                    var tariffOptionId = policy.policyLandEntries[i].policyLandEntryDamageType[j].tariffOptionDamageType[k].tariffOptionId;
                    policy.policyLandEntries[i].policyLandEntryDamageType[j].tariffOptionDamageType[k]["tariffOption"] = getTariffOption(tariffOptionId);

                    /*for(var l = 0; i < policy.policyLandEntries[i].policyLandEntryDamageType[j].tariffOptionDamageType[k].tariffOption.length; l++)
                    {*/
                    var tariffOptionTypeId = policy.policyLandEntries[i].policyLandEntryDamageType[j].tariffOptionDamageType[k].tariffOption.tariffOptionTypeId;
                    policy.policyLandEntries[i].policyLandEntryDamageType[j].tariffOptionDamageType[k].tariffOption["tariffOptionType"] = getTariffOptionType(tariffOptionTypeId);   
                    //}

                    var cropId = policy.policyLandEntries[i].policyLandEntryDamageType[j].tariffOptionDamageType[k].tariffOption.cropId;
                    policy.policyLandEntries[i].policyLandEntryDamageType[j].tariffOptionDamageType[k].tariffOption["crop"] = getCrop(cropId);

                    var productId = policy.policyLandEntries[i].policyLandEntryDamageType[j].tariffOptionDamageType[k].tariffOption.crop.productId;
                    policy.policyLandEntries[i].policyLandEntryDamageType[j].tariffOptionDamageType[k].tariffOption.crop["product"] = getProduct(productId);

                    var priceUomId = policy.policyLandEntries[i].policyLandEntryDamageType[j].tariffOptionDamageType[k].tariffOption.crop.priceUomId;
                    policy.policyLandEntries[i].policyLandEntryDamageType[j].tariffOptionDamageType[k].tariffOption.crop["priceUom"] = getPriceUom(priceUomId);

                    var areaUomId = policy.policyLandEntries[i].policyLandEntryDamageType[j].tariffOptionDamageType[k].tariffOption.crop.areaUomId;
                    policy.policyLandEntries[i].policyLandEntryDamageType[j].tariffOptionDamageType[k].tariffOption.crop["areaUom"] = getAreaUom(areaUomId);
                }
            }
            
            var totalPremium = 0;
            for(var i = 0; i < policy.policyLandEntries.length; i++)
            {
                totalPremium += policy.policyLandEntries[i]["premiumContribution"] = getPremiumContributionOfLandEntry(policy.policyLandEntries[i]);
            }
            policy["premium"] = totalPremium;
        }
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

    function getTariffOptionDamageTypesByTariffOption(id)
    {
        return mockCommunicator.getTariffOptionDamageTypesByTariffOption(id);
    }

    function getDamageType(id)
    {
        return mockCommunicator.getDamageType(id);
    }

    function getTariffOption(id)
    {
        return mockCommunicator.getTariffOption(id);
    }

    function getTariffOptionType(id)
    {
        return mockCommunicator.getTariffOptionType(id);
    }

    function getCrop(id)
    {
        return mockCommunicator.getCrop(id);
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
        console.log(landEntry);
        return tariff;
    }

    this.searchForPolicy = function(policyNumber, businessUnitName)
    {
        var policies = [];
        if(policyNumber != "" && businessUnitName == "")
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

        for(var i = 0; i < policies.length; i++)
        {
            policies[i] = getFullPolicy(policies[i]);
        }

        return policies;
    }
}