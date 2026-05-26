WL.SetEvent(WL.Enum.Event.Register, function(RegisterType){
    WL.Logger.Info(RegisterType)
    if(RegisterType == WL.Enum.Register.Item){
        for(var i = 0; i < 10; i++){
            var Info = new WL.MinecraftItem("example_" + i)



            WL.Register(Info)
        }
    }
})