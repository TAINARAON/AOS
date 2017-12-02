var damageReport = new function()
{
	var damageReports = [];
	var viewableBrokers;
	var businessUnits = [];
	var farms = [];

	var businessUnitInput = document.getElementById("business_unit_input");
	var farmInput = document.getElementById("farm_input");
	var searchButton = document.getElementById("search_button");
	var damageReportAccordion = document.getElementById("damage_report_accordion");

	var modalButtonContainer;

	(function init()
	{
		createDamageReportModal("report_modal_container");
		createShareDamageReportModal("share_report_modal");
		initModalButtonContainer();
		createReportModalButton();

		setSearchButtonClickListener();	
		search();
	})();

	function createDamageReportModal(id)
	{
		loader.loadPartOfPage("html/client/report/create.html", id);
	}

	function createShareDamageReportModal(id) {
		loader.loadPartOfPage("html/client/report/share.html", id);
	}

	function initModalButtonContainer()
	{
		modalButtonContainer = document.getElementById("create_report_btn_container");
	}

	function createReportModalButton()
	{
		var button = document.createElement("BUTTON");
		button.className = "btn btn-primary btn-lg";
		button.type = "button";
		button.setAttribute("data-toggle", "modal");
		button.setAttribute("data-target", "#myModal");
		button.innerHTML = "Create Damage Report";

		modalButtonContainer.appendChild(button);
	}

	function setupAccordionClickHandler()
	{
		$('.toggle').click(function(e) {
		  	e.preventDefault();
		    var $this = $(this);
		  	
		    if ($this.next().hasClass('show')) {
		        $this.next().removeClass('show');
		        //$this.next().slideUp(350);
		    } else {
		        $this.parent().parent().find('li .inner').removeClass('show');
		        //$this.parent().parent().find('li .inner').slideUp(350);
		        $this.next().toggleClass('show');
		        //$this.next().slideToggle(350);
		    }
		});
	}

	function setSearchButtonClickListener()
	{
		searchButton.onclick = function(){search();};
	}

	function search()
	{
		var clientId = clientController.getClient().id;
		var businessUnitName = $(businessUnitInput).val().trim();
		var farmName = $(farmInput).val().trim();

		if(clientId != -1)
		{
			var tObj = {
				"clientId":clientId,
				"farmName":farmName,
				"businessUnitName":businessUnitName
			};
			// Perhaps get a range later on

			clientController.getDamageReports(
				setDamageReports, 
				function(response){
					util.createNotification("Issue getting damage report data");
				},
				tObj
			);
			
			//ajaxPost("Some url", setDamageReports, function(){alert("Issue getting damage report data");}, tObj, damageReportInvoker.getDamageReport(brokerId, businessUnitName, farmName));
		}
	}

	function getIdOfSelectedBroker(name)
	{
		for(var i = 0; i < viewableBrokers.length; i++)
		{
			if(viewableBrokers[i].name == name)
			{
				return viewableBrokers[i].brokerId;
			}
		}

		return -1;
	}

	function setDamageReports(dam)
	{
		damageReports = dam;
		createAccordionDamageReportItems(damageReports);
		setupAccordionClickHandler();
	}

	function createAccordionDamageReportItems(damageReports)
	{
		damageReportAccordion.innerHTML = "";
		
		for(var i = 0; i < damageReports.length; i++)
		{
			var childContainer = createDamageReportAccordionParentItem(damageReports[i], damageReportAccordion);

			//createDamageReportAccordionChildItem(damageReports[i], childContainer);
			createDamageReportAccordionChildHeaderItem(damageReports[i], childContainer);
			for(var j = 0; j < damageReports[i].damageReportLandEntries.length; j++)
			{
				createDamageReportAccordionChildItem(damageReports[i].damageReportLandEntries[j], childContainer);
			}
		}
	}

	function createDamageReportAccordionParentItem(damageReport, container)
	{
		var sectionStart = "<section>";
		var sectionEnd = "</section>";

		var parentLi = document.createElement("LI");

		var parentTitle = document.createElement("A");
		parentTitle.className = "toggle";
		parentTitle.style.cssText = "display: flex; overflow-x: auto;";
		parentTitle.onclick = function(){toggleOtherPolicy(damageReport, parentLi, container);};

		createAccordionItemDetailDiv(sectionStart + "Damage Type" + sectionEnd + sectionStart + damageReport.damageType.name + sectionEnd, parentTitle).style.cssText = "text-align: center;";
		createAccordionItemDetailDiv(sectionStart + "Damage Date" + sectionEnd + sectionStart + damageReport.dateOfDamage + sectionEnd, parentTitle).style.cssText = "text-align: center;";
		createAccordionItemDetailDiv(sectionStart + "Damage Report Number" + sectionEnd + sectionStart + damageReport.damageReportNumber + sectionEnd, parentTitle).style.cssText = "text-align: center;";
		var requiresTaxation = damageReport.requiresTaxation ? "Yes" : "No";
		createAccordionItemDetailDiv(sectionStart + "Loss Adjustment Required" + sectionEnd + sectionStart + requiresTaxation + sectionEnd, parentTitle).style.cssText = "text-align: center;";
		//calculateDamageStatus(damageReport, createAccordionItemDetailDiv("Status: ", parentTitle));
		var tDamageIndicator = createAccordionItemDetailDiv("Status: ", parentTitle);
		tDamageIndicator.style.cssText = "text-align: center;";
		calculateDamageStatus(sectionStart + damageReport + sectionEnd, tDamageIndicator);

		var childContainer = document.createElement("UL");
		childContainer.className = "inner";

		parentLi.appendChild(parentTitle);
		parentLi.appendChild(childContainer);

		container.appendChild(parentLi);

		return childContainer;
	}

	function toggleOtherPolicy(damageReport, theCurrentItem, itemContainer)
	{
		var listOfItems = itemContainer.childNodes;

		for(var i = 0; i < listOfItems.length; i++)
		{
			if(listOfItems[i] != theCurrentItem)
			{
				$(listOfItems[i]).toggle();
			}
		}
	}

	function calculateDamageStatus(damageReport, parentTitle)
	{
		var NOTSTARTED = 0;
		var INPROGRESS = 1;
		var DONE = 2;

		var damageDiv = document.createElement("DIV");
		damageDiv.style.cssText = "height: 20px; width: 20px; float: right; border-radius:20px; position: absolute; left: 45%;";

		if(damageReport.taxationProgress == NOTSTARTED)
		{
			damageDiv.style.cssText += "background-color: tomato;";
		}
		else if(damageReport.taxationProgress == INPROGRESS)
		{
			damageDiv.style.cssText += "background-color: #d0c017;";
		}
		else
		{
			damageDiv.style.cssText += "background-color: #17d09a;";
		}

		parentTitle.appendChild(damageDiv);
	}

	/*function calculateDamageStatus(damageReport, parentTitle)
	{
		var damageDiv = document.createElement("DIV");
		damageDiv.style.cssText = "height: 20px; width: 20px; float: right; border-radius:20px;";

		var count = 0;
		var allTrue = true;
		if(damageReport.requiresTaxation)
		{
			for(var i = 0; i < damageReport.damageReportLandEntries.length; i++)
			{
				if(!damageReport.damageReportLandEntries.inspected)
				{
					allTrue = false;
				}
				else
				{
					count++;
				}
			}
		}
		// TODO: test this
		if(!allTrue && count == 0)
		{
			damageDiv.style.cssText += "background-color: tomato;";
		}
		else if(!allTrue && count >= 1)
		{
			damageDiv.style.cssText += "background-color: #d0c017;";
		}
		else
		{
			damageDiv.style.cssText += "background-color: #17d09a;";
		}

		parentTitle.appendChild(damageDiv);
	}*/

	function createAccordionItemDetailDiv(val, container)
	{
		var tDiv = document.createElement("DIV");
		tDiv.innerHTML = val;
		//tDiv.style.cssText = "margin-right: 80px;";
		tDiv.className = "col-md-2";
		container.appendChild(tDiv);
		return tDiv;
	}

	function createDamageReportAccordionChildHeaderItem(damageReport, container)
	{
		var sectionStart = "<section>";
		var sectionEnd = "</section>";

		var childLi = document.createElement("LI");

		var childTitle = document.createElement("A");
		childTitle.className = "toggle";
		childTitle.style.cssText = "display: flex; background: #4287b5; font-style: oblique; font-size: large;";

		//createAccordionItemDetailDiv("Business Unit: " + damageReport.businessUnit.name, childTitle);
		createAccordionItemDetailDiv(sectionStart + "Business Unit" + sectionEnd + sectionStart + damageReport.farm.businessUnit.name + sectionEnd, childTitle);
		//createAccordionItemDetailDiv("Contact Person: " + damageReport.businessUnit.contactPerson, childTitle);
		createAccordionItemDetailDiv(sectionStart + "Contact Person" + sectionEnd + sectionStart + damageReport.farm.businessUnit.contactPerson + sectionEnd, childTitle);
		//createAccordionItemDetailDiv("Contact Number: " + damageReport.businessUnit.contactNumber, childTitle);
		createAccordionItemDetailDiv(sectionStart + "Contact Number" + sectionEnd + sectionStart + damageReport.farm.businessUnit.contactNumber + sectionEnd, childTitle);
		//createAccordionItemDetailDiv("District: " + damageReport.district.name, childTitle);
		createAccordionItemDetailDiv(sectionStart + "District" + sectionEnd + sectionStart + damageReport.farm.district.name + sectionEnd, childTitle);
		createAccordionItemDetailDiv(sectionStart + "Farm" + sectionEnd + sectionStart + damageReport.farm.name + sectionEnd, childTitle);

		childLi.appendChild(childTitle);
		container.appendChild(childLi);
	}

	function createDamageReportAccordionChildItem(damageReportLandEntry, container)
	{
		var childLi = document.createElement("LI");

		var childTitle = document.createElement("A");
		childTitle.className = "toggle";
		childTitle.style.cssText = "display: flex;";
		
		createAccordionItemDetailDiv("Land Number: " + damageReportLandEntry.policyLandEntry.landNumber, childTitle);
		createAccordionItemDetailDiv("Crop Name: " + damageReportLandEntry.policyLandEntry.crop.name, childTitle);
		createAccordionItemDetailDiv("Area: " + damageReportLandEntry.policyLandEntry.area, childTitle);

		var childDetail = document.createElement("DIV");
		childDetail.className = "inner";

		childLi.appendChild(childTitle);
		childLi.appendChild(childDetail);

		container.appendChild(childLi);
	}

	this.reload = function()
	{
		search();
	}
}