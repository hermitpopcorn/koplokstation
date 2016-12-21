import './upload.html';

Template.uploadFile.onCreated(function() {
  Meteor.subscribe("fileUploads");

  var self = this;
  self.files = new ReactiveVar(false);
  self.files.set(uploadedFilesCollection.find());
});

Template.uploadFile.events({
  'change .upload': function(event, template) {
    FS.Utility.eachFile(event, function (file) {
      var targetFile = new FS.File(file);
      uploadedFilesCollection.insert(targetFile, function (err, fileObj) {
        if(err) {
          alert("Upload error.");
        }
      });
    });
  },

  'click #deleteFile ': function(event) {
    uploadedFilesCollection.remove({_id:this._id});
  },
});

Template.uploadFile.helpers({
  getFiles: function() {
    return Template.instance().files.get();
  },

  getFileCount: function() {
    return Template.instance().files.get().count();
  },
});

Template.uploadFile.helpers({
  isUploading(uploading) {
    if(!uploading) {
      return { class: 'warning' };
    } else {
      return {};
    }
  }
});

Template.registerHelper('formatDate', function(date) {
  return date.toISOString().replace("T", " ").replace(/Z|\.(.+)/, "");
});
