// ========== ГЛЮКИ РЕАЛЬНОСТИ ==========
// Для двух игроков | Высота: 0
// Клиентские визуальные эффекты + ивенты

// ========== НАСТРОЙКИ ==========
var WORLD_Y = 0
var clientTick = 0
var activeGlitch = null
var glitchDuration = 0
var structures = []

// ========== КЛИЕНТСКИЕ ВИЗУАЛЬНЫЕ ЭФФЕКТЫ ==========

var VISUAL_EFFECTS = [
    {
        name: "§cКРАСНЫЙ ФИЛЬТР",
        duration: 60,
        apply: function(){
            _G.ApplyAnomaly(_G.Enum.Anomaly.SkyColor, 0.9, 0.2, 0.2)
        },
        reset: function(){
            _G.ResetAnomaly(_G.Enum.Anomaly.SkyColor)
        }
    },
    {
        name: "§bСИНИЙ ФИЛЬТР",
        duration: 60,
        apply: function(){
            _G.ApplyAnomaly(_G.Enum.Anomaly.SkyColor, 0.2, 0.3, 0.9)
        },
        reset: function(){
            _G.ResetAnomaly(_G.Enum.Anomaly.SkyColor)
        }
    },
    {
        name: "§aЗЕЛЁНЫЙ ФИЛЬТР",
        duration: 60,
        apply: function(){
            _G.ApplyAnomaly(_G.Enum.Anomaly.SkyColor, 0.2, 0.8, 0.2)
        },
        reset: function(){
            _G.ResetAnomaly(_G.Enum.Anomaly.SkyColor)
        }
    },
    {
        name: "§5ФИОЛЕТОВЫЙ ФИЛЬТР",
        duration: 60,
        apply: function(){
            _G.ApplyAnomaly(_G.Enum.Anomaly.SkyColor, 0.8, 0.2, 0.9)
        },
        reset: function(){
            _G.ResetAnomaly(_G.Enum.Anomaly.SkyColor)
        }
    },
    {
        name: "§7СЕПИЯ",
        duration: 80,
        apply: function(){
            _G.ApplyAnomaly(_G.Enum.Anomaly.SkyColor, 0.7, 0.5, 0.3)
        },
        reset: function(){
            _G.ResetAnomaly(_G.Enum.Anomaly.SkyColor)
        }
    },
    {
        name: "§8ТЁМНЫЙ ФИЛЬТР",
        duration: 50,
        apply: function(){
            _G.ApplyAnomaly(_G.Enum.Anomaly.SkyColor, 0.1, 0.1, 0.1)
        },
        reset: function(){
            _G.ResetAnomaly(_G.Enum.Anomaly.SkyColor)
        }
    },
    {
        name: "§eЖЁЛТЫЙ ФИЛЬТР",
        duration: 60,
        apply: function(){
            _G.ApplyAnomaly(_G.Enum.Anomaly.SkyColor, 0.9, 0.8, 0.2)
        },
        reset: function(){
            _G.ResetAnomaly(_G.Enum.Anomaly.SkyColor)
        }
    },
    {
        name: "§dРОЗОВЫЙ ФИЛЬТР",
        duration: 55,
        apply: function(){
            _G.ApplyAnomaly(_G.Enum.Anomaly.SkyColor, 0.9, 0.5, 0.8)
        },
        reset: function(){
            _G.ResetAnomaly(_G.Enum.Anomaly.SkyColor)
        }
    }
]

