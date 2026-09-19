import admin from 'firebase-admin';

function privateKey(){
  const raw=process.env.FIREBASE_PRIVATE_KEY||'';
  return raw.replace(/^"|"$/g,'').replace(/\\n/g,'\n');
}

export function envReady(){
  return Boolean(process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY);
}

if(!admin.apps.length && envReady()){
  admin.initializeApp({credential:admin.credential.cert({
    projectId:process.env.FIREBASE_PROJECT_ID,
    clientEmail:process.env.FIREBASE_CLIENT_EMAIL,
    privateKey:privateKey()
  })});
}

export const db=()=>admin.firestore();
export const auth=()=>admin.auth();
export {admin};
