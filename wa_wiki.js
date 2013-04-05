CmdUtils.makeSearchCommand
(
    {
        name: "wawiki",
        url: "http://staff.webassign.net/wiki/index.php/Special:Search?search={QUERY}&searchx=Search",
        parser:
        {
            container: "div.bodyContent",
            title: "ol > li > a",
            maxResults: 10
        }
    }
);
