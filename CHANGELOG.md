## 0.6.1 (Jul 6, 2021)

* fixed a bug with senses that would break PCs
* set the prototype token name to match the PC name.
* squire background now adds correctly
* background feats are added to the character (but not assigned to the BG location)

## 0.6.0 (Jul 4, 2021)

* added more mappings and blacklist items
* added a filter to prevent duplicate feats
* expanded the reporting feature to include system, core, and module version
* imported actors now get full health
* embed the pathbuilder id into the actor flags
* added an additional notification during imports that they can take a minute
* scholar background now adds correctly and adds the assurance feat with the correct skill

## 0.5.0 (Jul 3, 2021)

* fixed missing class features. some might be doubled and should be cleaned up by hand for now.
* added a reporting feature that auto-reports errors/warnings for missed items
* added more mappings and blacklist items
* fixed errors caused by spellcastingEntry being deleted but spells were not
* added config options for toggling debug and reporting feature

## 0.4.0 (Jun 30, 2021)

* rewrote the connectors between pathbuilder and herovault to use native api calls instead of janky crap
* changed debug output to match my other modules debug style
* added a few mappings and blacklist items

## 0.3.4 (Jun 30, 2021)

* revert previous change

## 0.3.3 (Jun 30, 2021)

* change relative paths to absolute for imports

## 0.3.2 (Jun 30, 2021)

* fixed the delete all to actually delete all
* include exportsource info within exports to HeroVau.lt

## 0.3.1 (Jun 29, 2021)

* fix bad config

## 0.3.0 (Jun 28, 2021)

* integrates with HeroVau.lt module
* map some names in pathbuilder to names within foundry
* added a blacklist of feats/abilities to prevent them from throwing an error, as they're added by other means (eg: class/heritage/ancestry related)
* added some other ways to search for item/feat/ability names to get better matching

## 0.2.4 (Jun 28, 2021)

* initial release under me
* fixed spell import feature
