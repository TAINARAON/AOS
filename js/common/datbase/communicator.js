var httpCommunicator = function()
{
	console.log("Communicator linked");

	function post(url, requestData, successCallback, failureCallback)
	{
		var async = true; // Otherwise program will hang

		var request = new XMLHttpRequest();

		request.onload = function () {
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
		//request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
		request.send(postData);
	}
};