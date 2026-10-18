import {Chess} from './vendor/chess.js';
export function learnerColor(state){return state.initial.split(' ')[1]}
export function activeLesson(state){return state.step==='test'||state.testMode?{...state.lesson,...state.lesson.transfer}:state.lesson}
export function canSelectLessonPiece(state,square){
 const piece=state.game.get(square);
 if(state.busy||state.demo||!['practice','test'].includes(state.step)||state.game.turn()!==learnerColor(state))return false;
 return !!piece&&piece.color===learnerColor(state)&&(state.lesson.selection==='any'||piece.type===state.lesson.focus)&&state.game.moves({square}).length>0;
}
export function acceptsLessonMove(state,move){
 const l=activeLesson(state),uci=move.from+move.to+(move.promotion||'');
 if(move.color!==learnerColor(state))return false;
 if(l.id==='loose-piece')return move.captured==='q';
 if(l.id==='fork')return move.piece==='n'&&state.game.isCheck()&&state.game.board().flat().some(p=>p?.color!==move.color&&p?.type==='q'&&state.game.attackers(p.square,move.color).includes(move.to));
 if(l.id==='rook-activity'){const pawn=state.game.board().flat().find(p=>p?.color===move.color&&p.type==='p');return move.piece==='r'&&pawn&&move.to[0]===pawn.square[0]&&Number(move.to[1])<Number(pawn.square[1])}
 if(l.goal==='mate')return state.game.isCheckmate();
 if(l.goal==='discovered-check')return move.piece==='b'&&state.game.isCheck();
 if(l.goal==='escape')return !state.game.isCheck();
 if(l.goal==='movement')return move.piece===l.focus;
 return (l.answers||[l.move]).includes(uci);
}
export function lessonGoalReached(){return true}
export function chooseLessonReply(game){return game.isGameOver()?null:game.moves({verbose:true})[0]||null}
export function buildLessonDemo(lesson){const g=new Chess(lesson.fen);const u=lesson.move;g.move({from:u.slice(0,2),to:u.slice(2,4),promotion:u[4]});return [u]}
