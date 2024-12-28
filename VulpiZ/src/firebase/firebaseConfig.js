import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
    authDomain: import.meta.env.PUBLIC_FIREBASE_PROJET_AUTHDOMAIN,
    databaseURL: import.meta.env.PUBLIC_FIREBASE_URL,
    projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
    measurementId: import.meta.env.PUBLIC_FIREBASE_MEASUREMENT_ID,
    private_key_id: import.meta.env.PUBLIC_FIREBASE_PRIVATE_KEY_ID,
    private_key: import.meta.env.PUBLIC_FIREBASE_PRIVATE_KEY,
    client_email: import.meta.env.PUBLIC_FIREBASE_CLIENT_EMAIL,
    client_id: import.meta.env.PUBLIC_FIREBASE_CLIENT_ID,
    auth_uri: import.meta.env.PUBLIC_FIREBASE_AUTH_URI,
    token_uri: import.meta.env.PUBLIC_FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: import.meta.env.PUBLIC_FIREBASE_AUTH_CERT_URL,
    client_x509_cert_url: import.meta.env.PUBLIC_FIREBASE_CLIENT_CERT_URL
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };