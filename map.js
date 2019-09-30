
// -------- Make the map --------

var mymap = L.map('mapid').setView([39.962131, -75.201477], 15);

var basemaplayer = new L.StamenTileLayer("toner", {
  // detectRetina: true
    // zoomOffset: -10
});
    mymap.addLayer(basemaplayer);
// var labels = new L.StamenTileLayer("terrain-labels", {
//   // detectRetina: true
//     // zoomOffset: -10
// });
//     mymap.addLayer(labels);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

// mymap.on('click', onMapClick);

// Layer Groups
var blocks = L.layerGroup(), 
    GroceryG = L.layerGroup(),
    RestaurantG = L.layerGroup(),
    FinanceG = L.layerGroup(),
    ApparelG = L.layerGroup(),
    HomeG = L.layerGroup(),
    ArtsG = L.layerGroup(),
    LaundryG = L.layerGroup(),
    ElectronicsG = L.layerGroup(),
    CommunityG = L.layerGroup(),
    BeautyG = L.layerGroup(),
    HealthG = L.layerGroup(),
    MiscG = L.layerGroup();

// ---------------- Icons ---------------

var LeafIcon = L.Icon.extend({
  options: {
    shadowUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png',
    iconSize:     [25, 41],
    shadowSize:   [50, 64],
    iconAnchor:   [0, 40],
    shadowAnchor: [4, 62],
    popupAnchor:  [12, -43]
  }
});

var Restaurant = new LeafIcon({iconUrl: 'red.png'}),
  Grocery = new LeafIcon({iconUrl: 'orange.png'}),
  Finance = new LeafIcon({iconUrl: 'yellow.png'}),
  Apparel = new LeafIcon({iconUrl: 'lime.png'}),
  Home = new LeafIcon({iconUrl: 'green.png'}),
  Laundry = new LeafIcon({iconUrl: 'teal.png'}),
  greenIcon = new LeafIcon({iconUrl: 'turquoise.png'}),
  Electronics = new LeafIcon({iconUrl: 'blue.png'}),
  greenIcon = new LeafIcon({iconUrl: 'indigo.png'}),
  Arts = new LeafIcon({iconUrl: 'violet.png'}),
  Community = new LeafIcon({iconUrl: 'purple.png'}),
  Beauty = new LeafIcon({iconUrl: 'magenta.png'}),
  Misc = new LeafIcon({iconUrl: 'gray.png'}),
  Health = new LeafIcon({iconUrl: 'ruby.png'});

var restaurantLayer = L.layerGroup().addTo(mymap);
var businessLayers = {

};



// -------- Output LA21 Data -------
var csv = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR49DV5ARgVEPPHSjX-TQJTRd3X0YEkrntjoPVe8sbUxzlw09w_wKUTxdWvQhfoNQaXAV_u3b14HtD0/pub?gid=306218758&single=true&output=tsv";

getData(csv);

function main(data){
	mapTheBlocks(blockdata);
	mapTheBusinesses(data);
  // console.log(data);

  var x = document.getElementsByClassName("cellx"); // get column 1 cells
  for (i = 0; i < x.length; i++) {
    var mID = x[i].id.slice(0, -1); // remove the extra underscore
    clicky(mID, i);
  };

  function clicky(mID, i) { // locate corresponding marker and activate popup
      x[i].onclick = function(){
        mymap._layers[mID].fire('click');
        mymap.setView([data[i].Latitude, data[i].Longitude]);
        console.log("clicked", mID);
        // window.scrollTo(0, 0);
        // x[i].parentElement.setAttribute('class', 'show');
        x[i].parentElement.classList.toggle("show"); // toggling the details info display
      };
  }
  toggleTable();
}





function mapTheBlocks(data) {
	data.forEach(block => {
		var polygon = L.polygon(block.coordinates, {
  			color: 'navy'
		}).addTo(blocks).bindPopup(block.name);
	});
   var myStyle = {
   "color": "green",
   // "fillColor": "#c1dd9b",
   "fillColor": "#b7da71",
   // "fillColor": "#596a41",
   "weight": 5,
   "opacity": 1,
   "fillOpacity": 0.3
};
   L.geoJSON(philly, {
      style: myStyle
   }).addTo(mymap);

}

