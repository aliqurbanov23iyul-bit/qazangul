import {db,admin} from '../_lib/firebase.js';
import {requireStaff,newCode,codeHash,fail} from '../_lib/security.js';
export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({ok:false,error:'method_not_allowed'});
  try{
    const user=await requireStaff(req,['super_admin','class_teacher']);
    const ids=Array.isArray(req.body?.studentIds)?req.body.studentIds:[];
    if(!ids.length||ids.length>60)return res.status(400).json({ok:false,error:'student_ids_required'});
    const out=[]; const batch=db().batch();
    for(const id of ids){
      const s=await db().collection('students').doc(id).get(); if(!s.exists)continue;
      const sd=s.data();
      if(user.role==='class_teacher' && !Array.isArray(user.classIds)||user.role==='class_teacher'&&!user.classIds.includes(sd.classId))continue;
      const code=newCode(); const ref=db().collection('access_codes').doc();
      batch.set(ref,{studentId:id,classId:sd.classId||null,hash:codeHash(code),active:true,createdAt:admin.firestore.FieldValue.serverTimestamp(),createdBy:user.uid,useCount:0});
      out.push({studentId:id,fullName:sd.fullName,code});
    }
    await batch.commit(); return res.status(200).json({ok:true,codes:out});
  }catch(e){return fail(res,e)}
}
