Class.basic = new Tank({
    LABEL: 'Basic',
})
Class.basic.gun([{
    SHOOT_SETTINGS: combineStats([g.basic]),
    TYPE: Class.bullet,
    // defaults:
    LABEL: '',
    STAT_CALCULATOR: gunCalcNames.default,
    WAIT_TO_CYCLE: false,
    AUTOFIRE: false,
    SYNCS_SKILLS: false,
    MAX_CHILDREN: 0,
    ALT_FIRE: false,
    NEGATIVE_RECOIL: false,
}], [
    [[ 18, 8, 1, 0, 0, 0, 0, ]],
])
Class.basic = Class.basic.export()


Class.single = new Tank({
    LABEL: 'Single',
    DANGER: 7,
})
Class.single.gun([{
    SHOOT_SETTINGS: combineStats([g.basic, g.single]),
    TYPE: Class.bullet,
}, {}], [
    [[19, 8, 1, 0, 0, 0, 0, ]],
    [[5.5, 8, -1.8, 6.5, 0, 0, 0]]
])
Class.single = Class.single.export()

Class.octo = new Tank({
    LABEL: 'Octo Tank',
    DANGER: 7,
})
Class.octo.gun([{
    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.octo]),
    TYPE: Class.bullet,
}], [
    [
        [  10,     8,      1,      8,      0,      45,    0.5,  ],
        [  10,     8,      1,      8,      0,     135,    0.5,  ],
        [  10,     8,      1,      8,      0,     225,    0.5,  ],
        [  10,     8,      1,      8,      0,     315,    0.5,  ],
        [  10,     8,      1,      8,      0,      0,      0,   ],
        [  10,     8,      1,      8,      0,      90,     0,   ],
        [  10,     8,      1,      8,      0,     180,     0,   ],
        [  10,     8,      1,      8,      0,     270,     0,   ],
    ],
])
Class.octo = Class.octo.export()

Class.overlord = new Tank({
    LABEL: 'Overlord',
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.1,
    },
    MAX_CHILDREN: 8,
})
Class.overlord.droneSpawner(0, [g.drone, g.over])
Class.overlord.droneSpawner(90, [g.drone, g.over])
Class.overlord.droneSpawner(180, [g.drone, g.over])
Class.overlord.droneSpawner(270, [g.drone, g.over])
Class.overlord = Class.overlord.export()
