(function(){
 	console.log("Login Linked");

 	document.getElementById("loginBtn").onclick = function() {tekenIn()};


 	function tekenIn() {
 		alert("Login");

 		var userName = document.getElementById("userName").value;
 		alert(userName);
 		var password = document.getElementById("password").value;
 		alert(password);
 		// Do server call here
 	}

 	function sluitAan() {
 		alert("Sluit aan");

 		// Redirect to new page here
 	}

 	function herstelWagwoord() {
 		alert("Herstel wagwoord");

 		// Redirect to new page here
 	}
})();