var mockCommunicator = new function()
{
	console.warn("Mock Communicator being used.");

// OPTION TYPE - done
	this.optionTypeTable = [
		{
			'id':'0',
			'name':'Franchise',
		},
		{
			'id':'1',
			'name':'Excess',
		},
	];
	this.createOptionType = function(data) {

		data.id = this.optionTypeTable.length;
		this.optionTypeTable.push(data);

		return data.id;
	}
	this.getOptionType = function(id) {
		for(var i=0;i<this.optionTypeTable.length;i++) {
			if(this.optionTypeTable[i].id==id) {
				return this.optionTypeTable[i];
			}
		}
	}
	this.getOptionTypes = function() {

		return this.optionTypeTable;
	}
	this.deleteOptionType = function(id) {
		for(var i=0;i<this.optionTypeTable.length;i++) {
			if(this.optionTypeTable[i].id==id) {
				this.optionTypeTable.splice(i,1);
			}
		}
	}
	this.updateOptionType = function(id, data) {
		data.id = id;
		this.optionTypeTable[id] = data;
	}

// ############################# USERS #################################
// ROLE - done
	this.roleTable = [
		{
			'id':'0',
			'name':'System Administrator',
		},
		{
			'id':'1',
			'name':'Insurer Administrator',
		},
		{
			'id':'2',
			'name':'Insurer',
		},
		{
			'id':'3',
			'name':'Broker Administrator',
		},
		{
			'id':'4',
			'name':'Broker',
		},
		{
			'id':'5',
			'name':'Client',
		},
	];
	this.createRole = function(data) {

		data.id = this.roleTable.length;
		this.roleTable.push(data);

		return data.id;
	}
	this.getRole = function(id) {
		for(var i=0;i<this.roleTable.length;i++) {
			if(this.roleTable[i].id==id) {
				return this.roleTable[i];
			}
		}
	}
	this.getRoles = function() {

		return roleTable;
	}
	this.deleteRole = function(id) {
		for(var i=0;i<this.roleTable.length;i++) {
			if(this.roleTable[i].id==id) {
				this.roleTable.splice(i,1);
			}
		}
	}
	this.updateRole = function(id, data) {
		data.id = id;
		this.roleTable[id] = data;
	}

// USER - done
	this.userTable = [
		{
			'id':'0',
			'username':'SA',
			'password':'',
			'roleId':'0',
			'name':'Leeroy',
			'surname':'Nnnjenkinsss',
			'email':'ljenkins@gmail.com',
			'active':'1',
			'validated':'1'
		},{
			'id':'1',
			'username':'IA',
			'password':'',
			'roleId':'1',
			'name':'Leeroy',
			'surname':'Nnnjenkinsss',
			'email':'ljenkins@gmail.com',
			'active':'1',
			'validated':'1'
		},
		{
			'id':'2',
			'username':'I',
			'password':'',
			'roleId':'2',
			'name':'Andre',
			'surname':'Carstens',
			'email':'acarstens@gmail.com',
			'active':'1',
			'validated':'1'
		},
		{
			'id':'3',
			'username':'BA',
			'password':'',
			'roleId':'3',
			'name':'BAName',
			'surname':'BASurname',
			'email':'cameo@gmail.com',
			'active':'1',
			'validated':'1'
		},
		{
			'id':'4',
			'username':'BM',
			'password':'',
			'roleId':'4',
			'name':'BMName',
			'surname':'BMSurname',
			'email':'dracula@gmail.com',
			'active':'1',
			'validated':'1'
		},
		{
			'id':'5',
			'username':'CA',
			'password':'',
			'roleId':'5',
			'name':'Dan',
			'surname':'Wazoski',
			'email':'danwaz@gmail.com',
			'active':'1',
			'validated':'1'
		},
		{
			'id':'6',
			'username':'C',
			'password':'',
			'roleId':'5',
			'name':'Simon',
			'surname':'Says',
			'email':'simonsays@gmail.com',
			'active':'1',
			'validated':'1'
		},
		{
			'id':'7',
			'username':'B',
			'password':'',
			'roleId':'4',
			'name':'Viewable Broker Name',
			'surname':'Surname',
			'email':'viewableBroker@gmail.com',
			'active':'1',
			'validated':'1'
		},
		{
			'id':'8',
			'username':'VB2',
			'password':'',
			'roleId':'4',
			'name':'Viewable2 Broker2 Name2',
			'surname':'Surname2',
			'email':'viewable2Broker2@gmail.com',
			'active':'1',
			'validated':'1'
		}
	];
	this.createUser = function(data) {

		data.id = this.userTable.length;
		this.userTable.push(data);

		console.log(this.userTable[data.id]);

		return data.id;
	}
	this.getUser = function(id) {
		for(var i=0;i<this.userTable.length;i++) {
			if(this.userTable[i].id==id) {
				return this.userTable[i];
			}
		}
	}
	this.getUserByUsernamePassword = function(username,password) {
		for(var i=0;i<this.userTable.length;i++) {
			if(this.userTable[i]['username']==username && this.userTable[i]['password']==password) {
				return this.userTable[i];
			}
		}
	}
	this.deleteUser = function(id) {
		for(var i=0;i<this.userTable.length;i++) {
			if(this.userTable[i].id==id) {
				this.userTable.splice(i,1);
			}
		}
	}
	this.updateUser = function(id, data) {
		data.id = id;
		this.userTable[id] = data;
	}

// CLIENT - done
	this.clientTable = [
		{
			'id':'0',
			'userId':'4',
			'idNumber':'90051685430',
			'contactNumber':'041115487',
			'active':'1',
			'verified':'1'
		},
		{
			'id':'1',
			'userId':'5',
			'idNumber':'611992280',
			'contactNumber':'0825584684',
			'active':'1',
			'verified':'1'
		},
	];
	this.createClient = function(data) {

		data.id = this.clientTable.length;
		this.clientTable.push(data);

		return data.id;
	}
	this.getClient = function(id) {
		for(var i=0;i<this.clientTable.length;i++) {
			if(this.clientTable[i].id==id) {
				return this.clientTable[i];
			}
		}
	}
	this.getClients = function() {
		return this.clientTable;
	}
	this.getClientByUserId = function(userId) {
		for(var i=0;i<this.clientTable.length;i++) {
			if(this.clientTable[i]['userId']==userId) {
				return this.clientTable[i];
			}
		}
	}
	this.deleteClient = function(id) {
		for(var i=0;i<this.clientTable.length;i++) {
			if(this.clientTable[i].id==id) {
				this.clientTable.splice(i,1);
			}
		}
	}
	this.updateClient = function(id, data) {
		data.id = id;
		this.clientTable[id] = data;
	}

// BUSINESS UNIT - done
	this.businessUnitTable = [
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
		},
		{
			'id':'1',
			'name':'BU1',			//'Tiaan and Anro Boerdery Amalgamated Co (TABACO)',
			'contactNumber':'062-352-1342',
			'contactPerson':'Tiaan Swart',
			'email':'tiaan.swart@yahoo.com',
			'vatNumber':'52159-6487',
			'incomeTaxNumber':'6768142685',
			'active':'1',
			'verified':'1'
		},
	];
	this.createBusinessUnit = function(data) {

		data.id = this.businessUnitTable.length;
		this.businessUnitTable.push(data);

		return data.id;
	}
	this.getBusinessUnit = function(id) {
		for(var i=0;i<this.businessUnitTable.length;i++) {
			if(this.businessUnitTable[i].id==id) {
				return this.businessUnitTable[i];
			}
		}
	}
	this.getBusinessUnitByName = function(name) {
		for(var i=0;i<this.businessUnitTable.length;i++) {
			if(this.businessUnitTable[i].name==name) {
				return this.businessUnitTable[i];
			}
		}
	}
	this.deleteBusinessUnit = function(id) {
		for(var i=0;i<this.businessUnitTable.length;i++) {
			if(this.businessUnitTable[i].id==id) {
				this.businessUnitTable.splice(i,1);
			}
		}
	}
	this.updateBusinessUnit = function(id, data) {
		data.id = id;
		this.businessUnitTable[id] = data;
	}

