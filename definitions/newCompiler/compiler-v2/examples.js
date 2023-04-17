let twin = {
    label: 'Twin',
    body: Inherit.body(bodies.tank),
    danger: 5,
    ammo: [
        [Inherit.ammo(ammo.bullet, { recoil: 0.5, shudder: 0.9, health: 0.722, damage: 0.70875, spray: 1.2, }), Class.bullet],
    ],
    guns: { // [x, y, angle, delay, aspect]
        '20x8': [[0, -5.5], [0, 5.5]],
    }
}
Class.twin = create.tank(twin)

let carrier = {
    label: 'Carrier',
    body: Inherit.body(bodies.tank, { FOV: base.FOV * 1.2 }),
    danger: 7,
    facing: 'toTargetLockable',
    ammotype: statnames.swarm,
    ammo: [
        [Inherit.ammo(ammo.swarm, { reload: 1.075, size: 0.9, health: 1.2, damage: 1.08, pen: 1.1, speed: 1.1, maxSpeed: 0.935, range: 1.1, resist: 1.1 }), Class.swarm, gunCalcNames.swarm,]
    ],
    guns: { // [x, y, angle, delay, aspect]
        '9x8.2': [
            [5, -2, -30, 0.5, 0.6],
            [5, 2, 30, 0.5, 0.6],
            [5, 0, 0, 0, 0.6]
        ],
    },
}
Class.carrier = create.tank(carrier)
