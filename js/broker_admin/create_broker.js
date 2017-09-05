document.getElementById('create_broker_submit_div').onclick = function(e){onCreateBrokerClick();};

// creates broker, by supplying Username and email
function onCreateBrokerClick() {

	// User data
	var username = document.getElementById('create_broker_username_input').value;
	var email = document.getElementById('create_broker_email_input').value;

	var userData = 
	{
		"username":username,
		"password":generateRandomPassword(),
		"roleId":getRoleIdOfBroker(),
		"email":email
	}

	var brokerData = 
	{
		"brokerageId":getIdOfBrokerage(),
		"isAdmin":"0"
	}

	brokerInvoker.create(userData, brokerData, onCreateBrokerSuccess, onCreateBrokerFailure);
}

function onCreateBrokerSuccess() {
	loader.loadPage('html/broker_admin/brokerage.html');
}

function onCreateBrokerFailure() {
	alert("createdBrokerFailure");
}

function getRoleIdOfBroker() {
	// TODO
	return 0;
}

function getIdOfBrokerage() {
	// TODO
	return 0;
}

function generateRandomPassword() {
	// TODO
	return Math.random().toString(36).substr(2, 5);
}
