'use strict';

var admin = require("firebase-admin");
var serviceAccount = require("./fcmsenseclub-firebase-adminsdk-r8rdy-2fccbec9cc");

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {
    //Initialized the Firebase SDK within the bootstrap function and passed the private key as a parameter in the admin.credential.cert function
    let firebase = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    //Make the authenticated Firebase instance available from anywhere within the Strapi server by saving it in a Strapi object
    //Make Firebase available everywhere
    strapi.firebase = firebase;
    let messaging = firebase.messaging();


    //The sendNotification function takes an FCM token and data as parameters.
    //The data parameter is a custom object with all information needed to send it as a notification.
    //The object is then appended to the message variable containing a token key with the user’s target device messaging token.
    let sendNotification = (fcm, data) => {
      //https://fcm.googleapis.com/fcm/send
      let message = {
        ...data,
        token: fcm
      }
      messaging.send(message).then((res) => {
        console.log(res);
      }).catch((error) => {
        console.log(error);
      });
    }

    //The sendNotificationToTopic takes two parameters: a data object and a target topic.
    //A topic is a notification channel that links to many tokens.
    //We could send a single notification to users subscribed to a topic.
    let sendNotificationToTopic = (topic_name, data) => {
      let message = {
        ...data,
        topic: topic_name
      }
      messaging.send(message).then((res) => {
        console.log(res);
      }).catch((error) => {
        console.log(error);
      });
    }

    //The function, subcribeTopic associates a messaging token to a specific topic.
    //It takes two parameters, the name of the topic and the messaging token, passed to Firebase's subscribeToTopic function.
    let subscribeTopic = (fcm, topic_name) => {
      messaging.subscribeToTopic(fcm, topic_name).then((res) => {
        console.log(res);
      }).catch((error) => {
        console.log(error);
      });
    }

    //The functions sendNotification, subscribeTopic and sendNotificationToTopic are also added to the Strapi object within the key name notification.
    strapi.notification = {
      subscribeTopic,
      sendNotificationToTopic,
      sendNotification
    }
  },
};
