(function(){
 	console.log("Broker nav linked");

 	(function init(){
 		setupNavStructure();
 	})();

 	function setupNavStructure() {
 		var navContainer = document.getElementById("navbar_container");

 		var navBar = document.createElement('NAV');
 		navBar.className = "navbar navbar-inverse";

 		var innerNavContainer = document.createElement('DIV');
 		innerNavContainer.className = "container";

 		var navHeader = document.createElement('DIV');
 		navHeader.className = "navbar-header";

 		var headerLink = document.createElement('a');
 		headerLink.className = "navbar-brand";
 		headerLink.innerHTML = "Agrihost";

 		var navbarButtonContainer = document.createElement('DIV');

 		var leftButtonContainer = document.createElement('UL');
 		leftButtonContainer.className = "nav navbar-nav";
 		// Add button elements here
 		setupLeftButtons(leftButtonContainer);

 		var rightButtonContainer = document.createElement('UL');
 		rightButtonContainer.className = "nav navbar-nav navbar-right";
 		// Add button elements here
 		setupRightButtons(rightButtonContainer);

 		// Appending to one another

 		navContainer.appendChild(navBar);

 		navbar.appendChild(innerNavContainer);

 		innerNavContainer.appendChild(navHeader);

 		navHeader.appendChild(headerLink);

 		innerNavContainer.appendChild(navbarButtonContainer);

 		navbarButtonContainer.appendChild(leftButtonContainer);

 		navbarButtonContainer.appendChild(rightButtonContainer);
 	}

 	function setupLeftButtons(container) {
 		var prefix = "broker_nav_";
 		var buttons = ["damage_report", "policy", "quote"];
 		var listeners = [damageReport, policy, quote];
 		var suffix = "_btn";

 		for (var i = buttons.length - 1; i >= 0; i--) {
 			var button = document.createElement('LI');
 			button.innerHTML = buttons[i].charAt(0).toUpperCase();
 			button.onclick = function(){listeners[i]};
 			button.id = prefix + buttons[i] + suffix;

 			container.appendChild(button);
 		}
 	}

 	function damageReport() {
 		alert("Damage report");
 	}

 	function policy() {
 		alert("Policy");	
 	}

 	function quote() {
 		alert("Quote");
 	}

 	function setupRightButtons(container) {
 		var prefix = "broker_nav_";
 		var buttons = ["logout"];
 		var listeners = [logout];
 		var suffix = "_btn";

 		for (var i = buttons.length - 1; i >= 0; i--) {
 			var button = document.createElement('LI');
 			button.innerHTML = buttons[i].charAt(0).toUpperCase();
 			button.onclick = function(){listeners[i]};
 			button.id = prefix + buttons[i] + suffix;

 			container.appendChild(button);
 		}	
 	}

 	function logout() {
 		alert("Logout");
 	}

})();