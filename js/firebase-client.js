import {initializeApp} from 'https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js';
import {getAuth,signInWithEmailAndPassword,signInWithCustomToken,onAuthStateChanged,signOut} from 'https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js';
const firebaseConfig={apiKey:'AIzaSyDG2JWg0-rpht3RCsQZpQOjq1y4t6IcjU8',authDomain:'qazangul-school.firebaseapp.com',projectId:'qazangul-school',storageBucket:'qazangul-school.firebasestorage.app',messagingSenderId:'947928106763',appId:'1:947928106763:web:4fc07d3af1d6704e79440e'};
const app=initializeApp(firebaseConfig); const auth=getAuth(app);
export {auth,signInWithEmailAndPassword,signInWithCustomToken,onAuthStateChanged,signOut};
export async function idToken(){if(!auth.currentUser)throw new Error('not_signed_in');return auth.currentUser.getIdToken();}
