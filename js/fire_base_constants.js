var FIRE_BASE_URL = "https://farmassist.firebaseio.com/";
var EQUIPMENTS_TABLE = "equipments/";
var USERS_TABLE = "users/";
var LIVE_USERS_TABLE = "live_users/"
var EQUIPMENTS_ID_TABLE = "equipmentsID/"
var ref = new Firebase(FIRE_BASE_URL);
var isNewUser = true;
var globalEquipmentRef = new Firebase(FIRE_BASE_URL+EQUIPMENTS_TABLE);
var globalUserRef = new Firebase(FIRE_BASE_URL+USERS_TABLE);
var LIBRARY_ACCOUNT_ID = "56241a14de4bf40b17112a75";
var DEBIT_ACCOUNT_ID = "56241a14de4bf40b17112a77";
var ACCOUNT_URL = "http://api.reimaginebanking.com/accounts/"; 
var TRANSFER_URL = "/transfers/"; 
var CAPITAL_ONE_QUERY_PARAM = "?key=2ec3d395b0e81344514ca1ecbae6edcb";

/*
globalUserRef.on("child_added", function(snapshot) {
	//console.log(snapshot.val());
});

globalUserRef.on("child_changed", function(snapshot) {
	//console.log(snapshot.val());
});

globalUserRef.on("child_removed", function(snapshot) {
	//console.log(snapshot.val());
});

globalBookRef.on("child_added", function(snapshot) {
	//console.log(snapshot.val());
});

globalBookRef.on("child_changed", function(snapshot) {
	//console.log(snapshot.val());
});

globalBookRef.on("child_removed", function(snapshot) {
	//console.log(snapshot.val());
});
*/