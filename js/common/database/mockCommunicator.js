var mockCommunicator = new function()
{
	console.error("Mock Communicator being used.");

	this.userTable = [

		{'id':'0','username':'LJenkins','password':'password','role_id':'1','email':'ljenkins@gmail.com','active':'1'},
	];

	this.createUser = function(data) {

		data.id = userTable.length;
		this.userTable.push(data);

		return userData.id;
	}

	this.getUser = function(id) {
		for(var i=0;i<this.userTable.length;i++) {
			if(this.userTable[i].id==id) {
				return this.userTable[i];
			}
		}
	}

	this.deleteUser = function(id) {
		for(var i=0;i<userTable.length;i++) {
			if(userTable[i].id==id) {
				userTable.splice(i,1);
			}
		}
	}

	this.updateUser = function(id, data) {
		data.id = id;
		userTable[id] = data;
	}

	this.brokerTable = [

		{'id':'0','username':'LJenkins','password':'password','role_id':'1','email':'ljenkins@gmail.com','active':'1'},
	];
	
	this.createBroker = function(userData) {

		userData.id = brokerTable.length;
		brokerTable.push(userData);

		return userData.id;
	}
	this.getBroker = function(id) {
		for(var i=0;i<brokerTable.length;i++) {
			if(brokerTable[i].id==id) {
				return brokerTable[i];
			}
		}
	}
	this.deleteBroker = function(id) {
		for(var i=0;i<brokerTable.length;i++) {
			if(brokerTable[i].id==id) {
				brokerTable.splice(i,1);
			}
		}
	}
	this.updateBroker = function(id, data) {
		data.id = id;
		brokerTable[id] = data;
	}
};