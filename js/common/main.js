var loader;

(function(){        
    console.log("Main linked");
    loader = pageLoader();

    loader.load("broker");

    // REAL DATABASE
    //var myCom = httpCommunicator();
    // MOCK DATABAS	E
    //var myCom = mockCommunicator();

    //var invoker = globalInvoker(myCom);
})();