import { getRandomNormIntInclusive } from '../utils/generic-helpers.js'
import SystemPaths from '../config/paths.js'

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {FormApplication}
 */
export class PTUDexDragOptions extends FormApplication {
    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ['ptu', 'charactermancer', 'pokemon', 'dex_drag_in'],
            template: `systems/ptu/templates/forms/dex-drag-options-form.hbs`,
            width: 250,
            //height: 450, //changed from 375 to 500 to accommodate the gender ratio setting
            title: 'Dex Drag-In',
            tabs: [
                {
                    navSelector: '.sheet-tabs',
                    contentSelector: '.sheet-body',
                    initial: 'stats',
                },
            ],
        })
    }

    /* -------------------------------------------- */

    /** @override */
    getData() {
        const dataSuper = super.getData()
        const data = {
            ...dataSuper,
            dtypes: ['String', 'Number', 'Boolean'],

            levelMin: game.settings.get(
                'ptu',
                'defaultDexDragInLevelMin'
            ),
            levelMax: game.settings.get(
                'ptu',
                'defaultDexDragInLevelMax'
            ),
            shinyChance: game.settings.get(
                'ptu',
                'defaultDexDragInShinyChance'
            ),
            statRandomness: game.settings.get(
                'ptu',
                'defaultDexDragInStatRandomness'
            ),
            preventEvolution: game.settings.get(
                'ptu',
                'defaultDexDragInPreventEvolution'
            ),
            speciesName: this.object.item.name,

            genderRatioMale: game.ptu.utils.species.get(this.object.item.name)[
                'Breeding Information'
            ]['Gender Ratio'],
        }

        return data
    }

    /* -------------------------------------------- */

    /** @override */
    async _updateObject(_, formData) {
        game.ptu.utils.generator.FinishDexDragPokemonCreation(
            formData,
            this.object
        )
    }
}
