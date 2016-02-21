$(function(){

	function showEquipments(query){
		if(query){
			query = query.trim();
		}

		searchEquipment(query, function(data){
			var renderedHTML = renderEquipments(data);
			$("#equipments").html(renderedHTML);

			$(".btn-success").click(function(){
				if($(this).html() != "Rent it!"){
					return;
				}
				var equipmentId = $(this).data("id");
				$(this).removeClass('btn-success');
				$(this).addClass('btn-danger');

				$(this).html("Renting");
				var that = this;

				authData = ref.getAuth();
			    liveUserRef = new Firebase(FIRE_BASE_URL+LIVE_USERS_TABLE+authData.uid);

			    liveUserRef.once("value", function(snapshot){
			        userID = snapshot.val().id;

			        borrow_equipment(userID, equipmentId, function(){
					$(that).html("Done");
			    });
				});
			})
		});
	}

	$("#search").change(function(){
		showEquipments($(this).val());
	});

	showEquipments();

	$("#list_mode").click(function(){
		$(".list_content").show();
		$(".map_content").hide();
	})

	$("#map_mode").click(function(){
		$(".map_content").show();
		$(".list_content").hide();
	})

	loadMap();
});

function loadMap(){
	var icons = {
	    marker: L.icon({
	      iconUrl: '/img/marker-icon.png',
	      iconRetinaUrl: '/img/marker-icon.png',
	      iconAnchor: [13.5, 17.5],
	      popupAnchor: [0, -11],
	    }),
	    red: L.icon({
	      iconUrl: '/img/red.png',
	      iconRetinaUrl: '/img/red.png',
	      iconSize: [15, 15],
	      iconAnchor: [5, 5],
	      popupAnchor: [0, -11],
	    }),
	    green: L.icon({
	      iconUrl: '/img/green.png',
	      iconRetinaUrl: '/img/green.png',
	      iconSize: [15, 15],
	      iconAnchor: [5, 5],
	      popupAnchor: [0, -11],
	    })
	}

	navigator.geolocation.getCurrentPosition(function(position){
		var map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 15);
		L.esri.basemapLayer('Streets').addTo(map);
		L.marker([position.coords.latitude, position.coords.longitude], {
	        icon: icons.marker
	    }).addTo(map);
		searchEquipment(null, function(equipments){
			for(var i=0; i<equipments.length; i++){
				if(equipments[i].status == 0){
					L.marker([equipments[i].lat, equipments[i].lon], {
				        icon: icons.red
				    }).addTo(map);
				}
				else{
					L.marker([equipments[i].lat, equipments[i].lon], {
				        icon: icons.green
				    }).addTo(map);
				}
			}
		});
	});
}


function renderEquipments(equipments){
	var renderedHTML = "<div class='list-group'>";
	for(var i=0; i<equipments.length; i++){
		if(equipments[i].status == 1){
			var addressString = null;
			if(equipments[i].lat != null && equipments[i].lon != null){
				 $.ajax({
	        		type: "GET",
	        		url: "http://maps.googleapis.com/maps/api/geocode/json?latlng="+equipments[i].lat+","+equipments[i].lon,
	        		async: false,
	        		success : function(data) {
	        			addressString = data.results[0].formatted_address;
	            		//console.log(data.results[0].formatted_address);

	        		}
    			});
			}
			var status = "<span class='label label-success' style='margin-left:10px;'>Available</span>";
			var btn = "<button class='btn btn-success pull-right' data-id='" + equipments[i].id +"''>Rent it!</button>";
			var newHTML = "<a class='list-group-item book'><h4 class='title'>"+equipments[i].name+status+"</h4>";
			if(addressString){
				newHTML = newHTML+"<p class='desc'><b>Address</b>&nbsp;&nbsp;"+addressString+"</p>";
			}	
			newHTML = newHTML+"<p class='desc'><b>Description</b>&nbsp;&nbsp;"+equipments[i].description+btn+"</p><div class='category'><b>Categories</b>&nbsp;&nbsp;"+equipments[i].catagory+"</div></a>";
			renderedHTML += newHTML;
		}
	}
	for(var i=0; i<equipments.length; i++){
		if(equipments[i].status == 0){
			var status = "<span class='label label-danger' style='margin-left:10px;'>Taken</span>";
			var newHTML = "<a class='list-group-item book'><h4 class='title'>"+equipments[i].name+status+"</h4><p class='desc'><b>Description</b>&nbsp;&nbsp;"+equipments[i].description+"</p><div class='category'><b>Categories</b>&nbsp;&nbsp;"+equipments[i].catagory+"</div></a>";
			renderedHTML += newHTML;
		}
	}
	renderedHTML += "</div>";
	return renderedHTML;
}