// BUSINESS UNIT MEMBER - done
	// clientId may be null if the person is not on the system. If it is not null, then use either name/surname.
	this.businessUnitMemberTable = [
		{
			'id':'0',
			'businesUnitId':'0',
			'name':'Anro',
			'surname':'Swart',
			'idNumber':'90051816248',
			'active':'1',
			'verified':'1',
			'isAdmin':'1',
			'clientId':'1',
		},
		{
			'id':'1',
			'businesUnitId':'0',
			'name':'Tiaan',
			'surname':'Gerber',
			'idNumber':'90051816682',
			'active':'1',
			'verified':'1',
			'isAdmin':'0',
			'clientId':null,
		}
	];
	
	this.createBusinessUnitMember = function(data) {

		data.id = this.businessUnitMemberTable.length;
		this.businessUnitMemberTable.push(data);

		return data.id;
	}
	
	this.getBusinessUnitMember = function(id) {
		for(var i=0;i<this.businessUnitMemberTable.length;i++) {
			if(this.businessUnitMemberTable[i].id==id) {
				return this.businessUnitMemberTable[i];
			}
		}
	}
	
	this.getBusinessUnitByNameMember = function(name) {
		for(var i=0;i<this.businessUnitMemberTable.length;i++) {
			if(this.businessUnitMemberTable[i].name==name) {
				return this.businessUnitMemberTable[i];
			}
		}
	}
	
	this.deleteBusinessUnitMember = function(id) {
		for(var i=0;i<this.businessUnitMemberTable.length;i++) {
			if(this.businessUnitMemberTable[i].id==id) {
				this.businessUnitMemberTable.splice(i,1);
			}
		}
	}
	
	this.updateBusinessUnitMember = function(id, data) {
		data.id = id;
		this.businessUnitMemberTable[id] = data;
	}

// FARM - done
	this.farmTable = [
		{
			'id':'0',
			'name':'P0',
			'businessUnitId':'0',
			'latitude':'1.22644',
			'longitude':'-0.35428',
			'active':'1',
			'districtId':'0'
		},
		{
			'id':'1',
			'name':'P1',
			'businessUnitId':'0',
			'latitude':'1.325642',
			'longitude':'-0.35243',
			'active':'1',
			'districtId':'0'
		},
	];
	this.createFarm = function(data) {

		data.id = this.farmTable.length;
		this.farmTable.push(data);

		return data.id;
	}
	this.getFarm = function(id) {
		for(var i=0;i<this.farmTable.length;i++) {
			if(this.farmTable[i].id==id) {
				return this.farmTable[i];
			}
		}
	}
	this.getFarmByName = function(name) {
		for(var i=0;i<this.farmTable.length;i++) {
			if(this.farmTable[i].name==name) {
				return this.farmTable[i];
			}
		}
	}
	this.deleteFarm = function(id) {
		for(var i=0;i<this.farmTable.length;i++) {
			if(this.farmTable[i].id==id) {
				this.farmTable.splice(i,1);
			}
		}
	}
	
	this.updateFarm = function(id, data) {
		data.id = id;
		this.farmTable[id] = data;
	}

	this.getFarmByNameAndBusinessId = function(farmName,businessUnitId) {
		for(var i=0;i<this.farmTable.length;i++) {
			if(this.farmTable[i].name==farmName && this.farmTable[i].businessUnitId == businessUnitId) {
				return this.farmTable[i];
			}
		}
	}

// INSURER ADMIN - done
	this.insurerAdminTable = [
		{
			'id':'0',
			'userId':'1',
			'active':'1',
		},
	];
	this.createInsurerAdmin = function(data) {

		data.id = this.insurerAdminTable.length;
		this.insurerAdminTable.push(data);

		return data.id;
	}
	this.getInsurerAdmin = function(id) {
		for(var i=0;i<this.insurerAdminTable.length;i++) {
			if(this.insurerAdminTable[i].id==id) {
				return this.insurerAdminTable[i];
			}
		}
	}
	this.getInsurerAdmins = function(id) {
		return this.insurerAdminTable;
	}
	this.deleteInsurerAdmin = function(id) {
		for(var i=0;i<this.insurerAdminTable.length;i++) {
			if(this.insurerAdminTable[i].id==id) {
				this.insurerAdminTable.splice(i,1);
			}
		}
	}
	this.updateInsurerAdmin = function(id, data) {
		data.id = id;
		this.insurerAdminTable[id] = data;
	}
	this.getInsurerAdminByUserId = function(userId) {
		for(var i=0;i<this.insurerAdminTable.length;i++) {
			if(this.insurerAdminTable[i].userId==userId) {
				return this.insurerAdminTable[i];
			}
		}
	}

// INSURER - done
	this.insurerTable = [
		{
			'id':'0',
			'userId':'2',
			'active':'1',
		},
	];
	this.createInsurer = function(data) {

		data.id = this.insurerTable.length;
		this.insurerTable.push(data);

		return data.id;
	}
	this.getInsurer = function(id) {
		for(var i=0;i<this.insurerTable.length;i++) {
			if(this.insurerTable[i].id==id) {
				return this.insurerTable[i];
			}
		}
	}
	this.getInsurers = function(id) {
		return this.insurerTable;
	}
	this.deleteInsurer = function(id) {
		for(var i=0;i<this.insurerTable.length;i++) {
			if(this.insurerTable[i].id==id) {
				this.insurerTable.splice(i,1);
			}
		}
	}
	this.updateInsurer = function(id, data) {
		data.id = id;
		this.insurerTable[id] = data;
	}
	this.getInsurerByUserId = function(userId) {
		for(var i=0;i<this.insurerTable.length;i++) {
			if(this.insurerTable[i].userId==userId) {
				return this.insurerTable[i];
			}
		}
	}

