function ajaxGet(url,successCallback,failureCallback,mockResponse) {

	successCallback(mockResponse);
	if(mockResponse != null) {
		//console.warn("NOT REAL RESPONSE");
		successCallback(mockResponse);
	} else {

		var async = true;

		var request = new XMLHttpRequest();
		request.onreadystatechange  = function() {

			if (request.readyState === 4)
			{
				var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
				var data = JSON.parse(request.responseText); // Returned data, e.g., an HTML document.

				if(status == 200)
				{
					successCallback(data);
				}
				else
				{
					failureCallback(data);
				}
			}
		}
		
		request.open("GET", url, async);
		request.setRequestHeader("Content-Type", "application/json");
		request.send();
	}
}

function ajaxPost(url,successCallback,failureCallback,requestData,mockResponse) {

	if(mockResponse != null) {
		//console.warn("NOT REAL RESPONSE");
		successCallback(mockResponse);
	} else {

		var async = true;

		var request = new XMLHttpRequest();

		request.onreadystatechange  = function() {

			if (request.readyState === 4)
			{
				var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
				var data = JSON.parse(request.responseText); // Returned data, e.g., an HTML document.

				if(status == 200)
				{
					successCallback(data);
				}
				else
				{
					failureCallback(data);
				}
			}
		}
		
		request.open("POST", url, async);
		request.setRequestHeader("Content-Type", "application/json");

		requestData = JSON.stringify(requestData);
		request.send(requestData);
	}
}
