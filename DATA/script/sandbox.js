// ========== ДРЕВНИЕ СТРАЖИ ==========
// Для двух игроков | Центр: 0, 60, 0
// Структуры генерируются на расстоянии 200-1000 блоков

// ========== НАСТРОЙКИ ==========
var WORLD_RADIUS = 1000
var CENTER_X = 0
var CENTER_Z = 0
var CENTER_Y = 60

var structures = []
var rareEffectTimer = 0

// ========== ТИПЫ СТРУКТУР ==========
var STRUCTURE_TYPES = [
    "ancient_temple",
    "elemental_shrine",
    "dark_altar",
    "mystic_tower",
    "guardian_fortress",
    "sky_pillar"
]

var STRUCTURE_NAMES = {
    "ancient_temple": "Древний Храм",
    "elemental_shrine": "Святилище Стихий",
    "dark_altar": "Тёмный Алтарь",
    "mystic_tower": "Мистическая Башня",
    "guardian_fortress": "Крепость Стража",
    "sky_pillar": "Небесный Столп"
}

// ========== ВИЗУАЛЬНЫЕ ЭФФЕКТЫ (РЕДКИЕ) ==========

function TriggerRareEffect(){
    var effectType = Math.floor(Math.random() * 6)

    switch(effectType){
        case 0: // Вспышка в небе
            _G.ApplyAnomaly(_G.Enum.Anomaly.SkyColor, 1, 1, 0.8)
            _G.Logger.Info("§eНебо озарилось яркой вспышкой!")
            setTimeout(function(){
                _G.ResetAnomaly(_G.Enum.Anomaly.SkyColor)
            }, 3000)
            break

        case 1: // Землетрясение (тряска камеры)
            _G.ApplyAnomaly(_G.Enum.Anomaly.BufferBuilderVertexOffset, 0.05, 0.05, 0.05)
            _G.Logger.Info("§7Земля дрожит под ногами...")
            setTimeout(function(){
                _G.ResetAnomaly(_G.Enum.Anomaly.BufferBuilderVertexOffset)
            }, 2000)
            break

        case 2: // Тьма на секунду
            _G.ApplyAnomaly(_G.Enum.Anomaly.SkyColor, 0.05, 0.05, 0.1)
            _G.Logger.Info("§8Мир поглотила тьма...")
            setTimeout(function(){
                _G.ResetAnomaly(_G.Enum.Anomaly.SkyColor)
            }, 1500)
            break

        case 3: // Кровавый оттенок
            _G.ApplyAnomaly(_G.Enum.Anomaly.SkyColor, 0.8, 0.2, 0.2)
            _G.Logger.Info("§cНебо окрасилось в багровый цвет!")
            setTimeout(function(){
                _G.ResetAnomaly(_G.Enum.Anomaly.SkyColor)
            }, 4000)
            break

        case 4: // Искажение мира
            _G.ApplyAnomaly(_G.Enum.Anomaly.BufferBuilderVertexRandom, 0.03, 0.03, 0.03)
            _G.Logger.Info("§5Реальность искажается...")
            setTimeout(function(){
                _G.ResetAnomaly(_G.Enum.Anomaly.BufferBuilderVertexRandom)
            }, 2500)
            break

        case 5: // Яркое солнце
            _G.ApplyAnomaly(_G.Enum.Anomaly.SunSize, 50)
            _G.Logger.Info("§6Солнце внезапно увеличилось!")
            setTimeout(function(){
                _G.ResetAnomaly(_G.Enum.Anomaly.SunSize)
            }, 3000)
            break
    }
}

// ========== ГЕНЕРАЦИЯ СТРУКТУР (С НОРМАЛЬНЫМИ ID БЛОКОВ) ==========

