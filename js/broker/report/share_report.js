var shareModal = new function()
{
	var reportId = -1;

	var modal = document.getElementById("shareModal");
	var pdfContainer = document.getElementById("pdf_content_container");
	var cancelBtn = document.getElementById("cancelSharePolicy");
	var printBtn = document.getElementById("printPolicy");
	var emailBtn = document.getElementById("emailPolicy");

	(function init(){
		cancelBtn.onclick = function(){hide(); reportId = -1;};
		printBtn.onclick = function(){print();};
		emailBtn.onclick = function(){email();};
	})();

	function print()
	{
		alert("To be added at a later stage");
	}

	function email()
	{
		alert("To be added at a later stage");
	}

	this.show = function(id)
	{
		reportId = id;

		// Request pfd here
		
		modal.style.cssText = "display: block; padding-right: 17px;";
		modal.className = "modal fade in";
	}

	function hide()
	{
		modal.style.cssText = "display: none;";
		modal.className = "modal fade";
	}
}