var SCREEN_SHAKE_EFFECTS = [
    {
        name: "§cЗЕМЛЕТРЯСЕНИЕ",
        duration: 40,
        apply: function(){
            _G.ApplyAnomaly(_G.Enum.Anomaly.BufferBuilderVertexOffset, 0.03, 0.03, 0.03)
        },
        reset: function(){
            _G.ResetAnomaly(_G.Enum.Anomaly.BufferBuilderVertexOffset)
        }
    },
    {
        name: "§5СИЛЬНАЯ ТРЯСКА",
        duration: 30,
        apply: function(){
            _G.ApplyAnomaly(_G.Enum.Anomaly.BufferBuilderVertexOffset, 0.08, 0.05, 0.08)
        },
        reset: function(){
            _G.ResetAnomaly(_G.Enum.Anomaly.BufferBuilderVertexOffset)
        }
    },
    {
        name: "§8РАЗРЫВ РЕАЛЬНОСТИ",
        duration: 50,
        apply: function(){
            _G.ApplyAnomaly(_G.Enum.Anomaly.BufferBuilderVertexRandom, 0.05, 0.05, 0.05)
            _G.ApplyAnomaly(_G.Enum.Anomaly.BufferBuilderVertexOffset, 0.02, 0.02, 0.02)
        },
        reset: function(){
            _G.ResetAnomaly(_G.Enum.Anomaly.BufferBuilderVertexRandom)
            _G.ResetAnomaly(_G.Enum.Anomaly.BufferBuilderVertexOffset)
        }
    },
    {
        name: "§3ВЕРТИКАЛЬНАЯ ВИБРАЦИЯ",
        duration: 45,
        apply: function(){
            _G.ApplyAnomaly(_G.Enum.Anomaly.BufferBuilderVertexOffset, 0, 0.06, 0)
        },
        reset: function(){
            _G.ResetAnomaly(_G.Enum.Anomaly.BufferBuilderVertexOffset)
        }
    },
    {
        name: "§6ГОРИЗОНТАЛЬНАЯ ВИБРАЦИЯ",
        duration: 45,
        apply: function(){
            _G.ApplyAnomaly(_G.Enum.Anomaly.BufferBuilderVertexOffset, 0.06, 0, 0.06)
        },
        reset: function(){
            _G.ResetAnomaly(_G.Enum.Anomaly.BufferBuilderVertexOffset)
        }
    }
]

var CELESTIAL_EFFECTS = [
    {
        name: "§6ГИГАНТСКОЕ СОЛНЦЕ",
        duration: 100,
        apply: function(){
            _G.ApplyAnomaly(_G.Enum.Anomaly.SunSize, 80)
            _G.ApplyAnomaly(_G.Enum.Anomaly.SunVisible, true)
        },
        reset: function(){
            _G.ResetAnomaly(_G.Enum.Anomaly.SunSize)
            _G.ResetAnomaly(_G.Enum.Anomaly.SunVisible)
        }
    },
    {
        name: "§bГИГАНТСКАЯ ЛУНА",
        duration: 100,
        apply: function(){
            _G.ApplyAnomaly(_G.Enum.Anomaly.MoonSize, 90)
            _G.ApplyAnomaly(_G.Enum.Anomaly.MoonVisible, true)
        },
        reset: function(){
            _G.ResetAnomaly(_G.Enum.Anomaly.MoonSize)
            _G.ResetAnomaly(_G.Enum.Anomaly.MoonVisible)
        }
    },
    {
        name: "§eСОЛНЦЕ И ЛУНА ВМЕСТЕ",
        duration: 120,
        apply: function(){
            _G.ApplyAnomaly(_G.Enum.Anomaly.SunVisible, true)
            _G.ApplyAnomaly(_G.Enum.Anomaly.MoonVisible, true)
            _G.ApplyAnomaly(_G.Enum.Anomaly.SunSize, 40)
            _G.ApplyAnomaly(_G.Enum.Anomaly.MoonSize, 40)
        },
        reset: function(){
            _G.ResetAnomaly(_G.Enum.Anomaly.SunVisible)
            _G.ResetAnomaly(_G.Enum.Anomaly.MoonVisible)
            _G.ResetAnomaly(_G.Enum.Anomaly.SunSize)
            _G.ResetAnomaly(_G.Enum.Anomaly.MoonSize)
        }
    },
    {
        name: "§8СОЛНЕЧНОЕ ЗАТМЕНИЕ",
        duration: 90,
        apply: function(){
            _G.ApplyAnomaly(_G.Enum.Anomaly.SunVisible, false)
            _G.ApplyAnomaly(_G.Enum.Anomaly.SkyColor, 0.1, 0.1, 0.15)
        },
        reset: function(){
            _G.ResetAnomaly(_G.Enum.Anomaly.SunVisible)
            _G.ResetAnomaly(_G.Enum.Anomaly.SkyColor)
        }
    },
    {
        name: "§dДВОЙНОЕ СОЛНЦЕ",
        duration: 80,
        apply: function(){
            _G.ApplyAnomaly(_G.Enum.Anomaly.SunSize, 60)
            _G.ApplyAnomaly(_G.Enum.Anomaly.SkyColor, 0.9, 0.7, 0.3)
        },
        reset: function(){
            _G.ResetAnomaly(_G.Enum.Anomaly.SunSize)
            _G.ResetAnomaly(_G.Enum.Anomaly.SkyColor)
        }
    }
]

