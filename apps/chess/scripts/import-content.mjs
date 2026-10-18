import {checkedPosition} from '../dist/position-validation.js';
import {Chess} from 'chess.js';
import {Decompress} from 'fzstd';
import fs from 'node:fs/promises';
import path from 'node:path';
const base=new URL('../dist/',import.meta.url);await fs.mkdir(new URL('data/',base),{recursive:true});
const openings=[];
for(const letter of ['a','b','c','d','e']){
 const response=await fetch(`https://raw.githubusercontent.com/lichess-org/chess-openings/master/${letter}.tsv`);if(!response.ok)throw new Error(`Opening ${response.status}`);
 const lines=(await response.text()).trim().split('\n');lines.shift();
 for(const line of lines){const [eco,name,pgn]=line.split('\t');try{const game=new Chess();game.loadPgn(pgn);openings.push({id:`opening-${openings.length}`,eco,name,pgn,moves:game.history(),fen:game.fen()});}catch{}}
}
await fs.writeFile(new URL('data/openings.json',base),JSON.stringify(openings));console.log(`Imported ${openings.length} legal opening lines.`);
const quotas={opening:1500,middlegame:6500,endgame:2000},counts={opening:0,middlegame:0,endgame:0},puzzles=[],seen=new Set();let scanned=0,rejected=0,partial='',done=false;
function processLine(line){if(done||line.startsWith('PuzzleId'))return;scanned++;const [id,sourceFen,moves,rating,deviation,popularity,plays,themes,gameUrl,openingTags]=line.split(',');if(!id||!themes||Number(popularity)<70||Number(rating)>2400||Number(plays)<50)return;const tags=themes.split(' '),phase=tags.includes('endgame')?'endgame':tags.includes('opening')?'opening':'middlegame';if(counts[phase]>=quotas[phase])return;
 try{const game=checkedPosition(sourceFen);const uci=moves.split(' ');const setup=game.move({from:uci[0].slice(0,2),to:uci[0].slice(2,4),promotion:uci[0][4]});const fen=game.fen();checkedPosition(fen);const key=fen.split(' ').slice(0,4).join(' ');if(seen.has(key))return;const solution=uci.slice(1),san=[];for(const move of solution){san.push(game.move({from:move.slice(0,2),to:move.slice(2,4),promotion:move[4]}).san);checkedPosition(game.fen());}if(!solution.length)return;if(tags.includes('mate')&&!game.isCheckmate())throw new Error('Objective mismatch');seen.add(key);puzzles.push({id,fen,sourceFen,setup:setup.san,moves:solution,san,rating:Number(rating),themes:tags,phase,gameUrl,openingTags:openingTags?.split(' ')||[]});counts[phase]++;if(puzzles.length%1000===0)console.log('Validated',puzzles.length,counts);done=Object.entries(quotas).every(([k,v])=>counts[k]>=v);}catch{rejected++}}
const response=await fetch('https://database.lichess.org/lichess_db_puzzle.csv.zst');if(!response.ok)throw new Error(`Puzzle download ${response.status}`);const reader=response.body.getReader(),decoder=new TextDecoder();const decompress=new Decompress(chunk=>{partial+=decoder.decode(chunk,{stream:true});let i;while((i=partial.indexOf('\n'))>=0){const line=partial.slice(0,i);partial=partial.slice(i+1);processLine(line);if(done)break;}});
while(!done){const {done:ended,value}=await reader.read();if(ended)break;decompress.push(value)}await reader.cancel();
await fs.writeFile(new URL('data/puzzles.json',base),JSON.stringify(puzzles));await fs.writeFile(new URL('data/manifest.json',base),JSON.stringify({importedAt:new Date().toISOString(),puzzles:puzzles.length,spotlight:(()=>{const p=puzzles.find(p=>p.themes.includes('fork')&&p.rating<1300)||puzzles[0];return {id:p.id,fen:p.fen}})(),openingLines:openings.length,counts,scanned,rejected,source:'https://database.lichess.org/',license:'CC0',deduplication:'Board, turn, castling and en-passant state; full legal solution replay',note:'Puzzle solutions and theme tags supplied by Lichess; explanations are original theme guidance.'},null,2));
await fs.copyFile(new URL('../node_modules/chess.js/dist/esm/chess.js',import.meta.url),new URL('vendor/chess.js',base));await fs.copyFile(new URL('../node_modules/chess.js/LICENSE',import.meta.url),new URL('vendor/chess-LICENSE.txt',base));console.log('Complete',puzzles.length,counts,'scanned',scanned,'rejected',rejected);
