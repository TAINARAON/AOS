var loader;

const BROKER_ADMIN = "broker_admin";
const BROKER = "broker";

(function(){        
    console.log("Main linked");
    loader = pageLoader();

    loader.load(BROKER_ADMIN);

    // REAL DATABASE
    //var myCom = httpCommunicator();
    // MOCK DATABAS	E
    //var myCom = mockCommunicator();

    //var invoker = globalInvoker(myCom);
})();