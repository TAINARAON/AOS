var brokerController = new function() {

	var broker = null;
	var brokerage = null;
	var viewableBrokers = null;
	var user = null;

	this.getBroker = function() {
		return broker;
	}
	this.getBrokerage = function() {
		return brokerage;
	}
	this.getViewableBrokers = function() {
		return viewableBrokers;
	}
	this.getUser = function() {
		return user;
	}

	var CREATE_FARM_URL = 'CREATE_FARM_URL';
	var GET_BUSINESS_UNITS_URL = 'GET_BUSINESS_UNITS_URL';
	var CREATE_BUSINESS_UNIT_URL = 'CREATE_BUSINESS_UNIT_URL';
	var GET_BUSINESS_UNITS_AND_THEIR_FARMS = 'GET_BUSINESS_UNITS_AND_THEIR_FARMS';
	var GET_DEFAULT_BROKER_DATA_URL = 'GET_DEFAULT_BROKER_DATA_URL';
	var TEST_URL = "TEST_URL";
	var GET_DISTRICTS_URL = 'GET_DISTRICTS_URL';
	
	this.init = function(userId) {
		
		getDefaultBrokerData(userId);
	}
	// DONE
	function getDefaultBrokerData(userId) {

		var requestObject = {
			'id':userId
		};

		var user = mockCommunicator.getUser(userId);
		var broker = mockCommunicator.getBrokerByUserId(userId);
		var brokerage = mockCommunicator.getBrokerage(broker['brokerageId']);
		var viewableBrokers = mockCommunicator.getBrokerViewableBrokersOfBroker(broker['id']);
		
		var mockResponse = 
		{
			'user':user,
			'broker':broker,
			'brokerage':brokerage,
			'viewableBrokers':viewableBrokers
		};

		ajaxPost(GET_DEFAULT_BROKER_DATA_URL,onGetDefaultBrokerDataSuccess,onGetDefaultBrokerDataFailure,requestObject,mockResponse);
	}
	// DONE
	function onGetDefaultBrokerDataSuccess(response) {

		util.createNotification('Logged in as Broker');

		broker = response['broker'];
		brokerage = response['brokerage'];
		viewableBrokers = response['viewableBrokers'];
		user = response['user'];

		loader.loadRole('broker');
	}
	// DONE
	function onGetDefaultBrokerDataFailure(response) {

		alert('something messed up');
	}

	/*	
		broker/getBusinessUnits

		requestObject:{
			brokerId
		}

		responseObject:{
			brokerages:[{whole brokerage}]
		}
	*/
	this.getBusinessUnits = function(successCallback,failCallback,requestObject) {

		var mockResponse = {
			'brokerages':mockCommunicator.getBrokerages()
		};

		console.log('getBusinessUnits');
		console.log(mockResponse);


		ajaxPost(GET_BUSINESS_UNITS_URL,successCallback,failCallback,requestObject,mockResponse);
	}

	/* 	DONE
		broker/getDistricts

		responseObject: {
			districts:[{whole district}],
			message,
			status
		}
	*/
	this.getDistricts = function(successCallback,failureCallback) {

		var mockResponse = {
			'districts':mockCommunicator.getDistricts()
		}

		console.log('getDistricts');
		console.log(mockResponse);

		ajaxGet(GET_DISTRICTS_URL,successCallback,failureCallback,mockResponse);
	}

	/*	DONE
		broker/getBusinessUnitsAndTheirFarms

		requestObject:{
			brokerId
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
			"brokerId":broker['id']
		};

		var businessUnitsAndFarms = [];
		var businessUnitsIMaySeeIds = [];

		var businessUnitsIMaySee = mockCommunicator.getBrokerViewableBusinessUnitsByBrokerId(broker['id']);
		console.log(businessUnitsIMaySee);
		for(var i = 0; i < businessUnitsIMaySee.length; i++) {
			businessUnitsIMaySeeIds.push(businessUnitsIMaySee[i]['id']);
		}

		// Getting the businessUnit objectse
		for(var i = 0; i < businessUnitsIMaySee.length; i++) {
			console.log(businessUnitsIMaySee[i]);
			var businessUnitAndItsFarms = mockCommunicator.getBusinessUnitAndItsFarms(businessUnitsIMaySee[i]['id']);
			businessUnitsAndFarms.push(businessUnitAndItsFarms);
		}

		var mockResponse = {
			'businessUnitsAndFarms':businessUnitsAndFarms
		}

		console.log('getBusinessUnitsAndTheirFarms');
		console.log(businessUnitsAndFarms);

		ajaxPost(GET_BUSINESS_UNITS_AND_THEIR_FARMS,successCallback,failCallback,requestObject,mockResponse);
	};

	/*	DONE
		broker/createBusinessUnit

		requestObject:{
			businessUnitData,
			files
		}

		responseObject: {
			message,
			status
		}
	*/
	this.createBusinessUnit = function(successCallback,failCallback,requestObject) {

		var buWithMembers = requestObject['businessUnitData'];

		var onlyBusinessUnit = {
			'name':buWithMembers['name'],
			'email':buWithMembers['email'],
			'vatNumber':buWithMembers['vatNumber'],
			'incomeTaxNumber':buWithMembers['incomeTaxNumber'],
			'active':'1',
			'verified':'1'
		};

		var businessUnitId = mockCommunicator.createBusinessUnit(onlyBusinessUnit);

		var brokerViewableBusinessUnit = {
			'brokerId':broker['id'],
			'businessUnitId':businessUnitId
		};

		mockCommunicator.createBrokerViewableBusinessUnit(brokerViewableBusinessUnit);

		var members = buWithMembers['members'];

		for(var i = 0; i < members.length; i++) {
			var member = members[i];
			var savableMember = {
				'businesUnitId':businessUnitId,
				'name':member['memberPreferredName'],
				'surname':member['memberSurname'],
				'initials':member['memberInitials'],
				'idNumber':member['memberPreferredName'],
				'active':'1',
				'verified':'1',
				'isAdmin':member['memberIsMain'],
				'clientId':null,
			}

			mockCommunicator.createBusinessUnitMember(savableMember);
		}

		var mockResponse = 
		{
			'message':'',
			'status':true
		};

		ajaxPost(CREATE_BUSINESS_UNIT_URL,successCallback,failCallback,requestObject,mockResponse);
	};


	/*
		broker/createFarm

		requestObject:{
			farm:{
				'name',
				'businessUnitId',
				'latitude',
				'longitude',
				'districtId'
			},
		}

		responseObject: {
			message,
			status
		}
	*/
	this.createFarm = function(successCallback,failureCallback,requestObject) {

		var mockResponse = {
			'status':true,
			'message':''
		}

		ajaxPost(CREATE_FARM_URL,successCallback,failureCallback,requestObject,mockResponse);
	}



	// Damage Report
		// Create
		this.getBusinessUnitsTheBrokerHasPoliciesOn = function(successCallback,failCallback,requestObject)
		{
			var mockResponse = [
				{
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
			];

			ajaxPost("Some url", successCallback,failCallback,requestObject,mockResponse);
		}
		this.getFarmsForBusinessUnitTheBrokerHasPoliciesOn = function(successCallback,failCallback,requestObject)
		{
			var mockResponse = [
				{
					'id':'0',
					'name':'P0',
					'businessUnitId':'0',
					'latitude':'1.22644',
					'longitude':'-0.35428',
					'active':'1',
					'districtId':'0'
				}
			];

			ajaxPost("Some url", successCallback,failCallback,requestObject,mockResponse);
		}
		this.getDamageTypes = function(successCallback,failCallback)
		{
			var mockResponse = [
				{
					'id':'0',
					'name':'Fire',
				},
				{
					'id':'1',
					'name':'Flood',
				},
				{
					'id':'2',
					'name':'Dew',
				},
				{
					'id':'3',
					'name':'Bugs',
				},
				{
					'id':'4',
					'name':'Godzilla',
				}
			];

			ajaxGet("Some url", successCallback, failCallback, mockResponse);
		}
		this.getLandEntryForFarmAndBusinessUnitTheBrokerHasPoliciesOn = function(successCallback,failCallback,requestObject)
		{
			var mockResponse = [
				{
					'id':'4',
					'policyId':'2',
					'farmId':'0',
					'landNumber':'00003',
					'landLongitude':'131.044',
					'landLatitude':'-25.363',
					'cropId':'1',
					'cultivar':'Red Dwarf',
					'area':'7.4',
					'yield':'14.22',
					'price':'5.48',
					'tariffOptionId':'0',
					'additionalTariff':0
				},
				{
					'id':'6',
					'policyId':'3',
					'farmId':'0',
					'landNumber':'00005',
					'landLongitude':'131.044',
					'landLatitude':'-25.363',
					'cropId':'1',
					'cultivar':'Red Dwarf',
					'area':'7.4',
					'yield':'14.22',
					'price':'5.48',
					'tariffOptionId':'0',
					'additionalTariff':0
				}
			];

			ajaxPost("Some url", successCallback,failCallback,requestObject,mockResponse);
		}
		this.saveDamageReport = function(successCallback,failCallback,requestObject)
		{
			var mockResponse = {
				"id":0,
				"message":"Saved"
			};

			ajaxPost("Some url",successCallback,failCallback,requestObject,mockResponse);
		}
		// ^ Create ^
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
	// Quote
		// Create
		this.validateBusinessUnit = function(successCallback,failCallback,requestObject)
		{
			var mockResponse = {
				'id':'0',
				'name':'BU0',   //'Anro Boerdery Co (ABC)',
				'contactNumber':'063-887-9635',
				'contactPerson':'Anro Swart',
				'email':'anro.swart@bing.com',
				'vatNumber':'00625-4811',
				'incomeTaxNumber':'5651484166',
				'active':'1',
				'verified':'1'
			};

			ajaxPost("Some url",successCallback,failCallback,requestObject,mockResponse);
		}
		this.validateFarm = function(successCallback,failCallback,requestObject)
		{
			var mockResponse = {
				'id':'0',
				'name':'P0',
				'businessUnitId':'0',
				'latitude':'1.22644',
				'longitude':'-0.35428',
				'active':'1',
				'districtId':'0'
			};

			ajaxPost("Some url",successCallback,failCallback,requestObject,mockResponse);
		}
		this.getProducts = function(successCallback,failCallback)
		{
			/*var mockResponse = [
				{
					'id':'0',
					'name':'Winter',
				}
			];*/
			var mockResponse = mockCommunicator.getProducts();

			ajaxGet("Some url",successCallback,failCallback,mockResponse);
		}
		this.getTariffOptionTypes = function(successCallback,failCallback)
		{
			/*var mockResponse = [
				{
					'id':'0',
					'name':'Franchise',
				}
			];*/

			var mockResponse = mockCommunicator.getTariffOptionTypes();

			ajaxGet("Some url",successCallback,failCallback,mockResponse);
		}
		this.getCropsOfProduct = function(successCallback,failCallback,requestObject)
		{
			var mockResponse = [
				{
					'id':'1',
					'name':'Banana',
					'productId':'0',
					'active':'1',
					'priceUomId':'0',
					'areaUomId':'0'
				}
			];

			ajaxPost("Some url",successCallback,failCallback,requestObject,mockResponse);
		}
		this.getTariffOptions = function(successCallback,failCallback,requestObject)
		{
			var mockResponse = [
				{
					'id':'0',
					'tariffOptionTypeId':'0',
					'cropId':'0',
					'districtId':'0',
					'coverage':'5',
					'coverageStart':'2017-05-01 00:00:00',
					'coverageEnd':'2018-05-01 00:00:00',
				}
			];

			ajaxPost("Some url",successCallback,failCallback,requestObject,mockResponse);
		}
		this.getTariffOptionDamageTypeOfTariffOption = function(successCallback,failCallback,requestObject)
		{
			var mockResponse = [
				{
					'id':'0',
					'tariffOptionId':'0',
					'damageTypeId':'0',
					'tariff':'0.175',
					'isDefault':'1',
					'damageType':{
						'id':'0',
						'name':'Fire',
					}
				},
				{
					'id':'1',
					'tariffOptionId':'0',
					'damageTypeId':'1',
					'tariff':'0.235',
					'isDefault':'0',
					'damageType':{
						'id':'1',
						'name':'Flood',
					}
				}
			];

			ajaxPost("Some url",successCallback,failCallback,requestObject,mockResponse);
		}
		this.saveQuote = function(successCallback,failCallback,requestObject)
		{	
			var quoteId = mockCommunicator.createQuote(requestObject);
			debugger;
	        for(let i = 0; i < requestObject.quoteLandEntries.length; i++) {
	        	var quoteLandEntry = requestObject.quoteLandEntries[i];

	        	quoteLandEntry['quoteId'] = quoteId;
	        	var landEntryId = mockCommunicator.createQuoteLandEntry(quoteLandEntry);

	        	if(landEntryId == null) {
	        		console.error("A land entry failed to be created. Roll back whole quote entry");
	        		return;
	        	}

	            var quoteLandEntryDamageTypes = quoteLandEntry.quoteLandEntryDamageTypes;

	            for(var j = 0; j < quoteLandEntryDamageTypes.length; j++)
	            {
	                var damageType = quoteLandEntryDamageTypes[j].tariffOptionDamageType.damageType;

	                if(damageType.state)
	                {
	                    var tObj = {
	                        "quoteLandEntryId":landEntryId,
	                        "tariffOptionDamageTypeId":quoteLandEntryDamageTypes[j].tariffOptionDamageType.id
	                    }

	                    var id = mockCommunicator.createQuoteLandEntryDamageType(tObj);

	                    if(id == null)
	                    {
	                        console.error("A Quote land damage type entry failed to be created. Roll back whole quote entry");
	                        return;
	                    }
	                }
	            }
	        }

			// Id of newly created quote
			var mockResponse = {
				'id':quoteId,
				"message":"saved"
			}
			ajaxPost("Some url",successCallback,failCallback,requestObject,mockResponse);
		}
		// ^ Create ^
		// View
		this.getQuotes = function(successCallback,failCallback,requestObject)
		{
			var mockResponse = [];
			var quotes = mockCommunicator.getQuotes();

			for(var i = 0; i < quotes.length; i++)
			{
				var quote = quotes[i];
				if(quote.brokerId == requestObject.brokerId && quote.active == 1)
				{
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
				}
			}

			/*var mockResponse = [
				{
					'id':'0',
					'quoteNumber':'00001',
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
					'brokerId':'0',
					'insurerId':'0',
					'active':'1',
					'dateCreated':'2017-05-18 19:01:05',
					'linkedToQuoteId':null,
					'acceptable':'1',
					'totalInsuredValue':'200 000',
					'premium':20000,
					'quoteLandEntries':[
						{
							'id':'0',
							'quoteId':'0',
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
							'cropId':'0',
							'crop':{
								'id':'0',
								'name':'Apple',
								'productId':'0',
								'product':{
									'id':'0',
									'name':'Winter',
								},
								'active':'1',
								'priceUomId':'0',
								'areaUomId':'0',
							},
							'landNumber':'00001',
							'landLongitude':'1.3361',
							'landLatitude':'-0.1215',
							'cultivar':'Red Dwarf',
							'area':'7.4',
							'yield':'14.22',
							'price':'5.48',
							'additionalTariff':0.25,
							'tariff':0.66666666666,
							'quoteLandEntryDamageTypes':[
								{
									'id':'0',
									'quoteLandEntryId':'0',
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
								},
								{
									'id':'1',
									'quoteLandEntryId':'0',
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
				},
				{
					'id':'1',
					'quoteNumber':'00002',
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
					'brokerId':'0',
					'insurerId':'0',
					'active':'1',
					'dateCreated':'2017-05-18 19:02:05',
					'linkedToQuoteId':'0',
					'acceptable':'1',
					'totalInsuredValue':'200 000',
					'premium':18000,
					'quoteLandEntries':[
						{
							'id':'2',
							'quoteId':'1',
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
							'cropId':'1',
							'crop':{
								'id':'1',
								'name':'Banana',
								'productId':'0',
								'product':{
									'id':'0',
									'name':'Winter',
								},
								'active':'1',
								'priceUomId':'0',
								'areaUomId':'0'
							},
							'landNumber':'00003',
							'landLongitude':'1.3361',
							'landLatitude':'-0.1215',
							'cultivar':'Red Dwarf',
							'area':'7.4',
							'yield':'15.22',
							'price':'4.48',
							'additionalTariff':0,
							'tariff':0.23,
							'quoteLandEntryDamageTypes':[
								{
									'id':'5',
									'quoteLandEntryId':'2',
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
			];*/

			ajaxPost("",successCallback,failCallback,requestObject,mockResponse);
		}
		this.acceptQuote = function(successCallback,failCallback,requestObject)
		{
			var mockResponse = {
				'message':'Accepted'
			}

			var timeSigned = requestObject.acceptedTime;
			if(timeSigned == null) {

	            timeSigned = util.getCurrentDateTime();
	        }
	        
	        // Get quote, create policy object from quote object. 
	        var quote = mockCommunicator.getQuote(requestObject.quoteId);
	        mockCommunicator.deactivateQuote(requestObject.quoteId);
	        var policy = {

	            'policyNumber':generatePolicyNumber(quote),
	            'businessUnitId':quote['businessUnitId'],
	            'brokerId':quote['brokerId'],
	            'insurerId':quote['insurerId'],
	            'acceptedOn':timeSigned,
	            'linkedToPolicyId':null,
	            'active':'1'
	        };

	        var newPolicyId = savePolicyObject(policy);
	        if(newPolicyId == null) {
	            alert('error persisting policy object');
	            return;
	        }

	        // Get quoteLandEntries, create policyLandEntries by just replacing quoteId with policyId
	        var quoteLandEntries = quoteInvoker.getLandEntriesOfQuote(requestObject.quoteId);
	        
	        for(var i = 0; i < quoteLandEntries.length; i++)
	        {
	        	var landEntry = quoteLandEntries[i];
	        	delete landEntry['quoteId'];
	        	landEntry['policyId'] = newPolicyId;
	        	var newPolicyLandEntryId = savePolicyLandEntryObject(landEntry);
	        	if(newPolicyLandEntryId == null) {
	                alert('failed to save policyLandEntry object. Must revert whole policy object that was saved with ID of '+newPolicyId);
	                return;
	            }

	        	for(var j = 0; j < landEntry.quoteLandEntryDamageTypes.length; j++)
	        	{
	        		var landEntryDamageType = landEntry.quoteLandEntryDamageTypes[j];
	        		delete landEntryDamageType['quoteLandEntryId'];
	        		landEntryDamageType['policyLandEntryId'] = newPolicyLandEntryId;
	        		var newPledtId = savePolicyLandEntryDamageTypeObject(landEntryDamageType);

	        		if(newPledtId == null) {
	                    alert('failed to save policyLandEntryDamageType object. Must revert whole policy object that was saved with ID of '+newPolicyId);
	                    return;
	                }
	        	}
	        }

	        /*for(var i = 0; i < quoteLandEntries.length; i++) {

	            var quoteLandEntry = quoteLandEntries[i];
	            var quoteLandEntryDamageTypes = quoteInvoker.getTariffOptionDamageTypesOfQuoteLandEntry(quoteLandEntry['id']);

	            // Create and save policyLandEntry object
	            var policyLandEntry = quoteLandEntry;
	            delete policyLandEntry['quoteId'];
	            policyLandEntry.policyId = newPolicyId;
	            // Save policyLandEntryObject
	            var newPolicyLandEntryId = savePolicyLandEntryObject(policyLandEntry);
	            if(newPolicyLandEntryId == null) {
	                alert('failed to save policyLandEntry object. Must revert whole policy object that was saved with ID of '+newPolicyId);
	                return;
	            }

	            for(var j = 0; j < quoteLandEntryDamageTypes.length; j++) {

	                var quoteLandEntryDamageType = quoteLandEntryDamageTypes[j];

	                var policyLandEntryDamageType = quoteLandEntryDamageType;
	                delete policyLandEntryDamageType['quoteLandEntryId'];
	                policyLandEntryDamageType['policyLandEntryId'] = newPolicyLandEntryId;
	                // save policyLandEntryDamageType
	                var newPledtId = savePolicyLandEntryDamageTypeObject(policyLandEntryDamageType);

	                if(newPledtId == null) {
	                    alert('failed to save policyLandEntryDamageType object. Must revert whole policy object that was saved with ID of '+newPolicyId);
	                    return;
	                }
	            }
	        }*/

			ajaxPost("",successCallback,failCallback,requestObject,mockResponse);
		}

		function savePolicyLandEntryDamageTypeObject(o) {

	        return mockCommunicator.createPolicyLandEntryDamageType(o);
	    }

	    function savePolicyLandEntryObject(policyLandEntry) {

	        return mockCommunicator.createPolicyLandEntry(policyLandEntry);
	    }
	    function savePolicyObject(policy) {

	        return mockCommunicator.createPolicy(policy);
	    }

	    function generatePolicyNumber(quote) {
	        return Math.floor((Math.random() * 100000) + 1);
	    }
		// ^ View ^
		// Share
		this.getQuotePDFData = function(successCallback,failCallback,requestObject)
		{
			var mockResponse = {
				'season':'2017-06 Winter',
				'quoteType':'Hail Quotation',
				'quoteNumber':'10515',
				'insured':'Agrihost Bdy',
				'postalAddress':'PO Box 15 Centurion 0157',
				'telephoneNumber':'012 555 5555',
				'faxNumber':'',
				'cellNumber':'082 555 5555',
				'email':'info@agrihost.co.za',
				'vatNumber':'12349876',
				'accountNumber':'12345',
				'quoteDate':'2017-05-18 19:01:05',
				'totalInsuredValue':'200 000',
				'quoteLandEntries':[
					{
						'farmName':'Plaas 1',
						'premium':'1000',
						'vat':'140',
						'amountPayable':'1140'
					},
					{
						'farmName':'Plaas 2',
						'premium':'1000',
						'vat':'140',
						'amountPayable':'1140'
					}
				],
				'totalAmountPayable':'2280',
				'minimumPremiumPerLand':'750',
				'specialComments':'No comments',
				'cessionHolder':'Afgri',
				'detailsOfIntermediary':'OVK'
			}

			ajaxPost("Some url",successCallback,failCallback,requestObject,mockResponse)
		}
		// ^ Share ^
	// ^ Quote ^
	// Policy
		// Create
		this.savePolicy = function(successCallback,failCallback,requestObject)
		{
			var mockResponse = {
				'message':'saved'
			};

			ajaxPost("Some url",successCallback,failCallback,requestObject,mockResponse);
		}
		// ^ Create ^
		// View
		this.getPolicies = function(successCallback,failCallback,requestObject)
		{
			var mockResponse = [];

			var policies = mockCommunicator.getPolicies(requestObject.policyId);
			
			for(var i = 0; i < policies.length; i++)
			{
				var policy = policies[i];
				if(policy.brokerId == requestObject.brokerId && policy.active == 1)
				{
					policy["businessUnit"] = mockCommunicator.getBusinessUnit(policy.businessUnitId);
					policy["policyLandEntries"] = mockCommunicator.getPolicyLandEntriesByPolicyId(policy.id);
					
					if(requestObject.policyNumber != "" && requestObject.policyNumber != policy.quoteNumber)
					{
						continue;
					}

					if(requestObject.businessUnitName != "" && requestObject.businessUnitName != policy.businessUnit.name)
					{
						continue;
					}

					for(var j = 0; j < policy.policyLandEntries.length; j++)
					{
						var landEntry = policy.policyLandEntries[j];

						landEntry['additionalTariff'] = 0.25;
						landEntry['tariff'] = 0.66666666666;

						landEntry["farm"] = mockCommunicator.getFarm(landEntry.farmId);
						landEntry["crop"] = mockCommunicator.getCrop(landEntry.cropId);
						landEntry["policyLandEntryDamageTypes"] = mockCommunicator.getPolicyLandEntryDamageTypesByPolicyLandEntryId(landEntry.id);
						
						for(var k = 0; k < landEntry.policyLandEntryDamageTypes.length; k++)
						{
							var policyLandEntryDamageType = landEntry.policyLandEntryDamageTypes[k];
							policyLandEntryDamageType["tariffOptionDamageType"] = mockCommunicator.getTariffOptionDamageType(policyLandEntryDamageType.tariffOptionDamageTypeId);
							policyLandEntryDamageType.tariffOptionDamageType["damageType"] = mockCommunicator.getDamageType(policyLandEntryDamageType.tariffOptionDamageType.damageTypeId);
							policyLandEntryDamageType.tariffOptionDamageType["tariffOption"] = mockCommunicator.getTariffOption(policyLandEntryDamageType.tariffOptionDamageType.tariffOptionId);
							policyLandEntryDamageType.tariffOptionDamageType.tariffOption["tariffOptionType"] = mockCommunicator.getTariffOptionType(policyLandEntryDamageType.tariffOptionDamageType.tariffOption.tariffOptionTypeId);
						}
					}
					
					mockResponse.push(policies[i]);
				}
			}

			/*var mockResponse = [
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
			];*/

			ajaxPost("Some url",successCallback,failCallback,requestObject,mockResponse);
		}
		// ^ View ^
	// ^ Policy ^
}