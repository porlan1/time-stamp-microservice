const express = require('express');

const app = express();

app.use(express.static(__dirname));

app.get('/microservice', function(req, res){
	res.type('json')
	var timeSTring = req.query.timeString;
	var date;
	var timeSeconds = parseInt(timeSTring);
	var dateJSON = {};
	if (Number.isNaN(timeSeconds)) {
		try {
			date = new Date(timeSTring);
			dateJSON.dateString = formatDate(date)
			dateJSON.utc = Math.round(date.getTime() / 1000);
		} catch(e){
			dateJSON.dateString = null;
			dateJSON.utc = null;
		}
	} else {
		date = new Date('1970')
		date.setUTCSeconds(timeSeconds);
		dateJSON.dateString = formatDate(date)
		dateJSON.utc = timeSeconds;
	}
	
	res.json(dateJSON);
}); 

app.listen(4000);


function formatDate(date) {
	var dateString = date.toUTCString();
	dateString = dateString.split(' ');
	console.log(dateString);
	return dateString[1] + ' ' + dateString[2] + ' ' + dateString[3];
}