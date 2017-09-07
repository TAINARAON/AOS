(function(){ 

	var quote = [];

	var input_boerdery = document.getElementById("business_unit");
	var input_plaas = document.getElementById("farm");
	var input_produk = document.getElementById("produk");
	var input_gewas = document.getElementById("gewas");
	var input_opsie_tipe = document.getElementById("opsie_tiepe");
	var input_persentasie = document.getElementById("persentasie");
	var input_land_nommer = document.getElementById("land_nommer");
	var input_kultivar = document.getElementById("kultivar");
	var input_oppervlakte = document.getElementById("oppervlakte");
	var input_gewas_opbrengs = document.getElementById("gewas_opbrengs");
	var input_rand_per_eenheid = document.getElementById("rand_per_eenheid");
	var input_versekerings_waarde = document.getElementById("versekerings_waarde");

	var closeModalBtn = document.getElementById("close_modal");

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

		var boerdery = input_boerdery.value;
		var plaas = input_plaas.value;
		var produk = input_produk.value;
		var gewas = input_gewas.value;
		var opsie_tipe = input_opsie_tipe.value;
		var persentasie = input_persentasie.value;
		var land_nommer = input_land_nommer.value;
		var kultivar = input_kultivar.value;
		var oppervlakte = input_oppervlakte.value;
		var gewas_opbrengs = input_gewas_opbrengs.value;
		var rand_per_eenheid = input_rand_per_eenheid.value;
		var versekerings_waarde = input_versekerings_waarde.value;

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
	}

	function addToTable(data, container)
	{
		var row = document.createElement('TR');
		for(var i = 0; i < data.plase.length; i++)
		{
			var spesifiekePlaas = data.plase[i];

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
		reset();
	}

	function reset()
	{
		console.log("Resetting modal values");
		resetInputValues();
		resetQuoteData();
		resetTableRows();
	}

	function resetInputValues()
	{
		input_boerdery.value = "";
		input_plaas.value = "";
		input_produk.value = "";
		input_gewas.value = "";
		input_opsie_tipe.value = "";
		input_persentasie.value = "";
		input_land_nommer.value = "";
		input_kultivar.value = "";
		input_oppervlakte.value = "";
		input_gewas_opbrengs.value = "";
		input_rand_per_eenheid.value = "";
		input_versekerings_waarde.value = "";
	}

	function resetQuoteData()
	{
		quote = [];
	}

	function resetTableRows()
	{
		var rowContainer = document.getElementById("create_quote_table_body");
		rowContainer.innerHTML = "";
	}

	function createQuoteAndAddToView()
	{
		console.log("Create quote");
		updateQuotes(quote);
		closeModal();
		reset();
	}

	function closeModal()
	{
		console.log("closing modal");
		closeModalBtn.click();
	}
})();