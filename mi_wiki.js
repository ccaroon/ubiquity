CmdUtils.makeSearchCommand
(
    {
        name: "miwiki",
        url: "http://wiki.mcclatchyinteractive.com/index.php/Special:Search?search={QUERY}",
        parser:
        {
            container: "ul.mw-search-results",
            title: "li > a",
            preview: "li > div",
            maxResults: 10
        }
    }
);
