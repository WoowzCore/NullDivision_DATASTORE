// ========== ИСКАЖЕНИЕ РЕАЛЬНОСТИ ==========
// Центр: 0, -2, 0 | Огромные структуры | Клиентские глюки

// ========== НАСТРОЙКИ ==========
var WORLD_Y = -2
var tick = 0
var activeEffects = {}
var structures = []

// ========== КЛИЕНТСКИЕ ЭФФЕКТЫ ==========

function StartEffect(effectId, duration, params){
    if(activeEffects[effectId]) return
    activeEffects[effectId] = true

    _G.ApplyAnomaly(effectId, params)

    setTimeout(function(){
        _G.ResetAnomaly(effectId)
        delete activeEffects[effectId]
    }, duration)
}

// ХАОТИЧНЫЕ ЭФФЕКТЫ
var EFFECTS = [
    {
        id: _G.Enum.Anomaly.SkyColor,
        chance: 0.25,
        duration: 80,
        params: function(){
            return [
                0.2 + Math.random() * 0.8,
                0.1 + Math.random() * 0.7,
                0.3 + Math.random() * 0.7
            ]
        },
        message: "§dНебо искажается"
    },
    {
        id: _G.Enum.Anomaly.BufferBuilderVertexOffset,
        chance: 0.2,
        duration: 50,
        params: function(){
            var strength = 0.1 + Math.random() * 0.9
            return [
                (Math.random() - 0.5) * strength,
                (Math.random() - 0.5) * strength,
                (Math.random() - 0.5) * strength
            ]
        },
        message: "§5Мир дрожит"
    },
    {
        id: _G.Enum.Anomaly.BufferBuilderVertexRandom,
        chance: 0.18,
        duration: 60,
        params: function(){
            var strength = 0.2 + Math.random() * 0.8
            return [
                Math.random() * strength,
                Math.random() * strength,
                Math.random() * strength
            ]
        },
        message: "§8Реальность фрагментируется"
    },
    {
        id: _G.Enum.Anomaly.SunSize,
        chance: 0.15,
        duration: 100,
        params: function(){
            return [20 + Math.random() * 100]
        },
        message: "§6Солнце пульсирует"
    },
    {
        id: _G.Enum.Anomaly.MoonSize,
        chance: 0.15,
        duration: 100,
        params: function(){
            return [20 + Math.random() * 100]
        },
        message: "§bЛуна искажается"
    },
    {
        id: _G.Enum.Anomaly.CloudSpeed,
        chance: 0.2,
        duration: 120,
        params: function(){
            return [0.5 + Math.random() * 5]
        },
        message: "§7Облака сходят с ума"
    },
    {
        id: _G.Enum.Anomaly.CloudHeight,
        chance: 0.2,
        duration: 100,
        params: function(){
            return [-20 + Math.random() * 40]
        },
        message: "§7Облака падают/взлетают"
    },
    {
        id: _G.Enum.Anomaly.CloudSize,
        chance: 0.18,
        duration: 90,
        params: function(){
            return [
                5 + Math.random() * 30,
                0.5 + Math.random() * 3,
                5 + Math.random() * 30
            ]
        },
        message: "§7Облака меняют форму"
    },
    {
        id: _G.Enum.Anomaly.SunVisible,
        chance: 0.1,
        duration: 60,
        params: function(){
            return [Math.random() < 0.5]
        },
        message: "§eСолнце моргает"
    },
    {
        id: _G.Enum.Anomaly.MoonVisible,
        chance: 0.1,
        duration: 60,
        params: function(){
            return [Math.random() < 0.5]
        },
        message: "§bЛуна мерцает"
    },
    {
        id: _G.Enum.Anomaly.StarsVisible,
        chance: 0.12,
        duration: 70,
        params: function(){
            return [Math.random() < 0.5]
        },
        message: "§eЗвёзды исчезают"
    },
    {
        id: _G.Enum.Anomaly.SkyRender,
        chance: 0.08,
        duration: 120,
        params: function(){
            var renders = [_G.Enum.SkyRender.End, _G.Enum.SkyRender.None, _G.Enum.SkyRender.Normal]
            return [renders[Math.floor(Math.random() * renders.length)]]
        },
        message: "§5Небо заменяется"
    },
    {
        id: _G.Enum.Anomaly.SkyEndTiles,
        chance: 0.12,
        duration: 80,
        params: function(){
            return [Math.floor(1 + Math.random() * 30)]
        },
        message: "§5Энд небо распадается"
    }
]

