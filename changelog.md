## 3.2.3.9 - HotFix
Hotfix for compendiums, making all new lines display properly

## 3.2.3.8 - HotFix
Hotfix on the macro shared on Discord so it doesn't reset all item quantities to 1.

## 3.2.3.7 - PTR Data Sync & Bugfixes
Hey all, this update brings along the full PTR Data sync, removing all [Playtest] tags as we now have 1 'true' version of all items.
Please check the #announcements channel on the discord on how to easily update all of your existing items!

### New Feature
- Added type images to the Move List
- Added PTR Data Sync utility (see discord)

### Fixes
- Update all Compendiums to the latest PTR-Data version.
- Fix wrong abilities being generated for some mons (like Fluffy Charge instead of Fluffy).
- Fix Terrabbit evolution.
- Fix feat/edge sheet's "to-chat" not functioning.
- Hide struggles from the Level Up Form.
- Fix "++" and "--" for Health and the like on trainer sheets.
- Fix chat wrappers for effects.
- Fix the base stat source popup on trainer sheets.
- Fix Teleporter capability not working in the Custom Species Editor.
- Fixed missing dex-entries.
- Fixed alt. forms (like Alolan, Galarian etc.) not loading the correct pokedex entry when opened from the 'dexentry' item.

## 3.2.3.6 - HotFix
### Fixes
- Fixed an issue with Custom Species in the Level Up Form
- Added the forgotten Rotom Forms
- Fixed some compatability issues with Item Piles

## 3.2.3.5 - Lots of new stuff!
Hey all, this update brings with it a few big new features, as well as a lot of small QoL additions and bugfixes. 
Our big new feature is the Secondary Effect Automation Framework. For more details on this check our Discord.

### New Features
- Added the Secondary Effect Automation Framework. (please read discord announcement for more info)
- Added a setting to disable 'Pokéball Sounds' when Pokémon get sent out.
- Level-Up form will now update your health appropriately.
- Added a 'Notes' field in the extra tab of Pokemon
- Character Sheets now allow +/- in certain fields like HP or EXP (f.e., if your HP is 50, and you change the field to +5, it will apply +5 to your HP.)
- Implemented the 'GM Prompt' option for the "Pokédex Permission" setting
- Implemented the PTR Movement Icons module into the system
- Added a small animation upon Pokémon Evolution through the Level Up Popup

### New Automations
#### Moves
- Ember
#### Abilities
- Exploit

### Fixes
- Fixed an issue with Pokémon being sent out didn't play the proper automation causing them not to be added to the Turn Tracker during combat.
- Fixed a bug with the Level Up Popup showing your remaining Level Up Points as 'undefined'.
- Enable Foundry Sidebar Collapse
- Reposition PTR Sidebar with the Foundry Sidebar (upon collapse)
- Fixed an issue with Capabilities not being editable in the Custom Species Editor
- Fix issues with Custom Type Images

## Version 3.2.3.4 - HotFix
It appeared we are 'incentivising' the Playtest a bit too much... considering if you're not running it this update broke! 

### Fixes
- Made the level-up form fully compatible for people not running the stat playtest
- Made it so that Abilities auto default to not all be the same one.
- Fixed a style issue that sometimes appears in the Level-Up Form

## Version 3.2.3.2 - Level-Up Popup!
Hi all! We've been hard at work on this new addition; the Level-Up Form for Pokemon.

Whenever you level up your pokemon (by increasing the EXP value) this pop-up will show up (unless disabled by the GM in settings). 
It includes the following features:
- (Re-)assign Stat Points
- Evolve your Pokemon
- Learn new moves
- Gain new Abilities
- Replace abilities on Evolution

And besides that we have a couple QoL changes that we hope you'll enjoy!
### New Features
- New Level-Up Form that displays whenever a Pokemon Levels up (unless disabled)
- BaseStats Overwrite fields in the Extra Tab (Effect Path: `system.modifiers.baseStats.[STAT].mod`)
- Type Overwrite (only from effects, path: `system.modifiers.typeOverwrite` sample input for 3 types 'Grass', 'Fire' & 'Water': `Grass/Fire/Water`)

### Fixes
- Fixed some issues with the playtest where it appeared stats dropped on level-up

## Version 3.2.3.0 - Playtest Update
After some feedback we noticed that the stats may have been a bit overtuned. So we have decided to update the defaults

***this means you will have to manually update your settings*** to the new defaults, which are as followed:
- β should be 0.5
- σ should be 3.5

Please note that just updating these values in version 3.2.2.0 is not the same as there were also some other under-the-hood changes to the formula.

## Version 3.2.2.0 - Playtest Fix
It was detected that the σ modifier could make infinite stats under certain rare circumstances. 

