import {Chess,validateFen} from './vendor/chess.js';
export function checkedPosition(fen){
 const format=validateFen(fen);if(!format.ok)throw new Error(format.error);
 const g=new Chess(fen),side=g.turn(),opponent=side==='w'?'b':'w',counts={w:{pieces:0,pawns:0},b:{pieces:0,pawns:0}};let otherKing;
 for(const row of g.board())for(const p of row)if(p){counts[p.color].pieces++;if(p.type==='p'){counts[p.color].pawns++;if(p.square[1]==='1'||p.square[1]==='8')throw new Error('A pawn cannot remain on its promotion rank.')}if(p.type==='k'&&p.color===opponent)otherKing=p.square}
 for(const c of ['w','b'])if(counts[c].pieces>16||counts[c].pawns>8)throw new Error('Too many pieces or pawns for one side.');
 if(g.isAttacked(otherKing,side))throw new Error('The side that just moved has left its king in check. The side-to-move field is invalid.');
 const fields=fen.split(' '),rights=fields[2];for(const [right,color,king,rook] of [['K','w','e1','h1'],['Q','w','e1','a1'],['k','b','e8','h8'],['q','b','e8','a8']])if(rights.includes(right)&&(!(g.get(king)?.type==='k'&&g.get(king)?.color===color)||!(g.get(rook)?.type==='r'&&g.get(rook)?.color===color)))throw new Error('Castling rights do not match the king and rook positions.');
 const ep=fields[3];if(ep!=='-'){const expectedRank=side==='w'?'6':'3',pawnSquare=ep[0]+(side==='w'?'5':'4'),origin=ep[0]+(side==='w'?'7':'2');if(ep[1]!==expectedRank||g.get(ep)||g.get(origin)||g.get(pawnSquare)?.type!=='p'||g.get(pawnSquare)?.color!==opponent||fields[4]!=='0')throw new Error('En passant state does not match the previous double pawn move.');}
 return g;
}