var CLOUD_EFFECTS = [
    {
        name: "§7БЫСТРЫЕ ОБЛАКА",
        duration: 120,
        apply: function(){
            _G.ApplyAnomaly(_G.Enum.Anomaly.CloudSpeed, 5)
        },
        reset: function(){
            _G.ResetAnomaly(_G.Enum.Anomaly.CloudSpeed)
        }
    },
    {
        name: "§7МЕДЛЕННЫЕ ОБЛАКА",
        duration: 120,
        apply: function(){
            _G.ApplyAnomaly(_G.Enum.Anomaly.CloudSpeed, 0.1)
        },
        reset: function(){
            _G.ResetAnomaly(_G.Enum.Anomaly.CloudSpeed)
        }
    },
    {
        name: "§8НИЗКИЕ ОБЛАКА",
        duration: 100,
        apply: function(){
            _G.ApplyAnomaly(_G.Enum.Anomaly.CloudHeight, -15)
            _G.ApplyAnomaly(_G.Enum.Anomaly.CloudSize, 20, 2, 20)
        },
        reset: function(){
            _G.ResetAnomaly(_G.Enum.Anomaly.CloudHeight)
            _G.ResetAnomaly(_G.Enum.Anomaly.CloudSize)
        }
    },
    {
        name: "§fВЫСОКИЕ ОБЛАКА",
        duration: 100,
        apply: function(){
            _G.ApplyAnomaly(_G.Enum.Anomaly.CloudHeight, 20)
            _G.ApplyAnomaly(_G.Enum.Anomaly.CloudSize, 8, 1, 8)
        },
        reset: function(){
            _G.ResetAnomaly(_G.Enum.Anomaly.CloudHeight)
            _G.ResetAnomaly(_G.Enum.Anomaly.CloudSize)
        }
    },
    {
        name: "§7РАЗОРВАННЫЕ ОБЛАКА",
        duration: 90,
        apply: function(){
            _G.ApplyAnomaly(_G.Enum.Anomaly.CloudSize, 5, 0.5, 15)
            _G.ApplyAnomaly(_G.Enum.Anomaly.CloudSpeed, 2)
        },
        reset: function(){
            _G.ResetAnomaly(_G.Enum.Anomaly.CloudSize)
            _G.ResetAnomaly(_G.Enum.Anomaly.CloudSpeed)
        }
    }
]

var STAR_EFFECTS = [
    {
        name: "§eЗВЁЗДОПАД",
        duration: 70,
        apply: function(){
            _G.ApplyAnomaly(_G.Enum.Anomaly.StarsVisible, true)
            _G.ApplyAnomaly(_G.Enum.Anomaly.SkyColor, 0.1, 0.1, 0.3)
        },
        reset: function(){
            _G.ResetAnomaly(_G.Enum.Anomaly.StarsVisible)
            _G.ResetAnomaly(_G.Enum.Anomaly.SkyColor)
        }
    },
    {
        name: "§8БЕЗ ЗВЁЗД",
        duration: 100,
        apply: function(){
            _G.ApplyAnomaly(_G.Enum.Anomaly.StarsVisible, false)
        },
        reset: function(){
            _G.ResetAnomaly(_G.Enum.Anomaly.StarsVisible)
        }
    },
    {
        name: "§5МЕРЦАНИЕ",
        duration: 60,
        apply: function(){
            var self = this
            var interval = setInterval(function(){
                if(activeGlitch !== self.name){
                    clearInterval(interval)
                    return
                }
                _G.ApplyAnomaly(_G.Enum.Anomaly.StarsVisible, Math.random() < 0.5)
            }, 1000)
            this.interval = interval
        },
        reset: function(){
            if(this.interval) clearInterval(this.interval)
            _G.ResetAnomaly(_G.Enum.Anomaly.StarsVisible)
        }
    }
]

