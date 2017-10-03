var util = new function() {

	this.displayUploadFileModal = function(data,callback) {

		// HACK
		$("#uploadFileInput").unbind('change');
		$('#uploadFileInput').on('change',function() {
			
			var filename = $('#uploadFileInput').val().match(/[^\\/]*$/)[0];
			
			// Add name to file list
			onFileAdded(filename);
			
		});
		// END OF HACK

		$('#uploadFileModal').modal('show');

		// set the onSave to call callback
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

	// success, error, info, warn
	this.createNotification = function(message,type='success') {

		$.notify(
		  message,
		  { position:"top center",className: type},
		);
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

function onFileAdded(filename) {
	$('#upload_file_uploaded_files_ul').append($('<li></li>').text(filename));
}