import { initializeApp } from "firebase/app";
import { Messaging, getMessaging, getToken, isSupported } from "firebase/messaging";
import APIRoutes from "./APIRoutes";
import { makeRequest } from "./fetchData";
// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG || '{}')
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service

export const getMessagingInstance = async () => {
    if (await isSupported()) {
        return getMessaging(app);
    }
    return null;
}


export const sendPushToken = async (currentToken: string)=>{
    if (!('Notification' in window && Notification.permission === 'granted'))
        return null

    const messaging = await getMessagingInstance()
    console.log('Sending push token to server. ', currentToken, messaging)
    if (!('serviceWorker' in navigator) || !messaging)
        return null
    const SWregistration = await navigator.serviceWorker.ready
        
        const firebaseDeviceToken = await getToken(messaging, {
            vapidKey: process.env.REACT_APP_VAPID_KEY,
            serviceWorkerRegistration: SWregistration,
        });
        
        console.log('Push Token: ',firebaseDeviceToken)
        
        if (String(firebaseDeviceToken) !== String(currentToken))
        {
            const reqObj2 = new Request(APIRoutes.ADD_UPDATE_TOKEN, { method: "POST"})
            const formData2 = new FormData()
            formData2.append('deviceToken', firebaseDeviceToken)
            const response2 = await makeRequest(APIRoutes.ADD_UPDATE_TOKEN, reqObj2, formData2)
            
            if (!response2.response.ok){
                console.error('Unable to send push token to server. ', firebaseDeviceToken, response2.message)
            }
        }
}