// ========== ОГРОМНЫЕ СТРУКТУРЫ ==========

function GenerateGiantSpire(x, z){
    var y = WORLD_Y
    var height = 25 + Math.floor(Math.random() * 20)

    // Гигантский шип
    for(var h = 0; h <= height; h++){
        var radius = Math.floor((height - h) / 3) + 1
        if(radius < 1) radius = 1

        for(var ix = -radius; ix <= radius; ix++){
            for(var iz = -radius; iz <= radius; iz++){
                if(ix*ix + iz*iz <= radius*radius){
                    var block = h % 3 === 0 ? "obsidian" : (h % 2 === 0 ? "blackstone" : "polished_blackstone_bricks")
                    _G.World.SetBlock(x + ix, y + h, z + iz, block)
                }
            }
        }

        // Светящиеся кольца
        if(h % 5 === 0 && h > 0){
            for(var a = 0; a < 360; a += 20){
                var rad = a * Math.PI / 180
                var rx = x + Math.cos(rad) * (radius + 1)
                var rz = z + Math.sin(rad) * (radius + 1)
                _G.World.SetBlock(Math.floor(rx), y + h, Math.floor(rz), "glowstone")
            }
        }
    }

    // Кристалл на вершине
    for(var cr = 0; cr < 5; cr++){
        _G.World.SetBlock(x, y + height + cr, z, "amethyst_block")
    }
    _G.World.SetBlock(x, y + height + 5, z, "end_crystal")
}

function GenerateFloatingIsland(x, z){
    var y = WORLD_Y + 15 + Math.floor(Math.random() * 10)
    var radius = 8 + Math.floor(Math.random() * 7)

    // Основание острова
    for(var ix = -radius; ix <= radius; ix++){
        for(var iz = -radius; iz <= radius; iz++){
            var dist = Math.sqrt(ix*ix + iz*iz)
            if(dist <= radius){
                var height = Math.floor((radius - dist) / 2) + 1
                for(var h = 0; h <= height; h++){
                    var block = h === 0 ? "stone" : (h === height ? "grass_block" : "dirt")
                    _G.World.SetBlock(x + ix, y + h, z + iz, block)
                }
            }
        }
    }

    // Деревья на острове
    for(var t = 0; t < 5; t++){
        var tx = x + Math.floor((Math.random() - 0.5) * (radius - 2))
        var tz = z + Math.floor((Math.random() - 0.5) * (radius - 2))
        for(var th = 1; th <= 4; th++){
            _G.World.SetBlock(tx, y + 2 + th, tz, "oak_log")
        }
        for(var lx = -1; lx <= 1; lx++){
            for(var lz = -1; lz <= 1; lz++){
                _G.World.SetBlock(tx + lx, y + 6, tz + lz, "oak_leaves")
            }
        }
    }

    // Водопад с острова
    var wx = x + radius - 2
    var wz = z
    for(var w = 1; w <= 15; w++){
        _G.World.SetBlock(wx, y + w, wz, "water")
    }

    // Сундук с сокровищем
    _G.World.SetBlock(x + 2, y + 2, z + 2, "chest")
}

function GenerateCrystalCave(x, z){
    var y = WORLD_Y - 5
    var radius = 10

    // Пещера
    for(var ix = -radius; ix <= radius; ix++){
        for(var iz = -radius; iz <= radius; iz++){
            var dist = Math.sqrt(ix*ix + iz*iz)
            if(dist <= radius){
                for(var iy = 0; iy <= 8; iy++){
                    if(Math.random() < 0.3){
                        _G.World.SetBlock(x + ix, y + iy, z + iz, "stone")
                    }
                }
            }
        }
    }

    // Кристаллы
    for(var c = 0; c < 30; c++){
        var cx = x + Math.floor((Math.random() - 0.5) * radius * 1.5)
        var cz = z + Math.floor((Math.random() - 0.5) * radius * 1.5)
        var cy = y + 2 + Math.floor(Math.random() * 6)
        var crystalHeight = 2 + Math.floor(Math.random() * 4)
        for(var ch = 0; ch < crystalHeight; ch++){
            var crystalType = Math.random() < 0.3 ? "amethyst_block" : "budding_amethyst"
            _G.World.SetBlock(cx, cy + ch, cz, crystalType)
        }
    }

    // Светящиеся блоки
    for(var l = 0; l < 20; l++){
        var lx = x + Math.floor((Math.random() - 0.5) * radius)
        var lz = z + Math.floor((Math.random() - 0.5) * radius)
        _G.World.SetBlock(lx, y + 1 + Math.floor(Math.random() * 5), lz, "glowstone")
    }
}

