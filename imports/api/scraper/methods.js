import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { request } from "meteor/froatsnook:request";

Meteor.methods({
  'scraper.scrapeRouter.getConnectedDevices'() {
    try {
      // get data from router
      var res = request.sync("http://192.168.1.254/default.html", { timeout: 5000 });
      if (res.response.statusCode == 200) {
        let body = res.body;

        // strip line breaks
        body = body.replace(/(?:\r\n|\r|\n)/g, "");
        // cut off the useless parts
        body = body.split("Name</th></tr>").pop().split("</tbody>").shift();
        // make it into an array
        body = "</tr>" + body + "<tr>";
        devices = body.split("</tr><tr>"); devices.shift();

        filteredDevices = [];
        devices.forEach(function(value, index) {
          let splitValue = value.replace(/<\/td><td>/g, "|");
          splitValue = splitValue.replace(/<(.?)td>/g, "");
          splitValue = splitValue.split("|");

          if(splitValue.length == 3) {
            filteredDevices.push({ ip: splitValue[0], mac: splitValue[1], host: splitValue[2] });
          }
        });

        return filteredDevices;
      } else {
        throw {name: "ScraperError", message: "Cannot connect to router"};
      }
    } catch (error) {
      return false;
    }
  },
});
