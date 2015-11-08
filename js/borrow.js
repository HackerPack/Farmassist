$(function(){

	function showBooks(query){
		if(query){
			console.log(query);
			query = query.trim();
		}

		var data;
		if(query){
			console.log("there")
		}
		else{
			var data = [{"name": "Check1", "author": "Venky", "category": ["a", "b"]},
						{"name": "Check2", "author": "Bharathi", "category": ["asdfsd", "bsdfsdf"]}]
		}
		var renderedHTML = renderBooks(data);
		$("#books").html(renderedHTML);
	}

	$("#search").change(function(){
		showBooks($(this).val());
	});

	showBooks();

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
	      iconSize: [27, 31],
	      iconAnchor: [13.5, 13.5],
	      popupAnchor: [0, -11],
	    }),
	    green: L.icon({
	      iconUrl: '/img/gren.png',
	      iconRetinaUrl: '/img/green.png',
	      iconSize: [31, 27],
	      iconAnchor: [13.5, 13.5],
	      popupAnchor: [0, -11],
	    })
	}

	navigator.geolocation.getCurrentPosition(function(position){
		var map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 15);
		L.esri.basemapLayer('Streets').addTo(map);
		L.marker([position.coords.latitude, position.coords.longitude], {
	        icon: icons.marker
	    }).addTo(map);


	});
}
function renderBooks(books){
	var renderedHTML = "<div class='list-group'>";
	for(var i=0; i<books.length; i++){
		var newHTML = "<a class='list-group-item book'><h4 class='title'>"+books[i].name+"</h4><p class='author'><b>Author</b>&nbsp;&nbsp;"+books[i].author+"</p><div class='category'><b>Categories</b>&nbsp;&nbsp;"+books[i].category.join()+"</div></a>";
		renderedHTML += newHTML;
	}
	renderedHTML += "</div>";
	return renderedHTML;
}