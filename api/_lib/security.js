import crypto from 'node:crypto';
import {auth,db} from './firebase.js';

export function normalizeCode(v=''){return String(v).toUpperCase().replace(/[^A-Z0-9]/g,'');}
export function codeHash(code){
  const secret=process.env.FIREBASE_PRIVATE_KEY||'not-configured';
  return crypto.createHmac('sha256',secret).update('qazangul-school-code:v1:'+normalizeCode(code)).digest('hex');
}
export function newCode(){
  const alphabet='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes=crypto.randomBytes(12); let s='';
  for(let i=0;i<12;i++)s+=alphabet[bytes[i]%alphabet.length];
  return `${s.slice(0,4)}-${s.slice(4,8)}-${s.slice(8,12)}`;
}
export async function requireStaff(req,roles=['super_admin']){
  const h=req.headers.authorization||'';
  if(!h.startsWith('Bearer ')) throw Object.assign(new Error('unauthorized'),{status:401});
  const decoded=await auth().verifyIdToken(h.slice(7));
  const snap=await db().collection('users').doc(decoded.uid).get();
  const profile=snap.exists?snap.data():{};
  if(!roles.includes(profile.role)) throw Object.assign(new Error('forbidden'),{status:403});
  return {uid:decoded.uid,email:decoded.email,...profile};
}
export function fail(res,e){return res.status(e.status||500).json({ok:false,error:e.message||'server_error'});}