## Version 3.2.1.0 - Playtest Fix
The playtest did not properly take Nature into account, also scaling on Trainers have been buffed to be more equal to mons.

## Version 3.2.0.0 - PTR Playtest 1
Hi all! Welcome to stable version 3.2, with it brings some new features as well as the first PTR Playtest!

### New Features
- The move 'Transform' will not actually transform your mon (and back) into whatever is targeted!
- Pokemon show held items in the side bar
- GMs can now block pokeballs from being thrown (option in settings)
- Added maneuvers to the sidebar (purely referential, no automation)
- Added a pop-up when a Pokemon levels up to ask whether it should learn new moves when applicable
- Added a 'Search' button to the Menu Bar (on the left).
- Search is part of PTR and will display PTR data. In the future we'll implement to-chat functionality.
- Trainer Sheets now show how many Feats/Edges you should have based on your level up (including the bonus edges at lvl 2, 6 & 12).
- Added ad-hoc modifier for Skill Checks just like you can do with moves/damage calc (hold shift when clicking).
- Added support for female images with the `f` prefix so f.e. `001f.png`
- Added HP Guidelines section to trainer sheets
- New design for Item Sheets & Item Icons!
- Consumable (food buff) items will now show in the sidebar and can be clicked to mark the item as 'Consumed' applying a food buff to the pokemon/target.
- Food buffs themselves can also be consumed (NOTE: this is purely for tracking purposes as no automation has been implemented yet)
- When a pokemon breaks out of a capture, a broken ball will automatically be added to the player character's inventory.

### Fixes
- Fixed an issue with ItemPiles compatability
- Fixed a style issue with certain items
- Fixed hovering over maneuvers not showing the details
- Actors have their token data linked by default now.
- Active Effects & Source pop-ups work and display as intended again.
- Item Sorting has been updated to v10 and should now no longer be wonky!
- Renamed 'Digestion Buff' to 'Food Buff'
- Fixed long names not wrapping in chat
- Removed 'Item Notes' as they were unnecessary
- Added 'Stealth' capability to the compendium
- Fixed crit button being ignored by the single-target applicator.
- Wishiwashi's art now generates properly depending on whether it's in solo or schooling form
- species-data.js has been updated with the latest changes from PTR-Data (99% finished)

### Playtests
Introducing PTR Playtests! For full details check the #playtests channel on the discord.

This version adds the "Stats & no-more BSR" Playtest, to enable check the new settings category in PTU Settings!


## Version 3.1.0.0 - V10 Support!
Hey Everyone! It's been a long time coming but we finally have an official v10 build available for you all to play around with.

Below follows a short overview of all updates, for more clear details check the detailed changelog in the discord / on our development branch:

### Breaking Changes: **MUST READ**
- This update may require you to clear your cache for it to work properly. Make sure every player runs ctrl+f5 on their browser before trying to run a game!
- The `game.ptu` namespace has been completely adepted. Any existing macros will most likely break. For help fixing your macros you can reach us in #sharing-macros on the discord.
- Custom Species storage has been updated and will be imported whenever a GM first loads the world (properly, see point 1 of this bullet list). In case of any doubts please reach us. In case of any import errors, old data will be kept in `game.settings.get("ptu", "customSpeciesBackup")`. Import is successfull once you see a chat message stating the same.

## New Features:
- Added Hisuian Dex & SwSh DLC Dexes
- Custom Species Backup system
- Allow for Dice Formulas in Ad-Hoc damage changes (Damage Bonus & Damage Reduction) (Hold shift while doing a move / applying damage)
- Add 'Skip to Combatant' right click context option to Combat Tracker
- Added >2 types compatibility with the CharacterMancer
- Added sort buttons for Dex Entry sorting in Player Sheets
- Added lots of new move animations (for use with Sequencer and the JB2A Patreon module)
- Type Boosters & Type Braces now apply their Damage Bonus / Reduction automatically

### Bug Fixes:
- Fixed Rotom's Tutor Moveset (Thanks `Ellam#6478`)
- Fix Stab on Pokemon with more than 2 typings
- Made it so that if you skip someone's turn, effects with a dialog will be able to be triggered again later in the same round
- Moves that always hit now show their dice roll for crit/effect purposes

## Version 2.1
Hey everyone! With the release of PTUVTT 2.1 we now have officially moved over to support Foundry V9!

And there are Loooooads of features and bug fixes that have been added in this version, as many beta versions were created before this stable release.
Because there are so many changes and basically everyone who is using the system has already been using the beta... Well, no real reason to consilidate them.
But in case you're wondering you're free to read the individual updates down below.

Up next we will start the 3.0 beta which will be for Foundry V10.
**Please be aware that if you stay on the Beta branch you WILL need to update your foundry to V10 starting the first v3 beta. So we recommend upgrading to stable until Foundry V10 has fully launched as a stable update.**

