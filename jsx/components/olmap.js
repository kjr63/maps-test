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

const image = new CircleStyle({
  radius: 8,
  fill: new Fill({color:[250,128,114,0.5]}),
  stroke: new Stroke({color: 'red', width: 3}),
});

// const image = new Style({
  // radius: 8,
  // fill: new Fill({color:[250,128,114,0.5]}),
  // stroke: new Stroke({color: 'red', width: 3}),
// });
/*
const styles = {
  'Point': new Style({
	image: image,
  }),
  'LineString': new Style({
	stroke: new Stroke({
	  color: 'green',
	  width: 1,
	}),
  }),
  'MultiLineString': new Style({
	stroke: new Stroke({
	  color: 'green',
	  width: 1,
	}),
  }),
  'MultiPoint': new Style({
	image: image,
  }),
  'MultiPolygon': new Style({
	stroke: new Stroke({
	  color: 'yellow',
	  width: 1,
	}),
	fill: new Fill({
	  color: 'rgba(255, 255, 0, 0.1)',
	}),
  }),
  'Polygon': new Style({
	stroke: new Stroke({
	  color: 'blue',
	  lineDash: [4],
	  width: 3,
	}),
	fill: new Fill({
	  color: 'rgba(0, 0, 255, 0.1)',
	}),
  }),
  'GeometryCollection': new Style({
	stroke: new Stroke({
	  color: 'magenta',
	  width: 2,
	}),
	fill: new Fill({
	  color: 'magenta',
	}),
	image: new CircleStyle({
	  radius: 10,
	  fill: null,
	  stroke: new Stroke({
		color: 'magenta',
	  }),
	}),
  }),
  'Circle': new Style({
	stroke: new Stroke({
	  color: 'red',
	  width: 2,
	}),
	fill: new Fill({
	  color: 'rgba(255,0,0,0.2)',
	}),
  }),
};

const styleFunction = function (feature) {
  return styles[feature.getGeometry().getType()];
};

const geojsonObject = {
  'type': 'FeatureCollection',
  'crs': {
	'type': 'name',
	'properties': {
	  'name': 'EPSG:3857',
	},
  },
  'features': [
	{
	  'type': 'Feature',
	  'geometry': {
		'type': 'Point',
		'coordinates': [0, 0],
	  },
	},
	{
	  'type': 'Feature',
	  'geometry': {
		'type': 'LineString',
		'coordinates': [
		  [4e6, -2e6],
		  [8e6, 2e6],
		],
	  },
	},
	{
	  'type': 'Feature',
	  'geometry': {
		'type': 'LineString',
		'coordinates': [
		  [4e6, 2e6],
		  [8e6, -2e6],
		],
	  },
	},
	{
	  'type': 'Feature',
	  'geometry': {
		'type': 'Polygon',
		'coordinates': [
		  [
			[-5e6, -1e6],
			[-3e6, -1e6],
			[-4e6, 1e6],
			[-5e6, -1e6],
		  ],
		],
	  },
	},
	{
	  'type': 'Feature',
	  'geometry': {
		'type': 'MultiLineString',
		'coordinates': [
		  [
			[-1e6, -7.5e5],
			[-1e6, 7.5e5],
		  ],
		  [
			[1e6, -7.5e5],
			[1e6, 7.5e5],
		  ],
		  [
			[-7.5e5, -1e6],
			[7.5e5, -1e6],
		  ],
		  [
			[-7.5e5, 1e6],
			[7.5e5, 1e6],
		  ],
		],
	  },
	},
	{
	  'type': 'Feature',
	  'geometry': {
		'type': 'MultiPolygon',
		'coordinates': [
		  [
			[
			  [-5e6, 6e6],
			  [-3e6, 6e6],
			  [-3e6, 8e6],
			  [-5e6, 8e6],
			  [-5e6, 6e6],
			],
		  ],
		  [
			[
			  [-2e6, 6e6],
			  [0, 6e6],
			  [0, 8e6],
			  [-2e6, 8e6],
			  [-2e6, 6e6],
			],
		  ],
		  [
			[
			  [1e6, 6e6],
			  [3e6, 6e6],
			  [3e6, 8e6],
			  [1e6, 8e6],
			  [1e6, 6e6],
			],
		  ],
		],
	  },
	},
	{
	  'type': 'Feature',
	  'geometry': {
		'type': 'GeometryCollection',
		'geometries': [
		  {
			'type': 'LineString',
			'coordinates': [
			  [-5e6, -5e6],
			  [0, -5e6],
			],
		  },
		  {
			'type': 'Point',
			'coordinates': [4e6, -5e6],
		  },
		  {
			'type': 'Polygon',
			'coordinates': [
			  [
				[1e6, -6e6],
				[3e6, -6e6],
				[2e6, -4e6],
				[1e6, -6e6],
			  ],
			],
		  },
		],
	  },
	},
  ],
};

const geojsonTowns = {
	'type': 'FeatureCollection',
	'crs': {
		'type': 'name',
		'properties': {
		  'name': 'EPSG:3857',
		},
	},
	'features': [
		{
		  'type': 'Feature',
		  'geometry': {
			'type': 'Point',
			'coordinates': fromLonLat([ 23.865888764, 61.167145977 ]),
		  },
		},
	]			
};

const vectorSource = new VectorSource({
  features: new GeoJSON().readFeatures(geojsonObject),
});

vectorSource.addFeature(new Feature(new Circle([5e6, 7e6], 1e6)));

const vectorLayer = new VectorLayer({
  source: vectorSource,
  style: styleFunction,
}); */

