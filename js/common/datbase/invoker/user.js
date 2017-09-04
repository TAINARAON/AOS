var userInvoker = function(communicator)
{
	console.log("User invoker linked");

	const URL = "some_url_that_targets_user_table";

	function create(data,successCallback,failureCallback) {
		communicator.post(URL,);
	}

	function get(id) {

	}

	function update(data, id) {

	}

	function deleteEntry(id) {

	}

	function getAll()
	{
		//communicator.post(user.URL, "", getAllUsersCallback);
	}


	return 
	{
		'url':URL,
		'create':create,
		'get':get,
		'update':update,
		'delete':deleteEntry
		'getAll':getAllBrokers,
		
	}
};