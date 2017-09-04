var mockCommunicator = function()
{
	var userTable = [];
	function createUser(userData) {

		userData.id = userTable.length;
		userTable.push(userData);

		return userData.id;
	}



	return {

	}
};