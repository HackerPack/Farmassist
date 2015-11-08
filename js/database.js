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
