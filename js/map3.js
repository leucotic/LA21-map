
// -------- Make the map -------

var mymap = L.map('mapid').setView([39.962131, -75.201477], 15);

var basemaplayer = new L.StamenTileLayer("toner-lite", {
  // detectRetina: true
    // zoomOffset: -10
});
    mymap.addLayer(basemaplayer);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);

var blocks = L.layerGroup(), 
    businesses = L.layerGroup();

// ----------- POLYGONS -----------------

// 34th-35th North Side
var polygon = L.polygon([
    [39.957319, -75.191202],
    [39.958727, -75.190942],
    [39.958658, -75.193709]
], {
  color: 'red'
}).addTo(blocks).bindPopup('34th-35th North Side');

// 34th South Side
var polygon = L.polygon([
    [39.956604, -75.191335],
    [39.957253, -75.191193],
    [39.958547, -75.19365],
    [39.95782, -75.193798]
], {
  color: 'blue'
}).addTo(blocks).bindPopup('34th South Side');

// 36th North Side
var polygon = L.polygon([
    [39.958698, -75.19359],
    [39.959875, -75.193801],
    [39.95972, -75.195199],
    [39.959368, -75.195143],
    [39.958676, -75.193789]
], {
  color: 'green'
}).addTo(blocks).bindPopup('36th North Side');

// 36th-37 South Side
var polygon = L.polygon([
    [39.957826, -75.193811],
    [39.958561, -75.193663],
    [39.96015, -75.196788],
    [39.959539, -75.19702]
], {
  color: 'red'
}).addTo(blocks).bindPopup('36-37th South Side');

// 37-38th North Side
var polygon = L.polygon([
    [39.959419, -75.19519],
    [39.960938, -75.195493],
    [39.962009, -75.199393],
    [39.961581, -75.199324]
], {
  color: 'blue'
}).addTo(blocks).bindPopup('37-38th North Side');

// 38th-Baring South Side
var polygon = L.polygon([
    [39.959956, -75.197073],
    [39.960253, -75.196963],
    [39.961283, -75.198898],
    [39.960674, -75.198823]
], {
  color: 'green'
}).addTo(blocks).bindPopup('38th-Baring South Side');

// Saunders Ave South Side
var polygon = L.polygon([
    [39.960662, -75.198879],
    [39.961304, -75.198954],
    [39.961908, -75.200102],
    [39.961081, -75.200041]
], {
  color: 'red'
}).addTo(blocks).bindPopup('Saunders Ave South Side');

// 39th North Side
var polygon = L.polygon([
    [39.961607, -75.199389],
    [39.96204, -75.199465],
    [39.963532, -75.20233],
    [39.963172, -75.20232]
], {
  color: 'green'
}).addTo(blocks).bindPopup('39th North Side');

// 39th-Sloan South Side
var polygon = L.polygon([
    [39.961113, -75.200102],
    [39.961933, -75.20017],
    [39.963107, -75.202345],
    [39.962254, -75.20228]
], {
  color: 'blue'
}).addTo(blocks).bindPopup('39th-Sloan South Side');

// 40th North Side
var polygon = L.polygon([
    [39.963196, -75.202355],
    [39.963628, -75.202369],
    [39.965939, -75.20554],
    [39.965139, -75.205452]
], {
  color: 'red'
}).addTo(blocks).bindPopup('40th North Side');

// 40th South Side
var polygon = L.polygon([
    [39.962876, -75.202362],
    [39.963133, -75.202369],
    [39.964059, -75.203874],
    [39.963585, -75.20405]
], {
  color: 'green'
}).addTo(blocks).bindPopup('40th South Side');

// N Preston South Side
var polygon = L.polygon([
    [39.963643, -75.204388],
    [39.964081, -75.203925],
    [39.965041, -75.205458],
    [39.964529, -75.205844]
], {
  color: 'blue'
}).addTo(blocks).bindPopup('N Preston South Side');


// 41st South Side
var polygon = L.polygon([
    [39.964588, -75.205864],
    [39.965049, -75.205499],
    [39.965913, -75.206877],
    [39.965506, -75.207365]
], {
  color: 'red'
}).addTo(blocks).bindPopup('41st South Side');
// 41st North Side
var polygon = L.polygon([
    [39.965176, -75.205497],
    [39.96602, -75.205577],
    [39.966987, -75.207604],
    [39.966427, -75.207534]
], {
  color: 'blue'
}).addTo(blocks).bindPopup('41st North Side');

// 42nd North Side
var polygon = L.polygon([
    [39.966454, -75.207599],
    [39.966988, -75.207691],
    [39.968303, -75.209828],
    [39.967796, -75.209742]
], {
  color: 'red'
}).addTo(blocks).bindPopup('42nd North Side');

