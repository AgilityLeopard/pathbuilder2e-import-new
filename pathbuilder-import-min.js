//#sourceURL=pathbuilder-import-min.js
var fbpiDebug = !1;
const fpbi = "10.286",
    //reportDomain = "https://www.pf2player.com/",
    pbcolor1 = "color: #7bf542",
    pbcolor2 = "color: #d8eb34",
    pbcolor3 = "color: #ffffff",
    pbcolor4 = "color: #cccccc",
    pbcolor5 = "color: #ff0000";
var rJSON;
var buildID, pcAlign, applyChanges = !1,
    finishedFeats = !1,
    finishedActions = !1,
    finishedClassFeatures = !1,
    finishedAncestryFeatures = !1,
    finishedHeritageFeatures = !1,
    finishedEquipment = !1,
    finishedSpells = !1,
    addFeats = !1,
    addEquipment = !1,
    addMoney = !0,
    addSpellcasters = !1,
    deleteAll = !1,
    heroVaultExport = !1,
    reportMissedItems = !1,
    allItems = [],
    allSpells = [],
    jsonBuild = [],
    addedItems = [],
    pbButton = !0,
    focusPool = 0,
    focusWarning = 0,
    Domain,
    LocationBack,
    wp = ["Axe", "Bomb", "Bow", "Brawling", "Club", "Dart", "Firearm", "Flail", "Hammer", "Knife", "Pick", "Polearm", "Shield", "Sling", "Spear", "Sword"];
async function doHVExport(hero, act) {
    game.modules.get("herovaultfoundry")?.api?.exportToHVFromPBHLO(hero, act)
}

async function beginWanderersImport(targetActor, isHV = !1) {
    finishedSpells = finishedEquipment = finishedAncestryFeatures = finishedClassFeatures = finishedActions = finishedFeats = applyChanges = !1, allItems = [];
  new Dialog({
    title: "Import Wanderer's Guide Character",
    content: `
        <div>
            <p>It's recommended to import into a fresh character sheet and not an existing one to avoid any potential issues.</p>
            <hr />
            <p>
                To export your character from Wanderer's Guide:
            <p>
            <ol>
                <li>Go to <a href="https://wanderersguide.app/profile/characters">your Wanderer's Guide characters list</a></li>
                <li>Click the "Options" button on the character you would like to export</li>
                <li>Select the "Export" option <em>(do not choose "Export to PDF")</em></li>
                <li>Save the downloaded file to your computer!</li>
                <li>Select the file you just downloaded in the input below and click "Import Character"!</li>
            </ol>
            <div class="form-group">
                <label for="feat-purge">Delete existing feats?</label>
                <input id="feat-purge" type="checkbox" checked>
            </div>
            <div class="form-group">
                <label for="char-file-import">Import .guidechar file</label>
                <input id="char-file-import" type="file" accept=".guidechar">
            </div>
        </div>
    `,
    buttons: {
      close: {
        label: "Nevermind",
      },
      import: {
        icon: '<i class="fas fa-file-import"></i>',
        label: "Import Character",
        callback: (el) => handleImport(el, targetActor),
      },
    },
    default: "close",
  }).render(!0);
    
}

 function loadFile(file) {
     return new Promise(resolve=>{
        let reader = new FileReader()
        
        reader.onload = function(event) {
            let data = event.target.result
            var newArr = JSON.parse(data);
            resolve(newArr)
        }
        reader.readAsText(file)
    })
    }

async function handleImport(
  elDialog,
  actor
) {

  const el = $(elDialog);

  const fileInput = el.find("#char-file-import").get(0);
  const charFile = (fileInput.files ?? [])[0];
  const purgeFeatCheckbox = el.find("#feat-purge").get(0);



  if (!charFile) {
    ui.notifications?.error("Unable to find uploaded .guidechar file!");
    return;
  }

  const fileReader = new FileReader();
    var responseJSON;
    // fileReader.onload  = receivedText;
     let data1;
    
    data1 = await loadFile(charFile);

    importCharacterWander(actor, data1)
    
  
}

