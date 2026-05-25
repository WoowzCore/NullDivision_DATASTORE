// ========== CHAOS REALM ==========
// Center: 0, -2, 0 | Full chaos | Constant effects

// ========== GLOBALS ==========
var WORLD_Y = -2
var tick = 0
var activeEffects = {}
var structures = []
var chaosLevel = 0
var eventCounter = 0

// ========== CHAOTIC CLIENT EFFECTS ==========

function StartEffect(effectId, duration, params){
    if(activeEffects[effectId]) return
    activeEffects[effectId] = true

    _G.ApplyAnomaly(effectId, params)

    setTimeout(function(){
        _G.ResetAnomaly(effectId)
        delete activeEffects[effectId]
    }, duration)
}

// MASSIVE EFFECTS LIST
var CHAOS_EFFECTS = [
    // COLOR FILTERS
    {id: _G.Enum.Anomaly.SkyColor, chance: 0.35, duration: 40, params: function(){ return [Math.random(), Math.random(), Math.random()] }, msg: "§cCOLOR CHAOS"},
    {id: _G.Enum.Anomaly.SkyColor, chance: 0.3, duration: 30, params: function(){ return [Math.random()*0.5, Math.random()*0.5, Math.random()*0.5] }, msg: "§8DARKNESS FALLS"},
    {id: _G.Enum.Anomaly.SkyColor, chance: 0.3, duration: 35, params: function(){ return [0.9, Math.random()*0.3, Math.random()*0.3] }, msg: "§cBLOOD SKY"},
    {id: _G.Enum.Anomaly.SkyColor, chance: 0.3, duration: 35, params: function(){ return [Math.random()*0.3, 0.9, Math.random()*0.3] }, msg: "§aGREEN APOCALYPSE"},
    {id: _G.Enum.Anomaly.SkyColor, chance: 0.3, duration: 35, params: function(){ return [Math.random()*0.3, Math.random()*0.3, 0.9] }, msg: "§bBLUE DIMENSION"},
    {id: _G.Enum.Anomaly.SkyColor, chance: 0.25, duration: 45, params: function(){ return [0.9, 0.2, 0.9] }, msg: "§dPURPLE CORRUPTION"},
    {id: _G.Enum.Anomaly.SkyColor, chance: 0.25, duration: 40, params: function(){ return [0.9, 0.7, 0.1] }, msg: "§6GOLDEN ERA"},
    {id: _G.Enum.Anomaly.SkyColor, chance: 0.2, duration: 25, params: function(){ return [0.1, 0.9, 0.9] }, msg: "§bAQUA REALM"},
    {id: _G.Enum.Anomaly.SkyColor, chance: 0.2, duration: 30, params: function(){ return [0.9, 0.4, 0.1] }, msg: "§6ORANGE CHAOS"},

    // SCREEN SHAKE
    {id: _G.Enum.Anomaly.BufferBuilderVertexOffset, chance: 0.4, duration: 35, params: function(){ return [Math.random()*0.8, Math.random()*0.8, Math.random()*0.8] }, msg: "§7EARTHQUAKE"},
    {id: _G.Enum.Anomaly.BufferBuilderVertexOffset, chance: 0.35, duration: 25, params: function(){ return [Math.random()*0.5, 0, Math.random()*0.5] }, msg: "§7HORIZONTAL SHAKE"},
    {id: _G.Enum.Anomaly.BufferBuilderVertexOffset, chance: 0.35, duration: 25, params: function(){ return [0, Math.random()*0.7, 0] }, msg: "§7VERTICAL QUAKE"},
    {id: _G.Enum.Anomaly.BufferBuilderVertexOffset, chance: 0.3, duration: 40, params: function(){ return [Math.random()*0.4, Math.random()*0.9, Math.random()*0.4] }, msg: "§7WILD VIBRATION"},
    {id: _G.Enum.Anomaly.BufferBuilderVertexOffset, chance: 0.25, duration: 50, params: function(){ return [Math.random()*0.6, Math.random()*0.6, Math.random()*0.6] }, msg: "§7REALITY TREMBLE"},

    // RANDOM VERTEX DISTORTION
    {id: _G.Enum.Anomaly.BufferBuilderVertexRandom, chance: 0.35, duration: 45, params: function(){ return [Math.random()*0.7, Math.random()*0.7, Math.random()*0.7] }, msg: "§5GLITCH WORLD"},
    {id: _G.Enum.Anomaly.BufferBuilderVertexRandom, chance: 0.3, duration: 35, params: function(){ return [Math.random()*0.5, 0, Math.random()*0.5] }, msg: "§5DIMENSIONAL RIP"},
    {id: _G.Enum.Anomaly.BufferBuilderVertexRandom, chance: 0.25, duration: 55, params: function(){ return [Math.random()*0.9, Math.random()*0.3, Math.random()*0.6] }, msg: "§5REALITY BREAK"},
    {id: _G.Enum.Anomaly.BufferBuilderVertexRandom, chance: 0.2, duration: 60, params: function(){ return [Math.random(), Math.random(), Math.random()] }, msg: "§5MAXIMUM CHAOS"},

    // SUN EFFECTS
    {id: _G.Enum.Anomaly.SunSize, chance: 0.3, duration: 60, params: function(){ return [30 + Math.random() * 100] }, msg: "§6GIANT SUN"},
    {id: _G.Enum.Anomaly.SunSize, chance: 0.25, duration: 50, params: function(){ return [5 + Math.random() * 20] }, msg: "§6TINY SUN"},
    {id: _G.Enum.Anomaly.SunVisible, chance: 0.25, duration: 40, params: function(){ return [Math.random() < 0.5] }, msg: "§eSUN FLICKER"},
    {id: _G.Enum.Anomaly.SunVisible, chance: 0.15, duration: 70, params: function(){ return [false] }, msg: "§8SUN ECLIPSE"},
    {id: _G.Enum.Anomaly.SunVisible, chance: 0.15, duration: 30, params: function(){ return [true] }, msg: "§6BLAZING SUN"},

    // MOON EFFECTS
    {id: _G.Enum.Anomaly.MoonSize, chance: 0.3, duration: 60, params: function(){ return [25 + Math.random() * 90] }, msg: "§bGIANT MOON"},
    {id: _G.Enum.Anomaly.MoonSize, chance: 0.25, duration: 50, params: function(){ return [5 + Math.random() * 15] }, msg: "§bTINY MOON"},
    {id: _G.Enum.Anomaly.MoonVisible, chance: 0.25, duration: 40, params: function(){ return [Math.random() < 0.5] }, msg: "§bMOON FLICKER"},
    {id: _G.Enum.Anomaly.MoonVisible, chance: 0.2, duration: 50, params: function(){ return [false] }, msg: "§8MOON VANISHES"},

    // CLOUD CHAOS
    {id: _G.Enum.Anomaly.CloudSpeed, chance: 0.35, duration: 80, params: function(){ return [Math.random() * 8] }, msg: "§7CRAZY CLOUDS"},
    {id: _G.Enum.Anomaly.CloudSpeed, chance: 0.3, duration: 100, params: function(){ return [0.1 + Math.random() * 0.5] }, msg: "§7SLOW MOTION"},
    {id: _G.Enum.Anomaly.CloudHeight, chance: 0.35, duration: 70, params: function(){ return [-30 + Math.random() * 60] }, msg: "§7FALLING CLOUDS"},
    {id: _G.Enum.Anomaly.CloudHeight, chance: 0.3, duration: 65, params: function(){ return [-50 + Math.random() * 40] }, msg: "§7DEEP CLOUDS"},
    {id: _G.Enum.Anomaly.CloudSize, chance: 0.3, duration: 80, params: function(){ return [5 + Math.random() * 40, 0.5 + Math.random() * 5, 5 + Math.random() * 40] }, msg: "§7MASSIVE CLOUDS"},
    {id: _G.Enum.Anomaly.CloudSize, chance: 0.25, duration: 75, params: function(){ return [1 + Math.random() * 10, 0.2 + Math.random() * 2, 1 + Math.random() * 10] }, msg: "§7TINY CLOUDS"},
    {id: _G.Enum.Anomaly.CloudSize, chance: 0.2, duration: 60, params: function(){ return [Math.random() * 30, Math.random() * 5, Math.random() * 30] }, msg: "§7WARPED CLOUDS"},

    // STAR EFFECTS
    {id: _G.Enum.Anomaly.StarsVisible, chance: 0.3, duration: 50, params: function(){ return [Math.random() < 0.5] }, msg: "§eSTAR FLICKER"},
    {id: _G.Enum.Anomaly.StarsVisible, chance: 0.25, duration: 45, params: function(){ return [false] }, msg: "§8STARLESS SKY"},
    {id: _G.Enum.Anomaly.StarsVisible, chance: 0.2, duration: 40, params: function(){ return [true] }, msg: "§eSTAR SHOWER"},

    // SKY RENDER
    {id: _G.Enum.Anomaly.SkyRender, chance: 0.15, duration: 100, params: function(){ return [_G.Enum.SkyRender.End] }, msg: "§5END SKY"},
    {id: _G.Enum.Anomaly.SkyRender, chance: 0.12, duration: 80, params: function(){ return [_G.Enum.SkyRender.None] }, msg: "§8VOID SKY"},
    {id: _G.Enum.Anomaly.SkyRender, chance: 0.12, duration: 70, params: function(){ return [_G.Enum.SkyRender.Normal] }, msg: "§bNORMAL SKY"},

    // END SKY TILES
    {id: _G.Enum.Anomaly.SkyEndTiles, chance: 0.25, duration: 60, params: function(){ return [Math.floor(1 + Math.random() * 32)] }, msg: "§5END TILES CHAOS"},
    {id: _G.Enum.Anomaly.SkyEndTiles, chance: 0.2, duration: 50, params: function(){ return [Math.floor(Math.random() * 16)] }, msg: "§5TILES CORRUPTED"},

    // COMBINED EFFECTS
    {id: _G.Enum.Anomaly.BufferBuilderVertexOffset, chance: 0.2, duration: 45, params: function(){ return [Math.random()*0.4, Math.random()*0.8, Math.random()*0.4] }, msg: "§5DIMENSIONAL SHIFT"},
    {id: _G.Enum.Anomaly.BufferBuilderVertexRandom, chance: 0.2, duration: 45, params: function(){ return [Math.random()*0.6, Math.random()*0.6, Math.random()*0.6] }, msg: "§5REALITY GLITCH"}
]

