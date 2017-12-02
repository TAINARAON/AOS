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

	var CREATE_BROKER_URL = 'CREATE_BROKER_URL';
	var GET_BROKERS_OF_BROKERAGES_URL = 'GET_BROKERS_OF_BROKERAGES_URL';
	var GET_BROKERAGES_URL = 'GET_BROKERAGES_URL';
	var GET_BROKERAGES_AND_THEIR_BROKERS = 'GET_BROKERAGES_AND_THEIR_BROKERS';
	var GET_DEFAULT_INSURER_DATA_URL = 'GET_DEFAULT_INSURER_DATA_URL';
	var GET_BUSINESS_UNITS_AND_THEIR_FARMS = 'GET_BUSINESS_UNITS_AND_THEIR_FARMS';

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

	/*
		insurer/createBrokerage

		requestObject:{
			data:{
				username,
				password,
				email,
				brokerageName,
				brokerageEmail,
				brokerageContactPerson,
				brokerageContactNumber,
				fspNumber
			},
			fileData:
			[
			]
		}

		responseObject:{
			message
		}
	*/
	this.createBrokerage = function (successCallback,failCallback,requestObject) {

	    var mockResponse = 
	    {
			"id":'aaaa'
		};

	   ajaxPost(CREATE_BROKERAGE_URL,successCallback,failCallback,requestObject,mockResponse);
	};

	/*
		insurer/createBroker

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
			fileData:[{file object}],

		}

		responseObject:{
			message
		}
	*/
	this.createBroker = function (successCallback,failCallback,requestObject) {

	    var mockResponse = {
			'message':'fake response'
		};

		console.log("requestObject");
		console.log(requestObject);

	   ajaxPost(CREATE_BROKER_URL,successCallback,failCallback,requestObject,mockResponse);
	};

	/*	20171017
		insurer/getBusinessUnitsAndTheirFarms

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
			
		};

		var businessUnitsAndFarms = [];
		var businessUnitsIMaySeeIds = [];

		var businessUnitsIMaySee = mockCommunicator.getBusinessUnits();
		
		for(var i = 0; i < businessUnitsIMaySee.length; i++) {
			businessUnitsIMaySeeIds.push(businessUnitsIMaySee[i]['id']);
		}

		// Getting the businessUnit objects
		for(var i = 0; i < businessUnitsIMaySee.length; i++) {
			
			var businessUnitAndItsFarms = mockCommunicator.getBusinessUnitAndItsFarms(businessUnitsIMaySee[i]['id']);
			businessUnitsAndFarms.push(businessUnitAndItsFarms);
		}

		var mockResponse = {
			'businessUnitsAndFarms':businessUnitsAndFarms
		}

		//console.log('getBusinessUnitsAndTheirFarms');
		//console.log(businessUnitsAndFarms);

		ajaxPost(GET_BUSINESS_UNITS_AND_THEIR_FARMS,successCallback,failCallback,requestObject,mockResponse);





		// ################################

		/*var requestObject = 
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

		ajaxPost(GET_BUSINESS_UNITS_AND_THEIR_FARMS,successCallback,failCallback,requestObject,mockResponse);*/
	};


	/*  
		insurer/getBrokersOfBrokerage

		requestObject:{
			brokerageId
		}

		responseObject:{
			brokers:[{whole broker with name }]
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

	/*	20171017
		insurer/getBrokeragesAndTheirBrokers

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

	/*
		insurer/getBrokerages

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

	// Quote
		// View
		this.getQuotes = function (successCallback,failCallback,requestObject) {
			var mockResponse = [];
			var quotes = mockCommunicator.getQuotes();
			
			for(var i = 0; i < quotes.length; i++)
			{
				var quote = quotes[i];
				//if(quote.brokerId == requestObject.brokerId && quote.active == 1)
				//{
					quote["businessUnit"] = mockCommunicator.getBusinessUnit(quote.businessUnitId);
					quote["quoteLandEntries"] = mockCommunicator.getQuoteLandEntriesByQuoteId(quote.id);


					if(requestObject.quoteNumber != "" && requestObject.quoteNumber != quote.quoteNumber)
					{
						continue;
					}

					if(requestObject.businessUnitName != "" && requestObject.businessUnitName != quote.businessUnit.name)
					{
						continue;
					}

					// TODO: add some sort of filtering by insurer id

					for(var j = 0; j < quote.quoteLandEntries.length; j++)
					{
						var landEntry = quote.quoteLandEntries[j];

						landEntry['additionalTariff'] = 0.25;
						landEntry['tariff'] = 0.66666666666;

						landEntry["farm"] = mockCommunicator.getFarm(landEntry.farmId);
						landEntry["crop"] = mockCommunicator.getCrop(landEntry.cropId);
						landEntry.crop["product"] = mockCommunicator.getProduct(landEntry.crop.productId);
						landEntry["quoteLandEntryDamageTypes"] = mockCommunicator.getQuoteLandEntryDamageTypesByQuoteLandEntryId(landEntry.id);
						for(var k = 0; k < landEntry.quoteLandEntryDamageTypes.length; k++)
						{
							var quoteLandEntryDamageType = landEntry.quoteLandEntryDamageTypes[k];
							quoteLandEntryDamageType["tariffOptionDamageType"] = mockCommunicator.getTariffOptionDamageType(quoteLandEntryDamageType.tariffOptionDamageTypeId);
							quoteLandEntryDamageType.tariffOptionDamageType["damageType"] = mockCommunicator.getDamageType(quoteLandEntryDamageType.tariffOptionDamageType.damageTypeId);
							quoteLandEntryDamageType.tariffOptionDamageType["tariffOption"] = mockCommunicator.getTariffOption(quoteLandEntryDamageType.tariffOptionDamageType.tariffOptionId);
							quoteLandEntryDamageType.tariffOptionDamageType.tariffOption["tariffOptionType"] = mockCommunicator.getTariffOptionType(quoteLandEntryDamageType.tariffOptionDamageType.tariffOption.tariffOptionTypeId);
						}
					}

					mockResponse.push(quotes[i]);
				//}
			}
			
			ajaxPost("",successCallback,failCallback,requestObject,mockResponse);
		}
		// ^ View ^
	// ^ Quote ^
	// Policy
		// View
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
		// ^ View ^
	// ^ Policy ^
	// Damage Report
		// View
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
		// ^ View ^
	// ^ Damage Report ^
}