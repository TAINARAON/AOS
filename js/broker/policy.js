var policyViewer = new function ()
{
	var policies = [];
	var viewableBrokers; 

	var brokerSelect = document.getElementById("available_broker_dropdown");
	var policyNumberInput = document.getElementById("policy_number_input");
	var businessUnitInput = document.getElementById("business_unit_input");
	var searchButton = document.getElementById("search_button");
	var policyAccordion = document.getElementById("policy_accordion");

	(function init(){
		setAvailableBrokers();
		setSearchButtonClickListener();
		addOnEnterKeyPressedListenerForSearchInput(policyNumberInput);
		addOnEnterKeyPressedListenerForSearchInput(businessUnitInput);
		search();
	})();

	function setAvailableBrokers()
	{	
		// TODO: use sessionStorage.brokerId instead of 0
		var currentUserBrokerId = sessionStorage.brokerId;

		viewableBrokers = brokerInvoker.getViewableBrokers(0);
		
		var tSelfObj = brokerInvoker.getBrokerDisplayable(0);
		tSelfObj["brokerId"] = 0;
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

	function addOnEnterKeyPressedListenerForSearchInput(searchInput)
	{
		$(searchInput).keypress(function(e){
	    if(e.keyCode==13)
	      search();
		});
	}

	function search()
	{
		var tBrokerName = $(brokerSelect).val().trim();
		var brokerId = getIdOfSelectedBroker(tBrokerName);
		var policyNumber = $(policyNumberInput).val().trim();
		var businessUnitName = $(businessUnitInput).val().trim();

		if(brokerId != -1)
		{
			if(policyNumber == "" && businessUnitName == "")
			{
				getInitialPolicies(brokerId);
			}
			else
			{
				setSpecificPolicies(policyInvoker.searchForPolicy(brokerId, policyNumber, businessUnitName));
			}
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

	function setSpecificPolicies(pol)
	{
		policies = pol;
		createAccordionPolicyItems(policies);
		setupAccordionClickHandler();
	}

	function getInitialPolicies(brokerId)
	{
		policies = policyInvoker.getPolicies(brokerId);
		createAccordionPolicyItems(policies);
		setupAccordionClickHandler();
	}

	function createAccordionPolicyItems(policies)
	{
		policyAccordion.innerHTML = "";

		for(var i = 0; i < policies.length; i++)
		{
			var childContainer = createPolicyAccordionParentItem(policies[i], policyAccordion);

			for(var j = 0; j < policies[i].policyLandEntries.length; j++)
			{
				createPolicyAccordionChildItem(policies[i].policyLandEntries[j], childContainer);
			}
		}
	}

	function createPolicyAccordionParentItem(policy, container)
	{
		var parentLi = document.createElement("LI");

		var parentTitle = document.createElement("A");
		parentTitle.className = "toggle";
		parentTitle.style.cssText = "display: flex;";

		createAccordionItemDetailDiv("Policy Number: " + policy.policyNumber, parentTitle);
		createAccordionItemDetailDiv("Business Unit: " + policy.businessUnit.name, parentTitle);
		createAccordionItemDetailDiv("Policy Start: " + policy.acceptedOn, parentTitle);
		createAccordionItemDetailDiv("Premium: " + policy.premium, parentTitle);

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

	function createPolicyAccordionChildItem(landEntry, container)
	{
		var childLi = document.createElement("LI");

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

		// TODO: add detail

		childLi.appendChild(childTitle);
		childLi.appendChild(childDetail);

		container.appendChild(childLi);
	}
}