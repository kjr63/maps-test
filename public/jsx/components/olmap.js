import React from 'react';
import Circle from 'ol/geom/Circle.js';
import Feature from 'ol/Feature.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {fromLonLat} from 'ol/proj';

export default class OlMap extends React.Component {
    constructor (props) {
        super(props);
    }
	componentDidMount () {
		const image = new CircleStyle({
		  radius: 8,
		  fill: null,
		  stroke: new Stroke({color: 'red', width: 3}),
		});

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
		});
		
		const testVectorLayer = new VectorLayer({
			source: new VectorSource({
				features: new GeoJSON().readFeatures(geojsonTowns),
			}),
			style: styleFunction,
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
	}
    render () {
        return (
			<main id="map" className="map">
				<h2>My Map</h2>
				<span id="status">&nbsp;</span>
            </main>          
        );
    }
}





