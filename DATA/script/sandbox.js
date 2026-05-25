// ============================================================
// HORROR CORE SCRIPT
// Weird world events / glitches / structures
// ============================================================

_G.Logger.Anyway("Horror script loaded.");

// ------------------------------------------------------------
// CONFIG
// ------------------------------------------------------------

const CENTER_X = 0;
const CENTER_Y = -2;
const CENTER_Z = 0;

const EVENTS_MIN_DELAY = 20 * 25; // ~25 sec
const EVENTS_MAX_DELAY = 20 * 70; // ~70 sec

let Tick = 0;
let NextEvent = RandomRange(EVENTS_MIN_DELAY, EVENTS_MAX_DELAY);

// ------------------------------------------------------------
// UTILS
// ------------------------------------------------------------

function RandomRange(Min, Max){
    return Math.floor(Math.random() * (Max - Min + 1)) + Min;
}

function Chance(Value){
    return Math.random() <= Value;
}

function RandomFloat(Min, Max){
    return Math.random() * (Max - Min) + Min;
}

function Log(Message){
    _G.Logger.Info("[HORROR] " + Message);
}

// ------------------------------------------------------------
// STRUCTURE GENERATION
// ------------------------------------------------------------

function GenerateCross(X, Y, Z){
    let B = "minecraft:black_concrete";

    for(let i = -4; i <= 4; i++){
        _G.World.SetBlock(X, Y + i, Z, B);
    }

    for(let i = -2; i <= 2; i++){
        _G.World.SetBlock(X + i, Y + 1, Z, B);
    }
}

function GenerateCube(X, Y, Z){
    let B = "minecraft:redstone_block";

    for(let xx = -2; xx <= 2; xx++){
        for(let yy = -2; yy <= 2; yy++){
            for(let zz = -2; zz <= 2; zz++){

                let Edge =
                    Math.abs(xx) == 2 ||
                    Math.abs(yy) == 2 ||
                    Math.abs(zz) == 2;

                if(Edge){
                    _G.World.SetBlock(X + xx, Y + yy, Z + zz, B);
                }
            }
        }
    }
}

function GeneratePillarField(X, Y, Z){
    let B = "minecraft:stone";

    for(let xx = -8; xx <= 8; xx += 4){
        for(let zz = -8; zz <= 8; zz += 4){

            let Height = RandomRange(3, 12);

            for(let yy = 0; yy < Height; yy++){
                _G.World.SetBlock(X + xx, Y + yy, Z + zz, B);
            }
        }
    }
}

function GenerateEye(X, Y, Z){

    let White = "minecraft:white_concrete";
    let Black = "minecraft:black_concrete";
    let Red   = "minecraft:red_concrete";

    for(let xx = -5; xx <= 5; xx++){
        for(let zz = -2; zz <= 2; zz++){

            let Dist =
                (xx * xx) / 25 +
                (zz * zz) / 4;

            if(Dist <= 1){
                _G.World.SetBlock(X + xx, Y, Z + zz, White);
            }
        }
    }

    for(let xx = -2; xx <= 2; xx++){
        for(let zz = -1; zz <= 1; zz++){
            _G.World.SetBlock(X + xx, Y, Z + zz, Red);
        }
    }

    _G.World.SetBlock(X, Y, Z, Black);
}

function GenerateRandomStructure(){

    let X = CENTER_X + RandomRange(-64, 64);
    let Y = CENTER_Y;
    let Z = CENTER_Z + RandomRange(-64, 64);

    let Type = RandomRange(0, 3);

    switch(Type){

        case 0:
            GenerateCross(X, Y, Z);
            Log("Black cross generated.");
            break;

        case 1:
            GenerateCube(X, Y, Z);
            Log("Hollow cube generated.");
            break;

        case 2:
            GeneratePillarField(X, Y, Z);
            Log("Pillar field generated.");
            break;

        case 3:
            GenerateEye(X, Y, Z);
            Log("Eye structure generated.");
            break;
    }
}

// ------------------------------------------------------------
// SCREEN GLITCHES
// ------------------------------------------------------------

