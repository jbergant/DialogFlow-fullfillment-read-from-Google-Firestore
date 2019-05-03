'use strict';
const functions = require('firebase-functions');
const admin = require('firebase-admin');

var serviceAccount = require("./config/dialogflowtutorial-587b5-firebase-adminsdk-zfq4n-b347223ad6.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://dialogflowtutorial-587b5.firebaseio.com"
});

var db = admin.firestore();


process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements


exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {

    let action = request.body.queryResult.action;

    let responseJson = {};
    switch (action) {
        case "buy.drone-types":

            let droneTypes = request.body.queryResult.parameters['drone-types'];
            let droneTypesKey = droneTypes.replace(/\s/g,'');

            let dronesRead = db.collection(droneTypesKey).get();
            dronesRead.then((snapshot) => {
                let richResponses = [
                    {
                        "text": {
                            "text": [
                                `Here is a list of all available ${droneTypes} from the dynamic fulfillment call`
                            ]
                        },
                        "platform": "FACEBOOK"
                    }
                ];

                snapshot.forEach((doc) => {
                    var data = doc.data();
                    let card = {
                        "card": {
                            "title": data.title,
                            "subtitle": data.subtitle,
                            "imageUri": data.imageUri,
                            "buttons": [
                                {
                                    "text": data.buttons.text,
                                    "postback": data.buttons.postback
                                }
                            ]
                        },
                        "platform": "FACEBOOK"
                    };
                    richResponses.push(card);

                });

                return richResponses;
            }).then((richResponses) => {
                let responseJson = {};
                responseJson.fulfillmentMessages = richResponses;
                response.json(responseJson);
            })
                .catch((err) => {
                    console.log('Error getting documents', err);
                });



            break;
        default:

            responseJson.fulfillmentText = 'Unknown action';
            response.json(responseJson);
    }


});

