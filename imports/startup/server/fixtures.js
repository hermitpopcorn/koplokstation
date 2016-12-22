import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // Add default user if the user list is empty
  if(Meteor.call('users.isEmpty')) {
    console.log("Users empty; attempting to insert default user...");
    let attempt = Meteor.call('users.insert', "tiesto", "metatron");
    console.log(attempt ? "User 'tiesto' with password 'metatron' inserted." : "Could not insert default user. Try inserting one manually.");
  }
});
