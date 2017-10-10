var brokerAdminController = new function() {

	// PRIVATE VARIABLES
	var brokerage = null;
	var brokerAdmin = null;

	// PUBLIC FUNCTIONS
	this.init = function(userId) {

		brokerAdmin = 	getBrokerAdminByUserId(userId);
		brokerage = 	getBrokerage(brokerAdmin['brokerageId']);

		util.createNotification('brokerAdminController initialized','info');
	}

	/*
		Parameters: userData
		Expects: id
	*/
	this.createBroker = function (userData,brokerData,viewableBrokerData) 
	{
	    var dataObject = 
	    {
	    	'userData':userData,
	    	'brokerData':brokerData,
	    	'viewableBrokerData':viewableBrokerData
	    };

	    console.log("create broker");
	    console.log(dataObject);
		
		return mockCommunicator.createBroker(dataObject);
	};

	/*
		Parameters: brokerageId
		Expects: 	Array of Brokers WHERE brokerageId = parameter. Only need id, name and surname of Brokers. 
	*/
	this.getBrokersForBrokerTableInBrokerageTab = function() {

		return mockCommunicator.getBrokersForBrokerTableInBrokerageTab(brokerage['id']);
	};	

	/*
		Parameters: brokerId
		Expects: 	name, surname, quoteRights, policyRights, damageReportRights, clientCreationRights
					array of BrokerViewableBrokers' id,name,surname
	
	this.getBrokerForEditModal = function(brokerId) {

		return mockCommunicator.getBrokerDisplayable(brokerId);
	}*/


	this.getBrokerage = function() {

		return brokerage;
	}

	this.getBrokerAdmin = function() {

		return brokerAdmin;
	}

	this.updateBroker = function(brokerData,callback) {
		console.log('updateBroker');
		console.log(brokerData);
		// return mockCommunicator.updateBroker(brokerData);
		callback();
	}

	this.getBrokerForEditModal = function(brokerId) {

		//return mockCommunicator.getBrokerForEditModal(brokerId);
		/*
			{
				name,
				surname,
				creationRights,
				brokerViewableBrokers: [
					{
						id (broker)
						name,
						surname,
					}
				]
			}
		*/

		var broker = mockCommunicator.getBroker(brokerId);
		var user = mockCommunicator.getUser(broker['userId']);

		var name = user['name'];
		var surname = user['surname'];

		/*var quoteRights = broker['quoteRights'];
		var policyRights = broker['policyRights'];
		var damageReportRights = broker['damageReportRights'];*/
		var	creationRights = broker['creationRights'];

		var brokerViewableBrokersDetails = [];
		var brokerViewableBrokers = mockCommunicator.getBrokerViewableBrokersOfBroker(brokerId);
		for (var i = 0; i < brokerViewableBrokers.length; i++) {

			var viewableBroker = brokerViewableBrokers[i];
			var viewableUser = mockCommunicator.getUser(viewableBroker['userId']);

			brokerViewableBrokersDetails.push(
				{
					'id':viewableBroker['id'],
					'name':viewableUser['name'],
					'surname':viewableUser['surname'],
				}
			);
		}

		var response = 
		{
			'name':name,
			'surname':surname,
			/*'quoteRights':quoteRights,
			'policyRights':policyRights,
			'damageReportRights':damageReportRights,*/
			'creationRights':creationRights,
			'brokerViewableBrokers':brokerViewableBrokersDetails
		}

		return response;
	}

	this.revokeBroker = function(brokerId,callback) {
		// Deactivates Broker
		callback();
	}

	// PRIVATE FUNCTIONS
	/*
		Parameters: brokerageId
		Expects: 	name, email, contactNumber, fspNumber
	*/
	function getBrokerage(brokerageId) {

		return mockCommunicator.getBrokerage(brokerageId);
	}

	function getBrokerAdminByUserId(userId) {

		return mockCommunicator.getBrokerAdminByUserId(userId);
	}
}