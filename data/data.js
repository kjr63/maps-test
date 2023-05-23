export const mapData = [

	{	town: 'Helsinki',
		coords: 		[ 24.943536799, 60.166640739 ],
		avPrice: 		'5144 e',
		avLandrent: 	'12,46 e',
		avLandPrice:	'2990 e',
		lowLandRent:	'5,92 e',
		lowLandPrice:	'1421 e',
		highLandRent:	'24,33 e',
		highLandPrice:	'5850 e',
		lowPrice:		'2500 e',
		highPrice:		'9327 e',
		avRent:			'19,70 e',
		totalLand:		'25 029 600',
		totalLandValue:	'74 839',
		totalLandRent:	'3 742',
	},
	{	town: 'Espoo',
		coords: 		[ 24.656728549, 60.206376371 ],
		avPrice: 		'4087 e',
		avLandrent: 	'8,80 e',
		avLandPrice:	'2113 e',
		lowLandRent:	'5,72 e',
		lowLandPrice:	'1373 e',
		highLandRent:	'14,96 e',
		highLandPrice:	'3590 e',
		lowPrice:		'2718 e',
		highPrice:		'6250 e',
		avRent:			'17,40 e',
		totalLand:		'12 247 900',
		totalLandValue:	'25 880',
		totalLandRent:	'1 294',
	},
	{	town: 'Vantaa',
		coords:			[ 25.006641332, 60.298133721 ],
		avPrice: 		'3191 e',
		avLandrent: 	'6,71 e',
		avLandPrice:	'1611 e',
		lowLandRent:	'4,50 e',
		lowLandPrice:	'1081 e',
		highLandRent:	'10,24 e',
		highLandPrice:	'2457 e',
		lowPrice:		'2042 e',
		highPrice:		'4481 e',
		avRent:			'17,50 e',
		totalLand:		'9 351 900',
		totalLandValue:	'15 066',
		totalLandRent:	'753',
	},	
];

function avLandPrice (lowPrice, lowLandPrice, avPrice, buildingCost) {
	let result = 0;
	const avBPrice = lowPrice -LowLandPrice;
	const avLPrice_1 = avPrice - avBPrice;
	const jakosuhde = lowLandPrice / (lowLandPrice+buildingCost);
	const avLPrice_2 = avPrice * jakosuhde;
	result = (avLPrice_1 + avLPrice_2) / 2;
	return (""+result);
}


