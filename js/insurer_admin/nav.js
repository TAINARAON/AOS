(function(){

	var leftButtons = 
 	[
 		
 		{
 			'text':"Populated by JS",
 			'pageUrl':'html/insurer_admin/insurance_agency.html'
 		},
 		{
 			'text':"Brokers",
 			'pageUrl':'html/insurer_admin/brokers.html'
 		},
 		{
 			'text':"Clients",
 			'pageUrl':'html/insurer_admin/insurance_agency.html'
 		},
 		{
 			'text':"Quotes",
 			'pageUrl':'html/insurer_admin/insurance_agency.html'
 		},
 		{
 			'text':"Policies",
 			'pageUrl':'html/insurer_admin/insurance_agency.html'
 		},
 		{
 			'text':"Damage Reports",
 			'pageUrl':'html/insurer_admin/insurance_agency.html'
 		},
 	];

 	var rightButtons = 
 	[	
 		{
 			'text':'Logout',
 			'pageUrl':'html/common/logout.html'
 		}
 	];

 	(function init(){
 		setupNavStructure();

 	})();

 	
 	function setupNavStructure() {
 		var navbarButtonContainer = $('#navbar_button_container');

 		var insuranceAgencyName = insurerInvoker.getInsuranceAgency()['name'];
 		leftButtons[0]['text'] = insuranceAgencyName;

 		createLeftsideNav(navbarButtonContainer);
 		createRightsideNav(navbarButtonContainer);
 	}

 	function createLeftsideNav(navbarContainer) {

 		var container = $('<ul></ul>').attr("class","nav navbar-nav");

 		for(var i = 0; i < leftButtons.length;i++) {

 			var navButtonContents = leftButtons[i];
 			addNavButtonToContainer(container,navButtonContents);
 		}
 		
 		navbarContainer.append(container);
 	}

 	function createRightsideNav(navbarContainer) {

 		var container = $('<ul></ul>').attr("class","nav navbar-nav navbar-right");

 		for(var i = 0; i < rightButtons.length;i++) {

 			var navButtonContents = rightButtons[i];
 			addNavButtonToContainer(container,navButtonContents);
 		}
 		
 		navbarContainer.append(container);
 	}

 	function addNavButtonToContainer(container, navDetails) {

 		var button = $('<li></li>').css( "cursor", "pointer" );
		var link = $('<a></a>')
			.append(navDetails['text'])
			.on('click',function(e)	{
				e.preventDefault(); 
				loader.loadPage(navDetails['pageUrl'])
			}
		);

		button.append(link);

		container.append(button);
 	}
})();