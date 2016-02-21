$(function(){


	authData = ref.getAuth();
	liveUserRef = new Firebase(FIRE_BASE_URL+LIVE_USERS_TABLE+authData.uid);
	liveUserRef.once("value", function(snapshot){
		window.userid = snapshot.val().id;
	});


	var myDataRef = new Firebase(FIRE_BASE_URL + CHAT_TABLE);
	$('#message').keypress(function (e) {
		if (e.keyCode == 13) {
			var text = $(this).val();
			saveMessage(text);
		}
	});

	$("#message_btn").click(function(){
		var text = $('#message').val();
		saveMessage(text);
	});

	myDataRef.on('child_added', function(snapshot) {
		var message = snapshot.val();
		displayChatMessage(message.name, message.text);
	});
	
	function displayChatMessage(name, text) {
		$("#messagesDiv").append(renderChat(name, text));
		$("#messagesDiv").animate({ 
		   scrollTop: 5000}, 
		   100
		);
	};


	function saveMessage(text){
		if(text){
			text = text.trim();
		}

		if(text.length != 0){
			var messageData = {};
			var name = window.full_name;
			var timestamp=new Date().getTime();
			messageData["name"] = name;
			messageData["text"] = text;
			myDataRef.push(messageData);
		}
		$('#message').val('');
	}


	function renderChat(name, text){
		var renderedHTML = "<div class='list-group-item' style='background: #eee;'><h4 class='list-group-item-heading'>" + name + "</h4><p class='list-group-item-text'>" + text + "</p></div>";
		return renderedHTML;
	}




});