import {createClient} from '@supabase/supabase-js';
import {progress,loadProgress,accountScope,replaceProgress} from './storage.js';
const client=createClient('https://nmvkvzmsjnanhlfvedhv.supabase.co','sb_publishable_lzaTI7elt0YwobbmSo0mhQ_Fjfj-7K3',{auth:{storageKey:'sahar-chess:auth',flowType:'pkce',detectSessionInUrl:true,persistSession:true,autoRefreshToken:true}});
const button=document.querySelector('#account-button'),dialog=document.querySelector('#account-dialog'),status=document.querySelector('#account-status'),emailForm=document.querySelector('#signin-form'),panel=document.querySelector('#account-panel');
let user=null,ready=false,timer,busy=false,dirty=false,generation=0,initialLoad=true;
const say=text=>status.textContent=text;
const merge=(cloud,local)=>{
 const result={...cloud,...local,version:1};
 for(const key of ['solved','lessons','completedLessons']){result[key]={...cloud?.[key]};for(const [id,value] of Object.entries(local?.[key]||{})){const previous=result[key][id];if(!previous||String(value?.at||value)>String(previous?.at||previous))result[key][id]=value;}}
 result.bookmarks=[...new Set([...(cloud?.bookmarks||[]),...(local?.bookmarks||[])])];
 result.attempts=[...new Map([...(cloud?.attempts||[]),...(local?.attempts||[])].map(a=>[JSON.stringify(a),a])).values()].sort((a,b)=>String(a.at).localeCompare(String(b.at))).slice(-500);
 return result;
};
async function sync(){
 if(!user||!ready||busy)return;busy=true;const id=user.id,epoch=generation;dirty=false;
 try{
  const snapshot=JSON.parse(JSON.stringify(progress));
  const {data,error}=await client.from('chess_progress').select('progress').eq('user_id',id).maybeSingle();if(error)throw error;
  if(user?.id!==id||epoch!==generation)return;
  const combined=merge(data?.progress||{},snapshot);
  if(!initialLoad)combined.bookmarks=snapshot.bookmarks;
  if(!combined.lastPuzzle)combined.lastPuzzle=data?.progress?.lastPuzzle||null;
  const saved=await client.from('chess_progress').upsert({user_id:id,progress:combined,updated_at:new Date().toISOString()});if(saved.error)throw saved.error;
  if(user?.id!==id||epoch!==generation)return;
  // Preserve moves made while the network request was in flight.
  replaceProgress(dirty?merge(combined,progress):combined);
  if(initialLoad){initialLoad=false;window.dispatchEvent(new Event('chess-account-changed'));}
  say(dirty?'Saving your latest progress…':'Your chess progress is saved to your account.');
 }catch{dirty=true;say('Cloud sync is unavailable. Progress is safe in this browser. Retry when online.');}
 finally{busy=false;if(dirty&&user&&ready)timer=setTimeout(sync,15000);}
}
async function changeUser(next){
 if(next?.id===user?.id&&ready)return;
 generation++;initialLoad=true;clearTimeout(timer);ready=false;user=next;accountScope(user?.id);emailForm.hidden=!!user;panel.hidden=!user;
 button.textContent=user?'My account':'Sign in';
 if(!user){ready=true;say('Use the same email account as Wordshift.');window.dispatchEvent(new Event('chess-account-changed'));return;}
 // Guest data is retained separately and only imported with the checkbox consent.
 const consent=localStorage.getItem('sahar-chess:import-choice');
 if(consent==='yes'){replaceProgress(merge(progress,loadProgress('sahar-chess-progress-v1')));localStorage.removeItem('sahar-chess:import-choice');}
 ready=true;dirty=true;say('Connecting your chess progress…');window.dispatchEvent(new Event('chess-account-changed'));
 const {data}=await client.rpc('wordshift_account');if(user?.id!==next.id)return;
 if(data?.username){button.textContent=data.username;document.querySelector('#username').value=data.username;}
 await sync();
}
button.onclick=()=>dialog.showModal();document.querySelector('#account-close').onclick=()=>dialog.close();
emailForm.onsubmit=async event=>{event.preventDefault();const send=document.querySelector('#send-signin');send.disabled=true;say('Sending your sign-in link…');localStorage.setItem('sahar-chess:import-choice',document.querySelector('#import-history').checked?'yes':'no');
 try{const {error}=await client.auth.signInWithOtp({email:document.querySelector('#signin-email').value.trim(),options:{emailRedirectTo:'https://chess.saharali.com/',shouldCreateUser:true}});if(error)throw error;say('Check your email. Open the link in this browser to finish signing in. Your account is shared with Wordshift.');}catch(error){say(error.message||'Could not send your link. Try again.');}finally{send.disabled=false;}};
document.querySelector('#signout').onclick=async()=>{const {error}=await client.auth.signOut({scope:'local'});if(error){say('Could not sign out. Try again.');return;}await changeUser(null);};
document.querySelector('#sync-now').onclick=()=>{dirty=true;sync();};
document.querySelector('#username-form').onsubmit=async event=>{event.preventDefault();const {data,error}=await client.rpc('wordshift_set_username',{chosen_username:document.querySelector('#username').value.trim()});if(error)say('That username is unavailable. Use 3–20 letters, numbers or underscores.');else{button.textContent=data.username;say('Username saved. This is also your Wordshift username.');}};
window.addEventListener('chess-progress-saved',()=>{if(user&&ready){dirty=true;clearTimeout(timer);timer=setTimeout(sync,750);}});
window.addEventListener('online',()=>{if(dirty)sync();});
client.auth.onAuthStateChange((event,session)=>{setTimeout(()=>changeUser(session?.user||null),0);});
client.auth.getSession().then(({data,error})=>{if(error)say('Sign-in could not be restored. Please sign in again.');return changeUser(data?.session?.user||null);});