// ДРЕВНИЙ ХРАМ
function GenerateAncientTemple(x, z){
    var y = CENTER_Y

    // Фундамент из каменных кирпичей
    for(var ix = -8; ix <= 8; ix++){
        for(var iz = -8; iz <= 8; iz++){
            _G.World.SetBlock(x + ix, y, z + iz, "stone_bricks")
        }
    }

    // Стены
    for(var ix = -6; ix <= 6; ix++){
        for(var iz = -6; iz <= 6; iz++){
            if(Math.abs(ix) === 6 || Math.abs(iz) === 6){
                for(var iy = 1; iy <= 5; iy++){
                    _G.World.SetBlock(x + ix, y + iy, z + iz, "stone_bricks")
                }
            }
        }
    }

    // Колонны
    var pillars = [[-5,-5], [-5,5], [5,-5], [5,5]]
    for(var p = 0; p < pillars.length; p++){
        var px = pillars[p][0]
        var pz = pillars[p][1]
        for(var ph = 1; ph <= 7; ph++){
            _G.World.SetBlock(x + px, y + ph, z + pz, "quartz_pillar")
        }
        _G.World.SetBlock(x + px, y + 8, z + pz, "glowstone")
    }

    // Крыша
    for(var ry = 6; ry <= 9; ry++){
        var roofSize = 9 - ry
        for(var ix = -roofSize; ix <= roofSize; ix++){
            for(var iz = -roofSize; iz <= roofSize; iz++){
                if(Math.abs(ix) === roofSize || Math.abs(iz) === roofSize){
                    _G.World.SetBlock(x + ix, y + ry, z + iz, "stone_brick_stairs")
                }
            }
        }
    }

    // Алтарь в центре
    _G.World.SetBlock(x, y + 1, z, "gold_block")
    _G.World.SetBlock(x, y + 2, z, "beacon")
    _G.World.SetBlock(x + 1, y + 1, z, "chest")
    _G.World.SetBlock(x - 1, y + 1, z, "chest")
}

// СВЯТИЛИЩЕ СТИХИЙ
function GenerateElementalShrine(x, z){
    var y = CENTER_Y

    // Круглое основание
    for(var angle = 0; angle < 360; angle += 15){
        var rad = angle * Math.PI / 180
        var rx = x + Math.cos(rad) * 7
        var rz = z + Math.sin(rad) * 7
        _G.World.SetBlock(Math.floor(rx), y, Math.floor(rz), "stone_bricks")
        _G.World.SetBlock(Math.floor(rx), y + 1, Math.floor(rz), "polished_andesite")
    }

    // Элементальные пьедесталы
    var elements = [
        {dx: 5, dz: 0, block: "fire", name: "Огонь"},
        {dx: -5, dz: 0, block: "water", name: "Вода"},
        {dx: 0, dz: 5, block: "grass_block", name: "Земля"},
        {dx: 0, dz: -5, block: "feather", name: "Воздух"}
    ]

    for(var e = 0; e < elements.length; e++){
        var el = elements[e]
        _G.World.SetBlock(x + el.dx, y + 1, z + el.dz, "quartz_block")
        _G.World.SetBlock(x + el.dx, y + 2, z + el.dz, el.block)
        _G.World.SetBlock(x + el.dx, y + 3, z + el.dz, "torch")
    }

    // Центральный кристалл
    for(var cy = 1; cy <= 6; cy++){
        _G.World.SetBlock(x, y + cy, z, "amethyst_block")
    }
    _G.World.SetBlock(x, y + 7, z, "end_crystal")
}

// ТЁМНЫЙ АЛТАРЬ
function GenerateDarkAltar(x, z){
    var y = CENTER_Y

    // Искажённая земля
    for(var ix = -6; ix <= 6; ix++){
        for(var iz = -6; iz <= 6; iz++){
            if(Math.random() < 0.5){
                _G.World.SetBlock(x + ix, y, z + iz, "crimson_nylium")
            } else {
                _G.World.SetBlock(x + ix, y, z + iz, "netherrack")
            }
        }
    }

    // Стены из чёрного камня
    for(var ix = -4; ix <= 4; ix++){
        for(var iz = -4; iz <= 4; iz++){
            if(Math.abs(ix) === 4 || Math.abs(iz) === 4){
                for(var iy = 1; iy <= 4; iy++){
                    _G.World.SetBlock(x + ix, y + iy, z + iz, "polished_blackstone_bricks")
                }
            }
        }
    }

    // Алтарь
    for(var ax = -2; ax <= 2; ax++){
        for(var az = -2; az <= 2; az++){
            _G.World.SetBlock(x + ax, y + 1, z + az, "crying_obsidian")
        }
    }
    _G.World.SetBlock(x, y + 2, z, "enchanting_table")
    _G.World.SetBlock(x, y + 3, z, "nether_star")

    // Души в ловушках
    for(var s = 0; s < 8; s++){
        var angle = s * Math.PI * 2 / 8
        var sx = x + Math.cos(angle) * 5
        var sz = z + Math.sin(angle) * 5
        _G.World.SetBlock(Math.floor(sx), y + 1, Math.floor(sz), "soul_fire")
    }
}

