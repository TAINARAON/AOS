var damageReport = new function()
{
	var insurerAdminId;

	var damageReports = [];
	var viewableBrokerages;
	var businessUnits = [];
	var farms = [];

	var brokerageSelect = document.getElementById("available_broker_dropdown");
	var businessUnitInput = document.getElementById("business_unit_input");
	var farmInput = document.getElementById("farm_input");
	var searchButton = document.getElementById("search_button");
	var damageReportAccordion = document.getElementById("damage_report_accordion");

	var modalButtonContainer;

	(function init()
	{
		insurerAdminId = insurerAdminController.getInsurerAdmin().id;

		setAvailableBrokerages();
		setSearchButtonClickListener();	
		search();
	})();

	function setAvailableBrokerages()
	{	
		var requestObj = {'insurerAdminId':insurerAdminId};
		insurerAdminController.getBrokerages(
			function(response){
				viewableBrokerages = response;

				for(var i = 0; i < viewableBrokerages.length; i++)
				{
					var option = document.createElement("OPTION");
					option.innerHTML = viewableBrokerages[i].name;

					brokerageSelect.appendChild(option);
				}

				// If only one broker is available then it will be onself, as it is the first option it will already be selected
				// Hide the dropdown
				if(viewableBrokerages.length == 1)
				{
					document.getElementById("available_broker_container").style.display = "none";
					document.getElementById("policy_number_container").className+=" col-md-offset-2";
				}
			},
			function(){
				alert("Failed to load brokerages");
			},
			requestObj
		);
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
		var brokerageId = getIdOfSelectedBrokerage($(brokerageSelect).val());
		var businessUnitName = $(businessUnitInput).val().trim();
		var farmName = $(farmInput).val().trim();

		if(brokerageId != -1)
		{
			var tObj = {
				"brokerageId":brokerageId,
				"farmName":farmName,
				"businessUnitName":businessUnitName
			};
			// Perhaps get a range later on

			insurerAdminController.getDamageReports(
				setDamageReports, 
				function(response){
					util.createNotification("Issue getting damage report data");
				},
				tObj
			);
			
			//ajaxPost("Some url", setDamageReports, function(){alert("Issue getting damage report data");}, tObj, damageReportInvoker.getDamageReport(brokerId, businessUnitName, farmName));
		}
	}

	function getIdOfSelectedBrokerage(name)
	{
		for(var i = 0; i < viewableBrokerages.length; i++)
		{
			if(viewableBrokerages[i].name == name)
			{
				return viewableBrokerages[i].brokerId;
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
		var parentLi = document.createElement("LI");

		var parentTitle = document.createElement("A");
		parentTitle.className = "toggle";
		parentTitle.style.cssText = "display: flex; overflow-x: auto;";
		parentTitle.onclick = function(){toggleOtherPolicy(damageReport, parentLi, container);};

		createAccordionItemDetailDiv("Damage Type: " + damageReport.damageType.name, parentTitle);
		createAccordionItemDetailDiv("Damage Date: " + damageReport.dateOfDamage, parentTitle);
		createAccordionItemDetailDiv("Damage Report Number: " + damageReport.damageReportNumber, parentTitle);
		var requiresTaxation = damageReport.requiresTaxation ? "Yes" : "No";
		createAccordionItemDetailDiv("Taxation Required: " + requiresTaxation, parentTitle);
		//calculateDamageStatus(damageReport, createAccordionItemDetailDiv("Status: ", parentTitle));
		calculateDamageStatus(damageReport, createAccordionItemDetailDiv("Status: ", parentTitle));

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
		damageDiv.style.cssText = "height: 20px; width: 20px; float: right; border-radius:20px;";

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

	function createAccordionItemDetailDiv(val, container)
	{
		var tDiv = document.createElement("DIV");
		tDiv.innerHTML = val;
		tDiv.style.cssText = "margin-right: 80px;";
		container.appendChild(tDiv);
		return tDiv;
	}

	function createDamageReportAccordionChildHeaderItem(damageReport, container)
	{
		var childLi = document.createElement("LI");

		var childTitle = document.createElement("A");
		childTitle.className = "toggle";
		childTitle.style.cssText = "display: flex; background: #4287b5; font-style: oblique; font-size: large;";

		//createAccordionItemDetailDiv("Business Unit: " + damageReport.businessUnit.name, childTitle);
		createAccordionItemDetailDiv("Business Unit: " + damageReport.farm.businessUnit.name, childTitle);
		//createAccordionItemDetailDiv("Contact Person: " + damageReport.businessUnit.contactPerson, childTitle);
		createAccordionItemDetailDiv("Contact Person: " + damageReport.farm.businessUnit.contactPerson, childTitle);
		//createAccordionItemDetailDiv("Contact Number: " + damageReport.businessUnit.contactNumber, childTitle);
		createAccordionItemDetailDiv("Contact Number: " + damageReport.farm.businessUnit.contactNumber, childTitle);
		//createAccordionItemDetailDiv("District: " + damageReport.district.name, childTitle);
		createAccordionItemDetailDiv("District: " + damageReport.farm.district.name, childTitle);
		createAccordionItemDetailDiv("Farm: " + damageReport.farm.name, childTitle);

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