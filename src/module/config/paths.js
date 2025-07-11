//TODO look over and implement
import path from 'path'

/**
 * System file path configuration
 * Provides centralized path and url management for the pokemon carbon system
 *
 * Usage:
 *   SystemPaths.paths.images      // "systems/ptu/assets/images"
 *   SystemPaths.urls.images       // "/systems/ptu/assets/images/"
 *   SystemPaths.paths.pokemonSprites  // "systems/ptu/assets/images/pokemon_sprites"
 *   SystemPaths.urls.pokemonSprites   // "/systems/ptu/assets/images/pokemon_sprites/"
 */
export class SystemPaths {
    // Frozen object prevents modification (immutable)
    static PATHS = Object.freeze({
        // Base directories
        FOUNDRY_BASE: 'systems',
        SYSTEM_ID: 'pokemon_carbon', // or 'pokemon_carbon' if renaming

        // Asset directories
        ASSETS: 'assets',
        IMAGES: 'images',
        FONTS: 'fonts',
        SOUNDS: 'sounds',

        // Code directories
        MODULE: 'module',
        CSS: 'css',

        // Data directories
        DATA: 'data',
        JSON: 'json',
        LANG: 'lang',
        PACKS: 'packs',
        TEMPLATES: 'templates',

        // Image subdirectories
        ICONS: 'icons',
        POKEMON_SPRITES: 'pokemon_sprites',
        ITEM_ICONS: 'item_icons',
        TYPES: 'types',
        CATEGORIES: 'categories',

        // Template subdirectories
        ACTOR_TEMPLATES: 'actor',
        ITEM_TEMPLATES: 'item',
        CHAT_TEMPLATES: 'chat',
        FORM_TEMPLATES: 'forms',
        PARTIAL_TEMPLATES: 'partials',
        SIDEBAR_TEMPLATES: 'sidebar',

        // Sound subdirectories
        BATTLE_SOUNDS: 'battle_sounds',
        UI_SOUNDS: 'ui_sounds',
        POKEBALL_SOUNDS: 'pokeball_sounds',
    })

