
// -------- Make the map --------

var mymap = L.map('mapid').setView([39.962131, -75.201477], 15);

var basemaplayer = new L.StamenTileLayer("terrain", {
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

mymap.on('click', onMapClick);

var blocks = L.layerGroup(), 
    businesses = L.layerGroup();


// -------- Output LA21 Data -------
var csv = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR49DV5ARgVEPPHSjX-TQJTRd3X0YEkrntjoPVe8sbUxzlw09w_wKUTxdWvQhfoNQaXAV_u3b14HtD0/pub?gid=306218758&single=true&output=tsv";

getData(csv);

function main(data){
	mapTheBlocks(blockdata);
	mapTheBusinesses(data);

  var x = document.getElementsByClassName("cellx"); // get column 1 cells
  for (i = 0; i < x.length; i++) {
    var mID = x[i].id.slice(0, -1); // remove the extra underscore
    clicky(mID, i);
  };

  function clicky(mID, i) { // locate corresponding marker and activate popup
      x[i].onclick = function(){
        mymap._layers[mID].fire('click');
        // mymap.setView([pmslist[i].Latitude, pmslist[i].Longitude]);
        console.log("clicked", mID);
        // window.scrollTo(0, 0);
        // x[i].parentElement.setAttribute('class', 'show');
        x[i].parentElement.classList.toggle("show"); // toggling the details info display
      };
  }
}





function mapTheBlocks(data) {
	data.forEach(block => {
		var polygon = L.polygon(block.coordinates, {
  			color: 'navy'
		}).addTo(blocks).bindPopup(block.name);
	});
}

function openPopups() {
  var x = document.getElementsByClassName("cellx"); // get column 1 cells
  for (i = 0; i < x.length; i++) {
    var mID = x[i].id.slice(0, -1); // remove the extra underscore
    clicky(mID, i);
  };
}

function mapTheBusinesses(data){
	var markers = {};
	
	data.forEach(business => {
		var markerid = business.Name.replace(/[^a-zA-Z ]/g, "");
		markers[markerid] = L.marker([business.Latitude, business.Longitude]).addTo(mymap);
		markers[markerid]._leaflet_id = markerid;
		businesses.addLayer(markers[markerid]);
    business.markerid = markerid;
		var popupName = "<b>"+ business.Name + "</b>";
		var popupAddress = "<br>" + business.Address;
    var gmapslink = '<br><a href=https://www.google.com/maps/place/' + business.Address.replace(/ /g, '+') + "/' target='_blank'>Directions</a>";
  	markers[markerid].bindPopup(popupName + popupAddress + gmapslink);
    makeRow(business);
	});
}

var myTable = document.getElementById("tablediv");

function makeRow(business) {
  var rowName = "<b>"+ business.Name + "</b>";
  var rowAddress = "<br>" + business.Address;
  var div = document.createElement('div');
  myTable.appendChild(div);
  div.setAttribute('class', 'location');
  var divtitle = '<h4>' + business.Name + '</h4>';
  var gmapslink = '<br><a href=https://www.google.com/maps/place/' + business.Name.replace(/ /g, '+') + business.Address.replace(/ /g, '+') + "/' target='_blank'>Directions</a>";
  var locateBusiness = '<a class="cellx" href="#' + business.markerid + '" ' + 'id="' + business.markerid + '_">Find on Map</a>';
  // clicky(locateBusiness, business);
  div.innerHTML = divtitle + rowAddress + gmapslink + " | " + locateBusiness;

}

function clicky(locateBusiness, business) { // locate corresponding marker and activate popup
      locateBusiness.onclick = function(){
        // console.log(mymap._layers[0]);
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

businesses.addTo(mymap);
// blocks.addTo(mymap);

var baseMaps = {
    "Map": basemaplayer
};

var overlayMaps = {
    "Businesses": businesses,
    "Blocks": blocks
};

L.control.layers(baseMaps, overlayMaps).addTo(mymap);
