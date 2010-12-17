CmdUtils.CreateCommand
(
    {
        names: ["jira"],
        icon: "http://jira.mcclatchyinteractive.com/favicon.ico",
        arguments: [{role: 'object', nountype: noun_arb_text}],
        _link: function jira_link(jkey, type)
        {
            if (jkey.match(/^\d+$/))
            {
                jkey = "MIDEV-"+jkey;
            }
            
            var url = "http://jira.mcclatchyinteractive.com/browse/"+jkey;
            if (type == 'xml')
            {
                url = "http://jira.mcclatchyinteractive.com/si/jira.issueviews:issue-xml/"+jkey+"/"+jkey+".xml";
            }
            else
            {
                url = "http://jira.mcclatchyinteractive.com/browse/"+jkey;
            }

            return (url);
        },
        preview: function preview(pblock, args)
        {
            var url = this._link(args.object.text,'xml');
            CmdUtils.previewGet(pblock, url,
                function (data)
                {
                    var item  = data.getElementsByTagName("item")[0];
                    var title = item.getElementsByTagName("title")[0].textContent;
                    var link  = item.getElementsByTagName("link")[0].textContent;
                    var desc  = item.getElementsByTagName("description")[0].textContent;
                    var assign = item.getElementsByTagName("assignee")[0].textContent;
                    var priority = item.getElementsByTagName("priority")[0];
                    var pimg = priority.attributes.getNamedItem('iconUrl').textContent;
                    
                    var status = item.getElementsByTagName("status")[0];
                    var simg = status.attributes.getNamedItem('iconUrl').textContent;
                    
                    var type = item.getElementsByTagName("type")[0];
                    var timg = type.attributes.getNamedItem('iconUrl').textContent;

                    var tmpl = "\
                    <a href='${link}'>${title}</a>\
                    <p>${ptxt} ${ttxt} - <img src='${pimg}'/><img src='${timg}'/><img src='${simg}'/><br>Assigned to: ${assign} - ${stxt}</p>\
                    <p>${desc}</p>\
                    ";
                    pblock.innerHTML = CmdUtils.renderTemplate(tmpl,
                        {
                            title: title,
                            link: link,
                            desc: desc,
                            ptxt: priority.textContent,
                            pimg: pimg,
                            stxt: status.textContent,
                            simg: simg,
                            ttxt: type.textContent,
                            timg: timg,
                            assign: assign,
                        });
                },
                'xml');
        },
        execute: function execute(args)
        {
            Utils.openUrlInBrowser(this._link(args.object.text, 'html'));
        }
    }
);