function GenerateObsidianPyramid(x, z){
    var y = WORLD_Y
    var size = 6

    for(var layer = 0; layer <= size; layer++){
        var layerSize = size - layer
        var layerY = y + layer * 2

        for(var ix = -layerSize; ix <= layerSize; ix++){
            for(var iz = -layerSize; iz <= layerSize; iz++){
                if(Math.abs(ix) === layerSize || Math.abs(iz) === layerSize){
                    _G.World.SetBlock(x + ix, layerY, z + iz, "obsidian")
                    _G.World.SetBlock(x + ix, layerY + 1, z + iz, "crying_obsidian")
                }
            }
        }

        // Лестница
        if(layer < size){
            _G.World.SetBlock(x + layerSize, layerY + 2, z, "air")
            _G.World.SetBlock(x + layerSize, layerY + 2, z + 1, "obsidian")
        }
    }

    // Портал на вершине
    _G.World.SetBlock(x, y + size * 2 + 2, z, "end_portal_frame")
    _G.World.SetBlock(x, y + size * 2 + 3, z, "end_portal")
    _G.World.SetBlock(x, y + size * 2 + 4, z, "nether_star")
}

function GenerateGiantTree(x, z){
    var y = WORLD_Y
    var trunkHeight = 12 + Math.floor(Math.random() * 8)

    // Ствол
    for(var h = 0; h <= trunkHeight; h++){
        var radius = h < 3 ? 3 : h < trunkHeight - 2 ? 2 : 1
        for(var ix = -radius; ix <= radius; ix++){
            for(var iz = -radius; iz <= radius; iz++){
                if(ix*ix + iz*iz <= radius*radius){
                    _G.World.SetBlock(x + ix, y + h, z + iz, "dark_oak_log")
                }
            }
        }
    }

    // Крона
    var crownY = y + trunkHeight
    for(var cx = -6; cx <= 6; cx++){
        for(var cz = -6; cz <= 6; cz++){
            var dist = Math.sqrt(cx*cx + cz*cz)
            if(dist <= 5){
                for(var ch = 0; ch <= 4; ch++){
                    if(dist + ch <= 5.5){
                        _G.World.SetBlock(x + cx, crownY + ch, z + cz, "dark_oak_leaves")
                    }
                }
            }
        }
    }

    // Светящиеся грибы
    for(var m = 0; m < 15; m++){
        var mx = x + Math.floor((Math.random() - 0.5) * 5)
        var mz = z + Math.floor((Math.random() - 0.5) * 5)
        var my = y + 2 + Math.floor(Math.random() * (trunkHeight - 2))
        _G.World.SetBlock(mx, my, mz, "shroomlight")
    }
}

function GenerateRuinedCastle(x, z){
    var y = WORLD_Y

    // Стены
    for(var ix = -12; ix <= 12; ix++){
        for(var iz = -12; iz <= 12; iz++){
            if(Math.abs(ix) === 12 || Math.abs(iz) === 12){
                if(Math.random() < 0.8){
                    for(var iy = 1; iy <= 6; iy++){
                        if(Math.random() < 0.7){
                            _G.World.SetBlock(x + ix, y + iy, z + iz, "stone_bricks")
                        }
                    }
                }
            }
        }
    }

    // Башни по углам
    var towers = [[-10,-10], [-10,10], [10,-10], [10,10]]
    for(var t = 0; t < towers.length; t++){
        var tx = towers[t][0]
        var tz = towers[t][1]
        for(var th = 1; th <= 10; th++){
            _G.World.SetBlock(x + tx, y + th, z + tz, "stone_bricks")
            for(var tw = -1; tw <= 1; tw++){
                for(var tl = -1; tl <= 1; tl++){
                    if(Math.abs(tw) === 1 || Math.abs(tl) === 1){
                        if(Math.random() < 0.5){
                            _G.World.SetBlock(x + tx + tw, y + th, z + tz + tl, "stone_brick_wall")
                        }
                    }
                }
            }
        }
        _G.World.SetBlock(x + tx, y + 11, z + tz, "torch")
    }

    // Внутренний двор
    for(var ix = -8; ix <= 8; ix++){
        for(var iz = -8; iz <= 8; iz++){
            _G.World.SetBlock(x + ix, y, z + iz, "grass_block")
        }
    }

    // Трон
    _G.World.SetBlock(x, y + 1, z, "gold_block")
    _G.World.SetBlock(x, y + 2, z, "gold_block")
    _G.World.SetBlock(x + 1, y + 2, z, "gold_block")
    _G.World.SetBlock(x - 1, y + 2, z, "gold_block")
}

