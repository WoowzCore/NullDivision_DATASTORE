WL.SetEvent(WL.Enum.Event.Register, function(RegisterType){
    if(RegisterType == WL.Enum.Register.Item){
        for(var i = 0; i < 100; i++){
            var Info = new WL.BuiltinItem("example_" + i)

            Info.Name = "golu " + i

            WL.Register(Info)
        }
    }
})

WL.InitScript("sandbox")