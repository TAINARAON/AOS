var insurerInvoker = new function() {

    this.url =  "someUrlToGetToInsurerTable";

    this.create = function (userData,insurerData) 
    {
        var newUserId = mockCommunicator.createUser(userData);
		
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

    this.getInsurersWithDetails = function() {

    	var insurers = mockCommunicator.getInsurers();

		for(let i = 0; i< insurers.length; i++) {
			let user = mockCommunicator.getUser(insurers[i]['userId']);
			insurers[i]['name'] = user['name'];
			insurers[i]['surname'] = user['surname'];
		}

		return insurers;
    };

    this.getInsurerWithDetails = function(id) {
    	var insurer = mockCommunicator.getInsurer(id);
    	var user = mockCommunicator.getUser(insurer['userId']);
		insurer['name'] = user['name'];
		insurer['surname'] = user['surname'];

		return insurer;
    }
}