function GenerateNetherPortalStructure(x, z){
    var y = WORLD_Y

    // Пьедестал
    for(var px = -3; px <= 3; px++){
        for(var pz = -3; pz <= 3; pz++){
            _G.World.SetBlock(x + px, y, z + pz, "crying_obsidian")
        }
    }

    // Портал
    for(var ph = 1; ph <= 6; ph++){
        _G.World.SetBlock(x - 2, y + ph, z, "crying_obsidian")
        _G.World.SetBlock(x + 2, y + ph, z, "crying_obsidian")
        if(ph === 6){
            _G.World.SetBlock(x - 1, y + ph, z, "crying_obsidian")
            _G.World.SetBlock(x, y + ph, z, "crying_obsidian")
            _G.World.SetBlock(x + 1, y + ph, z, "crying_obsidian")
        }
    }

    // Внутренность портала
    for(var px = -1; px <= 1; px++){
        for(var py = 1; py <= 5; py++){
            _G.World.SetBlock(x + px, y + py, z, "nether_portal")
        }
    }

    // Лава вокруг
    for(var lx = -4; lx <= 4; lx++){
        for(var lz = -4; lz <= 4; lz++){
            if(Math.abs(lx) > 3 || Math.abs(lz) > 3){
                if(Math.abs(lx) <= 4 && Math.abs(lz) <= 4){
                    _G.World.SetBlock(x + lx, y, z + lz, "lava")
                }
            }
        }
    }
}

// ========== ГЕНЕРАЦИЯ МИРА ==========

function GenerateWorld(){
    structures = []
    _G.Logger.Info("§5========== ГЕНЕРАЦИЯ МИРА ==========")

    var total = 0
    var radius = 800

    var structureTypes = [
        {name: "Гигантский Шип", func: GenerateGiantSpire, weight: 1},
        {name: "Парящий Остров", func: GenerateFloatingIsland, weight: 1},
        {name: "Хрустальная Пещера", func: GenerateCrystalCave, weight: 1},
        {name: "Обсидиановая Пирамида", func: GenerateObsidianPyramid, weight: 1},
        {name: "Гигантское Древо", func: GenerateGiantTree, weight: 1},
        {name: "Разрушенный Замок", func: GenerateRuinedCastle, weight: 1},
        {name: "Портал в Незер", func: GenerateNetherPortalStructure, weight: 1}
    ]

    for(var dist = 100; dist <= radius; dist += 120){
        var count = Math.floor(dist / 60) + 2
        for(var i = 0; i < count; i++){
            var angle = Math.random() * Math.PI * 2
            var x = Math.cos(angle) * (dist + Math.random() * 50)
            var z = Math.sin(angle) * (dist + Math.random() * 50)

            var totalWeight = 0
            for(var s = 0; s < structureTypes.length; s++){
                totalWeight += structureTypes[s].weight
            }
            var roll = Math.random() * totalWeight
            var selected = structureTypes[0]
            var accum = 0
            for(var s = 0; s < structureTypes.length; s++){
                accum += structureTypes[s].weight
                if(roll < accum){
                    selected = structureTypes[s]
                    break
                }
            }

            selected.func(Math.floor(x), Math.floor(z))
            structures.push({x: Math.floor(x), z: Math.floor(z), name: selected.name, notified: false})
            total++
        }
    }

    // Центральная структура
    _G.Logger.Info("§6Генерация центральной структуры...")
    var centerType = structureTypes[Math.floor(Math.random() * structureTypes.length)]
    centerType.func(0, 0)
    structures.push({x: 0, z: 0, name: "ЦЕНТРАЛЬНАЯ: " + centerType.name, notified: false})
    total++

    _G.Logger.Info("§a========== ГЕНЕРАЦИЯ ЗАВЕРШЕНА ==========")
    _G.Logger.Info("§aСгенерировано структур: " + total)
    return total
}

// ========== ОСНОВНОЙ ЦИКЛ ==========

