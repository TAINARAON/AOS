var USER_ID = 'userId';
var NAME_OF_USER = 'nameOfUser';
var SURNAME_OF_USER = 'nameOfUser';
var ROLE_NAME = 'roleName';

var SESSION_ADMINISTRATOR_NAME = 'System Administrator';
var CLIENT_NAME = 'Client';
var BROKER_NAME = 'Broker';
var BROKER_ADMIN_NAME = 'Broker Admin';
var INSURER_NAME = 'Insurer';

var BROKERAGE_NAME = 'brokerageName';
var BROKERAGE_ID = 'brokerageId';
var BROKER_ID = 'brokerId';
var BROKERAGE_EMAIL = 'brokerageEmail';
var BROKERAGE_CONACT_NUMBER = 'brokerageContactNumber';
var BROKERAGE_FSP_NUMBER = 'brokerageFspNumber';

var CLIENT_ID_NUMBER = 'clientIdNumber';
var CLIENT_CONTACT_NUMBER = 'clientContactNumber';


function checkLoginCredentials(username,password) {

	var encodedPassword = encodePassword(password);

	var userId = 2;	//mockCommunicator.attemptLogin(username,encodedPassword);

	return userId;
}

var session = new function() {

	this.login = function(username,password) {

		var userId = checkLoginCredentials(username,password);

		if(userId == null) {
			onLoginFailed();
			return;
		}

		var user = userInvoker.getUser(userId);

		sessionStorage.setItem(USER_ID, userId);
		
		var nameOfUser = user['name'];
		sessionStorage.setItem(NAME_OF_USER, nameOfUser);
		
		var surnameOfUser = user['surname'];
		sessionStorage.setItem(SURNAME_OF_USER, surnameOfUser);

		var roleName = userInvoker.getRoleOfUser(user['id'])['name'];
		sessionStorage.setItem(ROLE_NAME, roleName);

		switch(roleName) {
		    case CLIENT_NAME:
		        onClientLogin(userId);
		        break;
		    case BROKER_NAME:
		        onBrokerLogin(userId);
		        break;
		    case INSURER_NAME:
		        onInsurerLogin(userId);
		        break;
		    default:
		        alert("role log in error");
		}
	};

	console.log(sessionStorage);
}
function onLoginFailed() {
	alert('login credentials failed');
}


function encodePassword(password) {

}

function onBrokerLogin(userId) {

	var broker = brokerInvoker.getBrokerByUserId(userId);
	var brokerage = brokerInvoker.getBrokerage(broker['brokerageId']);

	// Broker
	sessionStorage.setItem(BROKER_ID, broker['id']);

	// Brokerage
	sessionStorage.setItem(BROKERAGE_NAME, brokerage['name']);
	sessionStorage.setItem(BROKERAGE_ID, brokerage['id']);
	sessionStorage.setItem(BROKERAGE_EMAIL, brokerage['email']);
	sessionStorage.setItem(BROKERAGE_CONACT_NUMBER, brokerage['contactNumber']);
	sessionStorage.setItem(BROKERAGE_FSP_NUMBER, brokerage['fspNumber']);

	if(broker['isAdmin']) {
		sessionStorage.setItem(ROLE_NAME, BROKER_ADMIN_NAME);
	}
}
	
function onClientLogin(userId) {

	var client = clientInvoker.getClientByUserId(userId);

	sessionStorage.setItem(CLIENT_ID_NUMBER, client['idNumber']);
	sessionStorage.setItem(CLIENT_CONTACT_NUMBER, client['contactNumber']);
}

function onInsurerLogin(userId) {

}








	