// BROKER ADMIN - done
	this.brokerAdminTable = [
		{
			'id':'0',
			'userId':'3',
			'brokerageId':'0',
		},
	];
	this.createBrokerAdmin = function(data) {

		data.id = this.brokerAdminTable.length;
		this.brokerAdminTable.push(data);

		console.log(this.brokerAdminTable[data.id]);

		return data.id;
	}
	this.getBrokerAdmin = function(id) {
		for(var i=0;i<this.brokerAdminTable.length;i++) {
			if(this.brokerAdminTable[i]['id']==id) {
				return this.brokerAdminTable[i];
			}
		}
	}
	this.getBrokerAdminByUserId = function(id) {
		for(var i=0;i<this.brokerAdminTable.length;i++) {
			if(this.brokerAdminTable[i]['userId']==id) {
				return this.brokerAdminTable[i];
			}
		}
	}
	this.getBrokerAdmins = function() {
		return this.brokerAdminTable;
	}
	this.deleteBrokerAdmin = function(id) {
		for(var i=0;i<this.brokerAdminTable.length;i++) {
			if(this.brokerAdminTable[i].id==id) {
				this.brokerAdminTable.splice(i,1);
			}
		}
	}

// BROKER - done
	this.brokerTable = [
		{
			'id':'0',
			'userId':'4',
			'brokerageId':'0',
			'creationRights':true
		},
		{
			'id':'1',
			'userId':'7',
			'brokerageId':'0',
			'creationRights':true
		},
		{
			'id':'2',
			'userId':'8',
			'brokerageId':'0',
			'creationRights':true
		},
	];

	// User by: brokerAdmin
	this.getBrokersForBrokerTableInBrokerageTab = function(brokerageId) {
		var brokers = [];
		for(var i=0;i<this.brokerTable.length;i++) {
			if(this.brokerTable[i].brokerageId==brokerageId) {

				var broker = this.brokerTable[i];
				var user = this.getUser(broker['userId']);

				var neededInfo = 
				{
					'id':broker['id'],
					'name':user['name'],
					'surname':user['surname']
				}

				brokers.push(neededInfo);
			}
		}

		return brokers;
	}

	this.createBroker = function(data) {

		data.id = this.brokerTable.length;
		this.brokerTable.push(data);

		console.log(this.brokerTable[data.id]);

		return data.id;
	}
	this.getBroker = function(id) {
		for(var i=0;i<this.brokerTable.length;i++) {
			if(this.brokerTable[i].id==id) {
				return this.brokerTable[i];
			}
		}
	}
	this.getBrokers = function() {
		return this.brokerTable;
	}
	this.deleteBroker = function(id) {
		for(var i=0;i<this.brokerTable.length;i++) {
			if(this.brokerTable[i].id==id) {
				this.brokerTable.splice(i,1);
			}
		}
	}
	this.getBrokerByUserId = function(userId) {
		for(var i=0;i<this.brokerTable.length;i++) {
			if(this.brokerTable[i]['userId']==userId) {
				return this.brokerTable[i];
			}
		}
	}
	this.updateBroker = function(id, data) {
		data.id = id;
		this.brokerTable[id] = data;
	}

// BROKER VIEWABLE BROKER
	this.brokerViewableBrokerTable = [
		{
			'id':'0',
			'mainBrokerId':'0',
			'viewableBrokerId':'1',
		},
		{
			'id':'1',
			'mainBrokerId':'0',
			'viewableBrokerId':'2',
		},
	];
	this.createBrokerViewableBroker = function(data) {

		data.id = this.brokerViewableBrokerTable.length;
		this.brokerViewableBrokerTable.push(data);

		return data.id;
	}
	this.getBrokerViewableBroker = function(id) {
		for(var i=0;i<this.brokerViewableBrokerTable.length;i++) {
			if(this.brokerViewableBrokerTable[i].id==id) {
				return this.brokerViewableBrokerTable[i];
			}
		}
	}
	this.getBrokerViewableBrokersOfBroker = function(mainBrokerId) {

		var brokers = [];

		for(var i=0;i<this.brokerViewableBrokerTable.length;i++) {
			if(this.brokerViewableBrokerTable[i].mainBrokerId==mainBrokerId) {
				brokers.push(this.getBroker(this.brokerViewableBrokerTable[i]['viewableBrokerId']));
			}
		}

		return brokers;
	}
	this.getBrokerViewableBrokers = function() {
		return this.brokerViewableBrokerTable;
	}
	this.deleteBrokerViewableBroker = function(id) {
		for(var i=0;i<this.brokerViewableBrokerTable.length;i++) {
			if(this.brokerViewableBrokerTable[i].id==id) {
				this.brokerViewableBrokerTable.splice(i,1);
			}
		}
	}
	this.updateBrokerViewableBroker = function(id, data) {
		data.id = id;
		this.brokerViewableBrokerTable[id] = data;
	}

// BROKERAGE - done
	this.brokerageTable = [
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
		},
	];
	this.createBrokerage = function(data) {

		data.id = this.brokerageTable.length;
		this.brokerageTable.push(data);

		console.log(this.brokerageTable[data.id]);

		return data.id;
	}
	this.getBrokerage = function(id) {
		for(var i=0;i<this.brokerageTable.length;i++) {
			if(this.brokerageTable[i].id==id) {
				return this.brokerageTable[i];
			}
		}
	}
	this.getBrokersage = function() {
		return this.brokerageTable;
	}
	this.deleteBrokerage = function(id) {
		for(var i=0;i<this.brokerageTable.length;i++) {
			if(this.brokerageTable[i].id==id) {
				this.brokerageTable.splice(i,1);
			}
		}
	}
	this.updateBrokerage = function(id, data) {
		data.id = id;
		this.brokerageTable[id] = data;
	}

// INSURANCE AGENCY - done
	this.insuranceAgency = 
	[
		{
			'name':'Versekerings Ltd.',
			'email':'versekerings.ltd@gmail.com',
			'contactNumber':'062 352 1341',
		}
	];
		
	this.getInsuranceAgency = function(id=0) {
		return this.insuranceAgency[id];
	}
