CmdUtils.makeSearchCommand
(
    {
        name: "jira search",
        icon: "http://jira.mcclatchyinteractive.com/favicon.ico",
        url: "http://jira.mcclatchyinteractive.com/sr/jira.issueviews:searchrequest-printable/temp/SearchRequest.html?query={QUERY}&summary=true&description=true&body=true&tempMax=1000",
        parser:
        {
            container: "table.#issuetable",
            title: ".nav.summary > a",
            //preview: "p"
        }
        ,
        maxResults: 10
    }
);
