const Tank = class {
    constructor(body) {
        this.output = {
            PARENT: [Class.genericTank],
            GUNS: [],
            TURRETS: [],
        }
        if (body.PARENT) delete this.output.PARENT
        Object.assign(this.output, body)
    }
    export() {
        return this.output
    }
    gun(properties, positions) {
        for (let [i, property] of properties.entries()) {
            for (let position of positions[i]) {
                this.output.GUNS.push({
                    POSITION: position,
                    PROPERTIES: property,
                })
            }
        }
    }
    droneSpawner(angle, stats, type) {
        this.output.GUNS.push({
            POSITION: [ 6, 12, 1.2, 8, 0, angle, 0 ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats(stats),
                TYPE: type ?? Class.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
            },
        })
    }
    hybrid() {
        this.output.GUNS.push({
            POSITION: [   6,     12,    1.2,     8,      0,     180,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.moredense, g.bitsmall2, g.bitmoreweak, g.bitweak]),
                TYPE: [Class.drone, { INDEPENDENT: true }],
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: false,
                MAX_CHILDREN: 3,
            }
        })
    }
}
