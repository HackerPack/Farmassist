function searchEquipment(term, callback){
  var equipmentRef = new Firebase(FIRE_BASE_URL+EQUIPMENTS_TABLE);
  equipmentRef.orderByChild("status").on("value", function(snapshot) {

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

function saveEquipment(equipment, callback){
  var equipmentIDRef = new Firebase(FIRE_BASE_URL+EQUIPMENTS_ID_TABLE+"maxID");
  var equipmentMaxID;

  equipmentIDRef.once("value", function(snapshot){
    if(isNaN(parseInt(snapshot.val())))
    {
        equipmentMaxID = 1;
    } else {

        equipmentMaxID = parseInt(snapshot.val());
    }

    var equipmentRef = new Firebase(FIRE_BASE_URL+EQUIPMENTS_TABLE);
    var equipment_data = {};

    equipment_data[equipmentMaxID] = equipment;
    equipment["id"] = equipmentMaxID;
    equipmentMaxID = equipmentMaxID + 1;
    equipmentIDRef.set(equipmentMaxID);
    equipmentRef.update(equipment_data, callback);
  });
}

function updateEquipment(equipment, callback){
  var equipmentRef = new Firebase(FIRE_BASE_URL+EQUIPMENTS_TABLE+equipment.id);
  equipmentRef.update(equipment, callback);
}

function getMyEquipments(uid, callback){
  var return_data = [];
  var equipmentRef = new Firebase(FIRE_BASE_URL+EQUIPMENTS_TABLE);
  equipmentRef.orderByChild("uid").equalTo(uid).on("value", function(snapshot) {
    snapshot.forEach(function(data){
      return_data.push(data.val());
    });
    callback(return_data);
  });
}

function getMyFarms(uid, suggestions, callback){
  var return_data = [];
  var farmRef = new Firebase(FIRE_BASE_URL+FARM_TABLE+uid+"/");
  console.log(uid);
  farmRef.orderByChild("uid").equalTo(uid).on("value", function(snapshot) {
    snapshot.forEach(function(data){
      return_data.push(data.val());
    });
    callback(return_data, suggestions);
  });
}

function getCropSuggesion(userID, callback){
  var return_data = {};
  var sugRef = new Firebase(FIRE_BASE_URL+SUGG_TABLE);
  sugRef.on("value", function(snapshot) {
    snapshot.forEach(function(data){
      return_data[data.key().split(' ').join('_').toLowerCase()] = data.val();
    });
    callback(userID, return_data, printFarms);
  });
}


function getBorrowedEquipments(uid, callback){
  var return_data = [];
  var equipmentRef = new Firebase(FIRE_BASE_URL+EQUIPMENTS_TABLE);
  equipmentRef.orderByChild("borrow_uid").equalTo(uid).on("value", function(snapshot) {
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

function borrow_equipment(uid, equipmentId, callback){
  var equipmentRef = new Firebase(FIRE_BASE_URL+EQUIPMENTS_TABLE);
  var singleEquipmentRef = new Firebase(FIRE_BASE_URL+EQUIPMENTS_TABLE+equipmentId);
  var userRef = new Firebase(FIRE_BASE_URL+USERS_TABLE);
  var borrowedRef = new Firebase(FIRE_BASE_URL+USERS_TABLE+"/"+uid+'/nu_borrowed');
  var equipmentOwner = null;

  equipmentRef.child(equipmentId).update({
    "status":0,
    "borrow_uid": uid
  });

  singleEquipmentRef.once("value", function(snapshot){
    equipmentOwner = snapshot.val().uid;
    var ownerRef = new Firebase(FIRE_BASE_URL+USERS_TABLE+"/"+equipmentOwner+'/nu_lent');
    ownerRef.transaction(function(current_value){
      return (parseInt(current_value) || 0) +1;
    });
    ownerRef = new Firebase(FIRE_BASE_URL+USERS_TABLE+"/"+equipmentOwner+'/price_lent');
    ownerRef.transaction(function(current_value){
      return (parseInt(current_value) || 0) + parseInt(snapshot.val().price);
    });

    borrowedRef = new Firebase(FIRE_BASE_URL+USERS_TABLE+"/"+uid+'/price_borrowed');
    borrowedRef.transaction(function(current_value){
      return (parseInt(current_value) || 0) + parseInt(snapshot.val().price);
    });

    borrowedRef = new Firebase(FIRE_BASE_URL+USERS_TABLE+"/"+uid+'/nu_borrowed');
    borrowedRef.transaction(function(current_value){
      return (parseInt(current_value) || 0) +1;
    });

  });

}
/*
function donateToLibrary(amount){
  var data = {"medium": "balance", "payee_id": LIBRARY_ACCOUNT_ID, "amount" : amount };
  console.log(JSON.stringify(data));
  console.log(JSON.stringify(ACCOUNT_URL+DEBIT_ACCOUNT_ID+TRANSFER_URL+CAPITAL_ONE_QUERY_PARAM));
    alert(JSON.stringify(ACCOUNT_URL+DEBIT_ACCOUNT_ID+TRANSFER_URL+CAPITAL_ONE_QUERY_PARAM));
    $.ajax({
      url: ACCOUNT_URL+DEBIT_ACCOUNT_ID+TRANSFER_URL+CAPITAL_ONE_QUERY_PARAM,
      type: "POST",
      data: data,
    //http://api.reimaginebanking.com/accounts/56241a14de4bf40b17112a77/transfers?key=2ec3d395b0e81344514ca1ecbae6edcb
      success: function(results){
         alert(results);
      }
    });
}*/
