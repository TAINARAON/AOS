var brokerInvoker = function(communicator)
{
	console.log("Broker invoker linked");

	// OR MUST THESE BE SPLIT BY Create/Read/Update/Delete FUNCTIONALITY?
	const URL = "some_url_to_get_to_broker_table";

	function getAll(data,successCallback,failureCallback) {
		
	}

	// Creates User. Creates broker linked to created User
	function create(data,successCallback,failureCallback) {

	}

	
	return 
	{
		'url':URL,
		'getAll':getAll,
		'create':create
	}
};