if( document.getElementById("object_map") ) {

	var map;
	var marker;
	// var image = "img/map_marker.png";
	var styles;

	function initMap() {

		map = new google.maps.Map(document.getElementById('object_map'), {
			center: {lat: 55.882593, lng: 37.5477503},
			scrollwheel: false,
			scaleControl: false,
			zoom: 16
		});

		marker = new google.maps.Marker({
			map: map,
			draggable: false,
			animation: google.maps.Animation.DROP,
			position: {lat: 55.882593, lng: 37.5477503},
			map: map,
			// icon: image,
			title: ''
		});

		marker.addListener('click', toggleBounce);

	}

	function toggleBounce() {
	  if (marker.getAnimation() !== null) {
	    marker.setAnimation(null);
	  } else {
	    marker.setAnimation(google.maps.Animation.BOUNCE);
	  }
	}

}

if( document.getElementById("location_map") ) {

	var map2;
	var marker2;
	var image2 = "img/location_marker.svg";
	var styles2;

	function initMap() {

		map2 = new google.maps.Map(document.getElementById('location_map'), {
			center: {lat: 55.882593, lng: 37.5477503},
			scrollwheel: false,
			scaleControl: false,
			zoom: 16
		});

		marker2 = new google.maps.Marker({
			map: map,
			draggable: false,
			animation: google.maps.Animation.DROP,
			position: {lat: 55.882593, lng: 37.5477503},
			map: map2,
			icon: image2,
			title: ''
		});

		marker2.addListener('click', toggleBounce);

	}

	function toggleBounce() {
	  if (marker2.getAnimation() !== null) {
	    marker2.setAnimation(null);
	  } else {
	    marker2.setAnimation(google.maps.Animation.BOUNCE);
	  }
	}

}