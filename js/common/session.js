var USER_ID = 'userId';
var NAME_OF_USER = 'nameOfUser';
var SURNAME_OF_USER = 'nameOfUser';
var ROLE_NAME = 'roleName';

var SESSION_ADMINISTRATOR_NAME = 'System Administrator';
var CLIENT_NAME = 'Client';
var BROKER_NAME = 'Broker';
var BROKER_ADMIN_NAME = 'Broker Administrator';
var INSURER_NAME = 'Insurer';
var INSURER_ADMIN_NAME = 'Insurer Administrator';

var BROKERAGE_NAME = 'brokerageName';
var BROKERAGE_ID = 'brokerageId';
var BROKER_ID = 'brokerId';
var BROKER_ADMIN_ID = 'brokerAdminId';
var BROKERAGE_EMAIL = 'brokerageEmail';
var BROKERAGE_CONACT_NUMBER = 'brokerageContactNumber';
var BROKERAGE_FSP_NUMBER = 'brokerageFspNumber';

var CLIENT_ID_NUMBER = 'clientIdNumber';
var CLIENT_CONTACT_NUMBER = 'clientContactNumber';

var testBrokerId = 2;
var testInsurerId = 1;
var testClientId = 4;

function getUser(username,password) {

	return mockCommunicator.getUserByUsernamePassword(username,password);
}

var session = new function() {

	var name = null;
	var surname = null;

	this.login = function(username,password) {

		var user = getUser(username,password);
		
		if(user == null) {

			onLoginFailed();
			return;
		}

		name = user['name'];
		surname = user['surname'];

		var userId =  user['id'];
		var roleName = userInvoker.getRole(user['roleId'])['name'];

		switch(roleName) {
		    case CLIENT_NAME:
		        onClientLogin(userId);
		        break;
		    case BROKER_NAME:
		        onBrokerLogin(userId);
		        break;
		    case BROKER_ADMIN_NAME:
		        onBrokerAdminLogin(userId);
		        break;
		    case INSURER_NAME:
		        onInsurerLogin(userId);
		        break;
		    case INSURER_ADMIN_NAME:
		        onInsurerAdminLogin(userId);
		        break;
		    default:
		        alert("role log in error");
		        this.logout();
		}
	};

	this.logout = function() {

		sessionStorage.clear();

		name = null;
		surname = null;

		loader.load();
		util.createNotification('Logged out','info');
	}

	this.getName = function() {

		return name;
	}
	this.getSurname = function() {

		return surname;
	}
}

function onLoginFailed() {

	alert('login credentials failed.');
	alert('Valid usernames: IA, I, BA, B, CA, C.  Password = not needed');
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

	util.createNotification('Logged in as Broker');
	loader.loadRole('broker');
}

function onInsurerAdminLogin(userId) {

	insurerAdminController.init(userId);
	util.createNotification('Logged in as Insurer Admin');
	loader.loadRole('insurerAdmin');
}
function onBrokerAdminLogin(userId) {

	brokerAdminController.init(userId);
	util.createNotification('Logged in as Broker Admin');
	loader.loadRole('brokerAdmin');
}
	
function onClientLogin(userId) {

	var client = clientInvoker.getClientByUserId(userId);

	sessionStorage.setItem(CLIENT_ID_NUMBER, client['idNumber']);
	sessionStorage.setItem(CLIENT_CONTACT_NUMBER, client['contactNumber']);

	util.createNotification('Logged in as Client');
	loader.loadRole('client');
}



function onInsurerLogin(userId) {

	util.createNotification('Logged in as Insurer');
	loader.loadRole('insurer');
}








	