///////////// WanderersGuide
async function importCharacterWander(targetActor, jsonBuild) {

    let arrayFeats = jsonBuild.build.feats,
        arrayEquipment = jsonBuild.invItems,
        arrayWeapons = jsonBuild.invItems,
        arrayArmor = jsonBuild.invItems,
        arraySpecials = jsonBuild.build.feats;
    var arrayLores = jsonBuild.profs,
        backpackData = []

    
    //jsonBuild.proficiencies.castingArcane, jsonBuild.proficiencies.castingDivine, jsonBuild.proficiencies.castingOccult, jsonBuild.proficiencies.castingPrimal;
    for (ref in jsonBuild.build.languages) jsonBuild.build.languages.hasOwnProperty(ref) && (jsonBuild.build.languages[ref].value.name = jsonBuild.build.languages[ref].value.name.toLowerCase());
    for (ref in arrayEquipment) arrayEquipment[ref][0] = mapItemToFoundryName(arrayEquipment[ref][0]);
    for (ref in fbpiDebug && console.log("%cPathbuilder2e Import | %c Working on arraySpecials: " + arraySpecials, pbcolor1, pbcolor4), arraySpecials) fbpiDebug && console.log("%cPathbuilder2e Import | %c Checking arraySpecials[ref]: " + arraySpecials[ref], pbcolor1, pbcolor4), void 0 !== arraySpecials[ref][0] && (arraySpecials[ref] = mapSpecialToFoundryName(arraySpecials[ref]));
    for (ref in fbpiDebug && console.log("%cPathbuilder2e Import | %c Finished arraySpecials: " + arraySpecials, pbcolor1, pbcolor4), fbpiDebug && console.log("%cPathbuilder2e Import | %c Working on arrayFeats: " + arrayFeats, pbcolor1, pbcolor4), arrayFeats) fbpiDebug && console.log("%cPathbuilder2e Import | %c Checking arrayFeats[ref][0]: " + arrayFeats[ref][0], pbcolor1, pbcolor4), void 0 !== arrayFeats[ref][0] && (arrayFeats[ref][0] = mapSpecialToFoundryName(arrayFeats[ref][0]));
    //fbpiDebug && console.log("%cPathbuilder2e Import | %c Finished arrayFeats: " + arrayFeats, pbcolor1, pbcolor4), [arraySpecials, arrayFeats, backpackData] = findSpecialThings(arraySpecials, arrayFeats, backpackData);
    var senses = [];

    var matches, newFeature;
    //jsonBuild.attributes.bonushp, jsonBuild.attributes.classhp, jsonBuild.level, jsonBuild.attributes.ancestryhp, conBonus, jsonBuild.level;
    
    if ((await targetActor.update({
            name: jsonBuild.name,
            name: jsonBuild.name,
            "token.name": jsonBuild.name,
            "system.details.level.value": jsonBuild.character.level,
            "system.level.value": jsonBuild.character.level,
            "system.details.heritage": jsonBuild.heritage,
            "system.details.age.value": jsonBuild.age,
            "system.details.gender.value": jsonBuild.gender,
            "system.details.alignment.value": jsonBuild.alignment,
            "system.details.keyability.value": jsonBuild.keyability,
            "system.details.deity.value": jsonBuild.deity,
            "system.deity.value": jsonBuild.deity,
            "ancestry": jsonBuild.ancestry,
            "background": jsonBuild.background,
            "system.size.value": getSizeValue(jsonBuild.size),
            "system.traits.languages.value": jsonBuild.languages,
            "system.traits.senses": senses,
            /*"system.abilities.str.value": jsonBuild.abilities.str,
            "system.abilities.dex.value": jsonBuild.abilities.dex,
            "system.abilities.con.value": jsonBuild.abilities.con,
            "system.abilities.int.value": jsonBuild.abilities.int,
            "system.abilities.wis.value": jsonBuild.abilities.wis,
            "system.abilities.cha.value": jsonBuild.abilities.cha,*/
           "system.saves.fortitude.rank": getProfsValue(jsonBuild.profs.Fortitude),
            "system.saves.reflex.rank": getProfsValue(jsonBuild.profs.Reflex),
            "system.saves.will.rank": getProfsValue(jsonBuild.profs.Will),
            "system.martial.advanced.rank": getProfsValue(jsonBuild.profs.Advanced),
            "system.martial.heavy.rank": getProfsValue(jsonBuild.profs.Heavy_Armor),
            "system.martial.light.rank": getProfsValue(jsonBuild.profs.Light_Armor),
            "system.martial.medium.rank": getProfsValue(jsonBuild.profs.Medium_Armor),
            "system.martial.unarmored.rank": getProfsValue(jsonBuild.profs.Unarmored_Defense),
            "system.martial.martial.rank": getProfsValue(jsonBuild.profs.Martial_Weapons),
            "system.martial.simple.rank": getProfsValue(jsonBuild.profs.Simple_Weapons),
            "system.martial.unarmed.rank": getProfsValue(jsonBuild.profs.Unarmed_Attacks),
            "system.skills.acr.rank": getProfsValue(jsonBuild.profs.Acrobatics),
            "system.skills.arc.rank": getProfsValue(jsonBuild.profs.Arcana),
            "system.skills.ath.rank": getProfsValue(jsonBuild.profs.Athletics),
            "system.skills.cra.rank": getProfsValue(jsonBuild.profs.Crafting),
            "system.skills.dec.rank": getProfsValue(jsonBuild.profs.Deception),
            "system.skills.dip.rank": getProfsValue(jsonBuild.profs.Diplomacy),
            "system.skills.itm.rank": getProfsValue(jsonBuild.profs.Intimidation),
            "system.skills.med.rank": getProfsValue(jsonBuild.profs.Medicine),
            "system.skills.nat.rank": getProfsValue(jsonBuild.profs.Nature),
            "system.skills.occ.rank": getProfsValue(jsonBuild.profs.Occultism),
            "system.skills.prf.rank": getProfsValue(jsonBuild.profs.Performance),
            "system.skills.rel.rank": getProfsValue(jsonBuild.profs.Religion),
            "system.skills.soc.rank": getProfsValue(jsonBuild.profs.Society),
            "system.skills.ste.rank": getProfsValue(jsonBuild.profs.Stealth),
            "system.skills.sur.rank": getProfsValue(jsonBuild.profs.Survival),
            "system.skills.thi.rank": getProfsValue(jsonBuild.profs.Thievery),
            "system.attributes.perception.rank": getProfsValue(jsonBuild.profs.Perception),
            "system.attributes.classDC.rank": getProfsValue(jsonBuild.profs.Class_DC)
            }), null == targetActor.background || targetActor.background != jsonBuild.character._background.name) && (jsonBuild.character._background.name.includes("Scholar (") ? (matches = /\(([^)]+)\)/.exec(jsonBuild.character._background.name), jsonBuild.character._background.name = "Scholar", arrayFeats.push({
            0: "Assurance",
            1: matches[1]
        })) : jsonBuild.character._background.name.includes("Squire (") && (matches = /\(([^)]+)\)/.exec(jsonBuild.character._background.name), jsonBuild.character._background.name = "Squire"), !jsonBuild.character._background.name.includes("Artisan")))
          
        
        for (const item of await game.packs.get("pf2e.backgrounds").getDocuments())
             if (item.system.slug == getSlug(jsonBuild.character._background.name) || item.system.slug == getSlugNoQuote(jsonBuild.character._background.name)) {
                allItems.push(item.system);
                 for (const backgroundFeat in item.system.items) {
                     var newFeat = [item.system.items[backgroundFeat].name, null, "Background Feat", 1];
                     arrayFeats.splice(0, 1);
                     arrayFeats.push(newFeat);
                     break
                 }
                 //}
            } 
    
    
    let classFeatures = [];

    
    if (targetActor.class != jsonBuild.character._class.name) {
        fbpiDebug && console.log("%cPathbuilder2e Import | %cSetting class to: " + jsonBuild.character._class.name, pbcolor1, pbcolor4);
        for (const item of await game.packs.get("pf2e.classes").getDocuments())
            if (item.system.slug == getSlug(jsonBuild.character._class.name) || item.system.slug == getSlugNoQuote(jsonBuild.character._class.name)) {
                await targetActor.createEmbeddedDocuments("Item", [item.data]);
                for (const classFeatureItem in item.system.items) jsonBuild.character.level >= item.system.items[classFeatureItem].level && (newFeature = {
                    uuid: item.system.items[classFeatureItem].uuid,
                    img: item.system.items[classFeatureItem].img,
                    name: item.system.items[classFeatureItem].name,
                    level: item.system.items[classFeatureItem].level,
                    
                }, classFeatures.push(newFeature))
                
            }
    }
 if (targetActor.ancestry != jsonBuild.character._ancestry.name)
        for (const item of await game.packs.get("pf2e.ancestries").getDocuments()) item.system.slug != getSlug(jsonBuild.character._ancestry.name) && item.system.slug != getSlugNoQuote(jsonBuild.character._ancestry.name) || await targetActor.createEmbeddedDocuments("Item", [item.data]);
    if (targetActor.heritage != jsonBuild.character._heritage.name)
        for (const item of await game.packs.get("pf2e.heritages").getDocuments()) item.system.slug != getSlug(jsonBuild.character._heritage.name) && item.system.slug != getSlugNoQuote(jsonBuild.character._heritage.name) || await targetActor.createEmbeddedDocuments("Item", [item.data]);
     if (targetActor.background != jsonBuild.character._background.name)
        for (const item of await game.packs.get("pf2e.backgrounds").getDocuments()) item.system.slug != getSlug(jsonBuild.character._background.name) && item.system.slug != getSlugNoQuote(jsonBuild.character._background.name) || await targetActor.createEmbeddedDocuments("Item", [item.data]);
    
    var t = allItems.length - 1;

               
    //LocationBack = allItems[t]._id;
    //if (targetActor.deity != jsonBuild.deity)
      //  for (const item of await game.packs.get("pf2e.deities").getDocuments()) item.system.slug != getSlug(jsonBuild.deity) && item.system.slug != getSlugNoQuote(jsonBuild.background) || await targetActor.createEmbeddedDocuments("Item", [item.data]);
    //let blacklist = [jsonBuild.heritage, "Great Fortitude", "Divine Spellcasting", "Divine Ally (Blade)", "Divine Ally (Shield)", "Divine Ally (Steed)", "Divine Smite (Antipaladin)", "Divine Smite (Paladin)", "Divine Smite (Desecrator)", "Divine Smite (Liberator)", "Divine Smite (Redeemer)", "Divine Smite (Tyrant)", "Exalt (Antipaladin)", "Exalt (Paladin)", "Exalt (Desecrator)", "Exalt (Redeemer)", "Exalt (Liberator)", "Exalt (Tyrant)", "Intimidation", "Axe", "Sword", "Water", "Sword Cane", "Battle Axe", "Bane", "Air", "Occultism", "Performance", "Alchemy", "Nature", "Red", "Shark", "Green", "Divine", "Sun", "Fire", "Might", "Mace", "Bronze", "Spirit", "Zeal", "Battledancer", "Light Armor Expertise", "Religion", "Polearm", "Longsword", "Moon", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "Hammer", "Athletics", "Deception", "Society", "Occultism", "Arcane", "Simple Weapon Expertise", "Defensive Robes", "Magical Fortitude", "Occult", "Acrobatics", "Medicine", "Diplomacy", "Might", "Reflex", "Evasion", "Vigilant Senses", "Iron Will", "Lightning Reflexes", "Alertness", "Shield Block", "Anathema", "Druidic Language", "Weapon Expertise", "Armor Expertise", "Armor Mastery", "Darkvision", "Stealth", "Divine", "Shield", "Survival", "Arcana", "Will", "Fortitude", "Signature Spells", "Low-Light Vision", "Powerful Fist", "Mystic Strikes", "Incredible Movement", "Claws", "Wild Empathy", "Aquatic Adaptation", "Resolve", "Expert Spellcaster", "Master Spellcaster", "Legendary Spellcaster", "Weapon Specialization", "Mighty Rage", "Deny Advantage", "Critical Brutality", "Juggernaut", "Medium Armor Expertise", "Weapon Specialization (Barbarian)", "Greater Weapon Specialization", "Diplomacy", "Improved Evasion", "Weapon Mastery", "Incredible Senses"];
       
    
    let blacklist = [jsonBuild.character._heritage.name, "Intimidation", "Occultism", "Performance", "Nature", "Red", "Shark", "Green", "Divine", "Religion",  "", "", "", "", "", "", "", "", "", "", "", "", "", "",  "Athletics", "Deception", "Society", "Occultism", "Arcane",  "Occult", "Acrobatics", "Medicine", "Diplomacy",  "Darkvision", "Stealth", "Divine", "Survival", "Arcana", "Low-Light Vision",  "Diplomacy"];
    // for (const cf in classFeatures) blacklist.push(classFeatures[cf].name);
    //Добавить Классовые Особенности
    let classfeat = await game.packs.get("pf2e.classfeatures").getDocuments();
    
    arraySpecials = arraySpecials.filter(val => !blacklist.includes(val)), jsonBuild.specials = uniq(arraySpecials), addFeats ? (finishedClassFeatures = finishedAncestryFeatures = !0, await addFeatItems(targetActor, arrayFeats), await addFeatItems(targetActor, arraySpecials), await addActionItems(targetActor, arraySpecials), await addAncestryFeatureItems(targetActor, arraySpecials)) : (finishedClassFeatures = finishedActions = finishedAncestryFeatures = finishedFeats = !0, checkAllFinishedAndCreate(targetActor)), blacklist = ["Bracers of Armor", "", "", "", "", ""];
    
      
    for (const item of await game.packs.get("pf2e.feats-srd").getDocuments()) 
        for (const item1 in allItems) 
            if (allItems[item1].type == "feat")
                if(allItems[item1].system.featType.value == "skill" || allItems[item1].system.featType.value == "class" || allItems[item1].system.featType.value == "ancestry" || allItems[item1].system.featType.value == "general")
            item.system.slug != allItems[item1].system.slug && item.system.slug != allItems[item1].system.slug || await targetActor.createEmbeddedDocuments("Item", [allItems[item1]]);
    
    var equip = []; 
    for (const cf in allItems) blacklist.push(allItems[cf].name);
    if (allItems = allItems.filter(function(a) {
            return !this[a._id] && (this[a._id] = !0)
        }, 
        Object.create(null)), addEquipment) {
        let pack = game.packs.get("pf2e.equipment-srd"),
            content = await game.packs.get("pf2e.equipment-srd").getDocuments();
        backpackData = await pack.getDocuments("3lgwjrFEsQVKzhh7");
        let backpackInstance = [],
            arrayKit = [];
        hasAdventurersPack(arrayEquipment) && (backpackInstance = await targetActor.createEmbeddedDocuments("Inventory", backpackData), arrayKit.push(["bedroll", 1]), arrayKit.push(["chalk", 10]), arrayKit.push(["flint-and-steel", 1]), arrayKit.push(["rope", 1]), arrayKit.push(["rations", 14]), arrayKit.push(["torch", 5]), arrayKit.push(["waterskin", 1]));
        for (const action of content.filter(item => equipmentIsRequired(item, arrayEquipment, arrayWeapons, arrayArmor, arrayKit, addMoney))) {
            for (var ref in arrayEquipment)
                if (fbpiDebug && console.log("%cPathbuilder2e Import | %c arrayEquipment[ref]: " + arrayEquipment[ref], pbcolor1, pbcolor4), arrayEquipment.hasOwnProperty(ref)) {
                    var itemName = arrayEquipment[ref][0];
                    if (isNameMatch(itemName, action.system.slug) && needsNewInstanceofItem(targetActor, arrayEquipment[ref][0])) {
                        var itemAmount = arrayEquipment[ref][1];
                        arrayEquipment[ref].added = !0;
                        const clonedData = JSON.parse(JSON.stringify(action));
                        "kit" != clonedData.type && (clonedData.quantity = itemAmount, equip.push(clonedData))
                    }
                } for (var ref in arrayKit)
                if (arrayKit.hasOwnProperty(ref))
                    if (arrayKit[ref][0] === action.system.slug && needsNewInstanceofItem(targetActor, itemName)) {
                        itemAmount = arrayKit[ref][1];
                        const clonedData = JSON.parse(JSON.stringify(action));
                        clonedData.quantity = itemAmount, clonedData.containerId.value = backpackInstance.id, equip.push(clonedData)
                    } for (var ref in arrayWeapons)
                if (arrayWeapons.hasOwnProperty(ref)) {
                    var material, weaponDetails = arrayWeapons[ref];
                    if (isNameMatch(weaponDetails.name, action.system.slug) && needsNewInstanceofItem(targetActor, weaponDetails.name)) {
                        weaponDetails.added = !0;
                        const clonedData = JSON.parse(JSON.stringify(action));
                        clonedData.system.quantity = weaponDetails.qty, clonedData.system.damage.die = weaponDetails.die, clonedData.system.potencyRune.value = weaponDetails.pot, clonedData.system.strikingRune.value = weaponDetails.str, weaponDetails.runes[0] && (clonedData.system.propertyRune1.value = camelCase(weaponDetails.runes[0])), weaponDetails.runes[1] && (clonedData.system.propertyRune2.value = camelCase(weaponDetails.runes[1])), weaponDetails.runes[2] && (clonedData.system.propertyRune3.value = camelCase(weaponDetails.runes[2])), weaponDetails.runes[3] && (clonedData.system.propertyRune4.value = camelCase(weaponDetails.runes[3])), weaponDetails.mat && (material = weaponDetails.mat.split(" (")[0], clonedData.system.preciousMaterial.value = camelCase(material), clonedData.system.preciousMaterialGrade.value = getMaterialGrade(weaponDetails.mat)), weaponDetails.display && (clonedData.name = weaponDetails.display), equip.push(clonedData)
                    }
                } for (var ref in arrayArmor)
                if (arrayArmor.hasOwnProperty(ref)) {
                    var armorDetails = arrayArmor[ref];
                    if (fbpiDebug && console.log("%cPathbuilder2e Import | %c armorDetails.name: " + armorDetails.name, pbcolor1, pbcolor4), isNameMatch(armorDetails.name, action.system.slug) && needsNewInstanceofItem(targetActor, armorDetails.name)) {
                        armorDetails.added = !0;
                        const clonedData = JSON.parse(JSON.stringify(action));
                        if (notBracersOfArmor(armorDetails.name)) {
                            if (clonedData.system.quantity = armorDetails.qty, clonedData.system.category = armorDetails.prof, clonedData.system.potencyRune.value = armorDetails.pot, clonedData.system.resiliencyRune.value = armorDetails.res, armorDetails.worn ? clonedData.system.equipped.inSlot = !0 : clonedData.system.equipped.inSlot = !1, armorDetails.runes[0] && (clonedData.system.propertyRune1.value = camelCase(armorDetails.runes[0])), armorDetails.runes[1] && (clonedData.system.propertyRune2.value = camelCase(armorDetails.runes[1])), armorDetails.runes[2] && (clonedData.propertyRune3.value = camelCase(armorDetails.runes[2])), armorDetails.runes[3] && (clonedData.system.propertyRune4.value = camelCase(armorDetails.runes[3])), armorDetails.mat) {
                                let material = armorDetails.mat.split(" (")[0];
                                clonedData.system.preciousMaterial.value = camelCase(material), clonedData.system.preciousMaterialGrade.value = getMaterialGrade(armorDetails.mat)
                            }
                            armorDetails.display && (clonedData.name = armorDetails.display)
                        }
                        equip.push(clonedData)
                    }
                } if (addMoney)
                if ("platinum-pieces" === action.system.slug) {
                     const clonedData = JSON.parse(JSON.stringify(action));
                    clonedData.system.quantity = jsonBuild.money.pp, equip.push(clonedData)
                } else if ("gold-pieces" === action.system.slug) {
                const clonedData = JSON.parse(JSON.stringify(action));
                clonedData.system.quantity = jsonBuild.money.gp, equip.push(clonedData)
            } else if ("silver-pieces" === action.system.slug) {
                 const clonedData = JSON.parse(JSON.stringify(action));
                clonedData.system.quantity = jsonBuild.money.sp, equip.push(clonedData)
            } else if ("copper-pieces" === action.system.slug) {
                const clonedData = JSON.parse(JSON.stringify(action));
                clonedData.system.quantity = jsonBuild.money.cp, equip.push(clonedData)
            }
        }
        finishedEquipment = !0, checkAllFinishedAndCreate(targetActor)
    } else finishedEquipment = !0, checkAllFinishedAndCreate(targetActor);

    var i = 0;
    for (const item1 in equip)
        {
            if(i == equip.length) break; else i++; 
           await targetActor.createEmbeddedDocuments("Item", [equip[item1]]); 
        }

    i = 0;

    
    addSpellcasters ? setSpellcasters(targetActor, jsonBuild.spellCasters) : (finishedSpells = !0, checkAllFinishedAndCreate(targetActor)), addLores(targetActor, arrayLores);     
    
    

}

