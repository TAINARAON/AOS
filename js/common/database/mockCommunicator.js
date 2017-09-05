var mockCommunicator = new function()
{
	console.warn("Mock Communicator being used.");

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
};