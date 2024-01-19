import { debug, log } from "../ptu.js"
import { getRandomIntInclusive, lpad} from './generic-helpers.js'
import { GetOrCacheAbilities, GetOrCacheCapabilities, GetOrCacheMoves} from './cache-helper.js'

export async function CreateMonParser(input, andCreate = false) {
    let commands = []; 
    for(let line of input.split("\n")) {
        let l = line.split(" ");
        commands[l[0].toLowerCase()] = l[1];
    }

    if(!commands["generate"]) {ui.notifications.notify("Missing required param [generate]", "error");return;}
    if(!commands["pokemon"] && !commands["random"]) {ui.notifications.notify("Missing required param [pokemon] or [random]", "error");return;}
    if(!commands["level"]) {ui.notifications.notify("Missing required param [level]", "error");return;}
    if(!commands["stats"]) {ui.notifications.notify("Missing required param [stats]", "error");return;}
    if(commands["stats"] != "random" && commands["stats"] != "weighted" && commands["stats"] != "basestats") {ui.notifications.notify("Required param [stats] has invalid value. Allowed values: random, weighted, basestats", "error");return;}
    if(!commands["imgpath"]) {commands["imgpath"] = game.settings.get("ptu", "defaultPokemonImageDirectory");}


    if(isNaN(commands["generate"])) {
        let range = commands["generate"].split("-");
        if(isNaN(range[0]) || isNaN(range[1])) {ui.notifications.notify("Couldn't parse generate range.", "error");return;}
        commands["generate"] = getRandomIntInclusive(range[0], range[1])
    }
    
    if(commands["pokemon"]) {
        let mon = game.ptu.utils.species.get(isNaN(commands["pokemon"]) ? commands["pokemon"] : parseInt(commands["pokemon"]));
        if(!mon) {ui.notifications.notify("Couldn't find a pokemon with name/id " + commands["pokemon"], "error");return;}
        commands["pokemon"] = [];
        for(let i = 0; i < commands["generate"]; i++) {
            commands["pokemon"].push(mon);
        }
    }
    else {
        let table = game.tables.getName(commands["random"]);
        if(!table) {ui.notifications.notify("Couldn't find a table with name " + commands["random"], "error");return;}
        
        let mons = table.data.results.map(x => {return {mon: x.data.text, weight: x.data.weight};}).flatMap(x => {
            let mon = game.ptu.utils.species.get(x.mon);
            if(!mon) return;
            let results = [];
            for(let i = 0; i < x.weight; i++) results.push(mon);
            return results;
        }).filter(x => x !== undefined);

        commands["pokemon"] = [];
        for(let i = 0; i < commands["generate"]; i++) {
            commands["pokemon"].push(mons[getRandomIntInclusive(0, mons.length-1)]);
        }
    }
    
    if(isNaN(commands["level"])) {
        let range = commands["level"].split("-");
        if(isNaN(range[0]) || isNaN(range[1])) {ui.notifications.notify("Couldn't parse generate range.", "error");return;}
        commands["level"] = [];
        for(let i = 0; i < commands["generate"]; i++) {
            commands["level"].push(getRandomIntInclusive(range[0], range[1]))
        }
    }
    else {
        let level = duplicate(commands["level"]);
        commands["level"] = [];
        for(let i = 0; i < commands["generate"]; i++) {
            commands["level"].push(level);
        }
    }

    if(commands["folder"]) {
        let folder = game.folders.filter(x => x.type == "Actor").find(x => x.name == commands["folder"]);
        if(!folder) {
            ui.notifications.notify("Couldn't find folder, creating it.", "warning")
            folder = await Folder.create({name: commands["folder"], type: 'Actor', parent: null});
        }
        commands["folder"] = folder;
    }

    debug(`Generating ${commands["generate"]} pokemon using species: ${commands["pokemon"].map(x => x._id).join(",")} with levels: ${commands["level"].join(",")} ${(commands["folder"] ? `in folder ${commands["folder"].name}` : "")}`);
    if(andCreate) createMons(commands);
    return commands;
}

