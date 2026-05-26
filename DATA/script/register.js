WL.SetEvent(WL.Enum.Event.Register, function(RegisterType){
    if(RegisterType == WL.Enum.Register.Item){
        for(var i = 0; i < 100; i++){
            var Info = new WL.MinecraftItem("example_" + i)

            WL.Register(Info)
        }
    }
})