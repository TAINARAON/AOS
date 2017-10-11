function ajaxGet(url,successCallback,failureCallback,mockResponse) {

	successCallback(mockResponse);
	/*var async = true;

	var request = new XMLHttpRequest();
	request.onLoad = function() {
		var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
		var data = request.responseText; // Returned data, e.g., an HTML document.

		if(status == 200)
		{
			successCallback(data);
		}
		else
		{
			failureCallback(data);
		}
	}
	
	request.open("GET", url, async);
	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	request.send();*/
}

function ajaxPost(url,successCallback,failureCallback,requestData,mockResponse) {

<<<<<<< HEAD
	/*console.log("AJAXPost URL:");
=======
	console.log("AJAXPost URL:");
>>>>>>> 11ba175347e00003611f5054a5d11b6768c96bc6
	console.log(url);
	console.log("AJAXPost requestData:");
	console.log(requestData);
	console.log("AJAXPost mockResponse:");
	console.log(mockResponse);

	successCallback(mockResponse);*/
	var async = true;

	var request = new XMLHttpRequest();
	request.onLoad = function() {
		var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
		var data = request.responseText; // Returned data, e.g., an HTML document.

		if(status == 200)
		{
			successCallback(data);
		}
		else
		{
			failureCallback(data);
		}
	}
	
	request.open("POST", url, async);
	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
<<<<<<< HEAD
	request.send(requestData);
=======
	request.send(requestData);*/
>>>>>>> 11ba175347e00003611f5054a5d11b6768c96bc6
}
