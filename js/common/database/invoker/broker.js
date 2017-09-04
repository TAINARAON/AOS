var brokerInvoker = function(communicator)
{
	console.log("Broker invoker linked");

	// OR MUST THESE BE SPLIT BY Create/Read/Update/Delete FUNCTIONALITY?
	const URL = "some_url_to_get_to_broker_table";

	function create(userData,brokerData,successCallback,failureCallback) {
		



		var newUserId = mockCummunarot.createUser(); //communicator.post(invoker.user.URL)
		createBroker(newUserId);

		if(newUserId == null) {
			failureCallback();
		} else {

		}
	}


	function getAll(data,successCallback,failureCallback) {
		
	}

	

	
	return 
	{
		'url':URL,
		'getAll':getAll,
		'create':create
	}
};