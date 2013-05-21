CmdUtils.makeSearchCommand
(
    {
        name: "jira search",
        icon: "http://staff.webassign.net/jira/favicon.ico",
        url: "http://webassign.atlassian.net/sr/jira.issueviews:searchrequest-printable/temp/SearchRequest.html?query={QUERY}&summary=true&description=true&body=true&tempMax=1000",
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
