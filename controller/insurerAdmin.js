var insurerAdminController = new function() {

	// PRIVATE VARIABLES
	var insurerAdmin = null;
	var insuranceAgency = null;
	var user = null;
	this.getInsurerAdmin = function() {
		return insurerAdmin;
	}
	this.getInsuranceAgency = function() {
		return insuranceAgency;
	}
	this.getUser = function() {
		return user;
	}

	var CREATE_INSURER_URL = "CREATE_INSURER_URL";
	var GET_BROKER_DETAILS_OF_BROKERAGE_URL = "GET_BROKER_DETAILS_OF_BROKERAGE_URL";
	var GET_BROKERAGES_URL = "GET_BROKERAGES_URL";
	var GET_INSURER_ADMIN_BY_USER_ID_URL = "GET_INSURER_ADMIN_BY_USER_ID_URL";
	var GET_INSURANCE_AGENCY_URL = "GET_INSURANCE_AGENCY_URL";
	var GET_DATA_FOR_POOL_LIMIT_SYSTEMKEY_VIEW_URL = 'GET_DATA_FOR_POOL_LIMIT_SYSTEMKEY_VIEW_URL';
	var GET_CREATE_POOL_LIMIT_DATA_URL = 'GET_CREATE_POOL_LIMIT_DATA_URL';
	var CREATE_POOL_LIMIT_URL = 'CREATE_POOL_LIMIT_URL';
	var GET_BROKERS_OF_BROKERAGES_URL = 'GET_BROKERS_OF_BROKERAGES_URL';
	var CREATE_BROKER_URL = 'CREATE_BROKER_URL';
	
	var GET_DEFAULT_INSURER_ADMIN_DATA_URL = '/Insurer/Admin/getDefaultInsurerAdminData';
	var GET_INSURERS_OF_INSURANCE_AGENCY_WITH_USER_DATA_URL = 'GET_INSURERS_OF_INSURANCE_AGENCY_WITH_USER_DATA_URL';
	var GET_BROKERAGES_AND_THEIR_BROKERS = 'GET_BROKERAGES_AND_THEIR_BROKERS';
	var GET_BUSINESS_UNITS_AND_THEIR_FARMS = 'GET_BUSINESS_UNITS_AND_THEIR_FARMS';

	this.init = function(userId) {
		
		getDefaultInsurerAdminData(userId);
	}
	// ################################ DONE #################################




	// ################################ NEEDS FIX ############################

	/*  Works. Needs proper data returned
		insurerAdmin/getDefaultInsurerAdminData

		request {
			userId
		}

		response {
			user:{whole},
			insurerAdmin:{whole},
			insuranceAgency:{whole},
		}
	*/
	function getDefaultInsurerAdminData(userId) {

		var requestObject = {
			'userId':userId
		};

		/*var mockResponse = 
		{
			'user':{
				'initials':'S',
				'name':'Samantha',
				'surname':'Wiggill',
				'email':'samantha@gmail.com',
			},
			'insurerAdmin':
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
		};*/

		ajaxPost(GET_DEFAULT_INSURER_ADMIN_DATA_URL,onGetDefaultInsurerAdminSuccess,onGetDefaultInsurerAdminFailure,requestObject);
	}
	function onGetDefaultInsurerAdminSuccess(response) {

		util.createNotification('Logged in as Insurer Admin');

		insurerAdmin = response['insurerAdmin'];
		insuranceAgency = response['insuranceAgency'];
		user = response['user'];

		console.log(insurerAdmin);
		console.log(insuranceAgency);
		console.log(user);
		
		loader.loadRole('insurerAdmin');
	}
	function onGetDefaultInsurerAdminFailure(response) {

		alert('something messed up');
	}



	// #################################  TO BE WRITTEN  ######################

	
	/*	20171017
		insurerAdmin/getInsurersOfInsuranceAgencyWithUserData

		request {
			insuranceAgencyId
		}

		response {
			insurers:[{name,surname,initials}]
		}
	*/
	this.getInsurersOfInsuranceAgencyWithUserData = function(successCallback,failureCallback) {

		var insuranceAgencyId = insuranceAgency['id'];

		var requestObject = 
		{
			'insuranceAgencyId':insuranceAgencyId
		};

		var mockResponse = 
		{	
			'insurers':[
				{
					'name':'Tiaan',
					'surname':'Gerber',
					'initials':'T J'
				},
				{
					'name':'Sally',
					'surname':'Williams',
					'initials':'S'
				}
			]
		};

		ajaxPost(GET_INSURERS_OF_INSURANCE_AGENCY_WITH_USER_DATA_URL,successCallback,failureCallback,requestObject,mockResponse);
	}
	/*	20171017
		insurerAdmin/getBrokeragesAndTheirBrokers

		requestObject:{
			insuranceAgencyId
		}

		responseObject: {
			brokeragesAndBrokers:
			[
				{
					id,  (brokerageId)
					name,
					brokers:
					[
						{
							id, (brokerId)
							initials,
							surname,
							name
						}
					]
				}
			]
		}
	*/
	this.getBrokeragesAndTheirBrokers = function(successCallback,failCallback) {

		var requestObject = 
		{
			"insuranceAgencyId":insuranceAgency['id']
		};

		var mockResponse = {
			'brokeragesAndBrokers':[]
		};

		var brokerages = mockCommunicator.brokerageTable;

		for(var i = 0; i < brokerages.length; i++) {

			var brokerage = brokerages[i];
			var brokers = mockCommunicator.getBrokersOfBrokerage(brokerage['id']);

			var brokerageWithBrokers = {
				'id':brokerage['id'],
				'name':brokerage['name'],
				'brokers':[]
			}

			for(var j = 0; j < brokers.length; j++) {

				var broker = brokers[j];
				var userDetails = mockCommunicator.getDetailsOfUser(broker['userId']);

				var neededDetailsOfBroker = {
					'id':broker['id'],
					'initials':userDetails['initials'],
					'surname':userDetails['surname'],
					'name':userDetails['name'],
				}

				brokerageWithBrokers['brokers'].push(neededDetailsOfBroker);
			}

			mockResponse['brokeragesAndBrokers'].push(brokerageWithBrokers);
		}

		ajaxPost(GET_BROKERAGES_AND_THEIR_BROKERS,successCallback,failCallback,requestObject,mockResponse);
	};
	/*	20171017
		insurerAdmin/getBusinessUnitsAndTheirFarms

		requestObject:{
			insuranceAgencyId
		}

		responseObject: {
			businessUnitsAndFarms:
			[
				{
					id,  (businessUnitId)
					name,
					farms:
					[
						{
							id, (farmId)
							name
						}
					]
				}
			]
		}
	*/
	this.getBusinessUnitsAndTheirFarms = function(successCallback,failCallback) {

		var requestObject = 
		{
			"insuranceAgencyId":insuranceAgency['id']
		};

		var mockResponse = {
			businessUnitsAndFarms:
			[
				{
					id:0, 
					name:'Business Unit 0',
					farms:
					[
						{
							id:0, 
							name:'Farm 0'
						},
						{
							id:1, 
							name:'Farm 1'
						}
					]
				},
				{
					id:1, 
					name:'Business Unit 1',
					farms:
					[
						{
							id:2, 
							name:'Farm 2'
						},
						{
							id:3, 
							name:'Farm 3'
						}
					]
				}
			]
		}

		ajaxPost(GET_BUSINESS_UNITS_AND_THEIR_FARMS,successCallback,failCallback,requestObject,mockResponse);
	};

	







	// NEW STUFF 2017/10/16.
	/*  
		insurerAdmin/getDataForPoolLimitSystemkeyView

		requestObject:{
			insuranceAgencyId
		}

		responseObject:{
			crops:
			[
				{
					id,name
				}
			],
			districts:
			[
				{
					id,name
				}
			],
			limits:
			[
				{
					whole limit object
				}
			]
		}
	*/
	this.getDataForPoolLimitSystemkeyView = function(successCallback,failureCallback) {

		var insuranceAgencyId = 1;	//insuranceAgency['id'];

		var requestObject = {
			'insuranceAgencyId':insuranceAgencyId
		};

		var mockResponse = {
			'crops':
			[
				{
					id:0,name:"Apple"
				},
				{
					id:1,name:"Banana"
				},
			],
			'districts':
			[
				{
					id:0,name:"Alberton"
				},
				{
					id:1,name:"Bellville"
				},
			],
			'limits':
			[
				{
					'id':'0',
					'districtId':0,
					'cropId':0,
					'seasonId':0,
					'maximum':10000,
					'runningValue':2000,
					'additionalTariff':5,
					'insuranceAgencyId':0
				},
				{
					'id':'1',
					'districtId':0,
					'cropId':1,
					'seasonId':0,
					'maximum':11000,
					'runningValue':2000,
					'additionalTariff':6,
					'insuranceAgencyId':0
				},
				{
					'id':'2',
					'districtId':1,
					'cropId':0,
					'seasonId':0,
					'maximum':11110,
					'runningValue':1110,
					'additionalTariff':10,
					'insuranceAgencyId':0
				},
				{
					'id':'3',
					'districtId':1,
					'cropId':1,
					'seasonId':0,
					'maximum':20100,
					'runningValue':2000,
					'additionalTariff':4,
					'insuranceAgencyId':0
				},
			]
		}

		ajaxPost(GET_DATA_FOR_POOL_LIMIT_SYSTEMKEY_VIEW_URL,successCallback,failureCallback,requestObject,mockResponse);
	}
	/*  
		insurerAdmin/createPoolLimit

		requestObject:{
			'cropId':cropId,
			'districtId':districtId,
			'maximum':maximum,
			'additionalTariff':additionalTariff
		};

		responseObject:{
			'status'
		}
	*/
	this.createPoolLimit = function(successCallback,failureCallback,requestObject) {

		ajaxPost(CREATE_POOL_LIMIT_URL,successCallback,failureCallback,requestObject);
	}

	/*  
		insurerAdmin/getCreatePoolLimitData

		requestObject:{
			insuranceAgencyId
		};

		responseObject:{
			'crops':[],
			'districts':[]
		}
	*/
	this.getCreatePoolLimitData = function() {

	}
	// END OF NEW STUFF 2017/10/16

	/*  
		insurerAdmin/getBrokersOfBrokerage

		requestObject:{
			brokerageId
		}

		responseObject:{
			brokers:[{whole broker}]
		}
	*/
	this.getBrokersOfBrokerage = function(successCallback,failureCallback,brokerageId) {

		var requestObject = {
			'brokerageId':brokerageId
		};

		var mockResponse = {
			'brokers':[
				{'name':'Tiaan','id':0,'surname':'Gerber','initials':'T J'},
				{'name':'Anro','id':1,'surname':'Swart','initials':'A'}
			]
		};

		ajaxPost(GET_BROKERS_OF_BROKERAGES_URL,successCallback,failureCallback,requestObject,mockResponse);
	}

	/*
		insurerAdmin/createBroker

		requestObject:{
			data:{
				brokerageId,
				creationRights,
				email,
				name,
				surname,
				initials,
				contactNumber
			},
			fileData:[]
		}

		responseObject:{
			message
		}
	*/
	this.createBroker = function (successCallback,failCallback,requestObject) {

	    var mockResponse = {
			'message':'fake response'
		};

	   ajaxPost(CREATE_BROKER_URL,successCallback,failCallback,requestObject,mockResponse);
	};



	/*   SENT TO WIKUS
		insurerAdmin/getInsurerAdminByUserId

		requestObject:{
			userUuid
		}

		responseObject:{
			insurerAdmin:{whole insurerAdmin}
		}
	*/
	/*function ajaxGetInsurerAdminByUserId(userId) {

		var requestObject = {
			"userUuid":userId
		};

		ajaxPost(GET_INSURER_ADMIN_BY_USER_ID_URL,onGetInsurerAdminSuccess,onGetInsurerAdminFail,requestObject);
	}*/
	// NEEDED
	/*function onGetInsurerAdminSuccess(response) {

		insurerAdmin = response["insurerAdmin"];

		ajaxGetInsuranceAgency(insurerAdmin['id']);
	}*/
	// NEEDED
	/*function onGetInsurerAdminFail(response) {

		alert("ERROR! Could not initiate Brokerage");
	}*/
	/*  SENT TO WIKUS
		insurerAdmin/getInsuranceAgency

		requestObject:{
			insuranceAgencyId
		}

		responseObject:{
			insuranceAgency:{whole insuranceAgency}
		}
	*/
	/*function ajaxGetInsuranceAgency(insuranceAgencyId) {

		var requestObject = {
			"insuranceAgencyUuid":insuranceAgencyId
		};
*/
		/*var mockResponse = {
			insuranceAgency:{
				'uuid':'0',
				'name':'Versekerings Ltd.',
				'active':'1',
				'dateCreated':'1990-08-25',
				'email':'breeker.brokerage@gmail.com',
				'contactNumber':'0623521574',
				'fspNumber':'FSP000',
				'verified':'1'
			}
		}*/

		/*ajaxPost(GET_INSURANCE_AGENCY_URL,onGetInsuranceAgencySuccess,onGetInsuranceAgencyFail,requestObject);
	}*/
	// NEEDED
	/*function onGetInsuranceAgencySuccess(response) {

		insuranceAgency = response["insuranceAgency"];
	}*/
	// NEEDED
	/*function onGetInsuranceAgencyFail(response) {

		alert("ERROR! Could not initiate insuranceAgency");
	}*/
	/*   NOT SENT YET
		insurerAdmin/getBrokerDetailsOfBrokerage

		requestObject:{
			brokerageId
		}

		responseObject:{
			brokers:
			[
				{
					id,
					name,
					surname
				}
			]
		}
	*/
	this.aagetBrokerDetailsOfBrokerage = function(successCallback,failCallback,brokerageId) {

		var requestObject = 
		{
			"brokerageId":brokerageId
		};

		var mockResponse = {
			"brokers":mockCommunicator.getBrokersForBrokerTableInBrokerageTab(brokerageId)
		};

		if(brokerageId == "ALL") {
			mockResponse = {
				"brokers":mockCommunicator.getBrokers(brokerageId)
			};
		}

		ajaxPost(GET_BROKER_DETAILS_OF_BROKERAGE_URL,successCallback,failCallback,requestObject,mockResponse);
	};	// USED ???
	
		

	/*
		insurerAdmin/getBrokerages

		requestObject:{
			insuranceAgencyId
		}

		responseObject:{
			brokerages:
			[
				{
					id,
					name,
				}
			]
		}
	*/
	this.getBrokerages = function(successCallback,failCallback) {

		var requestObject = 
		{
			"insuranceAgencyId":insuranceAgency["id"]
		};

		var mockResponse = {
			"brokerages":mockCommunicator.getBrokerages()
		};

		ajaxPost(GET_BROKERAGES_URL,successCallback,failCallback,requestObject,mockResponse);
	}	// USED






	/*
		insurerAdmin/createInsurer

		requestObject:{
			data:{
				insuranceAgencyId,
				name,
				surname,
				email,
				fspNumber
			},
			fileData:{
			}
		}

		responseObject:{
			id
		}
	*/
	this.createInsurer = function (successCallback,failCallback,requestObject) {

	    var mockResponse = {
			"id":'test'
		};

	   ajaxPost(CREATE_INSURER_URL,successCallback,failCallback,requestObject,mockResponse);
	};

	// ------------------------------ Anro methods

	//Policy
	this.getBrokerages = function(successCallback,failCallback,requestObject) {
		var mockResponse = [
			{
				'id':'0',
				'name':'Breeker Brokerage',
				'active':'1',
				'dateCreated':'1990-08-25',
				'email':'breeker.brokerage@gmail.com',
				'contactNumber':'0623521574',
				'fspNumber':'FSP000',
				'verified':'1'
			},
			{
				'id':'1',
				'name':'Maakelaar Brokerage',
				'active':'1',
				'dateCreated':'1990-09-21',
				'email':'makelaar.brokerage@gmail.com',
				'contactNumber':'0623521348',
				'fspNumber':'FSP001',
				'verified':'1'
			}
		];

		ajaxPost(GET_BROKERAGES_URL,successCallback,failCallback,requestObject,mockResponse);
	}

	this.getPolicies = function(successCallback,failCallback,requestObject)
		{
			var mockResponse = [
				{
					'id':'2',
					'policyNumber':'00002',
					'businessUnitId':'0',
					'businessUnit':{
						'id':'0',
						'name':'BU0',   //'Anro Boerdery Co (ABC)',
						'contactNumber':'063-887-9635',
						'contactPerson':'Anro Swart',
						'email':'anro.swart@bing.com',
						'vatNumber':'00625-4811',
						'incomeTaxNumber':'5651484166',
						'active':'1',
						'verified':'1'
					},
					'brokerId':'1',
					'insurerId':null,
					'acceptedOn':'1508541611830',
					'active':'1',
					'linkedToPolicyId':null,
					'totalInsuredValue':'R200 000',
					'premium':19000,
					'policyLandEntries':[
						{
							'id':'4',
							'policyId':'2',
							'farmId':'0',
							'farm':{
								'id':'0',
								'name':'P0',
								'businessUnitId':'0',
								'latitude':'1.22644',
								'longitude':'-0.35428',
								'active':'1',
								'districtId':'0'
							},
							'landNumber':'00003',
							'landLongitude':'131.044',
							'landLatitude':'-25.363',
							'cropId':'1',
							'crop':{
								'id':'1',
								'name':'Banana',
								'productId':'0',
								'active':'1',
								'priceUomId':'0',
								'areaUomId':'0'
							},
							'cultivar':'Red Dwarf',
							'area':'7.4',
							'yield':'14.22',
							'price':'5.48',
							'tariffOptionId':'0',
							'additionalTariff':0,
							'tariff':0.3333333333,
							'policyLandEntryDamageTypes':[
								{
									'id':'8',
									'policyLandEntryId':'4',
									'tariffOptionDamageTypeId':'0',
									'tariffOptionDamageType':{
										'id':'0',
										'tariffOptionId':'0',
										'tariffOption':{
											'id':'0',
											'tariffOptionTypeId':'0',
											'tariffOptionType':{
												'id':'0',
												'name':'Franchise',
											},
											'cropId':'0',
											'districtId':'0',
											'coverage':'5',
											'coverageStart':'2017-05-01 00:00:00',
											'coverageEnd':'2018-05-01 00:00:00',
										},
										'damageTypeId':'0',
										'damageType':{
											'id':'0',
											'name':'Fire',
										},
										'tariff':'0.175',
										'isDefault':'1'
									}
								}
							]
						},
						{
							'id':'5',
							'policyId':'2',
							'farmId':'1',
							'farm':{
								'id':'1',
								'name':'P1',
								'businessUnitId':'0',
								'latitude':'1.325642',
								'longitude':'-0.35243',
								'active':'1',
								'districtId':'0'
							},
							'landNumber':'00004',
							'landLongitude':'131.044',
							'landLatitude':'-25.363',
							'cropId':'1',
							'crop':{
								'id':'1',
								'name':'Banana',
								'productId':'0',
								'active':'1',
								'priceUomId':'0',
								'areaUomId':'0'
							},
							'cultivar':'Something',
							'area':'8.4',
							'yield':'16.11',
							'price':'9.48',
							'tariffOptionId':'0',
							'additionalTariff':0,
							'tariff':0.3333333333,
							'policyLandEntryDamageTypes':[
								{
									'id':'10',
									'policyLandEntryId':'5',
									'tariffOptionDamageTypeId':'0',
									'tariffOptionDamageType':{
										'id':'0',
										'tariffOptionId':'0',
										'tariffOption':{
											'id':'0',
											'tariffOptionTypeId':'0',
											'tariffOptionType':{
												'id':'0',
												'name':'Franchise',
											},
											'cropId':'0',
											'districtId':'0',
											'coverage':'5',
											'coverageStart':'2017-05-01 00:00:00',
											'coverageEnd':'2018-05-01 00:00:00',
										},
										'damageTypeId':'0',
										'damageType':{
											'id':'0',
											'name':'Fire',
										},
										'tariff':'0.175',
										'isDefault':'1'
									}
								}
							]
						}
					]	
				},
				{
					'id':'3',
					'policyNumber':'00003',
					'businessUnitId':'0',
					'businessUnit':{
						'id':'0',
						'name':'BU0',   //'Anro Boerdery Co (ABC)',
						'contactNumber':'063-887-9635',
						'contactPerson':'Anro Swart',
						'email':'anro.swart@bing.com',
						'vatNumber':'00625-4811',
						'incomeTaxNumber':'5651484166',
						'active':'1',
						'verified':'1'
					},
					'brokerId':'1',
					'insurerId':null,
					'acceptedOn':'1508541611830',
					'active':'1',
					'linkedToPolicyId':null,
					'totalInsuredValue':'R200 000',
					'premium':18500,
					'policyLandEntries':[
						{
							'id':'6',
							'policyId':'3',
							'farmId':'0',
							'farm':{
								'id':'0',
								'name':'P0',
								'businessUnitId':'0',
								'latitude':'1.22644',
								'longitude':'-0.35428',
								'active':'1',
								'districtId':'0'
							},
							'landNumber':'00005',
							'landLongitude':'131.044',
							'landLatitude':'-25.363',
							'cropId':'1',
							'crop':{
								'id':'1',
								'name':'Banana',
								'productId':'0',
								'active':'1',
								'priceUomId':'0',
								'areaUomId':'0'
							},
							'cultivar':'Red Dwarf',
							'area':'7.4',
							'yield':'14.22',
							'price':'5.48',
							'tariffOptionId':'0',
							'additionalTariff':0.21111111111,
							'tariff':0.2555555555,
							'policyLandEntryDamageTypes':[
								{
									'id':'11',
									'policyLandEntryId':'5',
									'tariffOptionDamageTypeId':'1',
									'tariffOptionDamageType':{
										'id':'1',
										'tariffOptionId':'0',
										'tariffOption':{
											'id':'0',
											'tariffOptionTypeId':'0',
											'tariffOptionType':{
												'id':'0',
												'name':'Franchise',
											},
											'cropId':'0',
											'districtId':'0',
											'coverage':'5',
											'coverageStart':'2017-05-01 00:00:00',
											'coverageEnd':'2018-05-01 00:00:00',
										},
										'damageTypeId':'1',
										'damageType':{
											'id':'1',
											'name':'Flood',
										},
										'tariff':'0.235',
										'isDefault':'0'
									}
								}
							]
						}
					]	
				}
			];

			ajaxPost("Some url",successCallback,failCallback,requestObject,mockResponse);
		}
	//^ Policy ^
	// Damage Report
	this.getDamageReports = function(successCallback,failCallback,requestObject)
		{
			var NOTSTARTED = 0;
			var INPROGRESS = 1;
			var DONE = 2;
			var mockResponse = [
				{
					'id':'2',
					'damageTypeId':0,
					'damageType':{
						'id':'0',
						'name':'Fire'
					},
					'dateOfDamage':'2017/05/11',
					'dateOfReporting':'2017/05/11',
					'damageReportNumber':'00002',
					'requiresTaxation':false,
					'taxationProgress':DONE,
					'damageReportLandEntries':[
						{
							'id':'4',
							'damageReportId':2,
							'policyLandEntryId':1,
							'inspected':true,
							'policyLandEntry':{
								'id':'1',
								'policyId':'0',
								'farmId':'1',
								'landNumber':'00002',
								'landLongitude':'131.044',
								'landLatitude':'-25.363',
								'cropId':'1',
								'crop':{'id':'1',
									'name':'Banana',
									'productId':'0',
									'active':'1',
									'priceUomId':'0',
									'areaUomId':'0'
								},
								'cultivar':'Something',
								'area':'8.4',
								'yield':'16.11',
								'price':'9.48',
								'tariffOptionId':'0',
								'additionalTariff':0
							}
						}
					],
					"farm":{
						'id':'1',
						'name':'P1',
						'businessUnitId':'0',
						'latitude':'1.325642',
						'longitude':'-0.35243',
						'active':'1',
						'districtId':'0',
						'district':{
							'id':'0',
							'name':'Bellville',
							'active':'1'
						},
						"businessUnit":{
							'id':'0',
							'name':'BU0',   //'Anro Boerdery Co (ABC)',
							'contactNumber':'063-887-9635',
							'contactPerson':'Anro Swart',
							'email':'anro.swart@bing.com',
							'vatNumber':'00625-4811',
							'incomeTaxNumber':'5651484166',
							'active':'1',
							'verified':'1'
						}
					}
				}
			];

			ajaxPost("Some url",successCallback,failCallback,requestObject,mockResponse);
		}
	// ^ Damage Report ^
}