// ========== MASSIVE STRUCTURES ==========

function GenerateChaosSpire(x, z){
    var y = WORLD_Y
    var height = 40 + Math.floor(Math.random() * 30)

    for(var h = 0; h <= height; h++){
        var radius = Math.floor(Math.sin(h / 10) * 5) + 2
        for(var ix = -radius; ix <= radius; ix++){
            for(var iz = -radius; iz <= radius; iz++){
                if(ix*ix + iz*iz <= radius*radius){
                    var blocks = ["obsidian", "crying_obsidian", "blackstone", "magma_block", "glowstone"]
                    var block = blocks[Math.floor(Math.random() * blocks.length)]
                    _G.World.SetBlock(x + ix, y + h, z + iz, block)
                }
            }
        }
        if(h % 5 === 0 && h > 0){
            for(var a = 0; a < 360; a += 15){
                var rad = a * Math.PI / 180
                var rx = x + Math.cos(rad) * (radius + 1)
                var rz = z + Math.sin(rad) * (radius + 1)
                _G.World.SetBlock(Math.floor(rx), y + h, Math.floor(rz), "shroomlight")
            }
        }
    }
}

function GenerateChaosRing(x, z){
    var y = WORLD_Y
    var radius = 20 + Math.floor(Math.random() * 15)

    for(var a = 0; a < 360; a += 5){
        var rad = a * Math.PI / 180
        var rx = x + Math.cos(rad) * radius
        var rz = z + Math.sin(rad) * radius
        for(var h = 0; h < 5; h++){
            var blocks = ["gold_block", "diamond_block", "emerald_block", "netherite_block"]
            var block = blocks[Math.floor(Math.random() * blocks.length)]
            _G.World.SetBlock(Math.floor(rx), y + h, Math.floor(rz), block)
        }
    }
}