// Aspen-42nd South Side
var polygon = L.polygon([
    [39.965511, -75.207409],
    [39.965952, -75.206892],
    [39.966842, -75.208325],
    [39.965856, -75.208209]
], {
  color: 'green'
}).addTo(blocks).bindPopup('Aspen-42nd South Side');

// Brooklyn-Brown South Side
var polygon = L.polygon([
    [39.965865, -75.208254],
    [39.96685, -75.208374],
    [39.967698, -75.20973],
    [39.966895, -75.209601]
], {
  color: 'blue'
}).addTo(blocks).bindPopup('Brooklyn-Brown South Side');


// ------- Set up custom map icons -----


// var communityIcon = L.icon({
//     iconUrl: '/../assets/community1.png',
//     shadowUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png',

//     iconSize:     [38, 40], // size of the icon
//     shadowSize:   [50, 64], // size of the shadow
//     iconAnchor:   [10, 36], // point of the icon which will correspond to marker's location
//     shadowAnchor: [4, 62],  // the same for the shadow
//     popupAnchor:  [9, -40] // point from which the popup should open relative to the iconAnchor
// });

// var universityIcon = L.icon({
//     iconUrl: '/../assets/university1.png',
//     shadowUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png',

//     iconSize:     [38, 40], // size of the icon
//     shadowSize:   [50, 64], // size of the shadow
//     iconAnchor:   [10, 36], // point of the icon which will correspond to marker's location
//     shadowAnchor: [4, 62],  // the same for the shadow
//     popupAnchor:  [9, -40] // point from which the popup should open relative to the iconAnchor
// });

// var schoolIcon = L.icon({
//     iconUrl: '/../assets/school1.png',
//     shadowUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png',

//     iconSize:     [38, 40], // size of the icon
//     shadowSize:   [50, 64], // size of the shadow
//     iconAnchor:   [10, 36], // point of the icon which will correspond to marker's location
//     shadowAnchor: [4, 62],  // the same for the shadow
//     popupAnchor:  [9, -40] // point from which the popup should open relative to the iconAnchor
// });


// --------- Setting up Data ----------

var pmslist; // holds the JSON data

function shuffleArray(myarray) {
    for (var i = myarray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = myarray[i];
        myarray[i] = myarray[j];
        myarray[j] = temp;
    }
    // console.log(myarray);
    return myarray;
}

