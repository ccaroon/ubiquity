CmdUtils.makeSearchCommand
(
    {
        name: "cpan",
        url: "http://search.cpan.org/search?query={QUERY}&mode=all",
        parser:
        {
            //container: "div.result",
            title: "h2#sr",
            //preview: "small"
        }
    }
);
