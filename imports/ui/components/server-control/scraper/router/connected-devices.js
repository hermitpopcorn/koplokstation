import './connected-devices.html';

Template.scraper_router_connectedDevices.onCreated(function() {
  var self = this;
  self.connectedDevices = new ReactiveVar([]);

  Meteor.call('scraper.scrapeRouter.getConnectedDevices', (error, result) => {
    if (error || result === false) {
      self.connectedDevices.set(false);
      return;
    }

    self.connectedDevices.set(result);
  });
});

Template.scraper_router_connectedDevices.helpers({
  connectedDevices: function() {
    return Template.instance().connectedDevices.get();
  }
});