function GenerateChaosCube(x, z){
    var y = WORLD_Y
    var size = 15

    for(var ix = -size; ix <= size; ix++){
        for(var iz = -size; iz <= size; iz++){
            for(var iy = 0; iy <= size; iy++){
                if(Math.abs(ix) === size || Math.abs(iz) === size || iy === 0 || iy === size){
                    if(Math.random() < 0.7){
                        var blocks = ["purpur_block", "end_stone_bricks", "obsidian", "crying_obsidian"]
                        var block = blocks[Math.floor(Math.random() * blocks.length)]
                        _G.World.SetBlock(x + ix, y + iy, z + iz, block)
                    }
                }
            }
        }
    }
}

function GenerateChaosPyramid(x, z){
    var y = WORLD_Y
    var size = 12

    for(var layer = 0; layer <= size; layer++){
        var layerSize = size - layer
        for(var ix = -layerSize; ix <= layerSize; ix++){
            for(var iz = -layerSize; iz <= layerSize; iz++){
                if(Math.abs(ix) === layerSize || Math.abs(iz) === layerSize){
                    var blocks = ["redstone_block", "lapis_block", "gold_block", "diamond_block"]
                    var block = blocks[Math.floor(Math.random() * blocks.length)]
                    _G.World.SetBlock(x + ix, y + layer * 2, z + iz, block)
                    _G.World.SetBlock(x + ix, y + layer * 2 + 1, z + iz, "glowstone")
                }
            }
        }
    }
}

