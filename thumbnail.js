CmdUtils.CreateCommand
(
    {
        names: ["thumbnail"],
        _thumbnail: function thumbnail__thumbnail()
        {
            var win = CmdUtils.getWindow();
            var url = CmdUtils.getWindowSnapshot(win,{width:300});
            return(url);
        },
        preview: function thumbnail__preview(pblock)
        {
            var msg = "<img src='${url}'/>";
            pblock.innerHTML = CmdUtils.renderTemplate(msg, {url: this._thumbnail()});
        },
        execute: function x()
        {
            var url = this._thumbnail();
            CmdUtils.getImageSnapshot
            (
                url,
                function(imgData)
                {
                    CmdUtils.setSelection( "<img src='" + imgData +"'/>");
                }
            )
        }
    }
)
