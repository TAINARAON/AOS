var pageLoader = function()
{
	console.log("Page loader linked");

	var navigationBackStack = [];

	function load(role) {
		for(var i = 0; i < assetReferences.length; i++) {

			if(assetReferences[i].role == role) {

				loadAssets(assetReferences[i]);
				return;
			}
		}
	}

	function loadPage(pageUrl, state = null) {

		$("#container").load(pageUrl);

		addNavigationToBackStack(pageUrl,state);
	}


	function loadPartOfPage(pageUrl,targetContainer) {
		$(("#"+targetContainer)).load(pageUrl);
	}

	function addNavigationToBackStack(pageUrl,state) {

		var navObject = {
			'pageUrl':pageUrl,
			'state':state
		}

		navigationBackStack.push(navObject);

		console.log(navigationBackStack);
	}

	function loadAssets(asset) {

		loadHtml(asset.htmlFiles);
		loadCss(asset.cssFiles);
		loadJs(asset.jsFiles);
	}

	function loadHtml(htmlFiles)
	{
		if(htmlFiles.navbar != "")
		{
			document.getElementById("navbar_container").innerHTML='<object type="text/html" data="'+ htmlFiles.navbar +'" ></object>';
		}
		else
		{
			// Load the icon into the nav
			var img = document.createElement('DIV');
			img.style.cssText = 'position:relative; width:100%; height:60px; left: 50%; transform: translateX(-50%);';
			img.style.backgroundImage = "url('img/agrihost.png')";
			img.style.backgroundRepeat = "no-repeat";
			document.getElementById("navbar_container").appendChild(img);
		}

		loadPage(htmlFiles.landing_page);
	}

	function loadJs(jsFiles)
	{
		for(var i = 0; i < jsFiles.length; i++)
		{
			var fileref=document.createElement('script')
		    fileref.setAttribute("type","text/javascript")
		    fileref.setAttribute("src", jsFiles[i]);
		    var html = document.getElementsByTagName('html')[0];
		    html.appendChild(fileref);

		    /*var po = document.createElement('script'); 
		    po.type = 'text/javascript'; 
		    po.async = true;
		    po.src = jsFiles[i];
		    var s = document.getElementsByTagName('script')[0];
		    s.parentNode.insertBefore(po, s);*/

		    //$('<script>alert("hi");</' + 'script>').appendTo(document.body);
		    //$('<script type="text/javascript" src="'+jsFiles[i]+'"></' + 'script>').appendTo(document.body);
		}
	}

	function loadCss(cssFiles)
	{
		for(var i = 0; i < cssFiles.length; i++)
		{
			var fileref=document.createElement("link");
		    fileref.setAttribute("rel", "stylesheet");
		    fileref.setAttribute("type", "text/css");
		    fileref.setAttribute("href", cssFiles[i]);

		    var head = document.getElementsByTagName('head')[0];
		    head.appendChild(fileref);
		}
	}

	var assetReferences = 
	[
		{
			"role":"broker",
			"cssFiles":["b1.css","b2.css","b3.css"],
			"jsFiles":["b1.js","b2.js"],
			"htmlFiles":{
				"navbar":"html/common/nav.html",
				"landing_page":"html/common/home.html"
			}
		},
		{
			"role":"client",
			"cssFiles":["c1.css","c2.css","c3.css"],
			"jsFiles":["c1.js","c2.js"],
			"htmlFiles":{
				"navbar":"html/common/nav.html",
				"landing_page":"html/common/home.html"
			}
		},
		{
			"role":"",
			"cssFiles":["css/common/login.css"],
			"jsFiles":["js/common/login.js"],
			"htmlFiles":{
				"navbar":"",
				"landing_page":"html/common/login.html"
			}
		}
	];

	return {
		load: function (role){
			load(role);
		},
		loadPage: function (url, state = null) {
			loadPage(url, state);
		},
		loadPartOfPage: function(url, targetContainer) {
			loadPartOfPage(url,targetContainer);
		}
	};
};