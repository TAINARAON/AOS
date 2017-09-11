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

    this.getBrokerWithDetails = function(id) {
    	var broker = mockCommunicator.getBroker(id);
    	var user = mockCommunicator.getUser(broker.userId);
		broker['name'] = user['name'];
		broker['surname'] = user['surname'];

		return broker;
    }
}