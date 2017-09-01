var loader;

(function(){        
    console.log("Main linked");
    loader = pageLoader();
    //loader.load("");
    loader.load("broker");

    var myCom = httpCommunicator();
    var nInvoker = userInvoker(myCom);
})();