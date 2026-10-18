# Browser verification — 14 October 2026

Local app: http://127.0.0.1:8766/

Verified in the Codex browser:
- Homepage renders actual dataset counts. Headline contains two lines separated by visible space; checked at 390px and the default desktop viewport.
- Knight lesson: learn → practice → d4–e6 → complete. Reloaded, opened My progress and observed 1/18 learned.
- Opening puzzle 000rZ: d6–h2 gives mate. App records success, and Save changes to Saved.
- Endgame puzzle 000o3: Kd4 → automatic g5 reply → fxg5. Complete continuation records success.
- Italian Game opening-2432: play all five half-moves → recognized Italian Game position → previous move returns to 4/5 and bishop f1.
- Promotion lesson: e7–e8 opens modal with queen, rook, bishop, knight. Queen choice completes the lesson and displays promoted piece.
- Endgame library search “promotion” returns 88 matches, with exact board thumbnails and pagination.
- Mobile knight board: 64 squares, every square 44×44 CSS pixels at 390px viewport. No piece-dependent stretching.
- Solution study 000pA: source move numbered 24... Rb8#, factual move explanation shows rook f8–b8 and checkmate; previous restores initial position. Solved count stays at two, with only previously solved puzzle IDs listed.
- No browser console errors in the exercised flows.

Content validation is captured in verification.json. It checks all puzzle and opening moves and original lesson objectives. It does not claim independent engine validation or coach review of every source puzzle.

Publication is pending explicit user approval after automatic approval review rejected the external private Site repository write. No source push or deployment occurred.

## Position legality correction
The original bishop exercise was invalid: Black was already in check while White was set to move. Basic movement examples now use legally replayed full-board sequences. Composed studies have explicit labels. Independent python-chess audit passed for 91,102 position states across all 18 lessons, 10,000 puzzles and 3,865 opening lines. Browser check passed for 1. e4 e5 → 2. Bc4 and reset.

## Mobile and publication update
- Reference-card heading and pairing diagram removed from Sources; both selectors return zero matches.
- 320px lesson and 390px opening search layouts have page width equal to viewport width.
- Current lesson task appears above the mobile board. Controls have at least 44px height and inputs use 16px text.
- Opening library loads on demand and search returns 187 Italian Game lines.
- Home and starter lessons now load from a small manifest; puzzle data is deferred. Verified homepage counts, bishop setup context and first on-demand real puzzle board with 64 squares.
- HTTPS custom domain was connected and the initial production deployment returned READY. Final optimization deployment is being verified.

Final deployment dpl_FnuCV8JdUpL2nERmEgUnq1XKDZ2s returned READY and was aliased to https://chess.saharali.com. Live Sources selectors confirm the reference heading and pairing diagram are absent. Live bishop lesson has 64 squares and an above-board task; at 390px the page width is also 390px. No browser console errors were observed. Screenshot: qa/live-mobile.png. The homepage is left open on the public domain.

## Focused lesson update
Browser checks: in the knight lesson, both White knights are enabled while White pawns and Black knights are disabled. Nc3 triggers automatic ...e5; the c3 knight is then locked and g1 remains enabled. Nf3 triggers ...Nc6 and completes the two-knight goal. Demonstration shows Nf3/e5/Nc3/Nc6 with no selectable pieces. Bishop lesson enables f1 only; c1, pawns and Black pieces are locked, and the demo shows Bc4/Nc6. Shared tests cover all 18 lesson types, 8 knight branches and 36 demonstration plies; an independent python-chess replay also passed all 36 moves.

Live deployment dpl_5Ak9BD2Ym4pPKKRDLYgAr5TGmyqJ is READY at chess.saharali.com. Live knight lesson confirms White pawns and Black knights disabled; Nc3 triggers automatic ...e5, with g1 enabled next. No console errors. Screenshot: qa/lesson-piece-controls.png.

## Goal guardrails and curriculum revision
All 22 lessons now have one-move goal boundaries, a paused board after success, and a separate fresh-position check. No lesson appends an unnecessary Black reply. Movement accepts any legal move of the taught piece; explicit special-rule tasks retain their required objective. Strategy input permits every legal White piece. Four original next lessons cover loose pieces, absolute pins, skewers and discovered checks.

Automated lesson checks: 44 starting positions and every legal candidate result checked; 168 accepted answers; board locks before/after practice; completion versus learned separation; previous storage migration. Full corpus verification passes for 10,000 puzzles and 3,865 openings. Independent python-chess audit passes 91,154 states with zero failures, including fresh lesson checks.

Browser: initial knight board locked; Na3 immediately pauses after one White move with no Black reply. Fresh knight position starts after d4/d5; Nf3 saves completion. Strategy lesson permits a king move; Kb1 is explained and undone. Manual learned button changes to saved learned status. Mobile viewport 390px reports clientWidth=scrollWidth=390px.

Final production deployment dpl_AVVBvQrZWErFSELD3UemxWvWa8a3 is READY and aliased to chess.saharali.com. Live loose-piece lesson permits Rxd5 and immediately shows “Goal reached · board paused” with all 64 squares disabled, no appended reply and no console errors. Screenshot: goal-guardrails-live.png.
