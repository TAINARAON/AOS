var userInvoker = new function() {
    this.url =  "some_url_that_targets_user_table";

    this.create = function (data) 
    {
        var newUserId = mockCommunicator.createUser(data);

		return newUserId;
    };
    this.getUser = function(id) {
    	
    	return mockCommunicator.getUser(id);
    }
    this.getRoleOfUser = function(userId) {

    	return mockCommunicator.getRole(this.getUser(userId)['roleId']);
    }
    this.getRole = function(id) {
        return mockCommunicator.getRole(id);
    }
}
