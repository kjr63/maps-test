import React from 'react';
import {Map, View} from 'ol';
import {Style, Fill, Stroke} from 'ol/style';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import {GeoJSON} from 'ol/format';

export default class OlMap extends React.Component {
    constructor (props) {
        super(props);
    }
	componentDidMount () {
/* 		const map = new Map({
		  target: 'map',
		  layers: [
			new TileLayer({
			  source: new OSM()
			})
		  ],
		  view: new View({
			center: [0, 0],
			zoom: 0
		  })
		}); */
		const style = new Style({
		  fill: new Fill({
			color: '#eeeeee',
		  }),
		});		
		const vector = new VectorLayer({
		  source: new VectorSource({
			url: 'https://openlayers.org/data/vector/ecoregions.json',
			format: new GeoJSON(),
		  }),
		  background: 'white',
		  style: function (feature) {
			const color = feature.get('COLOR') || '#eeeeee';
			style.getFill().setColor(color);
			return style;
		  },
		});		
		const map = new Map({
		  layers: [vector],
		  target: 'map',
		  view: new View({
			center: [0, 0],
			zoom: 0,
		  }),
		});
		const selectStyle = new Style({
		  fill: new Fill({
			color: '#eeeeee',
		  }),
		  stroke: new Stroke({
			color: 'rgba(255, 255, 255, 0.7)',
			width: 2,
		  }),
		});
		
		const status = document.getElementById('status');

		let selected = null;
		map.on('pointermove', function (e) {
		  if (selected !== null) {
			selected.setStyle(undefined);
			selected = null;
		  }

		  map.forEachFeatureAtPixel(e.pixel, function (f) {
			selected = f;
			selectStyle.getFill().setColor(f.get('COLOR') || '#eeeeee');
			f.setStyle(selectStyle);
			return true;
		  });

		  if (selected) {
			status.innerHTML = selected.get('ECO_NAME');
		  } else {
			status.innerHTML = '&nbsp;';
		  }
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