    /**
     * Convert a file system path to a web URL
     * @param {string} filePath - File system path
     * @returns {string} Web URL with leading and trailing slashes
     */
    static #pathToUrl(filePath) {
        return (
            '/' + filePath.replace(/\\/g, '/').replace(/^\/+|\/+$/g, '') + '/'
        )
    }

    /**
     * for partial system upgrade only
     * I future transition to using full path or url getters
     * @returns {string} current system ID
     */
    static get systemId() {
        return this.paths.SYSTEM_ID
    }

    // Base computed paths
    static get #systemBase() {
        return path.join(this.PATHS.FOUNDRY_BASE, this.PATHS.SYSTEM_ID)
    }

    static get #assets() {
        return path.join(this.#systemBase, this.PATHS.ASSETS)
    }

    static get #images() {
        return path.join(this.#assets, this.PATHS.IMAGES)
    }

    static get #fonts() {
        return path.join(this.#assets, this.PATHS.FONTS)
    }

    static get #sounds() {
        return path.join(this.#assets, this.PATHS.SOUNDS)
    }

    static get #data() {
        return path.join(this.#systemBase, this.PATHS.DATA)
    }

    static get #templates() {
        return path.join(this.#systemBase, this.PATHS.TEMPLATES)
    }

    static get #module() {
        return path.join(this.#systemBase, this.PATHS.MODULE)
    }

    static get #css() {
        return path.join(this.#systemBase, this.PATHS.CSS)
    }

    // Public path access
    static get paths() {
        return Object.freeze({
            // Base paths
            systemBase: this.#systemBase,
            assets: this.#assets,

            // Asset directories
            images: this.#images,
            fonts: this.#fonts,
            sounds: this.#sounds,

            // Specific image directories
            icons: path.join(this.#images, this.PATHS.ICONS),
            pokemonSprites: path.join(this.#images, this.PATHS.POKEMON_SPRITES),
            itemIcons: path.join(this.#images, this.PATHS.ITEM_ICONS),
            types: path.join(this.#images, this.PATHS.TYPES),
            categories: path.join(this.#images, this.PATHS.CATEGORIES),

            // Data directories
            data: this.#data,
            json: path.join(this.#systemBase, this.PATHS.JSON),
            lang: path.join(this.#systemBase, this.PATHS.LANG),
            packs: path.join(this.#systemBase, this.PATHS.PACKS),
            templates: this.#templates,

            // Template subdirectories
            actorTemplates: path.join(
                this.#templates,
                this.PATHS.ACTOR_TEMPLATES
            ),
            itemTemplates: path.join(
                this.#templates,
                this.PATHS.ITEM_TEMPLATES
            ),
            chatTemplates: path.join(
                this.#templates,
                this.PATHS.CHAT_TEMPLATES
            ),
            formTemplates: path.join(
                this.#templates,
                this.PATHS.FORM_TEMPLATES
            ),
            partialTemplates: path.join(
                this.#templates,
                this.PATHS.PARTIAL_TEMPLATES
            ),
            sidebarTemplates: path.join(
                this.#templates,
                this.PATHS.SIDEBAR_TEMPLATES
            ),

            // Code directories
            module: this.#module,
            css: this.#css,
        })
    }

    // Public URL access
    static get urls() {
        const pathsObj = this.paths
        return Object.freeze(
            Object.fromEntries(
                Object.entries(pathsObj).map(([key, path]) => [
                    key,
                    this.#pathToUrl(path),
                ])
            )
        )
    }

    // Utility methods for specific asset types

    /**
     * Get a pokemon sprite URL by ID
     * @param {string|number} id - Pokemon ID
     * @param {boolean} shiny - Whether to get shiny sprite
     * @returns {string} Sprite URL
     */
    static getPokemonSpriteUrl(id, shiny = false) {
        const suffix = shiny ? 's' : ''
        return `${this.urls.pokemonSprites}${id}${suffix}.webp`
    }

    /**
     * Get a type icon URL
     * @param {string} type - Pokemon type name
     * @param {boolean} flipped - Whether to get flipped version
     * @returns {string} Type icon URL
     */
    static getTypeIconUrl(type, flipped = false) {
        const suffix = flipped ? '_Flipped' : ''
        return `${this.urls.types}${type}IC${suffix}.png`
    }

    /**
     * Get an item icon URL
     * @param {string} itemName - Item name (lowercase, spaces preserved)
     * @returns {string} Item icon URL
     */
    static getItemIconUrl(itemName) {
        const filename = itemName.toLowerCase().replace(/\s+/g, ' ')
        return `${this.urls.itemIcons}${filename}.webp`
    }

    /**
     * Get battle sound URL
     * @param {string} soundName - Sound filename without extension
     * @returns {string} Sound URL
     */
    static getBattleSoundUrl(soundName) {
        return `${this.urls.sounds}${this.PATHS.BATTLE_SOUNDS}/${soundName}.mp3`
    }

    /**
     * Get UI sound URL
     * @param {string} soundName - Sound filename without extension
     * @returns {string} Sound URL
     */
    static getUiSoundUrl(soundName) {
        return `${this.urls.sounds}${this.PATHS.UI_SOUNDS}/${soundName}.wav`
    }

    /**
     * Get pokeball sound URL
     * @param {string} soundName - Sound filename without extension
     * @returns {string} Sound URL
     */
    static getPokeballSoundUrl(soundName) {
        return `${this.urls.sounds}${this.PATHS.POKEBALL_SOUNDS}/${soundName}.mp3`
    }

    /**
     * Get template URL
     * @param {string} templateName - Template filename (with .hbs extension)
     * @param {'actor'|'item'|'chat'|'form'|'partial'|'sidebar'} category - Template category
     * @returns {string} Template URL
     */
    static getTemplateUrl(templateName, category) {
        const categoryMap = {
            actor: this.urls.actorTemplates,
            item: this.urls.itemTemplates,
            chat: this.urls.chatTemplates,
            form: this.urls.formTemplates,
            partial: this.urls.partialTemplates,
            sidebar: this.urls.sidebarTemplates,
        }

        const baseUrl = categoryMap[category] || this.urls.templates
        return `${baseUrl}${templateName}`
    }

    /**
     * Get template path
     * @param {string} templateName - Template filename (with .hbs extension)
     * @param {'actor'|'item'|'chat'|'form'|'partial'|'sidebar'} category - Template category
     * @returns {string} Template file path
     */
    static getTemplatePath(templateName, category) {
        const categoryMap = {
            actor: this.paths.actorTemplates,
            item: this.paths.itemTemplates,
            chat: this.paths.chatTemplates,
            form: this.paths.formTemplates,
            partial: this.paths.partialTemplates,
            sidebar: this.paths.sidebarTemplates,
        }

        const basePath = categoryMap[category] || this.paths.templates
        return path.join(basePath, templateName)
    }
}

// Default export for convenient importing
export default SystemPaths
