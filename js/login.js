var userData;
function getUserData(userEmail){
	console.log("User email is" + userEmail);
	$.ajax({
	        url: 'https://hackillinois.climate.com/api/users/details?email=' + userEmail + '&userId=',
	        xhrFields: {
	          withCredentials: true
	        },
	        dataType: 'json',
	        success: function(response) {
	        	userData = response;
	        	setUserDataInUI();
	        },
	        error: function(error) {
	          userData = null;
	        }
	      });
}

function getId(authData){
	return userData.id;
}

function getFName(authData){
	return userData.firstname;
}

function getLName(authData){
	return userData.lastname;
}

function logout(){
	ref.unauth();
	window.location.href = "index.html";
}

function setUserDataInUI()
{
	window.full_name = getFName() + " "+ getLName();
	$(".username").html("&nbsp;&nbsp;" + window.full_name);
}

function checkSession(){
	authData = ref.getAuth();
	//console.log(authData);
	if(authData){
		window.location.href = "borrow.html";
	}
	if(authData == null){
		console.log("Checks session");
		$.ajax({
	        url: 'https://api.climate.com/api/authdemo/info/self-aware',
	        xhrFields: {
	          withCredentials: true
	        },
	        dataType: 'json',
	        success: function(response) {
	        		
	        	var ref = new Firebase("https://farmassist.firebaseio.com");
				ref.authAnonymously(function(error, authData) {
				  if (error) {
				    console.log("Login Failed!", error);
				  } else {
				    console.log("Authenticated successfully with payload:", authData);
				  }
				});

				getUserData(response.headers_in["X-User-Email"]);

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
		console.log("Checks login session");
		$.ajax({
	        url: 'https://api.climate.com/api/authdemo/info/self-aware',
	        xhrFields: {
	          withCredentials: true
	        },
	        dataType: 'json',
	        success: function(response) {
	        	
	        	var ref = new Firebase("https://farmassist.firebaseio.com");
				ref.authAnonymously(function(error, authData) {
				  if (error) {
				    console.log("Login Failed!", error);
				  } else {
				    console.log("Authenticated successfully with payload:", authData);
				  }
				});

				getUserData(response.headers_in["X-User-Email"]);
	        },
	        error: function(error) {
	          window.location.href = "index.html";
	        }
	      });
	}else{
		window.full_name = getFName() + " "+ getLName();
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