function getProfsValue(value) {
    switch (value) {
        case "T":
            return 1;
        case "E":
            return 2;
        case "M":
            return 3;
        case "L":
            return 4;
    }
    return 0
}
/////////////////////End

async function beginPathbuilderImport(targetActor, isHV = !1) {
    finishedSpells = finishedEquipment = finishedAncestryFeatures = finishedClassFeatures = finishedActions = finishedFeats = applyChanges = !1, allItems = [];
    let heroVault = isHV ? '<input type="checkbox" id="checkBoxHVExport" name="checkBoxHVExport" ><label for="checkBoxHVExport"> Export this PC to my HeroVau.lt</label><br><br>' : "";
     new Dialog({
        title: "Pathbuilder Импорт",
        content: `
      <div>
        <p><strong>СТРОГО рекомендуется создавать отдельный лист и не перезаписывать лист существующего персонажа</strong></p>
        <hr>
        <p>Шаг 1: Экспортируйте своего персонажа из Pathbuilder 2e через меню приложения!</p>
        <p>Шаг 2: Введите 6-значный идентификационный номер пользователя из диалогового окна экспорта pathbuilder ниже.</p>
        <p>Шаг 3: Сделайте выборы для классовых и расовых особенностей в соответствии с тем, что находится на сайте</p>
        <br>
        <div>
      <hr/>
      <form>
          <input type="checkbox" id="checkBoxFeats" name="checkBoxFeats" checked>
          <label for="checkBoxFeats">Импортировать Черты?</label><br><br>
          <input type="checkbox" id="checkBoxEquipment" name="checkBoxEquipment" checked>
          <label for="checkBoxEquipment"> Импортировать Снаряжение?</label><br>
          <!--input type="checkbox" id="checkBoxMoney" name="checkBoxMoney" checked>
          <label for="checkBoxMoney"> Импортировать деньги?</label><br><br-->
          <!--input type="checkbox" id="checkBoxDeleteAll" name="checkBoxDeleteAll" checked>
          < label for="checkBoxDeleteAll"> Удалить все существующие предметы (в том числе и заклинание) из листа перед импортом?</label><br><br -->
          <input type="checkbox" id="checkBoxSpells" name="checkBoxSpells" checked>
          <label for="checkBoxSpells"> Импортировать заклинание? (Всегда удаляет существующее)</label><br><br>
          ${heroVault}
      </form>
      <div id="divCode">
        Введите шестизначный код с сайта Pathbuilder<br>
        <div id="divOuter">
          <div id="divInner">
            <input id="textBoxBuildID" type="number" maxlength="6" />
          </div>
        </div>
      </div>
      <br><br>
      <style>
        #textBoxBuildID {
            border: 0px;
            padding-left: 15px;
            letter-spacing: 42px;
            background-image: linear-gradient(to left, black 70%, rgba(255, 255, 255, 0) 0%);
            background-position: bottom;
            background-size: 50px 1px;
            background-repeat: repeat-x;
            background-position-x: 35px;
            width: 330px;
            min-width: 330px;
          }
          #divInner{
            left: 0;
            position: sticky;
          }
          #divOuter{
            width: 285px;
            overflow: hidden;
          }
          #divCode{
            border: 1px solid black;
            width: 300px;
            margin: 0 auto;
            padding: 5px;
          }
          #checkBoxMoney{
            margin-left: 35px;
          }
      </style>
      `,
        buttons: {
            yes: {
                icon: "<i class='fas fa-check'></i>",
                label: "Импорт",
                callback: () => applyChanges = !0
            },
            no: {
                icon: "<i class='fas fa-times'></i>",
                label: "Отмена"
            }
        },
        default: "yes",
        close: html => {
            applyChanges && (isNormalInteger(buildID = html.find('[id="textBoxBuildID"]')[0].value) ? (addFeats = html.find('[name="checkBoxFeats"]')[0].checked, addEquipment = html.find('[name="checkBoxEquipment"]')[0].checked, addSpellcasters = html.find('[name="checkBoxSpells"]')[0].checked, deleteAll = !0, isHV && (heroVaultExport = html.find('[name="checkBoxHVExport"]')[0].checked), fbpiDebug && console.log("%cPathbuilder2e Import | %cGot heroVaultExport:" + heroVaultExport, pbcolor1, pbcolor4), fetchPathbuilderBuild(targetActor, buildID)) : ui.notifications.warn("Build ID must be a positive integer!"))
        }
    }).render(!0)

}

function isNormalInteger(str) {
    var n = Math.floor(Number(str));
    return n !== 1 / 0 && String(n) === str && 0 <= n
}

function fetchPathbuilderBuild(targetActor, buildID) {
    var xmlhttp = new XMLHttpRequest;
    xmlhttp.onreadystatechange = function() {
        var responseJSON;
        4 == this.readyState && 200 == this.status && (responseJSON = JSON.parse(this.responseText), fbpiDebug && console.log(responseJSON), responseJSON.success ? (jsonBuild = responseJSON.build, checkCharacterIsCorrect(targetActor, responseJSON.build)) : ui.notifications.warn("Unable to find a character with this build id!"))
    }, xmlhttp.open("GET", "https://www.pathbuilder2e.com/json.php?id=" + buildID, !0), xmlhttp.send()
}

function checkCharacterIsCorrect(targetActor, jsonBuild) {
    let correctCharacter = !1;
    new Dialog({
        title: jsonBuild.name,
        content: `
      <div>Importing ` + jsonBuild.name + ", level " + jsonBuild.level + `<div><br><br>
      `,
        buttons: {
            yes: {
                icon: "<i class='fas fa-check'></i>",
                label: "Proceed",
                callback: () => correctCharacter = !0
            },
            no: {
                icon: "<i class='fas fa-times'></i>",
                label: "Cancel"
            }
        },
        default: "yes",
        close: html => {
            correctCharacter && (ui.notifications.info("Please be patient while " + jsonBuild.name + " is imported."), ui.notifications.info("The import can take up to 1 minute on slower systems."), importCharacter(targetActor, jsonBuild))
        }
    }).render(!0)
}

function shouldBeManuallyDeleted(i) {
    return ("feat" != i.system.type || "ancestryfeature" != i.system.featType.value) && ("spell" != i.system.type && "spellcastingEntry" != i.system.type)
}

