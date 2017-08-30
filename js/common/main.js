(function(){        
    console.log("Main linked");
    var loader = pageLoader();
    

    var myCom = httpCommunicator();
    var nInvoker = userInvoker(myCom);
})();