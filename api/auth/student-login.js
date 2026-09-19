import {db,auth,envReady} from '../_lib/firebase.js';
import {normalizeCode,codeHash,fail} from '../_lib/security.js';
export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({ok:false,error:'method_not_allowed'});
  if(!envReady())return res.status(503).json({ok:false,error:'database_not_configured'});
  try{
    const code=normalizeCode(req.body?.code);
    if(code.length!==12)return res.status(400).json({ok:false,error:'invalid_code'});
    const hash=codeHash(code);
    const qs=await db().collection('access_codes').where('hash','==',hash).where('active','==',true).limit(1).get();
    if(qs.empty)return res.status(401).json({ok:false,error:'invalid_code'});
    const codeDoc=qs.docs[0], data=codeDoc.data();
    const studentSnap=await db().collection('students').doc(data.studentId).get();
    if(!studentSnap.exists || studentSnap.data().active===false)return res.status(403).json({ok:false,error:'student_inactive'});
    const student=studentSnap.data();
    const uid=`student_${data.studentId}`;
    try{await auth().getUser(uid)}catch{await auth().createUser({uid,displayName:student.fullName||'Şagird'})}
    await auth().setCustomUserClaims(uid,{role:'student',studentId:data.studentId,classId:student.classId||null});
    await codeDoc.ref.update({lastUsedAt:new Date(),useCount:(data.useCount||0)+1});
    const token=await auth().createCustomToken(uid,{role:'student',studentId:data.studentId,classId:student.classId||null});
    return res.status(200).json({ok:true,token,student:{id:data.studentId,fullName:student.fullName,classId:student.classId}});
  }catch(e){return fail(res,e)}
}
