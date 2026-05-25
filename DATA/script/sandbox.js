// ========== ЖИВОЙ МИР ==========
// Высота мира: 0 | Для двух игроков
// Частые ивенты и постоянная активность

// ========== НАСТРОЙКИ ==========
var WORLD_Y = 0
var EVENT_TIMER = 0
var ACTIVE_EVENT = null
var EVENT_DURATION = 0
var structures = []

// ========== СПИСОК ИВЕНТОВ ==========
var EVENTS = [
    {
        name: "§cКРОВАВЫЙ ДОЖДЬ",
        chance: 0.15,
        duration: 300,
        action: function(){
            for(var i = 0; i < 50; i++){
                var x = (Math.random() - 0.5) * 200
                var z = (Math.random() - 0.5) * 200
                _G.World.SetBlock(Math.floor(x), WORLD_Y + Math.floor(Math.random() * 10), Math.floor(z), "redstone_block")
            }
        },
        message: "§cНебо плачет кровавыми слезами!"
    },
    {
        name: "§2ЛЕСНОЕ ПРОБУЖДЕНИЕ",
        chance: 0.12,
        duration: 400,
        action: function(){
            for(var i = 0; i < 80; i++){
                var x = (Math.random() - 0.5) * 250
                var z = (Math.random() - 0.5) * 250
                _G.World.SetBlock(Math.floor(x), WORLD_Y + 1, Math.floor(z), "oak_leaves")
                _G.World.SetBlock(Math.floor(x), WORLD_Y + 2, Math.floor(z), "oak_log")
                _G.World.SetBlock(Math.floor(x), WORLD_Y + 3, Math.floor(z), "oak_leaves")
            }
        },
        message: "§2Из земли вырастают древние деревья!"
    },
    {
        name: "§5МИСТИЧЕСКИЙ ТУМАН",
        chance: 0.18,
        duration: 250,
        action: function(){
            for(var i = 0; i < 150; i++){
                var x = (Math.random() - 0.5) * 300
                var z = (Math.random() - 0.5) * 300
                _G.World.SetBlock(Math.floor(x), WORLD_Y, Math.floor(z), "cobweb")
            }
        },
        message: "§5Густой туман окутывает землю!"
    },
    {
        name: "§eЗОЛОТАЯ ЛИХОРАДКА",
        chance: 0.1,
        duration: 350,
        action: function(){
            for(var i = 0; i < 60; i++){
                var x = (Math.random() - 0.5) * 200
                var z = (Math.random() - 0.5) * 200
                _G.World.SetBlock(Math.floor(x), WORLD_Y + 1, Math.floor(z), "gold_block")
                _G.World.SetBlock(Math.floor(x), WORLD_Y + 2, Math.floor(z), "gold_ore")
            }
        },
        message: "§eЗемля начинает светиться золотом!"
    },
    {
        name: "§8ПРОБУЖДЕНИЕ СТРАЖЕЙ",
        chance: 0.08,
        duration: 500,
        action: function(){
            for(var i = 0; i < 20; i++){
                var x = (Math.random() - 0.5) * 300
                var z = (Math.random() - 0.5) * 300
                for(var h = 0; h < 3; h++){
                    _G.World.SetBlock(Math.floor(x), WORLD_Y + 1 + h, Math.floor(z), "iron_block")
                }
                _G.World.SetBlock(Math.floor(x), WORLD_Y + 4, Math.floor(z), "carved_pumpkin")
            }
        },
        message: "§8Каменные стражи оживают!"
    },
    {
        name: "§bЛЕДЯНОЕ ДЫХАНИЕ",
        chance: 0.14,
        duration: 280,
        action: function(){
            for(var i = 0; i < 100; i++){
                var x = (Math.random() - 0.5) * 250
                var z = (Math.random() - 0.5) * 250
                _G.World.SetBlock(Math.floor(x), WORLD_Y, Math.floor(z), "ice")
                _G.World.SetBlock(Math.floor(x), WORLD_Y + 1, Math.floor(z), "snow_block")
            }
        },
        message: "§bМир покрывается льдом и снегом!"
    },
    {
        name: "§4ПЛОТЯНОЙ КОВЁР",
        chance: 0.11,
        duration: 320,
        action: function(){
            for(var i = 0; i < 120; i++){
                var x = (Math.random() - 0.5) * 280
                var z = (Math.random() - 0.5) * 280
                var block = Math.random() < 0.5 ? "nether_wart_block" : "crimson_hyphae"
                _G.World.SetBlock(Math.floor(x), WORLD_Y, Math.floor(z), block)
            }
        },
        message: "§4Земля покрывается пульсирующей плотью!"
    },
    {
        name: "§dСВЕТЯЩИЙСЯ ДОЖДЬ",
        chance: 0.13,
        duration: 300,
        action: function(){
            for(var i = 0; i < 80; i++){
                var x = (Math.random() - 0.5) * 200
                var z = (Math.random() - 0.5) * 200
                _G.World.SetBlock(Math.floor(x), WORLD_Y + Math.floor(Math.random() * 5), Math.floor(z), "glowstone")
            }
        },
        message: "§dС неба падают светящиеся кристаллы!"
    },
    {
        name: "§3ВОДНЫЙ ПОТОП",
        chance: 0.09,
        duration: 400,
        action: function(){
            for(var i = 0; i < 200; i++){
                var x = (Math.random() - 0.5) * 350
                var z = (Math.random() - 0.5) * 350
                _G.World.SetBlock(Math.floor(x), WORLD_Y, Math.floor(z), "water")
            }
        },
        message: "§3Вода поднимается из глубин!"
    },
    {
        name: "§6ДРЕВНИЙ ГНЕВ",
        chance: 0.07,
        duration: 450,
        action: function(){
            for(var i = 0; i < 40; i++){
                var x = (Math.random() - 0.5) * 250
                var z = (Math.random() - 0.5) * 250
                for(var r = -2; r <= 2; r++){
                    for(var c = -2; c <= 2; c++){
                        _G.World.SetBlock(Math.floor(x) + r, WORLD_Y + 1, Math.floor(z) + c, "obsidian")
                    }
                }
                _G.World.SetBlock(Math.floor(x), WORLD_Y + 2, Math.floor(z), "nether_star")
            }
        },
        message: "§6Древние силы извергаются из земли!"
    }
]