function GenerateChaosTree(x, z){
    var y = WORLD_Y
    var height = 20 + Math.floor(Math.random() * 15)

    for(var h = 0; h <= height; h++){
        var radius = h < 5 ? 3 : h < height - 5 ? 2 : 1
        for(var ix = -radius; ix <= radius; ix++){
            for(var iz = -radius; iz <= radius; iz++){
                if(ix*ix + iz*iz <= radius*radius){
                    var blocks = ["crimson_stem", "warped_stem", "shroomlight", "nether_wart_block"]
                    var block = blocks[Math.floor(Math.random() * blocks.length)]
                    _G.World.SetBlock(x + ix, y + h, z + iz, block)
                }
            }
        }
        if(h % 3 === 0 && h > 5){
            for(var a = 0; a < 360; a += 30){
                var rad = a * Math.PI / 180
                var rx = x + Math.cos(rad) * (radius + 2)
                var rz = z + Math.sin(rad) * (radius + 2)
                _G.World.SetBlock(Math.floor(rx), y + h, Math.floor(rz), "shroomlight")
            }
        }
    }
}

function GenerateChaosPortal(x, z){
    var y = WORLD_Y
    var radius = 10

    for(var a = 0; a < 360; a += 10){
        var rad = a * Math.PI / 180
        var rx = x + Math.cos(rad) * radius
        var rz = z + Math.sin(rad) * radius
        for(var h = 0; h < 8; h++){
            _G.World.SetBlock(Math.floor(rx), y + h, Math.floor(rz), "crying_obsidian")
        }
    }
    for(var ix = -radius+1; ix <= radius-1; ix++){
        for(var iz = -radius+1; iz <= radius-1; iz++){
            if(ix*ix + iz*iz <= (radius-1)*(radius-1)){
                for(var py = 1; py <= 6; py++){
                    _G.World.SetBlock(x + ix, y + py, z + iz, "end_portal")
                }
            }
        }
    }
    _G.World.SetBlock(x, y + 7, z, "nether_star")
    _G.World.SetBlock(x, y + 8, z, "dragon_head")
}

function GenerateChaosDome(x, z){
    var y = WORLD_Y
    var radius = 12

    for(var ix = -radius; ix <= radius; ix++){
        for(var iz = -radius; iz <= radius; iz++){
            for(var iy = 0; iy <= radius; iy++){
                var dist = Math.sqrt(ix*ix + iz*iz + iy*iy)
                if(Math.floor(dist) === radius){
                    var blocks = ["glass", "tinted_glass", "white_stained_glass", "black_stained_glass"]
                    var block = blocks[Math.floor(Math.random() * blocks.length)]
                    _G.World.SetBlock(x + ix, y + iy, z + iz, block)
                }
            }
        }
    }
    for(var l = 0; l < 20; l++){
        var lx = x + Math.floor((Math.random() - 0.5) * (radius - 2))
        var lz = z + Math.floor((Math.random() - 0.5) * (radius - 2))
        _G.World.SetBlock(lx, y + 3, lz, "glowstone")
    }
    _G.World.SetBlock(x, y + radius + 1, z, "beacon")
}