var ALL_EFFECTS = []
    .concat(VISUAL_EFFECTS)
    .concat(SCREEN_SHAKE_EFFECTS)
    .concat(CELESTIAL_EFFECTS)
    .concat(CLOUD_EFFECTS)
    .concat(STAR_EFFECTS)

// ========== ЗАПУСК СЛУЧАЙНОГО ЭФФЕКТА ==========

function TriggerRandomVisualEffect(){
    if(activeGlitch !== null) return

    var effect = ALL_EFFECTS[Math.floor(Math.random() * ALL_EFFECTS.length)]
    activeGlitch = effect.name
    glitchDuration = effect.duration

    _G.Logger.Info("§d[Эффект] " + effect.name)
    effect.apply()

    setTimeout(function(){
        if(activeGlitch === effect.name){
            effect.reset()
            activeGlitch = null
            _G.Logger.Info("§7[Эффект] " + effect.name + " §7закончился")
        }
    }, effect.duration * 50)
}

// ========== СТРУКТУРЫ ==========

function GenerateSurvivalHut(x, z){
    for(var ix = -3; ix <= 3; ix++){
        for(var iz = -3; iz <= 3; iz++){
            _G.World.SetBlock(x + ix, WORLD_Y, z + iz, "oak_planks")
        }
    }
    for(var h = 1; h <= 4; h++){
        _G.World.SetBlock(x - 3, WORLD_Y + h, z - 3, "oak_log")
        _G.World.SetBlock(x - 3, WORLD_Y + h, z + 3, "oak_log")
        _G.World.SetBlock(x + 3, WORLD_Y + h, z - 3, "oak_log")
        _G.World.SetBlock(x + 3, WORLD_Y + h, z + 3, "oak_log")
    }
    for(var iy = 1; iy <= 3; iy++){
        _G.World.SetBlock(x, WORLD_Y + iy, z, "crafting_table")
    }
    _G.World.SetBlock(x + 1, WORLD_Y + 1, z, "furnace")
    _G.World.SetBlock(x - 1, WORLD_Y + 1, z, "chest")
    _G.World.SetBlock(x, WORLD_Y + 4, z, "torch")
    _G.World.SetBlock(x + 1, WORLD_Y + 2, z, "bed")
    _G.World.SetBlock(x + 1, WORLD_Y + 2, z + 1, "bed")
}

function GenerateOreVein(x, z){
    var ores = ["coal_ore", "iron_ore", "gold_ore", "diamond_ore", "emerald_ore", "copper_ore", "lapis_ore"]
    var ore = ores[Math.floor(Math.random() * ores.length)]
    for(var ix = -4; ix <= 4; ix++){
        for(var iz = -4; iz <= 4; iz++){
            if(Math.random() < 0.3){
                _G.World.SetBlock(x + ix, WORLD_Y, z + iz, ore)
                if(Math.random() < 0.2){
                    _G.World.SetBlock(x + ix, WORLD_Y + 1, z + iz, ore)
                }
            }
        }
    }
}

function GenerateTreeCluster(x, z){
    for(var t = 0; t < 8; t++){
        var tx = x + Math.floor((Math.random() - 0.5) * 15)
        var tz = z + Math.floor((Math.random() - 0.5) * 15)
        for(var h = 1; h <= 5; h++){
            _G.World.SetBlock(tx, WORLD_Y + h, tz, "oak_log")
        }
        for(var lx = -1; lx <= 1; lx++){
            for(var lz = -1; lz <= 1; lz++){
                _G.World.SetBlock(tx + lx, WORLD_Y + 5, tz + lz, "oak_leaves")
            }
        }
        _G.World.SetBlock(tx, WORLD_Y + 6, tz, "oak_leaves")
    }
}