// ========== БЫСТРЫЕ МАЛЫЕ ИВЕНТЫ ==========
var MINI_EVENTS = [
    {
        name: "§7Камень падает с неба!",
        action: function(){
            var x = (Math.random() - 0.5) * 100
            var z = (Math.random() - 0.5) * 100
            _G.World.SetBlock(Math.floor(x), WORLD_Y + 5, Math.floor(z), "anvil")
        }
    },
    {
        name: "§aТрава разрастается!",
        action: function(){
            for(var i = 0; i < 20; i++){
                var x = (Math.random() - 0.5) * 80
                var z = (Math.random() - 0.5) * 80
                _G.World.SetBlock(Math.floor(x), WORLD_Y + 1, Math.floor(z), "grass_block")
                _G.World.SetBlock(Math.floor(x), WORLD_Y + 2, Math.floor(z), "tall_grass")
            }
        }
    },
    {
        name: "§3Маленький водопад!",
        action: function(){
            var x = (Math.random() - 0.5) * 90
            var z = (Math.random() - 0.5) * 90
            for(var h = 0; h < 5; h++){
                _G.World.SetBlock(Math.floor(x), WORLD_Y + h, Math.floor(z), "water")
            }
        }
    },
    {
        name: "§eСпавн моба!",
        action: function(){
            for(var i = 0; i < 5; i++){
                var x = (Math.random() - 0.5) * 70
                var z = (Math.random() - 0.5) * 70
                _G.World.SetBlock(Math.floor(x), WORLD_Y + 1, Math.floor(z), "spawner")
            }
        }
    },
    {
        name: "§cВулканический выброс!",
        action: function(){
            var x = (Math.random() - 0.5) * 100
            var z = (Math.random() - 0.5) * 100
            for(var r = -2; r <= 2; r++){
                for(var c = -2; c <= 2; c++){
                    if(Math.abs(r) === 2 || Math.abs(c) === 2){
                        _G.World.SetBlock(Math.floor(x) + r, WORLD_Y + 1, Math.floor(z) + c, "magma_block")
                    }
                }
            }
            _G.World.SetBlock(Math.floor(x), WORLD_Y + 2, Math.floor(z), "lava")
        }
    },
    {
        name: "§8Тёмный всплеск!",
        action: function(){
            var x = (Math.random() - 0.5) * 80
            var z = (Math.random() - 0.5) * 80
            for(var r = -3; r <= 3; r++){
                for(var c = -3; c <= 3; c++){
                    if(Math.random() < 0.3){
                        _G.World.SetBlock(Math.floor(x) + r, WORLD_Y, Math.floor(z) + c, "blackstone")
                    }
                }
            }
        }
    },
    {
        name: "§5Мистический цветок!",
        action: function(){
            var x = (Math.random() - 0.5) * 60
            var z = (Math.random() - 0.5) * 60
            for(var i = 0; i < 10; i++){
                _G.World.SetBlock(Math.floor(x) + Math.floor((Math.random() - 0.5) * 10), WORLD_Y + 1, Math.floor(z) + Math.floor((Math.random() - 0.5) * 10), "allium")
            }
        }
    },
    {
        name: "§2Корни прорываются!",
        action: function(){
            var x = (Math.random() - 0.5) * 70
            var z = (Math.random() - 0.5) * 70
            for(var i = 0; i < 15; i++){
                var dx = Math.floor((Math.random() - 0.5) * 15)
                var dz = Math.floor((Math.random() - 0.5) * 15)
                _G.World.SetBlock(Math.floor(x) + dx, WORLD_Y + 1, Math.floor(z) + dz, "oak_log")
            }
        }
    }
]

