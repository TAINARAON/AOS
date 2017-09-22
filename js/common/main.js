var loader;

const BROKER_ADMIN = "broker_admin";
const BROKER = "broker";
const TEST = "test";

(function(){        
    console.log("Main linked");
    loader = pageLoader();

    loader.load(TEST);

    // REAL DATABASE
    //var myCom = httpCommunicator();
    // MOCK DATABAS	E
    //var myCom = mockCommunicator();

    //var invoker = globalInvoker(myCom);
})();