function GeneratePond(x, z){
    for(var ix = -5; ix <= 5; ix++){
        for(var iz = -5; iz <= 5; iz++){
            if(ix*ix + iz*iz <= 25){
                _G.World.SetBlock(x + ix, WORLD_Y, z + iz, "water")
                if(Math.random() < 0.3){
                    _G.World.SetBlock(x + ix, WORLD_Y + 1, z + iz, "lily_pad")
                }
            }
        }
    }
}

// ========== ГЕНЕРАЦИЯ МИРА ==========

function GenerateWorld(){
    structures = []
    _G.Logger.Info("§2========== ГЕНЕРАЦИЯ МИРА ==========")

    var total = 0
    var radius = 600

    for(var dist = 100; dist <= radius; dist += 80){
        var count = Math.floor(dist / 40) + 1
        for(var i = 0; i < count; i++){
            var angle = Math.random() * Math.PI * 2
            var x = Math.cos(angle) * (dist + Math.random() * 40)
            var z = Math.sin(angle) * (dist + Math.random() * 40)

            var type = Math.floor(Math.random() * 4)
            var name = ""

            if(type === 0){
                GenerateSurvivalHut(Math.floor(x), Math.floor(z))
                name = "Хижина"
            } else if(type === 1){
                GenerateOreVein(Math.floor(x), Math.floor(z))
                name = "Рудная жила"
            } else if(type === 2){
                GenerateTreeCluster(Math.floor(x), Math.floor(z))
                name = "Лес"
            } else {
                GeneratePond(Math.floor(x), Math.floor(z))
                name = "Пруд"
            }

            structures.push({x: Math.floor(x), z: Math.floor(z), name: name, notified: false})
            total++
        }
    }

    _G.Logger.Info("§aСгенерировано структур: " + total)
    _G.Logger.Info("§7Радиус: " + radius + " | Высота: " + WORLD_Y)
    return total
}

// ========== ОСНОВНОЙ ЦИКЛ ==========
var tickCounter = 0
var effectCooldown = 0

_G.SetEvent(_G.Enum.Event.ClientTick, function(End){
    if(!End) return

    tickCounter++

    // Эффекты каждые 10-20 секунд
    if(tickCounter % 100 === 0 && activeGlitch === null){
        if(Math.random() < 0.35){
            TriggerRandomVisualEffect()
        }
    }

    // Пульсация неба (лёгкий эффект всегда)
    if(tickCounter % 20 === 0 && activeGlitch === null){
        var pulse = (Math.sin(tickCounter / 40) + 1) / 2 * 0.1
        _G.ApplyAnomaly(_G.Enum.Anomaly.SkyColor, 0.5 + pulse, 0.4 + pulse * 0.5, 0.6 + pulse)
        setTimeout(function(){
            if(activeGlitch === null){
                _G.ResetAnomaly(_G.Enum.Anomaly.SkyColor)
            }
        }, 100)
    }
})

// Серверные ивенты
var eventCounter = 0

_G.SetEvent(_G.Enum.Event.ServerTick, function(End){
    if(!End) return

    eventCounter++

    // Серверные ивенты каждые 30-60 секунд
    if(eventCounter % 400 === 0){
        var serverEvent = Math.floor(Math.random() * 4)
        if(serverEvent === 0){
            var x = (Math.random() - 0.5) * 400
            var z = (Math.random() - 0.5) * 400
            GenerateOreVein(Math.floor(x), Math.floor(z))
            _G.Logger.Info("§7[Мир] Новая рудная жила появилась!")
        } else if(serverEvent === 1){
            var x = (Math.random() - 0.5) * 400
            var z = (Math.random() - 0.5) * 400
            GenerateTreeCluster(Math.floor(x), Math.floor(z))
            _G.Logger.Info("§7[Мир] Выросла новая роща!")
        } else if(serverEvent === 2){
            var x = (Math.random() - 0.5) * 400
            var z = (Math.random() - 0.5) * 400
            GeneratePond(Math.floor(x), Math.floor(z))
            _G.Logger.Info("§7[Мир] Образовался новый пруд!")
        } else if(serverEvent === 3){
            _G.Logger.Info("§7[Мир] Тишина... ничего не произошло")
        }
    }
})

