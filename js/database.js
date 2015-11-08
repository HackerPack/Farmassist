function searchBook(callback){
  searchResult = [];
  bookRef.orderByChild("ISBN").on("value", function(snapshot) {

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