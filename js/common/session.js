var LOGIN_URL = '/login';



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

// delete me
/*function getUser(username,password) {

	return mockCommunicator.getUserByUsernamePassword(username,password);
}*/

var session = new function() {

	var name = null;
	var surname = null;

	this.login = function(username,password) {

		var requestObject = 
		{
			'username':username,
			'password':password
		};

		var mockResponse;

		if(username=="B") {
			mockResponse = 
			{
				'token':'abcdefghijklmnop',
				'userId':'7',
				'roleName':BROKER_NAME
			};
		} else if(username=="IA") {
			mockResponse = 
			{
				'token':'abcdefghijklmnop',
				'userId':'1',
				'roleName':INSURER_ADMIN_NAME
			};
		} else if(username=="BA") {
			mockResponse = 
			{
				'token':'abcdefghijklmnop',
				'userId':'3',
				'roleName':BROKER_ADMIN_NAME
			};
		} else if(username=="C") {
			mockResponse = 
			{
				'token':'abcdefghijklmnop',
				'userId':'4',
				'roleName':CLIENT_NAME
			};
		} else if(username=="I") {
			mockResponse = 
			{
				'token':'abcdefghijklmnop',
				'userId':'4',
				'roleName':INSURER_NAME
			};
		} else {
			alert('nope');
		}

		ajaxPost(LOGIN_URL,onLoginSuccess,onLoginFailure,requestObject,mockResponse);

	};

	this.logout = function() {

		// TODO
	}
}

function encodePassword(password) {
	// TODO
	return password;
}

/*function onBrokerLogin(userId) {

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
}*/

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

// ################## NEW STUFF 2017/10/16 #

function onLoginSuccess(response) {

	var roleName = response['roleName'];
	var userId = response['userId'];

	switch(roleName) {
	    case CLIENT_NAME:
	        clientController.init(userId);
	        break;
	    case BROKER_NAME:
	        brokerController.init(userId);
	        break;
	    case BROKER_ADMIN_NAME:
	        brokerAdminController.init(userId);
	        break;
	    case INSURER_NAME:
	        insurerController.init(userId);
	        break;
	    case INSURER_ADMIN_NAME:
	         insurerAdminController.init(userId);
	        break;
	    default:
	        alert("role log in error");
	        this.logout();
	}
}

function onLoginFailure(response) {

	// Reset username / password inputs
	$('#login_username').val('');
	$('#login_password').val('');

	// Notify user
	util.createNotification('Username and password combination is not correct','error');

	// Display forgot credentials?
	$('#retrieve_lost_credentials_button').show();
}


// #########################################








	