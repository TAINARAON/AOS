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
 		var prefix = "broker_nav_";
 		var buttons = ["damage_report", "policy", "quote"];
 		var listeners = [damageReport, policy, quote];
 		var suffix = "_btn";

 		for (var i = buttons.length - 1; i >= 0; i--) {
 			var button = document.createElement('LI');
 			button.style.cssText = "cursor: pointer";
 			var link = document.createElement('A');
 			link.innerHTML = buttons[i].charAt(0).toUpperCase() + buttons[i].slice(1);
 			//link.onclick = function(){listeners[i]};
 			link.id = prefix + buttons[i] + suffix;
 			
 			button.appendChild(link);
 			container.appendChild(button);

 			$(prefix + buttons[i] + suffix).on('click', function(e) {e.preventDefault(); listeners[i](e);});
 		}
 	}

 	function damageReport(event) {
 		event.preventDefault();
 		alert("Damage report");
 	}

 	function policy(event) {
 		event.preventDefault();
 		alert("Policy");	
 	}

 	function quote(event) {
 		event.preventDefault();
 		alert("Quote");
 	}

 	function setupRightButtons(container) {
 		var prefix = "broker_nav_";
 		var buttons = ["logout"];
 		var listeners = [logout];
 		var suffix = "_btn";

 		for (var i = buttons.length - 1; i >= 0; i--) {
 			var button = document.createElement('LI');
 			button.style.cssText = "cursor: pointer";
 			var link = document.createElement('A');
 			link.innerHTML = buttons[i].charAt(0).toUpperCase() + buttons[i].slice(1);
 			//link.onclick = function(){listeners[i]};
 			link.id = prefix + buttons[i] + suffix;
 			
 			button.appendChild(link);
 			container.appendChild(button);

 			$(prefix + buttons[i] + suffix).on('click', function(e) {e.preventDefault(); listeners[i](e);});
 		}	
 	}

 	function logout(event) {
 		event.preventDefault();
 		alert("Logout");
 	}

})();