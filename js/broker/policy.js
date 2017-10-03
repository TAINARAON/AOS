var policyViewer = new function ()
{
	var policies = [];

	var policyAccordion = document.getElementById("policy_accordion");

	(function init(){
		getInitialPolicies();
	})();

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

	function getInitialPolicies()
	{
		policies = policyInvoker.getPolicies();
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

		createAccordionItemDetailDiv("Policy Number: " + policy.policyNumber, parentTitle);
		createAccordionItemDetailDiv("Business Unit: " + policy.businessUnit.name, parentTitle);
		createAccordionItemDetailDiv("Policy Start: " + policy.acceptedOn, parentTitle);
		createAccordionItemDetailDiv("Premium: " + "???", parentTitle);

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
		container.appendChild(tDiv);
	}

	function createPolicyAccordionChildItem(landEntry, container)
	{
		var childLi = document.createElement("LI");

		var childTitle = document.createElement("A");
		childTitle.className = "toggle";

		createAccordionItemDetailDiv("Land Number: " + landEntry.landNumber , childTitle);
		createAccordionItemDetailDiv("Crop: " + landEntry.crop.name, childTitle);
		createAccordionItemDetailDiv("Cultivar" + landEntry.cultivar, childTitle);
		createAccordionItemDetailDiv("Area: " + landEntry.area, childTitle);
		createAccordionItemDetailDiv("Yield " + landEntry.yield, childTitle);
		createAccordionItemDetailDiv("Price: " + landEntry.price, childTitle);
		createAccordionItemDetailDiv("Tariff Option: " + landEntry.tariffOptionDamageType, childTitle);

		var childDetail = document.createElement("DIV");
		childDetail.className = "inner";

		// TODO: add detail

		childLi.appendChild(childTitle);
		childLi.appendChild(childDetail);

		container.appendChild(childLi);
	}
}