// ========== WORLD GENERATION ==========

function GenerateWorld(){
    structures = []
    _G.Logger.Info("§5========== CHAOS REALM GENERATION ==========")

    var total = 0
    var radius = 1000

    var structureTypes = [
        {name: "CHAOS SPIRE", func: GenerateChaosSpire, weight: 1},
        {name: "CHAOS RING", func: GenerateChaosRing, weight: 1},
        {name: "CHAOS CUBE", func: GenerateChaosCube, weight: 1},
        {name: "CHAOS PYRAMID", func: GenerateChaosPyramid, weight: 1},
        {name: "CHAOS TREE", func: GenerateChaosTree, weight: 1},
        {name: "CHAOS PORTAL", func: GenerateChaosPortal, weight: 1},
        {name: "CHAOS DOME", func: GenerateChaosDome, weight: 1}
    ]

    for(var dist = 120; dist <= radius; dist += 100){
        var count = Math.floor(dist / 40) + 3
        for(var i = 0; i < count; i++){
            var angle = Math.random() * Math.PI * 2
            var x = Math.cos(angle) * (dist + Math.random() * 60)
            var z = Math.sin(angle) * (dist + Math.random() * 60)

            var totalWeight = 0
            for(var s = 0; s < structureTypes.length; s++) totalWeight += structureTypes[s].weight
            var roll = Math.random() * totalWeight
            var selected = structureTypes[0]
            var accum = 0
            for(var s = 0; s < structureTypes.length; s++){
                accum += structureTypes[s].weight
                if(roll < accum){ selected = structureTypes[s]; break }
            }

            selected.func(Math.floor(x), Math.floor(z))
            structures.push({x: Math.floor(x), z: Math.floor(z), name: selected.name, notified: false})
            total++
        }
    }

    _G.Logger.Info("§a========== GENERATION COMPLETE ==========")
    _G.Logger.Info("§aStructures: " + total + " | Radius: " + radius)
    return total
}

// ========== RANDOM WORLD ACTIONS ==========

