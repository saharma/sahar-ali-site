let KEY='sahar-chess-progress-v1';
export function accountScope(id){KEY=id?'sahar-chess:account:'+id:'sahar-chess-progress-v1';progress=loadProgress();}
export function replaceProgress(value){progress={...blank(),...value};try{localStorage.setItem(KEY,JSON.stringify(progress));}catch{warning=true;}}
const blank=()=>({version:1,completedLessons:{},solved:{},lessons:{},bookmarks:[],attempts:[],lastPuzzle:null,settings:{hints:true,orientation:'w'}});
let warning=false;
export function loadProgress(key=KEY){try{const p=JSON.parse(localStorage.getItem(key)||'null');if(p?.version===1&&p.solved&&p.lessons&&Array.isArray(p.bookmarks)&&Array.isArray(p.attempts))return {...blank(),...p}}catch{}return blank()}
export let progress=loadProgress();
export function persist(){try{localStorage.setItem(KEY,JSON.stringify(progress));window.dispatchEvent(new Event('chess-progress-saved'));return true}catch{warning=true;return false}}
export function storageWarning(){return warning}
export function recordAttempt(id,outcome,hints=0){progress.attempts.push({id,outcome,hints,at:new Date().toISOString()});progress.attempts=progress.attempts.slice(-500);persist()}
export function completePuzzle(id,hints=0){const old=progress.solved[id],reviews=(old?.reviews||0)+1,days=hints?1:Math.min(21,Math.pow(2,reviews));progress.solved[id]={at:new Date().toISOString(),due:new Date(Date.now()+days*86400000).toISOString(),hints,reviews};recordAttempt(id,'solved',hints);persist()}
export function completeLesson(id){progress.completedLessons[id]=new Date().toISOString();persist()}
export function markLessonLearned(id){progress.lessons[id]=new Date().toISOString();persist()}
export function bookmark(id){const i=progress.bookmarks.indexOf(id);if(i>=0)progress.bookmarks.splice(i,1);else progress.bookmarks.push(id);persist();return i<0}
export function setLastPuzzle(id){progress.lastPuzzle=id;persist()}
export function dueIds(){return Object.keys(progress.solved).filter(id=>Date.parse(progress.solved[id].due)<=Date.now())}
export function exportProgress(){return JSON.stringify(progress,null,2)}
