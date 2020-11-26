import React from 'react';
import OlMap from './components/olmap.js';

export default class WpApp extends React.Component {
    constructor (props) {
        super(props);
    }
	componentDidMount () {
		//let fs = require('fs');
	}

    render () {     
        return (
            <div>
				<OlMap />
            </div>
        );
    }
}