// ========== СТРУКТУРЫ ДЛЯ ВЫЖИВАНИЯ ==========

function GenerateSurvivalHut(x, z){
    for(var ix = -2; ix <= 2; ix++){
        for(var iz = -2; iz <= 2; iz++){
            _G.World.SetBlock(x + ix, WORLD_Y, z + iz, "oak_planks")
        }
    }
    for(var h = 1; h <= 3; h++){
        _G.World.SetBlock(x - 2, WORLD_Y + h, z - 2, "oak_log")
        _G.World.SetBlock(x - 2, WORLD_Y + h, z + 2, "oak_log")
        _G.World.SetBlock(x + 2, WORLD_Y + h, z - 2, "oak_log")
        _G.World.SetBlock(x + 2, WORLD_Y + h, z + 2, "oak_log")
    }
    for(var iy = 1; iy <= 2; iy++){
        _G.World.SetBlock(x, WORLD_Y + iy, z, "crafting_table")
    }
    _G.World.SetBlock(x + 1, WORLD_Y + 1, z, "furnace")
    _G.World.SetBlock(x - 1, WORLD_Y + 1, z, "chest")
    _G.World.SetBlock(x, WORLD_Y + 3, z, "torch")
}

function GenerateOreVein(x, z){
    var ores = ["coal_ore", "iron_ore", "gold_ore", "diamond_ore", "emerald_ore"]
    var ore = ores[Math.floor(Math.random() * ores.length)]
    for(var ix = -3; ix <= 3; ix++){
        for(var iz = -3; iz <= 3; iz++){
            if(Math.random() < 0.4){
                _G.World.SetBlock(x + ix, WORLD_Y, z + iz, ore)
                if(Math.random() < 0.3){
                    _G.World.SetBlock(x + ix, WORLD_Y + 1, z + iz, ore)
                }
            }
        }
    }
}

function GeneratePond(x, z){
    var radius = 3 + Math.floor(Math.random() * 3)
    for(var ix = -radius; ix <= radius; ix++){
        for(var iz = -radius; iz <= radius; iz++){
            if(ix*ix + iz*iz <= radius*radius){
                _G.World.SetBlock(x + ix, WORLD_Y, z + iz, "water")
                _G.World.SetBlock(x + ix, WORLD_Y - 1, z + iz, "clay")
            }
        }
    }
    for(var f = 0; f < 5; f++){
        var fx = x + Math.floor((Math.random() - 0.5) * radius)
        var fz = z + Math.floor((Math.random() - 0.5) * radius)
        _G.World.SetBlock(fx, WORLD_Y + 1, fz, "lily_pad")
    }
}

function GenerateTreeCluster(x, z){
    for(var t = 0; t < 5; t++){
        var tx = x + Math.floor((Math.random() - 0.5) * 10)
        var tz = z + Math.floor((Math.random() - 0.5) * 10)
        for(var h = 1; h <= 4; h++){
            _G.World.SetBlock(tx, WORLD_Y + h, tz, "oak_log")
        }
        _G.World.SetBlock(tx, WORLD_Y + 5, tz, "oak_leaves")
        _G.World.SetBlock(tx + 1, WORLD_Y + 4, tz, "oak_leaves")
        _G.World.SetBlock(tx - 1, WORLD_Y + 4, tz, "oak_leaves")
        _G.World.SetBlock(tx, WORLD_Y + 4, tz + 1, "oak_leaves")
        _G.World.SetBlock(tx, WORLD_Y + 4, tz - 1, "oak_leaves")
    }
}

