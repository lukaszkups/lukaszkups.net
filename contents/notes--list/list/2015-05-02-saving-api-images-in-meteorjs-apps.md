---
title: Saving API images in Meteor apps
date: 2015/05/02
category: programming
tags: javascript, meteor.js, meteor, meteorjs, js, webdev, webdevelopment, web development, programming, file handling, download, cfs, node, node.js, nodejs, api, backend, backend developer, backenddev, backend dev, back-end
active: 2
---

# Saving API images in Meteor apps

Today I would like to share the knowledge about saving image files from external APIs.

Consider this scenario: *You have to develop an mobile app, that downloads some data and files from external API and saves those files locally to work offline if necessary*.

# Packages

First, we need to install proper Meteorjs plugins which enables to interact with files ([more info](https://atmospherejs.com/cfs/standard-packages)):

```
meteor add cfs:standard-packages
```

This is the main set of packages, that will help us dealing with files - I'm very happy that someone did such great job and solved file management problems in really painful way.

Also, we have to install a storage adapter package - my favorite is [gridfs](https://atmospherejs.com/cfs/gridfs). If You're using newest Meteor version then You should have it merged into Meteor's core - on the other case You have to install it:

```
meteor add cfs:gridfs
```

# Collection

Okay, so we have all necessary tools, now we have to define our file/media collections:

```
/* lib/models.js */
Media = new FS.Collection("media", {
  stores: [new FS.Store.GridFS("media")]
});
```

Thanks to `/lib/` file path, our collection definition will be available both on the server and the client side of the app.

##Cross-Origin Resource Sharing (CORS)

In this step, we will make sure that we don't get a [CORS error](http://www.w3.org/TR/cors/). To ensure this, we have to add adequate header to our request:

```
/* server/private_helpers.js */
Meteor.startup(function(){
  WebApp.connectHandlers.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return next();
  });
});
```

# Getting file via API

Now it's time to get the file path via our API. You can do this in couple ways - e.g. via Meteor's [HTTP package](https://atmospherejs.com/meteor/http) (`meteor add http`) or classically - via ajax request.

Personally, I decided to go classy and used jQuery (&#x2764;promises):

```
/* client/public_helpers.js  */

var imageArr = [];
var getApiFiles = function(){
  var dfd = new $.Deferred();
  $.ajax({
    url: PATH_TO_REMOTE_API,
    dataType: 'json'
  }).done(function(data){
    imageArr = data;
    dfd.resolve(imageArr);
  }).error(function(error){
    console.log('getImage error');
  });
  return dfd.promise();
};
```

Let's assume that the response (in our case imageArr) will look like this:

```
[
  {
    id: 1,
    photo: "/media/image1.jpg",
    default: false
  },
  {
    id: 2,
    photo: "/media/image2.jpg",
    default: false
  },
    id: 3,
    photo: "/media/image3.jpg",
    default: true
  }
]
```

# File downloading Meteor method

To make everything work, we have to add server side file downloading method:

```
/* server/private_helpers.js  */
Meteor.methods({
  saveFile: function(filePath){
    var file = new FS.File();
    file.attachData(filePath, function(err){
      if(err){
        throw err;
      }
      Media.insert(file, function(err, fileObj){
        return fileObj._id;
      });
    });
  }
});
```

# Final function

In the last step, we have to execute our methods properly:

```
/* client/helpers.js */
$.when(getApiFiles()).done(function(){
  for(var img in imageArr){
    var img_id = Meteor.call('saveFile', "http://remote-domain.xyz" + imageArr[img].photo);

    /* here You can process additional features, e.g. attaching img_id to another collection etc. */
  }
});
```

And that's it! Now You can use Your saved files in Your Meteor.js application locally, even without internet connection.

I've read couple comments that FS package should not be used in production, but in my opinion it just do the job perfectly. Until Meteor Core Development Team provide an official solution to handle file management You can be sure that I'll be using these packages - and therefore You should ;)

If You have any questions or suggestions, feel free to [contact](https://twitter.com/lukaszkups).

-- ł.
