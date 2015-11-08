function searchBook(term, callback){
  var bookRef = new Firebase(FIRE_BASE_URL+BOOKS_TABLE);
  bookRef.orderByChild("status").on("value", function(snapshot) {

     var searchResult = [];
     snapshot.forEach(function(childSnapshot) {
        var temp = JSON.stringify(childSnapshot.val());
        if(term){
          var n = temp.search(term);
          if(n>-1){
            searchResult.push(childSnapshot.val());
          }
        }
        else{
         searchResult.push(childSnapshot.val());
        }
      });

      callback(searchResult);
  });
}

function saveBook(book){
  var bookRef = new Firebase(FIRE_BASE_URL+BOOKS_TABLE);
  var book_data = {};
  book_data[book.isbn] = book;
  bookRef.update(book_data);
}

function getMyBooks(uid, callback){
  var return_data = [];
  var bookRef = new Firebase(FIRE_BASE_URL+BOOKS_TABLE);
  bookRef.orderByChild("uid").equalTo(uid).on("value", function(snapshot) {
    snapshot.forEach(function(data){
      return_data.push(data.val());
    });
    callback(return_data);
  });
}

function getBorrowedBooks(uid, callback){
  var return_data = [];
  var bookRef = new Firebase(FIRE_BASE_URL+BOOKS_TABLE);
  bookRef.orderByChild("borrow_uid").equalTo(uid).on("value", function(snapshot) {
    snapshot.forEach(function(data){
      return_data.push(data.val());
    });
    callback(return_data);
  });
}




function getUser(uid, callback){
var user_data = [];
var userRef = new Firebase(FIRE_BASE_URL+USERS_TABLE+uid);

userRef.once('value', function(data) {
	//console.log(data.val());
  user_data.push(data.val());
	callback(user_data);
	});
}
getUser('facebook:1037502162960482', function(data){
    data.forEach(function(innerData){
        //console.log(innerData.fname);
    });
});

function borrow_book(uid, isbn, callback){
  var bookRef = new Firebase(FIRE_BASE_URL+BOOKS_TABLE);
  var singleBookRef = new Firebase(FIRE_BASE_URL+BOOKS_TABLE+"/"+isbn);
  var userRef = new Firebase(FIRE_BASE_URL+USERS_TABLE);
  var borrowedRef = new Firebase(FIRE_BASE_URL+USERS_TABLE+"/"+uid+'/nu_borrowed');
  var bookOwner = null;

  bookRef.child(isbn).update({
    "status":0,
    "borrow_uid": uid
  });

  borrowedRef.transaction(function(current_value){
    return (parseInt(current_value) || 0) +1;
  });

  singleBookRef.once("value", function(snapshot){
    bookOwner = snapshot.val().uid;
    console.log(bookOwner);
    var ownerRef = new Firebase(FIRE_BASE_URL+USERS_TABLE+"/"+bookOwner+'/nu_lent');
    ownerRef.transaction(function(current_value){
      return (parseInt(current_value) || 0) +1;
    });
    ownerRef = new Firebase(FIRE_BASE_URL+USERS_TABLE+"/"+bookOwner+'/price_lent');
    ownerRef.transaction(function(current_value){
      return (parseInt(current_value) || 0) + parseInt(snapshot.val().price);
    });

  borrowedRef = new Firebase(FIRE_BASE_URL+USERS_TABLE+"/"+uid+'/price_borrowed');
    borrowedRef.transaction(function(current_value){
      return (parseInt(current_value) || 0) + parseInt(snapshot.val().price);
    });

  });

}