// const testVectorLayer = new VectorLayer({
	// source: new VectorSource({
		// features: new GeoJSON().readFeatures(geojsonTowns),
	// }),
	// style: styleFunction,
// });

const akaaCoords = fromLonLat([ 23.865888764, 61.167145977 ]);
// const circleFeature = new Feature({
	// geometry: new Circle(akaaCoords,8),
	// labelPoint: new Point(akaaCoords),
	// name: 'My Circle',	
// });
const akaaFeature = new Feature({
	geometry: new Point(akaaCoords),
	name: '<div class="town">Akaa</div>',
	hepskukkuu: 'Myös Akaa'
});
akaaFeature.setStyle(new Style({
	image: image,
	// text:  new Text({
         // font: 'Normal 12px Arial',
         // text: 'Akaa',
    // }) 
}));
//circleFeature.setGeometryName('labelPoint');
//circleFeature.setGeometry();
//circleFeature.setStyle([{stroke: new Stroke({color: 'red', width: 3})}]);

// get the polygon geometry
//const poly = circleFeature.getGeometry();
//console.log ("poly: ", poly);
// Render the feature as a point using the coordinates from labelPoint
//circleFeature.setGeometry();
//circleFeature.setStyle(image);

/* circleFeature.setStyle(
  new Style({
    renderer(coordinates, state) {
      const [[x, y], [x1, y1]] = coordinates;
      const ctx = state.context;
      const dx = x1 - x;
      const dy = y1 - y;
      const radius = Math.sqrt(dx * dx + dy * dy);

      const innerRadius = 0;
      const outerRadius = radius * 1.4;
      const gradient = ctx.createRadialGradient(
        x,
        y,
        innerRadius,
        x,
        y,
        outerRadius
      );
      gradient.addColorStop(0, 'rgba(255,0,0,0)');
      gradient.addColorStop(0.6, 'rgba(255,0,0,0.2)');
      gradient.addColorStop(1, 'rgba(255,0,0,0.8)');
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,0,0,1)';
      ctx.stroke();

      //renderLabelText(ctx, x, y, circleFeature.get('label-color'));
    },
    hitDetectionRenderer(coordinates, state) {
      const [x, y] = coordinates[0];
      const ctx = state.context;
      //renderLabelText(ctx, x, y, circleFeature.get('label-color'));
    },
  })
); */


const testVectorLayer = new VectorLayer({
	source: new VectorSource({
		features: [akaaFeature]
	}),
});

export default class OlMap extends React.Component {
    constructor (props) {
        super(props);
    }
	componentDidMount () {
		const tooltip = document.getElementById('tooltip');
		const overlay = new Overlay({
			element: tooltip,
			offset: [10, 0],
			positioning: 'bottom-left'
		});		
		const map = new Map({
		  layers: [
			new TileLayer({
			  source: new OSM(),
			}),
			testVectorLayer,
		  ],
		  target: 'map',
		  view: new View({
			center: fromLonLat([ 25.749498, 62.241678 ]),
			zoom: 6,
		  }),
		});
		//overlay.setPosition(akaaCoords);		
		map.addOverlay(overlay);		
		map.on('click', function(evt) {
		  if (map.forEachFeatureAtPixel(evt.pixel,
			function(feature) {
			  return feature === akaaFeature;
			})
		  ) {
			alert('click');
		  }
		});

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
			tooltip.innerHTML = selected.get('name');
		  } else {
			tooltip.innerHTML = '';
		  }
		});		
	}
    render () {
        return (
			<div>
				<div id="status">TONTTIVUOKRAT</div>}
				<div id="tooltip"></div>
				<main id="map" className="map"></main>					
			</div>
        );
    }
}





