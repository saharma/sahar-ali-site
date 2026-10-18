import fs from 'node:fs';
import {Chess} from '../dist/vendor/chess.js';
const p=new URL('../dist/content.js',import.meta.url);let s=fs.readFileSync(p,'utf8');
const sequences={knight:[],bishop:['e4','e5'],rook:['e4','e5','Nf3','Nc6','Bc4','Bc5','O-O','Nf6','d3','d6'],queen:['e4','e5','Nf3','Nc6','Bc4','Bc5'],pawn:[],'pawn-capture':['e4','d5'],castling:['e4','e5','Nf3','Nc6','Bc4','Bc5'],'en-passant':['e4','a6','e5','d5'],center:[],development:['e4','e5']};
const changes={
 knight:{move:'g1f3',cue:'The knight jumps over pieces. From g1, f3 is two ranks up and one file sideways.',task:'Move the knight from g1 to f3.',why:'g1 to f3 is a legal L-shaped move from the normal starting position. The knight jumps over the pawn on g2.'},
 bishop:{move:'f1c4',cue:'After 1. e4 e5, the f1 bishop has a clear diagonal through e2 and d3 to c4.',task:'Move the bishop from f1 to c4.',why:'The e-pawn moved earlier, opening f1–e2–d3–c4. Both kings are safe before White plays, and Bc4 is a legal developing move.'},
 rook:{move:'f1e1',cue:'White has castled. The rook on f1 can use the empty e1 square.',task:'Move the rook from f1 to e1.',why:'The rook moves one square left along rank 1. Castling earlier moved the king to g1, freeing e1.'},
 queen:{move:'d1e2',cue:'White’s e-pawn has advanced, freeing e2 for the queen’s diagonal move.',task:'Move the queen from d1 to e2.',why:'d1 to e2 is a clear one-square diagonal. It demonstrates a queen move without putting either king in an illegal check state.'}
};
for(const [id,moves] of Object.entries(sequences)){const g=new Chess();moves.forEach(m=>g.move(m));const start=s.indexOf(` {id:'${id}',`),end=s.indexOf('\n',start);let line=s.slice(start,end);if(line.includes('positionKind:'))continue;line=line.replace(/fen:(sparse\(.*?\)|'[^']*')(?=,move:)/,`fen:'${g.fen()}'`);for(const [key,value] of Object.entries(changes[id]||{}))line=line.replace(new RegExp(`${key}:'[^']*'`),`${key}:${JSON.stringify(value)}`);line=line.replace(/},?$/,`,setupMoves:${JSON.stringify(moves)},positionKind:'replayed-game'},`);s=s.slice(0,start)+line+s.slice(end)}
s=s.replace("fen:sparse({d4:'K',h8:'k'})","fen:sparse({d4:'K',h8:'k',a2:'P'})");
s=s.replace("+` ${turn} ${rights} - 0 1`","+` ${turn} ${rights} - 0 30`");
s=s.replace("w - - 0 1',move:'d1d8'","w - - 0 30',move:'d1d8'");
s=s.replace("for(const l of lessons)if(l.fen==='start')l.fen=new Chess().fen();","for(const l of lessons){if(l.fen==='start')l.fen=new Chess().fen();l.positionKind ||= 'composed-exercise';}");
fs.writeFileSync(p,s);
