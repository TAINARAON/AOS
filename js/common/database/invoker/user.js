var userInvoker = new function() {
    this.url =  "some_url_that_targets_user_table";

    this.create = function (data,successCallback,failureCallback) 
    {
        var newUserId = mockCommunicator.createUser(data);
		fush();
		if(newUserId == null) {
			failureCallback();
		} else {
			successCallback();
		}
    };
}

function fush() {
	alert("in fush");
}