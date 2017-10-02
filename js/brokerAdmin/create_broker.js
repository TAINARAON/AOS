document.getElementById('create_broker_submit_div').onclick = function(e){onCreateBrokerClick();};

// creates broker, by supplying Username and email
function onCreateBrokerClick() {

	// User data
	var username = document.getElementById('create_broker_username_input').value;
	var email = document.getElementById('create_broker_email_input').value;
	var name = document.getElementById('create_broker_name_input').value;
	var surname = document.getElementById('create_broker_surname_input').value;
	
	var userData = 
	{
		"username":username,
		"password":generateRandomPassword(),
		"roleId":getRoleIdOfBroker(),
		"name":name,
		"surname":surname,
		"email":email
	}

	var brokerData = 
	{
		"brokerageId":getIdOfBrokerage(),
		"isAdmin":"0"
	}

	var newId = brokerInvoker.create(userData, brokerData);

	if(newId != null) {
		onCreateBrokerSuccess(name, surname, email);
	}
}

function onCreateBrokerSuccess(name, surname, email) {
	alert(name + ' ' + surname + ' has been created. An email has been sent to ' + email + '.');
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
