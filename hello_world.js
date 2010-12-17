CmdUtils.CreateCommand
(
{
    names: ["say hello", "greet"],
    preview: "Displays the message <b>Hello, World!</b>", 
    execute: function hello_execute() 
    {
        displayMessage(_("Hello, World!"));
    }
}
);
