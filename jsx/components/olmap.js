import React from 'react';
import Overlay from 'ol/Overlay.js';
import Circle from 'ol/geom/Circle.js';
import Polygon from 'ol/geom/Polygon.js';
import Point from 'ol/geom/Point.js';
import Feature from 'ol/Feature.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {Circle as CircleStyle, Fill, Stroke, Style, Text} from 'ol/style.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {fromLonLat} from 'ol/proj';
import Control from 'ol/control/Control.js';
//import {akaaData, alajarviData} from '../../data/data.js';

//console.log ('import', akaaData);

let featureCollection = [];

// const fc =  { 
	// "type": "FeatureCollection",
  // 'crs': {
    // 'type': 'name',
    // 'properties': {
      // 'name': 'EPSG:3857',
    // },
  // },	
	// "features": [
		// { 	
			// "type": "Feature",
			// "geometry": { 
				// "type": 'Point',
				// "coordinates": [ 23.865888764, 61.167145977 ]
			// },
			// "properties": {
				// "name": "Akaa",
				// "color": "red",
				// "imageThumbUrl": ""
			// }
		// }
	// ],
// };

const image = new CircleStyle({
  radius: 8,
  fill: new Fill({color:[250,128,114,0.5]}),
  stroke: new Stroke({color: 'red', width: 3}),
});
// const styles = {
  // 'Point': new Style({
    // image: image,
  // })
// }
// const styleFunction = function (feature) {
  // return styles[feature.getGeometry().getType()];
// };

const outEnd = '</div>';
const outTitle = '<div class="town-title">Asunnon kunnassa ';
const outSubt1 = '<div class="town-subt">keskimääräinen hinta per m2</div>';
const outSubt2 = '<div class="town-subt">alin hinta per m2</div>';
const outSubt3 = '<div class="town-subt">korkein hinta per m2</div>';
const outSubt4 = '<div class="town-subt">keskimääräinen tonttivuokra per m2/kk</div>';
const outSubt5 = '<div class="town-subt">keskimääräinen tonttihinta per m2 </div>';
const outSubt6 = '<div class="town-subt">alin tonttivuokra per m2/kk </div>';
const outSubt7 = '<div class="town-subt">alin tonttihinta per m2 </div>';
const outSubt8 = '<div class="town-subt">korkein tonttivuokra per m2/kk </div>';
const outSubt9 = '<div class="town-subt">korkein tonttihinta per m2 </div>';
const outVal = '<div class="town-value">';
function outputTooltip (data) {
	let result = 
		outTitle+'<b>'+data[0]+'</b>'+outEnd+
		outSubt1+outVal+data[1]+outEnd+ //Keskimääräinen hinta per m2
		outSubt4+outVal+data[2]+outEnd+ //Keskimääräinen tonttivuokra
		outSubt5+outVal+data[3]+outEnd+ //Keskimääräinen tonttihinta
		outSubt6+outVal+data[4]+outEnd+ //Alin tonttivuokra
		outSubt7+outVal+data[5]+outEnd+ //Alin tonttihinta
		outSubt8+outVal+data[6]+outEnd+ //Korkein tonttivuokra
		outSubt9+outVal+data[7]+outEnd+ //Korkein tonttihinta
		outSubt2+outVal+data[8]+outEnd+ //Alin hinta per m2
		outSubt3+outVal+data[9]+outEnd ; //Korkein hinta per m2		
	return result;
}

const mapData = [

	{	town: 'Helsinki',
		coords: fromLonLat([ 24.943536799, 60.166640739 ]),
		avPrice: 		'100e',
		avLandrent: 	'100e',
		avLandPrice:	'100e',
		lowLandRent:	'100e',
		lowLandPrice:	'100e',
		highLandRent:	'100e',
		highLandPrice:	'100e',
		lowPrice:		'100e',
		highPrice:		'100e'
	},
	{	town: 'Espoo',
		coords: fromLonLat([ 24.656728549, 60.206376371 ]),
		avPrice: 		'100e',
		avLandrent: 	'100e',
		avLandPrice:	'100e',
		lowLandRent:	'100e',
		lowLandPrice:	'100e',
		highLandRent:	'100e',
		highLandPrice:	'100e',
		lowPrice:		'100e',
		highPrice:		'100e'
	},	
];