// МИСТИЧЕСКАЯ БАШНЯ
function GenerateMysticTower(x, z){
    var y = CENTER_Y
    var height = 15

    // Основание
    for(var ix = -3; ix <= 3; ix++){
        for(var iz = -3; iz <= 3; iz++){
            _G.World.SetBlock(x + ix, y, z + iz, "purpur_block")
        }
    }

    // Башня
    for(var iy = 1; iy <= height; iy++){
        var radius = iy < 5 ? 3 : iy < 10 ? 2 : 1
        for(var ix = -radius; ix <= radius; ix++){
            for(var iz = -radius; iz <= radius; iz++){
                if(ix*ix + iz*iz <= radius*radius){
                    var block = iy % 2 === 0 ? "purpur_block" : "end_stone_bricks"
                    _G.World.SetBlock(x + ix, y + iy, z + iz, block)
                }
            }
        }

        // Окна
        if(iy > 4 && iy % 3 === 0){
            _G.World.SetBlock(x + radius, y + iy, z, "glass")
            _G.World.SetBlock(x - radius, y + iy, z, "glass")
            _G.World.SetBlock(x, y + iy, z + radius, "glass")
            _G.World.SetBlock(x, y + iy, z - radius, "glass")
        }
    }

    // Шпиль
    for(var sp = height + 1; sp <= height + 4; sp++){
        _G.World.SetBlock(x, y + sp, z, "iron_bars")
    }
    _G.World.SetBlock(x, y + height + 5, z, "end_rod")

    // Книжные полки
    for(var b = 1; b <= 4; b++){
        _G.World.SetBlock(x + 2, y + b, z, "bookshelf")
        _G.World.SetBlock(x - 2, y + b, z, "bookshelf")
        _G.World.SetBlock(x, y + b, z + 2, "bookshelf")
        _G.World.SetBlock(x, y + b, z - 2, "bookshelf")
    }
}

// КРЕПОСТЬ СТРАЖА
function GenerateGuardianFortress(x, z){
    var y = CENTER_Y

    // Стены
    for(var ix = -10; ix <= 10; ix++){
        for(var iz = -10; iz <= 10; iz++){
            if(Math.abs(ix) === 10 || Math.abs(iz) === 10){
                for(var iy = 1; iy <= 6; iy++){
                    var block = iy % 2 === 0 ? "stone_bricks" : "mossy_stone_bricks"
                    _G.World.SetBlock(x + ix, y + iy, z + iz, block)
                }
            }
        }
    }

    // Башни по углам
    var towers = [[-8,-8], [-8,8], [8,-8], [8,8]]
    for(var t = 0; t < towers.length; t++){
        var tx = towers[t][0]
        var tz = towers[t][1]
        for(var ty = 1; ty <= 8; ty++){
            _G.World.SetBlock(x + tx, y + ty, z + tz, "stone_bricks")
        }
        _G.World.SetBlock(x + tx, y + 9, z + tz, "torch")
    }

    // Ворота
    _G.World.SetBlock(x + 10, y + 3, z, "air")
    _G.World.SetBlock(x + 10, y + 4, z, "air")
    _G.World.SetBlock(x + 10, y + 5, z, "air")

    // Хранилище в центре
    _G.World.SetBlock(x, y + 1, z, "chest")
    for(var gx = -1; gx <= 1; gx++){
        for(var gz = -1; gz <= 1; gz++){
            if(gx !== 0 || gz !== 0){
                _G.World.SetBlock(x + gx, y + 1, z + gz, "iron_block")
            }
        }
    }
}

// НЕБЕСНЫЙ СТОЛП
function GenerateSkyPillar(x, z){
    var y = CENTER_Y
    var height = 20

    // Колонна
    for(var iy = 1; iy <= height; iy++){
        var radius = iy < 5 ? 4 : iy < 10 ? 3 : iy < 15 ? 2 : 1
        for(var ix = -radius; ix <= radius; ix++){
            for(var iz = -radius; iz <= radius; iz++){
                if(ix*ix + iz*iz <= radius*radius){
                    var block = iy === height ? "gold_block" : "quartz_block"
                    _G.World.SetBlock(x + ix, y + iy, z + iz, block)
                }
            }
        }

        // Светящиеся кольца
        if(iy % 4 === 0 && iy > 4){
            for(var a = 0; a < 360; a += 30){
                var rad = a * Math.PI / 180
                var rx = x + Math.cos(rad) * (radius + 1)
                var rz = z + Math.sin(rad) * (radius + 1)
                _G.World.SetBlock(Math.floor(rx), y + iy, Math.floor(rz), "glowstone")
            }
        }
    }

    // Платформа на вершине
    for(var px = -2; px <= 2; px++){
        for(var pz = -2; pz <= 2; pz++){
            _G.World.SetBlock(x + px, y + height + 1, z + pz, "gold_block")
        }
    }
    _G.World.SetBlock(x, y + height + 2, z, "beacon")
}

