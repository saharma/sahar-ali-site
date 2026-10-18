import fs from 'node:fs/promises';
const root=new URL('../',import.meta.url),output=new URL('.vercel/output/',root);await fs.mkdir(output,{recursive:true});await fs.cp(new URL('dist/',root),new URL('static/',output),{recursive:true});
await fs.writeFile(new URL('config.json',output),JSON.stringify({version:3,routes:[{src:'/(.*)',headers:{'X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','Cache-Control':'public, max-age=0, must-revalidate'},continue:true},{handle:'filesystem'}]},null,2));console.log('Prepared static Vercel Build Output API assets.');