## 2.0-Beta-12 - All the PR Merges
Since this version will never actually go live and is just a changelog for you guys in the discord server... A quick update!

### New Features:
- Tools of the Trade have been automated for Pokeball Captures
- Added a custom type image setting for those that need it.
- Alt clicking a skill roll will consume 1AP to add +1 to a skill check.

### Bugfixes:
- Added 'Sticky Hold' capability.
- Fixed Quick Ball & Repeat Ball capture calculations.
- Pokeball Throws now take trainer accuracy into account.
- Dex entry settings have now been fully fixed and optimized.
- Fixed Double Strike moves during untargeted combat.

## 2.0-Beta-11 - Hotfix & Quick Feature
- Fixed an error in the move effectiveness calculation causing the sidebar to break.
- Added a 'Pokedex' button to 'dexentry' items.

### 11.2 - Hotfix
- Fixed issues with the new Pokedex Macro
- Fixed memory issues with new features.

## 2.0-Beta-10 - Small Features Part 3
...If you were wondering where the bugfixes went... Well that was Beta 9 :p

- Added a 'Total Wealth' display in a Trainer's inventory.
- Added more settings for Pokedex functionality
- Added the option to disable effectiveness calculation for sidebar (or base it on dex knowledge)
- Automatically add Pokemon to a trainer's dex tab when scanned with the Pokedex.

## 2.0-Beta-9 - Small Bugfixes
- Fixed a permission error in TokenMagicFX Integration
- Fixed "Apply Damage" not working on un-targeted attacks.
- Fixed "Damage Bonus" field in move items not being taken into account.

## 2.0-Beta-8 - Bugfixes and Small Features Part 2.
And another set of improvements and bugfixes.

### New Features
- Post a 'redo capture request' button in the chat if DM denies a capture / the request times out.
- Added back 'Hold shift for bonus damage' when executing a move.
- Add Pokedex button to sidebar, so you no longer have to turn it into a Macro!
- Made all 'PokeEdge Capability Training' work (through Active Effects where possible)

### Bugfixes
- Capture automation now works if TokenMagic is not installed
- Fixed Toxic Damage not applying properly
- Fixed Initiative no longer automatically updating
- Fixed "Next Turn" combat button not working for players.
- Fixed turning non-crits into crits not applying critical damage.

### Other Changes
- Capture automation doesn't force you to wait 10 years if you have animations turned off (or not installed)
- Cleaned up the Damage Applicator menu

## 2.0-Beta-7 - Struggle Menu is Back!
Well... It's been a while but finally the struggle menu is back!

**Please Note**: Struggles will not show in your 'moves' section on your sheet or in the side bar. But only under the 'Struggle' button of the side bar.
Please feel free to delete all struggles you own on Pokémon to clean out their sheets.

### Changes:
- Added 'Pokebot' Capability simulating the type effectiveness changes of a Pokebot
- Added Struggle Menu to the sidebar
- Struggle menu will show struggles based on the mon's capabilities.

## 2.0-Beta-6 - Bugfixes & Small Features Part 1.
Where did beta 5 go? No idea.

Either way! A quick and small update with a bunch of fixes thanks to Muhsigbokz#8821 over on Discord.
- Fixed Filter & Solid Rock both applying if added to the same Pokémon
- Fixed TM item descriptions being shuffled in the compendium (will not retroactively fix them in your actors / game world!!)
- Shiny chance now accepts decimal, enjoy making your shinies 0.00001% likely to happen! Or 99.99% and watch your players face in pure horror when they get that normal mon.
- Fixed an issue with Pin Missile and audio.
- Fixed some small issues with the TokensUpdate API for macro developers.

## 2.0-Beta-4
This update fixes a few bugs around Pokeball effects, as well as a significant revamp (thanks to Colton who spearheaded this) of the initiative system, adding support for Boss Initiative and League Initiative, as well as a UI toggle (checkmark/X) in the combat tracker that automatically checks off and fades-out actors in the list when they finish their turns, and skips up or down the list to the highest not-gone-yet actor when the turn is advanced if initiative has shuffled around due to speed changes or the like.

No more forgetting who's already gone after someone uses Agility and jumps around on turn order, you can just hit Next Turn and it'll figure it out for you!

## 2.0-Beta-2 - Hotfix
- Fixed issue where if an owner's id no longer exists you couldn't open a character sheet.
- Fixed small style issue in sidebar.

## 2.0-Beta-1
It's finally time for another big release everyone!

### Update Storytime
VoidPhoenix (the developer of the Move Master module for PTU) and I decided a couple weeks—if not months—ago to migrate Move Master as a core functionality of the PTU System!

