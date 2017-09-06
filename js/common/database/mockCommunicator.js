var mockCommunicator = new function()
{
	console.warn("Mock Communicator being used.");

// USER
	this.userTable = [

		{'id':'0','username':'LJenkins','password':'password','role_id':'1','email':'ljenkins@gmail.com','active':'1'},
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

// BROKER
	this.brokerTable = [

		{'id':'0','username':'LJenkins','password':'password','role_id':'1','email':'ljenkins@gmail.com','active':'1'},
	];
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
	this.deleteBroker = function(id) {
		for(var i=0;i<this.brokerTable.length;i++) {
			if(this.brokerTable[i].id==id) {
				this.brokerTable.splice(i,1);
			}
		}
	}
	this.updateBroker = function(id, data) {
		data.id = id;
		this.brokerTable[id] = data;
	}

// QUOTE
	this.quoteTable = [
		{
			'id':'0',
			'quote_number':'00001',
			'business_unit_id':'0',
			'broker_id':'0',
			'insurer_id':'0',
			'active':'1',
			'date_created':'1990-05-18 19:01:05',
			'linked_to_quote_id':null,
			'acceptable':'1'
		},
		{
			'id':'1',
			'quote_number':'00002',
			'business_unit_id':'0',
			'broker_id':'0',
			'insurer_id':'0',
			'active':'1',
			'date_created':'1990-05-18 19:02:05',
			'linked_to_quote_id':'0',
			'acceptable':'1'
		},
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

// QUOTE LAND ENTRY
	this.quoteLandEntryTable = [
		{
			'id':'0',
			'quote_id':'0',
			'farm_id':'0',
			'land_number':'000111',
			'crop_id':'1',
			'cultivar':'Red Dwarf',
			'area':'7.4',
			'yield':'14.22',
			'tariff_option_id':'0',
			'value':'1444.01',
			'premium_contribution':'146.35'
		},
		{
			'id':'1',
			'quote_id':'0',
			'farm_id':'1',
			'land_number':'100111',
			'crop_id':'0',
			'cultivar':'Octopussy',
			'area':'6.8',
			'yield':'11.22',
			'tariff_option_id':'0',
			'value':'1444.01',
			'premium_contribution':'122.01'
		},
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
	this.deleteQuoteLandEntry = function(id) {
		for(var i=0;i<this.quoteLandEntryTable.length;i++) {
			if(this.quoteLandEntryTable[i].id==id) {
				this.quoteLandEntryTable.splice(i,1);
			}
		}
	}
	this.updateQuoteLandEntry = function(id, data) {
		data.id = id;
		this.quoteLandEntryTable[id] = data;
	}	

// BUSINESS UNIT
	this.businessUnitTable = [
		{
			'id':'0',
			'name':'Anro Boerdery Co (ABC)',
			'contact_number':'063-887-9635',
			'contact_person':'Anro Swart',
			'email':'anro.swart@bing.com',
			'vat_number':'00625-4811',
			'income_tax_number':'5651484166',
			'active':'1',
			'verified':'1'
		},
		{
			'id':'1',
			'name':'Tiaan and Anro Boerdery Amalgamated Co (TABACO)',
			'contact_number':'062-352-1342',
			'contact_person':'Tiaan Swart',
			'email':'tiaan.swart@yahoo.com',
			'vat_number':'52159-6487',
			'income_tax_number':'6768142685',
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

// INSURER
	this.insurerTable = [
		{
			'id':'0',
			'userId':'0',
			'active':'1',
			'isAdmin':'0',
		},
		{
			'id':'1',
			'userId':'1',
			'active':'1',
			'isAdmin':'0',
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

// CROP
	this.cropTable = [
		{
			'id':'0',
			'name':'Apple',
			'product_id':'0',
			'active':'1',
			'price_uom_id':'0',
			'area_uom_id':'0'
		},
		{
			'id':'1',
			'name':'Banana',
			'product_id':'0',
			'active':'1',
			'price_uom_id':'0',
			'area_uom_id':'0'
		},
	];
	this.createCrop = function(data) {

		data.id = this.cropTable.length;
		this.cropTable.push(data);

		return data.id;
	}
	this.getCrop = function(id) {
		for(var i=0;i<this.cropTable.length;i++) {
			if(this.cropTable[i].id==id) {
				return this.cropTable[i];
			}
		}
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

// FARM
	this.farmTable = [
		{
			'id':'0',
			'name':'Plaas Anro Een',
			'business_unit_id':'0',
			'latitude':'1.22644',
			'longitude':'-0.35428',
			'active':'1',
			'district_id':'0'
		},
		{
			'id':'1',
			'name':'Plaas Anro Twee',
			'business_unit_id':'0',
			'latitude':'1.325642',
			'longitude':'-0.35243',
			'active':'1',
			'district_id':'0'
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
	
};