export async function GetSpeciesArt(mon, imgDirectoryPath, type = ".webp", shiny = false, animated = false, female = false, animated_type = ".webm") {

    const alt_type = ".png";
    const basePath = imgDirectoryPath+(imgDirectoryPath.endsWith('/') ? '' : '/')

    const shiny_path = shiny ? "_s" : "";
    //const mega_path = mega ? "_m" : "";
    //const typeshift_path = typeshift ? "_t" : "";

    //const pokemon_path = mon?._id.toLowerCase().includes("pokemon") ? (mon?._id.toLowerCase().includes("form") ? "_f1" : "_f2")  : "";
    const rattata_path = mon?._id.toLowerCase().includes("rattata") ? (mon?._id.toLowerCase().includes("alolan") ? "_f2" : "_f1")  : "";
    const raticate_path = mon?._id.toLowerCase().includes("raticate") ? (mon?._id.toLowerCase().includes("alolan") ? "_f2" : "_f1")  : "";
    const raichu_path = mon?._id.toLowerCase().includes("raichu") ? (mon?._id.toLowerCase().includes("alolan") ? "_f2" : "_f1")  : "";
    const sandshrew_path = mon?._id.toLowerCase().includes("sandshrew") ? (mon?._id.toLowerCase().includes("alolan") ? "_f2" : "_f1")  : "";
    const sandslash_path = mon?._id.toLowerCase().includes("sandslash") ? (mon?._id.toLowerCase().includes("alolan") ? "_f2" : "_f1")  : "";
    const vulpix_path = mon?._id.toLowerCase().includes("vulpix") ? (mon?._id.toLowerCase().includes("alolan") ? "_f2" : "_f1")  : "";
    const ninetales_path = mon?._id.toLowerCase().includes("ninetales") ? (mon?._id.toLowerCase().includes("alolan") ? "_f2" : "_f1")  : "";
    const diglett_path = mon?._id.toLowerCase().includes("diglett") ? (mon?._id.toLowerCase().includes("alolan") ? "_f2" : "_f1")  : "";
    const dugtrio_path = mon?._id.toLowerCase().includes("dugtrio") ? (mon?._id.toLowerCase().includes("alolan") ? "_f2" : "_f1")  : "";
    const meowth_path = mon?._id.toLowerCase().includes("meowth") ? (mon?._id.toLowerCase().includes("alolan") ? "_f2" : (mon?._id.toLowerCase().includes("galarian") ? "_f3" : "_f1")) : "";
    const persian_path = mon?._id.toLowerCase().includes("persian") ? (mon?._id.toLowerCase().includes("alolan") ? "_f2" : "_f1")  : "";
    const geodude_path = mon?._id.toLowerCase().includes("geodude") ? (mon?._id.toLowerCase().includes("alolan") ? "_f2" : "_f1")  : "";
    const graveler_path = mon?._id.toLowerCase().includes("graveler") ? (mon?._id.toLowerCase().includes("alolan") ? "_f2" : "_f1")  : "";
    const golem_path = mon?._id.toLowerCase().includes("golem") ? (mon?._id.toLowerCase().includes("alolan") ? "_f2" : "_f1")  : "";
    const ponyta_path = mon?._id.toLowerCase().includes("ponyta") ? (mon?._id.toLowerCase().includes("galarian") ? "_f2" : "_f1")  : "";
    const rapidash_path = mon?._id.toLowerCase().includes("rapidash") ? (mon?._id.toLowerCase().includes("galarian") ? "_f2" : "_f1")  : "";
    const slowpoke_path = mon?._id.toLowerCase().includes("slowpoke") ? (mon?._id.toLowerCase().includes("galarian") ? "_f2" : "_f1")  : "";
    const slowbro_path = mon?._id.toLowerCase().includes("slowbro") ? (mon?._id.toLowerCase().includes("galarian") ? "_f2" : "_f1")  : "";
    const farfetchd_path = mon?._id.toLowerCase().includes("farfetch'd") ? (mon?._id.toLowerCase().includes("galarian") ? "_f2" : "_f1")  : "";
    const grimer_path = mon?._id.toLowerCase().includes("grimer") ? (mon?._id.toLowerCase().includes("alolan") ? "_f2" : "_f1")  : "";
    const muk_path = mon?._id.toLowerCase().includes("muk") ? (mon?._id.toLowerCase().includes("alolan") ? "_f2" : "_f1")  : "";
    const exeggutor_path = mon?._id.toLowerCase().includes("exeggutor") ? (mon?._id.toLowerCase().includes("alolan") ? "_f2" : "_f1")  : "";
    const marowak_path = mon?._id.toLowerCase().includes("marowak") ? (mon?._id.toLowerCase().includes("alolan") ? "_f2" : "_f1")  : "";
    const weezing_path = mon?._id.toLowerCase().includes("weezing") ? (mon?._id.toLowerCase().includes("galarian") ? "_f2" : "_f1")  : "";
    const mrmime_path = mon?._id.toLowerCase().includes("mr. mime") ? (mon?._id.toLowerCase().includes("galarian") ? "_f2" : "_f1")  : "";
    const articuno_path = mon?._id.toLowerCase().includes("articuno") ? (mon?._id.toLowerCase().includes("galarian") ? "_f2" : "_f1")  : "";
    const zapdos_path = mon?._id.toLowerCase().includes("zapdos") ? (mon?._id.toLowerCase().includes("galarian") ? "_f2" : "_f1")  : "";
    const moltres_path = mon?._id.toLowerCase().includes("moltres") ? (mon?._id.toLowerCase().includes("galarian") ? "_f2" : "_f1")  : "";
    const slowking_path = mon?._id.toLowerCase().includes("slowking") ? (mon?._id.toLowerCase().includes("galarian") ? "_f2" : "_f1")  : "";
    const unown_path = mon?._id.toLowerCase().includes("unown") ? (mon?._id.toLowerCase().includes(" - a") ? "_f01" : (mon?._id.toLowerCase().includes(" - b") ? "_f02" : (mon?._id.toLowerCase().includes(" - c") ? "_f03" : (mon?._id.toLowerCase().includes(" - d") ? "_f04" : (mon?._id.toLowerCase().includes(" - e") ? "_f05" : (mon?._id.toLowerCase().includes(" - f") ? "_f06" : (mon?._id.toLowerCase().includes(" - g") ? "_f07" : (mon?._id.toLowerCase().includes(" - h") ? "_f08" : (mon?._id.toLowerCase().includes(" - i") ? "_f09" : (mon?._id.toLowerCase().includes(" - j") ? "_f10" : (mon?._id.toLowerCase().includes(" - k") ? "_f11" : (mon?._id.toLowerCase().includes(" - l") ? "_f12" : (mon?._id.toLowerCase().includes(" - m") ? "_f13" : (mon?._id.toLowerCase().includes(" - n") ? "_f14" : (mon?._id.toLowerCase().includes(" - o") ? "_f15" : (mon?._id.toLowerCase().includes(" - p") ? "_f16" : (mon?._id.toLowerCase().includes(" - q") ? "_f17" : (mon?._id.toLowerCase().includes(" - r") ? "_f18" : (mon?._id.toLowerCase().includes(" - s") ? "_f19" : (mon?._id.toLowerCase().includes(" - t") ? "_f20" : (mon?._id.toLowerCase().includes(" - u") ? "_f21" : (mon?._id.toLowerCase().includes(" - v") ? "_f22" : (mon?._id.toLowerCase().includes(" - w") ? "_f23" : (mon?._id.toLowerCase().includes(" - x") ? "_f24" : (mon?._id.toLowerCase().includes(" - y") ? "_f25" : (mon?._id.toLowerCase().includes(" - z") ? "_f26" : (mon?._id.toLowerCase().includes(" - !") ? "_f27" : "_f28")))))))))))))))))))))))))))  : "";
    const corsola_path = mon?._id.toLowerCase().includes("corsola") ? (mon?._id.toLowerCase().includes("galarian") ? "_f2" : "_f1")  : "";
    const zigzagoon_path = mon?._id.toLowerCase().includes("zigzagoon") ? (mon?._id.toLowerCase().includes("galarian") ? "_f2" : "_f1")  : "";
    const linoone_path = mon?._id.toLowerCase().includes("linoone") ? (mon?._id.toLowerCase().includes("galarian") ? "_f2" : "_f1")  : "";
    const castform_path = mon?._id.toLowerCase().includes("castform") ? (mon?._id.toLowerCase().includes("sunny") ? "_f2" : (mon?._id.toLowerCase().includes("rainy") ? "_f3" : (mon?._id.toLowerCase().includes("snowy") ? "_f4" : "_f1"))) : "";
    const deoxys_path = mon?._id.toLowerCase().includes("deoxys") ? (mon?._id.toLowerCase().includes("attack") ? "_f2" : (mon?._id.toLowerCase().includes("defense") ? "_f3" : (mon?._id.toLowerCase().includes("speed") ? "_f4" : "_f1"))) : "";
    //temporary//const burmy_path = mon?._id.toLowerCase().includes("burmy") ? (mon?._id.toLowerCase().includes("sandy") ? "_f2" : (mon?._id.toLowerCase().includes("trash") ? "_f3" : "_f1")) : "";
    const wormadam_path = mon?._id.toLowerCase().includes("wormadam") ? (mon?._id.toLowerCase().includes("sandy") ? "_f2" : (mon?._id.toLowerCase().includes("trash") ? "_f3" : "_f1")) : "";
    //temporary//const//const cherrim_path = mon?._id.toLowerCase().includes("cherrim") ? (mon?._id.toLowerCase().includes("overcast") ? "_f1" : "_f2")  : "";
    const shellos_path = mon?._id.toLowerCase().includes("shellos") ? (mon?._id.toLowerCase().includes("west") ? "_f1" : "_f2")  : "";
    const gastrodon_path = mon?._id.toLowerCase().includes("gastrodon") ? (mon?._id.toLowerCase().includes("west") ? "_f1" : "_f2")  : ""; 
    const rotom_path = mon?._id.toLowerCase().includes("rotom") ? (mon?._id.toLowerCase().includes("heat") ? "_f2" : (mon?._id.toLowerCase().includes("wash") ? "_f3" : (mon?._id.toLowerCase().includes("frost") ? "_f4" : (mon?._id.toLowerCase().includes("fan") ? "_f5": (mon?._id.toLowerCase().includes("mow") ? "_f6" : "_f1"))))) : "";
    const giratina_path = mon?._id.toLowerCase().includes("giratina") ? (mon?._id.toLowerCase().includes("origin") ? "_f2" : "_f1")  : "";
    const shaymin_path = mon?._id.toLowerCase().includes("shaymin") ? (mon?._id.toLowerCase().includes("sky") ? "_f2" : "_f1")  : "";
    const arceus_path = mon?._id.toLowerCase().includes("arceus") ? (mon?._id.toLowerCase().includes("bug") ? "_f02" : (mon?._id.toLowerCase().includes("dark") ? "_f03" : (mon?._id.toLowerCase().includes("dragon") ? "_f04" : (mon?._id.toLowerCase().includes("electric") ? "_f05" : (mon?._id.toLowerCase().includes("fairy") ? "_f06" : (mon?._id.toLowerCase().includes("fighting") ? "_f07" : (mon?._id.toLowerCase().includes("fire") ? "_f08" : (mon?._id.toLowerCase().includes("flying") ? "_f09" : (mon?._id.toLowerCase().includes("ghost") ? "_f10" : (mon?._id.toLowerCase().includes("grass") ? "_f11" : (mon?._id.toLowerCase().includes("ground") ? "_f12" : (mon?._id.toLowerCase().includes("ice") ? "_f13" : (mon?._id.toLowerCase().includes("poison") ? "_f14" : (mon?._id.toLowerCase().includes("psychic") ? "_f15" : (mon?._id.toLowerCase().includes("rock") ? "_f16" : (mon?._id.toLowerCase().includes("steel") ? "_f17" : (mon?._id.toLowerCase().includes("water") ? "_f18" : "_f01"))))))))))))))))) : "";
	//gender//const unfezant_path = mon?._id.toLowerCase().includes("unfezant") ? (mon?._id.toLowerCase().includes("female") ? "_f2" : "_f1")  : "";
    const basculin_path = mon?._id.toLowerCase().includes("basculin") ? (mon?._id.toLowerCase().includes("blue") ? "_f2" : "_f1")  : "";
    const darumaka_path = mon?._id.toLowerCase().includes("darumaka") ? (mon?._id.toLowerCase().includes("galarian") ? "_f2" : "_f1")  : "";
    const darmanitan_path = mon?._id.toLowerCase().includes("darmanitan") ? (mon?._id.toLowerCase().includes("snowed") ? "_f4" : (mon?._id.toLowerCase().includes("mode") ? "_f3" : (mon?._id.toLowerCase().includes("galarian") ? "_f2" : "_f1"))) : ""; 
    const yamask_path = mon?._id.toLowerCase().includes("yamask") ? (mon?._id.toLowerCase().includes("galarian") ? "_f2" : "_f1")  : "";
    //temporary//const deerling_path = mon?._id.toLowerCase().includes("deerling") ? (mon?._id.toLowerCase().includes("summer") ? "_f2" : (mon?._id.toLowerCase().includes("autumn") ? "_f3" : (mon?._id.toLowerCase().includes("winter") ? "_f4" : "_f1"))) : "";
    //temporary//const sawsbuck_path = mon?._id.toLowerCase().includes("sawsbuck") ? (mon?._id.toLowerCase().includes("summer") ? "_f2" : (mon?._id.toLowerCase().includes("autumn") ? "_f3" : (mon?._id.toLowerCase().includes("winter") ? "_f4" : "_f1"))) : "";
    //gender//const frillish_path = mon?._id.toLowerCase().includes("frillish") ? (mon?._id.toLowerCase().includes("female") ? "_f2" : "_f1")  : "";
    //gender//const jellicent_path = mon?._id.toLowerCase().includes("jellicent") ? (mon?._id.toLowerCase().includes("female") ? "_f2" : "_f1")  : "";
    const stunfisk_path = mon?._id.toLowerCase().includes("stunfisk") ? (mon?._id.toLowerCase().includes("galarian") ? "_f2" : "_f1")  : "";
    const tornadus_path = mon?._id.toLowerCase().includes("tornadus") ? (mon?._id.toLowerCase().includes("therian") ? "_f2" : "_f1")  : "";
    const thundurus_path = mon?._id.toLowerCase().includes("thundurus") ? (mon?._id.toLowerCase().includes("therian") ? "_f2" : "_f1")  : "";
    const landorus_path = mon?._id.toLowerCase().includes("landorus") ? (mon?._id.toLowerCase().includes("therian") ? "_f2" : "_f1")  : "";
    const kyurem_path = mon?._id.toLowerCase().includes("kyurem") ? (mon?._id.toLowerCase().includes("white") ? "_f2" : (mon?._id.toLowerCase().includes("black") ? "_f3" : "_f1")) : "";
    const keldeo_path = mon?._id.toLowerCase().includes("keldeo") ? (mon?._id.toLowerCase().includes("resolute") ? "_f2" : "_f1")  : "";
    const meloetta_path = mon?._id.toLowerCase().includes("meloetta") ? (mon?._id.toLowerCase().includes("pirouette") ? "_f2" : "_f1")  : "";
    const vivillon_path = mon?._id.toLowerCase().includes("vivillon") ? (mon?._id.toLowerCase().includes("meadow") ? "_f01" : (mon?._id.toLowerCase().includes("archipelago") ? "_f02" : (mon?._id.toLowerCase().includes("continental") ? "_f03" : (mon?._id.toLowerCase().includes("elegant") ? "_f04" : (mon?._id.toLowerCase().includes("fancy") ? "_f05" : (mon?._id.toLowerCase().includes("garden") ? "_f06" : (mon?._id.toLowerCase().includes("high plains") ? "_f07" : (mon?._id.toLowerCase().includes("icy snow") ? "_f08" : (mon?._id.toLowerCase().includes("jungle") ? "_f09" : (mon?._id.toLowerCase().includes("marine") ? "_f10" : (mon?._id.toLowerCase().includes("modern") ? "_f11" : (mon?._id.toLowerCase().includes("monsoon") ? "_f12" : (mon?._id.toLowerCase().includes("ocean") ? "_f13" : (mon?._id.toLowerCase().includes("pokeball") ? "_f14" : (mon?._id.toLowerCase().includes("polar") ? "_f15" : (mon?._id.toLowerCase().includes("river") ? "_f16" : (mon?._id.toLowerCase().includes("sandstorm") ? "_f17" : (mon?._id.toLowerCase().includes("savanna") ? "_f18" : (mon?._id.toLowerCase().includes("sun") ? "_f19" : "_f20"))))))))))))))))))) : "";
    //gender//const pyroar_path = mon?._id.toLowerCase().includes("pyroar") ? (mon?._id.toLowerCase().includes("female") ? "_f2" : "_f1")  : "";
    const flabebe_path = mon?._id.toLowerCase().includes("flabebe") ? (mon?._id.toLowerCase().includes("yellow") ? "_f2" : (mon?._id.toLowerCase().includes("orange") ? "_f3" : (mon?._id.toLowerCase().includes("blue") ? "_f4" : (mon?._id.toLowerCase().includes("white") ? "_f5" : "_f1")))) : "";
    const floette_path = mon?._id.toLowerCase().includes("floette") ? (mon?._id.toLowerCase().includes("yellow") ? "_f2" : (mon?._id.toLowerCase().includes("orange") ? "_f3" : (mon?._id.toLowerCase().includes("blue") ? "_f4" : (mon?._id.toLowerCase().includes("white") ? "_f5" : "_f1")))) : "";
    const florges_path = mon?._id.toLowerCase().includes("florges") ? (mon?._id.toLowerCase().includes("yellow") ? "_f2" : (mon?._id.toLowerCase().includes("orange") ? "_f3" : (mon?._id.toLowerCase().includes("blue") ? "_f4" : (mon?._id.toLowerCase().includes("white") ? "_f5" : "_f1")))) : "";
    const furfrou_path = mon?._id.toLowerCase().includes("furfrou") ? (mon?._id.toLowerCase().includes("heart") ? "_f02" : (mon?._id.toLowerCase().includes("star") ? "_f03" : (mon?._id.toLowerCase().includes("diamond") ? "_f04" : (mon?._id.toLowerCase().includes("debutante") ? "_f05" : (mon?._id.toLowerCase().includes("matron") ? "_f06" : (mon?._id.toLowerCase().includes("dandy") ? "_f07" : (mon?._id.toLowerCase().includes("la reine") ? "_f08" : (mon?._id.toLowerCase().includes("kabuki") ? "_f09" : (mon?._id.toLowerCase().includes("pharaoh") ? "_f10" : "_f01"))))))))) : "";
    const meowstic_path = mon?._id.toLowerCase().includes("meowstic") ? (mon?._id.toLowerCase().includes("female") ? "_f2" : "_f1")  : "";
    const aegislash_path = mon?._id.toLowerCase().includes("aegislash") ? (mon?._id.toLowerCase().includes("blade") ? "_f2" : "_f1")  : "";
    const zygarde_path = mon?._id.toLowerCase().includes("zygarde") ? (mon?._id.toLowerCase().includes("10%") ? "_f2" : (mon?._id.toLowerCase().includes("complete") ? "_f3" : "_f1")) : "";
    const hoopa_path = mon?._id.toLowerCase().includes("hoopa") ? (mon?._id.toLowerCase().includes("unbound") ? "_f2" : "_f1")  : "";
    const oricorio_path = mon?._id.toLowerCase().includes("oricorio") ? (mon?._id.toLowerCase().includes("pom-pom") ? "_f2" : (mon?._id.toLowerCase().includes("pa'u") ? "_f3" : (mon?._id.toLowerCase().includes("sensu") ? "_f4" : "_f1"))) : "";
    const lycanroc_path = mon?._id.toLowerCase().includes("lycanroc") ? (mon?._id.toLowerCase().includes("midday") ? "_f1" : (mon?._id.toLowerCase().includes("midnight") ? "_f2" : "_f3")) : ""; //different lycanroc forms
    const wishiwashi_path = mon?._id.toLowerCase().includes("wishiwashi") ? (mon?._id.toLowerCase().includes("solo") ? "_f1" : "_f2")  : ""; //if it's not solo then it's schooling
    const silvally_path = mon?._id.toLowerCase().includes("silvally") ? (mon?._id.toLowerCase().includes("bug") ? "_f02" : (mon?._id.toLowerCase().includes("dark") ? "_f03" : (mon?._id.toLowerCase().includes("dragon") ? "_f04" : (mon?._id.toLowerCase().includes("electric") ? "_f05" : (mon?._id.toLowerCase().includes("fairy") ? "_f06" : (mon?._id.toLowerCase().includes("fighting") ? "_f07" : (mon?._id.toLowerCase().includes("fire") ? "_f08" : (mon?._id.toLowerCase().includes("flying") ? "_f09" : (mon?._id.toLowerCase().includes("ghost") ? "_f10" : (mon?._id.toLowerCase().includes("grass") ? "_f11" : (mon?._id.toLowerCase().includes("ground") ? "_f12" : (mon?._id.toLowerCase().includes("ice") ? "_f13" : (mon?._id.toLowerCase().includes("poison") ? "_f14" : (mon?._id.toLowerCase().includes("psychic") ? "_f15" : (mon?._id.toLowerCase().includes("rock") ? "_f16" : (mon?._id.toLowerCase().includes("steel") ? "_f17" : (mon?._id.toLowerCase().includes("water") ? "_f18" : "_f01"))))))))))))))))) : "";
    const minior_path = mon?._id.toLowerCase().includes("minior") ? (mon?._id.toLowerCase().includes("red") ? "_f2" : (mon?._id.toLowerCase().includes("orange") ? "_f3" : (mon?._id.toLowerCase().includes("yellow") ? "_f4" : (mon?._id.toLowerCase().includes("green") ? "_f5" : (mon?._id.toLowerCase().includes("blue") ? "_f6" : (mon?._id.toLowerCase().includes("indigo") ? "_f7" : (mon?._id.toLowerCase().includes("violet") ? "_f8" : "_f1"))))))) : "";
    //temporary//const mimikyu_path = mon?._id.toLowerCase().includes("mimikyu") ? (mon?._id.toLowerCase().includes("busted") ? "_f2" : "_f1")  : "";
    const necrozma_path = mon?._id.toLowerCase().includes("necrozma") ? (mon?._id.toLowerCase().includes("dusk") ? "_f2" : (mon?._id.toLowerCase().includes("dawn") ? "_f3" : "_f1")) : "";
    const toxtricity_path = mon?._id.toLowerCase().includes("toxtricity") ? (mon?._id.toLowerCase().includes("low key") ? "_f2" : "_f1")  : "";
    const alcremie_path = mon?._id.toLowerCase().includes("alcremie") ? (mon?._id.toLowerCase().includes("vanilla w/ strawberry") ? "_f01" : (mon?._id.toLowerCase().includes("ruby w/ strawberry") ? "_f02" : (mon?._id.toLowerCase().includes("matcha w/ strawberry") ? "_f03" : (mon?._id.toLowerCase().includes("mint w/ strawberry") ? "_f04" : (mon?._id.toLowerCase().includes("lemon w/ strawberry") ? "_f05" : (mon?._id.toLowerCase().includes("salted w/ strawberry") ? "_f06" : (mon?._id.toLowerCase().includes("ruby swirl w/ strawberry") ? "_f07" : (mon?._id.toLowerCase().includes("caramel swirl w/ strawberry") ? "_f08" : (mon?._id.toLowerCase().includes("rainbow swirl w/ strawberry") ? "_f09" : (mon?._id.toLowerCase().includes("vanilla w/ berry") ? "_f10" : (mon?._id.toLowerCase().includes("ruby w/ berry") ? "_f11" : (mon?._id.toLowerCase().includes("matcha w/ berry") ? "_f12" : (mon?._id.toLowerCase().includes("mint w/ berry") ? "_f13" : (mon?._id.toLowerCase().includes("lemon w/ berry") ? "_f14" : (mon?._id.toLowerCase().includes("salted w/ berry") ? "_f15" : (mon?._id.toLowerCase().includes("ruby swirl w/ berry") ? "_f16" : (mon?._id.toLowerCase().includes("caramel swirl w/ berry") ? "_f17" : (mon?._id.toLowerCase().includes("rainbow swirl w/ berry") ? "_f18" : (mon?._id.toLowerCase().includes("vanilla w/ love") ? "_f19" : (mon?._id.toLowerCase().includes("ruby w/ love") ? "_f20" : (mon?._id.toLowerCase().includes("matcha w/ love") ? "_f21" : (mon?._id.toLowerCase().includes("mint w/ love") ? "_f22" : (mon?._id.toLowerCase().includes("lemon w/ love") ? "_f23" : (mon?._id.toLowerCase().includes("salted w/ love") ? "_f24" : (mon?._id.toLowerCase().includes("ruby swirl w/ love") ? "_f25" : (mon?._id.toLowerCase().includes("caramel w/ love") ? "_f26" : (mon?._id.toLowerCase().includes("rainbow swirl w/ love") ? "_f27" : (mon?._id.toLowerCase().includes("vanilla w/ star") ? "_f28" : (mon?._id.toLowerCase().includes("ruby w/ star") ? "_f29" : (mon?._id.toLowerCase().includes("matcha w/ star") ? "_f30" : (mon?._id.toLowerCase().includes("mint w/ star") ? "_f31" : (mon?._id.toLowerCase().includes("lemon w/ star") ? "_f32" : (mon?._id.toLowerCase().includes("salted w/ star") ? "_f33" : (mon?._id.toLowerCase().includes("ruby swirl w/ star") ? "_f34" : (mon?._id.toLowerCase().includes("caramel swirl w/ star") ? "_f35" : (mon?._id.toLowerCase().includes("rainbow swirl w/ star") ? "_f36" : (mon?._id.toLowerCase().includes("vanilla w/ clover") ? "_f37" : (mon?._id.toLowerCase().includes("ruby w/ clover") ? "_f38" : (mon?._id.toLowerCase().includes("matcha w/ clover") ? "_f39" : (mon?._id.toLowerCase().includes("mint w/ clover") ? "_f40" : (mon?._id.toLowerCase().includes("lemon w/ clover") ? "_f41" : (mon?._id.toLowerCase().includes("salted w/ clover") ? "_f42" : (mon?._id.toLowerCase().includes("ruby swirl w/ clover") ? "_f43" : (mon?._id.toLowerCase().includes("caramel swirl w/ clover") ? "_f44" : (mon?._id.toLowerCase().includes("rainbow swirl w/ clover") ? "_f45" : (mon?._id.toLowerCase().includes("vanilla w/ flower") ? "_f46" : (mon?._id.toLowerCase().includes("ruby w/ flower") ? "_f47" : (mon?._id.toLowerCase().includes("matcha w/ flower") ? "_f48" : (mon?._id.toLowerCase().includes("mint w/ flower") ? "_f49" : (mon?._id.toLowerCase().includes("lemon w/ flower") ? "_f50" : (mon?._id.toLowerCase().includes("salted w/ flower") ? "_f51" : (mon?._id.toLowerCase().includes("ruby swirl w/ flower") ? "_f52" : (mon?._id.toLowerCase().includes("caramel swirl w/ flower") ? "_f53" : (mon?._id.toLowerCase().includes("rainbow swirl w/ flower") ? "_f54" : (mon?._id.toLowerCase().includes("vanilla w/ ribbon") ? "_f55" : (mon?._id.toLowerCase().includes("ruby w/ ribbon") ? "_f56" : (mon?._id.toLowerCase().includes("matcha w/ ribbon") ? "_f57" : (mon?._id.toLowerCase().includes("mint w/ ribbon") ? "_f58" : (mon?._id.toLowerCase().includes("lemon w/ ribbon") ? "_f59" : (mon?._id.toLowerCase().includes("salted w/ ribbon") ? "_f60" : (mon?._id.toLowerCase().includes("ruby swirl w/ ribbon") ? "_f61" : (mon?._id.toLowerCase().includes("caramel swirl w/ ribbon") ? "_f62" : "_f63")))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))) : "";
    const eiscue_path = mon?._id.toLowerCase().includes("eiscue") ? (mon?._id.toLowerCase().includes("noice face") ? "_f2" : "_f1")  : "";
    const indeedee_path = mon?._id.toLowerCase().includes("indeedee") ? (mon?._id.toLowerCase().includes("female") ? "_f2" : "_f1")  : "";
    //temporary//const morpeko_path = mon?._id.toLowerCase().includes("morpeko") ? (mon?._id.toLowerCase().includes("hangry") ? "_f2" : "_f1")  : "";
    const zacian_path = mon?._id.toLowerCase().includes("zacian") ? (mon?._id.toLowerCase().includes("crowned") ? "_f2" : "_f1")  : "";
    const zamazenta_path = mon?._id.toLowerCase().includes("zamazenta") ? (mon?._id.toLowerCase().includes("crowned") ? "_f2" : "_f1")  : "";
    const urshifu_path = mon?._id.toLowerCase().includes("urshifu") ? (mon?._id.toLowerCase().includes("rapid") ? "_f2" : "_f1")  : "";
    const calyrex_path = mon?._id.toLowerCase().includes("calyrex") ? (mon?._id.toLowerCase().includes("ice") ? "_f2" : (mon?._id.toLowerCase().includes("shadow") ? "_f3" : "_f1")) : "";

    //combine variation paths so i don't have to keep typing them
    const variation_path = rattata_path+raticate_path+raichu_path+sandshrew_path+sandslash_path+vulpix_path+ninetales_path+diglett_path+dugtrio_path+meowth_path+persian_path+geodude_path+graveler_path+golem_path+ponyta_path+rapidash_path+slowpoke_path+slowbro_path+farfetchd_path+grimer_path+muk_path+exeggutor_path+marowak_path+weezing_path+mrmime_path+articuno_path+zapdos_path+moltres_path+slowking_path+unown_path+corsola_path+zigzagoon_path+linoone_path+castform_path+deoxys_path+wormadam_path+shellos_path+gastrodon_path+rotom_path+giratina_path+shaymin_path+arceus_path+basculin_path+darumaka_path+darmanitan_path+yamask_path+stunfisk_path+tornadus_path+thundurus_path+landorus_path+kyurem_path+keldeo_path+meloetta_path+vivillon_path+flabebe_path+floette_path+florges_path+furfrou_path+meowstic_path+aegislash_path+zygarde_path+hoopa_path+oricorio_path+lycanroc_path+wishiwashi_path+silvally_path+minior_path+necrozma_path+toxtricity_path+alcremie_path+eiscue_path+indeedee_path+zacian_path+zamazenta_path+urshifu_path+calyrex_path;

    let path = basePath+lpad(mon?.number, 4)+shiny_path+variation_path+type;

    if(animated)
    {
        path = basePath+lpad(mon?.number, 4)+shiny_path+variation_path+animated_type;
    }
    let result = await fetch(path);

    if(animated && (result.status === 404 && mon?.number < 1000)) {
        path = basePath+lpad(mon?.number, 3)+shiny_path+variation_path+animated_type;
        result = await fetch(path);
    }
    if(result.status === 404 && mon?.number < 1000) {
        path = basePath+lpad(mon?.number, 3)+shiny_path+variation_path+type;
        result = await fetch(path);
    }
    if(result.status === 404 && mon?.number < 1000) {
        path = basePath+lpad(mon?.number, 3)+shiny_path+variation_path+alt_type;
        result = await fetch(path);
    }
    if(animated && (result.status === 404)) {
        path = basePath+lpad(mon?.number, 4)+shiny_path+variation_path+animated_type;
        result = await fetch(path);
    }
    if(result.status === 404) {
        path = basePath+lpad(mon?.number, 4)+shiny_path+variation_path+type;
        result = await fetch(path);
    }
    if(result.status === 404) {
        path = basePath+lpad(mon?.number, 4)+shiny_path+variation_path+alt_type;
        result = await fetch(path);
    }
    if(animated && (result.status === 404)) {
        path = basePath+mon?._id+shiny_path+variation_path+animated_type;
        result = await fetch(path);
    }
    if(result.status === 404) {
        path = basePath+mon?._id+shiny_path+variation_path+type;
        result = await fetch(path);
    }
    if(result.status === 404) {
        path = basePath+mon?._id+shiny_path+variation_path+alt_type;
        result = await fetch(path);
    }
    if(animated && (result.status === 404)) {
        path = basePath+mon?._id?.toLowerCase()+shiny_path+variation_path+animated_type;
        result = await fetch(path);
    }
    if(result.status === 404) {
        path = basePath+mon?._id?.toLowerCase()+shiny_path+variation_path+type;
        result = await fetch(path);
    }
    if(result.status === 404) {
        path = basePath+mon?._id?.toLowerCase()+shiny_path+variation_path+alt_type;
        result = await fetch(path);
    }
    if(result.status === 404) {
        if(female) return GetSpeciesArt(mon, imgDirectoryPath, type, shiny, animated, false, animated_type);
        return undefined;
    }
    return path;
}

/* -- Non-Export Functions -- */

function handleChatMessage(chatlog, messageText, chatData) {
    var matchString = messageText.toLowerCase();
    let commandKey = "/ptug"; 

    let shouldCancel = false;
    let shouldShowToChat = false;

    if(matchString.includes(commandKey) && game.user.isGM) {
        shouldCancel = true;
              
        CreateMonParser(messageText.replace("/ptug","").trimStart()).then(result => {
            if(result) {
                ui.notifications.notify(`Generating ${result["generate"]} pokemon using species: ${result["pokemon"].map(x => x._id).join(",")} with levels: ${result["level"].join(",")}`, "info")

                createMons(result);
            }
        });
    }

    return !shouldCancel;
}

Hooks.on("chatMessage", (chatlog, messageText, chatData) => {
    return handleChatMessage(chatlog, messageText, chatData);
});

async function createMons(commandData) {
    let options = [];
    for(let i = 0; i < commandData["generate"]; i++) {
        options.push({
            exists: false,
            species: commandData["pokemon"][i]._id,
            exp: game.ptu.data.levelProgression[commandData["level"][i]],
            imgpath: commandData["imgpath"]
        });
        if(commandData["folder"]) options[i]["folder"] = commandData["folder"].name;
    }

    let actors = [];
    for(let option of options) actors.push(await game.ptu.utils.generator.ActorGenerator.Create(option));
    
    Hooks.call("ptu.finishedGeneratingMons", commandData, actors)
    return actors;
}

Hooks.on("ptu.finishedGeneratingMons", function(commandData, actors) {
    debug("Calling ptu.finishedGeneratingMons hook with args:"); 
    debug(commandData, actors);
})

Hooks.on("dropCanvasData", async (canvas, update) => {
    const item = await fromUuid(update.uuid);
    if(item.type == "dexentry")
        new game.ptu.config.Ui.DexDragOptions.documentClass({item, x: update.x, y: update.y}, {"submitOnChange": false, "submitOnClose": false}).render(true);
});

export async function FinishDexDragPokemonCreation(formData, update)
{
    const imgSrc = game.settings.get("ptu", "defaultPokemonImageDirectory");
    let species_name = update["item"].name;

    let drop_coordinates_x = update["x"];
    let drop_coordinates_y = update["y"];
    
    let level = parseInt(formData["data.level"]);
    // .replace(",", ".") for comman notation, as parseFloat expects a decimal point
    let shiny_chance = parseFloat(formData["data.shiny_chance"].replace(",", "."));
    let stat_randomness = parseInt(formData["data.stat_randomness"]);
    let prevent_evolution = Number(formData["data.prevent_evolution"]);

    let new_actor = await game.ptu.utils.generator.ActorGenerator.Create({
        exists: false,
        species: species_name,
        exp: game.ptu.data.levelProgression[level],
        folder: game.scenes.current.name,
        shiny_chance: shiny_chance,
        stat_randomness: stat_randomness,
        prevent_evolution: prevent_evolution
    })

    const protoToken = duplicate(new_actor.prototypeToken);
    
    let size = game.ptu.utils.species.get(new_actor.system.species)["Size Class"]
    
    let size_categories = {
        "Small": {width: 1, height: 1},
        "Medium": {width: 1, height: 1},
        "Large": {width: 2, height: 2},
        "Huge": {width: 3, height: 3},
        "Gigantic": {width: 4, height: 4}
    }

    protoToken.width = size_categories[size]["width"];
    protoToken.height = size_categories[size]["height"];
    protoToken.actorLink = true;
    protoToken.displayBars = 20;
    protoToken.displayName=  40; 
    protoToken.bar1.attribute = "health";

    protoToken.img = await GetSpeciesArt(game.ptu.utils.species.get(new_actor.system.species), imgSrc, ".webp", new_actor.system.shiny, true, new_actor.system.gender.toLowerCase().includes("female"));
    
    new_actor = await new_actor.update({"prototypeToken": protoToken});

    protoToken.x = Math.floor(drop_coordinates_x / game.scenes.viewed.grid.size) * game.scenes.viewed.grid.size;
    protoToken.y = Math.floor(drop_coordinates_y / game.scenes.viewed.grid.size) * game.scenes.viewed.grid.size;

    const tokenData = await new_actor.getTokenDocument(protoToken);
    let placedTokenData = await game.scenes.viewed.createEmbeddedDocuments("Token", [tokenData]);

    let currentSpecies = game.ptu.utils.species.get(new_actor.system.species)._id;
    game.ptu.utils.species.playCry(currentSpecies);
    
    return placedTokenData;
}