function RandomWorldAction(){
    var action = Math.floor(Math.random() * 8)
    var x = (Math.random() - 0.5) * 600
    var z = (Math.random() - 0.5) * 600

    switch(action){
        case 0:
            for(var i = 0; i < 50; i++){
                var bx = x + (Math.random() - 0.5) * 50
                var bz = z + (Math.random() - 0.5) * 50
                _G.World.SetBlock(Math.floor(bx), WORLD_Y + Math.floor(Math.random() * 5), Math.floor(bz), "glowstone")
            }
            _G.Logger.Info("§e[ACTION] Glowing light erupts from ground!")
            break
        case 1:
            for(var i = 0; i < 30; i++){
                var bx = x + (Math.random() - 0.5) * 40
                var bz = z + (Math.random() - 0.5) * 40
                _G.World.SetBlock(Math.floor(bx), WORLD_Y + 1, Math.floor(bz), "oak_sapling")
            }
            _G.Logger.Info("§a[ACTION] Forest grows spontaneously!")
            break
        case 2:
            for(var i = 0; i < 40; i++){
                var bx = x + (Math.random() - 0.5) * 60
                var bz = z + (Math.random() - 0.5) * 60
                _G.World.SetBlock(Math.floor(bx), WORLD_Y, Math.floor(bz), "water")
            }
            _G.Logger.Info("§b[ACTION] Water springs from nowhere!")
            break
        case 3:
            for(var i = 0; i < 35; i++){
                var bx = x + (Math.random() - 0.5) * 55
                var bz = z + (Math.random() - 0.5) * 55
                _G.World.SetBlock(Math.floor(bx), WORLD_Y + 1, Math.floor(bz), "gold_block")
            }
            _G.Logger.Info("§6[ACTION] Golden treasure appears!")
            break
        case 4:
            for(var i = 0; i < 45; i++){
                var bx = x + (Math.random() - 0.5) * 50
                var bz = z + (Math.random() - 0.5) * 50
                _G.World.SetBlock(Math.floor(bx), WORLD_Y + Math.floor(Math.random() * 3), Math.floor(bz), "lava")
            }
            _G.Logger.Info("§c[ACTION] Lava bursts from cracks!")
            break
        case 5:
            for(var i = 0; i < 25; i++){
                var bx = x + (Math.random() - 0.5) * 45
                var bz = z + (Math.random() - 0.5) * 45
                _G.World.SetBlock(Math.floor(bx), WORLD_Y + 1, Math.floor(bz), "chest")
            }
            _G.Logger.Info("§e[ACTION] Ancient chests materialize!")
            break
        case 6:
            for(var i = 0; i < 30; i++){
                var bx = x + (Math.random() - 0.5) * 50
                var bz = z + (Math.random() - 0.5) * 50
                _G.World.SetBlock(Math.floor(bx), WORLD_Y + 2, Math.floor(bz), "spawner")
            }
            _G.Logger.Info("§5[ACTION] Dungeons spawn across land!")
            break
        case 7:
            for(var i = 0; i < 60; i++){
                var bx = x + (Math.random() - 0.5) * 70
                var bz = z + (Math.random() - 0.5) * 70
                var blocks = ["diamond_block", "emerald_block", "netherite_block", "redstone_block"]
                var block = blocks[Math.floor(Math.random() * blocks.length)]
                _G.World.SetBlock(Math.floor(bx), WORLD_Y + Math.floor(Math.random() * 3), Math.floor(bz), block)
            }
            _G.Logger.Info("§b[ACTION] Rare ores appear everywhere!")
            break
    }
}

// ========== MAIN LOOPS ==========

_G.SetEvent(_G.Enum.Event.ClientTick, function(End){
    if(!End) return

    tick++
    chaosLevel = Math.min(chaosLevel + 0.01, 100)

    // CLIENT EFFECTS - VERY FREQUENT (every 0.5-1.5 seconds)
    if(tick % 20 === 0){
        var effectRoll = Math.random()
        var accumChance = 0

        for(var i = 0; i < CHAOS_EFFECTS.length; i++){
            accumChance += CHAOS_EFFECTS[i].chance / 2
            if(effectRoll < accumChance){
                var effect = CHAOS_EFFECTS[i]
                StartEffect(effect.id, effect.duration, effect.params())
                if(Math.random() < 0.15){
                    _G.Logger.Anyway("§5[CHAOS] " + effect.msg)
                }
                break
            }
        }
    }

    // DOUBLE EFFECTS SOMETIMES
    if(tick % 45 === 0 && Math.random() < 0.4){
        var e1 = CHAOS_EFFECTS[Math.floor(Math.random() * CHAOS_EFFECTS.length)]
        var e2 = CHAOS_EFFECTS[Math.floor(Math.random() * CHAOS_EFFECTS.length)]
        StartEffect(e1.id, e1.duration, e1.params())
        StartEffect(e2.id, e2.duration, e2.params())
        if(Math.random() < 0.2){
            _G.Logger.Anyway("§4[DOUBLE CHAOS] " + e1.msg + " + " + e2.msg)
        }
    }

    // BACKGROUND PULSE
    if(tick % 15 === 0 && !activeEffects[_G.Enum.Anomaly.SkyColor]){
        var pulse = (Math.sin(tick / 20) + 1) / 2 * 0.15
        _G.ApplyAnomaly(_G.Enum.Anomaly.SkyColor, 0.35 + pulse, 0.15 + pulse * 0.7, 0.55 + pulse)
        setTimeout(function(){
            if(!activeEffects[_G.Enum.Anomaly.SkyColor]){
                _G.ResetAnomaly(_G.Enum.Anomaly.SkyColor)
            }
        }, 80)
    }
})