function ApplyVisualGlitch(){

    // Дёрганные вершины
    _G.ApplyAnomaly(
        4,
        RandomFloat(0.0, 0.12),
        RandomFloat(0.0, 0.12),
        RandomFloat(0.0, 0.12)
    );

    // Смещение мира
    _G.ApplyAnomaly(
        3,
        RandomFloat(-0.05, 0.05),
        RandomFloat(-0.05, 0.05),
        RandomFloat(-0.05, 0.05)
    );

    // Иногда красное небо
    if(Chance(0.35)){
        _G.ApplyAnomaly(
            6,
            1.0,
            RandomFloat(0.0, 0.1),
            RandomFloat(0.0, 0.1)
        );
    }

    // Иногда убрать солнце
    if(Chance(0.3)){
        _G.ApplyAnomaly(8, false);
    }

    // Иногда скрыть луну
    if(Chance(0.2)){
        _G.ApplyAnomaly(11, false);
    }

    // Ускорить облака
    _G.ApplyAnomaly(
        0,
        RandomFloat(3.0, 20.0)
    );

    // Огромная луна
    if(Chance(0.25)){
        _G.ApplyAnomaly(
            10,
            RandomFloat(40, 200)
        );
    }

    // Огромное солнце
    if(Chance(0.25)){
        _G.ApplyAnomaly(
            7,
            RandomFloat(40, 200)
        );
    }

    Log("Visual glitch applied.");
}

function ResetVisualGlitches(){

    for(let i = 0; i <= 15; i++){
        _G.ResetAnomaly(i);
    }

    Log("Visual glitches reset.");
}

// ------------------------------------------------------------
// HORROR MESSAGES
// ------------------------------------------------------------

const Messages = [

    "DO NOT LOOK UP",
    "SOMETHING IS MOVING",
    "YOU WERE NOT SUPPOSED TO BE HERE",
    "THE SKY IS WRONG",
    "IT KNOWS YOUR LOCATION",
    "YOU ARE LATE",
    "TURN AROUND",
    "THE WORLD IS UNSTABLE",
    "THEY CAN SEE YOU",
    "ERROR IN REALITY",
    "STOP BUILDING",
    "DO NOT FOLLOW THE LIGHT",
    "YOU LEFT SOMETHING BEHIND",
    "THIS WORLD IS NOT EMPTY",
    "THE CENTER IS OPEN",
    "WAKE UP"
];

function RandomMessage(){

    return Messages[
        RandomRange(0, Messages.length - 1)
        ];
}

// ------------------------------------------------------------
// RANDOM EVENTS
// ------------------------------------------------------------

function RunRandomEvent(){

    let Type = RandomRange(0, 5);

    switch(Type){

        // Генерация структуры
        case 0:
            GenerateRandomStructure();
            break;

        // Визуальный глюк
        case 1:
            ApplyVisualGlitch();
            break;

        // Сброс глюков
        case 2:
            ResetVisualGlitches();
            break;

        // Сообщение
        case 3:
            _G.Logger.Anyway(RandomMessage());
            break;

        // END SKY
        case 4:

            _G.ApplyAnomaly(5, 2);

            if(Chance(0.5)){
                _G.ApplyAnomaly(
                    14,
                    _G.ResourceLocation(
                        "minecraft",
                        "textures/environment/end_sky.png"
                    )
                );
            }

            Log("End sky event.");
            break;

        // Огромные облака
        case 5:

            _G.ApplyAnomaly(
                1,
                RandomFloat(20, 80),
                RandomFloat(2, 10),
                RandomFloat(20, 80)
            );

            _G.ApplyAnomaly(
                2,
                RandomFloat(-20, 250)
            );

            Log("Cloud distortion.");
            break;
    }
}

// ------------------------------------------------------------
// EVENTS
// ------------------------------------------------------------

_G.SetEvent(3, function(){

    Log("Server initialized.");
    GenerateRandomStructure();
});

_G.SetEvent(2, function(End){

    if(End){ return; }

    Tick++;

    if(Tick >= NextEvent){

        Tick = 0;
        NextEvent = RandomRange(
            EVENTS_MIN_DELAY,
            EVENTS_MAX_DELAY
        );

        RunRandomEvent();
    }
});

// ------------------------------------------------------------
// KEY EVENTS
// ------------------------------------------------------------

_G.SetEvent(4, function(Key){

    let Name = _G.KeyName(Key);

    // F6 = forced glitch
    if(Name == "F6"){

        ApplyVisualGlitch();
        _G.Logger.Anyway("MANUAL GLITCH");
    }

    // F7 = forced structure
    if(Name == "F7"){

        GenerateRandomStructure();
        _G.Logger.Anyway("STRUCTURE GENERATED");
    }

    // F8 = reset
    if(Name == "F8"){

        ResetVisualGlitches();
        _G.Logger.Anyway("RESET");
    }
});

// ------------------------------------------------------------
// ERROR EVENT
// ------------------------------------------------------------

_G.SetEvent(10, function(Message){

    _G.Logger.Error(
        "SCRIPT ERROR DETECTED: " + Message
    );
});

// ------------------------------------------------------------

_G.Logger.Anyway("Horror system started.");
