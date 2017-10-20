var insurerController = new function() {

	// PRIVATE VARIABLES
	var insurer = null;
	var insuranceAgency = null;
	var user = null;
	
	this.getInsurer = function() {
		return insurer;
	}
	this.getInsuranceAgency = function() {
		return insuranceAgency;
	}
	this.getUser = function() {
		return user;
	}

	var GET_DEFAULT_INSURER_DATA_URL = 'GET_DEFAULT_INSURER_DATA_URL';

	this.init = function(userId) {
		
		getDefaultInsurerData(userId);
	}

	/*  
		insurer/getDefaultInsurerData

		request {
			userId
		}

		response {
			user:{whole},
			insurer:{whole},
			insuranceAgency:{whole},
		}
	*/
	function getDefaultInsurerData(userId) {

		var requestObject = {
			'id':userId
		};

		var mockResponse = 
		{
			'user':{
				'initials':'S',
				'name':'Samantha',
				'surname':'Wiggill',
				'email':'samantha@gmail.com',
			},
			'insurer':
			{
				'id':'0',
				'insuranceAgencyId':0,
				'userId':'1',
				'active':'1',
			},
			'insuranceAgency':
			{
				'name':'Versekerings Ltd.',
				'email':'versekerings.ltd@gmail.com',
				'contactNumber':'062 352 1341',
				'fspNumber':'fsp_0050'
			}
		};

		ajaxPost(GET_DEFAULT_INSURER_DATA_URL,onGetDefaultInsurerSuccess,onGetDefaultInsurerFailure,requestObject,mockResponse);
	}
	function onGetDefaultInsurerSuccess(response) {

		util.createNotification('Logged in as Insurer');

		insurer = response['insurer'];
		insuranceAgency = response['insuranceAgency'];
		user = response['user'];
		
		loader.loadRole('insurer');
	}
	function onGetDefaultInsurerFailure(response) {

		alert('something messed up');
	}
}