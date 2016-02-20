var FIRE_BASE_URL = "https://dazzling-heat-1066.firebaseio.com/";
var BOOKS_TABLE = "books/";
var USERS_TABLE = "users/";
var ref = new Firebase(FIRE_BASE_URL);
var isNewUser = true;
var globalBookRef = new Firebase(FIRE_BASE_URL+BOOKS_TABLE);
var globalUserRef = new Firebase(FIRE_BASE_URL+USERS_TABLE);


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
