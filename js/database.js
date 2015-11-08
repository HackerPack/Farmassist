function searchBook(callback){
  var bookRef = new Firebase(FIRE_BASE_URL+BOOKS_TABLE);
  searchResult = [];
  bookRef.orderByChild("status").equals(0).on("value", function(snapshot) {

   var found=0;
   snapshot.forEach(function(childSnapshot) {
    var temp = JSON.stringify(childSnapshot.val());
    var n = temp.search("Wu");
    if(n>-1){
      console.log(childSnapshot.val());
      searchResult.push(childSnapshot.val());
      console.log(searchResult);
    }
    else{
     found =-1;
    }
    
  });

   if(found==-1){
      console.log("Book not found");
   }
   callback(searchResult);
});

function saveBook(book){
  var bookRef = new Firebase(FIRE_BASE_URL+BOOKS_TABLE);
  var book_data = {};
  book_data[book.isbn] = book;
  //console.log(book_data);
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