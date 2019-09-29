
// -------- Make the map -------

var mymap = L.map('mapid').setView([39.962131, -75.201477], 15);

var basemaplayer = new L.StamenTileLayer("watercolor", {
  // detectRetina: true
    // zoomOffset: -10
});
    mymap.addLayer(basemaplayer);
var labels = new L.StamenTileLayer("terrain-labels", {
  // detectRetina: true
    // zoomOffset: -10
});
    mymap.addLayer(labels);

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
	// console.log(data);
	mapTheBlocks(blockdata);
	mapTheBusinesses(data);
	// console.log(blockdata);
  // removeLoader();
}

function mapTheBlocks(data) {
	data.forEach(block => {
		var polygon = L.polygon(block.coordinates, {
  			color: 'olive'
		}).addTo(blocks).bindPopup(block.name);
	});

}

function mapTheBusinesses(data){
	var markers = {};
	var myTable = document.getElementById("tablediv");

	data.forEach(business => {
		var markerid = business.Name.replace(/[^a-zA-Z ]/g, "");
		markers[markerid] = L.marker([business.Latitude, business.Longitude]).addTo(mymap);
		markers[markerid]._leaflet_id = markerid;
		businesses.addLayer(markers[markerid]);

		var popupName = "<b>"+ business.Name + "</b>";
		var popupAddress = "<br>" + business.Address;
  		markers[markerid].bindPopup(popupName + popupAddress);
	});
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
blocks.addTo(mymap);

var baseMaps = {
    "Map": basemaplayer
};

var overlayMaps = {
    "Businesses": businesses,
    "Blocks": blocks
};

console.log(blocks);
L.control.layers(baseMaps, overlayMaps).addTo(mymap);
