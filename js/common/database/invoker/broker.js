var brokerInvoker = new function() {

    this.url =  "someUrlToGetToBrokerTable";

    this.create = function (userData,brokerData) 
    {
        var newUserId = mockCommunicator.createUser(userData);
		
		brokerData.userId = newUserId;
		return mockCommunicator.createBroker(brokerData);
    };

    this.getBrokersWithDetails = function() {

    	var brokers = mockCommunicator.getBrokers();

		for(let i = 0; i< brokers.length; i++) {
			let user = mockCommunicator.getUser(brokers[i].userId);
			brokers[i]['name'] = user['name'];
			brokers[i]['surname'] = user['surname'];
		}

		return brokers;
    };

    this.getCleanBroker = function(id) {
    	var broker = mockCommunicator.getBroker(id);
    	var user = mockCommunicator.getUser(broker.userId);
    
    	var brokerClean = 
    	{
    		'name':user['name'],
    		'surname':user['surname'],
    		'brokerage':this.getCleanBrokerage(broker['brokerageId'])
    	};

		return brokerClean;
    }
    this.getBrokerage = function(id) {
        return mockCommunicator.getBrokerage(id);
    }
    
    this.getBroker = function(id) {
        return mockCommunicator.getBroker(id);
    }
    this.getBrokerByUserId = function(userId) {
        return mockCommunicator.getBrokerByUserId(userId);
    }
    
    this.getCleanBrokerage = function(id) {
    	var brokerage = mockCommunicator.getBrokerage(id);

    	var brokerageClean = 
    	{
    		'name':brokerage['name']
    	};

    	return brokerageClean;
    }
}