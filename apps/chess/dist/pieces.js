const paths={
 p:'<circle cx="32" cy="16" r="9"/><path d="M25 26h14l-2 12 8 12H19l8-12Z"/>',
 n:'<path d="M17 49c0-11 5-15 10-20l-10 6-8-5 8-13 9-5 2-8 8 7c13 1 19 11 18 23l-2 15Z"/><path d="M20 20l-3 7 9-3M30 13c5 7 6 13 1 21"/><circle class="eye" cx="27" cy="19" r="2"/>',
 b:'<path d="M32 6c-4 5-12 12-12 19 0 5 5 9 12 9s12-4 12-9c0-7-8-14-12-19Z"/><path d="M30 13l7 9M26 35h12l3 14H23Z"/>',
 r:'<path d="M15 9h8v9h5V9h8v9h5V9h8v18H15ZM22 28h20l2 21H20Z"/>',
 q:'<path d="M14 18l7 28h22l7-28-11 12-7-16-7 16Z"/><circle cx="12" cy="14" r="4"/><circle cx="32" cy="9" r="4"/><circle cx="52" cy="14" r="4"/><path d="M21 43h22v7H21Z"/>',
 k:'<path d="M29 5h6v6h7v6h-7v6h-6v-6h-7v-6h7Z"/><path d="M23 23c-11-3-15 7-8 15l7 10h20l7-10c7-8 3-18-8-15l-9 6Z"/><path d="M22 45h20v6H22Z"/>'
};
export const pieceName={p:'pawn',n:'knight',b:'bishop',r:'rook',q:'queen',k:'king'};
export function pieceSvg(piece){if(!piece)return '';const white=piece.color==='w';return `<svg class="piece ${white?'white':'black'}" viewBox="0 0 64 64" aria-hidden="true"><g fill="${white?'#fffaf0':'#20202b'}" stroke="${white?'#161616':'#fffaf0'}" stroke-width="${white?'3.3':'2.9'}" stroke-linecap="round" stroke-linejoin="round">${paths[piece.type]}<path d="M16 50h32v7H16Z"/><path d="M12 57h40v4H12Z"/></g></svg>`}
export function miniBoard(fen){const ranks=fen.split(' ')[0].split('/'),squares=[];for(let r=0;r<8;r++){let f=0;for(const c of ranks[r]){if(/\d/.test(c)){for(let i=0;i<Number(c);i++)squares.push(`<span class="mini-square ${(r+f++)%2?'dark':''}"></span>`)}else {const color=c===c.toUpperCase()?'w':'b';squares.push(`<span class="mini-square ${(r+f++)%2?'dark':''}">${pieceSvg({type:c.toLowerCase(),color})}</span>`)}}}return `<div class="mini-board" aria-hidden="true">${squares.join('')}</div>`}