for ( let i=0; i < mapData.length; i++ ) {
	const dataOutput = [
		mapData [i].town,
		mapData [i].avPrice,
		mapData [i].avLandrent,
		mapData [i].avLandPrice,
		mapData [i].lowLandRent,
		mapData [i].lowLandPrice,
		mapData [i].highLandRent,
		mapData [i].highLandPrice,
		mapData [i].lowPrice,
		mapData [i].highPrice		
	];
	const feature = new Feature ({
		geometry: new Point (mapData [i].coords),
		output: outputTooltip (dataOutput)
	});
	feature.setStyle(new Style({
		image: image,
	}));
	featureCollection.push (feature);	
}

/* const helsinkiCoords = fromLonLat([ 24.943536799, 60.166640739 ]);
const helsinkiData = ['Helsinki','100e','100e','100e','100e','100e','100e','100e','100e','100e'];
const helsinkiFeature = new Feature({
	geometry: new Point(helsinkiCoords),
	output: outputTooltip (helsinkiData)
	
});
helsinkiFeature.setStyle(new Style({
	image: image,
}));
featureCollection.push (helsinkiFeature);
const espooCoords = fromLonLat([ 24.656728549, 60.206376371 ]);
const espooData = ['Espoo','100e','100e','100e','100e','100e','100e','100e','100e','100e'];
const espooFeature = new Feature({
	geometry: new Point(espooCoords),
	output: outputTooltip (espooData)
	
});
espooFeature.setStyle(new Style({
	image: image,
}));
featureCollection.push (espooFeature);
const vantaaCoords = fromLonLat([ 25.006641332, 60.298133721 ]);
const vantaaData = ['Vantaa','100e','100e','100e','100e','100e','100e','100e','100e','100e'];
const vantaaFeature = new Feature({
	geometry: new Point(vantaaCoords),
	output: outputTooltip (vantaaData)
});
vantaaFeature.setStyle(new Style({
	image: image,
}));
featureCollection.push (vantaaFeature); */

// const testVectorLayer = new VectorLayer({
	// source: new VectorSource({
		// features: new GeoJSON().readFeatures(fc)
	// }),
	// style: styleFunction
// });

const vectorLayer = new VectorLayer({
	source: new VectorSource({
		features: featureCollection
	}),
});

export default class OlMap extends React.Component {
    constructor (props) {
        super(props);
    }
	componentDidMount () {
		const title = document.getElementById('title');
		const tooltip = document.getElementById('tooltip');
		//const tiptitle = document.getElementById('tiptitle');		
		const mapTitle = new Control({element: title});		
		const overlay = new Overlay({
			element: tooltip,
			offset: [10, 0],
			positioning: 'center-left'
		});		
		const map = new Map({
			layers: [
				new TileLayer({
				  source: new OSM(),
				}),
				vectorLayer,
			],
			target: 'map',
			view: new View({
				center: fromLonLat([ 25.749498, 64.241678 ]),
				zoom: 5,
			}),
		});
		//overlay.setPosition(akaaCoords);
		map.addControl(mapTitle);
		map.addOverlay(overlay);		
/* 		map.on('click', function(evt) {
		  if (map.forEachFeatureAtPixel(evt.pixel,
			function(feature) {
			  return feature === akaaFeature;
			})
		  ) {
			alert('click');
		  }
		}); */

		const status = document.getElementById('status');

		let selected = null;		
/* 		map.on('pointermove', function (e) {
		  if (selected !== null) {
			//selected.setStyle(undefined);
			selected = null;
		  }

		  map.forEachFeatureAtPixel(e.pixel, function (f) {
			selected = f;
			//selectStyle.getFill().setColor(f.get('COLOR') || '#eeeeee');
			//f.setStyle(selectStyle);
			return true;
		  });

		  if (selected) {
			status.innerHTML = selected.get('name')+' '+selected.get('hepskukkuu');
		  } else {
			status.innerHTML = 'Eeva';
		  }
		}); */
		map.on('pointermove', function (e) {
			
			if (selected !== null) {
			//selected.setStyle(undefined);
			overlay.setPosition();
			selected = null;
			}

			map.forEachFeatureAtPixel(e.pixel, function (f) {
			selected = f;
			//selectStyle.getFill().setColor(f.get('COLOR') || '#eeeeee');
			//f.setStyle(selectStyle);
			return true;
			});

			if (selected) {
			//console.log('tooltip hover');
			overlay.setPosition(e.coordinate);
			tooltip.innerHTML = selected.get('output');
			} else {
			tooltip.innerHTML = '';
			}
		});		
	}
    render () {
        return (
			<div>
				<div id="status"></div>}
				<div id="title">TONTTIVUOKRAT 2022</div>}
				<div id="tooltip"></div>
				<main id="map" className="map"></main>					
			</div>
        );
    }
}





