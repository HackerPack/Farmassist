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
