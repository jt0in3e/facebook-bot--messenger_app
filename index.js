'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const MongoClient = require("mongodb").MongoClient
let db = ""
// for facebook verification 
/*it's better to setup environment variable i.e.
var verificationToken = process.env.VERIFY_TOKEN on you app's server*/
const verificationToken = process.env.VERIFY_TOKEN;
// recommended to inject access tokens as environmental variables, e.g.
// const token = process.env.PAGE_ACCESS_TOKEN
const token = process.env.PAGE_ACCESS_TOKEN;
const pageFeedToken = process.env.PAGE_FEED_POST_TOKEN;
//link to mongoDB
const mongodbLink = process.env.MONGODB_LINK;

app.set('port', (process.env.PORT || 5000))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

/*
Function to be used in code
*/
function sendTextMessage(sender, text) {
	let messageData = { text:text + "\nMother fuck\n"}
	
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

function postFeed(pageId, text) {
	request({
		url: 'https://graph.facebook.com/v2.6/me/feed',
		qs: {access_token:pageFeedToken},
		method: 'POST',
		json: {
			message: text,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error posting message to page: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

function sendGenericMessage(sender) {
	let messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [{
					"title": "First card",
					"subtitle": "Element #1 of an hscroll",
					"image_url": "http://messengerdemo.parseapp.com/img/rift.png",
					"buttons": [{
						"type": "web_url",
						"url": "https://www.messenger.com",
						"title": "web url"
					}, {
						"type": "postback",
						"title": "Postback",
						"payload": "Payload for first element in a generic bubble",
					}],
				}, {
					"title": "Second card",
					"subtitle": "Element #2 of an hscroll",
					"image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
					"buttons": [{
						"type": "postback",
						"title": "Postback",
						"payload": "Payload for second element in a generic bubble",
					}],
				}]
			}
		}
	}
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

// connect to mongoDB & start server
MongoClient.connect(mongodbLink, function(err, database) {
	if (err) {return console.log(err);}
	db = database;
	// index
	app.get('/', function (req, res) {
		res.status(200).send('hello I\'m very sexy bot')
	})
	//verification test on FB
	app.get('/webhook/', function (req, res) {
		if (req.query['hub.verify_token'] === verificationToken) {
			res.status(200).send(req.query['hub.challenge'])
		}
		res.send('Error, wrong token');
		res.sendStatus(403);
	})

	// to post data back to FB
	app.post('/webhook/', function (req, res) {
		let messaging_events = req.body.entry[0].messaging
		for (let i = 0; i < messaging_events.length; i++) {
			let event = req.body.entry[0].messaging[i]
			let sender = event.sender.id
			if (event.message && event.message.text) {
				let text = event.message.text
				if (text === 'generic') {
					sendGenericMessage(sender);
					continue;
				} 
				//it is here only for testing how it works
				if (text.substring(0,5) === "/post") {
					postFeed(283148272070769, text.substring(6));
					break;
				}

				if (text.substring(0,6) === "/event") {
					//what to do with events
					sendTextMessage(sender, "event received");
					break;
				}

				sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
				
			}
			if (event.postback) {
				let text = JSON.stringify(event.postback)
				sendTextMessage(sender, "Postback received: "+text.substring(0, 200), token)
				continue
			}
		}
		res.sendStatus(200)
	})

	//start server
	app.listen(app.get('port'), function() {
		console.log('running on port', app.get('port'))
	})
})