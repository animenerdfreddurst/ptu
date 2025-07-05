# PTU System - Pokemon Tabletop United

(Soon to be Pokemon Carbon)

A modernized Pokemon Tabletop TTRPG system for FoundryVTT

## Contributors

- **animenerdfreddurst** - [GitHub](https://github.com/animenerdfreddurst)
- **Highmongrel** - [GitHub](https://github.com/Highmongrel)
- **npaisley** - [GitHub](https://github.com/npaisley)

## Quick Start

### For Players/GMs (Just Using the System)

If you just want to use the system in your Foundry game:

1. **Install from Release**: Import this manifest into Foundry:

    ```
    [Release manifest URL will go here when available]
    ```

2. **Install from Development**: For the latest features:
    ```
    [Development manifest URL will go here when available]
    ```

### For Developers

#### Prerequisites

- Node.js (version 16 or higher)
- FoundryVTT installed locally

#### Development Setup

1. **Clone the repository**:
Important: You must clone this repo to somewhere other than your foundry systems folder or step 3 will not work.  

    ```
    git clone https://github.com/animenerdfreddurst/ptu
    cd ptu
    ```

2. **Install dependencies**:

    ```
    npm install
    ```

<!-- 3. **Configure Foundry path**:  
   Note: Skip this step if you're using the default foundry install locations  
   Edit `scripts/make_foundry_symlink.js` to point to your Foundry VTT data directory (for your relevant platform) -->

3. **Initial setup**:  
    Builds the dist directory and symlinks it to your foundry systems folder  

    ```
    npm run dev-setup
    ```

4. **Start development server**:
    ```powershell
    npm run dev
    ```

##### Notes
- Use `npm run build` if you just want to build teh system and use it  
- DO NOT edit any files in `dist/`. Any edits you make here will be overwritten. To make changes edit the respective files in `src/` or `public/`.


#### Available NPM Scripts

| Command               | Description                               |
| --------------------- | ----------------------------------------- |
| `npm run dev`         | Start development server with hot reload  |
| `npm run build`       | Build production version to `dist/`       |
| `npm run build-watch` | Build in watch mode (rebuilds on changes) |
| `npm run preview`     | Preview production build                  |
| `npm run link-system` | Create symlink to Foundry systems folder  |
| `npm run dev-setup`   | Build and link system (one-time setup)    |

#### Project Structure
- Any edits to files in `src/` will be hot-reloaded by vite  
- Any edits to files in `public/` require a rebuild (or use of `npm run build-watch`)  

```
├── src/                        # Source files (main development area)
│   ├── main.js                 # Main entry point
│   ├── css/                    # Stylesheets
│   └── module/                 # Core system modules
│       ├── actor/             # Actor classes and sheets
│       ├── item/              # Item classes and sheets
│       ├── combat/            # Combat system
│       ├── data/              # Static data (species, moves, etc.)
│       ├── forms/             # Dialog forms and UI
│       ├── utils/             # Utility functions
│       └── api/               # API and components
├── public/                     # Static assets
│   ├── assets/                # Images, sounds, fonts
│   │   ├── images/           # System artwork
│   │   ├── sounds/           # Audio files
│   │   └── fonts/            # Custom fonts
│   ├── data/                  # JSON data files
│   ├── lang/                  # Localization files
│   ├── packs/                 # Compendium databases
│   └── templates/             # Handlebars templates
├── dist/                      # Built system (auto-generated)
├── scripts/                   # Build scripts
└── docs/                      # Documentation
```

#### Making Changes

- **Actor/Character sheets**: Edit files in `src/module/actor/`
- **Items and equipment**: Edit files in `src/module/item/`
- **Combat mechanics**: Edit files in `src/module/combat/`
- **UI and forms**: Edit files in `src/module/forms/`
- **Styling**: Edit `.less` files in `src/css/`
- **Templates**: Edit `.hbs` files in `public/templates/`
- **Static data**: Edit JSON files in `public/data/`

#### Development Workflow

1. Make changes to files in `src/`
2. Vite will automatically rebuild and reload in browser
3. Test changes in your local Foundry instance
4. Commit changes when ready

#### Building for Release

1. **Build production version**:

    ```
    npm run build
    ```

<!-- 2. **Test the build**:

    ```
    npm run preview
    ``` -->

2. The `dist/` folder contains the complete system ready for distribution

## Features
Features may or may not include:
- SwSh Inspired Character Sheets
- Combat Support with automated calculations
- Drag & Drop support for all item types
- Custom species and typing editors
- Automated stat calculation
- Movement tracking and initiative automation
- Sound effects and Pokemon cries
- Single-language support

## Current System Features

- **Combat Automation**: Initiative tracking, map movement, automated temp HP, to-hit & damage rolls
- **Character Management**: Automated stat calculation based on species base stats
- **Content Creation**: Custom species editor and custom typing editor
- **Item Support**: Full drag & drop for Abilities, Capabilities, Dex Entries, Edges, Features, Moves & Poké Edges
- **Audio**: Pokemon cries and battle sound effects
- **Localization**: Multi-language support

## Compatibility

- **Foundry VTT**: v10 (minimum) - v10.312 (verified)
- **Node.js**: v16+ for development

---

## Original Project Information

_This section contains information from the original forked repository:_

[![foundry-shield]][foundry-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![All Release Downloads](https://img.shields.io/github/downloads/dylanpiera/Foundry-Pokemon-Tabletop-United-System/total.svg)]()

### PTR System (Original)

The Pokemon Tabletop Reunited system for FoundryVTT is a continuiation of the Pokemon Tabletop United system, with balance changes, and new content, created with FoundryVTT in mind.

For any questions, feel free to open an issue or message me on Discord: AsheEon#0380.
You can also join our Discord Server for any questions & feedback: https://discord.gg/ZTFfKYDxZf

### Original Installation

#### Release Build

If you would like to use the latest stable build, just import the following manifest into foundry:
`https://github.com/dylanpiera/Foundry-Pokemon-Tabletop-United-System/releases/latest/download/system.json`

#### Beta Build

If you would like to have the latest features, or would like to help find us any bugs in the system, you can also try out Beta version by instead using the following manifest:
`https://github.com/dylanpiera/Foundry-Pokemon-Tabletop-United-System/raw/development/system.json`

### Images

Player Character Sheet
![character sheet image](https://cdn.discordapp.com/attachments/429729503149817856/801897991715029002/character-sheet.gif 'Character Sheet Preview')

Pokemon Sheet
![pokemon sheet image](https://media.discordapp.net/attachments/429729503149817856/801896273473044540/pokemon-sheet.gif 'Pokemon Sheet Preview')

Custom Species Editor (V1, UI WIP)
![custom species editor image](https://cdn.discordapp.com/attachments/429729503149817856/801898798816296980/custom-species-editor.gif 'Custom Species Editor Preview')

Drag & Drop Support Example
![drag & drop support](https://cdn.discordapp.com/attachments/429729503149817856/801898068530167829/drag-and-drop.gif 'Drag & Drop Preview')

### Links & Recommendations

- [Quick Insert](https://gitlab.com/fvtt-modules-lab/quick-insert) is an amazing addon that allows you to drag & drop all over the place even more easily. We 1000% recommend using their module in conjuncture with our system!
- [Version 2 QOL Features & Bug Issues](https://github.com/dylanpiera/Foundry-Pokemon-Tabletop-United-System/issues?q=is:open+is:issue+milestone:%22Version+2%22)
- [Version 2 Charactermancer Issues](https://github.com/dylanpiera/Foundry-Pokemon-Tabletop-United-System/issues?q=is:open+is:issue+milestone:Charactermancer)
- [Version 3 Issues](https://github.com/dylanpiera/Foundry-Pokemon-Tabletop-United-System/issues?q=is:open+is:issue+milestone:%22Automated+Combat+System%22)
- [Wiki](https://github.com/dylanpiera/Foundry-Pokemon-Tabletop-United-System/wiki) (currently WIP)

### Special Thanks

- [cswendrowski](https://github.com/cswendrowski) for starting this project!
- https://www.theworldofpokemon.com/ for their amazing pokedex entries
- The Amazing People and their amazing feedback, over at the [FVTTPTU Dev Server](https://discord.gg/fE3w59q)

## Copyright

Pokémon © 2002-2023 Pokémon. © 1995-2023 Nintendo/Creatures Inc./GAME FREAK inc. TM, ® and Pokémon character names are trademarks of Nintendo.
No copyright or trademark infringement is intended in using Pokémon content for the PTU for FoundryVTT System.

[foundry-shield]: https://img.shields.io/badge/Foundry-v10.291-informational
[foundry-url]: https://foundryvtt.com/
[forks-shield]: https://img.shields.io/github/forks/dylanpiera/Foundry-Pokemon-Tabletop-United-System.svg?style=flat-square
[forks-url]: https://github.com/dylanpiera/Foundry-Pokemon-Tabletop-United-System/network/members
[stars-shield]: https://img.shields.io/github/stars/dylanpiera/Foundry-Pokemon-Tabletop-United-System.svg?style=flat-square
[stars-url]: https://github.com/dylanpiera/Foundry-Pokemon-Tabletop-United-System/stargazers
[issues-shield]: https://img.shields.io/github/issues/dylanpiera/Foundry-Pokemon-Tabletop-United-System.svg?style=flat-square
[issues-url]: https://github.com/dylanpiera/Foundry-Pokemon-Tabletop-United-System/issues

[![foundry-shield]][foundry-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![All Release Downloads](https://img.shields.io/github/downloads/dylanpiera/Foundry-Pokemon-Tabletop-United-System/total.svg)]()

# PTR System

The Pokemon Tabletop Reunited system for FoundryVTT is a continuiation of the Pokemon Tabletop United system, with balance changes, and new content, created with FoundryVTT in mind.

For any questions, feel free to open an issue or message me on Discord: AsheEon#0380.
You can also join our Discord Server for any questions & feedback: https://discord.gg/ZTFfKYDxZf

## How to Install

#### Release Build

If you would like to use the latest stable build, just import the following manifest into foundry:
`https://github.com/dylanpiera/Foundry-Pokemon-Tabletop-United-System/releases/latest/download/system.json`

#### Beta Build

If you would like to have the latest features, or would like to help find us any bugs in the system, you can also try out Beta version by instead using the following manifest:
`https://github.com/dylanpiera/Foundry-Pokemon-Tabletop-United-System/raw/development/system.json`

## Current Features

- SwSh Inspired Character Sheets
- Combat Support
- Including: Initative Tracker, Map Movement Rules, Automated Temp HP, Automated To-Hit & Damage Rolls
- Automated stat calculation based on species base stats
- Custom species editor
- Drag & Drop support for Abilities, Capabilities, Dex Entries, Edges, Features, Moves & Poké Edges
  and much more...

### Images

Player Character Sheet
![character sheet image](https://cdn.discordapp.com/attachments/429729503149817856/801897991715029002/character-sheet.gif 'Character Sheet Preview')
Pokemon Sheet
![pokemon sheet image](https://media.discordapp.net/attachments/429729503149817856/801896273473044540/pokemon-sheet.gif 'Pokemon Sheet Preview')
Custom Species Editor (V1, UI WIP)
![custom species editor image](https://cdn.discordapp.com/attachments/429729503149817856/801898798816296980/custom-species-editor.gif 'Custom Species Editor Preview')
Drag & Drop Support Example
![drag & drop support](https://cdn.discordapp.com/attachments/429729503149817856/801898068530167829/drag-and-drop.gif 'Drag & Drop Preview')

## Links & Recommendations

- [Quick Insert](https://gitlab.com/fvtt-modules-lab/quick-insert) is an amazing addon that allows you to drag & drop all over the place even more easily. We 1000% recommend using their module in conjuncture with our system!
- [Version 2 QOL Features & Bug Issues](https://github.com/dylanpiera/Foundry-Pokemon-Tabletop-United-System/issues?q=is:open+is:issue+milestone:%22Version+2%22)
- [Version 2 Charactermancer Issues](https://github.com/dylanpiera/Foundry-Pokemon-Tabletop-United-System/issues?q=is:open+is:issue+milestone:Charactermancer)
- [Version 3 Issues](https://github.com/dylanpiera/Foundry-Pokemon-Tabletop-United-System/issues?q=is:open+is:issue+milestone:%22Automated+Combat+System%22)
- [Wiki](https://github.com/dylanpiera/Foundry-Pokemon-Tabletop-United-System/wiki) (currently WIP)

## Special Thanks

- [cswendrowski](https://github.com/cswendrowski) for starting this project!
- https://www.theworldofpokemon.com/ for their amazing pokedex entries
- The Amazing People and their amazing feedback, over at the [FVTTPTU Dev Server](https://discord.gg/fE3w59q)

## Copyright

Pokémon © 2002-2023 Pokémon. © 1995-2023 Nintendo/Creatures Inc./GAME FREAK inc. TM, ® and Pokémon character names are trademarks of Nintendo.
No copyright or trademark infringement is intended in using Pokémon content for the PTU for FoundryVTT System.

[foundry-shield]: https://img.shields.io/badge/Foundry-v10.291-informational
[foundry-url]: https://foundryvtt.com/
[forks-shield]: https://img.shields.io/github/forks/dylanpiera/Foundry-Pokemon-Tabletop-United-System.svg?style=flat-square
[forks-url]: https://github.com/dylanpiera/Foundry-Pokemon-Tabletop-United-System/network/members
[stars-shield]: https://img.shields.io/github/stars/dylanpiera/Foundry-Pokemon-Tabletop-United-System.svg?style=flat-square
[stars-url]: https://github.com/dylanpiera/Foundry-Pokemon-Tabletop-United-System/stargazers
[issues-shield]: https://img.shields.io/github/issues/dylanpiera/Foundry-Pokemon-Tabletop-United-System.svg?style=flat-square
[issues-url]: https://github.com/dylanpiera/Foundry-Pokemon-Tabletop-United-System/issues
