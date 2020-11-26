import React from 'react';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

export default class OlMap extends React.Component {
    constructor (props) {
        super(props);
    }
	componentDidMount () {
		const map = new Map({
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
		});	
	}
    render () {
        return (
			<main id="map" className="map">
				<h2>My Map</h2>
            </main>          
        );
    }
}





