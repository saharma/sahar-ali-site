# Sahar Chess

A browser app with a visual chess library, 30 original beginner lessons, 10,000 legally validated Lichess puzzles, 3,865 opening lines, opening exploration and a free analysis board.

## Run

`npm install`, then `npm run dev`. Open http://127.0.0.1:8766/ . Static production assets live in `dist/`; guest play requires no login; optional account sync uses Supabase. All app dependencies are local assets.

## Content

Run `node scripts/import-content.mjs` to reimport CC0 data from Lichess (requires network). The importer applies the opponent's setup move, validates every solution move, checks tagged mates reach checkmate and deduplicates board/turn/castling/en-passant state. It targets 1,500 opening, 6,500 middlegame and 2,000 endgame puzzles. This is legal replay validation, not independent engine reanalysis. Source theme tags and puzzle ratings come from Lichess. Text is original theme guidance, not per-position coach annotation.

Opening data: https://github.com/lichess-org/chess-openings (CC0). Puzzle data: https://database.lichess.org/ (CC0). Rules: chess.js 1.4.0 (BSD-2-Clause; see dist/vendor/chess-LICENSE.txt). SVG pieces and lessons are original. The supplied books/cards are curriculum references; their artwork and text are not redistributed.

## Persistence

Guest progress and bookmarks stay in localStorage. Signing in uses the existing Sahar Ali Supabase project and the same email identity and public username as Wordshift. The checked import option connects existing guest progress to the account without deleting the guest copy. Account progress is stored separately per user and synced to the private chess_progress table; RLS blocks access to other accounts. Users can still export a JSON backup. Each site has its own browser sign-in session. Viewing solutions is not counted as solving. Due dates use increasing review intervals. This is not a calibrated chess rating or mastery estimate.

## Checks

`npm run verify` checks all published puzzle sequences, original lesson objectives, opening lines, data quotas, uniqueness and the chess-specific cases used by the app. Browser QA additionally covers learning, puzzle hints/solutions, legal moves, promotion, opening replay, local persistence and responsive board geometry.

For the independent audit, install `python-chess`, then run `python3 scripts/audit-positions.py`. This checks all position states with python-chess and writes `position-audit.json`.

## Production hosting

Live at https://chess.saharali.com on the `sahar-chess` Vercel project in Fyn Technologies. This is separate from the dinner site and saharali.com homepage. The earlier Sites registration is unpublished; production uses Vercel.

The canonical source is now `saharma/sahar-ali-site`, under `apps/chess`. The Vercel chess project uses this root directory. Build with `npm ci && npm run build`; do not deploy the portfolio project as part of a chess-only change.

Legacy static-only deployment: prepare static output with `node scripts/prepare-vercel.mjs`, verify the linked project with `vercel project inspect sahar-chess --non-interactive`, then deploy using `vercel deploy --prebuilt --prod --scope fyn-technologies`.

Mobile: 44px control heights, phone-safe input sizes, an above-board task, compact responsive layouts and on-demand content loading. Home and starter lessons fetch only the small manifest; puzzles and opening lines are fetched when their sections are opened.

## Guided lesson controls

All 30 lessons have a reviewed one-move stopping point and a distinct fresh-position check. Movement lessons restrict the learner to the taught piece type; strategy lessons allow all legal White pieces. Demonstrations stop after showing the goal move, with no unnecessary Black reply. Guided practice pauses immediately at success; the fresh check then records completion automatically. “Mark as learned” is a separate learner choice, available without forcing replay. Prior learned records are retained. Progress remains browser-local.

Run `npm run verify:lessons` for all 60 lesson positions, candidate legal moves, accepted goals, board locks and storage migration. `scripts/audit-positions.py` independently validates lesson positions, fresh checks and the existing corpus using python-chess.

## UX and curriculum expansion — 18 October 2026

The 30-lesson path now includes blocking/capturing a checker, bishop development, preparing to castle, removing an attacker, king activity, seventh-rank rook activity and knight promotion. Every addition has a distinct transfer check. Study views keep task controls above the board and omit the decorative ticker. Library results run from lower to higher source rating; a beginner mate-in-one route and recommended opening families provide curated entry points. Puzzle feedback distinguishes an unchecked alternative from a disproven move. Progress leads with the next lesson and separates completion from self-marked knowledge.
