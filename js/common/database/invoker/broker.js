var brokerInvoker = new function() {

    this.url =  "someUrlToGetToBrokerTable";

    this.create = function (userData,brokerData) 
    {
        var newUserId = mockCommunicator.createUser(userData);
		
		brokerData.userId = newUserId;
		return mockCommunicator.createBroker(brokerData);
    };

    this.getBrokersDetailed = function() {

    	var brokers = mockCommunicator.getBrokers();

		for(let i = 0; i< brokers.length; i++) {
			let user = mockCommunicator.getUser(brokers[i].userId);
			brokers[i]['name'] = user['name'];
			brokers[i]['surname'] = user['surname'];
		}

		return brokers;
    };

    this.getViewableBrokers = function(brokerId) {

        //return mockCommunicator.getViewableBrokers(brokerId);
        /* 
        [
            {
                'id',   (id of the viewable broker)
                'name',
                'surname'
            }
        ]
        */

        console.log("Broker Id to get Viewable Brokers of");
        console.log(brokerId);

        var viewableBrokers = [];

        var allViewableBrokers = mockCommunicator.getBrokerViewableBrokers();

        for(var i =0; i< allViewableBrokers.length;i++) {
            var viewableBroker = allViewableBrokers[i];
            if(viewableBroker['mainBrokerId'] == brokerId) {

                var broker = mockCommunicator.getBroker(viewableBroker['viewableBrokerId']);
                var user = mockCommunicator.getUser(broker['userId']);

                var neededInfo = {
                    'brokerId':broker['id'],
                    'name':user['name'],
                    'surname':user['surname']
                }

                viewableBrokers.push(neededInfo);
            }
        }

        console.log("Viewable Brokers");
        console.log(viewableBrokers);

        return viewableBrokers;
    }

    this.getBrokerDisplayable = function(id) {

    	var broker = mockCommunicator.getBroker(id);
    	var user = mockCommunicator.getUser(broker.userId);
    
    	var brokerDisplayable = 
    	{
    		'name':user['name'],
    		'surname':user['surname'],
    		'brokerage':this.getCleanBrokerage(broker['brokerageId'])
    	};

		return brokerDisplayable;
    }
    this.getBrokerage = function(id) {
        return mockCommunicator.getBrokerage(id);
    }
    
    this.getBroker = function(id) {
        return mockCommunicator.getBroker(id);
    }
    this.getBrokerAdmin = function(id) {
        return mockCommunicator.getBrokerAdmin(id);
    }
    this.getBrokerByUserId = function(userId) {
        return mockCommunicator.getBrokerByUserId(userId);
    }
    this.getBrokerAdminByUserId = function(userId) {
        return mockCommunicator.getBrokerAdminByUserId(userId);
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