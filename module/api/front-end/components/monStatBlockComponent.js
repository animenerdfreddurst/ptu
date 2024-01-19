import { debug } from '../../../ptu.js';
import Component from '../lib/component.js';
import { GetSpeciesData } from '../../../actor/actor.js';
import { capitalizeFirstLetter } from '../../../utils/generic-helpers.js';

export default class monStatBlockComponent extends Component {
    constructor(store, element) {
        super({
            store,
            element
        })
    }
    
    async render() {
        if(!this.state.species) return;
        let content = "";

        const headers = `
            <div class="w-100 justify-content-center bar mb-2 mt-2" style="font-size: 18px;">
                <div class="pl-2 pr-2 d-flex flex-row">
                    <div class="stats key" style="text-align: center;">
                        <label>Stats</label>
                    </div>
                    <div class="stats base">
                        <label>${(this.state.evolving.is && this.state.evolving.can && this.state.evolving.into) ? "Base" : "Current"}</label>
                    </div>
                    <div class="stats levelUp" style="font-size: 14px;">
                        <label>Level<br>Stats</label>
                    </div>
                    <div class="stats total">
                        <label>Final</label>
                    </div>
                </div>
            </div>
        `
        let stats = duplicate(this.state.stats);
        const nature = this.state.nature;
        const isEvolving = (this.state.evolving.can && this.state.evolving.into && this.state.evolving.is);

        let evoBaseStats = {}

        if (isEvolving) {
            
            
            //show the stats for the evolving species and reset level up pounts
            //find the base stats of the evolving species
            evoBaseStats = await GetSpeciesData(this.state.evolving.into)["Base Stats"];

            //rename labels to matchs stats
            const renamingDict = {
                "HP": "hp",
                "Attack": "atk",
                "Defense": "def",
                "Special Attack": "spatk",
                "Special Defense": "spdef",
                "Speed": "spd"
            };

            evoBaseStats = Object.keys(evoBaseStats).reduce((acc, key) => Object.assign(acc, { [renamingDict[key] || key]: evoBaseStats[key] }), {});
        }
        
        for(let stat in stats) {
            stats[stat].total = isEvolving ? evoBaseStats[stat] : stats[stat].total;
            stats[stat].newTotal = stats[stat].newTotal ? stats[stat].newTotal :stats[stat].total;
            stats[stat].newLevelUp = stats[stat].newLevelUp ? stats[stat].newLevelUp : 0; 
        }

        content = await renderTemplate("/systems/ptu/templates/partials/levelUp/stat-block-partial.hbs", {isEvolving, evolution: this.state.evolving.into, stats, nature})

        //level up points
        const levelUpPoints = `
            <div class="w-100 justify-content-center mb-1 bar mt-1 points" style="padding: 0.1rem; font-size: 11px;">
                <div class="pl-3 pr-2 d-flex flex-row">
                    <div class="stats points key"></div>
                    <div class="stats points base"></div>
                    <div style="flex: 0 1 20%">
                        <input type="text" id="monStatBlockLevelUpPoints" name="data.levelUpPoints" value="${this.state.levelUpPoints}" data-dtype="Number" disabled />
                    </div>
                    <div style="flex: 1 0 25%; color:black; align-self: center;">
                        <label>Levelup Points Remaining</label>
                    </div>
                </>
            </div>
        `

        this.element.html(`${headers} ${content} ${levelUpPoints}`);

        this.element.children().children().children('.levelUp').on("change", (event) => {
            const levelUpPointsAssigned = {};

            for(const stat of Object.keys(this.state.stats)) {
                levelUpPointsAssigned[stat] = parseInt($(`[name='levelUpData.stats.${stat}.levelUp']`).val());
            }
            
            this.store.dispatch('changeStats', levelUpPointsAssigned);
        });
    
    }
}
