var HomeView = function () {

    
    this.initialize = function () {
        this.$el = $('<div/>');
        //this.startLocationTracker();
    };

    this.startLocationTracker = function(){
        var onSuccess = function (position) {
            window.user.latitude = position.coords.latitude; 
            window.user.longitude = position.coords.longitude;
            $("#lat").html(position.coords.latitude);
            $("#lon").html(position.coords.longitude);
            window.alert(position.coords.longitude);
        };
        var onError = function (error){
            console.log('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
        };
        window.setInterval(function(){
            console.log(12);
            navigator.geolocation.getCurrentPosition(onSuccess,onError);
        }, 1000);
    };

    this.render = function() {
        this.$el.html(this.template());
	    return this;
	};

    this.initialize();

}