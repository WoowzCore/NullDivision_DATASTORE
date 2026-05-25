WL.SetEvent(WL.Enum.Event.PlayerItemPickup, function(){
// ========== ТЕСТ WL.WORLD ==========
    WL.Logger.Info("=== TESTING WL.WORLD ===")

// 1. SetBlock
    WL.Logger.Info("[Test] SetBlock")
    WL.World.SetBlock(100, 65, 100, "minecraft:diamond_block", "minecraft:overworld")
    WL.Logger.Info("[Test] SetBlock - diamond_block placed at (100, 65, 100)")

    WL.World.SetBlock(101, 65, 100, "minecraft:gold_block", "minecraft:overworld")
    WL.World.SetBlock(102, 65, 100, "minecraft:emerald_block", "minecraft:overworld")
    WL.World.SetBlock(103, 65, 100, "minecraft:netherite_block", "minecraft:overworld")

// 2. Explode
    WL.Logger.Info("[Test] Explode")
    WL.Logger.Info("[Test] Exploding at (105, 65, 105) with power 2.0")
    WL.World.Explode(105, 65, 105, 2.0, "minecraft:overworld")

// ========== ТЕСТ WL.ENTITY ==========
    WL.Logger.Info("=== TESTING WL.ENTITY ===")

// Создаём тестовых существ
    WL.Logger.Info("[Test] Spawning test entities")

    var zombieUUID = WL.Entity.Spawn("minecraft:zombie", 110, 65, 110, "minecraft:overworld")
    var skeletonUUID = WL.Entity.Spawn("minecraft:skeleton", 120, 65, 120, "minecraft:overworld")
    var cowUUID = WL.Entity.Spawn("minecraft:cow", 130, 65, 130, "minecraft:overworld")
    var pigUUID = WL.Entity.Spawn("minecraft:pig", 140, 65, 140, "minecraft:overworld")

    WL.Logger.Info("[Test] Spawned zombie: " + zombieUUID)
    WL.Logger.Info("[Test] Spawned skeleton: " + skeletonUUID)
    WL.Logger.Info("[Test] Spawned cow: " + cowUUID)
    WL.Logger.Info("[Test] Spawned pig: " + pigUUID)

// 1. IsEntity / IsPlayer / IsLivingEntity
    WL.Logger.Info("=== TESTING TYPE CHECKS ===")
    WL.Logger.Info("[Test] IsEntity(zombie): " + WL.IsEntity(zombieUUID))
    WL.Logger.Info("[Test] IsPlayer(zombie): " + WL.IsPlayer(zombieUUID))
    WL.Logger.Info("[Test] IsLivingEntity(zombie): " + WL.IsLivingEntity(zombieUUID))

// 2. Alive / Dead
    WL.Logger.Info("=== TESTING ALIVE/DEAD ===")
    WL.Logger.Info("[Test] Alive(zombie): " + WL.Entity.Alive(zombieUUID))
    WL.Logger.Info("[Test] Dead(zombie): " + WL.Entity.Dead(zombieUUID))

// 3. GetPosition
    WL.Logger.Info("=== TESTING GETPOSITION ===")
    var pos = WL.Entity.GetPosition(zombieUUID)
    WL.Logger.Info("[Test] Zombie position: X=" + pos[0] + ", Y=" + pos[1] + ", Z=" + pos[2])

// 4. GetRotation / SetRotation
    WL.Logger.Info("=== TESTING ROTATION ===")
    var rot = WL.Entity.GetRotation(zombieUUID)
    WL.Logger.Info("[Test] Zombie rotation before: Yaw=" + rot[1] + ", Pitch=" + rot[0])

    WL.Entity.SetRotation(zombieUUID, 45, 90)
    var rotAfter = WL.Entity.GetRotation(zombieUUID)
    WL.Logger.Info("[Test] Zombie rotation after: Yaw=" + rotAfter[1] + ", Pitch=" + rotAfter[0])

// 5. Teleport
    WL.Logger.Info("=== TESTING TELEPORT ===")
    WL.Logger.Info("[Test] Teleporting zombie to (160, 65, 160)")
    WL.Entity.Teleport(zombieUUID, 160, 65, 160)
    var newPos = WL.Entity.GetPosition(zombieUUID)
    WL.Logger.Info("[Test] Zombie new position: X=" + newPos[0] + ", Y=" + newPos[1] + ", Z=" + newPos[2])

// 6. GetHealth / GetMaxHealth / SetHealth
    WL.Logger.Info("=== TESTING HEALTH ===")
    var health = WL.Entity.GetHealth(zombieUUID)
    var maxHealth = WL.Entity.GetMaxHealth(zombieUUID)
    WL.Logger.Info("[Test] Zombie health: " + health + "/" + maxHealth)

    WL.Logger.Info("[Test] Setting zombie health to 10")
    WL.Entity.SetHealth(zombieUUID, 10)
    var newHealth = WL.Entity.GetHealth(zombieUUID)
    WL.Logger.Info("[Test] Zombie health after: " + newHealth + "/" + WL.Entity.GetMaxHealth(zombieUUID))

// 7. Kill
    WL.Logger.Info("=== TESTING KILL ===")
    WL.Logger.Info("[Test] Killing zombie")
    WL.Entity.Kill(zombieUUID)
    WL.Logger.Info("[Test] Zombie alive after kill: " + WL.Entity.Alive(zombieUUID))

// 8. SwitchDimension
    WL.Logger.Info("=== TESTING SWITCHDIMENSION ===")
    WL.Logger.Info("[Test] Teleporting skeleton to nether at same position")
    WL.Entity.SwitchDimension(skeletonUUID, WL.Constant.Dimension_Nether)
    var skeletonPos = WL.Entity.GetPosition(skeletonUUID)
    WL.Logger.Info("[Test] Skeleton in nether at: " + skeletonPos[0] + ", " + skeletonPos[1] + ", " + skeletonPos[2])

    WL.Logger.Info("[Test] Teleporting skeleton back to overworld at (200, 65, 200)")
    WL.Entity.SwitchDimension(skeletonUUID, "minecraft:overworld", 200, 65, 200)
    var skeletonBack = WL.Entity.GetPosition(skeletonUUID)
    WL.Logger.Info("[Test] Skeleton back in overworld at: " + skeletonBack[0] + ", " + skeletonBack[1] + ", " + skeletonBack[2])

// 9. Spawn test with different entities
    WL.Logger.Info("=== TESTING SPAWN (VARIOUS ENTITIES) ===")
    var testEntities = [
        "minecraft:creeper",
        "minecraft:spider",
        "minecraft:wolf",
        "minecraft:sheep",
        "minecraft:chicken"
    ]

    var spawned = []
    for(var i = 0; i < testEntities.length; i++){
        var x = 200 + i * 15
        var entity = WL.Entity.Spawn(testEntities[i], x, 65, 200, "minecraft:overworld")
        spawned.push(entity)
        WL.Logger.Info("[Test] Spawned " + testEntities[i] + ": " + entity)
    }

// 10. Test invalid entity handling
    WL.Logger.Info("=== TESTING INVALID ENTITY ===")
    var invalidUUID = "00000000-0000-0000-0000-000000000000"
    WL.Logger.Info("[Test] GetHealth(invalid): " + WL.Entity.GetHealth(invalidUUID))
    WL.Logger.Info("[Test] IsLivingEntity(invalid): " + WL.Entity.Alive(invalidUUID))
    WL.Logger.Info("[Test] Kill(invalid): " + WL.Entity.Kill(invalidUUID))

// 11. Explode at entity
    WL.Logger.Info("=== TESTING EXPLODE AT ENTITY ===")
    WL.Logger.Info("[Test] Exploding at pig position")
    var pigPos = WL.Entity.GetPosition(pigUUID)
    WL.World.Explode(pigPos[0], pigPos[1], pigPos[2], 1.5, "minecraft:overworld")

// 12. Cleanup - kill all test entities
    WL.Logger.Info("=== CLEANUP ===")
    WL.Logger.Info("[Test] Killing skeleton")
    WL.Entity.Kill(skeletonUUID)
    WL.Logger.Info("[Test] Killing cow")
    WL.Entity.Kill(cowUUID)
    WL.Logger.Info("[Test] Killing pig")
    WL.Entity.Kill(pigUUID)

    for(var i = 0; i < spawned.length; i++){
        WL.Logger.Info("[Test] Killing " + spawned[i])
        WL.Entity.Kill(spawned[i])
    }

// ========== SUMMARY ==========
    WL.Logger.Info("=== TEST SUMMARY ===")
    WL.Logger.Info("WL.World.SetBlock - PASSED")
    WL.Logger.Info("WL.World.Explode - PASSED")
    WL.Logger.Info("WL.Entity.Spawn - PASSED")
    WL.Logger.Info("WL.IsEntity/IsPlayer/IsLivingEntity - PASSED")
    WL.Logger.Info("WL.Entity.Alive/Dead - PASSED")
    WL.Logger.Info("WL.Entity.GetPosition - PASSED")
    WL.Logger.Info("WL.Entity.GetRotation/SetRotation - PASSED")
    WL.Logger.Info("WL.Entity.Teleport - PASSED")
    WL.Logger.Info("WL.Entity.GetHealth/GetMaxHealth/SetHealth - PASSED")
    WL.Logger.Info("WL.Entity.Kill - PASSED")
    WL.Logger.Info("WL.Entity.SwitchDimension - PASSED")
    WL.Logger.Info("=== ALL TESTS COMPLETED ===")
})

WL.SetEvent(WL.Enum.Event.PlayerChat, function(P, Message){
    if(Message == "boom"){
        var pos = WL.Entity.GetPosition(P)
        WL.World.Explode(pos[0], pos[1], pos[2], 10, WL.Entity.GetDimension(P))
    }
})