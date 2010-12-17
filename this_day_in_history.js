CmdUtils.makeSearchCommand
(
    {
        name: "in history",
        icon: "http://www.history.com/images/global/favicon.ico",
        url: "http://www.history.com/this-day-in-history.do?action=Landing&displayDate={QUERY}&categoryId=leadstory",
        parser:
        {
            title: "div.articles > p > a",
            maxResults: 10,
        }
    }
);
