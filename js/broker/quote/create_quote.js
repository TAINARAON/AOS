(function(){ 

	var quote = [];

	(function init(){
		setupModalButtonClickListeners();
	})();

	function setupModalButtonClickListeners()
	{
		console.log("Adding click listeners");
		var includeBtn = document.getElementById("includeRow");
		console.log(includeBtn);
		includeBtn.onclick = function(e) {addFarmToQuote();};
		document.getElementById("cancelQuote").onclick = function(e) {cancelCreatingQuote();};
		document.getElementById("acceptQuote").onclick = function(e) {createQuoteAndAddToView()};
	}

	function addFarmToQuote()
	{
		var rowContainer = document.getElementById("create_quote_table_body");

		var boerdery = document.getElementById("business_unit").value;
		var plaas = document.getElementById("farm").value;
		var produk = document.getElementById("produk").value;
		var gewas = document.getElementById("gewas").value;
		var opsie_tipe = document.getElementById("opsie_tiepe").value;
		var persentasie = document.getElementById("persentasie").value;
		var land_nommer = document.getElementById("land_nommer").value;
		var kultivar = document.getElementById("kultivar").value;
		var oppervlakte = document.getElementById("oppervlakte").value;
		var gewas_opbrengs = document.getElementById("gewas_opbrengs").value;
		var rand_per_eenheid = document.getElementById("rand_per_eenheid").value;
		var versekerings_waarde = document.getElementById("versekerings_waarde").value;

		var data = {
			"boerdery":boerdery,
			plase:[
				{
					"plaas":plaas,
					"produk":produk,
					"gewas":gewas,
					"opsie_tiepe":opsie_tipe,
					"persentasie":persentasie,
					"land_nommer":land_nommer,
					"kultivar":kultivar,
					"oppervlakte":oppervlakte,
					"gewas_opbrengs":gewas_opbrengs,
					"rand_per_eenheid":rand_per_eenheid,
					"versekerings_waarde":versekerings_waarde
				}
			]
		};

		addToQuoteObject(data);
		addToTable(data, rowContainer);
	}

	function addToQuoteObject(data)
	{
		var exists = false;
		for(var i = 0; i < quote.length; i++)
		{
			if(quote[i].boerdery == data.boerdery)
			{
				// Only one farm will be added per click so it's safe to select 0 in the array
				quote[i].plase.push(data.plase[0]);
				exists = true;
			}
		}

		if(!exists)
		{
			data.id = quote.length;
			quote.push(data);
		}

		console.log(quote);
	}

	function addToTable(data, container)
	{
		var row = document.createElement('TR');
		for(var i = 0; i < data.plase.length; i++)
		{
			var spesifiekePlaas = data.plase[i];
			console.log(spesifiekePlaas);

			createColumn(spesifiekePlaas.plaas, row);
			createColumn(spesifiekePlaas.produk, row);
			createColumn(spesifiekePlaas.gewas, row);
			createColumn(spesifiekePlaas.opsie_tiepe, row);
			createColumn(spesifiekePlaas.persentasie, row);
			createColumn(spesifiekePlaas.land_nommer, row);
			createColumn(spesifiekePlaas.kultivar, row);
			createColumn(spesifiekePlaas.oppervlakte, row);
			createColumn(spesifiekePlaas.gewas_opbrengs, row);
			createColumn(spesifiekePlaas.rand_per_eenheid, row);
			createColumn(spesifiekePlaas.versekerings_waarde, row);
		}

		container.appendChild(row);
	}

	function createColumn(value, container)
	{
		var column = document.createElement('TH');
		column.innerHTML = value;

		container.appendChild(column);
	}

	function cancelCreatingQuote()
	{
		alert("Cancel creating quote");
	}

	function createQuoteAndAddToView()
	{
		alert("Create quote");
	}
})();