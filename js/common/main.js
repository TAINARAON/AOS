(function(){        
    console.log("Main linked");
    var loader = pageLoader();
    loader.load("");

    var myCom = httpCommunicator();
    var nInvoker = userInvoker(myCom);
})();