// ========== ГЕНЕРАЦИЯ МИРА ==========

function GenerateWorld(){
    structures = []
    _G.Logger.Info("§2========== ГЕНЕРАЦИЯ МИРА ==========")

    var totalStructures = 0
    var radius = 500

    // Храмы и крупные структуры
    var templeTypes = [
        {name: "Каменный Храм", func: function(x,z){ GenerateSurvivalHut(x,z); for(var i=0;i<3;i++) GenerateOreVein(x+5,z+5); }},
        {name: "Рудная Жила", func: function(x,z){ for(var i=0;i<5;i++) GenerateOreVein(x+Math.random()*10-5, z+Math.random()*10-5); }},
        {name: "Лесной Оазис", func: function(x,z){ GeneratePond(x,z); GenerateTreeCluster(x,z); }},
        {name: "Заброшенная Шахта", func: function(x,z){ for(var i=0;i<8;i++){ var sx=x+Math.random()*20-10; var sz=z+Math.random()*20-10; _G.World.SetBlock(Math.floor(sx), WORLD_Y+1, Math.floor(sz), "rail"); } }}
    ]

    for(var angle = 0; angle < 360; angle += 45){
        var rad = angle * Math.PI / 180
        var dist = 150
        var x = Math.cos(rad) * dist
        var z = Math.sin(rad) * dist

        var type = templeTypes[Math.floor(Math.random() * templeTypes.length)]
        type.func(Math.floor(x), Math.floor(z))
        structures.push({x: Math.floor(x), z: Math.floor(z), name: type.name})
        totalStructures++
    }

    for(var dist = 200; dist <= radius; dist += 100){
        var count = Math.floor(dist / 50)
        for(var i = 0; i < count; i++){
            var angle = Math.random() * Math.PI * 2
            var x = Math.cos(angle) * (dist + Math.random() * 50)
            var z = Math.sin(angle) * (dist + Math.random() * 50)

            var type = templeTypes[Math.floor(Math.random() * templeTypes.length)]
            type.func(Math.floor(x), Math.floor(z))
            structures.push({x: Math.floor(x), z: Math.floor(z), name: type.name})
            totalStructures++
        }
    }

    _G.Logger.Info("§aСгенерировано структур: " + totalStructures)
    _G.Logger.Info("§7Радиус мира: " + radius + " блоков")
    _G.Logger.Info("§7Высота: " + WORLD_Y)

    return totalStructures
}

// ========== ЗАПУСК ИВЕНТОВ ==========

function TriggerRandomEvent(){
    if(ACTIVE_EVENT !== null) return

    var roll = Math.random()
    var cumulative = 0

    for(var i = 0; i < EVENTS.length; i++){
        cumulative += EVENTS[i].chance
        if(roll < cumulative){
            ACTIVE_EVENT = EVENTS[i]
            EVENT_DURATION = ACTIVE_EVENT.duration
            _G.Logger.Info("§l§m====================§r")
            _G.Logger.Info(ACTIVE_EVENT.name)
            _G.Logger.Info(ACTIVE_EVENT.message)
            _G.Logger.Info("§l§m====================§r")
            ACTIVE_EVENT.action()
            break
        }
    }
}

function TriggerMiniEvent(){
    var event = MINI_EVENTS[Math.floor(Math.random() * MINI_EVENTS.length)]
    _G.Logger.Info("§7[Событие] " + event.name)
    event.action()
}

// ========== ОСНОВНОЙ ЦИКЛ ==========
var tick = 0
var miniEventCooldown = 0

