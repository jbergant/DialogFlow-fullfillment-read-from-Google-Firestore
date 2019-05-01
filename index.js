'use strict';
const functions = require('firebase-functions');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements


exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {

    let action = request.body.queryResult.action;

    let responseJson = {};

    switch (action) {
        case "buy.drone-types":
            responseJson.fulfillmentText = 'Available drones here from fulfillment';
            let richResponses = [
                {
                    "text": {
                        "text": [
                            "Here is a list of all available Beginners Drone"
                        ]
                    },
                    "platform": "FACEBOOK"
                },
                {
                    "card": {
                        "title": "ALTAIR AERIAL AA108",
                        "subtitle": "FOR YOUNG DRONE ENTHUSIASTS & BEGINNERS",
                        "imageUri": "https://mydeardrone.com/wp-content/uploads/2018/11/Altair-AA108-Camera-Drone-RC-Quadcopter-w-720p-HD-FPV-Camera-VR-Headless-Mode-Altitude-Hold-3-Skill-Modes-Great-for-Kids-Beginners-Easy-Fly-Indoor-Drone-2-Batteries.jpg",
                        "buttons": [
                            {
                                "text": "View more",
                                "postback": "https://mydeardrone.com/types/beginner/"
                            }
                        ]
                    },
                    "platform": "FACEBOOK"
                },
                {
                    "card": {
                        "title": "UDI U818A HD+",
                        "subtitle": "BEST BEGINNER DRONE",
                        "imageUri": "https://mydeardrone.com/wp-content/uploads/2018/03/Force1-UDI-U818A-Camera-Drone-for-Kids-HD-Drone-with-Camera-for-Beginners-720p-RC-Camera-Drones-w-360%C2%B0-Flips-Extra-Battery.jpg",
                        "buttons": [
                            {
                                "text": "View more",
                                "postback": "https://mydeardrone.com/types/beginner/"
                            }
                        ]
                    },
                    "platform": "FACEBOOK"
                }
            ];
            responseJson.fulfillmentMessages = richResponses;
            break;
        default:
            responseJson.fulfillmentText = 'Unknown action';
    }

    response.json(responseJson);
});

