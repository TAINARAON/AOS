var pageLoader = function()
{
	console.log("Page loader linked");

	function load(role) {
	
		for(var i = 0; i < assetReferences.length; i++) {

			if(assetReferences[i].role == role) {

				loadAssets(assetReferences[i]);
				return;
			}
		}

		alert("ERROR pageLoader");
	}

	function loadAssets(asset) {

		loadHtml(asset.htmlFiles);
		loadCss(asset.jsFiles);
		loadJs(asset.cssFiles);
	}

	function loadHtml(htmlFiles)
	{
		//document.getElementById("content").innerHTML='<object type="text/html" data="home.html" ></object>';
		
	}

	function loadJs(jsFiles)
	{
		for(var i = 0; i < jsFiles.length; i++)
		{
			var fileref=document.createElement('script')
		    fileref.setAttribute("type","text/javascript")
		    fileref.setAttribute("src", jsFiles[i])
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
		}
	}

	var assetReferences = 
	[
		{
			"role":"broker",
			"cssFiles":["b1.css","b2.css","b3.css"],
			"jsFiles":["b1.js","b2.js"],
			"htmlFiles":[]
		},
		{
			"role":"client",
			"cssFiles":["c1.css","c2.css","c3.css"],
			"jsFiles":["c1.js","c2.js"],
			"htmlFiles":[]
		}
	];
};