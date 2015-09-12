/*****************
* CasperJS in node

Migrate to SpookyJS?
https://github.com/SpookyJS/SpookyJS
--> Is not working!

***/

var casper = require('casper').create({
    verbose: true,
    logLevel: 'debug',
    ignoreSslErrors: true,
    viewportSize: {
            width: 1400,
            height: 768
        },
    pageSettings: {
         loadImages:  false,         // The WebPage instance used by Casper will
         loadPlugins: false,         // use these settings
         userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
    }
});
casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X)');

// Arguments
if(casper.cli.has("email")) {
    var fbEmail = casper.cli.get("email");
} else {
    system.stdout.writeLine('Email >>');
    var fbEmail = system.stdin.readLine();
}

if(casper.cli.has("password")) {
    var fbPassword = casper.cli.get("password");
} else {
    system.stdout.writeLine('Password >>');
    var fbPassword = system.stdin.readLine();
}

// Settings
var minWaitingTime = 4000;
var maxWaitingTime = 5000;
var getWaitingTime = function() {
    return Math.floor(Math.random() * (maxWaitingTime - minWaitingTime + 1)) + minWaitingTime;
    };

phantom.cookiesEnabled = true;

// print out all the messages in the headless browser context
casper.on('remote.message', function(msg) {
    this.echo('remote message caught: ' + msg);
});

// print out all the messages in the headless browser context
casper.on("page.error", function(msg, trace) {
    this.echo("Page Error: " + msg, "ERROR");
});

var url = 'https://www.facebook.com/login.php';

phantom.cookiesEnabled = true;

casper.start(url, function() {
  this.wait(getWaitingTime(), function() {
    // search for 'casperjs' from google form
    console.log("page loaded: " + this.getTitle());
    //this.test.assertExists('form#login_form', 'form is found');
    this.fill('form#login_form', {
        email: fbEmail,
        pass:  fbPassword
    }, true);
  });
});

casper.thenOpen('https://www.facebook.com/', function(){
  this.wait(getWaitingTime(), function() {
     console.log("Page Title " + this.getTitle());
     this.capture('after-login.png');
     //console.log("Your name is " + document.querySelector('.headerTinymanName').textContent );
  });
});

casper.run();