// Оповещения для игроков
var checkTimer = 0

_G.SetEvent(_G.Enum.Event.ServerTick, function(End){
    if(!End) return

    checkTimer++
    if(checkTimer < 100) return
    checkTimer = 0

    for(var s = 0; s < structures.length; s++){
        var struct = structures[s]
        var dist = Math.sqrt(struct.x * struct.x + struct.z * struct.z)

        if(dist < 60 && !struct.notified){
            _G.Logger.Info("§eТы обнаружил: §6" + struct.name + "§e на расстоянии " + Math.floor(dist))
            struct.notified = true
        }
    }
})

// ========== КОМАНДЫ ==========

_G.GenerateWorld = function(){
    var count = GenerateWorld()
    _G.Logger.Info("§aГотово! " + count + " структур для исследования")
    _G.Logger.Info("§7Используй _G.Effect() для случайного визуального эффекта")
}

_G.Effect = function(){
    TriggerRandomVisualEffect()
}

_G.ListEffects = function(){
    _G.Logger.Info("§6Доступные визуальные эффекты (" + ALL_EFFECTS.length + "):")
    for(var i = 0; i < Math.min(20, ALL_EFFECTS.length); i++){
        _G.Logger.Info("  §7- " + ALL_EFFECTS[i].name)
    }
}

_G.StopEffect = function(){
    if(activeGlitch !== null){
        for(var i = 0; i < ALL_EFFECTS.length; i++){
            if(ALL_EFFECTS[i].name === activeGlitch){
                ALL_EFFECTS[i].reset()
                break
            }
        }
        _G.Logger.Info("§7Эффект '" + activeGlitch + "' принудительно остановлен")
        activeGlitch = null
    } else {
        _G.Logger.Info("§7Нет активных эффектов")
    }
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========
_G.SetEvent(_G.Enum.Event.JSReload, function(End){
    if(End){
        if(activeGlitch !== null){
            for(var i = 0; i < ALL_EFFECTS.length; i++){
                if(ALL_EFFECTS[i].name === activeGlitch){
                    ALL_EFFECTS[i].reset()
                    break
                }
            }
        }
        _G.ResetAnomaly(_G.Enum.Anomaly.SkyColor)
        _G.ResetAnomaly(_G.Enum.Anomaly.BufferBuilderVertexOffset)
        _G.ResetAnomaly(_G.Enum.Anomaly.BufferBuilderVertexRandom)
        _G.ResetAnomaly(_G.Enum.Anomaly.SunSize)
        _G.ResetAnomaly(_G.Enum.Anomaly.MoonSize)
        _G.ResetAnomaly(_G.Enum.Anomaly.CloudSpeed)
        _G.ResetAnomaly(_G.Enum.Anomaly.CloudHeight)
        _G.ResetAnomaly(_G.Enum.Anomaly.CloudSize)
        _G.ResetAnomaly(_G.Enum.Anomaly.StarsVisible)
        _G.Logger.Info("§8=== ГЛЮКИ РЕАЛЬНОСТИ ВЫГРУЖЕНЫ ===")
    } else {
        _G.Logger.Info("§5§l=== ГЛЮКИ РЕАЛЬНОСТИ ===")
        _G.Logger.Info("§7Визуальные эффекты каждые 10-20 секунд")
        _G.Logger.Info("§aКоманды:")
        _G.Logger.Info("  §e_G.GenerateWorld() §7- генерация мира")
        _G.Logger.Info("  §e_G.Effect() §7- случайный эффект")
        _G.Logger.Info("  §e_G.ListEffects() §7- список эффектов")
        _G.Logger.Info("  §e_G.StopEffect() §7- остановить эффект")
    }
})

_G.Logger.Info("§5=== ГЛЮКИ РЕАЛЬНОСТИ ЗАГРУЖЕНЫ ===")
_G.Logger.Info("§7Введите §e_G.GenerateWorld() §7для начала")