// ############################# QUOTES ################################
// QUOTE - done
	this.quoteTable = [
		{
			'id':'0',
			'quoteNumber':'00001',
			'businessUnitId':'0',
			'brokerId':'0',
			'insurerId':'0',
			'active':'1',
			'dateCreated':'2017-05-18 19:01:05',
			'linkedToQuoteId':null,
			'acceptable':'1'	
		},
		{
			'id':'1',
			'quoteNumber':'00002',
			'businessUnitId':'0',
			'brokerId':'0',
			'insurerId':'0',
			'active':'1',
			'dateCreated':'2017-05-18 19:02:05',
			'linkedToQuoteId':'0',
			'acceptable':'1'
		},
		{
			'id':'2',
			'quoteNumber':'00003',
			'businessUnitId':'0',
			'brokerId':'1',
			'insurerId':'0',
			'active':'1',
			'dateCreated':'2017-05-18 19:01:05',
			'linkedToQuoteId':null,
			'acceptable':'1'	
		},
		{
			'id':'3',
			'quoteNumber':'00004',
			'businessUnitId':'0',
			'brokerId':'1',
			'insurerId':'0',
			'active':'1',
			'dateCreated':'2017-05-18 19:02:05',
			'linkedToQuoteId':'0',
			'acceptable':'1'
		}
	];
	this.createQuote = function(data) {

		data.id = this.quoteTable.length;
		this.quoteTable.push(data);

		return data.id;
	}
	this.getQuote = function(id) {
		for(var i=0;i<this.quoteTable.length;i++) {
			if(this.quoteTable[i].id==id) {
				return this.quoteTable[i];
			}
		}
	}
	this.getQuoteByQuoteNumber = function(number)
	{
		for(var i=0;i<this.quoteTable.length;i++) {
			if(this.quoteTable[i].quoteNumber==number) {
				return this.quoteTable[i];
			}
		}
	}
	this.getQuotesByBrokerId = function(brokerId) {
		var quotes = [];

		for (var i = this.quoteTable.length - 1; i >= 0; i--) {
			var quote = this.quoteTable[i];

			if(quote['brokerId'] == brokerId) {
				quotes.push(quote);
			}
		}

		return quotes;
	}
	this.getQuotes = function() {
		return this.quoteTable;
	}
	this.deleteQuote = function(id) {
		for(var i=0;i<this.quoteTable.length;i++) {
			if(this.quoteTable[i].id==id) {
				this.quoteTable.splice(i,1);
			}
		}
	}
	this.updateQuote = function(id, data) {
		data.id = id;
		this.quoteTable[id] = data;
	}
	this.deactivateQuote = function(id) {
		this.quoteTable[id]['active'] = false;
	}
	this.getQuotesByBusinessUnitId = function(businessUnitId)
	{
		var quotes = [];

		for(var i = 0; i < this.quoteTable.length; i++)
		{
			if(this.quoteTable[i].businessUnitId == businessUnitId)
			{
				quotes.push(this.quoteTable[i]);
			}
		}

		return quotes;
	}

// QUOTE LAND ENTRY - done
	this.quoteLandEntryTable = [
		{
			'id':'0',
			'quoteId':'0',
			'farmId':'0',
			'landNumber':'00001',
			'landLongitude':'1.3361',
			'landLatitude':'-0.1215',
			'cropId':'1',
			'cultivar':'Red Dwarf',
			'area':'7.4',
			'yield':'14.22',
			'price':'5.48',
			'tariffOptionId':'0',
		},
		{
			'id':'1',
			'quoteId':'0',
			'farmId':'0',
			'landNumber':'00002',
			'landLongitude':'1.3361',
			'landLatitude':'-0.1215',
			'cropId':'0',
			'cultivar':'Octopussy',
			'area':'6.8',
			'yield':'11.22',
			'price':'4.78',
			'tariffOptionId':'0',
		},
		{
			'id':'2',
			'quoteId':'1',
			'farmId':'0',
			'landNumber':'00003',
			'landLongitude':'1.3361',
			'landLatitude':'-0.1215',
			'cropId':'1',
			'cultivar':'Red Dwarf',
			'area':'7.4',
			'yield':'15.22',
			'price':'4.48',
			'tariffOptionId':'0',
		},
		{
			'id':'3',
			'quoteId':'1',
			'farmId':'0',
			'landNumber':'00004',
			'landLongitude':'1.3361',
			'landLatitude':'-0.1215',
			'cropId':'0',
			'cultivar':'Octopussy',
			'area':'6.7',
			'yield':'12.22',
			'price':'4.98',
			'tariffOptionId':'0',
		},
		{
			'id':'4',
			'quoteId':'2',
			'farmId':'0',
			'landNumber':'00005',
			'landLongitude':'1.3361',
			'landLatitude':'-0.1215',
			'cropId':'1',
			'cultivar':'Red Dwarf',
			'area':'7.4',
			'yield':'15.22',
			'price':'4.48',
			'tariffOptionId':'0',
		},
		{
			'id':'5',
			'quoteId':'3',
			'farmId':'0',
			'landNumber':'00006',
			'landLongitude':'1.3361',
			'landLatitude':'-0.1215',
			'cropId':'0',
			'cultivar':'Octopussy',
			'area':'6.7',
			'yield':'12.22',
			'price':'4.98',
			'tariffOptionId':'0',
		}
	];
	this.createQuoteLandEntry = function(data) {

		data.id = this.quoteLandEntryTable.length;
		this.quoteLandEntryTable.push(data);

		return data.id;
	}
	this.getQuoteLandEntry = function(id) {
		for(var i=0;i<this.quoteLandEntryTable.length;i++) {
			if(this.quoteLandEntryTable[i].id==id) {
				return this.quoteLandEntryTable[i];
			}
		}
	}
	this.getQuoteLandEntries = function() {
		return this.quoteLandEntryTable;
	}
	
	this.deleteQuoteLandEntry = function(id) {
		for(var i=0;i<this.quoteLandEntryTable.length;i++) {
			if(this.quoteLandEntryTable[i].id==id) {
				this.quoteLandEntryTable.splice(i,1);
			}
		}
	}
	this.deleteQuoteLandEntryByQuoteId = function(quoteId)
	{
		for(var i=0;i<this.quoteLandEntryTable.length;i++) {
			if(this.quoteLandEntryTable[i].quoteId==quoteId) {
				this.quoteLandEntryTable.splice(i,1);
			}
		}
	}

	this.updateQuoteLandEntry = function(id, data) {
		data.id = id;
		this.quoteLandEntryTable[id] = data;
	}
	this.deactivateQuoteLandEntry = function(id) {
		this.quoteLandEntryTable[id]['active'] = false;
	}
	this.getQuoteLandEntriesByQuoteId = function(quoteId)
	{
		var landEntries = [];

		for(var i = 0; i < this.quoteLandEntryTable.length; i++)
		{
			if(this.quoteLandEntryTable[i].quoteId == quoteId)
			{
				landEntries.push(this.quoteLandEntryTable[i]);
			}
		}

		return landEntries;
	}

