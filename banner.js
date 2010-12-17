CmdUtils.CreateCommand
(
    {
      names: ["banner"],
      arguments: [{role: 'object', nountype: noun_arb_text}],
      preview: function preview(pblock, args) 
      {
          pblock.innerHTML = "Your message <b>" + args.object.text + "</b>.";
      },
      execute: function execute(args) 
      {
          CmdUtils.injectHtml("<div align='center' style='color:red;font-size:64pt;border:2px solid black'><blink>"+args.object.text+"</blink></div>");
      }
    }
);