async function importCharacter(targetActor, jsonBuild) {
    if (deleteAll) {
        fbpiDebug && console.log("%cPathbuilder2e Import | %cDeleting all items", pbcolor1, pbcolor4);
        await targetActor.deleteEmbeddedDocuments("Item", ["123"], {
            deleteAll: !0
        })
    } else if (addMoney) {
        fbpiDebug && console.log("%cPathbuilder2e Import | %cDeleting money", pbcolor1, pbcolor4);
        let items = targetActor.system.inventory.filter(i => "Platinum Pieces" === i.name || "Gold Pieces" === i.name || "Silver Pieces" === i.name || "Copper Pieces" === i.name);
        var conEven = items.map(i => i.id);
        await targetActor.deleteEmbeddedDocuments("Item", conEven)
    }
    let arrayFeats = jsonBuild.feats,
        arrayEquipment = jsonBuild.equipment,
        arrayWeapons = jsonBuild.weapons,
        arrayArmor = jsonBuild.armor,
        arraySpecials = jsonBuild.specials;
    var arrayLores = jsonBuild.lores,
        backpackData = [];
    jsonBuild.proficiencies.castingArcane, jsonBuild.proficiencies.castingDivine, jsonBuild.proficiencies.castingOccult, jsonBuild.proficiencies.castingPrimal;
    for (ref in pcAlign = jsonBuild.alignment, jsonBuild.languages) jsonBuild.languages.hasOwnProperty(ref) && (jsonBuild.languages[ref] = jsonBuild.languages[ref].toLowerCase());
    for (ref in arrayEquipment) arrayEquipment[ref][0] = mapItemToFoundryName(arrayEquipment[ref][0]);
    for (ref in fbpiDebug && console.log("%cPathbuilder2e Import | %c Working on arraySpecials: " + arraySpecials, pbcolor1, pbcolor4), arraySpecials) fbpiDebug && console.log("%cPathbuilder2e Import | %c Checking arraySpecials[ref]: " + arraySpecials[ref], pbcolor1, pbcolor4), void 0 !== arraySpecials[ref][0] && (arraySpecials[ref] = mapSpecialToFoundryName(arraySpecials[ref]));
    for (ref in fbpiDebug && console.log("%cPathbuilder2e Import | %c Finished arraySpecials: " + arraySpecials, pbcolor1, pbcolor4), fbpiDebug && console.log("%cPathbuilder2e Import | %c Working on arrayFeats: " + arrayFeats, pbcolor1, pbcolor4), arrayFeats) fbpiDebug && console.log("%cPathbuilder2e Import | %c Checking arrayFeats[ref][0]: " + arrayFeats[ref][0], pbcolor1, pbcolor4), void 0 !== arrayFeats[ref][0] && (arrayFeats[ref][0] = mapSpecialToFoundryName(arrayFeats[ref][0]));
    fbpiDebug && console.log("%cPathbuilder2e Import | %c Finished arrayFeats: " + arrayFeats, pbcolor1, pbcolor4), [arraySpecials, arrayFeats, backpackData] = findSpecialThings(arraySpecials, arrayFeats, backpackData);
    var senses = [];
    for (ref in arraySpecials) arraySpecials.hasOwnProperty(ref) && ("Low-Light Vision" == arraySpecials[ref] ? senses.push({
        exceptions: "",
        label: "Low-Light Vision",
        type: "lowLightVision",
        value: ""
    }) : "Darkvision" == arraySpecials[ref] && senses.push({
        exceptions: "",
        label: "Darkvision",
        type: "darkvision",
        value: ""
    }));
    conEven = (jsonBuild.abilities.con % 2 == 0 ? jsonBuild.abilities.con : jsonBuild.abilities.con - 1) - 10;
    let conBonus = 0;
    conBonus = 0 < conEven ? conEven / 2 : -1 * conEven / 2 * -1;
    var matches, newFeature;
    jsonBuild.attributes.bonushp, jsonBuild.attributes.classhp, jsonBuild.level, jsonBuild.attributes.ancestryhp, conBonus, jsonBuild.level;
    
    if ((await targetActor.update({
            name: jsonBuild.name,
            name: jsonBuild.name,
            "token.name": jsonBuild.name,
            "system.details.level.value": jsonBuild.level,
            "system.level.value": jsonBuild.level,
            "system.details.heritage": jsonBuild.heritage,
            "system.details.age.value": jsonBuild.age,
            "system.details.gender.value": jsonBuild.gender,
            "system.details.alignment.value": jsonBuild.alignment,
            "system.details.keyability.value": jsonBuild.keyability,
            "system.details.deity.value": jsonBuild.deity,
            "system.deity.value": jsonBuild.deity,
            "ancestry": jsonBuild.ancestry,
            "background": jsonBuild.background,
            "system.size.value": getSizeValue(jsonBuild.size),
            "system.traits.languages.value": jsonBuild.languages,
            "system.traits.senses": senses,
            "system.abilities.str.value": jsonBuild.abilities.str,
            "system.abilities.dex.value": jsonBuild.abilities.dex,
            "system.abilities.con.value": jsonBuild.abilities.con,
            "system.abilities.int.value": jsonBuild.abilities.int,
            "system.abilities.wis.value": jsonBuild.abilities.wis,
            "system.abilities.cha.value": jsonBuild.abilities.cha,
            "system.saves.fortitude.rank": jsonBuild.proficiencies.fortitude / 2,
            "system.saves.reflex.rank": jsonBuild.proficiencies.reflex / 2,
            "system.saves.will.rank": jsonBuild.proficiencies.will / 2,
            "system.martial.advanced.rank": jsonBuild.proficiencies.advanced / 2,
            "system.martial.heavy.rank": jsonBuild.proficiencies.heavy / 2,
            "system.martial.light.rank": jsonBuild.proficiencies.light / 2,
            "system.martial.medium.rank": jsonBuild.proficiencies.medium / 2,
            "system.martial.unarmored.rank": jsonBuild.proficiencies.unarmored / 2,
            "system.martial.martial.rank": jsonBuild.proficiencies.martial / 2,
            "system.martial.simple.rank": jsonBuild.proficiencies.simple / 2,
            "system.martial.unarmed.rank": jsonBuild.proficiencies.unarmed / 2,
            "system.skills.acr.rank": jsonBuild.proficiencies.acrobatics / 2,
            "system.skills.arc.rank": jsonBuild.proficiencies.arcana / 2,
            "system.skills.ath.rank": jsonBuild.proficiencies.athletics / 2,
            "system.skills.cra.rank": jsonBuild.proficiencies.crafting / 2,
            "system.skills.dec.rank": jsonBuild.proficiencies.deception / 2,
            "system.skills.dip.rank": jsonBuild.proficiencies.diplomacy / 2,
            "system.skills.itm.rank": jsonBuild.proficiencies.intimidation / 2,
            "system.skills.med.rank": jsonBuild.proficiencies.medicine / 2,
            "system.skills.nat.rank": jsonBuild.proficiencies.nature / 2,
            "system.skills.occ.rank": jsonBuild.proficiencies.occultism / 2,
            "system.skills.prf.rank": jsonBuild.proficiencies.performance / 2,
            "system.skills.rel.rank": jsonBuild.proficiencies.religion / 2,
            "system.skills.soc.rank": jsonBuild.proficiencies.society / 2,
            "system.skills.ste.rank": jsonBuild.proficiencies.stealth / 2,
            "system.skills.sur.rank": jsonBuild.proficiencies.survival / 2,
            "system.skills.thi.rank": jsonBuild.proficiencies.thievery / 2,
            "system.attributes.perception.rank": jsonBuild.proficiencies.perception / 2,
            "system.attributes.classDC.rank": jsonBuild.proficiencies.classDC / 2
        }), null == targetActor.background || targetActor.background != jsonBuild.background) && (jsonBuild.background.includes("Scholar (") ? (matches = /\(([^)]+)\)/.exec(jsonBuild.background), jsonBuild.background = "Scholar", arrayFeats.push({
            0: "Assurance",
            1: matches[1]
        })) : jsonBuild.background.includes("Squire (") && (matches = /\(([^)]+)\)/.exec(jsonBuild.background), jsonBuild.background = "Squire"), !jsonBuild.background.includes("Artisan")))
        for (const item of await game.packs.get("pf2e.backgrounds").getDocuments())
             if (item.system.slug == getSlug(jsonBuild.background) || item.system.slug == getSlugNoQuote(jsonBuild.background)) {
                allItems.push(item.system);
                 for (const backgroundFeat in item.system.items) {
                     var newFeat = [item.system.items[backgroundFeat].name, null, "Background Feat", 1];
                     arrayFeats.splice(0, 1);
                     arrayFeats.push(newFeat);
                     break
                 }
                 //}
            } let classFeatures = [];
    if (targetActor.class != jsonBuild.class) {
        fbpiDebug && console.log("%cPathbuilder2e Import | %cSetting class to: " + jsonBuild.class, pbcolor1, pbcolor4);
        for (const item of await game.packs.get("pf2e.classes").getDocuments())
            if (item.system.slug == getSlug(jsonBuild.class) || item.system.slug == getSlugNoQuote(jsonBuild.class)) {
                await targetActor.createEmbeddedDocuments("Item", [item.data]);
                for (const classFeatureItem in item.system.items) jsonBuild.level >= item.system.items[classFeatureItem].level && (newFeature = {
                    uuid: item.system.items[classFeatureItem].uuid,
                    img: item.system.items[classFeatureItem].img,
                    name: item.system.items[classFeatureItem].name,
                    level: item.system.items[classFeatureItem].level,
                    
                }, classFeatures.push(newFeature))
                
            }
    }
 if (targetActor.ancestry != jsonBuild.ancestry)
        for (const item of await game.packs.get("pf2e.ancestries").getDocuments()) item.system.slug != getSlug(jsonBuild.ancestry) && item.system.slug != getSlugNoQuote(jsonBuild.ancestry) || await targetActor.createEmbeddedDocuments("Item", [item.data]);
    if (targetActor.heritage != jsonBuild.heritage)
        for (const item of await game.packs.get("pf2e.heritages").getDocuments()) item.system.slug != getSlug(jsonBuild.heritage) && item.system.slug != getSlugNoQuote(jsonBuild.heritage) || await targetActor.createEmbeddedDocuments("Item", [item.data]);
     if (targetActor.background != jsonBuild.background)
        for (const item of await game.packs.get("pf2e.backgrounds").getDocuments()) item.system.slug != getSlug(jsonBuild.background) && item.system.slug != getSlugNoQuote(jsonBuild.background) || await targetActor.createEmbeddedDocuments("Item", [item.data]);
    
    var t = allItems.length - 1;

               
    LocationBack = allItems[t]._id;
    if (targetActor.deity != jsonBuild.deity)
        for (const item of await game.packs.get("pf2e.deities").getDocuments()) item.system.slug != getSlug(jsonBuild.deity) && item.system.slug != getSlugNoQuote(jsonBuild.background) || await targetActor.createEmbeddedDocuments("Item", [item.data]);
    //let blacklist = [jsonBuild.heritage, "Great Fortitude", "Divine Spellcasting", "Divine Ally (Blade)", "Divine Ally (Shield)", "Divine Ally (Steed)", "Divine Smite (Antipaladin)", "Divine Smite (Paladin)", "Divine Smite (Desecrator)", "Divine Smite (Liberator)", "Divine Smite (Redeemer)", "Divine Smite (Tyrant)", "Exalt (Antipaladin)", "Exalt (Paladin)", "Exalt (Desecrator)", "Exalt (Redeemer)", "Exalt (Liberator)", "Exalt (Tyrant)", "Intimidation", "Axe", "Sword", "Water", "Sword Cane", "Battle Axe", "Bane", "Air", "Occultism", "Performance", "Alchemy", "Nature", "Red", "Shark", "Green", "Divine", "Sun", "Fire", "Might", "Mace", "Bronze", "Spirit", "Zeal", "Battledancer", "Light Armor Expertise", "Religion", "Polearm", "Longsword", "Moon", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "Hammer", "Athletics", "Deception", "Society", "Occultism", "Arcane", "Simple Weapon Expertise", "Defensive Robes", "Magical Fortitude", "Occult", "Acrobatics", "Medicine", "Diplomacy", "Might", "Reflex", "Evasion", "Vigilant Senses", "Iron Will", "Lightning Reflexes", "Alertness", "Shield Block", "Anathema", "Druidic Language", "Weapon Expertise", "Armor Expertise", "Armor Mastery", "Darkvision", "Stealth", "Divine", "Shield", "Survival", "Arcana", "Will", "Fortitude", "Signature Spells", "Low-Light Vision", "Powerful Fist", "Mystic Strikes", "Incredible Movement", "Claws", "Wild Empathy", "Aquatic Adaptation", "Resolve", "Expert Spellcaster", "Master Spellcaster", "Legendary Spellcaster", "Weapon Specialization", "Mighty Rage", "Deny Advantage", "Critical Brutality", "Juggernaut", "Medium Armor Expertise", "Weapon Specialization (Barbarian)", "Greater Weapon Specialization", "Diplomacy", "Improved Evasion", "Weapon Mastery", "Incredible Senses"];
       
    
    let blacklist = [jsonBuild.heritage, "Intimidation", "Occultism", "Performance", "Nature", "Red", "Shark", "Green", "Divine", "Religion",  "", "", "", "", "", "", "", "", "", "", "", "", "", "",  "Athletics", "Deception", "Society", "Occultism", "Arcane",  "Occult", "Acrobatics", "Medicine", "Diplomacy",  "Darkvision", "Stealth", "Divine", "Survival", "Arcana", "Low-Light Vision",  "Diplomacy"];
    // for (const cf in classFeatures) blacklist.push(classFeatures[cf].name);
    //Добавить Классовые Особенности
    let classfeat = await game.packs.get("pf2e.classfeatures").getDocuments();
    
    arraySpecials = arraySpecials.filter(val => !blacklist.includes(val)), jsonBuild.specials = uniq(arraySpecials), addFeats ? (finishedClassFeatures = finishedAncestryFeatures = !0, await addFeatItems(targetActor, arrayFeats), await addFeatItems(targetActor, arraySpecials), await addActionItems(targetActor, arraySpecials), await addAncestryFeatureItems(targetActor, arraySpecials)) : (finishedClassFeatures = finishedActions = finishedAncestryFeatures = finishedFeats = !0, checkAllFinishedAndCreate(targetActor)), blacklist = ["Bracers of Armor", "", "", "", "", ""];
    
      
    for (const item of await game.packs.get("pf2e.feats-srd").getDocuments()) 
        for (const item1 in allItems) 
            if (allItems[item1].type == "feat")
                if(allItems[item1].system.featType.value == "skill" || allItems[item1].system.featType.value == "class" || allItems[item1].system.featType.value == "ancestry" || allItems[item1].system.featType.value == "general")
            item.system.slug != allItems[item1].system.slug && item.system.slug != allItems[item1].system.slug || await targetActor.createEmbeddedDocuments("Item", [allItems[item1]]);
    
    var equip = []; 
    for (const cf in allItems) blacklist.push(allItems[cf].name);
    if (allItems = allItems.filter(function(a) {
            return !this[a._id] && (this[a._id] = !0)
        }, 
        Object.create(null)), addEquipment) {
        let pack = game.packs.get("pf2e.equipment-srd"),
            content = await game.packs.get("pf2e.equipment-srd").getDocuments();
        backpackData = await pack.getDocuments("3lgwjrFEsQVKzhh7");
        let backpackInstance = [],
            arrayKit = [];
        hasAdventurersPack(arrayEquipment) && (backpackInstance = await targetActor.createEmbeddedDocuments("Inventory", backpackData), arrayKit.push(["bedroll", 1]), arrayKit.push(["chalk", 10]), arrayKit.push(["flint-and-steel", 1]), arrayKit.push(["rope", 1]), arrayKit.push(["rations", 14]), arrayKit.push(["torch", 5]), arrayKit.push(["waterskin", 1]));
        for (const action of content.filter(item => equipmentIsRequired(item, arrayEquipment, arrayWeapons, arrayArmor, arrayKit, addMoney))) {
            for (var ref in arrayEquipment)
                if (fbpiDebug && console.log("%cPathbuilder2e Import | %c arrayEquipment[ref]: " + arrayEquipment[ref], pbcolor1, pbcolor4), arrayEquipment.hasOwnProperty(ref)) {
                    var itemName = arrayEquipment[ref][0];
                    if (isNameMatch(itemName, action.system.slug) && needsNewInstanceofItem(targetActor, arrayEquipment[ref][0])) {
                        var itemAmount = arrayEquipment[ref][1];
                        arrayEquipment[ref].added = !0;
                        const clonedData = JSON.parse(JSON.stringify(action));
                        "kit" != clonedData.type && (clonedData.quantity = itemAmount, equip.push(clonedData))
                    }
                } for (var ref in arrayKit)
                if (arrayKit.hasOwnProperty(ref))
                    if (arrayKit[ref][0] === action.system.slug && needsNewInstanceofItem(targetActor, itemName)) {
                        itemAmount = arrayKit[ref][1];
                        const clonedData = JSON.parse(JSON.stringify(action));
                        clonedData.quantity = itemAmount, clonedData.containerId.value = backpackInstance.id, equip.push(clonedData)
                    } for (var ref in arrayWeapons)
                if (arrayWeapons.hasOwnProperty(ref)) {
                    var material, weaponDetails = arrayWeapons[ref];
                    if (isNameMatch(weaponDetails.name, action.system.slug) && needsNewInstanceofItem(targetActor, weaponDetails.name)) {
                        weaponDetails.added = !0;
                        const clonedData = JSON.parse(JSON.stringify(action));
                        clonedData.system.quantity = weaponDetails.qty, clonedData.system.damage.die = weaponDetails.die, clonedData.system.potencyRune.value = weaponDetails.pot, clonedData.system.strikingRune.value = weaponDetails.str, weaponDetails.runes[0] && (clonedData.system.propertyRune1.value = camelCase(weaponDetails.runes[0])), weaponDetails.runes[1] && (clonedData.system.propertyRune2.value = camelCase(weaponDetails.runes[1])), weaponDetails.runes[2] && (clonedData.system.propertyRune3.value = camelCase(weaponDetails.runes[2])), weaponDetails.runes[3] && (clonedData.system.propertyRune4.value = camelCase(weaponDetails.runes[3])), weaponDetails.mat && (material = weaponDetails.mat.split(" (")[0], clonedData.system.preciousMaterial.value = camelCase(material), clonedData.system.preciousMaterialGrade.value = getMaterialGrade(weaponDetails.mat)), weaponDetails.display && (clonedData.name = weaponDetails.display), equip.push(clonedData)
                    }
                } for (var ref in arrayArmor)
                if (arrayArmor.hasOwnProperty(ref)) {
                    var armorDetails = arrayArmor[ref];
                    if (fbpiDebug && console.log("%cPathbuilder2e Import | %c armorDetails.name: " + armorDetails.name, pbcolor1, pbcolor4), isNameMatch(armorDetails.name, action.system.slug) && needsNewInstanceofItem(targetActor, armorDetails.name)) {
                        armorDetails.added = !0;
                        const clonedData = JSON.parse(JSON.stringify(action));
                        if (notBracersOfArmor(armorDetails.name)) {
                            if (clonedData.system.quantity = armorDetails.qty, clonedData.system.category = armorDetails.prof, clonedData.system.potencyRune.value = armorDetails.pot, clonedData.system.resiliencyRune.value = armorDetails.res, armorDetails.worn ? clonedData.system.equipped.inSlot = !0 : clonedData.system.equipped.inSlot = !1, armorDetails.runes[0] && (clonedData.system.propertyRune1.value = camelCase(armorDetails.runes[0])), armorDetails.runes[1] && (clonedData.system.propertyRune2.value = camelCase(armorDetails.runes[1])), armorDetails.runes[2] && (clonedData.propertyRune3.value = camelCase(armorDetails.runes[2])), armorDetails.runes[3] && (clonedData.system.propertyRune4.value = camelCase(armorDetails.runes[3])), armorDetails.mat) {
                                let material = armorDetails.mat.split(" (")[0];
                                clonedData.system.preciousMaterial.value = camelCase(material), clonedData.system.preciousMaterialGrade.value = getMaterialGrade(armorDetails.mat)
                            }
                            armorDetails.display && (clonedData.name = armorDetails.display)
                        }
                        equip.push(clonedData)
                    }
                } if (addMoney)
                if ("platinum-pieces" === action.system.slug) {
                     const clonedData = JSON.parse(JSON.stringify(action));
                    clonedData.system.quantity = jsonBuild.money.pp, equip.push(clonedData)
                } else if ("gold-pieces" === action.system.slug) {
                const clonedData = JSON.parse(JSON.stringify(action));
                clonedData.system.quantity = jsonBuild.money.gp, equip.push(clonedData)
            } else if ("silver-pieces" === action.system.slug) {
                 const clonedData = JSON.parse(JSON.stringify(action));
                clonedData.system.quantity = jsonBuild.money.sp, equip.push(clonedData)
            } else if ("copper-pieces" === action.system.slug) {
                const clonedData = JSON.parse(JSON.stringify(action));
                clonedData.system.quantity = jsonBuild.money.cp, equip.push(clonedData)
            }
        }
        finishedEquipment = !0, checkAllFinishedAndCreate(targetActor)
    } else finishedEquipment = !0, checkAllFinishedAndCreate(targetActor);

    var i = 0;
    for (const item1 in equip)
        {
            if(i == equip.length) break; else i++; 
           await targetActor.createEmbeddedDocuments("Item", [equip[item1]]); 
        }

    i = 0;

    
    addSpellcasters ? setSpellcasters(targetActor, jsonBuild.spellCasters) : (finishedSpells = !0, checkAllFinishedAndCreate(targetActor)), addLores(targetActor, arrayLores);     
    

}