// QUOTE LAND ENTRY DAMAGE TYPE - done
	this.quoteLandEntryDamageTypeTable = [
		{
			'id':'0',
			'quoteLandEntryId':'0',
			'tariffOptionDamageTypeId':'0',
		},
		{
			'id':'1',
			'quoteLandEntryId':'0',
			'tariffOptionDamageTypeId':'1',
		},
		{
			'id':'2',
			'quoteLandEntryId':'1',
			'tariffOptionDamageTypeId':'0',
		},
		{
			'id':'3',
			'quoteLandEntryId':'1',
			'tariffOptionDamageTypeId':'1',
		},
		{
			'id':'4',
			'quoteLandEntryId':'2',
			'tariffOptionDamageTypeId':'0',
		},
		{
			'id':'5',
			'quoteLandEntryId':'2',
			'tariffOptionDamageTypeId':'1',
		},
		{
			'id':'6',
			'quoteLandEntryId':'4',
			'tariffOptionDamageTypeId':'0',
		},
		{
			'id':'7',
			'quoteLandEntryId':'5',
			'tariffOptionDamageTypeId':'1',
		}
	];
	this.createQuoteLandEntryDamageType = function(data) {

		data.id = this.quoteLandEntryDamageTypeTable.length;
		this.quoteLandEntryDamageTypeTable.push(data);

		return data.id;
	}
	this.getQuoteLandEntryDamageType = function(id) {
		for(var i=0;i<this.quoteLandEntryDamageTypeTable.length;i++) {
			if(this.quoteLandEntryDamageTypeTable[i].id==id) {
				return this.quoteLandEntryDamageTypeTable[i];
			}
		}
	}
	this.getQuoteLandEntryDamageTypes = function() {

		return this.quoteLandEntryDamageTypeTable;
	}
	this.deleteQuoteLandEntryDamageType = function(id) {
		for(var i=0;i<this.quoteLandEntryDamageTypeTable.length;i++) {
			if(this.quoteLandEntryDamageTypeTable[i].id==id) {
				this.quoteLandEntryDamageTypeTable.splice(i,1);
			}
		}
	}
	this.updateQuoteLandEntryDamageType= function(id, data) {
		data.id = id;
		this.quoteLandEntryDamageTypeTable[id] = data;
	}
	this.deactivateQuoteLandEntryDamageType = function(id) {
		this.quoteLandEntryDamageTypeTable[id]['active'] = false;
	}
	this.getQuoteLandEntryDamageTypesByQuoteLandEntryId = function(landEntryId)
	{
		var damageTypes = [];

		for(var i = 0; i < this.quoteLandEntryDamageTypeTable.length; i++)
		{
			if(this.quoteLandEntryDamageTypeTable[i].quoteLandEntryId == landEntryId)
			{
				damageTypes.push(this.quoteLandEntryDamageTypeTable[i]);
			}
		}

		return damageTypes;
	}

// POLICY - done
	this.policyTable = [
		{
			'id':'0',
			'policyNumber':'00000',
			'businessUnitId':'0',
			'brokerId':'0',
			'insurerId':null,
			'acceptedOn':'2017-08-30 19:01:05',
			'active':'1',
			'linkedToPolicyId':null,	
		},
		{
			'id':'1',
			'policyNumber':'00001',
			'businessUnitId':'0',
			'brokerId':'0',
			'insurerId':null,
			'acceptedOn':'2017-08-30 19:03:05',
			'active':'1',
			'linkedToPolicyId':null,	
		},
		{
			'id':'2',
			'policyNumber':'00002',
			'businessUnitId':'0',
			'brokerId':'1',
			'insurerId':null,
			'acceptedOn':'2017-08-30 19:01:05',
			'active':'1',
			'linkedToPolicyId':null,	
		},
		{
			'id':'3',
			'policyNumber':'00003',
			'businessUnitId':'0',
			'brokerId':'1',
			'insurerId':null,
			'acceptedOn':'2017-08-30 19:03:05',
			'active':'1',
			'linkedToPolicyId':null,	
		}
	];
	this.createPolicy = function(data) {

		data.id = this.policyTable.length;
		this.policyTable.push(data);
		console.log('Created Policy:');
		console.log(this.policyTable[data.id ]);
		return data.id;
	}
	this.getPolicy = function(id) {
		for(var i=0;i<this.policyTable.length;i++) {
			if(this.policyTable[i].id==id) {
				return this.policyTable[i];
			}
		}
	}
	this.getPolicyByPolicyNumber = function(number)
	{
		for(var i=0;i<this.policyTable.length;i++) {
			if(this.policyTable[i].policyNumber==number) {
				return this.policyTable[i];
			}
		}
	}
	this.getPolicies = function() {
		return this.policyTable;
	}
	this.deletePolicy = function(id) {
		for(var i=0;i<this.policyTable.length;i++) {
			if(this.policyTable[i].id==id) {
				this.policyTable.splice(i,1);
			}
		}
	}
	this.updatePolicy = function(id, data) {
		data.id = id;
		this.policyTable[id] = data;
	}
	this.getPoliciesByBusinessUnitId = function(id)
	{
		var policies = [];

		for(var i = 0; i < this.policyTable.length; i++)
		{
			if(this.policyTable[i].businessUnitId == id)
			{
				policies.push(this.policyTable[i]);
			}
		}

		return policies;
	}

