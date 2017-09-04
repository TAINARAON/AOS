// creates broker, by supplying Username and email, and isAdmin

function onCreateBrokerClick() {

	// User data
	var username = "";
	var email = "";

	var userData = 
	{
		"username":username,
		"password":generateRandomPassword();,
		"roleId":getRoleIdOfBroker(),
		"email":email
	}

	var brokerData = 
	{
		"brokerageId":getIdOfBrokerage(),
		"isAdmin":false
	}

	invoker.broker.create(userData, brokerData, onCreateBrokerSuccess, onCreateBrokerFailure);
}


function onCreateBrokerSuccess() {

}

function onCreateBrokerFailure() {
	
}


function getRoleIdOfBroker() {
	// query db
	return 3;
}

function generateRandomPassword() {
	return "abcdefg";
}

function getIdOfBrokerage() {
	// query db
	return 3;
}
