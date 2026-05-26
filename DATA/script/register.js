var addedblocks = []

WL.SetEvent(WL.Enum.Event.Register, function(RegisterType){
    if(RegisterType == WL.Enum.Register.Block){
        for(var i = 0; i < 5; i++){
            var id = "block_example_" + i;
            var Info = new WL.BuiltinBlock(id)

            Info.Name = "golu " + i

            addedblocks.push(id)

            WL.Register(Info)
        }
    }

    if(RegisterType == WL.Enum.Register.Item){
        for(var i = 0; i < 5; i++){
            var Info = new WL.BuiltinItem("example_" + i)

            Info.Name = "golu " + i

            WL.Register(Info)
        }

        for(var j = 0; j < addedblocks.length; j++){
            var blockid = addedblocks[j]

            var Info = new WL.BuiltinItem("block_" + blockid)

            Info.Block = WL.Constant.ID + ":" + blockid

            WL.Register(Info)
        }
    }
})

WL.InitScript("sandbox")