// POLICY LAND ENTRY - done
	this.policyLandEntryTable = [
		{
			'id':'0',
			'policyId':'0',
			'farmId':'0',
			'landNumber':'00001',
			'landLongitude':'131.044',
			'landLatitude':'-25.363',
			'cropId':'1',
			'cultivar':'Red Dwarf',
			'area':'7.4',
			'yield':'14.22',
			'price':'5.48',
			'tariffOptionId':'0',
		},
		{
			'id':'1',
			'policyId':'0',
			'farmId':'1',
			'landNumber':'00002',
			'landLongitude':'131.044',
			'landLatitude':'-25.363',
			'cropId':'1',
			'cultivar':'Something',
			'area':'8.4',
			'yield':'16.11',
			'price':'9.48',
			'tariffOptionId':'0',
		},
		{
			'id':'2',
			'policyId':'1',
			'farmId':'0',
			'landNumber':'00008',
			'landLongitude':'131.044',
			'landLatitude':'-25.363',
			'cropId':'1',
			'cultivar':'Red Dwarf',
			'area':'7.4',
			'yield':'14.22',
			'price':'5.48',
			'tariffOptionId':'0',
		},
		{
			'id':'3',
			'policyId':'1',
			'farmId':'1',
			'landNumber':'000074',
			'landLongitude':'131.044',
			'landLatitude':'-25.363',
			'cropId':'1',
			'cultivar':'Something',
			'area':'8.4',
			'yield':'16.11',
			'price':'9.48',
			'tariffOptionId':'0',
		},
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
		},
		{
			'id':'5',
			'policyId':'2',
			'farmId':'1',
			'landNumber':'00004',
			'landLongitude':'131.044',
			'landLatitude':'-25.363',
			'cropId':'1',
			'cultivar':'Something',
			'area':'8.4',
			'yield':'16.11',
			'price':'9.48',
			'tariffOptionId':'0',
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
		},
		{
			'id':'7',
			'policyId':'3',
			'farmId':'1',
			'landNumber':'00006',
			'landLongitude':'131.044',
			'landLatitude':'-25.363',
			'cropId':'1',
			'cultivar':'Something',
			'area':'8.4',
			'yield':'16.11',
			'price':'9.48',
			'tariffOptionId':'0',
		}
	];
	this.createPolicyLandEntry = function(data) {

		data.id = this.policyLandEntryTable.length;
		this.policyLandEntryTable.push(data);
		console.log('Created PolicyLandEntry:');
		console.log(this.policyLandEntryTable[data.id ]);
		return data.id;
	}
	this.getPolicyLandEntry = function(id) {
		for(var i=0;i<this.policyLandEntryTable.length;i++) {
			if(this.policyLandEntryTable[i].id==id) {
				return this.policyLandEntryTable[i];
			}
		}
	}
	this.getPolicyLandEntries = function() {
		return this.policyLandEntryTable;
	}
	
	this.deletePolicyLandEntry = function(id) {
		for(var i=0;i<this.policyLandEntryTable.length;i++) {
			if(this.policyLandEntryTable[i].id==id) {
				this.policyLandEntryTable.splice(i,1);
			}
		}
	}
	this.deletePolicyLandEntryByPolicyId = function(policyId)
	{
		for(var i=0;i<this.policyLandEntryTable.length;i++) {
			if(this.policyLandEntryTable[i].policyId==policyId) {
				this.policyLandEntryTable.splice(i,1);
			}
		}
	}
	this.getPolicyLandEntriesByPolicyId = function(policyId)
	{
		var landEntries = [];
		for(var i=0;i<this.policyLandEntryTable.length;i++) {
			if(this.policyLandEntryTable[i].policyId==policyId) {
				landEntries.push(this.policyLandEntryTable[i]);
			}
		}
		return landEntries;
	}
	this.updatePolicyLandEntry = function(id, data) {
		data.id = id;
		this.policyLandEntryTable[id] = data;
	}	

// POLICY LAND ENTRY DAMAGE TYPE - done
	this.policyLandEntryDamageTypeTable = [
		{
			'id':'0',
			'policyLandEntryId':'0',
			'tariffOptionDamageTypeId':'0',
		},
		{
			'id':'1',
			'policyLandEntryId':'0',
			'tariffOptionDamageTypeId':'1',
		},
		{
			'id':'2',
			'policyLandEntryId':'1',
			'tariffOptionDamageTypeId':'0',
		},
		{
			'id':'3',
			'policyLandEntryId':'1',
			'tariffOptionDamageTypeId':'1',
		},
		{
			'id':'4',
			'policyLandEntryId':'2',
			'tariffOptionDamageTypeId':'0',
		},
		{
			'id':'5',
			'policyLandEntryId':'2',
			'tariffOptionDamageTypeId':'1',
		},
		{
			'id':'6',
			'policyLandEntryId':'3',
			'tariffOptionDamageTypeId':'0',
		},
		{
			'id':'7',
			'policyLandEntryId':'3',
			'tariffOptionDamageTypeId':'1',
		},
		{
			'id':'8',
			'policyLandEntryId':'4',
			'tariffOptionDamageTypeId':'0',
		},
		{
			'id':'9',
			'policyLandEntryId':'4',
			'tariffOptionDamageTypeId':'1',
		},
		{
			'id':'10',
			'policyLandEntryId':'5',
			'tariffOptionDamageTypeId':'0',
		},
		{
			'id':'11',
			'policyLandEntryId':'5',
			'tariffOptionDamageTypeId':'1',
		}
	];
	this.createPolicyLandEntryDamageType = function(data) {

		data.id = this.policyLandEntryDamageTypeTable.length;
		this.policyLandEntryDamageTypeTable.push(data);
		console.log('Created PolicyLandEntryDamageType:');
		console.log(this.policyLandEntryDamageTypeTable[data.id ]);
		return data.id;
	}
	this.getPolicyLandEntryDamageType = function(id) {
		for(var i=0;i<this.policyLandEntryDamageTypeTable.length;i++) {
			if(this.policyLandEntryDamageTypeTable[i].id==id) {
				return this.policyLandEntryDamageTypeTable[i];
			}
		}
	}
	this.getPolicyLandEntryDamageTypes = function() {

		return this.policyLandEntryDamageTypeTable;
	}
	this.deletePolicyLandEntryDamageType = function(id) {
		for(var i=0;i<this.policyLandEntryDamageTypeTable.length;i++) {
			if(this.policyLandEntryDamageTypeTable[i].id==id) {
				this.policyLandEntryDamageTypeTable.splice(i,1);
			}
		}
	}
	this.updatePolicyLandEntryDamageType= function(id, data) {
		data.id = id;
		this.policyLandEntryDamageTypeTable[id] = data;
	}
	this.getPolicyLandEntryDamageTypesByPolicyLandEntryId = function(policyLandEntryId)
	{
		var damageTypes = [];
		for(var i = 0; i < this.policyLandEntryDamageTypeTable.length; i++)
		{
			if(this.policyLandEntryDamageTypeTable[i].policyLandEntryId == policyLandEntryId)
			{
				damageTypes.push(this.policyLandEntryDamageTypeTable[i]);
			}
		}
		return damageTypes;
	}

// ########################### SYSTEM KEYS ###############################
// PRODUCT - done
	this.productTable = [
		{
			'id':'0',
			'name':'Winter',
		},
		{
			'id':'1',
			'name':'Summer',
		},
	];
	this.createProduct = function(data) {

		data.id = this.productTable.length;
		this.productTable.push(data);

		return data.id;
	}
	this.getProduct = function(id) {
		for(var i=0;i<this.productTable.length;i++) {
			if(this.productTable[i].id==id) {
				return this.productTable[i];
			}
		}
	}
	this.getProducts = function() {
		return this.productTable;
	}
	this.deleteProduct = function(id) {
		for(var i=0;i<this.productTable.length;i++) {
			if(this.productTable[i].id==id) {
				this.productTable.splice(i,1);
			}
		}
	}
	this.updateProduct = function(id, data) {
		data.id = id;
		this.productTable[id] = data;
	}

