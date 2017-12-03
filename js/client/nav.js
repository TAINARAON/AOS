(function(){

	var defaultHomeIndex = 0;

	var leftButtons = 
 	[
 		{
 			'text':"Client",
 			'pageUrl':'html/client/businessUnit/businessUnit.html'
 		},
 		{
 			'text':"Quote",
 			'pageUrl':'html/client/quote/quote2.html'
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
 		/*{
 			'text':'Reports',
 			'pageUrl':'html/common/fakeReporting.html'
 		},*/
 		{
 			'text':'Logout',
 			'pageUrl':'html/common/logout.html'
 		},
 		{
 			'text':'C',
 			'pageUrl':'html/client/businessUnit/businessUnit.html'
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