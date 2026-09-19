// Production: use node:crypto randomBytes; NEVER sequential class codes; persist only a keyed hash; return plaintext once at creation.
export default async function handler(req,res){if(req.method!=='POST')return res.status(405).json({error:'method_not_allowed'});return res.status(503).json({error:'database_not_configured'});}