_G.SetEvent(_G.Enum.Event.ServerTick, function(End){
    if(!End) return

    tick++
    EVENT_TIMER++
    miniEventCooldown++

    // Крупные ивенты (каждые 15-30 секунд)
    if(EVENT_TIMER >= 300 && ACTIVE_EVENT === null){
        EVENT_TIMER = 0
        if(Math.random() < 0.4){
            TriggerRandomEvent()
        }
    }

    // Завершение активного ивента
    if(ACTIVE_EVENT !== null){
        if(EVENT_TIMER >= EVENT_DURATION){
            _G.Logger.Info("§8Ивент '" + ACTIVE_EVENT.name.replace(/§[0-9a-z]/gi, '') + "' завершился...")
            ACTIVE_EVENT = null
            EVENT_TIMER = 0
        }
    }

    // Малые ивенты (каждые 5-10 секунд)
    if(miniEventCooldown >= 80 && ACTIVE_EVENT === null){
        miniEventCooldown = 0
        if(Math.random() < 0.5){
            TriggerMiniEvent()
        }
    }

    // Случайные генерации (каждые 3-5 секунд)
    if(tick % 60 === 0 && Math.random() < 0.3){
        var x = (Math.random() - 0.5) * 400
        var z = (Math.random() - 0.5) * 400
        var genType = Math.floor(Math.random() * 4)
        if(genType === 0) GenerateOreVein(Math.floor(x), Math.floor(z))
        if(genType === 1) GenerateTreeCluster(Math.floor(x), Math.floor(z))
        if(genType === 2) GeneratePond(Math.floor(x), Math.floor(z))
        if(genType === 3) GenerateSurvivalHut(Math.floor(x), Math.floor(z))
    }
})

// ========== ОПОВЕЩЕНИЯ ДЛЯ ИГРОКОВ ==========
var lastCheck = 0

_G.SetEvent(_G.Enum.Event.ServerTick, function(End){
    if(!End) return

    lastCheck++
    if(lastCheck < 100) return
    lastCheck = 0

    // Игрок 1 (центр)
    for(var s = 0; s < structures.length; s++){
        var dist = Math.sqrt(structures[s].x * structures[s].x + structures[s].z * structures[s].z)
        if(dist < 80 && !structures[s].notified){
            _G.Logger.Info("§eТы нашёл: §6" + structures[s].name + "§e на расстоянии " + Math.floor(dist))
            structures[s].notified = true
        }
    }
})

// ========== КОМАНДЫ ==========

_G.GenerateWorld = function(){
    var count = GenerateWorld()
    _G.Logger.Info("§aГотово! Сгенерировано " + count + " структур")
    _G.Logger.Info("§7Для двух игроков | Центр: 0, " + WORLD_Y + ", 0")
}

_G.ListEvents = function(){
    _G.Logger.Info("§6Доступные ивенты:")
    for(var i = 0; i < EVENTS.length; i++){
        _G.Logger.Info("  §7- " + EVENTS[i].name.replace(/§[0-9a-z]/gi, '') + " (шанс: " + (EVENTS[i].chance * 100) + "%)")
    }
}

_G.ForceEvent = function(index){
    if(index >= 0 && index < EVENTS.length){
        if(ACTIVE_EVENT !== null){
            _G.Logger.Info("§cСейчас активен другой ивент!")
            return
        }
        ACTIVE_EVENT = EVENTS[index]
        EVENT_DURATION = ACTIVE_EVENT.duration
        EVENT_TIMER = 0
        _G.Logger.Info("§l§m====================§r")
        _G.Logger.Info(ACTIVE_EVENT.name)
        _G.Logger.Info(ACTIVE_EVENT.message)
        _G.Logger.Info("§l§m====================§r")
        ACTIVE_EVENT.action()
    } else {
        _G.Logger.Info("§cНеверный индекс! Используйте 0-" + (EVENTS.length-1))
    }
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========
_G.SetEvent(_G.Enum.Event.JSReload, function(End){
    if(End){
        _G.Logger.Info("§8=== ЖИВОЙ МИР ВЫГРУЖЕН ===")
    } else {
        _G.Logger.Info("§2§l=== ЖИВОЙ МИР ===")
        _G.Logger.Info("§7Высота: " + WORLD_Y)
        _G.Logger.Info("§7События происходят постоянно!")
        _G.Logger.Info("§aКоманды:")
        _G.Logger.Info("  §e_G.GenerateWorld() §7- генерация мира")
        _G.Logger.Info("  §e_G.ListEvents() §7- список ивентов")
        _G.Logger.Info("  §e_G.ForceEvent(индекс) §7- принудительный ивент")
    }
})

_G.Logger.Info("§2=== ЖИВОЙ МИР ЗАГРУЖЕН ===")
_G.Logger.Info("§7Введите §e_G.GenerateWorld() §7для начала")