// ========== МАЛЫЕ СТРУКТУРЫ ==========

function GenerateRuins(x, z){
    var y = CENTER_Y
    for(var ix = -3; ix <= 3; ix++){
        for(var iz = -3; iz <= 3; iz++){
            if(Math.random() < 0.3){
                _G.World.SetBlock(x + ix, y, z + iz, "cracked_stone_bricks")
                if(Math.random() < 0.2){
                    _G.World.SetBlock(x + ix, y + 1, z + iz, "mossy_cobblestone")
                }
            }
        }
    }
}

function GenerateWatchtower(x, z){
    var y = CENTER_Y
    for(var wy = 1; wy <= 6; wy++){
        _G.World.SetBlock(x, y + wy, z, "cobblestone")
    }
    for(var wx = -1; wx <= 1; wx++){
        for(var wz = -1; wz <= 1; wz++){
            if(wx !== 0 || wz !== 0){
                _G.World.SetBlock(x + wx, y + 6, z + wz, "cobblestone_wall")
            }
        }
    }
    _G.World.SetBlock(x, y + 7, z, "torch")
}

function GenerateChestRuins(x, z){
    var y = CENTER_Y
    _G.World.SetBlock(x, y, z, "chest")
    for(var gx = -1; gx <= 1; gx++){
        for(var gz = -1; gz <= 1; gz++){
            if((gx !== 0 || gz !== 0) && Math.random() < 0.5){
                _G.World.SetBlock(x + gx, y, z + gz, "spawner")
            }
        }
    }
}

// ========== ГЕНЕРАЦИЯ МИРА ==========

function GenerateWorld(){
    structures = []
    _G.Logger.Info("§2========== ГЕНЕРАЦИЯ МИРА ==========")
    _G.Logger.Info("§7Центр: " + CENTER_X + ", " + CENTER_Z + ", " + CENTER_Y)
    _G.Logger.Info("§7Радиус: " + WORLD_RADIUS + " блоков")

    var total = 0

    // Генерируем структуры кольцами
    for(var dist = 200; dist <= WORLD_RADIUS; dist += 120){
        var count = Math.floor(dist / 60) + 2

        for(var i = 0; i < count; i++){
            var angle = (Math.random() * 360) * Math.PI / 180
            var x = CENTER_X + Math.cos(angle) * (dist + (Math.random() - 0.5) * 40)
            var z = CENTER_Z + Math.sin(angle) * (dist + (Math.random() - 0.5) * 40)

            var typeIndex = Math.floor(Math.random() * STRUCTURE_TYPES.length)
            var type = STRUCTURE_TYPES[typeIndex]
            var name = STRUCTURE_NAMES[type]

            switch(type){
                case "ancient_temple":
                    GenerateAncientTemple(Math.floor(x), Math.floor(z))
                    break
                case "elemental_shrine":
                    GenerateElementalShrine(Math.floor(x), Math.floor(z))
                    break
                case "dark_altar":
                    GenerateDarkAltar(Math.floor(x), Math.floor(z))
                    break
                case "mystic_tower":
                    GenerateMysticTower(Math.floor(x), Math.floor(z))
                    break
                case "guardian_fortress":
                    GenerateGuardianFortress(Math.floor(x), Math.floor(z))
                    break
                case "sky_pillar":
                    GenerateSkyPillar(Math.floor(x), Math.floor(z))
                    break
            }

            structures.push({
                x: Math.floor(x),
                z: Math.floor(z),
                type: name,
                notified: false
            })
            total++

            // Маленькие структуры вокруг
            for(var s = 0; s < 2; s++){
                var subAngle = angle + (Math.random() - 0.5) * 0.8
                var subDist = dist + (Math.random() - 0.5) * 50
                var sx = CENTER_X + Math.cos(subAngle) * subDist
                var sz = CENTER_Z + Math.sin(subAngle) * subDist

                var small = Math.floor(Math.random() * 3)
                if(small === 0) GenerateRuins(Math.floor(sx), Math.floor(sz))
                if(small === 1) GenerateWatchtower(Math.floor(sx), Math.floor(sz))
                if(small === 2) GenerateChestRuins(Math.floor(sx), Math.floor(sz))
            }
        }
    }

    _G.Logger.Info("§a========== ГЕНЕРАЦИЯ ЗАВЕРШЕНА ==========")
    _G.Logger.Info("§aВсего структур: " + total)
    return total
}

