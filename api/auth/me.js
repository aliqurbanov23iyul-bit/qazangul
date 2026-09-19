import {db} from '../_lib/firebase.js'; import {requireStaff,fail} from '../_lib/security.js';
export default async function handler(req,res){
  if(req.method!=='GET') return res.status(405).json({ok:false,error:'method_not_allowed'});
  try{
    const user=await requireStaff(req,['super_admin','class_teacher','teacher']);
    return res.status(200).json({ok:true,user:{uid:user.uid,name:user.name||'',email:user.email||'',role:user.role,classIds:user.classIds||[]}});
  }catch(e){return fail(res,e)}
}
