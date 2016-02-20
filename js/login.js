function getUserData(userEmail, userAuth){

	authData = ref.getAuth();

	if(userAuth == null)
	{
		userAuth = authData;
	}

	console.log("User email is" + userEmail);
	$.ajax({
	        url: 'https://hackillinois.climate.com/api/users/details?email=' + userEmail + '&userId=',
	        xhrFields: {
	          withCredentials: true
	        },
	        dataType: 'json',
	        success: function(response) {
	        	var liveUserRef = ref.child(LIVE_USERS_TABLE);
	        	var liveUserData = {};
	        	liveUserData[userAuth.uid] = response;
	        	liveUserRef.update(liveUserData, setUserDataInUI(userAuth));

	        	var userRef = ref.child(USERS_TABLE);
	        	userRef.once("value", function(snapshot) {
					  var isUserExists = snapshot.child(response.id).exists();

					  if(!isUserExists)
					  {
					  	var userData = {};
					  	userData[response.id] = response;
					  	userRef.update(userData);
					  }
				});
	        },
	        error: function(error) {
	        }
	      });
}

function getId(){
	authData = ref.getAuth();
	liveUserRef = new Firebase(FIRE_BASE_URL+LIVE_USERS_TABLE+authData.uid);

	liveUserRef.once("value", function(snapshot){
		var userID = snapshot.val().id;

		return userID;
	});
}

function logout(){
	authData = ref.getAuth();
	
	var liveUserRef = ref.child(LIVE_USERS_TABLE).child(authData.uid);
	liveUserRef.remove();
	ref.unauth();
	window.location.href = "index.html";
}

function setUserDataInUI(userAuth)
{
	authData = ref.getAuth();
	var liveUserRef;
	if(authData == null)
	{
		liveUserRef = new Firebase(FIRE_BASE_URL+LIVE_USERS_TABLE+userAuth.uid);
	} else {
		liveUserRef = new Firebase(FIRE_BASE_URL+LIVE_USERS_TABLE+authData.uid);
	}

	liveUserRef.once("value", function(snapshot){
		var firstname = snapshot.val().firstname;
		var lastname = snapshot.val().lastname;

		window.full_name = firstname.toString() + " "+ lastname.toString();
		$(".username").html("&nbsp;&nbsp;" + window.full_name);
	});
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
	        		
	        	var ref = new Firebase(FIRE_BASE_URL);
				ref.authAnonymously(function(error, authData) {
				  if (error) {
				    console.log("Login Failed!", error);
				  } else {
				    console.log("Authenticated successfully with payload:", authData);
				    getUserData(response.headers_in["X-User-Email"], authData);
				  }
				});

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
				    getUserData(response.headers_in["X-User-Email"], authData);
				  }
				});
	        },
	        error: function(error) {
	          window.location.href = "index.html";
	        }
	      });
	}else{
		setUserDataInUI(null);
	}
}



 function climatelogin(){
    var redirectUrl = encodeURIComponent(window.location.href);
    window.location.href = "https://climate.com/static/app-login/index.html?scope=openid+user&page=oidcauthn&mobile=true&response_type=code&redirect_uri=" + redirectUrl + "&client_id=dptrf0gopr40u9"
 }


$("#logout_anchor").click(function(){
    logout();
});

