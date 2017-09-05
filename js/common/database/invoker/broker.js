var brokerInvoker = new function() {
    this.url =  "some_url_to_get_to_broker_table";

    this.create = function (userData,brokerData,successCallback,failureCallback) 
    {
        var newUserId = mockCommunicator.createUser(userData); //communicator.post(invoker.user.URL)
		
		brokerData.user_id = newUserId;
		mockCommunicator.createBroker(brokerData);

		if(newUserId == null) {
			failureCallback();
		} else {
			successCallback();
		}
    };
}