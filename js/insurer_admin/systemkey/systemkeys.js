(function init() {

	var TARGET_CONTAINER = "systemkeys_content_div";
	initOnClickListeners(TARGET_CONTAINER);
	// Load Crop
	loader.loadPartOfPage("html/insurer_admin/systemkey/crop.html",TARGET_CONTAINER);
})();

function initOnClickListeners(TARGET_CONTAINER) {

	$('#systemkey_menu_item_crops').on('click',function() {
		loader.loadPartOfPage("html/insurer_admin/systemkey/crop.html",TARGET_CONTAINER);
	});
	$('#systemkey_menu_item_price_uoms').on('click',function() {
		loader.loadPartOfPage("html/insurer_admin/systemkey/price_uom.html",TARGET_CONTAINER);
	});
	$('#systemkey_menu_item_area_uoms').on('click',function() {
		loader.loadPartOfPage("html/insurer_admin/systemkey/area_uom.html",TARGET_CONTAINER);
	});
	$('#systemkey_menu_item_districts').on('click',function() {
		loader.loadPartOfPage("html/insurer_admin/systemkey/district.html",TARGET_CONTAINER);
	});
	$('#systemkey_menu_item_tariffs').on('click',function() {
		loader.loadPartOfPage("html/insurer_admin/systemkey/tariff.html",TARGET_CONTAINER);
	});
	$('#systemkey_menu_item_perils').on('click',function() {
		loader.loadPartOfPage("html/insurer_admin/systemkey/peril.html",TARGET_CONTAINER);
	});
	$('#systemkey_menu_item_tax').on('click',function() {
		loader.loadPartOfPage("html/insurer_admin/systemkey/tax.html",TARGET_CONTAINER);
	});
	$('#systemkey_menu_item_inception_date').on('click',function() {
		loader.loadPartOfPage("html/insurer_admin/systemkey/inception_date.html",TARGET_CONTAINER);
	});
	$('#systemkey_menu_item_inception_date').on('click',function() {
		loader.loadPartOfPage("html/insurer_admin/systemkey/inception_date.html",TARGET_CONTAINER);
	});
	$('#systemkey_menu_item_pool_limit').on('click',function() {
		loader.loadPartOfPage("html/insurer_admin/systemkey/pool_limit.html",TARGET_CONTAINER);
	});
}
