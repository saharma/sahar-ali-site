import chess,json,pathlib,subprocess
root=pathlib.Path(__file__).resolve().parent.parent
lessons=json.loads(subprocess.check_output(['node','--input-type=module','-e',"import {lessons} from './dist/content.js'; console.log(JSON.stringify(lessons));"],cwd=root,text=True))
puzzles=json.loads((root/'dist/data/puzzles.json').read_text())
openings=json.loads((root/'dist/data/openings.json').read_text())
failures=[];checked=0

def valid(board,where):
 global checked
 checked+=1
 if not board.is_valid():
  reasons=[name for name in dir(chess) if name.startswith('STATUS_') and getattr(chess,name)!=0 and board.status() & getattr(chess,name)]
  failures.append({'where':where,'status':reasons,'fen':board.fen()})

def play(board,move,where):
 if move not in board.legal_moves: failures.append({'where':where,'illegal_move':move.uci()});return False
 board.push(move);valid(board,where);return True

for l in lessons:
 b=chess.Board(l['fen']);valid(b,'lesson '+l['id'])
 if b.is_game_over():failures.append({'where':l['id'],'error':'Lesson starts in terminal position'})
 if 'setupMoves' in l:
  replay=chess.Board()
  for san in l['setupMoves']: play(replay,replay.parse_san(san),'setup '+l['id'])
  assert replay.fen(en_passant='legal')==b.fen(en_passant='legal')
 play(b,chess.Move.from_uci(l['move']),'lesson answer '+l['id'])
 if l.get('mate') and not b.is_checkmate():failures.append({'where':l['id'],'error':'Claimed mate is not mate'})
for l in lessons:
 t=l['transfer'];b=chess.Board(t['fen']);valid(b,'fresh '+l['id'])
 if b.is_game_over():failures.append({'where':l['id'],'error':'Fresh check starts in terminal position'})
 play(b,chess.Move.from_uci(t['move']),'fresh answer '+l['id'])
 if l.get('mate') and not b.is_checkmate():failures.append({'where':l['id'],'error':'Fresh claimed mate is not mate'})
for p in puzzles:
 b=chess.Board(p['sourceFen']);valid(b,'puzzle source '+p['id']);play(b,b.parse_san(p['setup']),'puzzle setup '+p['id']);assert b.fen(en_passant='legal')==chess.Board(p['fen']).fen(en_passant='legal')
 for m in p['moves']:play(b,chess.Move.from_uci(m),'puzzle solution '+p['id'])
 if 'mate' in p['themes'] and not b.is_checkmate():failures.append({'where':p['id'],'error':'Incorrect mate objective'})
for o in openings:
 b=chess.Board()
 for san in o['moves']:play(b,b.parse_san(san),'opening '+o['id'])
 assert b.fen(en_passant='legal')==chess.Board(o['fen']).fen(en_passant='legal')
report={'engine':'python-chess '+chess.__version__,'passed':not failures,'lessons':len(lessons),'puzzles':len(puzzles),'openingLines':len(openings),'positionStatesChecked':checked,'failures':failures}
(root/'position-audit.json').write_text(json.dumps(report,indent=2))
print(json.dumps(report,indent=2));assert not failures
