import {test} from 'node:test';import assert from 'node:assert/strict';
const values=new Map();global.localStorage={getItem:key=>values.get(key)||null,setItem:(key,value)=>values.set(key,value)};global.window={dispatchEvent(){}};
const store=await import('../dist/storage.js');
test('guest progress survives account switches without leaking between accounts',()=>{
 store.completeLesson('guest-lesson');const guest=store.loadProgress();
 store.accountScope('account-a');assert.equal(store.progress.completedLessons['guest-lesson'],undefined);
 store.replaceProgress(guest);store.completeLesson('account-a-lesson');
 store.accountScope('account-b');assert.equal(store.progress.completedLessons['guest-lesson'],undefined);assert.equal(store.progress.completedLessons['account-a-lesson'],undefined);
 store.accountScope(null);assert.ok(store.progress.completedLessons['guest-lesson']);assert.equal(store.progress.completedLessons['account-a-lesson'],undefined);
 store.accountScope('account-a');assert.ok(store.progress.completedLessons['guest-lesson']);assert.ok(store.progress.completedLessons['account-a-lesson']);
});
