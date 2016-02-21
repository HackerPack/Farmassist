// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
    var slider = new PageSlider($('body'));
    var homeView = new HomeView();

    router.addRoute('', function() {
      slider.slidePage(homeView.render().$el);
    });	
	
	router.start();
    
    /* --------------------------------- Event Registration -------------------------------- */
    document.addEventListener('deviceready', function () {
        StatusBar.overlaysWebView( false );
        StatusBar.backgroundColorByHexString('#ffbe5b');
        StatusBar.styleDefault();
        window.alert("ee");
        if (navigator.notification) { // Override default HTML alert with native dialog
            window.alert = function (message) {
                navigator.notification.alert(
                    message,    // message
                    null,       // callback
                    "Tracktor", // title
                    'OK'        // buttonName
                );
            };
        }
        FastClick.attach(document.body);
        window.alert("checl");
        homeView.startLocationTracker();
    }, false);


    /* ---------------------------------- Local Functions ---------------------------------- */


}());