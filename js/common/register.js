console.log('common/register.js working');

var registerClientHtmlIsLoaded = false;
var registerBrokerHtmlIsLoaded = false;

// Register Client button
$( document ).on( 'click', '#register_client_button', function ( e ) {
    
    $("#registerBrokerContent").hide();
    $("#registerClientContent").show();

    if(!registerClientHtmlIsLoaded) {
    	$("#registerClientContent").load("html/client/register.html");
    	registerClientHtmlIsLoaded = true;
    }
}); 

// Register Broker button
$( document ).on( 'click', '#register_broker_button', function ( e ) {
    
    $("#registerClientContent").hide();
    $("#registerBrokerContent").show();

    if(!registerBrokerHtmlIsLoaded) {
        $("#registerBrokerContent").load("html/broker/register.html");
        registerBrokerHtmlIsLoaded = true;
    }
}); 


