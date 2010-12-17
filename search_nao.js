CmdUtils.makeSearchCommand
(
    {
        name: "NAO",
        url: "http://www.newsobserver.com/search_results/{QUERY}?&category=news",
        parser:
        {
            container: "div.result",
            title: "h2",
            preview: "p"
        }
    }
);
