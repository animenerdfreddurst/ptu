import {BlankPTUSpecies} from "../data/species-template.js"
import CustomSpeciesFolder from "../entities/custom-species-folder.js"
import { log } from "../ptu.js";

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {FormApplication}
 */
export class PTUCustomMonEditor extends FormApplication {

    /** @override */
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
        classes: ["ptu", "custom-species-editor", "mon-editor", "pokemon"],
        template: "systems/ptu/templates/forms/custom-mon-editor.hbs",
        width: 800,
        height: 550,
        title: this.object ? `Editing ${this.object.id}` : "Creating Custom Species",
        tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "stats" }],
        resizable: true
      });
    }
  
    /* -------------------------------------------- */
  
    /** @override */
    getData() {
      if(!this.object) {
        /** Create new mon from scratch */
        this.object = JSON.parse(JSON.stringify(BlankPTUSpecies));
      }

      const data = super.getData();
      data.dtypes = ["String", "Number", "Boolean"];
  
      return data;
    }
  
    /* -------------------------------------------- */
    
    /** @override */
    async _updateObject(event, formData) {
      for(let x of Object.entries(formData)){
        if((x[0] != "Capabilities.Naturewalk" && x[0] != "Capabilities.Other") && (!x[1] && x[1] !== 0)) {
          ui.notifications.notify("Species Data Incomplete, abandonning edits.", "error")
          return;
        }
      }

      mergeObject(this.object, this.formatFormData(formData));
      
      let journalEntry = CustomSpeciesFolder.findEntry(this.object);
      if(journalEntry === undefined) journalEntry = CustomSpeciesFolder.findEntry(this.object.ptuNumber);
      if(journalEntry === undefined) {
        log("No entry found for " + this.object.id + " creating new entry");
        await JournalEntry.create({name: this.object.ptuNumber, content: JSON.stringify(this.object), folder: CustomSpeciesFolder._dirId})
      } else {
        await journalEntry.update({content: JSON.stringify(this.object)});
      }

      log("Updating Custom Species")
      await Hooks.callAll("updatedCustomSpecies", {outdatedApplications: [this.options.baseApplication]});
      await game.socket.emit("system.ptu", "RefreshCustomSpecies")
    }

    formatFormData(formData) {
      let formattedData = {
        "_id": formData._id.toUpperCase(),
        "number": this.checkMonId(formData.number[1]),
        "ptuNumber": parseInt(this.checkMonId(formData.number[1])),
        "Type": formData.type2 ? [formData.type1, formData.type2] : [formData.type1],
        "Base Stats": {
          "HP": parseInt(formData["Base Stats.HP"]),
          "Attack": parseInt(formData["Base Stats.Attack"]),
          "Defense": parseInt(formData["Base Stats.Defense"]),
          "Special Attack": parseInt(formData["Base Stats.Special Attack"]),
          "Special Defense": parseInt(formData["Base Stats.Special Defense"]),
          "Speed": parseInt(formData["Base Stats.Speed"]),
        },
        "Abilities": {
          "Basic": formData["Abilities.Basic"]?.split(',')?.map(s => s.trim()),
          "Advanced": formData["Abilities.Advanced"]?.split(',')?.map(s => s.trim()),
          "High": formData["Abilities.High"]?.split(',')?.map(s => s.trim())
        },
        "Evolution": [[1, formData._id.toUpperCase(), "Null", "Null"]],
        "Height": parseFloat(formData.Height),
        "Size Class": formData["Size Class"].trim(), 
        "Weight": parseFloat(formData.Weight),
        "Breeding Information": {
          "Gender Ratio": parseFloat(formData["Breeding Information.Gender Ratio"]),
          "Egg Group": formData["Breeding Information.Egg Group"]?.split(',')?.map(s => s.trim())
        },
        "Diet": formData["Diet"].split(',').map(s => s.trim()),
        "Habitat": formData["Habitat"].split(',').map(s => s.trim()),
        "Capabilities": {
          "Overland": parseInt(formData["Capabilities.Overland"]),
          "Sky": parseInt(formData["Capabilities.Sky"]),
          "Swim": parseInt(formData["Capabilities.Swim"]),
          "Levitate": parseInt(formData["Capabilities.Levitate"]),
          "Burrow": parseInt(formData["Capabilities.Burrow"]),
          "High Jump": parseInt(formData["Capabilities.High Jump"]),
          "Long Jump": parseInt(formData["Capabilities.Long Jump"]),
          "Power": parseInt(formData["Capabilities.Power"]),
          "Weight Class": formData["Capabilities.Weight Class"],
          "Naturewalk": formData["Capabilities.Naturewalk"]?.split(',')?.map(s => s.trim()),
          "Other": formData["Capabilities.Other"]?.split(',')?.map(s => s.trim())
        },
        "Skills": {
          "Athletics": {
            "Dice": parseInt(formData["Skills.Athletics.Dice"]),
            "Mod": parseInt(formData["Skills.Athletics.Mod"])
          },
          "Acrobatics": {
            "Dice": parseInt(formData["Skills.Acrobatics.Dice"]),
            "Mod": parseInt(formData["Skills.Acrobatics.Mod"])
          },
          "Combat": {
            "Dice": parseInt(formData["Skills.Combat.Dice"]),
            "Mod": parseInt(formData["Skills.Combat.Mod"])
          },
          "Stealth": {
            "Dice": parseInt(formData["Skills.Stealth.Dice"]),
            "Mod": parseInt(formData["Skills.Stealth.Mod"])
          },
          "Perception": {
            "Dice": parseInt(formData["Skills.Perception.Dice"]),
            "Mod": parseInt(formData["Skills.Perception.Mod"])
          },
          "Focus": {
            "Dice": parseInt(formData["Skills.Focus.Dice"]),
            "Mod": parseInt(formData["Skills.Focus.Mod"])
          }
        }
      }

      if(formattedData["Capabilities"]["Naturewalk"] == false) formattedData["Capabilities"]["Naturewalk"] = []

      return formattedData;
    }

    checkMonId(number) {
      if(number) {
        if(CustomSpeciesFolder.findEntry(number)) {
          return number;
        }
      }
      return CustomSpeciesFolder.getAvailableId();
    }
}