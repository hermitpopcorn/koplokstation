import { moment } from 'meteor/momentjs:moment';

// Date format helper
Template.registerHelper('formatDate', function(date) {
  return moment(date).format('D MMMM YYYY, h:mm A');
});
