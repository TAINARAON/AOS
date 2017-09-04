var brokerInvoker = new function() {
    this.url =  "some_url_to_get_to_broker_table";

    this.create = function (userData,brokerData,successCallback,failureCallback) 
    {
        var newUserId = mockCommunicator.createUser(); //communicator.post(invoker.user.URL)
		
		mockCommunicator.createBroker(newUserId);

		if(newUserId == null) {
			failureCallback();
		} else {
			successCallback();
		}
    };
}