I had always planned to have some implementation of a sidebar mechanic for the PTU system, but when Void first started work on the Move Master Module he just couldn't wait for me to get there so made it himself!

This however means that Move Master is a little... unstable. Don't take me wrong! Void did an amazing job making what he did, but because it wasn't fully integrated into the system, and didn't know its full scope at the start of the project it became unsustainable. 

But fear no longer!
As Move Master is now a main feature in the PTU for FoundryVTT system!

### The Actual Update
This is the first 2.0 Beta, where we have integrated a huge chunk of Move Master and improved upon all of the parts we have implemented.
Some of the features as of now are unfinished, and this might dissapoint some of you who enjoyed these features. But fear not, we will be adding them all back, better than ever before in one of the upcomming beta versions! The full timeline I'll describe down below.

#### V2.0 & V2.1 Timeline
Version 2.0 will contain the "basic" version of the PTU Sidebar, but will miss a couple of features. Most notably custom move/item effects.
For version 2.1 we will be implementing a new 'Effect' system where using a (hopefully) intuitive UI anyone can create dynamic move effects for all the automation and homebrew goodness. This system will however be pretty big, so we decided to turn these into seperate updates, so we can still get the majority of the new features & bugfixes out while we work on it.

**Move Master features that are missing for 2.0 but planned for 2.1**: 
- Move Effects
- (Use) Item Effects
- Orders
- Maneuvers

**Move Master features that are planned for 2.0 but not in the current beta**:
- Resting Automation
- Auto roll initative when new token is created during combat
- Struggle Menu

### The Actual Changelog
Oh- boi, this is 2 months worth of features... but here we go!
#### New Features:
- Integrated Move Master into PTU Main System.
- Added the 'Damage Applicator' chat message, allowing both GMs/Players to select how damage should be applied to targets.
- Item Icons & Pokemon Images are now included with the system. A 'lite' version without these will be released with the 2.0 update.
- Item Compendium has icons pre-assigned.
- Added seperate value/mod for the 'mod' and 'stage' fields of both Characters and Pokemon

