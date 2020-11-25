import React from 'react';
import DscTable from "./dscTable.js";

export default class Content extends React.Component {
    constructor (props) {
        super(props);
		this.state = {
			animationDisplay: 'none'
		}
    }
	componentDidMount () {
		//this.setState({ animationDisplay: 'flex' })
		// setTimeout (
			// () => this.setState({ animationDisplay: 'flex' }),
			// 3000
		// );
	}
    render () {     
        return (
			<main className="main">
				<div className="friba-animation">
					<div className="friba-animation-left"></div>
					<div className="friba-animation-center">
						<div className="friba-animation-center__flying-object" >
						</div>					
					</div>
					<div className="friba-animation-right"></div>
				</div>
				<div className="content">
					<div className="content__left"></div>
					<DscTable />
					<div className="content__right"></div>
				</div>
            </main>          
        );
    }
}
