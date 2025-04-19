import { log, debug } from "../ptu.js";
import { getRandomNormIntInclusive } from '../utils/generic-helpers.js';

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {FormApplication}
 */
export class PTUDexDragOptions extends FormApplication {

    /** @override */
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
        classes: ["ptu", "charactermancer", "pokemon", "dex_drag_in"],
        template: "systems/ptu/templates/forms/dex-drag-options-form.hbs",
        width: 250,
        height: 450, //changed from 375 to 500 to accommodate the gender ratio setting
        title: "Dex Drag-In",
        tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "stats" }]
      });
    }
  
    /* -------------------------------------------- */
  
    /** @override */
    getData() {
      const data = super.getData();
      data.dtypes = ["String", "Number", "Boolean"];

      data.levelMinDefault = game.settings.get("ptu", "defaultDexDragInLevelMin");
      data.levelMaxDefault = game.settings.get("ptu", "defaultDexDragInLevelMax");
      data.shinyChanceDefault = game.settings.get("ptu", "defaultDexDragInShinyChance");
      data.statRandomnessDefault = game.settings.get("ptu", "defaultDexDragInStatRandomness");
      data.preventDefault = game.settings.get("ptu", "defaultDexDragInPreventEvolution");
      data.species = this.object.item.name;

      return data;
    }

    /* -------------------------------------------- */
    
    /** @override */
    async _updateObject(event, formData) {

        formData["data.level"] = getRandomNormIntInclusive(parseInt(formData["data.level_min"]), parseInt(formData["data.level_max"]));

        game.ptu.utils.generator.FinishDexDragPokemonCreation(formData, this.object);
    }
}
