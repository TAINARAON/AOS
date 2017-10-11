var damageReport = new function()
{
	var damageReports = [];
	var viewableBrokers;
	var businessUnits = [];
	var farms = [];

	var brokerSelect = document.getElementById("available_broker_dropdown");
	var businessUnitInput = document.getElementById("business_unit_input");
	var farmInput = document.getElementById("farm_input");
	var searchButton = document.getElementById("search_button");
	var damageReportAccordion = document.getElementById("damage_report_accordion");

	var modalButtonContainer;

	(function init()
	{
		createDamageReportModal("report_modal_container");
		initModalButtonContainer();
		createReportModalButton();

		setAvailableBrokers();
		setSearchButtonClickListener();	
		search();
	})();

	function createDamageReportModal(id)
	{
		loader.loadPartOfPage("html/broker/report/create.html", id);
	}

	function initModalButtonContainer()
	{
		modalButtonContainer = document.getElementById("create_report_btn_container");
	}

	function createReportModalButton()
	{
		var button = document.createElement("BUTTON");
		button.className = "btn btn-info btn-lg";
		button.type = "button";
		button.setAttribute("data-toggle", "modal");
		button.setAttribute("data-target", "#myModal");
		button.innerHTML = "Create Damage Report";

		modalButtonContainer.appendChild(button);
	}

	function setAvailableBrokers()
	{	
		var currentUserBrokerId = sessionStorage.brokerId;

		viewableBrokers = brokerInvoker.getViewableBrokers(currentUserBrokerId);
		
		var tSelfObj = brokerInvoker.getBrokerDisplayable(currentUserBrokerId);
		tSelfObj["brokerId"] = currentUserBrokerId;
		viewableBrokers.push(tSelfObj);

		for(var i = 0; i < viewableBrokers.length; i++)
		{
			var option = document.createElement("OPTION");
			option.innerHTML = viewableBrokers[i].name;

			brokerSelect.appendChild(option);
		}
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
		var tBrokerName = $(brokerSelect).val().trim();
		var brokerId = getIdOfSelectedBroker(tBrokerName);
		var businessUnitName = $(businessUnitInput).val().trim();
		var farmName = $(farmInput).val().trim();

		if(brokerId != -1)
		{
			var tObj = {
				"brokerId":brokerId,
				"farmName":farmName,
				"businessUnitName":businessUnitName
			};
			//ajaxPost("Something", setPolicies, function(){alert("Issue getting policy data");}, tObj, policyInvoker.searchForPolicy(brokerId, policyNumber, businessUnitName));
			ajaxPost("Some url", setDamageReports, function(){alert("Issue getting damage report data");}, tObj, damageReportInvoker.getDamageReport(brokerId, businessUnitName, farmName));
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

			createDamageReportAccordionChildItem(damageReports[i], childContainer);
			/*for(var j = 0; j < damageReports[i].policyLandEntries.length; j++)
			{
				createDamageReportAccordionChildItem(damageReports[i].policyLandEntries[j], childContainer);
			}*/
		}
	}

	function createDamageReportAccordionParentItem(damageReport, container)
	{
		var parentLi = document.createElement("LI");

		var parentTitle = document.createElement("A");
		parentTitle.className = "toggle";
		parentTitle.style.cssText = "display: flex;";

		createAccordionItemDetailDiv("Damage Report Number: " + damageReport.id, parentTitle);
		//createAccordionItemDetailDiv("Policy Number: " + damageReport.policyLandEntry.policy.policyNumber, parentTitle);
		createAccordionItemDetailDiv("Business Unit: " + damageReport.policyLandEntry.policy.businessUnit.name, parentTitle);
		createAccordionItemDetailDiv("Farm name: " + damageReport.policyLandEntry.farm.name, parentTitle);
		createAccordionItemDetailDiv("Land Number: " + damageReport.policyLandEntry.landNumber, parentTitle);
		createAccordionItemDetailDiv("Date of damage: " + damageReport.dateOfDamage, parentTitle);
		createAccordionItemDetailDiv("Date of reporting: " + damageReport.dateOfReporting, parentTitle);

		var childContainer = document.createElement("UL");
		childContainer.className = "inner";

		parentLi.appendChild(parentTitle);
		parentLi.appendChild(childContainer);

		container.appendChild(parentLi);

		return childContainer;
	}

	function createAccordionItemDetailDiv(val, container)
	{
		var tDiv = document.createElement("DIV");
		tDiv.innerHTML = val;
		tDiv.style.cssText = "margin-right: 80px;";
		container.appendChild(tDiv);
	}

	function createDamageReportAccordionChildItem(damageReport, container)
	{
		var childDetail = document.createElement("DIV");
		//childDetail.className = "inner";

		var coveredDamageTypesContainer = document.createElement("DIV");
		coveredDamageTypesContainer.style.cssText = "float: left; margin-right: 30px;";

		var coveredDamageTypeHeader = document.createElement("h4");
		coveredDamageTypeHeader.innerHTML = "Covered Damage Types:";
		coveredDamageTypesContainer.appendChild(coveredDamageTypeHeader);
		
		var coveredDamageTypes = document.createElement("UL");
		for(var i = 0; i < damageReport.policyLandEntry.policyLandEntryDamageTypes.length; i++)
		{
			var policyLandEntryDamageType = damageReport.policyLandEntry.policyLandEntryDamageTypes[i];

			var damageTypeElement = document.createElement("LI");
			damageTypeElement.innerHTML = policyLandEntryDamageType.tariffOptionDamageType.damageType.name;
			coveredDamageTypes.appendChild(damageTypeElement);
		}
		coveredDamageTypesContainer.appendChild(coveredDamageTypes);
		childDetail.appendChild(coveredDamageTypesContainer);


		var sufferedDamageTypesContainer = document.createElement("DIV");
		sufferedDamageTypesContainer.style.cssText = "float: left;";

		var sufferedDamageTypeHeader = document.createElement("h4");
		sufferedDamageTypeHeader.innerHTML = "Suffered Damage Types:";
		sufferedDamageTypesContainer.appendChild(sufferedDamageTypeHeader);

		var sufferedDamageTypes = document.createElement("UL");
		for(var i = 0; i < damageReport.damageReportDamageTypes.length; i++)
		{
			var damageTypeElement = document.createElement("LI");
			damageTypeElement.innerHTML = damageReport.damageReportDamageTypes[i].damageType.name;
			sufferedDamageTypes.appendChild(damageTypeElement);
		}
		sufferedDamageTypesContainer.appendChild(sufferedDamageTypes);
		childDetail.appendChild(sufferedDamageTypesContainer);

		container.appendChild(childDetail);

		/*var childLi = document.createElement("LI");

		var childTitle = document.createElement("A");
		childTitle.className = "toggle";
		childTitle.style.cssText = "display: flex;";

		createAccordionItemDetailDiv("Land Number: " + landEntry.landNumber , childTitle);
		createAccordionItemDetailDiv("Crop: " + landEntry.crop.name, childTitle);
		createAccordionItemDetailDiv("Cultivar: " + landEntry.cultivar, childTitle);
		createAccordionItemDetailDiv("Area: " + landEntry.area, childTitle);
		createAccordionItemDetailDiv("Yield " + landEntry.yield, childTitle);
		createAccordionItemDetailDiv("Price: " + landEntry.price, childTitle);
		createAccordionItemDetailDiv("Tariff Option: " + landEntry.tariff, childTitle);

		var childDetail = document.createElement("DIV");
		childDetail.className = "inner";



		childLi.appendChild(childTitle);
		childLi.appendChild(childDetail);

		container.appendChild(childLi);*/
	}
}