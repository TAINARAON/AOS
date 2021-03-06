(function(){

	var defaultHomeIndex = 0;

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
 			'pageUrl':'html/insurer_admin/clients.html'
 		},
 		{
 			'text':"Quotes",
 			'pageUrl':'html/insurer_admin/quote/quote2.html'
 		},
 		{
 			'text':"Policies",
 			'pageUrl':'html/insurer_admin/policy/policy.html'
 		},
 		{
 			'text':"Damage Reports",
 			'pageUrl':'html/insurer_admin/report/damage_report.html'
 		},
 	];

 	var rightButtons = 
 	[	
 		{
 			'text':'System Keys',
 			'pageUrl':'html/insurer_admin/systemkeys.html'
 		},
 		/*{
 			'text':'Reports',
 			'pageUrl':'html/common/fakeReporting.html'
 		},*/
 		{
 			'text':'Logout',
 			'pageUrl':'html/common/logout.html'
 		},
 		{
 			'text':'IA',
 			'pageUrl':'html/insurer_admin/insurance_agency.html'
 		}
 	];

 	(function init(){
 		setAgrihostIconLink();
 		setupNavStructure();
 	})();

 	function setAgrihostIconLink()
 	{
 		$('#nav_link').on('click',function(e)	{
				e.preventDefault(); 
				loader.loadPage(leftButtons[defaultHomeIndex].pageUrl);
		});
 	}

 	
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