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

	// System key urls
	var GET_AREA_UOMS = '/Insurer/Admin/getAreaUoms';
	var CREATE_AREA_UOM = '/Insurer/Admin/createAreaUom';
	var GET_PRODUCTS = '/Insurer/Admin/getProducts';
	var GET_CROPS = '/Insurer/Admin/getCrops';
	var GET_CROP_OF_PRODUCT = '/Insurer/Admin/getCropsOfProduct';
	var GET_PRICE_UOMS = '/Insurer/Admin/getPriceUoms';
	var CREATE_PRICE_UOM = '/Insurer/Admin/createPriceUom';
	var CREATE_CROP = '/Insurer/Admin/createCrop';
	var GET_DISTRICTS = '/Insurer/Admin/getDistrics';
	var CREATE_DISTRICT = '/Insurer/Admin/createDistrict';
	var UPDATE_INCEPTION_DELAY = '/Insurer/Admin/updateInceptionDelay';
	var GET_PERILS = '/Insurer/Admin/getPerils';
	var CREATE_PERIL = '/Insurer/Admin/createPeril';
	var GET_TAX = '/Insurer/Admin/getTax';
	var CREATE_TAX = '/Insurer/Admin/createTax';
	var CREATE_TARIFF_OPTION = '/Insurer/Admin/createTariffOption';
	// ^ System key urls ^

	this.init = function(userId) {
		
		getDefaultInsurerAdminData(userId);
	}
	// ################################ DONE #################################

	/*  DONE
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
		var user = mockCommunicator.getUser(userId);
		var insurerAdmin = mockCommunicator.getInsurerAdminByUserId(userId);
		var insuranceAgency = mockCommunicator.getInsuranceAgency(insurerAdmin['insuranceAgencyId']);

		var mockResponse = {
			'user':user,
			'insurerAdmin':insurerAdmin,
			'insuranceAgency':insuranceAgency
		}

		ajaxPost(GET_DEFAULT_INSURER_ADMIN_DATA_URL,onGetDefaultInsurerAdminSuccess,onGetDefaultInsurerAdminFailure,requestObject,mockResponse);
	}
	// DONE
	function onGetDefaultInsurerAdminSuccess(response) {

		util.createNotification('Logged in as Insurer Admin');

		insurerAdmin = response['insurerAdmin'];
		insuranceAgency = response['insuranceAgency'];
		user = response['user'];

		/*console.log(insurerAdmin);
		console.log(insuranceAgency);
		console.log(user);*/
		
		loader.loadRole('insurerAdmin');
	}
	// DONE
	function onGetDefaultInsurerAdminFailure(response) {

		alert('something messed up');
	}

	/*	DONE
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

		var insurers = mockCommunicator.getInsurers();
		var detailedInsurers = [];

		for(var i = 0; i < insurers.length; i++) {
			var insurer = insurers[i];
			var user = mockCommunicator.getUser(insurer['userId']);
			insurer['name'] = user['name'];
			insurer['surname'] = user['surname'];
			insurer['initials'] = user['initials'];

			detailedInsurers.push(insurer);
		}

		var mockResponse = 
		{	
			'insurers':insurers
		};

		//console.log('getInsurersOfInsuranceAgencyWithUserData');
		//console.log(mockResponse);

		ajaxPost(GET_INSURERS_OF_INSURANCE_AGENCY_WITH_USER_DATA_URL,successCallback,failureCallback,requestObject,mockResponse);
	}

	/*	DONE
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

		//console.log('getBrokeragesAndTheirBrokers');
		//console.log(mockResponse);

		ajaxPost(GET_BROKERAGES_AND_THEIR_BROKERS,successCallback,failCallback,requestObject,mockResponse);
	};

	/*	DONE
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

		var businessUnitsAndFarms = [];
		var businessUnitsIMaySeeIds = [];

		var businessUnitsIMaySee = mockCommunicator.getBusinessUnits();
		//console.log(businessUnitsIMaySee);
		for(var i = 0; i < businessUnitsIMaySee.length; i++) {
			businessUnitsIMaySeeIds.push(businessUnitsIMaySee[i]['id']);
		}

		// Getting the businessUnit objectse
		for(var i = 0; i < businessUnitsIMaySee.length; i++) {
			//console.log(businessUnitsIMaySee[i]);
			var businessUnitAndItsFarms = mockCommunicator.getBusinessUnitAndItsFarms(businessUnitsIMaySee[i]['id']);
			businessUnitsAndFarms.push(businessUnitAndItsFarms);
		}

		var mockResponse = {
			'businessUnitsAndFarms':businessUnitsAndFarms
		}

		//console.log('getBusinessUnitsAndTheirFarms');
		//console.log(businessUnitsAndFarms);

		ajaxPost(GET_BUSINESS_UNITS_AND_THEIR_FARMS,successCallback,failCallback,requestObject,mockResponse);
	};

	// DONE
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

		var limits = mockCommunicator.getLimits();
		var crops = [];
		var districts = [];

		var duplicateCrops = [];
		var duplicateDistricts = [];
		for(var i = 0;i < limits.length; i++) {
			var limit = limits[i];

			var crop = mockCommunicator.getCrop(limit['cropId']);
			var district = mockCommunicator.getDistrict(limit['districtId']);
			duplicateCrops.push(crop);
			duplicateDistricts.push(district);
		}

		crops = util.returnUniqueEntries(duplicateCrops);
		districts = util.returnUniqueEntries(duplicateDistricts);

		var mockResponse = {
			'crops':crops,
			'districts':districts,
			'limits':limits
		};

		ajaxPost(GET_DATA_FOR_POOL_LIMIT_SYSTEMKEY_VIEW_URL,successCallback,failureCallback,requestObject,mockResponse);
	}

	/*  DONE
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

		var newPoolLimitId = mockCommunicator.createLimit(requestObject);

		var mockResponse = {
			'id':newPoolLimitId,
			'messsage':'',
			'status':true
		}

		ajaxPost('',successCallback,failureCallback,requestObject,mockResponse);
	}

	/*  DONE
		insurerAdmin/getCreatePoolLimitData

		requestObject:{
			insuranceAgencyId
		};

		responseObject:{
			'crops':[],
			'districts':[]
		}
	*/
	this.getCreatePoolLimitData = function(successCallback,failureCallback,requestObject) {

		var crops = mockCommunicator.getCrops();
		var districts = mockCommunicator.getDistricts();
		//console.log(districts);
		var mockResponse = {
			'crops':crops,
			'districts':districts
		};

		ajaxPost('',successCallback,failureCallback,requestObject,mockResponse);
	}

	// #######################################################

	

	
	// END OF NEW STUFF 2017/10/16

	/*  
		insurerAdmin/getBrokersOfBrokerage

		requestObject:{
			brokerageId
		}

		responseObject:{
			brokers:[{whole broker with name etc}]
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
	/*this.getBrokerDetailsOfBrokerage = function(successCallback,failCallback,brokerageId) {

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
	};*/	// USED ???
	
		

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
					'totalInsuredValue':'200 000',
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
					'totalInsuredValue':'200 000',
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

	// ----------------------------- System key methods

	this.getAreaUoms = function(successCallback,failCallback)
	{
		var mockResponse = mockCommunicator.getAreaUoms();
		ajaxGet(GET_AREA_UOMS,successCallback,failCallback,mockResponse);
	}
	this.createAreaUom = function(successCallback,failCallback,requestObject)
	{
		mockCommunicator.createAreaUom(requestObject);
		var mockResponse = {
			'message':'Saved'
		};
		ajaxPost(CREATE_AREA_UOM,successCallback,failCallback,requestObject,mockResponse);
	}
	this.getProducts = function(successCallback,failCallback)
	{
		var mockResponse = [
			{
				'id':'0',
				'name':'Winter',
			},
			{
				'id':'1',
				'name':'Summer',
			},
			{
				'id':'2',
				'name':'Fruit',
			}
		];

		ajaxGet(GET_PRODUCTS,successCallback,failCallback,mockResponse);
	}
	this.getCrops = function(successCallback,failCallback)
	{
		var mockResponse = [];

		var crops = mockCommunicator.getCrops();

		for(var i = 0; i < crops.length; i++) {
			var areaUom = mockCommunicator.getAreaUom(crops[i]['areaUomId']);
			var priceUom = mockCommunicator.getPriceUom(crops[i]['priceUomId']);

			crops[i].areaUomName = areaUom['name'];
			crops[i].priceUomName = priceUom['name'];
		}

		ajaxGet(GET_CROPS,successCallback,failCallback,crops);
	}
	this.getCropsOfProduct = function(successCallback,failCallback,requestObject)
	{
		var mockResponse = [
			{
				'id':'0',
				'name':'Apple',
				'productId':'0',
				'active':'1',
				'priceUomId':'0',
				'areaUomId':'0',
				'productName':'Winter',
				'priceUomName':'R',
				'areaUomName':'Hectare'
			}
		];

		ajaxPost(GET_CROP_OF_PRODUCT,successCallback,failCallback,requestObject,mockResponse);
	}
	this.getPriceUoms = function(successCallback,failCallback)
	{
		var mockResponse = mockCommunicator.getPriceUoms();

		ajaxGet(GET_PRICE_UOMS,successCallback,failCallback,mockResponse);
	}
	this.createPriceUom = function(successCallback,failCallback,requestObject)
	{
		mockCommunicator.createPriceUom(requestObject);
		var mockResponse = {
			'message':'Saved'
		};
		ajaxPost(CREATE_PRICE_UOM,successCallback,failCallback,requestObject,mockResponse);
	}
	this.createCrop = function(successCallback,failCallback,requestObject)
	{
		var newId = mockCommunicator.createCrop(requestObject);
		var mockResponse = {
			'message':'Saved'
		}

		ajaxPost(CREATE_CROP,successCallback,failCallback,requestObject,mockResponse);
	}
	this.getDistricts = function(successCallback,failCallback)
	{
		var mockResponse = mockCommunicator.getDistricts();

		ajaxGet(GET_DISTRICTS,successCallback,failCallback,mockResponse);
	}
	this.createDistrict = function(successCallback,failCallback,requestObject)
	{
		var newId = mockCommunicator.createDistrict(requestObject);
		var mockResponse = {
			'message':'Saved'
		}

		ajaxPost(CREATE_DISTRICT,successCallback,failCallback,requestObject,mockResponse);
	}
	this.updateInceptionDelay = function(successCallback,failCallback,requestObject)
	{
		var mockResponse = {
			'message':'Saved'
		}

		ajaxPost(UPDATE_INCEPTION_DELAY,successCallback,failCallback,requestObject,mockResponse);
	}
	this.getPerils = function(successCallback,failCallback)
	{
		var mockResponse =mockCommunicator.getPerils();
		ajaxGet(GET_PERILS,successCallback,failCallback,mockResponse);
	}
	this.createPeril = function(successCallback,failCallback,requestObject)
	{
		mockCommunicator.createDamageType(requestObject);
		var mockResponse = {
			'message':'Saved'
		};
		ajaxPost(CREATE_PERIL,successCallback,failCallback,requestObject,mockResponse);
	}
	this.getTax = function(successCallback,failCallback)
	{
		var mockResponse = {
			'id':'0',
			'percentage': 13.00
		};

		ajaxGet(GET_TAX,successCallback,failCallback,mockResponse);
	}
	this.updateTax = function(successCallback,failCallback,requestObject)
	{
		var mockResponse = {
			'message':'Saved'
		};
		ajaxPost(CREATE_TAX,successCallback,failCallback,requestObject,mockResponse);
	}
	this.getOptionTypes = function(successCallback,failCallback)
	{
		var mockResponse = mockCommunicator.getTariffOptionTypes();
		ajaxGet(GET_TAX,successCallback,failCallback,mockResponse);
	}
	this.createTariffOption = function(successCallback,failCallback,requestObject)
	{
		var newTariffOptionId = mockCommunicator.createTariffOption(requestObject['tariffOption']);

		var tariffOptionDamageTypes = requestObject['tariffOptionDamageType'];

		for(var i = 0; i< tariffOptionDamageTypes.length; i++) {

			mockCommunicator.createTariffOptionDamageType(tariffOptionDamageTypes[i]);
		}
		
		var mockResponse = {
			'message':'Saved'
		};
		ajaxPost(CREATE_TARIFF_OPTION,successCallback,failCallback,requestObject,mockResponse);
	}
	this.getTariffs = function(successCallback,failCallback)
	{
		/*var mockResponse = [
			{
				'id':'0',
				'tariffOptionTypeId':'0',
				'cropId':'0',
				'cropName':'Apple',
				'districtId':'0',
				'districtName':'Bellville',
				'coverage':'5',
				'coverageStart':'2017-05-01 00:00:00',
				'coverageEnd':'2018-05-01 00:00:00',
				'tariffOptionTypeName':'Franchise',
			},
			{
				'id':'1',
				'tariffOptionTypeId':'1',
				'cropId':'1',
				'cropName':'Banana',
				'districtId':'1',
				'districtName':'Kraaifontein',
				'coverage':'7.5',
				'coverageStart':'2017-06-01 00:00:00',
				'coverageEnd':'2018-06-01 00:00:00',
				'tariffOptionTypeName':'Excess',
			}
		];*/
		var tariffs = mockCommunicator.getTariffOptions();
		var detailsTariffs = [];

		for(var i = 0; i < tariffs.length; i++) {
			var tariff = tariffs[i];
			var district = mockCommunicator.getDistrict(tariff['districtId']);

			var crop = mockCommunicator.getCrop(tariff['cropId']);

			//debugTool.print("hos",0,0,"title");

			var tariffOptionType = mockCommunicator.getTariffOptionType(tariff['tariffOptionTypeId']);
			tariff.cropName = crop['name'];
			tariff.districtName = district['name'];
			tariff.tariffOptionTypeName = tariffOptionType['name'];
			detailsTariffs.push(tariff);
		}

		var mockResponse = detailsTariffs;

		ajaxGet(CREATE_TARIFF_OPTION,successCallback,failCallback,mockResponse);
	}
}