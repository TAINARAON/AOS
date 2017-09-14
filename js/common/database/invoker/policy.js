var policyInvoker = new function() {

    this.create = function (quoteId,timeSigned=null,linkedToPolicyId=null)  {

        if(!isValidTime(timeSigned)) {
            timeSigned = getCurrentTime();
        }

        // Get quote, create policy object from quote object. 
        var quote = quoteInvoker.getQuote(quoteId);
        var policy = {

            'policyNumber':generatePolicyNumber(quote),
            'businessUnitId':quote['businessUnitId'],
            'brokerId':quote['brokerId'],
            'insurerId':quote['insurerId'],
            'signedOn':timeSigned,
            'linkedToPolicyId':linkedToPolicyId,
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

                /*console.log('QuoteLandEntryDamageType: ' + j);
                console.log(quoteLandEntryDamageType);*/

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

        return newPolicyId;
    };
    function isValidTime(time) {
        // TODO
        return time != null;
    }

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
}