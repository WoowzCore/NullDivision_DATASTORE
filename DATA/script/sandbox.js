// ============================================================
// GOLU HORROR SYSTEM
// Rhino-compatible
// ============================================================

_G.Logger.Anyway("SYSTEM ONLINE")

var CENTER_X = 0
var CENTER_Y = -2
var CENTER_Z = 0

var Tick = 0
var NextEvent = 600
var GlitchTick = 0

var Messages = [
    "DO NOT GO TO THE CENTER",
    "YOU ARE OBSERVED",
    "SOMETHING EXISTS BELOW",
    "THE SKY IS OPEN",
    "THE WORLD IS CORRUPTED",
    "ERROR DETECTED",
    "TURN OFF THE LIGHTS",
    "DO NOT TRUST THE MOON",
    "YOU SHOULD LEAVE",
    "THE FOG IS MOVING",
    "REALITY FAILURE",
    "IT FOUND YOU",
    "LOOK BEHIND YOU",
    "THE NOISE IS GETTING CLOSER",
    "YOU ARE NOT ALONE",
    "THEY ARE INSIDE"
]

function RandomRange(Min, Max){
    return Math.floor(Math.random() * (Max - Min + 1)) + Min
}

function Chance(Value){
    return Math.random() <= Value
}

function RandomFloat(Min, Max){
    return Math.random() * (Max - Min) + Min
}

function Log(Message){
    _G.Logger.Info("[HORROR] " + Message)
}

// ============================================================
// STRUCTURES
// ============================================================

function GenerateCross(X, Y, Z){

    var Block = "minecraft:black_concrete"

    for(var i = -8; i <= 8; i++){
        _G.World.SetBlock(X, Y + i, Z, Block)
    }

    for(var i = -4; i <= 4; i++){
        _G.World.SetBlock(X + i, Y + 2, Z, Block)
    }
}

function GenerateCube(X, Y, Z){

    var Block = "minecraft:redstone_block"

    for(var xx = -4; xx <= 4; xx++){
        for(var yy = -4; yy <= 4; yy++){
            for(var zz = -4; zz <= 4; zz++){

                var Edge =
                    Math.abs(xx) == 4 ||
                    Math.abs(yy) == 4 ||
                    Math.abs(zz) == 4

                if(Edge){
                    _G.World.SetBlock(X + xx, Y + yy, Z + zz, Block)
                }
            }
        }
    }
}

function GeneratePillars(X, Y, Z){

    var Block = "minecraft:stone"

    for(var xx = -16; xx <= 16; xx += 4){
        for(var zz = -16; zz <= 16; zz += 4){

            var Height = RandomRange(4, 20)

            for(var yy = 0; yy <= Height; yy++){
                _G.World.SetBlock(X + xx, Y + yy, Z + zz, Block)
            }
        }
    }
}

function GenerateEye(X, Y, Z){

    var White = "minecraft:white_concrete"
    var Red = "minecraft:red_concrete"
    var Black = "minecraft:black_concrete"

    for(var xx = -7; xx <= 7; xx++){
        for(var zz = -3; zz <= 3; zz++){

            var Dist =
                (xx * xx) / 49 +
                (zz * zz) / 9

            if(Dist <= 1){
                _G.World.SetBlock(X + xx, Y, Z + zz, White)
            }
        }
    }

    for(var xx = -2; xx <= 2; xx++){
        for(var zz = -1; zz <= 1; zz++){
            _G.World.SetBlock(X + xx, Y, Z + zz, Red)
        }
    }

    _G.World.SetBlock(X, Y, Z, Black)
}

function GenerateTunnel(X, Y, Z){

    var Block = "minecraft:black_concrete"

    for(var i = 0; i < 30; i++){

        _G.World.SetBlock(X + i, Y, Z, Block)
        _G.World.SetBlock(X + i, Y + 3, Z, Block)

        _G.World.SetBlock(X + i, Y + 1, Z + 1, Block)
        _G.World.SetBlock(X + i, Y + 1, Z - 1, Block)

        _G.World.SetBlock(X + i, Y + 2, Z + 1, Block)
        _G.World.SetBlock(X + i, Y + 2, Z - 1, Block)
    }
}

function GenerateRandomStructure(){

    var X = CENTER_X + RandomRange(-120, 120)
    var Y = CENTER_Y
    var Z = CENTER_Z + RandomRange(-120, 120)

    var Type = RandomRange(0, 4)

    if(Type == 0){
        GenerateCross(X, Y, Z)
        Log("Cross generated")
    }

    if(Type == 1){
        GenerateCube(X, Y, Z)
        Log("Cube generated")
    }

    if(Type == 2){
        GeneratePillars(X, Y, Z)
        Log("Pillars generated")
    }

    if(Type == 3){
        GenerateEye(X, Y, Z)
        Log("Eye generated")
    }

    if(Type == 4){
        GenerateTunnel(X, Y, Z)
        Log("Tunnel generated")
    }
}

