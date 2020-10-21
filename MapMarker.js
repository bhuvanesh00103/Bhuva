let map;
let markers = [];

//need user_location
let user_location = {lat:12.24521886 ,lng:78.1239881 };

//need other_users data name,location,crops
let other_users = [
  {name: 'Bhuvanesh', latlag:{ lat: 12.34521883, lng: 78.3239879 }, crops:['wheat','rice']},
  {name: 'Esakki', latlag:{ lat: 12.304742, lng: 78.072861 }, crops:['rice']},
  {name: 'Balaji', latlag:{ lat: 12.1065271, lng: 78.13614089999999 }, crops:['wheat','beans']},
  {name: 'Ashwin', latlag:{ lat:  12.2065271, lng: 78.2361409 }, crops:['wheat','rice','potato']}
];


function initMap() {
    
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 25,
    center: user_location,
    mapTypeId: "terrain",
  });
  
  // Adds a marker at the center of the map and otherusers.
  
  for (let i=0;i<other_users.length;i++){

    let contentString ='<h4>'+other_users[i].name+'</h4>';
    for (j in other_users[i].crops){
      contentString = contentString +'<p>' + other_users[i].crops[j] + '</p>';
    }

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    let url = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
    addMarker(other_users[i].latlag,url);

    markers[i].addListener("click", () => {
      infowindow.open(map, markers[i]);
    });
    
  }

  let url = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
  addMarker(user_location,url);
  
}


// Adds a marker to the map and push to the array.
function addMarker(location,url) {
  const marker = new google.maps.Marker({
    position: location,
    icon: {
      url: url,
    },
    map: map,
  });
  markers.push(marker);
}


// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}