// ========== ОПОВЕЩЕНИЯ ==========

function CheckProximity(){
    // Координаты игроков (центр для обоих, так как данные не получить)
    var player1X = 0
    var player1Z = 0
    var player2X = 0
    var player2Z = 0

    for(var s = 0; s < structures.length; s++){
        var struct = structures[s]
        var dist1 = Math.sqrt(Math.pow(player1X - struct.x, 2) + Math.pow(player1Z - struct.z, 2))
        var dist2 = Math.sqrt(Math.pow(player2X - struct.x, 2) + Math.pow(player2Z - struct.z, 2))

        if(dist1 < 60 && !struct.notified){
            _G.Logger.Info("§eИгрок в центре обнаружил: §6" + struct.type + "§e (" + struct.x + ", " + struct.z + ")")
            struct.notified = true
            TriggerRareEffect()
        }

        if(dist2 < 60 && !struct.notified2){
            _G.Logger.Info("§eВторой игрок обнаружил: §6" + struct.type + "§e (" + struct.x + ", " + struct.z + ")")
            struct.notified2 = true
            TriggerRareEffect()
        }
    }
}

// ========== ОСНОВНОЙ ЦИКЛ ==========
var tickCounter = 0

_G.SetEvent(_G.Enum.Event.ServerTick, function(End){
    if(!End) return

    tickCounter++

    // Редкие эффекты (раз в 10-30 секунд)
    if(tickCounter % 300 === 0 && Math.random() < 0.3){
        TriggerRareEffect()
    }

    // Проверка близости каждые 3 секунды
    if(tickCounter % 60 === 0){
        CheckProximity()
    }
})

// ========== КОМАНДЫ ==========

_G.GenerateWorld = function(){
    var count = GenerateWorld()
    _G.Logger.Info("§aСгенерировано " + count + " структур!")
}

_G.ListStructures = function(){
    _G.Logger.Info("§6Список структур (" + structures.length + "):")
    for(var s = 0; s < structures.length; s++){
        _G.Logger.Info("  §7- " + structures[s].type + " §8(" + structures[s].x + ", " + structures[s].z + ")")
    }
}

_G.NearestStructure = function(){
    if(structures.length === 0){
        _G.Logger.Info("§cНет сгенерированных структур. Используйте _G.GenerateWorld()")
        return
    }

    var nearest = structures[0]
    var nearestDist = Math.sqrt(Math.pow(0 - nearest.x, 2) + Math.pow(0 - nearest.z, 2))

    for(var s = 1; s < structures.length; s++){
        var dist = Math.sqrt(Math.pow(0 - structures[s].x, 2) + Math.pow(0 - structures[s].z, 2))
        if(dist < nearestDist){
            nearestDist = dist
            nearest = structures[s]
        }
    }

    _G.Logger.Info("§aБлижайшая структура к центру: §6" + nearest.type)
    _G.Logger.Info("§7Расстояние: " + Math.floor(nearestDist) + " блоков")
    _G.Logger.Info("§7Координаты: " + nearest.x + ", " + nearest.z)
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========
_G.SetEvent(_G.Enum.Event.JSReload, function(End){
    if(End){
        _G.Logger.Info("§8=== ДРЕВНИЕ СТРАЖИ ВЫГРУЖЕНЫ ===")
        _G.ResetAnomaly(_G.Enum.Anomaly.SkyColor)
        _G.ResetAnomaly(_G.Enum.Anomaly.BufferBuilderVertexOffset)
        _G.ResetAnomaly(_G.Enum.Anomaly.BufferBuilderVertexRandom)
        _G.ResetAnomaly(_G.Enum.Anomaly.SunSize)
    } else {
        _G.Logger.Info("§6§l=== ДРЕВНИЕ СТРАЖИ ===")
        _G.Logger.Info("§7Радиус мира: " + WORLD_RADIUS + " блоков")
        _G.Logger.Info("§7Центр: 0, 60, 0")
        _G.Logger.Info("§aКоманды:")
        _G.Logger.Info("  §e_G.GenerateWorld() §7- сгенерировать мир")
        _G.Logger.Info("  §e_G.ListStructures() §7- список структур")
        _G.Logger.Info("  §e_G.NearestStructure() §7- ближайшая структура")
    }
})

_G.Logger.Info("§6=== ДРЕВНИЕ СТРАЖИ ЗАГРУЖЕНЫ ===")
_G.Logger.Info("§7Введите §e_G.GenerateWorld() §7для генерации")