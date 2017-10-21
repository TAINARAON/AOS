// [{businessUnitId,jqueryElement}]
var businessUnitFarmElements = [];

(function() {

	init();
	
})();


function init() {

	getBusinessUnitsAndTheirFarms();
}

function getBusinessUnitsAndTheirFarms() {

	insurerController.getBusinessUnitsAndTheirFarms(onGetBusinessUnitsAndTheirBrokersSuccess,onGetBusinessUnitsAndTheirBrokersFailure);
}

function onGetBusinessUnitsAndTheirBrokersSuccess(response) {

	populateBusinessUnitsDropdownValues(response['businessUnitsAndFarms']);
}

function onGetBusinessUnitsAndTheirBrokersFailure() {

	alert("failure");
}

function populateBusinessUnitsDropdownValues(businessUnitsAndFarms) {

	var selectElement = $('#insurer_admin_clients_business_units_dropdown');

	for(var i = 0; i < businessUnitsAndFarms.length; i++)
	{
		var businessUnit = businessUnitsAndFarms[i];

		selectElement.append($('<option></option>').text(businessUnit['name']).val(businessUnit['id']));	

		// Add Broker entries in table
		var farms = businessUnit['farms'];

		addFarmEntriesToTable(businessUnit['id'],farms);
	}

	selectElement.on('change',function() {

		onBusinessUnitSelected($(this).val());
	});

	// Populate table
	selectElement.trigger('change');

	// set toggle. ugly but whatever
	setOnAccordionClicked();
}

function addFarmEntriesToTable(businessUnitId,farms) {
	
	for( var i = 0; i < farms.length; i++) {

		var element = createFarmEntryElement(farms[i]);

		var farmElementObject = 
		{
			'businessUnitId':businessUnitId,
			'element':element
		};

		// Keep track of element
		businessUnitFarmElements.push(farmElementObject);

		// Add element to table
		$('#insurance_admin_client_farms_table_body').append(element);
	}
}

function onBusinessUnitSelected(businessUnitId) {

	hideAllFarmEntries();

	showValidFarms(businessUnitId);
}

function hideAllFarmEntries() {
	for(var i = 0; i < businessUnitFarmElements.length; i++) {

		var elementObject = businessUnitFarmElements[i];
		elementObject['element'].hide();
	}
}

function showValidFarms(businessUnitId) {

	for(var i = 0; i < businessUnitFarmElements.length; i++) {

		// entry = {brokerageId,element}
		var entry = businessUnitFarmElements[i];

		if(entry['businessUnitId'] == businessUnitId || businessUnitId == 'ALL') {

			entry['element'].show();
		}
	}
}

function createFarmEntryElement(farm) {

	var tr = $('<li></li>');

	var aToggle = $('<a></a>').addClass('toggle').prop('href',"javascript:void(0);");
	aToggle.append($('<td></td>')).text(farm['name']);
	tr.append(aToggle);

	var ulInner = $('<ul></ul').addClass('inner');
	tr.append(ulInner);

	ulInner.append($('<li>Hello Text</li>'));

	/*var editButton = $('<button></button>')
		.text('Edit')
		.attr('data-toggle','modal')
		.attr('data-target','#editBrokerModal')
		.on('click',function() {
			onEditBroker(broker.id);
		}
	);

	var revokeButton = $('<button></button>')
		.text('Revoke')
		.attr('data-toggle','modal')
		.attr('data-target','#revokeBrokerModal')
		.on('click',function() {
			onRevokeBrokerClick(broker.id);
		}
	);


	tr.append(editButton);
	tr.append(revokeButton);*/


	return tr;
}

function setOnAccordionClicked() {

	$('.toggle').click(function(e) {

	  	e.preventDefault();

	    if ($(this).next().hasClass('show')) {
	        $(this).next().removeClass('show');
	        //$(this).next().slideUp(350);
	    } else {
	        $(this).parent().parent().find('li .inner').removeClass('show');
	        //$(this).parent().parent().find('li .inner').slideUp(350);
	        $(this).next().toggleClass('show');
	        //$(this).next().slideToggle(350);
	    }
	});
}