function getExistingAncestrySlug(targetActor) {
    for (var item in targetActor.data.items)
        if (targetActor.data.items.hasOwnProperty(item)) {
            item = targetActor.system.items[item];
            if ("ancestry" == item.type) return item.data.slug
        } return null
}


function notBracersOfArmor(name) {
    return !name.toLowerCase().includes("bracers of armor")
}

function camelCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
        return 0 == index ? word.toLowerCase() : word.toUpperCase()
    }).replace(/\s+/g, "")
}

function getMaterialGrade(material) {
    return material.toLowerCase().includes("high-grade") ? "high" : material.toLowerCase().includes("standard-grade") ? "standard" : "low"
}

function makeid(length) {
    for (var result = "", characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", charactersLength = characters.length, i = 0; i < length; i++) result += characters.charAt(Math.floor(Math.random() * charactersLength));
    return result
}

async function addFeatItems(targetActor, arrayFeats) {
    var usedLocations = [];
    allItems.push(JSON.parse(JSON.stringify(targetActor.feats)));
    fbpiDebug && console.log("%cPathbuilder2e Import | %c addFeatItems: " + arrayFeats, pbcolor1, pbcolor4);
    let content = await game.packs.get("pf2e.feats-srd").getDocuments();
    for (const action of content.filter(item => featIsRequired(item, arrayFeats)))
        for (var ref in arrayFeats)
            if (fbpiDebug && console.log("%cPathbuilder2e Import | %c Looking at feat: " + arrayFeats[ref], pbcolor1, pbcolor4), arrayFeats.hasOwnProperty(ref)) {
                var pathbuilderFeatItem = arrayFeats[ref],
                    itemName = pathbuilderFeatItem[0],
                    itemExtra = pathbuilderFeatItem[1];
                if (isNameMatch(itemName, action.data.data.slug) && needsNewInstanceofFeat(targetActor, itemName, itemExtra)) {
                    var location, displayName = itemName;
                    addedItems.push(action.name);
                    const clonedData = JSON.parse(JSON.stringify(action));
                    clonedData.name = action.name;
                    try {
                        pathbuilderFeatItem[2] && pathbuilderFeatItem[3] && (location = getFoundryFeatLocation(pathbuilderFeatItem[2], pathbuilderFeatItem[3]), usedLocations.includes(location) || (clonedData.system.location = location, usedLocations.push(location)))
                    } catch (err) {
                        console.log(err)
                    }
                    if(pathbuilderFeatItem[2] == "Background Feat") break;
                    
                    if (clonedData.type == "feat")
                        if(!pathbuilderFeatItem[2]) break;
                    clonedData._id = makeid(16);
                    // if(action.data.system.featType.value == "skill")
                    //allItems[allItems.length - 1].feats.push(clonedData);
                    //action.system.location = "z9Ygvj4Dbgh2kPDZ";
                    allItems.push(clonedData)
                    
                    // allItems.push(targetActor.feats.contents[4]);
                    // allItems[allItems.length - 1].feats[0] = clonedData;
                    // allItems[allItems.length - 1].feats.push(clonedData);
                }
            } 
    /*
    content = await game.packs.get("pf2e.ancestryfeatures").getDocuments();
    
    for (const action of content.filter(item => featIsRequired(item, arrayFeats)))
        for (var ref in arrayFeats) {
           //arraySpecials.hasOwnProperty(ref) && isNameMatch(itemName = arraySpecials[ref], action.name) && needsNewInstanceofItem(targetActor, itemName) && (addedItems.push(itemName), allItems.push(action));

            const clonedData = JSON.parse(JSON.stringify(action));   
            clonedData._id = makeid(16);
            //ArSp.push(action.uuid);
            if(!clonedData.system.slug != "deitys-domain")
            {
                allItems.push(clonedData);
            }
            break
        } 
    */
    finishedFeats = !0, checkAllFinishedAndCreate(targetActor)
}

function isNameMatch(pathbuilderItemName, foundryItemSlug) {
    return getSlug(pathbuilderItemName) == foundryItemSlug || (getSlugNoQuote(pathbuilderItemName) == foundryItemSlug || (getSlug(getClassAdjustedSpecialNameLowerCase(pathbuilderItemName)) == foundryItemSlug || (getSlug(getAncestryAdjustedSpecialNameLowerCase(pathbuilderItemName)) == foundryItemSlug || getSlug(getHeritageAdjustedSpecialNameLowerCase(pathbuilderItemName)) == foundryItemSlug)))
}
async function addActionItems(targetActor, arraySpecials) {
    let content = await game.packs.get("pf2e.actionspf2e").getDocuments();
    for (const action of content.filter(item => specialIsRequired(item, arraySpecials)))
        for (var itemName in arraySpecials) !arraySpecials.hasOwnProperty(itemName) || isNameMatch(itemName = arraySpecials[itemName], action.system.slug) && needsNewInstanceofItem(targetActor, itemName) && (addedItems.push(itemName), allItems.push(action.system));
    finishedActions = !0, checkAllFinishedAndCreate(targetActor)
}
async function addAncestryFeatureItems(targetActor, arraySpecials) {
    let content = await game.packs.get("pf2e.ancestryfeatures").getDocuments();
    for (const action of content.filter(item => specialIsRequired(item, arraySpecials)))
        for (var itemName in arraySpecials) !arraySpecials.hasOwnProperty(itemName) || isNameMatch(itemName = arraySpecials[itemName], action.system.slug) && needsNewInstanceofItem(targetActor, itemName) && (addedItems.push(itemName), allItems.push(action.system));
    finishedAncestryFeatures = !0, checkAllFinishedAndCreate(targetActor)
}
// async function addHeritageFeatureFeatItems(targetActor, arraySpecials) {
//     let content = await game.packs.get("pf2e.ancestryfeatures").getDocuments();
//     for (const action of content.filter(item => specialIsRequired(item, arraySpecials)))
//         for (var itemName in arraySpecials) !arraySpecials.hasOwnProperty(itemName) || isNameMatch(itemName = arraySpecials[itemName], action.system.slug) && needsNewInstanceofItem(targetActor, itemName) && (addedItems.push(itemName), allItems.push(action.system));
//     finishedHeritageFeatureFeats = !0, checkAllFinishedAndCreate(targetActor)
// }
async function addClassFeatureItems(targetActor, arraySpecials, arrayCF) {

    
    let content = await game.packs.get("pf2e.classfeatures").getDocuments();
    var ArSp = [];
    var last = [];
    var Muse;
    for (var ref in arraySpecials) 
    {
        if(arraySpecials.hasOwnProperty(ref))
        {
            if(arraySpecials[ref].indexOf(':') > -1)
            {
                var ar = arraySpecials[ref].indexOf(':') + 1;
                if(arraySpecials[ref].slice(0, ar - 1) == "Bloodline") 
                {
                    last.push = arraySpecials[ref];
                    arraySpecials[ref] = arraySpecials[ref].slice(0, ar - 1);
                    
                }
                else
                {
                    last.push(arraySpecials[ref].slice(ar + 1, arraySpecials[ref].length));
                    arraySpecials[ref] = arraySpecials[ref].slice(0, ar - 1);
                }
                
                 
            }
        }

         if(arraySpecials.hasOwnProperty(ref))
        {
            if(arraySpecials[ref].indexOf(' Muse') > -1)
            {
                var ar = arraySpecials[ref].indexOf(' Muse') ;
                Muse = arraySpecials[ref].slice(ar, arraySpecials[ref].length);
                arraySpecials[ref] = arraySpecials[ref].slice(0, ar);
            }
        }
        
        if(arraySpecials.hasOwnProperty(ref))
        {
            if(arraySpecials[ref].indexOf(' Racket') > -1)
            {
                var ar = arraySpecials[ref].indexOf(' Racket') ;
                Muse = arraySpecials[ref].slice(ar, arraySpecials[ref].length);
                arraySpecials[ref] = arraySpecials[ref].slice(0, ar);
            }
        }
        
         if(arraySpecials.hasOwnProperty(ref))
        {
            if(arraySpecials[ref].indexOf(' Mystery') > -1)
            {
                var ar = arraySpecials[ref].indexOf(' Mystery') ;
                Muse = arraySpecials[ref].slice(ar, arraySpecials[ref].length);
                arraySpecials[ref] = arraySpecials[ref].slice(0, ar);
            }
        }

        if(arraySpecials.hasOwnProperty(ref))
        {
            if(arraySpecials[ref] == "Swashbuckler's Style")  arraySpecials[ref] == "Swashbucklers Style";
        }
    } 
    for (var ref in last) arraySpecials.push(last[ref]);
    
    for (const action of content.filter(item => specialIsRequired(item, arraySpecials)))
        for (var ref in arraySpecials) {
           //arraySpecials.hasOwnProperty(ref) && isNameMatch(itemName = arraySpecials[ref], action.name) && needsNewInstanceofItem(targetActor, itemName) && (addedItems.push(itemName), allItems.push(action));

            const clonedData = JSON.parse(JSON.stringify(action));   
            clonedData._id = makeid(16);
            ArSp.push(action.uuid);
            if(!clonedData.system.slug != "deitys-domain")
            {
                allItems.push(clonedData);
            }
            break
        } 
    
     for (var ref in arraySpecials) {
        var ChoiceClass = wp.find(function(item) {
                return item == arraySpecials[ref]
        });
        if(ChoiceClass)
            ArSp.push(ChoiceClass)
    }
    
    let classFeatures = arrayCF.map(a => a.name);       
    for (var action of content.filter(item => specialIsRequired(item, classFeatures)))
        for (var ref in classFeatures) {
            //arraySpecials.hasOwnProperty(ref) && isNameMatch(itemName = arraySpecials[ref], action.name) && needsNewInstanceofItem(targetActor, itemName) && (addedItems.push(itemName), allItems.push(action));
              

            const clonedData = JSON.parse(JSON.stringify(action));         
            clonedData._id = makeid(16);
            //clonedData._id = makeid(16);
            if(!clonedData.system.slug != "deitys-domain")
            {
                allItems.push(clonedData);
            };
            break
        } 
    
    
    for (const action of content.filter(item => specialIsRequired(item, classFeatures)))
        for (var ref in classFeatures) {
            var itemName;
            isNameMatch(itemName = classFeatures[ref], action.name) && needsNewInstanceofItem(targetActor, itemName) && (addedItems.push(itemName), allItems.push(action))
             // const clonedData = JSON.parse(JSON.stringify(arrayCF[ref])); 
             // clonedData._id = makeid(16);
  
             //        allItems.push(clonedData)
        }

    var Domain1, dubl, isdubl = false;
    
    for(var ref in allItems)
    {
        dubl = allItems[ref];
        if(allItems[ref].system) 
          if(allItems[ref].system.slug == "deitys-domain" || allItems[ref].system.slug == "domain-initiate")
            {
                allItems.splice(ref, 1);
                continue
            } 
        
            for(var ref1 in allItems)
            {
                var sum = parseInt(ref1) + parseInt(ref) + 1;
                var ref2 = sum.toString()
                if(ref2 == "NaN") break
                if(allItems.length <= sum) break
                if(allItems[ref2].system)
                { 
                    if(dubl.system)
                    if(allItems[ref2].system.slug == dubl.system.slug && allItems[ref2].system.featType.value == "classfeature" && dubl.system.featType.value  == "classfeature")
                    {
                       allItems.splice(ref2, 1);
                       isdubl = true 
                    }
                    else if(dubl.slug)
                    {
                        if(allItems[ref2].system.slug == dubl.slug && allItems[ref2].featType.value == "classfeature" && dubl.system.featType.value == "classfeature")
                        {
                           allItems.splice(ref2, 1);
                            isdubl = true 
                        }
                    }
                }
            }
        if(isdubl)
        {
            //allItems.push(dubl);
            isdubl = false;
        }
    }

    var PathN = 1;
    for (var t in ArSp)  
    for(var ref in allItems)
        if(allItems[ref].type != "feat")

            
    finishedClassFeatures = !0, checkAllFinishedAndCreate(targetActor)
}

function hasAdventurersPack(arrayEquipment) {
    for (var ref in arrayEquipment)
        if (arrayEquipment.hasOwnProperty(ref))
            if ("Adventurer's Pack" === arrayEquipment[ref][0]) return arrayEquipment[ref].added = !0;
    return !1
}

function isSpecialsPack(packName) {
    return "actionspf2e" === packName || "ancestryfeatures" === packName || "classfeatures" === packName
}

function featIsRequired(item, arrayFeats) {
    for (var featDetails in arrayFeats)
        if (arrayFeats.hasOwnProperty(featDetails)) {
            if (getSlug(arrayFeats[featDetails][0]) == item.system.slug) return !0;
            if (getSlugNoQuote(arrayFeats[featDetails][0]) == item.system.slug) return !0;
            if (getSlug(getClassAdjustedSpecialNameLowerCase(arrayFeats[featDetails][0])) == item.system.slug) return !0;
            if (getSlug(getAncestryAdjustedSpecialNameLowerCase(arrayFeats[featDetails][0])) == item.system.slug) return !0;
            if (getSlug(getHeritageAdjustedSpecialNameLowerCase(arrayFeats[featDetails][0])) == item.system.slug) return !0
        } return !1
}

function specialIsRequired(item, arraySpecials) {
    for (var ref in arraySpecials)
        if (arraySpecials.hasOwnProperty(ref)) {
            if (getSlug(arraySpecials[ref]) == item.system.slug || getSlugNoQuote(arraySpecials[ref]) == item.system.slug) return !0;
            if (getSlug(getClassAdjustedSpecialNameLowerCase(arraySpecials[ref])) == item.system.slug || getSlugNoQuote(getClassAdjustedSpecialNameLowerCase(arraySpecials[ref])) == item.system.slug) return !0;
            if (getSlug(getAncestryAdjustedSpecialNameLowerCase(arraySpecials[ref])) == item.system.slug || getSlugNoQuote(getAncestryAdjustedSpecialNameLowerCase(arraySpecials[ref])) == item.system.slug) return !0;
            if (getSlug(getHeritageAdjustedSpecialNameLowerCase(arraySpecials[ref])) == item.system.slug || getSlugNoQuote(getHeritageAdjustedSpecialNameLowerCase(arraySpecials[ref])) == item.system.slug) return !0
        } return !1
}

function equipmentIsRequired(item, arrayEquipment, arrayWeapons, arrayArmor, arrayKit, addMoney) {
    for (var ref in arrayEquipment)
        if (arrayEquipment.hasOwnProperty(ref)) {
            if (getSlug(arrayEquipment[ref][0]) === item.system.slug) return !0;
            if (getSlugNoQuote(arrayEquipment[ref][0]) === item.system.slug) return !0
        } for (var ref in arrayWeapons)
        if (arrayWeapons.hasOwnProperty(ref)) {
            if (getSlug(arrayWeapons[ref].name) === item.system.slug) return !0;
            if (getSlugNoQuote(arrayWeapons[ref].name) === item.system.slug) return !0
        } for (var ref in arrayArmor)
        if (arrayArmor.hasOwnProperty(ref)) {
            if (arrayArmor[ref].name = mapItemToFoundryName(arrayArmor[ref].name), getSlug(arrayArmor[ref].name) === item.system.slug) return !0;
            if (getSlugNoQuote(arrayArmor[ref].name) === item.system.slug) return !0
        } for (var ref in arrayKit)
        if (arrayKit.hasOwnProperty(ref) && arrayKit[ref][0] === item.system.slug) return !0;
    return !(!addMoney || "platinum-pieces" !== item.system.slug && "gold-pieces" !== item.system.slug && "silver-pieces" !== item.system.slug && "copper-pieces" !== item.system.slug)
}

function getClassAdjustedSpecialNameLowerCase(specialName) {
    return (specialName + " (" + jsonBuild.class + ")").toLowerCase()
}

function getAncestryAdjustedSpecialNameLowerCase(specialName) {
    return (specialName + " (" + jsonBuild.ancestry + ")").toLowerCase()
}

function getHeritageAdjustedSpecialNameLowerCase(specialName) {
    return (specialName + " (" + jsonBuild.heritage + ")").toLowerCase()
}

function needsNewInstanceofFeat(targetActor, itemName, itemExtra) {
    for (const existingItem of targetActor.data.items) {
        var displayName = itemName;
        if (null != itemExtra && (displayName += " (" + itemExtra + ")"), existingItem.data.name === displayName) return !1
    }
    return !0
}

function needsNewInstanceofItem(targetActor, itemName) {
    for (var ref in targetActor.data.items)
        if (targetActor.data.items.hasOwnProperty(ref) && targetActor.data.items[ref].name === itemName) return !1;
    return !0
}

function getSizeValue(size) {
    switch (size) {
        case 0:
            return "tiny";
        case 1:
            return "sm";
        case 3:
            return "lg"
    }
    return "med"
}

//Заклинания - импорт (пока что только в подготовленные)
async function setSpellcasters(targetActor, arraySpellcasters) {
    fbpiDebug && console.log("%cPathbuilder2e Import | %cDeleting all spells", pbcolor1, pbcolor4);
    
    
    let items = targetActor.data.items.filter(i => "spell" === i.type);
    var spellListObject, deletions = items.map(i => i.id);
    var count = 0;
    await targetActor.deleteEmbeddedDocuments("Item", deletions);
    items = targetActor.data.items.filter(i => "spellcastingEntry" === i.type), deletions = items.map(i => i.id), await targetActor.deleteEmbeddedDocuments("Item", deletions);
    let requiredSpells = [];
    for (ref in arraySpellcasters)
        if (arraySpellcasters.hasOwnProperty(ref)) {
            let spellCaster = arraySpellcasters[ref];
            for (var ref in focusPool += spellCaster.focusPoints, "focus" == spellCaster.magicTradition ? (focusWarning = 1, spellCaster.instance = await addSpecificCasterAndSpells(targetActor, spellCaster, "divine", spellCaster.magicTradition)) : spellCaster.instance = await addSpecificCasterAndSpells(targetActor, spellCaster, spellCaster.magicTradition, spellCaster.spellcastingType), spellCaster.spells) spellCaster.spells.hasOwnProperty(ref) && (spellListObject = spellCaster.spells[ref], requiredSpells = requiredSpells.concat(spellListObject.list))
        } game.packs.filter(pack => "spells-srd" === pack.metadata.name).forEach(async pack => {
        const content = await pack.getDocuments();
        for (const action of content.filter(item => spellIsRequired(item, requiredSpells))) arraySpellcasters.forEach(spellCaster => {
            for (var ref in spellCaster.spells)
                if (spellCaster.spells.hasOwnProperty(ref)) {
                    let spellListObject = spellCaster.spells[ref];
                    for (var ref in spellListObject.list)
                        if (spellListObject.list.hasOwnProperty(ref) && (getSlug(spellListObject.list[ref]) == action.system.slug || getSlugNoQuote(spellListObject.list[ref]) == action.system.slug)) {
                            const clonedData = JSON.parse(JSON.stringify(action));
                            clonedData.system.location.value = spellCaster.instance[0].id, 0 == spellListObject.spellLevel ? clonedData.system.level.value = 1 : clonedData.system.level.value = spellListObject.spellLevel; 
                            
                            // var slotsN; 
                            // slotsN = "slot" + spellListObject.spellLevel.toString();
                            // var Spell = ["0", action._id ];
                            // if(spellCaster.instance[0].system.slots.slotsN.prepared)
                            //    spellCaster.instance[0].system.slots.slotsN.prepared.push(Spell) 
                            // clonedData.instance[0].system.slots.slotsN.push(spellCaster);
                            
                            
                            
                            allSpells.push(clonedData);
                            
                            break
                        }
                }
        });
        finishedSpells = !0, checkAllFinishedAndCreate(targetActor)
    })
}

function spellIsRequired(item, arraySpells) {
    for (var ref in arraySpells)
        if (arraySpells.hasOwnProperty(ref) && getSlug(arraySpells[ref]) == item.system.slug) return !0;
    return !1
}
async function addSpecificCasterAndSpells(targetActor, spellCaster, data, spellCasterInstance) {
    data = {
        ability: {
            value: spellCaster.ability
        },
        proficiency: {
            value: spellCaster.proficiency / 2
        },
        spelldc: {
            item: 0
        },
        tradition: {
            value: data
        },
        prepared: {
            value: spellCasterInstance,
            flexible: !1
        },
        slots: {
            slot0: {
                max: spellCaster.perDay[0],
                prepared: [],
                value: spellCaster.perDay[0]
            },
            slot1: {
                max: spellCaster.perDay[1],
                prepared: [],
                value: spellCaster.perDay[1]
            },
            slot2: {
                max: spellCaster.perDay[2],
                prepared: [],
                value: spellCaster.perDay[2]
            },
            slot3: {
                max: spellCaster.perDay[3],
                prepared: [],
                value: spellCaster.perDay[3]
            },
            slot4: {
                max: spellCaster.perDay[4],
                prepared: [],
                value: spellCaster.perDay[4]
            },
            slot5: {
                max: spellCaster.perDay[5],
                prepared: [],
                value: spellCaster.perDay[5]
            },
            slot6: {
                max: spellCaster.perDay[6],
                prepared: [],
                value: spellCaster.perDay[6]
            },
            slot7: {
                max: spellCaster.perDay[7],
                prepared: [],
                value: spellCaster.perDay[7]
            },
            slot8: {
                max: spellCaster.perDay[8],
                prepared: [],
                value: spellCaster.perDay[8]
            },
            slot9: {
                max: spellCaster.perDay[9],
                prepared: [],
                value: spellCaster.perDay[9]
            },
            slot10: {
                max: spellCaster.perDay[10],
                prepared: [],
                value: spellCaster.perDay[10]
            }
        },
        showUnpreparedSpells: {
            value: !0
        }
    }, spellCasterInstance = [], data = {
        name: spellCaster.name,
        type: "spellcastingEntry",
        data: data
    };
    spellCasterInstance.push(data);
    spellCasterInstance = await targetActor.createEmbeddedDocuments("Item", spellCasterInstance);
    return fbpiDebug && console.log(spellCasterInstance), spellCasterInstance
}
async function addLores(targetActor, arrayLores) {
    const arrayLoreData = [];
    for (var ref in arrayLores)
        if (arrayLores.hasOwnProperty(ref)) {
            var update, loreName = arrayLores[ref][0],
                loreProf = arrayLores[ref][1];
            if (needsNewInstanceOfLore(targetActor, loreName)) arrayLoreData.push({
                name: loreName,
                type: "lore",
                data: {
                    proficient: {
                        value: loreProf / 2
                    },
                    featType: "",
                    mod: {
                        value: 0
                    },
                    item: {
                        value: 0
                    }
                }
            });
            else
                for (var ref in targetActor.data.items) targetActor.data.items.hasOwnProperty(ref) && targetActor.data.items[ref].name === loreName && (update = {
                    id: targetActor.data.items[ref].id,
                    "system.proficient.value": loreProf / 2
                }, targetActor.updateEmbeddedEntity("Item", update))
        } 0 < arrayLoreData.length && targetActor.createEmbeddedDocuments("Item", arrayLoreData)
}

function needsNewInstanceOfLore(targetActor, loreName) {
    for (var ref in targetActor.system.skills)
        if (targetActor.system.skills.hasOwnProperty(ref) && targetActor.system.skills[ref].slug === loreName) return !1;
    return !0
}

function checkAllFinishedAndCreate(targetActor) {
    var item, heroJSON;
    var i = 0;
        for (const item1 in allSpells)
        {
            if(i == allSpells.length) break; else i++; 
               targetActor.createEmbeddedDocuments("Item", [allSpells[item1]]); 
        }

    if (finishedFeats && finishedEquipment && finishedSpells && finishedActions && finishedAncestryFeatures && finishedClassFeatures) {
        let notAddedCount = 0,
            warningList = "",
           warning = "<p>The following items could not be added. They may have already have been added in a previous import or cannot be matched to a foundry item. You may be able to find them with a manual search.</p><ul>";
        if (addEquipment)
            for (var ref in jsonBuild.equipment) jsonBuild.equipment.hasOwnProperty(ref) && ((item = jsonBuild.equipment[ref]).added || (notAddedCount++, warning += "<li>Equipment: " + item[0] + "</li>", warningList += "Equipment: " + item[0] + "|", fbpiDebug && console.log("%cPathbuilder2e Import | %cdid not add " + item[0], pbcolor1, pbcolor4)));
        if (addFeats) {
            for (var ref in jsonBuild.feats) 
              jsonBuild.feats.hasOwnProperty(ref) && (item = jsonBuild.feats[ref], addedItems.includes(item[0]) && item.Array || (notAddedCount++, warning += "<li>Feat: " + item[0] + "</li>", warningList += "Feat: " + item[0] + "|", fbpiDebug && console.log("%cPathbuilder2e Import | %cdid not add " + item[0], pbcolor1, pbcolor4)));
            for (var ref in targetActor.update({
                    "flags.exportSource.world": game.world.id,
                    "flags.exportSource.system": game.system.id,
                    "flags.exportSource.systemVersion": game.system.data.version,
                    "flags.exportSource.coreVersion": game.data.version,
                    "flags.pathbuilderID.value": buildID
                }), targetActor.update({
                    "system.resources.focus.max": focusPool,
                    "system.resources.focus.value": focusPool
                }), targetActor.update({
                    "system.attributes.hp.value": 1234
                }), jsonBuild.specials) jsonBuild.specials.hasOwnProperty(ref) && (item = jsonBuild.specials[ref], addedItems.includes(item) || (notAddedCount++, warning += "<li>Special: " + item + "</li>", warningList += "Special: " + item + "|", fbpiDebug && console.log("%cPathbuilder2e Import | %cdid not add " + item, pbcolor1, pbcolor4)))
        }
        notAddedCount = 0;
        warning += "</ul><br>", 0 < focusWarning && (0 < notAddedCount ? warning += "<strong>You have focus spells and Pathbuilder does not export the tradition of focus spells. This importer automatically sets their tradition to divine. If this is incorrect, edit the focus spells entry to fix it.</strong><br>" : warning = "<strong>You have focus spells and Pathbuilder does not export the tradition of focus spells. This importer automatically sets their tradition to divine. If this is incorrect, edit the focus spells entry to fix it.</strong><br>", notAddedCount++), reportMissedItems && reportWarnings(warningList), 0 < notAddedCount ? (ui.notifications.warn("Import completed with some warnings."), 
        new Dialog({
            title: "Pathbuilder Import Warning",
            content: warning,
            buttons: {
                yes: {
                    icon: "<i class='fas fa-check'></i>",
                    label: "Finished"
                }
            },
            default: "yes",
            close: html => {
                var heroJSON;
                heroVaultExport && (heroJSON = JSON.stringify(targetActor.data), fbpiDebug && console.log(heroJSON), doHVExport(heroJSON, targetActor))
            }
        }).render(!0)) : (ui.notifications.info("Import completed successfully."), 
        heroVaultExport && (heroJSON = JSON.stringify(targetActor.data), fbpiDebug && console.log(heroJSON), doHVExport(heroJSON, targetActor)))
    }
}

function reportWarnings(warnings) {
    var systemVersion = game.system.data.version,
        coreVersion = game.data.version,
        xmlhttp = new XMLHttpRequest;
    //xmlhttp.open("POST", reportDomain + "/pbreport.php", !0), xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), xmlhttp.send("buildID=" + buildID + "&warnings=" + encodeURIComponent(warnings) + "&systemVersion=" + encodeURIComponent(systemVersion) + "&coreVersion=" + encodeURIComponent(coreVersion) + "&fpbi=" + encodeURIComponent(fpbi))
}

function getSlug(itemName) {
    return itemName.toString().toLowerCase().replace(/[^a-z0-9]+/gi, " ").trim().replace(/\s+|-{2,}/g, "-")
}

function getSlugNoQuote(itemName) {
    return itemName.toString().toLowerCase().replace(/[\']+/gi, "").replace(/[^a-z0-9]+/gi, " ").trim().replace(/\s+|-{2,}/g, "-")
}

function mapItemToFoundryName(itemName) {
    fbpiDebug && console.log("%cPathbuilder2e Import | %c Checking map for '" + itemName + "'", pbcolor1, pbcolor4);
    const changeNames = [{
        name: "Chain",
        newname: "Chain (10 feet)"
    }, {
        name: "Oil",
        newname: "Oil (1 pint)"
    }, {
        name: "Bracelets of Dashing",
        newname: "Bracelet of Dashing"
    }, {
        name: "Fingerprinting Kit",
        newname: "Fingerprint Kit"
    }, {
        name: "Greater Unmemorable Mantle",
        newname: "Unmemorable Mantle (Greater)"
    }, {
        name: "Major Unmemorable Mantle",
        newname: "Unmemorable Mantle (Major)"
    }, {
        name: "Ladder",
        newname: "Ladder (10-foot)"
    }, {
        name: "Mezmerizing Opal",
        newname: "Mesmerizing Opal"
    }, {
        name: "Explorer's Clothing",
        newname: "Clothing (Explorer's)"
    }, {
        name: "Flaming Star (Greater)",
        newname: "Greater Flaming Star"
    }, {
        name: "Potion of Lesser Darkvision",
        newname: "Darkvision Elixir (Lesser)"
    }, {
        name: "Bottled Sunlight",
        newname: "Formulated Sunlight"
    }, {
        name: "Magazine (Repeating Hand Crossbow)",
        newname: "Magazine with 5 Bolts"
    }, {
        name: "Astrolabe (Standard)",
        newname: "Standard Astrolabe"
    }, {
        name: "Greater Cloak of Repute",
        newname: "Cloak of Repute (Greater)"
    }, {
        name: "Skinitch Salve",
        newname: "Skinstitch Salve"
    }, {
        name: "Flawless Scale",
        newname: "Abadar's Flawless Scale"
    }, {
        name: "Construct Key",
        newname: "Cordelia's Construct Key"
    }, {
        name: "Construct Key (Greater)",
        newname: "Cordelia's Greater Construct Key"
    }, {
        name: "Lesser Swapping Stone",
        newname: "Lesser Bonmuan Swapping Stone"
    }, {
        name: "Major Swapping Stone",
        newname: "Major Bonmuan Swapping Stone"
    }, {
        name: "Moderate Swapping Stone",
        newname: "Moderate Bonmuan Swapping Stone"
    }, {
        name: "Greater Swapping Stone",
        newname: "Greater Bonmuan Swapping Stone"
    }, {
        name: "Heartstone",
        newname: "Skarja's Heartstone"
    }, {
        name: "",
        newname: ""
    }, {
        name: "",
        newname: ""
    }, {
        name: "",
        newname: ""
    }, {
        name: "",
        newname: ""
    }, {
        name: "",
        newname: ""
    }];
    var newNameIdx = changeNames.findIndex(function(item) {
        return item.name == itemName
    });
    return -1 < newNameIdx ? changeNames[newNameIdx].newname : itemName
}

function mapSpecialToFoundryName(itemName) {
    fbpiDebug && console.log("%cPathbuilder2e Import | %cChecking map for '" + itemName + "'", pbcolor1, pbcolor4);
    const changeNames = [{
        name: "Deflect Arrows",
        newname: "Deflect Arrow"
    }, {
        name: "Maestro",
        newname: "Maestro Muse"
    }, {
        name: "Tenets of Evil",
        newname: "The Tenets of Evil"
    }, {
        name: "Antipaladin [Chaotic Evil]",
        newname: "Antipaladin"
    }, {
        name: "Paladin [Lawful Good]",
        newname: "Paladin"
    }, {
        name: "Redeemer [Neutral Good]",
        newname: "Redeemer"
    }, {
        name: "Liberator [Chaotic Good]",
        newname: "Liberator"
    }, {
        name: "Tyrant [Lawful Evil]",
        newname: "Tyrant"
    }, {
        name: "Desecrator [Neutral Evil]",
        newname: "Desecrator"
    }, {
        name: "Harmful Font",
        newname: "Divine Font"
    }, {
        name: "Healing Font",
        newname: "Divine Font"
    }, {
        name: "Deepvision",
        newname: "Deep Vision"
    }, {
        name: "Wind God's Fan",
        newname: "Wind God’s Fan"
    }, {
        name: "Redeemer [Neutral Good]",
        newname: "Redeemer"
    }, {
        name: "Enigma",
        newname: "Enigma Muse"
    }, {
        name: "Polymath",
        newname: "Polymath Muse"
    }, {
        name: "Warrior",
        newname: "Warrior Muse"
    }, {
        name: "Multifarious",
        newname: "Multifarious Muse"
    }, {
        name: "Constructed (Android)",
        newname: "Constructed"
    }, {
        name: "Wakizashi",
        newname: "Wakizashi Weapon Familiarity"
    }, {
        name: "Katana",
        newname: "Katana Weapon Familiarity"
    }, {
        name: "Marked for Death",
        newname: "Mark for Death"
    }, {
        name: "Precise Debilitation",
        newname: "Precise Debilitations"
    }, {
        name: "Major Lesson I",
        newname: "Major Lesson"
    }, {
        name: "Major Lesson II",
        newname: "Major Lesson"
    }, {
        name: "Major Lesson III",
        newname: "Major Lesson"
    }, {
        name: "Eye of the Arcane Lords",
        newname: "Eye of the Arclords"
    }, {
        name: "Aeromancer",
        newname: "Shory Aeromancer"
    }, {
        name: "Heatwave",
        newname: "Heat Wave"
    }, {
        name: "Bloodline: Genie (Efreeti)",
        newname: "Bloodline: Genie"
    }, {
        name: "Bite (Gnoll)",
        newname: "Bite"
    }, {
        name: "Shining Oath",
        newname: "Shining Oath (" + alignToChampion(pcAlign) + ")"
    }, {
        name: "Cognative Mutagen (Greater)",
        newname: "Cognitive Mutagen (Greater)"
    }, {
        name: "Cognative Mutagen (Lesser)",
        newname: "Cognitive Mutagen (Lesser)"
    }, {
        name: "Cognative Mutagen (Major)",
        newname: "Cognitive Mutagen (Major)"
    }, {
        name: "Cognative Mutagen (Moderate)",
        newname: "Cognitive Mutagen (Moderate)"
    }, {
        name: "Recognise Threat",
        newname: "Recognize Threat"
    }, {
        name: "Enhanced Familiar Feat",
        newname: "Enhanced Familiar"
    }, {
        name: "Aquatic Eyes (Darkvision)",
        newname: "Aquatic Eyes"
    }, {
        name: "Heir of the Astrologers",
        newname: "Heir of the Saoc"
    }, {
        name: "Precise Debilitation",
        newname: "Precise Debilitations"
    }, {
        name: "Heatwave",
        newname: "Heat Wave"
    }, {
        name: "Detective Dedication",
        newname: "Edgewatch Detective Dedication"
    }, {
        name: "Flip",
        newname: "Farabellus Flip"
    }, {
        name: "Interrogation",
        newname: "Bolera's Interrogation"
    }, {
        name: "Wind God’s Fan",
        newname: "Wind God's Fan"
    }, {
        name: "Rkoan Arts",
        newname: "Rokoan Arts"
    }, {
        name: "Virtue-Forged Tattooed",
        newname: "Virtue-Forged Tattoos"
    }, {
        name: "Bloody Debilitations",
        newname: "Bloody Debilitation"
    }, {
        name: "Cave Climber Kobold",
        newname: "Caveclimber Kobold"
    }, {
        name: "Tribal Bond",
        newname: "Quah Bond"
    }, {
        name: "Tongue of the Sun and Moon",
        newname: "Tongue of Sun and Moon"
    }, {
        name: "Aerialist",
        newname: "Shory Aerialist"
    }, {
        name: "Aeromancer",
        newname: "Shory Aeromancer"
    }, {
        name: "Ganzi Gaze (Low-Light Vision)",
        newname: "Ganzi Gaze"
    }, {
        name: "Saberteeth",
        newname: "Saber Teeth"
    }, {
        name: "Vestigal Wings",
        newname: "Vestigial Wings"
    }, {
        name: "Chosen One",
        newname: "Chosen of Lamashtu"
    }, {
        name: "Ice-Witch",
        newname: "Irriseni Ice-Witch"
    }, {
        name: "Construct Carver",
        newname: "Tupilaq Carver"
    }, {
        name: "Deadly Hair",
        newname: "Syu Tak-nwa's Deadly Hair"
    }, {
        name: "Revivification Protocall",
        newname: "Revivification Protocol"
    }, {
        name: "",
        newname: ""
    }, {
        name: "",
        newname: ""
    }, {
        name: "",
        newname: ""
    }, {
        name: "",
        newname: ""
    }, {
        name: "",
        newname: ""
    }, {
        name: "Ember's Eyes (Darkvision)",
        newname: "Ember's Eyes"
    }, {
        name: "Astrology",
        newname: "Saoc Astrology"
    }, {
        name: "Ape",
        newname: "Ape Animal Instinct"
    }, {
        name: "Duelist Dedication (LO)",
        newname: "Aldori Duelist Dedication"
    }, {
        name: "Parry",
        newname: "Aldori Parry"
    }, {
        name: "Riposte",
        newname: "Aldori Riposte"
    }, {
        name: "Sentry Dedication",
        newname: "Lastwall Sentry Dedication"
    }, {
        name: "Wary Eye",
        newname: "Eye of Ozem"
    }, {
        name: "Warden",
        newname: "Lastwall Warden"
    }, {
        name: "Heavenseeker Dedication",
        newname: "Jalmeri Heavenseeker Dedication"
    }, {
        name: "Mantis God's Grip",
        newname: "Achaekek's Grip"
    }, {
        name: "High Killer Training",
        newname: "Vernai Training"
    }, {
        name: "Guild Agent Dedication",
        newname: "Pathfinder Agent Dedication"
    }, {
        name: "Wayfinder Resonance Infiltrator",
        newname: "Westyr's Wayfinder Repository"
    }, {
        name: "Collegiate Attendant Dedication",
        newname: "Magaambyan Attendant Dedication"
    }, {
        name: "Scholarly Storytelling",
        newname: "Uzunjati Storytelling"
    }, {
        name: "Scholarly Recollection",
        newname: "Uzunjati Recollection"
    }, {
        name: "Secret Lesson",
        newname: "Janatimo's Lessons"
    }, {
        name: "Lumberjack Dedication",
        newname: "Turpin Rowe Lumberjack Dedication"
    }, {
        name: "Fourberie",
        newname: "Fane's Fourberie"
    }, {
        name: "Incredible Beastmaster's Companion",
        newname: "Incredible Beastmaster Companion"
    }, {
        name: "Polymath",
        newname: "Polymath Muse"
    }, {
        name: "Escape",
        newname: "Fane's Escape"
    }, {
        name: "Quick Climber",
        newname: "Quick Climb"
    }, {
        name: "Stab and Snag",
        newname: "Stella's Stab and Snag"
    }, {
        name: "Cognitive Crossover",
        newname: "Kreighton's Cognitive Crossover"
    }];
    var newNameIdx = changeNames.findIndex(function(item) {
        return item.name == itemName
    });
    return -1 < newNameIdx ? changeNames[newNameIdx].newname : itemName
}

function getFoundryFeatLocation(pathbuilderFeatType, pathbuilderFeatLevel) {
    return "Ancestry Feat" == pathbuilderFeatType ? "ancestry-" + pathbuilderFeatLevel : "Class Feat" == pathbuilderFeatType ? "class-" + pathbuilderFeatLevel : "Skill Feat" == pathbuilderFeatType ? "skill-" + pathbuilderFeatLevel : "General Feat" == pathbuilderFeatType ? "general-" + pathbuilderFeatLevel : "Background Feat" == pathbuilderFeatType ? "skill-" + pathbuilderFeatLevel : null
}

function alignToChampion(align) {
    return console.log("Got align: " + align), "LG" == align ? "Paladin" : "CG" == align ? "Liberator" : "NG" == align ? "Redeemer" : "LE" == align ? "Tyrant" : "CE" == align ? "Antipaladin" : "NE" == align ? "Desecrator" : void 0
}

function findSpecialThings(specialArr, featsArray, specialClassFeatures) {
    let search = specialArr.filter(val => {
        if (val.includes("Domain: ")) return val
    });
    return search.forEach(domainName => {
        domainName = domainName.split(" ")[1];
        featsArray.push({
            0: "Deity's Domain",
            1: domainName
        })
    }), [specialArr = specialArr.filter(val => {
        if (!val.includes("Domain: ")) return val
    }), featsArray, specialClassFeatures]
}

function uniq(a) {
    return Array.from(new Set(a))
}

Hooks.on("herovaultfoundryReady", api => {
    fbpiDebug && console.log("%cPathbuilder2e Import | %cDisabling pathbuilder button since herovault is loaded", pbcolor1, pbcolor4), pbButton = !1
}), Hooks.on("renderActorSheet", async function(obj, html) {
    const actor = obj.actor;
    if ("character" === actor.type && 0 != actor.canUserModify(game.user, "update") && pbButton) {
        let element = html.find(".window-header .window-title");
        if (1 == element.length) {
            let button = $('<a class="popout" style><i class="fas fa-book"></i>Pathbuilder2e</a>');
            button.on("click", () => beginPathbuilderImport(obj.object)), element.after(button)
        }     
        /*if (1 == element.length) {
            let button = $('<a class="popout" style><i class="fas fa-book"></i>WanderersGuide</a>');
            button.on("click", () => beginWanderersImport(obj.object)), element.after(button)
        }*/
    }
}), Hooks.on("init", () => {
    game.modules.get("pathbuilder2e-import-new").api = {
        beginPathbuilderImport: beginPathbuilderImport
    }, Hooks.callAll("pathbuilder2eimportReady", game.modules.get("pathbuilder2e-import-new").api)
}), 
    Hooks.on("ready", function() {
//     console.log("%cPathbuilder2e Import | %cinitializing", pbcolor1, pbcolor4), game.settings.register("pathbuilder2e-import", "reportMissedItems", {
//         name: "Report missed items?",
//         hint: "Having this checked will send me the error report generated during an import. Please keep this enabled so that I can continue to improve the module. It sends the following data: pathbuilder character ID and error messages presented post-import.",
//         scope: "client",
//         config: !0,
//         type: Boolean,
//         default: !0,
//         onChange: value => reportMissedItems = value
//     }), 
    /*game.settings.register("pathbuilder2e-import", "debugEnabled", {
        name: "Enable debug mode",
        hint: "Debug output will be written to the js console.",
        scope: "client",
        config: !0,
        type: Boolean,
        default: !1,
        onChange: value => fbpiDebug = value
    }), reportMissedItems = game.settings.get("pathbuilder2e-import", "reportMissedItems"), fbpiDebug = game.settings.get("pathbuilder2e-import", "debugEnabled")
*/
});

export {
    beginPathbuilderImport
};