#### New Features (Move Master)
These features were already in Move Master, but I've summarised them here for those who didn't use the module before:
- Add a Sidebar that shows when you have selected a token, displaying useful combat information.
- Automatically track Standard actions for conditions like Burn/Poison.
- Added Last Chance & Type Strategist automation.
- Added Double-Strike & Five-Strike Automation.
- Automated Stored Power & Punishment DB calculation.
- Automatically apply Technician.
- Added Automatic Injury Application (configurable in settings).
- Automatic Pokemon Capture mechanic, including calculation & transfering of ownership.
- Added SFX to moves & certain other actions.
- Added Animations for moves and certain other actions if [Sequencer](https://foundryvtt.com/packages/sequencer) and/or [Token Magic FX](https://foundryvtt.com/packages/tokenmagic/) is installed.
- Integration for [JB2A's Premium Animation Assets](https://www.patreon.com/JB2A) module with the above two modules.
- Added Automatic Item Icon Assignment whenever you open an item sheet with the default image set, if an image is found it will be set. (Configurable in settings)

#### Bugfixes:
- Fixed all bugs with the Owner field.
- Fixed infinite spiraling Burn/Poison stage dropping.
- Fixed Dex Experience not properly calculating.
- Fixed 'EditLock' flag on Effects not applying properly.
- Fixed several small style issues in Character Sheet.

## 1.5-Beta 15.4 - Owner Bug Hotfix
- Fixes the 'Owner' field on Pokemon.

## 1.5-Beta 15.3 - AE Bug Hotfix
- Fixed AEs not applying properly in Foundry v9

## 1.5-Beta 15 - Foundry 9 Compatibility (Hotfix)
A quick hotfix for a couple v9 compatibility bugs that slipped past the last patch:

- Fixed an issue where an error would prevent saving PTU Settings.
- Fixed an issue where players could not delete tokens.
- Fixed an error that occured when the user rolled damage on a move from the sheet.

## 1.5-Beta-14 - Foundry 9 Compatibility
Hey all, just two things for today.

- Migrated to Foundry core version 9
- Added support for .webm images during pokemon generation.

Thanks to VoidPhoenix#6487 for this update!

## 1.5-Beta-11 - 13 - Custom Typings!
Hey all! For the 2nd part of the Homebrew update I present: the Custom Type Editor!

Currently both the CSE & CTE are still lacking in some features, namely the species editor is missing evolution settings, while the type editor is missing a way to add your own images. Both of these will be added in an upcoming beta.
For now I thought I'd let you guys play around with the new CTE first!

- Added support for Custom Types using the Custom Type Editor.
- Existing type effectiveness can now be modded if so desired.

Please note: By default types are only updated on actors after a refresh, if you want to you can use the 'Sync Changes' button in the CTE to apply it to all currently logged in players (including yourself).
This however forces every single Pokémon in your game to refresh it's data, so if you have a lot of mons, this can create a lot of lagg. 

## 1.5-Beta-10
- Hotfix for 'null' typing showing up in mons with only a single type.

## 1.5-Beta-9 - Custom Species Editor Upgrade
Hi all! This is a bigger beta release as the CSE- Custom Species Editor, has received a complete overhaul!

- Added new Custom Species Editor.
- Added support for Moves & Abilities to the CSE.
- Added drag & drop support to the CSE for Moves, Abilities & Other Capabilities.
- Added support for mons with more than 2 types
- Replaced 'null' typing with 'Untyped' for internal calculations.

## 1.5-Beta-8 - Small Patch
- Fixed Evolution entries for some Pokémon that would break their generation.
- Added an option for the Virtuoso Dice Pool Limit to be ignored.

## 1.5-Beta-7 - Fixes & Small Enhancements
Today we have mostly bug fixes and small enhancements.

### Enhancements:
- Added Uranium & Sage dex Compendium.
- Skill dice pools now max out at 6 dice, so virutoso doesn't change the pool to 8d6.
- Moves with "--" initiative will now always hit.
- Blindness now applies the accuracy lowering debuff through AE instead of a hidden modifier.
- Throwing Mastery edge now has an AE that increases the Actor's throwing range capability by 2.

### Bugfixes:
- Fixed Darmanitan-Normal being unable to be generated.
- Fixed Move-snippets not working at all for Trainer Moves.

## 1.5-Beta-6 - Dex Drag-in Update
Hey everyone! It's been a while since I've last seen you guys. It's been about a month and a half since the last beta release, yikes!
Either way, I needed a summer break, but now I'm back and ready to continue work on the system. So expect more updates in the near future!

For today I've brought you changes in regards to the Dex Drag-In system courtesy of VoidPhoenix, thanks a ton man for adding these missing features, and sorry that it took a while before I could validate them haha.

### Dex Drag-In changes
- Newly generated actors are put in a folder with the same name as the current scene.
- Added support for (random) Shiny Generation.
- Added Level Range (min-max), Shiny Chance, Stat Randomness & Prevent Evolution options to the pop-up.
  - Default options can be set in settings.

### Other Changes
- Fixed Trainer AP not showing as a bar option.
- Automated Tangled Feet abilities.
- Added a default setting for what the Transfer Ownership api should set the "default" permission to.

## 1.5-Beta-5 - Bug Fixes Pt. 2
- Fixed allowing dex entries to be created multiple times on a sheet when dragged in from compendium.
- Fixed small error when transfer ownership API was being used with a PC that was not residing in any folder.
- Fixed Move Master breaking the Player Token Deletion operation due to editing main body classes.

## 1.5-Beta-4 - Bug Fixes
- Fix Accidentally deleting tokens when trying to press 'delete' or 'backspace' in a character sheet
- Add "Send to Chat" buttons to Pokémon & Trainer sheets for all items.
- Add prePlayerDeleteToken hook for module developers.
- Fixed some typos in settings.

## 1.5-Beta-3 - Move Origins
- Automatically guess the origin of a move on a Pokémon's sheet.
  - Whenever you add a move to a mon, it will check it's Level-Up, Egg, TM & Tutor list (in that order) to see how it is supposed to get this move, and set that as the assumed origin

## 1.5-Beta-2 - Where's Sentret?
- Added Sentret dex entry to compendium
- Fixed the 'ActorGenerator.Create' method to allow quick creation of actors that already exist.

## 1.5-Beta-1 - Auto Delete Volatile Conditions
- Volatile Conditions are now automatically removed at the end of Combat
  - This can be disabled in the settings.
- Combat now remembers who has joined a Combat, deleting flinch from all mons that participated, not those that are just currently on the field.
- Added the 'endOfCombat' hook with params: 'Combat, participantUuids[]'

## 1.5-Beta-0 - Release 1.4 Dev Branch
Welcome on the 1.5 dev branch, this is the exact same codebase as the 1.4.0 release.

## 1.4.0 - Foundry 0.8 Release!
Hey everyone! With the release of PTUVTT 1.4.0 we now have officially moved over to support Foundry 0.8.6!

While this version won't be adding as many new features as many of the other major system updates, Foundry 0.8 support in and off itself can be considered a main feature, as it brings lots of new improvements both for Players, GMs as well as system & module developers like myself!

Nonetheless, there are still some new features to the system, so please do read them down below!

### New Features
- Upgraded support for Foundry 0.8.6, and dropped support for foundry 0.7.*
- Effects applied to Embedded Documents such as Items can now apply effects to their parent.
f.e.: Skill Improvement (Acrobatics) Poké Edge has an effect with change key: '../data.skills.acrobatics.value.mod'
  - Both '../' and 'actor.' prefix allow manipulation of Parent
  - This works on any item type, and can be accessed through the 'effects' tab bar button
  - [**BREAKING**]: Please note that due to this all Skill Improvement edges will need to be re-added to an actor for the change to reflect in their sheet
- Dragging an Item on a Player Sheet which has the exact same name as an item already in the sheet, will now increase the Quantity of the old item, instead of adding a new entry.
- Players can now Delete their own Tokens in a Scene.
  - This can be turned off by GM in the System Settings screen.

### Bugfixes:
- Fixed Confusion always applying damage instead of flipping a coin, and applying the wrong amount of damage.
- Fixed Indeedee data error which made them unable to be generated.
- Fixed having combatants their initiative tiebreaker being set to .02 instead of the .20 it was, whenever their base init value was updated.

### Other:
- Item Categories are now collapsible, but won't remember their status when the sheet is updated.
- Completely overhauled the back-end of the Charactermancer allowing for much smoother development of new features for it.
- Added minor improvements to old charactermancer system, including a GM setting to disable evolution previews.
- Added the 'Execute-as-GM' api inspired by the [Bad Ideas Toolkit](https://foundryvtt.com/packages/bad-ideas-toolkit) allowing both the System and Module devs to make use of GM Escalation for handling automation. For api info see [api.js](https://github.com/dylanpiera/Foundry-Pokemon-Tabletop-United-System/blob/master/module/api/api.js#L232)

## 1.3.2 - Fix Combat Visibility
- Fixed invisible combat tokens... well, becoming invisible from the GM!

## 1.3.1 - Firefox Compatability Fix
- Fixed a compatability issue with Firefox when it came to the new Inventory system
- Fixed some CSS to make things look a bit better in Firefox
- Added Legendary property to species data for use in Macros

## 1.3.0 - Automation & Quality of Life
### Overview
Update 1.3.0 will be the final update released for Foundry 0.7.9, as after this update I will be focusing my full attention to updating the system to Foundry 0.8.*
But, let us talk about the update, shall we! It's been 2 months in the making after all.

This update was all focused around Automation & Quality of Life features, adding things like combat damage calculation, status effect automation, active effects implementations, and much more.
There are a lot of 'hidden' features present, and also some experimental ones. But I hope you enjoy this update while I work on upgrading to 0.8 regardless!

### New Feature Overview
- Moves & the Pokédex item now have macrobar support.
- Initiative is now dynamically updated in Combat when it or any stats it is derrived from are changed.
- Training Options & Orders are now present.
- Added save checks that are automatically rolled in Combat for Status Effects.
- Added inventory categorization for trainers.
- Added a new Settings Menu specifically for PTU.
- Added an experimental and basic version of the Pokémon Charactermancer.
- And added lots and lots of modifier fields.

### New Trainer Features
- Added Item Categories for trainer sheets.
  - You can simply drag an item between categories, or edit an item's category property.
  - Manually editing an item allows you to create a new Category by simply giving it a category that doesn't exist yet.
- The Pokédex Item can now be dragged on the Macro Bar to be used on Pokémon.
  - Behavior can be configured in settings by DM.
- Added Notes section to sheet.

### New Pokémon Features
- Hardened condition is now fully implemented.
- Added Trainings & Orders, that apply as Active Effects.
- Added a Pokéball field in the Extra tab to keep track of how you caught a mon.
- Added an experimental version of the Charactermancer, allowing you to more easily create Pokémon. Currently implemented:
  - Species / Id selection
  - Exp / Level calculation
  - Evolution Detection based on Level
  - Nature Selection
  - Stat Selection based on Level
  - Data Restore upon improper closing
- Added the Owner field.
- Added a GM only Loyalty field.

### New Modifiers
- (Almost) All fields that can (and should) be modified will show you the 'history' of the modification, based on what is affecting this value.
- Added Damage Modifier & Damage Reduction modifiers.
- Added Effect Range Field (doesn't do anything, just for you to keep track)

### New Combat Features
- Token Effects have been replaced with PTU Status Effects.
- Status Effects will automatically do start/end of turn effects while in Combat.
  - Status Effects with a duration will also automatically be deleted when appropriate.
- Initiative Dynamically updates if a stat / property that affects it is changed for an Actor
- Added League Battle option in a Combat's settings, which makes Trainers go in reverse order before Pokémon.
  - Requires a re-roll if enabled after trainer rolled initiative.

### New Game Master Features
- Added Habitat Rollable Compendium to be used for randomly generating encounters
  - To make use of this with the /ptug command, please import all of the tables to the game world first.

### Other New Features & 'Secrets'
- Added Effects tab allowing you to create custom ActiveEffects or suspend active ones temporarily.
  - For examples, give your Pokémon Trainings and see how they're applied. Alternatively, ask on the [Discord!](https://discord.gg/fE3w59q)
- Holding shift & alt, while rolling a move, will allow you to add a 1x damage modifier to the roll.
- Holding shift while clicking the Apply Damage button from a move in the chat will allow you to apply a 1x damage reduction to the roll.

### Bugfixes
- Fixed the Darumaka Line not generating properly due to Darmanitan not being oh so zen about things.
- Fixed Stonjourner... just not existing... Like it wasn't there, at all... But now it is!
- Pressing enter/return in a sheet no longer will randomly roll abilities/save checks.
- Re-removed 'The Furnace' dependency. (Still recommended however)
- 'imgpath' parameter properly works again with /ptug command.
- Pokémon generated with 'imgpath' now will use relative path instead of absolute.
- Made Temp HP bar available as Token Bar 

### API Features
- Added 'turnEnd' 'turnStart' and 'roundEnd' hooks.
- [**BREAKING**]: 'data.health.temp' has now moved to 'data.tempHp'

## 1.2.0 - Combat Automation, Pokémon Generation & Much more!
### Combat Automation
- Added a 'Deal Damage' button to Attack Chat Messages, which applies the damage of that move to all selected tokens.
  - Also added an Undo button for the applied damage.

### Pokémon Generation
- **Big Change!** DM Quick-Pokémon Generation

DMs can now quickly generate Pokémon for random encounters using the chat! For more info see the [wiki](https://github.com/dylanpiera/Foundry-Pokémon-Tabletop-United-System/wiki/Pokémon-Generation-using-Chat-Commands).
- This also works by Dragging & Dropping dex entries right into the battle field! Creating tokens where needed.

### Quality of Live Improvements
- Charactermancer Species field now has Autocomplete.
- Added a 'Send to Chat' button to all items.
- Added a 'Owner' field on mon sheets that allows you to link your mons to your character sheet.
  - Also added an 'Open Owner' button if an owner has been selected.
  - Owners is purely meant for trainers at the moment, and therefore will only show PCs as options that the Owner of the mon also owns.
- Added a Shiny field for all your capture calc needs.
- Add 'Notes' to Character & Pokémon sheets, for your own record keeping!
- Added Sage & Uranium Fangame Dexes as well as all their suplemental moves/abilities/etc.
- Added system settings in regards to Audio for Module usage.

### Bugfixes
- HP can now go into the negatives, for all your taskmaster needs.
- Temp HP Calculations are now applied properly to Token Actors as well.
- Added all Oricorio Forms
- Fixed Overland Capability calculation, you weaklings are now properly weak.
- Fixed the Intimidate skill for attempting to be a Noun.
- Fixed custom moves not displaying a name in chat.

### API Changes:
- Added easy caching of data using `game.ptu.cache.GetOrCreateCachedItem()`
- Added `ptu.finishedGeneratingMons` hook
- Added `ptu.preSendItemToChat` & `ptu.SendItemToChat` hooks as well as variants for moves.

## 1.1.0 - QoL & Bugfixes
### Quality of Live Changes
- Dex Drag & Drop now uses the mon's Name instead of the mon's National Dex ID.
- Added Snippet option for Move Effects
  - Full Effects show on hover.
- Added 2 new options for DMs to pick how they want move rolls to display in the chat
  - Combat Roll Preference: Choose whether the move effect should be displayed when rolling To-Hit/Damage.
    - Show damage situationally (if the hit is a crit it displays as such, and vice-versa)
    - Always roll normal
    - Always roll Crit
    - Always roll both
  - Combat Description Preference: Choose whether the move effect should be displayed when rolling To-Hit/Damage.
    - Don't show move effects
    - Show move snippet data, or nothing
    - Show move snippet data, or full effect
    - Show full effect
- Updated settings menu font to be more readable.
- Added font accessability option.

### Bug Fixes
- Fixed Dex Entries not being editable
- Fixed Stages not applying properly to Trainer Stats
- Fixed an issue that caused an infinite background reload job to happen when loading custom species, affecting performance greatly.
  - NOTE: If a player logs into foundry without a DM present, custom species won't load until a DM logs in.

### Modding Tool Updates
- Actor now loads all data on [prepareDerivedData]. Making it possible to apply Active Effects to actor stats.
- Effectiveness now has an easy to use [All] property for use in Macros

## 1.0.0 - Version 1!
- Added automated release cycle
  - There is a beta branch available, for more info see [README.md](https://github.com/dylanpiera/Foundry-Pokémon-Tabletop-United-System/blob/master/README.md)
- Added in-foundry copy of this very Changelog!
- Reworked README.md to better reflect our V1 release! 

## 0.0.50 - Scrollable Move Effects
- Move effects may now show up with scrollbars if their effect text is deemed too long.

## 0.0.49 - Temporary HP
- Added Temporary HP field to Character Sheet
- Token HP bar calculations automatically use Temp HP
  - f.e: If your Max HP is 50, and you set it to 60, it will set your HP to 50 and give you 10 Temp HP
  - or: If you have 50 HP, 5 Temp HP & apply -7HP to your token health bar, your Temp HP is set to 0, and your current HP set to 48.
  - NOTE: While Temp HP is used in token bar calculations, Temp HP can't currently be displayed on a token, only in the char sheet.

## 0.0.46 - 0.0.48 - Pokedex Support
- Added the Dex tab to Trainer Sheets
- Added a new Compendium with Dex Entries to provide bonus flavor to your game. (Source: https://www.theworldofpokemon.com/)
- Automated DexEXP based on amount of owned mons in your dex.
- Added Digestion Buff field to Trainers & Pokémon
- Added a quick way to change your species using the new dex entries!
  - Drag & Drop a dex entry ontop of a Pokémon sheet to update your mons species to that of the dex entry's

## 0.0.45 - Firefox Support
- Fixed an issue with the Sheet-Footer making it so Firefox users can't interact with any sheet.

## 0.0.44 - Padding!
- Quick Padding fix to all items.

## 0.0.43 - Custom Species Editor Bugfix
- Fixed error when creating a new mon from a blank slate
- Fixed display error with Naturewalk

## 0.0.40 - 0.0.42 - Trainer Sheet
- Updated the Gen 4 Trainer Sheet to match the Pokémon's Gen 8 Trainer Sheet
- Added missing elements from gen 4 Trainer Sheet that where present in the Gen 8 Pokémon sheet, such as Moves & Capabilities.
- Added 'Snippet' as possible field on most items, allowing you to set a small description on feats/abilities etc. to display on your character sheet
- Added an option always unfold all items in a sheet, see system settings.
- Added an option to allow or disallow dexexp for trainers, see system settings.
### Notes
- Some specific features such as 'Equipment' or 'Augments' etc. are not yet present and will be added later in V2
- Some classes/feats/etc. may give a player STAB on certain types of moves. This currently isn't supported, however you can manually increase the DB on moves that should have the +2 stab bonus applied.
- [BREAKING]: With the nearing 1.0 update the gen 4 sheets will be officially deprecated, so I suggest moving over to the new types of sheets if you haven't yet!

## 0.0.39 - Species stats alter stats
- Speed CS now alter movement capabilities
- Added Evasion Modifier fields.
- Fixed bug where advanced mobility didn't properly apply to custom species mons

## 0.0.35 - 0.0.38 - Custom Species Editor
### Features
- Added new Custom Species Editor which can be found in the System Settings tab next to the system name.
- [MACRO BREAKING] Changed CustomSpecies to now be a seperate entity instead of being combined into the Base Species pool.
### Bugfixes
- Fixed issues created by Hotfix 0.0.34
- Fixed issues where custom species data wouldn't load in properly
  - This may still occur if no GM is in the game, but should fix itself instantly upon a GM joining the game.
### Notes
- This update requires a GM to load into the game for migrations to apply properly. Players may face errors if they join before any GM has joined, and will have to reload to fix those issues after a GM has loaded the game for the first time.
- Old CustomSpecies data will be migrated over automatically. After migration feel free to delete the old json file as it's no longer being used.

## 0.0.34 - Hotfix: Stab Modifier
- Fixed stab modifier not applying properly.
- Update Foundry Version to 0.7.7

## 0.0.33 - Shortcuts!
- Added shortcuts to the move dialog pop-up. By holding down Shift, Ctrl or Alt while clicking on the roll button it will select the different options of the dialog box.

## 0.0.32 - Move System Overhaul
- 'To-Hit' and 'Damage' messages now have a custom layout.
- Added a new dialog when using a Move
    - Perform Move: Rolls To-Hit & Damage and displays it in the chat
    - Show Details: Shows detailed information about the move to the chat
    - Roll Damage: Only roll Damage, with the option to roll Critical Damage
- Added a Changelog so people actually know what is happening when I post an update!

## 0.0.31 - Sheet Permissions
- Added a new world setting for DMs that allow players with limited/observer permissions on a Pokémon sheet to see all the tabs.
- Updated System Compatability to Foundry Version 0.7.6

## 0.0.30 - Furnace Hotfix
- Removed the requirement of 'The Furnace' addon

## 0.0.29 and earlier
- Loads of stuff that isn't important here or now.