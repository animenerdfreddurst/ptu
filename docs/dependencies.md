# Project Dependencies (and what they are used for)

## jQuery UI (js/jquery-ui.js, css/jquery-ui.css)

**Purpose:** Autocomplete functionality (`.autocomplete(...)`) is used for:
- Character sheet: Held item input
- Pokemon sheet: Held item + Pokeball inputs  
- Charactermancer: Species field

**Note:** Icon CSS rules are unused (and broken as pngs are missing) but harmless. Autocomplete styling is custom (css/character-sheet.css).  

## System name  
To change the system name (or repo name) the system must be reconfigured in a few places:  
1. The centralized paths config `src/module/config/paths.js`  
    - The `SYSTEM_ID` property of `SystemPaths` must be changed
2. The foundry system file `static/system.json`
    - `id` must be changed. `title` should probably be changed as well but I don't think anything will break if you don't
3. In `vite.config.ts`  
    - `config.base` and `config.server.proxy`
4. The file name within the foundry systems directory
    - must match the id in `static/system.json`