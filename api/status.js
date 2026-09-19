import {envReady,db} from './_lib/firebase.js';
export default async function handler(req,res){
  if(!envReady()) return res.status(200).json({ok:true,database:{provider:'firebase',connected:false}});
  try{await db().collection('_system').doc('health').get();return res.status(200).json({ok:true,database:{provider:'firebase',connected:true}})}
  catch(e){return res.status(200).json({ok:true,database:{provider:'firebase',connected:false,error:'firebase_unreachable'}})}
}
