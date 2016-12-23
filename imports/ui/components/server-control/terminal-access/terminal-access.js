import './terminal-access.html';

Template.terminalAccess.onCreated(function() {
  var self = this;
  self.terminalOutput = ReactiveVar("");
});

Template.terminalAccess.helpers({
  terminalOutput() {
    var self = Template.instance();
    return self.terminalOutput.get();
  },
});

Template.terminalAccess.events({
  'submit .terminal-input'(event) {
    event.preventDefault();

    var self = Template.instance();

    const target = event.target;
    const command = target.command;

    self.terminalOutput.set("Executing...");

    Meteor.call('terminal.exec', command.value, (error, result) => {
      if (error || result === false) {
        self.terminalOutput.set("ERROR");
      }

      self.terminalOutput.set(result);
    });
  },
});
