# Assignment 02: Iteration Plan
 
**Landon Forney**  
**CMPA 4303 - Bug Squasher**  
**September 17, 2026**
 
Live site: [https://landotakman1.github.io/Bug-squasher-browser-game/](https://landotakman1.github.io/Bug-squasher-browser-game/)  
Repo: [https://github.com/landotakman1/Bug-squasher-browser-game](https://github.com/landotakman1/Bug-squasher-browser-game)
 
---
 
## 1. P01 Evaluation
 
### What works well
 
The core clicker works. Clicking the target adds points, the score and bugs-squashed counters update immediately, and refresh still starts a new run the way Project 01 required. Three upgrades exist and they all have different functionality: Stronger Click raises manual click power, Auto Squash runs on one `setInterval` (after I learned to `clearInterval` instead of stacking timers), and Bug Spray adds a growing bonus to both manual and auto hits. Buttons stay `disabled` until the player can afford them, which is obvious without a separate error state.
 
The site is a real three-page project, not a single file. Play / How to Play / About share the same nav and the same dark cyber-ish look (monospace, green on black, red OFFLINE). GitHub Pages updates after a push. How to Play names the three upgrades and says the target jumps and that refresh resets. That is enough for someone to play without needing a tutorial.
 
Week 06 Exercise 05 already fixed the worst P01 playability/visibility problems: the Play page is no longer a short box under a large hero section. Desktop uses a wider stage with the shop in a side panel. Squash has a short hit flash. The target stays inside the arena instead of hanging off the top-left or overlapping the boundaries. The feedback line has reserved height so the shop does not jump when the splat text changes. Fast taps use `touch-action: manipulation` so the page is less likely to zoom.
 
### What doesn't work
 
Nothing important is broken in the console error or runaway loop sense. What fell short is how it *feels*. After P01, the game matched the proposal’s feature list and still was not fun. On desktop you had to scroll to see the shop, the arena was a skinny column compared to the monitor, clicks had no punch except the teleport, and the styling left quite a bit to be desired. Exercise 05 improved the stage, but the target is still a default white HTML button that says “Squash Bug.” It does not look like a bug even if you pretend really hard. The page is still visually flat: same gray-green panels, no milestone, no sound.
 
Auto Squash also calls `moveBug()`, so the target jumps while the player is lining up a click. That is intended for now, but it fights the player. Status never leaves OFFLINE, so the player never really gets a pay-off or win-condition. There is no save but How to Play already warns that refresh wipes the run. On a phone the game actually looks better than P01 desktop did, but it is still easy to scroll the document while you are trying to tap the squash button.
 
### How it compares to the proposal
 
I built the Project 01 list from the proposal: large clickable area, live score, three upgrades, one auto-over-time upgrade, a can’t-afford signifier, basic layout, and state that resets on refresh. I added extras that were not required: a play arena, jump-on-hit, and steeper cost curves (semi-tested multipliers & later auto and spray multipliers). Bug Spray became “add a bonus into both click and auto stats” instead of only “faster auto,” because Stronger Click and Auto Squash already handled those sliders fairly well.
 
What I did not deliver in P01, and still owe P02, is the second half of the proposal: two more upgrades with clearer progression, stronger visual feedback, optional `localStorage`, better balance and milestones, light polish (sound or a bug graphic), and a Play layout that works as a game on desktop and phone. Exercise 05 covered a chunk of “responsive + feedback” It did not cover save, motion, or extra upgrades... or FUN.
 
The gap is not missing pages. The gap is that P01 proved the systems exist, and the game still looks like a form that happens to add numbers.
 
---
 
## 2. Changes for P02
 
### Fixes
 
- **Keep the target fully inside the arena after layout changes.** Exercise 05 fixed the leftover CSS `translate(-50%, -50%)` that was clipping the button. Any new motion (slide) has to use the same padded bounds or it will clip again. This matters because a target you cannot see is not playable and doesn't feel good.
- **Stop the document from scrolling under a tap on the Play arena where I still can.** `touch-action: manipulation` helped zoom. Playing on mobile still has a bit of screen slide and potential to zoom though, which will need further tweaking.
### Improvements
 
- **Make the squash target look like a bug, not a submit button.** Same click loop, different face (styled element or a simple image). The loop is the product; the white button is why it still feels lame.
- **Give the Play page more visual hierarchy.** Stronger contrast between the arena and the background, clearer “this is the stage.” Exercise 05 made it usable but it is still bland.
- **Stop auto-squash from stealing the target** unless I later add slide-and-zone on purpose (which I would very much like to if time permits). For the current teleport, idle ticks may need to score without `moveBug()` so a player can aim more reliably.
- **Flip Production Server from OFFLINE to ONLINE at a milestone** (for example a bugs-squashed count). The story on the page currently never resolves.
- **Update How to Play / About / README** when behavior changes (slide, save, ONLINE) so Week 07 reviewers are not reading P01 instructions.
### Additions
 
- **Sliding bug** instead of teleport-only. I already decided AOE auto-squash needs motion first. Slide is the next real “this is a game” step and it builds on `moveBug` bounding logic I already have.
- **`localStorage` plus an explicit Reset button.** The proposal listed save as optional. Without Reset, save makes testing annoying as well. Together they let a run survive refresh without trapping me in a God-run.
- **One polish lane: either a short SFX on squash or a simple bug graphic - both not required.** Proposal said light polish. One visible/audible cue is enough for MVP.
- **At most one or two extra upgrades**, and only if the three existing ones still feel thin after slide + save. I do not need five upgrades to call this complete if the three I have read clearly and scale well.
### Cuts
 
- **A swarm of bugs / spawn list.** That is a new data model (I'm thinking `array` of targets, spawn, overlap each). P01 already has one target and an auto timer. Swarm could make things go south in a hurry.
- **Player-placed or growing AOE zone in Week 08 if slide slips.** The zone idea is good. It depends on slide. If slide eats too much time, the zone waits. Auto Squash already ticks; the zone is depth, not an MVP necessity.
- **Background music, Reaper sessions, and a full sprite sheet pipeline.** One sound or one image is the cap. A soundtrack or spritesheet is a second project.
- **Frameworks, APIs, accounts, leaderboards.** The proposal chose vanilla HTML/CSS/JS and GitHub Pages on purpose. Those extras do not serve a local clicker and they fight the timeline at this point anyway.
---
 
## 3. Priority and Timeline
 
P02 is due Week 08. Peer review is Week 07, so the site should already look like the direction below before that discussion, even if save or slide is still mid-build.
 
### Must complete
 
These are what I am calling a finished MVP: a clicker that feels like a small game, tells the OFFLINE story, and does not punish refresh without warning.
 
| Change | Effort |
|---|---|
| Bug-like target (CSS or one image) + keep Exercise 05 layout intact | A few hours |
| Auto squash does not teleport the target out from under the cursor | Under an hour |
| OFFLINE → ONLINE milestone | A few hours (state + a little CSS) |
| How to Play / About / README match the live rules | Under an hour |
| `localStorage` save and a Reset button | Most of one evening potentially |
 
If time gets ugly, Reset + save is the first “must” I would slide into “should,” because How to Play already says refresh wipes. I would not ship a white submit button as the final bug.
 
### Should complete
 
| Change | Effort |
|---|---|
| Sliding movement for the bugs (replaces teleport as the default motion) | A weekend chunk (math...) |
| Stronger arena styling (grid, scanlines, or a clearer stage frame) - not a full rebrand | A few hours |
| One squash sound effect | A few hours including finding/making a short clip and getting it in the game (presumably it is just like an img file but I honestly do not know|
 
I plan to do slide. I can still ship without it if the target looks like a bug, save works, and ONLINE flips. Slide is the prerequisite for the AOE idea, so cutting it also cuts the zone.
 
### If time allows
 
| Change | Effort |
|---|---|
| Visible auto-squash zone that pulses and hits the bug on overlap | Most of a weekend after slide works |
| A fourth upgrade | An hour or two maybe |
| Music or a small sprite sheet | A weekend I probably do not have |
 
Effort reality check: I work in VS Code after spending a full work-day on the computer fixing complex financial integration issues. One must-tier evening plus one should-tier weekend between now and Week 08 is realistic. Two stretch systems is not.
 
---
 
## 4. Updated Tools and Approach
 
### Changing tools for P02?
 
No stack change. P02 stays plain HTML, CSS, and JavaScript on GitHub Pages. I am not moving to React, Astro, or a game framework. A framework would hide the timing and state problems I am actually in this course to learn, and the project is already deployed as static files.
 
I may add one image in `images/` and/or one short audio file. That is still static hosting, not a new platform.
 
### What worked in P01 (and continues to work)
 
- **VS Code + Live Server** for the edit/refresh loop before any push.
- **VS Code + Git** with small commits (`Add click loop…`, `Add Auto Squash…`, `Improve play stage…`). The stacked-`setInterval` bug was recoverable because Auto Squash was its own commit idea, not mixed into a 400-line dump.
- **Chrome DevTools** (console first, then device mode). The clipping bug was CSS `transform` vs inline `left`/`top`; the console did not show an error. I still start there.
- **Handwritten `game.js`**, with an LLM for patterns (`template literals` vs C# `$""`, `clearInterval`, `touch-action`). I implement first, then ask when I am stuck. That stays.
### What I would do differently next time
 
I would put the Play stage on a real viewport *before* I called the prototype “playable.” P01 had every listed feature and still felt like a form because the arena was `max-width: 720px` under a beefy hero section. I also would have tested a phone with actual tap-spam earlier; double-tap zoom does not show up the same in a careful desktop click.
 
I would keep going rogue on features, but I would not start a second timer inside a buy function again. One clock, change the rate. That lesson is done.
 
I would not plan five upgrades, a swarm, an AOE zone, music, and a sprite sheet as if they were one week of work. The proposal already named scope creep as a risk. The cut list above is me taking that risk seriously for P02.

I would not try to make a fun, playable game in 8 weeks. Turns out, game dev takes time... Who knew?