function openPopups() {
  var x = document.getElementsByClassName("cellx"); // get column 1 cells
  for (i = 0; i < x.length; i++) {
    var mID = x[i].id.slice(0, -1); // remove the extra underscore
    clicky(mID, i);
  };
}
var markers = {};
function mapTheBusinesses(data){
	
	
	data.forEach(business => {
		var markerid = business.Name.replace(/[^a-zA-Z ]/g, "");
      makeMarker(business, markerid);
		

    business.markerid = markerid;
	var popupName = "<b>"+ business.Name + "</b>";
		var popupAddress = "<br>" + business.Address;
    var gmapslink = '<br><a href=https://www.google.com/maps/place/' + business.Address.replace(/ /g, '+') + "/' target='_blank'>Directions</a>";
  	markers[markerid].bindPopup(popupName + popupAddress + gmapslink);
    makeRow(business);
	});
}

function makeMarker(business, markerid) {

   markers[markerid] = L.marker([business.Latitude, business.Longitude],{icon: eval(business.Type)}).addTo(mymap);
      markers[markerid]._leaflet_id = markerid;
      let currentLayer = eval(business.Type +"G")
      currentLayer.addLayer(markers[markerid]);
      // console.log(markerid);
}

var myTable = document.getElementById("tablediv");

function makeRow(business) {
  var rowName = "<b>"+ business.Name + "</b>";
  var rowAddress = "<br>" + business.Address;
  var div = document.createElement('div');
  myTable.appendChild(div);
  div.setAttribute('class', 'location');
  var divtitle = '<h4>' + business.Name + '</h4>';
  var gmapslink = '<br><a href=https://www.google.com/maps/place/' + business.Address.replace(/ /g, '+') + "/' target='_blank'>Directions</a>";
  var locateBusiness = '<a class="cellx" href="#' + business.markerid + '" ' + 'id="' + business.markerid + '_">Find on Map</a>';
  // clicky(locateBusiness, business);
  div.innerHTML = divtitle + rowAddress + gmapslink + " | " + locateBusiness;

}

function clicky(locateBusiness, business) { // locate corresponding marker and activate popup
      locateBusiness.onclick = function(){
        var mID = business.id.slice(0, -1); // remove the extra underscore
        console.log(mID);
        mymap._layers[mID].fire('click');
        mymap.setView([business.Latitude, business.Longitude]);
        console.log("clicked", mID);
        // window.scrollTo(0, 0);
        // x[i].parentElement.setAttribute('class', 'show');
        locateBusiness.classList.toggle("show"); // toggling the details info display
      };
  }

function removeLoader(){
  let loader = document.querySelector('.loading');
  // loader.remove();
}

function getData(url){
    data = Papa.parse(csv, {
    download: true,
    delimiter: "", 
    newline: "",  
    quoteChar: '"',
    escapeChar: '"',
    header: true,
    complete: function(results, file){
      return main(results.data);
      }
    });
}

// businesses.addTo(mymap);

    GroceryG.addTo(mymap);
    RestaurantG.addTo(mymap);
    FinanceG.addTo(mymap);
    ApparelG.addTo(mymap);
    HomeG.addTo(mymap);
    LaundryG.addTo(mymap);
    ElectronicsG.addTo(mymap);
    CommunityG.addTo(mymap);
    BeautyG.addTo(mymap);
    HealthG.addTo(mymap);
    MiscG.addTo(mymap);
    ArtsG.addTo(mymap);


var baseMaps = {
    "Map": basemaplayer
};

var overlayMaps = {
    "Groceries": GroceryG,
    "Restaurants": RestaurantG,
    "Financial Services": FinanceG,
    "Clothing & Accessories": ApparelG,
    "Home Goods": HomeG,
    "Laundry": LaundryG,
    "Auto, Electronics & Applicances": ElectronicsG,
    "Community & Children": CommunityG,
    "Beauty": BeautyG,
    "Healthcare": HealthG,
    "Arts & Entertainment": ArtsG,
    "Miscellaneous": MiscG,
    "Show Block Groups": blocks
};

L.control.layers(baseMaps, overlayMaps).addTo(mymap);




// ----------- Making Categories Toggle-able ------------

// var items = [];

function toggletypes(type,checked) { // locate corresponding marker and activate popup
      var items = document.getElementsByClassName(type);
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

function toggleTable(){

 var businessTypes = document.querySelectorAll("input[type=checkbox]");
// console.log(spacetypes[0].nextElementSibling.innerHTML);
businessTypes.forEach(type => {
   console.log(type.nextElementSibling.innerHTML);
});
 // for (i = 0; i < spacetypes.length; i++) {

 //      if (i == 0) {
 //        spacetypes[i].setAttribute('id', 'universitycheck');
 //      } else if (i == 1) {
 //        spacetypes[i].setAttribute('id', 'communitycheck');
 //      } else if (i == 2) {
 //        spacetypes[i].setAttribute('id', 'schoolcheck');
 //      } else {
 //        console.log('error2');
 //      }
 //  };

spacetypes.forEach((box) => { box.onclick = function(){
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
}
