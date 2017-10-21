var util = new function() {

	var count = 0;
	var myFiles = [];
	var callback;
	var myExtraData;

	this.displayUploadFileModal = function(extraData,onSubmitCallback) {

		// TODO: Is action needed? It should just return the files to the callback
		// Set Action
		//$('#upload_file_modal_form').prop('action',action);

		// Clear all files loaded
		$("#uploadFileInput").val('');

		$('#uploadFileModal').modal('show');

		// Remove onClickListener of Upload button and add onClick that does callback sent in
		$("#upload_file_modal_upload_button").off();


		$( '#upload_file_modal_upload_button' ).click( function () {
			// Check for the various File API support.
			if (window.File && window.FileReader && window.FileList && window.Blob) {
			  // Great success! All the File APIs are supported.
			  var files = document.getElementById("uploadFileInput").files;
			  
			  callback = onSubmitCallback;
			  myExtraData = extraData;

			  for (var i = 0, f; f = files[i]; i++)
			  {
			  	myFiles.push(f);
			  }

			  processFiles();
			} 
			else {
			  alert('The File APIs are not fully supported in this browser.');
			}
		} );
	}

	function processFiles()
	{
		var reader = new FileReader();
	  	reader.onload = function () {
			setFileData(myFiles[count], reader.result);
	  		count++;
			processFiles();
	  	};

	  	if(myFiles.length != count)
	  	{
	  		reader.readAsBinaryString(myFiles[count]);
	  	}
	  	else
	  	{
	  		// Done
  			callback(myFiles, myExtraData);
  			myFiles = [];
			callback = undefined;
			extraData = undefined;
			count = 0;
	  	}
	}

	function setFileData(file, data) {
		file["fileData"] = data;
	}

	// success, error, info, warn
	this.createNotification = function(message,type='success') {

		$.notify(
		  message,
		  { position:"top center",className: type},
		);
	}

	this.getDateTimePretty =function (dateTime = null){
	    
	    var now;
		if(dateTime) {
			now = new Date(dateTime); 
		} else {
			now = new Date(); 
		}

	    var year    = now.getFullYear();
	    var month   = now.getMonth()+1; 
	    var day     = now.getDate();
	    var hour    = now.getHours();
	    var minute  = now.getMinutes();
	    var second  = now.getSeconds(); 
	    if(month.toString().length == 1) {
	        var month = '0'+month;
	    }
	    if(day.toString().length == 1) {
	        var day = '0'+day;
	    }   
	    if(hour.toString().length == 1) {
	        var hour = '0'+hour;
	    }
	    if(minute.toString().length == 1) {
	        var minute = '0'+minute;
	    }
	    if(second.toString().length == 1) {
	        var second = '0'+second;
	    }   
	    var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;   
	     return dateTime;
	}

	this.getCurrentDateTime = function() {

		return new Date().getTime();
	}

	this.addTimeToDateTime = function(dateTime,amount,magnitude) {

		switch(magnitude) {
		    case 'milliseconds':
		        amount = amount;	// no change. not sure if I may leave this empty. 
		        break;
		    case 'seconds':
		        amount *= 1000;
		        break;
		    case 'minutes':
		        amount *= 1000 * 60;
		        break;
		    case 'hours':
		        amount *= 1000 * 60 * 60;
		        break;
		    case 'days':
		        amount *= 1000 * 60 * 60 * 24;
		        break;
		    case 'weeks':
		        amount *= 1000 * 60 * 60 * 24 * 7;
		        break;
		    default:
		        console.error('addTimeToDateTime() invalid magnitude passed');
		}
		
		return new Date(dateTime).getTime() + amount;
	}

	this.convertMillisecondsTo = function(amount,unit) {

		var newAmount = 0;

		switch(unit) {
			case 'seconds':
				newAmount = amount / 1000;
				break;
			case 'minutes':
				newAmount = amount / 1000 / 60;
				break;
			case 'hours':
				newAmount = amount / 1000 / 60 / 60;
				break;
			case 'days':
				newAmount = amount / 1000 / 60 / 60 / 24; 
				break;
			case 'weeks':
				newAmount = amount / 1000 / 60 / 60 / 24 / 7; 
				break;
			default: 
				alert('invalid unit. Valid units are seconds,minutes,hours,days,weeks');
		}

		return newAmount;
	}

	this.convertToMilliseconds = function(amount,unit) {

		var newAmount = 0;

		switch(unit) {
			case 'seconds':
				newAmount = amount * 1000;
				break;
			case 'minutes':
				newAmount = amount * 1000 * 60;
				break;
			case 'hours':
				newAmount = amount * 1000 * 60 * 60;
				break;
			case 'days':
				newAmount = amount * 1000 * 60 * 60 * 24; 
				break;
			case 'weeks':
				newAmount = amount * 1000 * 60 * 60 * 24 * 7; 
				break;
			default: 
				alert('invalid unit. Valid units are seconds,minutes,hours,days,weeks');
		}

		return newAmount;
	}
}