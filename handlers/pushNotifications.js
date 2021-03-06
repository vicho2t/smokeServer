const { Expo } = require('expo-server-sdk');
const expo = new Expo();

//TODO:
//Ver caso de IOs
//Se puede añadir sonido que vibre desde andriod 8.0 (ver channelId notifiacion string)
//Configrar icono desde app.json, tambien color y otros
async function sendPushNotification(tokenList,data){
  let messages = [];
  for (let pushToken of tokenList) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }
    messages.push({
      to: pushToken,
      title: 'Smoke alert',
      sound: 'default',
      priority: 'high',
      body: 'Se quema la casa !!',
      data: { data },
    })
  }
  let chunks = expo.chunkPushNotifications(messages);
  (async () => {
    for (let chunk of chunks) {
      try {
        //console.log('nani');
        let receipts = await expo.sendPushNotificationsAsync(chunk);
        //console.log(receipts);
        messages = [];
      } catch (err) {
        console.error(err);
      }
    }
  })();
}

module.exports = {
  sendPushNotification
}
