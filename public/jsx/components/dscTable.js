import React from 'react';
import { DISPLAY_MODE } from "../utils/variables.js";
import RTable from "./reactTable.js";
import { database, storage } from "../../firebase/firebase.js";
import { setImgData} from "../utils/my-utils.js";

export default class DscTable extends React.Component {
    constructor (props) {
        super(props);
		this.state = {
			tData: [],
			tDisplay: 'none',
			dummy: "init"
		}		
		this.headers = [
			{
				Header: 'Id',
				accessor: 'col0',
			},		
			{
				Header: 'Valmistaja',
				accessor: 'col1',
			},
			{
				Header: 'Nopeus',
				accessor: 'col2',
			},
			{
				Header: 'Malli',
				accessor: 'col3',
			},
			{
				Header: 'Muovi',
				accessor: 'col4',
			},
			{
				Header: 'Paino',
				accessor: 'col5',
			},
			{
				Header: 'Väri',
				accessor: 'col6',
			},
			{
				Header: 'Kunto',
				accessor: 'col7',
			},
			{
				Header: 'Info',
				accessor: 'col8',
			},
			{
				Header: 'Kuva',
				accessor: 'col9',			
				Cell: function (cell) {
					const valueArray = cell.value.split(';');
					return (
						<div>
							<div><a target='_blank' href={valueArray[0]}> Kuva 1</a></div>
							<div><a target='_blank' href={valueArray[1]}> Kuva 2 </a></div>
						</div>
					);
				}			
			},
			{
				Header: 'Status',
				accessor: 'col10',
			},			
		];
		this.crossTable = this.crossTable.bind(this);
		this.dbSetup = this.dbSetup.bind(this);
    }

	dbSetup () {
		alert("dbSetup");
		database.ref('0').update({status:'Vaihtari'});
	}

	crossTable (from) {
		let toRow = {
			col0: from.id.trim(),
			col1: from.manuf.trim(),
			col2: from.type.trim(),
			col3: from.mold.trim(),
			col4: from.plastic.trim(),
			col5: from.weight.trim(),
			col6: from.color.trim(),
			col7: from.mint.trim(),
			col8: from.info.trim(),
			col9: from.image.trim(),
			col10: from.status.trim(),
		};
		return toRow;
	}

	componentDidMount () {
		// Lue tietokanta
		database.ref().once("value")
			.then(
				(snapshot) => {
					let databaseData = [];
					let resolvedPromisesArray = [];
					snapshot.forEach ( 
						(childSnapshot) => {
							let key = childSnapshot.key;
							// childData will be the actual contents of the child
							let childData = childSnapshot.val();
							// Aseta key = id
							childData.id = key;
							//Muokkaa kuvalinkki
							//Ota taulukkoon 2 kuvatiedostoa
							let imgs = childData.image.split(';');
							//JOS kuvatieodto olemassa
							if (imgs != null && imgs[0].length > 5) {
								//Luo ensimmäinen kuvatiedostopolku
								//Lue storage lupauksen sisällä
								resolvedPromisesArray.push( new Promise ( (resolve) =>
									storage.ref().child(imgs[0]).getDownloadURL ()
										.then (
											(url0) => { 
												storage.ref().child(imgs[1]).getDownloadURL ()
													.then (
														(url1) => {
															//console.log (url0);
															childData.image = url0+";"+url1;
															// Kirjoita data taulukkoon
															databaseData.push(this.crossTable(childData));															
															resolve("get ready");
														},
													)
													.catch ( (error) => {console.log(error.code); resolve("get ready");} )
											},
										)
										.catch ( (error) => {console.log(error.code); resolve("get ready");} )
								));
							}
							else { // Ei kuvaa
								childData.image = "https://no-image-available;https://no-image-available";
								databaseData.push(this.crossTable(childData));
							}
						}
					);
					// KUN kaikki storage lupaukset täytetty NIIN
					Promise.all(resolvedPromisesArray)
						.then ( () => {//Päivitä tilat
							console.log("Kaikki lupaukset täytetty");
							this.setState ({tData: databaseData});
							this.setState ({tDisplay:'block'});								
						})					
				},
				(error) => {
					console.log("database read error: ", error);
				}
		);
	}	
    render () {
        return (
            <section className="disc-table" style={{display:this.state.tDisplay}}>
				<div className="disc-table__header">
					<div className="disc-table__header-1">Kiekkolista</div>
					<div className="disc-table__header-2">
						<i className="fa fa-cog" onClick={this.dbSetup}></i>
					</div>
				</div>
                <RTable
					cols={this.headers}
					data={this.state.tData}
				/>
            </section>          
        );
    }
}
