// All tables should have a corresponding invoker
var invoker = function(communicator) {

	(function init(){        
    	var userInvoker = userInvoker(communicator);
    	var brokerInvoker = brokerInvoker(communicator);
    	var clientInvoker = clientInvoker(communicator);
	})();

	return {
		"user":userInvoker,
		"broker":brokerInvoker,
		"client":clientInvoker,
	}

}