var clientInvoker = new function() {

    this.create = function (userData,clientData) 
    {
        var newUserId = mockCommunicator.createUser(userData);
		
		clientData.userId = newUserId;
		return mockCommunicator.createClient(clientData);
    };

    this.getClient = function(id) {

        console.warn("getQuote - TODO");
    	return null;
    };
    this.getClientByUserId = function(userId) {
        return mockCommunicator.getClientByUserId(userId);
    }

    this.getCleanClient = function(id) {

    	var client = this.getClient(id);
    	var user = mockCommunicator.getUser(client.userId);
    
    	var clientClean = 
    	{
    		'name':user['name'],
    		'surname':user['surname'],
    		'idNumber':client['idNumber'],
            'contactNumber':client['contactNumber']
    	};

		return clientClean;
    }

    this.getCleanBusinessUnit = function(id) {

        var businessUnit = mockCommunicator.getBusinessUnit(id);

        var businessUnitClean = 
        {
            'name':businessUnit['name'],
            'contactNumber':businessUnit['contactNumber'],
            'contactPerson':businessUnit['contactPerson'],
            'email':businessUnit['email'],
            'vatNumber':businessUnit['vatNumber'],
            'incomeTaxNumber':businessUnit['incomeTaxNumber']
        }

        return businessUnitClean;
    }

    this.getBusinessUnitByName = function(name)
    {
        return mockCommunicator.getBusinessUnitByName(name);
    }

    this.getFarmByName = function(name)
    {
        return mockCommunicator.getFarmByName(name);
    }
    this.getFarm = function(id) {
        return mockCommunicator.getFarm(id);
    }
    this.getBusinessUnit = function(id) {
        return mockCommunicator.getBusinessUnit(id);
    }
    
    this.getCrop = function(id)
    {
        return mockCommunicator.getCrop(id);
    }
}