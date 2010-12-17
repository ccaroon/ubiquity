CmdUtils.CreateCommand
(
    {
        names: ["where am i"],
        _where: function where_am_i__where()
        {
            return CmdUtils.getGeoLocation();
        },
        preview: function loc_preview(pblock)
        {
            var msg = _('You Are Here: "<i>${loc.city}, ${loc.state}</i>"<p><img src="http://maps.google.com/staticmap?center=${loc.lat}%2C${loc.long}&zoom=13&size=475x240&key=ABQIAAAAzBIC_wxmje-aKLT3RzZx7BQFk1cXV-t8vQsDjFX6X7KZv96YRxSFucHgmE5u4oZ5fuzOrPHpaB_Z2w&markers=${loc.lat}%2C${loc.long}%2Cred">');
            pblock.innerHTML = CmdUtils.renderTemplate(msg, {loc: this._where()});
        },
        execute: function doit()
        {
            loc = this._where();
            displayMessage("You are here :" + loc.city + ", " + loc.state + " [" + loc.lat + "," + loc.long + "]");
        }
    }
)
