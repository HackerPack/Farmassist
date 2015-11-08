function getBooks(){
	var booksRef = new Firebase(fire_base_url+user_id);
	myFirebaseRef.on("value", function(snapshot) {
		return(snapshot.val());
	});
}