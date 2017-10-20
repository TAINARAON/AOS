(function(){

	var leftButtons = 
 	[
 		{
 			'text':"Client",
 			'pageUrl':'html/client/client/client.html'
 		},
 		{
 			'text':"Quote",
 			'pageUrl':'html/client/quote/quote.html'
 		},
 		{
 			'text':"Policy",
 			'pageUrl':'html/client/policy/policy.html'
 		},
 		{
 			'text':"Damage Report",
 			'pageUrl':'html/client/report/damage_report.html'
 		}
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