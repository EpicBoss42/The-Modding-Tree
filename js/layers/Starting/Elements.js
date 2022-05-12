addLayer("e", {
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            fire: new Decimal(0),
            fSec: new Decimal(0),
            water: new Decimal(0),
            wSec: new Decimal(0),
            earth: new Decimal(0),
            eSec: new Decimal(0),
            air: new Decimal(0),
            aSec: new Decimal(0),
            time: new Decimal(0),
        }
    },
    branches: ['v', 'ae'],
    color: "#CFA441",
    resource: "Elemental Essence",
    row: 1,
    baseResource: "points",
    baseAmount() { return player.w.tpoints },
    requires: new Decimal(10),
    type: "normal",
    exponent: 0.3,
    hotkeys: [
        {key: "e", description: "E: Reset for Elemental Essence", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return player.w.realKey}},
    ],
    doReset(x) {
        if (x === this.layer) {
            player.w.tpoints = new Decimal(0)
        }
        if (x === "v" || x === "ae") {
            layerDataReset(this.layer)
        }
    },
    gainMult() {
        let value = new Decimal(1)
        if (hasUpgrade(this.layer, 71)) value = value.mul(upgradeEffect(this.layer, 71))
        return value
    },
    gainExp() {
        let value = new Decimal(1)
        return value
    },
    layerShown() {
        if (hasUpgrade('m', 12)) return true
        return true
    },    
    fBase() {
        let value = new Decimal(1)
        if (hasUpgrade('ae', 11)) value = value.add(upgradeEffect('ae', 11))
        return value
    },
    fGainMult() {
        let value = new Decimal(1)
        value = value.mul(player[this.layer].points)
        if (hasUpgrade(this.layer, 13)) value = value.mul(upgradeEffect(this.layer, 13))
        return value
    },
    fGainExp() {
        let value = new Decimal(1)
        if (hasUpgrade('ae', 12)) value = value.add(upgradeEffect('ae', 11))
        return value
    },
    wBase() {
        let value = new Decimal(1)
        if (hasUpgrade('ae', 11)) value = value.add(upgradeEffect('ae', 11))
        return value
    },
    wGainMult() {
        let value = new Decimal(1)
        value = value.mul(player[this.layer].points)
        return value
    },
    wGainExp() {
        let value = new Decimal(1)
        if (hasUpgrade('ae', 12)) value = value.add(upgradeEffect('ae', 11))
        return value
    },
    aBase() {
        let value = new Decimal(1)
        if (hasUpgrade('ae', 11)) value = value.add(upgradeEffect('ae', 11))
        return value
    },
    aGainMult() {
        let value = new Decimal(1)
        value = value.mul(player[this.layer].points)
        if (hasUpgrade(this.layer, 11)) value = value.mul(upgradeEffect(this.layer, 11))
        if (hasUpgrade(this.layer, 31)) value = value.mul(upgradeEffect(this.layer, 31))
        if (hasUpgrade(this.layer, 51)) value = value.mul(upgradeEffect(this.layer, 51))
        return value
    },
    aGainExp() {
        let value = new Decimal(1)
        if (hasUpgrade('ae', 12)) value = value.add(upgradeEffect('ae', 11))
        return value
    },
    eBase() {
        let value = new Decimal(1)
        if (hasUpgrade('ae', 11)) value = value.add(upgradeEffect('ae', 11))
        return value
    },
    eGainMult() {
        let value = new Decimal(1)
        value = value.mul(player[this.layer].points)
        return value
    },
    eGainExp() {
        let value = new Decimal(1)
        if (hasUpgrade('ae', 12)) value = value.add(upgradeEffect('ae', 11))
        return value
    },
    update(diff) {
        if (player.e.unlocked) {
            player.e.water = player.e.water.add(tmp.e.wBase.pow(tmp.e.wGainExp).mul(tmp.e.wGainMult).mul(diff))
            player.e.air = player.e.air.add(tmp.e.aBase.pow(tmp.e.aGainExp).mul(tmp.e.aGainMult).mul(diff))
            player.e.earth = player.e.earth.add(tmp.e.eBase.pow(tmp.e.eGainExp).mul(tmp.e.eGainMult).mul(diff))
            player.e.fire = player.e.fire.add(tmp.e.fBase.pow(tmp.e.fGainExp).mul(tmp.e.fGainMult).mul(diff))
            player.e.fSec = tmp.e.fBase.pow(tmp.e.fGainExp).mul(tmp.e.fGainMult)
            player.e.aSec = tmp.e.aBase.pow(tmp.e.aGainExp).mul(tmp.e.aGainMult)
            player.e.eSec = tmp.e.eBase.pow(tmp.e.eGainExp).mul(tmp.e.eGainMult)
            player.e.wSec = tmp.e.wBase.pow(tmp.e.wGainExp).mul(tmp.e.wGainMult)
        }
    },
    tabFormat: {
        "Fire": {
            content: [
                "main-display",
                "prestige-button",
                ["display-text", function() {
                    return "You have " + format(player[this.layer].fire) + " Fire Essence"
                }],
                ["display-text", function() {
                    return "(" + format(player.e.fSec) + "/sec)"
                }],
                "blank",
                ["upgrades", ['1', '2']]
            ]
        },
        "Water": {
            content: [
                "main-display",
                "prestige-button",
                ["display-text", function() {
                    return "You have " + format(player[this.layer].water) + " Water Essence"
                }],
                ["display-text", function() {
                    return "(" + format(player.e.wSec) + "/sec)"
                }],
                "blank",
                ["upgrades", ['3', '4']]
            ]
        },
        "Earth": {
            content: [
                "main-display",
                "prestige-button",
                ["display-text", function() {
                    return "You have " + format(player[this.layer].earth) + " Earth Essence"
                }],
                ["display-text", function() {
                    return "(" + format(player.e.eSec) + "/sec)"
                }],
                "blank",
                ["upgrades", ['5', '6']]
            ]
        },
        "Air": {
            content: [
                "main-display",
                "prestige-button",
                ["display-text", function() {
                    return "You have " + format(player[this.layer].air) + " Air Essence"
                }],
                ["display-text", function() {
                    return "(" + format(player.e.aSec) + "/sec)"
                }],
                "blank",
                ["upgrades", ['7', '8']]
            ]
        }
    },
    upgrades: {
        11: {
            title: "Combustion",
            description: "Fire Essence increases Air Essence gain",
            cost: new Decimal(100),
            currencyDisplayName: "Fire Essence",
            currencyInternalName: "fire",
            currencyLayer: 'e',
            effect() {
                let value = new Decimal(player[this.layer].fire)
                if (player[this.layer].fire > 0) {
                    value = value.pow(0.5).log(2).div(5)
                    return value.add(1)
                }
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"
            }
        }, 
        12: {
            title: "Incineration",
            description: "Fire Essence increases Point gain",
            cost: new Decimal(1000),
            currencyDisplayName: "Fire Essence",
            currencyInternalName: "fire",
            currencyLayer: 'e',
            effect() {
                let value = new Decimal(player[this.layer].fire)
                if (value > 0) {
                    value = value.pow(0.2).log(3).div(4)
                    return value.add(1)
                }
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"
            }
        },
        13: {
            title: "Drifting Embers",
            description: "Air Essence increases Fire Essence gain",
            cost: new Decimal(2500),
            currencyDisplayName: "Fire Essence",
            currencyInternalName: "fire",
            currencyLayer: 'e',
            effect() {
                let value = new Decimal(player[this.layer].fire)
                if (player[this.layer].fire > 0) {
                    value = value.log(10)
                    return value.add(1)
                }
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"
            }
        },
        31: {
            title: "Ocean Foam",
            description: "Water Essence increases Air Essence gain",
            cost: new Decimal(100),
            currencyDisplayName: "Water Essence",
            currencyInternalName: "water",
            currencyLayer: 'e',
            effect() {
                let value = new Decimal(player[this.layer].water)
                if (player[this.layer].water > 0) {
                    value = value.pow(0.5).log(2).div(5)
                    return value.add(1)
                }
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"
            }
        }, 
        32: {
            title: "Fishing",
            description: "Water Essence increases Point gain",
            cost: new Decimal(1500),
            currencyDisplayName: "Water Essence",
            currencyInternalName: "water",
            currencyLayer: 'e',
            effect() {
                let value = new Decimal(player[this.layer].water)
                if (value > 0) {
                    value = value.pow(0.5).log(2).div(7)
                    return value.add(1)
                }
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"
            }
        },
        51: {
            title: "Whistling Canyons",
            description: "Earth Essence increases Air Essence Gain",
            cost: new Decimal(100),
            currencyDisplayName: "Earth Essence",
            currencyInternalName: "earth",
            currencyLayer: 'e',
            effect() {
                let value = new Decimal(player[this.layer].earth)
                if (player[this.layer].earth > 0) {
                    value = value.pow(0.5).log(2).div(5)
                    return value.add(1)
                }
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"
            }
        }, 
        71: {
            title: "Wind Power",
            description: "Air Essence increases Elemental Essence gain",
            cost: new Decimal(1000),
            currencyDisplayName: "Air Essence",
            currencyInternalName: "air",
            currencyLayer: 'e',
            effect() {
                let value = new Decimal(player[this.layer].air)
                if (value == 0) value = 1
                if (player[this.layer].air > 0) {
                    value = value.pow(0.2).log(5).div(10)
                    return value.add(1)
                }
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"
            }
        }, 
    }, 
})