// CROP - done
	this.cropTable = [
		{
			'id':'0',
			'name':'Apple',
			'productId':'0',
			'active':'1',
			'priceUomId':'0',
			'areaUomId':'0'
		},
		{
			'id':'1',
			'name':'Banana',
			'productId':'0',
			'active':'1',
			'priceUomId':'0',
			'areaUomId':'0'
		},
		{
			'id':'2',
			'name':'Zebra Fruit',
			'productId':'1',
			'active':'1',
			'priceUomId':'1',
			'areaUomId':'0'
		},
	];
	this.createCrop = function(data) {

		data.id = this.cropTable.length;
		this.cropTable.push(data);
		console.log('Crops:');
		console.log(this.cropTable);
		return data.id;
	}
	this.getCrop = function(id) {
		for(var i=0;i<this.cropTable.length;i++) {
			if(this.cropTable[i].id==id) {
				return this.cropTable[i];
			}
		}
	}
	this.getCrops = function() {
		return this.cropTable;
	}
	this.getCropsOfProduct = function(productId) {

		var crops = [];

		for(var i=0;i<this.cropTable.length;i++) {
			if(this.cropTable[i]['productId']==productId) {
				crops.push(this.cropTable[i]);
			}
		}

		return crops;
	}
	this.deleteCrop = function(id) {
		for(var i=0;i<this.cropTable.length;i++) {
			if(this.cropTable[i].id==id) {
				this.cropTable.splice(i,1);
			}
		}
	}
	this.updateCrop = function(id, data) {
		data.id = id;
		this.cropTable[id] = data;
	}

// PRICE UOM - done
	this.priceUomTable = [
		{
			'id':'0',
			'name':'R/Ton',
		},
		{
			'id':'1',
			'name':'R/Unit',
		},
	];
	this.createPriceUom = function(data) {

		data.id = this.priceUomTable.length;
		this.priceUomTable.push(data);

		return data.id;
	}
	this.getPriceUom = function(id) {
		for(var i=0;i<this.priceUomTable.length;i++) {
			if(this.priceUomTable[i].id==id) {
				return this.priceUomTable[i];
			}
		}
	}
	this.getPriceUoms = function() {
		return this.priceUomTable;
	}
	this.deletePriceUom = function(id) {
		for(var i=0;i<this.priceUomTable.length;i++) {
			if(this.priceUomTable[i].id==id) {
				this.priceUomTable.splice(i,1);
			}
		}
	}
	this.updatePriceUom = function(id, data) {
		data.id = id;
		this.priceUomTable[id] = data;
	}

// AREA UOM - done
	this.areaUomTable = [
		{
			'id':'0',
			'name':'Hectare',
		},
		{
			'id':'1',
			'name':'Tree',
		},
	];
	this.createAreaUom = function(data) {

		data.id = this.areaUomTable.length;
		this.areaUomTable.push(data);

		return data.id;
	}
	this.getAreaUom = function(id) {
		for(var i=0;i<this.areaUomTable.length;i++) {
			if(this.areaUomTable[i].id==id) {
				return this.areaUomTable[i];
			}
		}
	}
	this.getAreaUoms = function() {
		return this.areaUomTable;
	}
	this.deleteAreaUom = function(id) {
		for(var i=0;i<this.areaUomTable.length;i++) {
			if(this.areaUomTable[i].id==id) {
				this.areaUomTable.splice(i,1);
			}
		}
	}
	this.updateAreaUom = function(id, data) {
		data.id = id;
		this.areaUomTable[id] = data;
	}

// DISTRICT - done
	this.districtTable = [
		{
			'id':'0',
			'name':'Bellville',
			'active':'1'
		},
		{
			'id':'1',
			'name':'Kraaifontein',
			'active':'1'
		},
	];
	this.createDistrict = function(data) {

		data.id = this.districtTable.length;
		this.districtTable.push(data);

		return data.id;
	}
	this.getDistrict = function(id) {
		for(var i=0;i<this.districtTable.length;i++) {
			if(this.districtTable[i].id==id) {
				return this.districtTable[i];
			}
		}
	}
	this.getDistricts = function() {
		return this.districtTable;
	}
	this.deleteDistrict = function(id) {
		for(var i=0;i<this.districtTable.length;i++) {
			if(this.districtTable[i].id==id) {
				this.districtTable.splice(i,1);
			}
		}
	}
	this.updateDistrict = function(id, data) {
		data.id = id;
		this.districtTable[id] = data;
	}

// TARIFF OPTION TYPE - done
	this.tariffOptionTypeTable = [
		{
			'id':'0',
			'name':'Franchise',
		},
		{
			'id':'1',
			'name':'Excess',
		},
	];
	this.createTariffOptionType = function(data) {

		data.id = this.tariffOptionTypeTable.length;
		this.tariffOptionTypeTable.push(data);

		return data.id;
	}
	this.getTariffOptionType = function(id) {
		for(var i=0;i<this.tariffOptionTypeTable.length;i++) {
			if(this.tariffOptionTypeTable[i].id==id) {
				return this.tariffOptionTypeTable[i];
			}
		}
	}
	this.deleteTariffOptionType = function(id) {
		for(var i=0;i<this.tariffOptionTypeTable.length;i++) {
			if(this.tariffOptionTypeTable[i].id==id) {
				this.tariffOptionTypeTable.splice(i,1);
			}
		}
	}
	this.updateTariffOptionType = function(id, data) {
		data.id = id;
		this.tariffOptionTypeTable[id] = data;
	}

// TARIFF OPTION - done
	this.tariffOptionTable = [
		{
			'id':'0',
			'tariffOptionTypeId':'0',
			'cropId':'0',
			'districtId':'0',
			'coverage':'5',
			'coverageStart':'2017-05-01 00:00:00',
			'coverageEnd':'2018-05-01 00:00:00',
		},
		{
			'id':'1',
			'tariffOptionTypeId':'1',
			'cropId':'1',
			'districtId':'1',
			'coverage':'7.5',
			'coverageStart':'2017-06-01 00:00:00',
			'coverageEnd':'2018-06-01 00:00:00',
		},
	];
	this.createTariffOption = function(data) {

		data.id = this.tariffOptionTable.length;
		this.tariffOptionTable.push(data);

		return data.id;
	}
	this.getTariffOption = function(id) {
		for(var i=0;i<this.tariffOptionTable.length;i++) {
			if(this.tariffOptionTable[i].id==id) {
				return this.tariffOptionTable[i];
			}
		}
	}
	this.getTariffOptions = function() {
		return this.tariffOptionTable;
	}
	this.getOptionsByDistrictCropType = function(districtId,cropId,typeId) {

		var options = [];

		for(var i=0;i<this.tariffOptionTable.length;i++) {

			var tariffOption = this.tariffOptionTable[i];

			var districtMatch = tariffOption.districtId==districtId;
			var cropMatch = tariffOption.cropId==cropId;
			var typeMatch = tariffOption.tariffOptionTypeId==typeId;

			if(districtMatch && cropMatch && typeMatch) {
				options.push(this.tariffOptionTable[i]);
			}
		}

		return options;
	}
	this.deleteTariffOption = function(id) {
		for(var i=0;i<this.tariffOptionTable.length;i++) {
			if(this.tariffOptionTable[i].id==id) {
				this.tariffOptionTable.splice(i,1);
			}
		}
	}
	this.updateTariffOption = function(id, data) {
		data.id = id;
		this.tariffOptionTable[id] = data;
	}

