class CompilerError extends Error {
    constructor(message) {
        super(message)
        this.name = 'CompilerError'
    }
}

const Shape = class {
    static saved = [{
        key: 'donut',
        run(args) {
            let { innerRadius, outerRadius, ellipse } = args
            if (innerRadius == null || outerRadius == null) 
                throw new ShapeError(`Cannot create saved shape 'donut' without object entr${innerRadius == null || outerRadius == null ? 'ies \'innerRadius\' and \'outerRadius\'.' : `y '${innerRadius == null ? 'innerRadius' : 'outerRadius'}'`}`)

            let outerCircle = this.circle({ radius: outerRadius, points: 40, ellipse: ellipse })

            let innerCircle = this.circle({ radius: innerRadius,
                points: 40,
                ellipse: ellipse,
            })

            let output = []
            for (let i = 0; i < outerCircle.length; i++) {
                output.push(outerCircle[i])
                output.push(innerCircle[i])
            }

            return output // CURRENTLY NOT POSSIBLE WITH CURRENT CLIENT
        }
    }, {
        key: 'cutter',
        run() {
            let coordArray = []
            let arc = 2 * Math.PI / 64
            for (let i = 0; i < 64; i++) {
                let radius = -0.3 * Math.pow(Math.abs(Math.sin(4 * (arc * i))), 0.75) + 1.4
                coordArray.push([
                    radius * Math.cos(arc * i),
                    radius * Math.sin(arc * i),
                ])
            }
            return coordArray
        }
    }]
    static panic(type, details) {
        switch (type) {
            case 'keyRef':
                throw new ReferenceError(`Cannot retrieve data with key '${details}' as it is undefined.`)
            case 'illSizedPoints':
                throw new RangeError(`Ill-sized coordinate request: Cannot compile a valid '${details[0]}' instance with '${details[1]}' coordinate points.`)
            case 'missingArgs':
                throw new CompilerError(`Cannot compile method '${details[0]}' without entry(s): ${details[1].length > 1 ? `${details[1].map(r => `'${r}'`)}` : `'${details[1][0]}`}'`)
        }
    }
    constructor(data = {}) {
        this.coordArray = data.coordArray ?? []
        this.center = data.center ?? { x: 0, y: 0, }
    }
    retrieve(key, args) {
        let savedShape = Shape.saved.find(r => r.key === key)
        if (savedShape == null) Shape.panic('keyRef', key)
        return savedShape.run.call(this, args)
    }
    compile() {
        return this.coordArray
    }
    circle({ points, radius = 1, ellipse = { x: 1, y: 1 } } = {}) {
        if (points == null || points <= 2) Shape.panic('illSizedPoints', ['circle(...)', points ?? 0])

        let arc = 2 * Math.PI / (points - 2)
        for (let i = 0; i < points; i++) {
            this.coordArray.push([
                radius * Math.cos(arc * i) / ellipse.x + this.center.x,
                radius * Math.sin(arc * i) / ellipse.y + this.center.y,
            ])
        }
        
        return this
    }
    star({ sides, innerRadius, outerRadius } = {}) {
        if (sides == null || sides < 3) Shape.panic('illSizedPoints', ['star', sides ?? 0])
        if (innerRadius == null || outerRadius == null) Shape.panic('missingArgs', ['star(...)', ['innerRadius', 'outerRadius']])      

        for (let i = 0; i < sides * 2; i++) {
            let inOrOut = i % 2 === 0 ? innerRadius : outerRadius
            this.coordArray.push([
                this.center.x + inOrOut * Math.cos(i * (2 * Math.PI) / (sides * 2)),
                this.center.y + inOrOut * Math.sin(i * (2 * Math.PI) / (sides * 2)),
            ])
        }

        return this
    }
}
const HalfShape = class extends Shape {
    constructor(center) {
        super(center)
        this.needsCut = true
    }
    compile() {
        return this.needsCut ? this.coordArray.splice(this.coordArray.length * 0.5 - 1, this.coordArray.length * 0.5) : this.coordArray
    }
    inverse() {
        this.coordArray = this.coordArray.map(([x, y]) => [x, -y])
        return this
    }
    halfPoly({ sides } = {}) {
        this.needsCut = false
        if (sides == null || sides <= 2) Shape.panic('illSizedPoints', ['halfPoly(...)', sides ?? 0])

        for (let i = 0; i < Math.floor(sides / 2); i++) {
            let angle = Math.PI * 2 * ((sides % 2 === 0 ? 0.5 : 1) + i) / sides
            this.coordArray.push([Math.cos(angle), Math.sin(angle)])
        }
        this.coordArray.push([this.coordArray[this.coordArray.length - 1][0], 0])
        this.coordArray.unshift([sides % 2 === 0 ? this.coordArray[0][0] : 1, 0])
        
        return this
    }
}