// ============================================================
// GLITCHES
// ============================================================

function GlitchSmall(){

    _G.ApplyAnomaly(
        _G.Enum.Anomaly.BufferBuilderVertexRandom,
        0.05,
        0.05,
        0
    )

    _G.ApplyAnomaly(
        _G.Enum.Anomaly.BufferBuilderVertexOffset,
        RandomFloat(-0.05, 0.05),
        RandomFloat(-0.05, 0.05),
        0
    )
}

function GlitchHeavy(){

    _G.ApplyAnomaly(
        _G.Enum.Anomaly.BufferBuilderVertexRandom,
        0.2,
        0.2,
        0.2
    )

    _G.ApplyAnomaly(
        _G.Enum.Anomaly.CloudSpeed,
        RandomFloat(10, 40)
    )

    _G.ApplyAnomaly(
        _G.Enum.Anomaly.CloudHeight,
        RandomFloat(-40, 200)
    )

    _G.ApplyAnomaly(
        _G.Enum.Anomaly.CloudSize,
        RandomFloat(20, 120),
        RandomFloat(1, 10),
        RandomFloat(20, 120)
    )

    if(Chance(0.5)){

        _G.ApplyAnomaly(
            _G.Enum.Anomaly.SkyColor,
            1,
            0,
            0
        )
    }

    if(Chance(0.3)){
        _G.ApplyAnomaly(
            _G.Enum.Anomaly.SunVisible,
            false
        )
    }

    if(Chance(0.3)){
        _G.ApplyAnomaly(
            _G.Enum.Anomaly.MoonVisible,
            false
        )
    }

    if(Chance(0.5)){

        _G.ApplyAnomaly(
            _G.Enum.Anomaly.SkyRender,
            _G.Enum.SkyRender.End
        )
    }

    GlitchTick = RandomRange(60, 200)

    Log("Heavy glitch started")
}

function ResetGlitches(){

    for(var i = 0; i <= 15; i++){
        _G.ResetAnomaly(i)
    }

    Log("Glitches reset")
}

// ============================================================
// EVENTS
// ============================================================

function SendRandomMessage(){

    var Message =
        Messages[
            RandomRange(0, Messages.length - 1)
            ]

    _G.Logger.Anyway(Message)
}

function RandomEvent(){

    var Type = RandomRange(0, 8)

    if(Type == 0){
        GenerateRandomStructure()
    }

    if(Type == 1){
        GlitchSmall()
    }

    if(Type == 2){
        GlitchHeavy()
    }

    if(Type == 3){
        SendRandomMessage()
    }

    if(Type == 4){

        _G.ApplyAnomaly(
            _G.Enum.Anomaly.SunSize,
            RandomFloat(80, 300)
        )

        Log("Sun distortion")
    }

    if(Type == 5){

        _G.ApplyAnomaly(
            _G.Enum.Anomaly.MoonSize,
            RandomFloat(80, 300)
        )

        Log("Moon distortion")
    }

    if(Type == 6){

        _G.ApplyAnomaly(
            _G.Enum.Anomaly.SkyColor,
            0,
            0,
            0
        )

        Log("Black sky")
    }

    if(Type == 7){

        ResetGlitches()
    }

    if(Type == 8){

        _G.Logger.Error("REALITY ERROR")
    }
}

// ============================================================
// EVENTS REGISTER
// ============================================================

_G.SetEvent(_G.Enum.Event.ServerInit.ID, function(){

    Log("Server initialized")

    GenerateRandomStructure()
})

_G.SetEvent(_G.Enum.Event.ClientTick.ID, function(End){

    if(End){
        return
    }

    Tick++

    if(GlitchTick > 0){

        GlitchTick--

        if(Chance(0.4)){
            GlitchSmall()
        }

        if(GlitchTick <= 0){
            ResetGlitches()
        }
    }

    if(Tick >= NextEvent){

        Tick = 0

        NextEvent = RandomRange(
            500,
            1600
        )

        RandomEvent()
    }
})

_G.SetEvent(_G.Enum.Event.KeyPress.ID, function(Key){

    var Name = _G.KeyName(Key)

    if(Name == "F6"){

        GlitchHeavy()

        _G.Logger.Anyway("FORCED GLITCH")
    }

    if(Name == "F7"){

        GenerateRandomStructure()

        _G.Logger.Anyway("FORCED STRUCTURE")
    }

    if(Name == "F8"){

        ResetGlitches()

        _G.Logger.Anyway("RESET COMPLETE")
    }
})

_G.SetEvent(_G.Enum.Event.Error.ID, function(Message){

    _G.Logger.Error(
        "SCRIPT FAILURE: " + Message
    )
})

_G.Logger.Anyway("HORROR SYSTEM STARTED")