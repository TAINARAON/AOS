(function(){
 	console.log("Broker nav linked");

 	(function init(){
 		setupNavStructure();
 	})();

 	function setupNavStructure() {
 		var navbarButtonContainer = document.getElementById("navbar_button_container");

 		var leftButtonContainer = document.createElement('UL');
 		leftButtonContainer.className = "nav navbar-nav";
 		// Add button elements here
 		setupLeftButtons(leftButtonContainer);

 		var rightButtonContainer = document.createElement('UL');
 		rightButtonContainer.className = "nav navbar-nav navbar-right";
 		// Add button elements here
 		setupRightButtons(rightButtonContainer);

 		navbarButtonContainer.appendChild(leftButtonContainer);
 		navbarButtonContainer.appendChild(rightButtonContainer);
 	}

 	function setupLeftButtons(container) {
 		/*var prefix = "broker_nav_";
 		var buttons = ["damage_report", "policy", "quote"];
 		var listeners = [damageReport, policy, quote];
 		var suffix = "_btn";

 		for (var i = buttons.length - 1; i >= 0; i--) {
 			var button = document.createElement('LI');
 			button.style.cssText = "cursor: pointer";
 			var link = document.createElement('A');
 			link.innerHTML = buttons[i].charAt(0).toUpperCase() + buttons[i].slice(1);
 			link.onclick = function(e){e.preventDefault(); alert("Awe"); listeners[i];};
 			link.id = prefix + buttons[i] + suffix;
 			
 			button.appendChild(link);
 			container.appendChild(button);
 		}*/

 		setupDamageReportButton(container);
 		setupPolicyButton(container);
 		setupQuoteButton(container);
 	}

 	function setupDamageReportButton(container) {
 		var button = document.createElement('LI');
		button.style.cssText = "cursor: pointer";
		var link = document.createElement('A');
		link.innerHTML = "Damage Report";
		link.onclick = function(e){e.preventDefault(); damageReport(e);};
		
		button.appendChild(link);
		container.appendChild(button);
 	}

 	function damageReport(event) {
 		//event.preventDefault();
 		alert("Damage report");
 		loader.loadPage("html/broker/damage_report.html");
 	}

 	function setupPolicyButton(container) {
 		var button = document.createElement('LI');
		button.style.cssText = "cursor: pointer";
		var link = document.createElement('A');
		link.innerHTML = "Policy";
		link.onclick = function(e){e.preventDefault(); policy(e);};
		
		button.appendChild(link);
		container.appendChild(button);
 	}

 	function policy(event) {
 		//event.preventDefault();
 		alert("Policy");
 		loader.loadPage("html/broker/policy.html");
 	}

 	function setupQuoteButton(container) {
 		var button = document.createElement('LI');
		button.style.cssText = "cursor: pointer";
		var link = document.createElement('A');
		link.innerHTML = "Quote";
		link.onclick = function(e){e.preventDefault(); quote(e);};
		
		button.appendChild(link);
		container.appendChild(button);
 	}

 	function quote(event) {
 		//event.preventDefault();
 		alert("Quote");
 		loader.loadPage("html/broker/quote.html");
 	}

 	function setupRightButtons(container) {
 		setupLogoutButton(container);
 	}

 	function setupLogoutButton(container) {
 		var button = document.createElement('LI');
 			button.style.cssText = "cursor: pointer";
 			var link = document.createElement('A');
 			link.innerHTML = "Logout";
 			button.onclick = function(e){e.preventDefault(); logout(e)};
 			
 			button.appendChild(link);
 			container.appendChild(button);
 	}

 	function logout() {
 		//event.preventDefault();
 		alert("Logout");
 	}

})();