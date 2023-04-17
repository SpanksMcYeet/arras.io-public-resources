let ammo = {
    bullet: { reload: 16, recoil: 1.4, shudder: 0.1, size: 1, health: 2, damage: 0.2, pen: 1, speed: 4.5, maxSpeed: 1, range: 1, density: 1, spray: 15, resist: 1, },
    swarm: { reload: 36, recoil: 0.25, shudder: 0.05, size: 0.4, health: 1.2, damage: 0.175, pen: 1, speed: 3.5, maxSpeed: 1, range: 1, density: 1.4, spray: 5, resist: 1.3 }
}
let bodies = {
    tank: {
        ACCELERATION: 1.6,
        SPEED:  5.25,
        HEALTH: 20,
        DAMAGE: 3,
        RESIST: 1,
        PENETRATION: 1.05,
        SHIELD: 4,
        REGEN: 0.025,
        FOV: 1,
        DENSITY: 0.8,
    }
}
let Inherit = {
    body(parent, child = null) {
        return Object.assign(parent, child ?? parent)
    },
    ammo(parent, child = null) {
        if (child != null)
            for (let [setting, value] of Object.entries(child)) {
                parent[setting] = parent[setting] * value
            }
        return parent
    },
}

let create = {
    tank(data) {
        let output = {}
        output.PARENT = [Class.genericTank]
        output.LABEL = data.label ?? ''
        output.BODY = data.body ?? base
        output.DANGER = data.danger ?? 5
        output.FACING_TYPE = data.facing
        output.MOTION_TYPE = data.motion
        output.STAT_NAMES = data.statnames
        output.TYPE = output.TYPE ?? 'tank'
        output.GUNS = []
        output.TURRETS = []
        for (let [i, [dimensions, gunData]] of Object.entries(data.guns).entries()) {
            let [length, width] = dimensions.match(/(\d[\d\.]*)/g)
            for (let [x, y, angle, delay, aspect] of gunData) {
                let [values, ammo, gunCalcs] = data.ammo[i]
                output.GUNS.push({
                    POSITION: [length, width, aspect ?? 1, x ?? 0, y ?? 0, angle ?? 0, delay ?? 0, ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: values,
                        TYPE: ammo,
                        STAT_CALCULATOR: gunCalcs,
                    }
                })
            }
        }
        return output
    },
}
