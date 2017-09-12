(function(){ 

	var businessUnitId = null;
	var currentFarmId = null;
	var currentFarmName = '';
	var quoteLandEntryArray = [];
	var entryBeingEdited = null;
	
	// Input fields
	var businessUnitInputField = $('#business_unit');
	var farmInputField = $('#farm');
	var productInputField = $('#produk');
	var cropInputField = $('#gewas');
	var optionTypeInputField = $('#opsie_tiepe');
	var coverageInputField = $('#persentasie');
	var landNumberInputField = $('#land_nommer');
	var cultivarInputField = $('#kultivar');
	var areaInputField = $('#oppervlakte');
	var yieldInputField = $('#gewas_opbrengs');
	var priceInputField = $('#rand_per_eenheid');
	var rememberYieldCheckbox = $("#onthou_gewas_opbrengs");
	var rememberPriceCheckbox = $("#onthou_rand_waarde");

	// Farm container
	var farmContiner = document.getElementById("farmContainer");

	// Row containers
	var row1 = document.getElementById("row1Container");
	var row2 = document.getElementById("row2Container");
	var row3 = document.getElementById("row3Container");
	var row4 = document.getElementById("row4Container");

	// Land entry table row container
	var landEntryTableBody = $('#create_quote_table_body');

	var closeModalBtn = $('#close_modal');

	var boerderyID;
	var plaasID;
	var allValuesEntered = false;

	(function init(){
		$('#includeRow').on('click',function(e) {onInclude();});
		$('#acceptQuote').on('click',function(e) {onAcceptQuote();});
		$('#cancelQuote').on('click',function(e) {closeModal(); reset();});
		$('#saveEditedLandEntryButton').on('click',function(e) {saveEditedLandEntry();});
		$('#cancelEditedLandEntryButton').on('click',function(e) {onEditComplete();});
	})();

	// TIAAN
	// DONE
	function closeModal() {
		closeModalBtn.trigger('click');
	}

	function showEditLandEntryButtons() {
		$('#row4Container').hide();
		$('#editLandEntryButtonsContainerDiv').show();
	}
	function hideEditLandEntryButtons() {
		$('#row4Container').show();
		$('#editLandEntryButtonsContainerDiv').hide();
	}
	function populateInputFieldsWithValues(landEntry) {

		console.log(landEntry);
	 	farmInputField.val(landEntry['farm']);
		productInputField.val(landEntry['product']);
		cropInputField.val(landEntry['crop']);
		optionTypeInputField.val(landEntry['optionType']);
		coverageInputField.val(landEntry['coverage']);
		landNumberInputField.val(landEntry['landNumber']);
		cultivarInputField.val(landEntry['cultivar']);
		areaInputField.val(landEntry['area']);
		yieldInputField.val(landEntry['yield']);
		priceInputField.val(landEntry['price']);
	}

	function onInclude() {

		var landEntry = getLandEntryInputValues();

		var validationResponse = validateLandEntryInputValues(landEntry);
		var resposenIsValid = validationResponse['result'];

		if(resposenIsValid) {

			addLandEntry(landEntry);
			clearLandEntryFields();
		} else {

			alert(validationResponse['message']);
		}
	}
	function onAcceptQuote() {

		var insurerId = null;		// TODO
		var brokerId = '';			// TODO
		var active = '';			// TODO
		var dateCreated = '';		// TODO
		var quoteLinkedToId = '';	// TODO
		var acceptable = '';		// TODO

		var quote = {
			'businessUnitId':businessUnitId,
			'insurerId':insurerId,
			'brokerId':brokerId,
			'active':active,
			'dateCreated':dateCreated,
			'linkedToQuoteId':quoteLinkedToId,
			'acceptable':acceptable
		};

		var landEntries = {

		};

		createQuoteAndAddToView(quote,landEntries);
	}
	function onValidateBusinessUnit() {

		var buId = getBusinessUnitId();

		if(buId == null) {

			alert('Business Unit is invalid.');
		} else {

			lockInBusinessUnit(buId);
			disableBusinessUnitInput();
			displayFarmInput();
		}
	}
	function onValidateFarm() {

		var farmNameInputValue = farmInputField.val()
		var farmId = getFarmIdByName(farmNameInputValue);

		if(farmId == null) {

			alert('Farm is invalid.');
			revertFarmNameToPreviousValue();

		} else {

			lockInFarm(farmNameInputValue,farmId);
			lockInBusinessUnit(buId);
			disableBusinessUnitInput();
			displayLandEntryInput();
		}
	}
	function lockInFarm(name, id) {
		
		currentFarmName = name;
		currentFarmId = id;
	}
	function revertFarmNameToPreviousValue() {

		farmInputField.val(currentFarmName);
	}
	function disableBusinessUnitInput() {
		alert('sidabling');
		businessUnitInputField.prop('disabled', true);
	}
	function displayFarmInput() {

		farmInputField.show();
	}
	function lockInBusinessUnit(id) {

		businessUnitId = id;
	}
	function getLandEntryInputValues() {

		var landEntry =
		{
			"farm":farmInputField.val(),
			"product":productInputField.val(),			// needs to change
			"crop":cropInputField.val(),				// needs to change
			"optionType":optionTypeInputField.val(),	// needs to change
			"coverage":coverageInputField.val(),		// needs to change
			"landNumber":landNumberInputField.val(),
			"cultivar":cultivarInputField.val(),
			"area":areaInputField.val(),
			"yield":yieldInputField.val(),
			"price":priceInputField.val(),
		}

		return landEntry;
	}
	function addLandEntry(landEntry) {

		var indexInLandEntryArray = quoteLandEntryArray.length;
		addLandEntryToTable(landEntry,indexInLandEntryArray);
		quoteLandEntryArray.push(landEntry);
	}

	function addLandEntryToTable(landEntry,indexInLandEntryArray)
	{
		var landEntryRow = $('<tr></tr>')
			.append($('<th></th>').text(landEntry['farm']))
			.append($('<th></th>').text(landEntry['crop']))
			.append($('<th></th>').text(landEntry['cultivar']))
			.append($('<th></th>').text(landEntry['area']))
			.append($('<th></th>').text(landEntry['yield']))
			.append($('<th></th>').text(landEntry['price']))
			.append($('<th></th>').text(calculateInsuredValue(landEntry)))
			.append($('<th></th>').text(landEntry['optionType']))
			.append($('<th></th>').text(landEntry['coverage']));

		appendButtonColumn(landEntryRow, indexInLandEntryArray);

		landEntryTableBody.append(landEntryRow);
	}

	function calculateInsuredValue(landEntry) {

		return (landEntry['area'] * landEntry['yield'] * landEntry['price']);
	}
	function appendButtonColumn(container, index)
	{
		container.append(createEditButton(index));
		container.append(createDeleteButton(index));
	}
	function createEditButton(index)
	{
		var button = $('<div></div>')
			.text("Edit")
			.addClass( "btn btn-success" )
			.on('click', function() {editLandEntry(index);});

		return button;
	}
	function saveEditedLandEntry() {

		quoteLandEntryArray[entryBeingEdited] = getLandEntryInputValues();
		reloadTable();
		onEditComplete();
	}

	function onEditComplete() {
		hideEditLandEntryButtons();
		clearLandEntryFields();
	}

	function editLandEntry(index) {

		entryBeingEdited = index;
		showEditLandEntryButtons();
		populateInputFieldsWithValues(quoteLandEntryArray[index]);
	}
	function createDeleteButton(index)
	{
		var button = $('<div></div>')
			.text("Delete")
			.addClass( "btn btn-danger" )
			.on('click', function() {deleteLandEntry(index);});

		return button;
	}
	function deleteLandEntry(index)
	{
		quoteLandEntryArray.splice(index, 1);
		
		reloadTable();
		// hacky
		onEditComplete();
	}
	function reloadTable(quote)
	{
		landEntryTableBody.empty();

		for(var i = 0; i < quoteLandEntryArray.length; i++)
		{	
			var landEntry = quoteLandEntryArray[i];
			
			addLandEntryToTable(landEntry,i);
		}
	}
	function createQuoteAndAddToView(quote,landEntries)
	{
		var newQuoteId = quoteInvoker.create(quote,landEntries);

		if(newQuoteId) {
			updateQuotes(quote);
			closeModal();
			reset();
		}
		else
		{
			alert("Could not persist data, please ensure data is valid");
		}

		alert('saved');
	}

	function clearLandEntryFields() {

		landNumberInputField.val('');
		cultivarInputField.val('');
		areaInputField.val('');
		
		if(!rememberYieldCheckbox.is(':checked')) {
			yieldInputField.val('');
		}
		if(!rememberPriceCheckbox.is(':checked')) {
			priceInputField.val('');
		}
	}
	function displayLandEntryInputs() {
		
		// TODO
	}


	function reset() {
		
	}
	function getFarmIdByName(name) {

		return 0;
	}
	function getBusinessUnitId(name) {
		// TODO query DB and see if a name matches. Return ID
		return 0;
	}
	function validateFarmInput() {

		return true;
	}
	function validateLandEntryInputValues(landEntry) {
		
		var response = {
			'result':true,
			'message':'error message'
		};

		return response;
	}
	
})();