var script = document.createElement( "script" );
script.type = "text/javascript";

self.port.on("init", function( scriptURL ) {
    script.src = scriptURL;
    window.document.body.appendChild( script );
});