ref.onAuth(function(authData) {
  if (authData && isNewUser) {
    // save the user's profile into the database so we can list users,
    // use them in Security and Firebase Rules, and show profiles
    ref.child("users").child(authData.uid).set({
      fname: getFName(authData),
      lname: getLName(authData)
    });
  }
});

function getFName(authData){
	return authData.facebook.cachedUserProfile.first_name;
}

function getLName(authData){
	return authData.facebook.cachedUserProfile.last_name;
}

function login(){

	ref.authWithOAuthPopup("facebook", function(error, authData) {
  		if (error) {
   			console.log("Login Failed!", error);
  		} else {
  			console.log("Authenticated successfully with payload:", authData.facebook.cachedUserProfile.first_name);
  			checkSession();
  		}
	}, {
  		remember: "sessionOnly"
	});
}

function logout(){
	ref.unauth();
	window.location.href = "index.html";
}

function checkSession(){
	authData = ref.getAuth();
	//console.log(authData);
	if(authData){
		window.location.href = "borrow.html";
	}
	if(authData == null){
		$.ajax({
	        url: 'https://api.climate.com/api/authdemo/info/self-aware',
	        xhrFields: {
	          withCredentials: true
	        },
	        dataType: 'json',
	        success: function(response) {
	        	window.full_name = response.headers_in["X-User-Email"];
	        	$(".username").html("&nbsp;&nbsp;" + window.full_name);
	        	window.location.href = "borrow.html";

	        },
	        error: function(error) {
	          //window.location.href = "index.html";
	        }
	      });
	}
}

function checkSessionLogin(){
	authData = ref.getAuth();
	//console.log(authData);
	if(authData == null){
		$.ajax({
	        url: 'https://api.climate.com/api/authdemo/info/self-aware',
	        xhrFields: {
	          withCredentials: true
	        },
	        dataType: 'json',
	        success: function(response) {
	        	window.full_name = response.headers_in["X-User-Email"];
	        	$(".username").html("&nbsp;&nbsp;" + window.full_name);
	        },
	        error: function(error) {
	          window.location.href = "index.html";
	        }
	      });
		
	}else{
		window.full_name = getFName(authData) + " "+ getLName(authData);
		$(".username").html("&nbsp;&nbsp;" + window.full_name);
	}
}



 function climatelogin(){
    var redirectUrl = encodeURIComponent(window.location.href);
    window.location.href = "https://climate.com/static/app-login/index.html?scope=openid+user&page=oidcauthn&mobile=true&response_type=code&redirect_uri=" + redirectUrl + "&client_id=dptrf0gopr40u9"
 }


$("#logout_anchor").click(function(){
    logout();
});

