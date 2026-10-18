import assert from 'node:assert/strict';
import {lessons} from '../dist/content.js';
import {checkedPosition} from '../dist/position-validation.js';
import {canSelectLessonPiece,acceptsLessonMove,buildLessonDemo} from '../dist/lesson-rules.js';
let accepted=0,positions=0;
for(const lesson of lessons){
 assert(lesson.stopAfterGoal&&lesson.transfer,lesson.id+' guardrail and transfer');
 for(const test of [false,true]){
  const l=test?{...lesson,...lesson.transfer}:lesson;
  const state={initial:l.fen,game:checkedPosition(l.fen),lesson,step:test?'test':'practice',demo:false,busy:false,testMode:test};
  assert.notEqual(lesson.fen,lesson.transfer.fen,lesson.id+' new position');positions++;
  const legal=state.game.moves({verbose:true});
  for(const move of legal){
   const selectable=canSelectLessonPiece(state,move.from);state.game.move(move);checkedPosition(state.game.fen());
   if(acceptsLessonMove(state,move)){assert(selectable,lesson.id+' answer selectable');accepted++}state.game.undo();
  }
  for(const answer of l.answers||[l.move]){const move=state.game.move({from:answer.slice(0,2),to:answer.slice(2,4),promotion:answer[4]});assert(acceptsLessonMove(state,move),lesson.id+' expected answer');state.game.undo()}
  for(const step of ['learn','guided-done','done']){state.step=step;for(const m of legal)assert(!canSelectLessonPiece(state,m.from),lesson.id+' board lock '+step)}
  state.step='practice';state.busy=true;for(const m of legal)assert(!canSelectLessonPiece(state,m.from));state.busy=false;state.demo=true;for(const m of legal)assert(!canSelectLessonPiece(state,m.from));
 }
 assert.equal(buildLessonDemo(lesson).length,1,lesson.id+' no unnecessary reply');
}
globalThis.localStorage={getItem:()=>null,setItem:()=>{}};
const store=await import('../dist/storage.js');store.completeLesson('knight');assert(store.progress.completedLessons.knight);assert(!store.progress.lessons.knight);store.markLessonLearned('knight');assert(store.progress.lessons.knight);
localStorage.getItem=()=>JSON.stringify({version:1,solved:{},lessons:{bishop:'previous'},bookmarks:[],attempts:[]});assert.equal(store.loadProgress().lessons.bishop,'previous');assert.deepEqual(store.loadProgress().completedLessons,{});
console.log(JSON.stringify({passed:true,lessons:lessons.length,positions,acceptedAnswers:accepted,checks:['legal starts and every candidate result','fresh position for every lesson','goal answers selectable','locks before and after exercise','single-move demonstration','completion distinct from learned','existing progress migration']},null,2));