_G.SetEvent(_G.Enum.Event.ServerTick, function(End){
    if(!End) return

    eventCounter++

    // WORLD ACTIONS (every 5-10 seconds)
    if(eventCounter % 100 === 0 && Math.random() < 0.6){
        RandomWorldAction()
    }

    // STRUCTURE NOTIFICATIONS
    if(eventCounter % 80 === 0){
        for(var i = 0; i < structures.length; i++){
            var struct = structures[i]
            var dist = Math.sqrt(struct.x * struct.x + struct.z * struct.z)
            if(dist < 70 && !struct.notified){
                _G.Logger.Info("§e[FOUND] §6" + struct.name + "§7 at (" + struct.x + ", " + struct.z + ")")
                struct.notified = true
            }
        }
    }

    // CHAOS MESSAGES
    if(eventCounter % 200 === 0 && Math.random() < 0.5){
        var chaosMsgs = [
            "§5REALITY IS FALLING APART",
            "§cDIMENSIONS ARE COLLIDING",
            "§6THE VOID IS WATCHING",
            "§bCHAOS LEVEL: " + Math.floor(chaosLevel) + "%",
            "§dSOMETHING IS COMING",
            "§4YOU CANNOT ESCAPE"
        ]
        _G.Logger.Anyway(chaosMsgs[Math.floor(Math.random() * chaosMsgs.length)])
    }
})

// ========== COMMANDS ==========

_G.GenerateWorld = function(){
    var count = GenerateWorld()
    _G.Logger.Info("§aChaos Realm generated! " + count + " structures")
    _G.Logger.Info("§7Center: 0, -2, 0 | Radius: 1000 blocks")
}

_G.Structures = function(){
    _G.Logger.Info("§6Structures (" + structures.length + "):")
    for(var i = 0; i < structures.length; i++){
        _G.Logger.Info("  §7- " + structures[i].name + " §8(" + structures[i].x + ", " + structures[i].z + ")")
    }
}

_G.Chaos = function(){
    for(var i = 0; i < 3; i++){
        var effect = CHAOS_EFFECTS[Math.floor(Math.random() * CHAOS_EFFECTS.length)]
        StartEffect(effect.id, effect.duration, effect.params())
    }
    _G.Logger.Info("§5CHAOS UNLEASHED!")
}

_G.StopChaos = function(){
    for(var id in activeEffects){
        _G.ResetAnomaly(parseInt(id))
    }
    activeEffects = {}
    _G.Logger.Info("§8Chaos stopped")
}

_G.ResetSky = function(){
    _G.ResetAnomaly(_G.Enum.Anomaly.SkyColor)
    _G.ResetAnomaly(_G.Enum.Anomaly.SkyRender)
    _G.ResetAnomaly(_G.Enum.Anomaly.SunVisible)
    _G.ResetAnomaly(_G.Enum.Anomaly.MoonVisible)
    _G.ResetAnomaly(_G.Enum.Anomaly.StarsVisible)
    _G.Logger.Info("§7Sky reset to normal")
}

// ========== INIT ==========
_G.SetEvent(_G.Enum.Event.JSReload, function(End){
    if(End){
        _G.StopChaos()
        _G.ResetSky()
        _G.Logger.Info("§8=== CHAOS REALM UNLOADED ===")
    } else {
        _G.Logger.Info("§5§l=== CHAOS REALM ===")
        _G.Logger.Info("§7Center: 0, -2, 0 | Radius: 1000 blocks")
        _G.Logger.Info("§7Frequent effects | Massive structures | Total chaos")
        _G.Logger.Info("§aCommands:")
        _G.Logger.Info("  §e_G.GenerateWorld() §7- generate world")
        _G.Logger.Info("  §e_G.Structures() §7- list structures")
        _G.Logger.Info("  §e_G.Chaos() §7- unleash chaos")
        _G.Logger.Info("  §e_G.StopChaos() §7- stop effects")
        _G.Logger.Info("  §e_G.ResetSky() §7- reset sky")
    }
})

_G.Logger.Info("§5=== CHAOS REALM LOADED ===")
_G.Logger.Info("§7Enter §e_G.GenerateWorld() §7to begin")