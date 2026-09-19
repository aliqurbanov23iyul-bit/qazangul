// Firebase Admin qoşulduqda: rate limit -> code normalization -> SHA-256/HMAC lookup -> active student check -> secure session cookie.
export default async function handler(req,res){if(req.method!=='POST')return res.status(405).json({error:'method_not_allowed'});return res.status(503).json({error:'database_not_configured'});}
