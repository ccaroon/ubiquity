// $Id: garage_sales.js 1711 2009-12-04 19:12:50Z ccaroon $
CmdUtils.CreateCommand
(
    {
        names: ["garage sales"],
        icon: "http://ccaroon-red-site.apps.nandomedia.com/static/garagesale_icon.gif",
        arguments: [{role: 'location', nountype: noun_arb_text, label: "where"}],
        description: "Find Garage Sales near you or any location.",
        // Given two points in lat,lng format, compute the distance between them.
        _calc_distance: function (A, B)
        {
            var pi = Math.atan2(1,1) * 4;
            
            var a1 = A.lat*(pi/180);
            var a2 = B.lat*(pi/180);
            
            var b1 = A.lng*(pi/180);
            var b2 = B.lng*(pi/180);
            
             // d is distance in miles
            var d = Math.acos(Math.cos(a1)*Math.cos(b1)*Math.cos(a2)*Math.cos(b2) + Math.cos(a1)*Math.sin(b1)*Math.cos(a2)*Math.sin(b2) + Math.sin(a1)*Math.sin(a2)) * 3963.1;

            return (d);
        },
        preview: function (pblock, args)
        {
            // Otherwise previewGet scope can't see _calc_distance funtion
            var _calc_dist = this._calc_distance;

            location = args.location.text;
            // FIXME: probably a better way
            if (location == undefined || location == 'me' || location == 'here')
            {
                var loc = CmdUtils.getGeoLocation();
                location = loc.city + ", " + loc.state;
            }
            
            CmdUtils.geocodeAddress(args.location.text,
                function(points)
                {
                    var lat;
                    var lng;
                    if (points.length > 0)
                    {
                        lat = points[0].lat;
                        lng = points[0].long;
                    }

                    var url = "http://rapp002d.nandomedia.com:8703/ads?site_id=22&class=Garage+Sale&limit=100";
                    CmdUtils.previewGet(pblock, url,
                        function (data)
                        {
                            var html = "";
                            
                            var ads = data.getElementsByTagName("ad");
                            
                            var tmpl = "\
                                <li>\
                                    <b>${ad_id} - ${title} (${distance} miles)</b><br>\
                                    ${body}\
                                </li>\
                                <hr>\
                            ";
        
                            var map_markers = "&markers=color:green|label:X|"+lat+","+lng;
                            var ad_id = 1;
                            for (var i = 0; i < ads.length; i++)
                            {
                                var a_lat = ads.item(i).getElementsByTagName("lat")[0].textContent;
                                var a_lng = ads.item(i).getElementsByTagName("lng")[0].textContent;
                                if (a_lat == undefined || a_lng == undefined)
                                {
                                    continue;
                                }

                                var distance = _calc_dist({lat: lat, lng: lng}, {lat:a_lat, lng: a_lng});
                                if (distance > 25)
                                {
                                    continue;
                                }
                                
                                map_markers += "&markers=color:red|label:"+ad_id+"|"+a_lat+","+a_lng;
                                var title = ads.item(i).getElementsByTagName("title")[0].textContent;
                                var body = ads.item(i).getElementsByTagName("body")[0].textContent;
                                html = html + CmdUtils.renderTemplate
                                (
                                    tmpl,
                                    {
                                        ad_id: ad_id,
                                        title: title,
                                        body: body,
                                        distance: Math.round(distance),
                                    }
                                );
                                ad_id++;
                            }
                            var map_tmpl = '<img src="http://maps.google.com/maps/api/staticmap?center=${lat},${lng}&zoom=10&size=487x512&maptype=roadmap&key=ABQIAAAAzBIC_wxmje-aKLT3RzZx7BQFk1cXV-t8vQsDjFX6X7KZv96YRxSFucHgmE5u4oZ5fuzOrPHpaB_Z2w${markers}&sensor=false">'
                            var map = CmdUtils.renderTemplate(map_tmpl, {lat: lat, lng: lng, markers: map_markers});
Utils.log(map);
                            pblock.innerHTML = "<h4>Garage Sales near "+location.toUpperCase()+" ("+lat+","+lng+")</h4>" + html + "<p>" + map;
                        },
                        'xml');
                }
            );
        },
        execute: function execute(args)
        {
            // TODO: Do something useful when the command is executed.
        }
    }
);