// DAMAGE TYPE - done
	this.damageTypeTable = [
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
		},
	];
	this.createDamageType = function(data) {

		data.id = this.damageTypeTable.length;
		this.damageTypeTable.push(data);

		return data.id;
	}
	this.getDamageType = function(id) {
		for(var i=0;i<this.damageTypeTable.length;i++) {
			if(this.damageTypeTable[i].id==id) {
				return this.damageTypeTable[i];
			}
		}
	}
	this.getPerils = function() {
		return this.damageTypeTable;
	}
	this.deleteDamageType = function(id) {
		for(var i=0;i<this.damageTypeTable.length;i++) {
			if(this.damageTypeTable[i].id==id) {
				this.damageTypeTable.splice(i,1);
			}
		}
	}
	this.updateDamageType = function(id, data) {
		data.id = id;
		this.damageTypeTable[id] = data;
	}

// TARIFF OPTION DAMAGE TYPE - done
	this.tariffOptionDamageTypeTable = [
		{
			'id':'0',
			'tariffOptionId':'0',
			'damageTypeId':'0',
			'tariff':'0.175',
			'isDefault':'1'
		},
		{
			'id':'1',
			'tariffOptionId':'0',
			'damageTypeId':'1',
			'tariff':'0.235',
			'isDefault':'0'
		},
		{
			'id':'2',
			'tariffOptionId':'1',
			'damageTypeId':'0',
			'tariff':'0.175',
			'isDefault':'1'
		},
		{
			'id':'3',
			'tariffOptionId':'1',
			'damageTypeId':'1',
			'tariff':'0.235',
			'isDefault':'0'
		}
	];
	this.createTariffOptionDamageType = function(data) {

		data.id = this.tariffOptionDamageTypeTable.length;
		this.tariffOptionDamageTypeTable.push(data);

		return data.id;
	}
	this.getTariffOptionDamageType = function(id) {
		for(var i=0;i<this.tariffOptionDamageTypeTable.length;i++) {
			if(this.tariffOptionDamageTypeTable[i].id==id) {
				return this.tariffOptionDamageTypeTable[i];
			}
		}
	}
	this.getTariffOptionDamageTypesByTariffOption = function(tariffOptionId) {

		var damageTypes = [];
		
		for(var i=0;i<this.tariffOptionDamageTypeTable.length;i++) {
			if(this.tariffOptionDamageTypeTable[i].tariffOptionId==tariffOptionId) {
				damageTypes.push(this.tariffOptionDamageTypeTable[i]);
			}
		}

		return damageTypes;
	}
	this.getTariffOptionDamageTypes = function() {

		return this.tariffOptionDamageTypeTable;
	}
	this.deleteTariffOptionDamageType = function(id) {
		for(var i=0;i<this.tariffOptionDamageTypeTable.length;i++) {
			if(this.tariffOptionDamageTypeTable[i].id==id) {
				this.tariffOptionDamageTypeTable.splice(i,1);
			}
		}
	}
	this.updateTariffOptionDamageType = function(id, data) {
		data.id = id;
		this.tariffOptionDamageTypeTable[id] = data;
	}

// INCEPTION DELAY - done
	this.inceptionDelayTable = [
		{
			'id':'0',
			'delay': 604800000
		},
	];

	this.getInceptionDelay = function() {
		return this.inceptionDelayTable[0]['delay'];
	}
	this.updateInceptionDelay = function(delay) {
		this.inceptionDelayTable[0]['delay'] = delay;

		return 1;
	}

// TAX - done
	this.taxTable = [
		{
			'id':'0',
			'percentage': 0.14
		},
	];

	// 7 days in milliseconds
	this.getTax = function() {
		return this.taxTable[0]['percentage'];
	}
	this.updateTax = function(percentage) {
		this.taxTable[0]['percentage'] = percentage;

		return 1;
	}

// DAMAGE REPORT - done
	this.damageReportTable = [
		{
			'id':'0',
			'dateOfDamage':'2017/05/11',
			'dateOfReporting':'2017/05/11',
			'policyLandEntryId':'0'
		},
		{
			'id':'1',
			'dateOfDamage':'2017/05/11',
			'dateOfReporting':'2017/05/11',
			'policyLandEntryId':'0'
		},
	];
	this.createDamageReport = function(data) {

		data.id = this.damageReportTable.length;
		this.damageReportTable.push(data);

		return data.id;
	}
	this.getDamageReport = function(id) {
		for(var i=0;i<this.damageReportTable.length;i++) {
			if(this.damageReportTable[i].id==id) {
				return this.damageReportTable[i];
			}
		}
	}
	this.getDamageReports = function() {
		return this.damageReportTable;
	}
	this.deleteDamageReport = function(id) {
		for(var i=0;i<this.damageReportTable.length;i++) {
			if(this.damageReportTable[i].id==id) {
				this.damageReportTable.splice(i,1);
			}
		}
	}
	this.updateDamageReport = function(id, data) {
		data.id = id;
		this.damageReportTable[id] = data;
	}

// DAMAGE REPORT DAMAGE TYPE - done
	this.damageReportDamageTypeTable = [
		{
			'id':'0',
			'damageReportId':'0',
			'damageTypeId':'0',
		},
		{
			'id':'1',
			'damageReportId':'0',
			'damageTypeId':'1',
		},
	];
	this.createDamageReportDamageType = function(data) {

		data.id = this.damageReportDamageTypeTable.length;
		this.damageReportDamageTypeTable.push(data);

		return data.id;
	}
	this.getDamageReportDamageType = function(id) {
		for(var i=0;i<this.damageReportDamageTypeTable.length;i++) {
			if(this.damageReportDamageTypeTable[i].id==id) {
				return this.damageReportDamageTypeTable[i];
			}
		}
	}
	this.getDamageReportDamageTypes = function() {
		return this.damageReportDamageTypeTable;
	}
	this.deleteDamageReportDamageType = function(id) {
		for(var i=0;i<this.damageReportDamageTypeTable.length;i++) {
			if(this.damageReportDamageTypeTable[i].id==id) {
				this.damageReportDamageTypeTable.splice(i,1);
			}
		}
	}
	this.updateDamageReportDamageType = function(id, data) {
		data.id = id;
		this.damageReportDamageTypeTable[id] = data;
	}
};