function getTheData(a) {
  pmslist = a;
  // .sort(function(x, y){return x[Name] - y[Name]});
  console.log(pmslist);
  // pmslist.sort(function(x, y){return x.Name - y.Name});

// pmslist = shuffleArray(a);
// ------------ Building Webpage from Data ----------

  var i; // iterator
  // var mtype; // marker type
  var myTable = document.getElementById("tablediv");
  var markers = {}; // holds marker IDs

  for (i = 0; i < pmslist.length; i++) { 


// ------ Creating Unique Marker ID ----------
   // console.log('name', pmslist[i].Name, pmslist[i].Latitude );
 
  var markerid = pmslist[i].Name.replace(/[^a-zA-Z ]/g, "");
  markerid = markerid.replace(/ /g,"_");
  // console.log(markerid);

  pmslist[i].Markerid = markerid;

// --------- Marker layer assignment ----------

  // markers[markerid] = L.marker([pmslist[i].Latitude, pmslist[i].Longitude]);
  // mylayerGroup.addLayer(markers[markerid]);

 
// ------------ Placing Markers on the Map ----------

markers[markerid] = L.marker([pmslist[i].Latitude, pmslist[i].Longitude]).addTo(mymap);
markers[markerid]._leaflet_id = markerid;
businesses.addLayer(markers[markerid]);

// console.log(pmslist[i].Latitude, pmslist[i].Longitude);
// var marker = L.marker([pmslist[i].Latitude, pmslist[i].Longitude]).addTo(mymap);

  var link = pmslist[i].Name;
  markers[markerid].bindPopup(link);
  // marker.bindPopup(link);
// console.log(mtype.options.iconUrl);


// ------ Building the Directory Table -------

  // var row = myTable.insertRow(-1);
  var div = document.createElement('div');
  var mydiv = myTable.appendChild(div);
  // div.addClass(pmslist[i].Type);
  div.setAttribute('class', 'location');
  // div.setAttribute('class', 'location');

  var divtitle = '<a class="cellx" href="#' + pmslist[i].Markerid + '" ' + 'id="' + pmslist[i].Markerid + '_"><img src="#"><h4>' + pmslist[i].Name + '</h4></a>';
  
  var maplink = '<a href="#' + pmslist[i].Markerid + '" ' + 'id="' + pmslist[i].Markerid + '_" class="cellx">' + pmslist[i].Name + '</a>';
  // var maplink2 = '<a class="cellx" href="#' + pmslist[i].Markerid + '" ' + 'id="' + pmslist[i].Markerid + '_"><img src="#"></a>';
  // var link = '<a href="' + pmslist[i].Website + '">' + '<img src="/../assets/url.png" alt="website">Website</a>';
  // var gmapslink = '<a href=https://www.google.com/maps/place/' + pmslist[i].Address.replace(/ /g, '+') + "/'><img src='/../assets/gmaps.png' alt='address'>Directions</a>";

  mydiv.innerHTML = divtitle;

  var subdiv = document.createElement('div');
  var subdiv = mydiv.appendChild(subdiv);
  var description = "<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>";

  subdiv.setAttribute('class', 'subdiv');
  subdiv.innerHTML = description + link;


  // var placeName = '<h4>' + pmslist[i].Name + '</h4>';

  // var cell1 = row.insertCell(0);

    // cell1.innerHTML = placeName + maplink2 + gmapslink + link;

  // var cell2 = row.insertCell(1);
  
  // cell2.innerHTML = '<a href="' + addresslink + '">Address</a>';

  // var cell3 = row.insertCell(2);
  
  // cell3.innerHTML = link;

  } // closes forloop



// --------- Building map layers 


businesses.addTo(mymap);

var baseMaps = {
    "Map": basemaplayer
};

var overlayMaps = {
    "Businesses": businesses,
    "Blocks": blocks
};

L.control.layers(baseMaps, overlayMaps).addTo(mymap);
// L.control.options.setPosition('bottomright');


  // --------- Making location name open up popup on map ----------

  var x = document.getElementsByClassName("cellx"); // get column 1 cells
  for (i = 0; i < x.length; i++) {
    var mID = x[i].id.slice(0, -1); // remove the extra underscore
    clicky(mID, i);
  };

  function clicky(mID, i) { // locate corresponding marker and activate popup
      x[i].onclick = function(){
        // console.log(mymap._layers[0]);
        
        mymap._layers[mID].fire('click');
        mymap.setView([pmslist[i].Latitude, pmslist[i].Longitude]);
        console.log("clicked", mID);
        // window.scrollTo(0, 0);
        // x[i].parentElement.setAttribute('class', 'show');
        x[i].parentElement.classList.toggle("show"); // toggling the details info display
      };
  }

} // closes getTheData function

// ----------- Making Categories Toggle-able ------------

var items = [];

  function toggletypes(type,checked) { // locate corresponding marker and activate popup
      // spacetypes[i].onclick = function(){
        // console.log(type + " " + checked);
      var items = document.getElementsByClassName(type);

      // console.log(items);

      if (checked) {
        Array.from(items).forEach((x) => {
          x.style.display = "block";
        });

      } else {
        Array.from(items).forEach((x) => {
          x.style.display = "none";
        });
      }       
}

setTimeout(function(){
 var spacetypes = document.querySelectorAll("input[type=checkbox]");

 for (i = 0; i < spacetypes.length; i++) {

      if (i == 0) {
        spacetypes[i].setAttribute('id', 'universitycheck');
      } else if (i == 1) {
        spacetypes[i].setAttribute('id', 'communitycheck');
      } else if (i == 2) {
        spacetypes[i].setAttribute('id', 'schoolcheck');
      } else {
        console.log('error2');
      }

  };

spacetypes.forEach((box) => { box.onclick = function(){
      // console.log(this.id);
      switch (this.id) {
        case 'universitycheck':
          toggletypes('university', this.checked);
          // console.log("university");
          break;
      case 'schoolcheck':
          toggletypes('school', this.checked);
          // console.log("school");
          break;
      case 'communitycheck':
          toggletypes('community', this.checked);
          // console.log("community");
          break;
      default:
          // toggletypes('community');
          console.log("error");
      }
    };
    }
 );


}, 1000);



// --------- Papa Please (Parsing CSV into JSON) ----------


var rawdata = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR49DV5ARgVEPPHSjX-TQJTRd3X0YEkrntjoPVe8sbUxzlw09w_wKUTxdWvQhfoNQaXAV_u3b14HtD0/pub?gid=306218758&single=true&output=tsv";

function papaPlease(callback) {

Papa.parse(rawdata, {
  download: true,
  delimiter: "", 
  newline: "",  
  quoteChar: '"',
  escapeChar: '"',
  header: true,
  complete: function(results, file){
    return callback(results.data);
    }
  });
}

papaPlease(getTheData); // runs everything

