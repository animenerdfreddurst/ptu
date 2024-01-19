import { sendItemMessage } from './item-sheet.js'

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class PTUEdgeSheet extends ItemSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["ptu", "sheet", "item", "edge"],
      width: 750,
      height: 550,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
    });
  }

  /** @override */
  get template() {
    const path = "systems/ptu/templates/item";
    // Return a single sheet for all item types.
    return `${path}/item-edge-sheet.hbs`;

    // Alternatively, you could use the following return statement to do a
    // unique item sheet by type, like `weapon-sheet.html`.
    //return `${path}/item-${this.item.data.type}-sheet.html`;
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    const data = super.getData();
    data.editLocked = data.editable == false ? true : this.object.getFlag('ptu', 'editLocked') ?? false;
    
    if(this.object.img == "icons/svg/item-bag.svg" || this.object.img == "icons/svg/mystery-man.svg") {
        this.object.update({"img": `/systems/ptu/css/images/icons/edge_icon.png`});
    }

    return data;
  }

  /* -------------------------------------------- */

  /** @override */
  _getHeaderButtons() {
    let buttons = super._getHeaderButtons();

    buttons.unshift({
      label: "Send to Chat",
      class: ".to-chat",
      icon: "fas fa-comment",
      onclick: () => this._toChat()
    });

    buttons.unshift({
      label: "Effects",
      class: "open-effects",
      icon: "fas fa-edit",
      onclick: () => this._loadEffectSheet()
    });

    return buttons;
  }

  /**
   * Handle To Chat call.
   * @private
   */
  _toChat() {
    return sendItemMessage({
      item: this.object,
      speaker: ChatMessage.getSpeaker({
        actor: this.actor
      })
    });
  }

  async _loadEffectSheet() {
    if (this.object.effects.size == 0) {
      const effectData = {
        changes: [],
        label: this.object.name,
        icon: this.object.img,
        transfer: false,
        flags: { ptu: { itemEffect: true } },
        parent: this.object,
        _id: randomID()
      }
      await this.object.update({ effects: [effectData] });
    }

    const effect = this.object.effects.contents[0];
    return effect.sheet.render(true);
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    html.find("input[type=checkbox]").on("change", (e) => {
      e.preventDefault();

      const value = e.currentTarget.checked;

      this.object.update({"system.free": value});
    });

    html.find('.lock-img').on("click", event => {
			this.object.setFlag('ptu', 'editLocked', !this.object.getFlag('ptu', 'editLocked'));
		});

    // Roll handlers, click handlers, etc. would go here.
  }
}
