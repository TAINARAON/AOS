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

var testBrokerId = 2;
var testInsurerId = 1;
var testClientId = 4;

function getUser(username,password) {

	var encodedPassword = encodePassword(password);

	return mockCommunicator.getUserByUsernamePassword(username,encodedPassword);
}

var session = new function() {

	this.login = function(username,password) {

		var user = getUser(username,password);
		
		if(user == null) {

			onLoginFailed();
			return;
		}

		var userId =  user['id'];

		console.log(user);

		sessionStorage.setItem(USER_ID,userId);
		
		var nameOfUser = user['name'];
		sessionStorage.setItem(NAME_OF_USER, nameOfUser);
		
		var surnameOfUser = user['surname'];
		sessionStorage.setItem(SURNAME_OF_USER, surnameOfUser);

		var roleName = userInvoker.getRole(user['roleId'])['name'];
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

	this.logout = function() {
		sessionStorage.clear();
		console.log(sessionStorage);
	}
}
function onLoginFailed() {

	alert('login credentials failed');
}

function encodePassword(password) {
	// TODO
	return password;
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

	if(broker['isAdmin'] == true) {

		sessionStorage.setItem(ROLE_NAME, BROKER_ADMIN_NAME);
		alert('Logged in as Broker Admin');

	} else {

		alert('Logged in as Broker');
	}
}
	
function onClientLogin(userId) {

	var client = clientInvoker.getClientByUserId(userId);

	sessionStorage.setItem(CLIENT_ID_NUMBER, client['idNumber']);
	sessionStorage.setItem(CLIENT_CONTACT_NUMBER, client['contactNumber']);

	alert('Logged in as Client');
}

function onInsurerLogin(userId) {

	var insurer = insurerInvoker.getInsurerByUserId(userId);

	if(insurer['isAdmin'] == true) {

		alert('Logged in as Insurer Admin');

	} else {

		alert('Logged in as Insurer');
	}
}








	