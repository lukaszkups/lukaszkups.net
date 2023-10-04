---
title: Compiling Meteor.js Project to Cordova app
date: 2015/05/09
category: programming
tags: meteor, meteor.js, node, node.js, cordova, mobile, application, mobile app, mobile application, programming, development, mobile dev, mobile development, mobile developer, js, javascript
active: 2
---

As You may already know, Meteor.js enables compiling Your web applications to iOS or Android build (and I'm looking forward for Windows Phone 8 platform support). It is possible thanks to great Cordova integration with meteor. Today I would like to share information about the process of building and compiling project to Cordova.

First, we need to add to our existing project specific platform (iOS or Android, or both):

```
meteor add-platform ios
meteor add-platform android
```

If we want to check which platforms are currently installed we can use this command:

```
meteor list-platforms
```

And if we want to get rid of some platform, we can simply remove it running command below:

```
meteor remove-platform <platform_name>
```

If we want to check status of our app in emulator, type:

```
meteor run <platform_name>
```

## Preparing and building Google-Play-Store-ready project

When we are finished with our app development it's time to compile it and prepare for sending to Google Play Store.

At the beginning, we have to build our app:

```
meteor build android --server localhost:3000
```

Then, enter android folder with built `.apk` file (depends on the system Your working on, the folder path may be different but You should have no problem locating it - it should be somewhere inside Your Meteor.js project folder):

```
cd android/android
```

Now we have to generate the key for signing our app:

```
keytool -genkey -v -keystore <your keystore name>.keystore -alias <your keystore name> -keyalg RSA -keysize 2048 -validity 10000
```

If everything gone fine, we can sign our app with generated key:

```
jarsigner -verbose -keystore <your keystore name>.keystore -signedjar <your target apk file name>.apk <your signed apk file name>.apk <your keystore name>
```

Now we have signed Android application. Sometimes, during upload to Google Play Store, we can get an error that our app is not packed properly and we have to fix that.

We have to do this, using `zipalign` tool:

```
zipalign -f -v 4 <your signed apk file name>.apk <your zipaligned apk file name>.apk
```

If this command doesn't work for You, probably You need to use the full path to zipalign installation (it may differ depends on operating system):

```
~/.meteor/android_bundle/android-sdk/build-tools/20.0.0/zipalign -f -v 4 <your signed apk file name>.apk <your zipaligned apk file name>.apk
```

And that's it - You can now sent Your application to Google Play Store and collect the glory as a mobile developer :)

-- ł.