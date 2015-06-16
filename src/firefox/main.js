// Import the page-mod API
var pageMod = require("sdk/page-mod");
var data = require("sdk/self").data;

// Create a page mod
// It will run a script whenever a ".org" URL is loaded
// The script replaces the page contents with a message
pageMod.PageMod({
    include: "*.hbonordic.com",
    contentStyleFile: "./hbo-next.css",
    contentScriptFile: "./injector.js",
    onAttach: function( worker ) {
        worker.port.emit( "init", data.url("./hbo-next.js") );
    },
    contentScriptWhen: "end"
});