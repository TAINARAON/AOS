var loader;

(function(){        
    console.log("Main linked");
    loader = pageLoader();
    loader.load("");

    var myCom = httpCommunicator();
    var nInvoker = userInvoker(myCom);
})();