_G.SetEvent(_G.Enum.Event.ClientTick, function(End){
    if(!End) return

    tick++

    // Случайные эффекты (каждые 2-4 секунды)
    if(tick % 40 === 0){
        var effectRoll = Math.random()
        var accumChance = 0

        for(var i = 0; i < EFFECTS.length; i++){
            accumChance += EFFECTS[i].chance
            if(effectRoll < accumChance){
                var effect = EFFECTS[i]
                StartEffect(effect.id, effect.duration, effect.params())
                if(Math.random() < 0.3){
                    _G.Logger.Anyway("§5[ИСКАЖЕНИЕ] " + effect.message)
                }
                break
            }
        }
    }

    // Лёгкая пульсация неба (фон)
    if(tick % 10 === 0 && !activeEffects[_G.Enum.Anomaly.SkyColor]){
        var pulse = (Math.sin(tick / 30) + 1) / 2 * 0.2
        _G.ApplyAnomaly(_G.Enum.Anomaly.SkyColor, 0.4 + pulse, 0.2 + pulse * 0.5, 0.6 + pulse)
        setTimeout(function(){
            if(!activeEffects[_G.Enum.Anomaly.SkyColor]){
                _G.ResetAnomaly(_G.Enum.Anomaly.SkyColor)
            }
        }, 100)
    }
})

// Серверные оповещения
var notifyTimer = 0

_G.SetEvent(_G.Enum.Event.ServerTick, function(End){
    if(!End) return

    notifyTimer++
    if(notifyTimer < 80) return
    notifyTimer = 0

    for(var i = 0; i < structures.length; i++){
        var struct = structures[i]
        var dist = Math.sqrt(struct.x * struct.x + struct.z * struct.z)

        if(dist < 60 && !struct.notified){
            _G.Logger.Info("§eТы нашёл: §6" + struct.name + "§7 (" + struct.x + ", " + struct.z + ")")
            struct.notified = true
        }
    }
})

// ========== КОМАНДЫ ==========

_G.GenerateWorld = function(){
    var count = GenerateWorld()
    _G.Logger.Info("§aМир сгенерирован! " + count + " огромных структур")
    _G.Logger.Info("§7Центр: 0, -2, 0 | Радиус: 800 блоков")
}

_G.Structures = function(){
    _G.Logger.Info("§6Список структур (" + structures.length + "):")
    for(var i = 0; i < structures.length; i++){
        _G.Logger.Info("  §7- " + structures[i].name + " §8(" + structures[i].x + ", " + structures[i].z + ")")
    }
}

_G.Effect = function(index){
    if(index !== undefined && index >= 0 && index < EFFECTS.length){
        var effect = EFFECTS[index]
        StartEffect(effect.id, effect.duration, effect.params())
        _G.Logger.Info("§aЗапущен эффект: " + effect.message)
    } else {
        var rand = Math.floor(Math.random() * EFFECTS.length)
        var effect = EFFECTS[rand]
        StartEffect(effect.id, effect.duration, effect.params())
        _G.Logger.Info("§aСлучайный эффект: " + effect.message)
    }
}

_G.StopAllEffects = function(){
    for(var id in activeEffects){
        _G.ResetAnomaly(parseInt(id))
    }
    activeEffects = {}
    _G.Logger.Info("§8Все эффекты остановлены")
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========
_G.SetEvent(_G.Enum.Event.JSReload, function(End){
    if(End){
        _G.StopAllEffects()
        _G.ResetAnomaly(_G.Enum.Anomaly.SkyRender)
        _G.ResetAnomaly(_G.Enum.Anomaly.SunTexture)
        _G.ResetAnomaly(_G.Enum.Anomaly.MoonTexture)
        _G.ResetAnomaly(_G.Enum.Anomaly.SkyEndTexture)
        _G.Logger.Info("§8=== ИСКАЖЕНИЕ РЕАЛЬНОСТИ ВЫГРУЖЕНО ===")
    } else {
        _G.Logger.Info("§5§l=== ИСКАЖЕНИЕ РЕАЛЬНОСТИ ===")
        _G.Logger.Info("§7Центр: 0, -2, 0 | Радиус: 800 блоков")
        _G.Logger.Info("§7Огромные структуры | Хаотичные эффекты")
        _G.Logger.Info("§aКоманды:")
        _G.Logger.Info("  §e_G.GenerateWorld() §7- генерация мира")
        _G.Logger.Info("  §e_G.Structures() §7- список структур")
        _G.Logger.Info("  §e_G.Effect() §7- случайный эффект")
        _G.Logger.Info("  §e_G.StopAllEffects() §7- остановить всё")
    }
})

_G.Logger.Info("§5=== ИСКАЖЕНИЕ РЕАЛЬНОСТИ ЗАГРУЖЕНО ===")
_G.Logger.Info("§7Введите §e_G.GenerateWorld() §7для начала")