uploadedFilesCollection = new FS.Collection("uploadedFiles", {
  stores: [new FS.Store.FileSystem("uploadedFiles", {path: "~/Dropoff"})]
});

uploadedFilesCollection.allow({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  },
  remove: function() {
    return true;
  },
  download: function() {
    return true;
  }
});
