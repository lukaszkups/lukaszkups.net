---
title: Keeping session variables after sending email in Meteor.js app
date: 2015/01/29
category: programming
tags: javascript, jquery, js, webdev, webdevelopment, web development, front-end, front-end development, programming, meteor, meteor.js, meteorjs, node, node.js, nodejs
active: 2
---

# Emails & notifications

Today I wanted to implement contact form with validation and (alert) notification system. However, I encountered a problem with session variables.

My idea was to set Session variable which stores information about unseen alert notification and get that value after `rendered` template callback:

Template event:

```
Template.myContactTemplate.template{(
	'click .submitButton': function(e){
		var dataText = $(e.currentTarget).find('.dataText').val();

		Session.set('alertMessage', ['Email has been sent', 'success']);
		Meteor.call('sendEmail', dataText);
	}
)};
```

E-mail method:

```
Meteor.methods({
	sendEmail: function(text){
		check([text], [String]);
		this.unblock();
		Email.send({
			to: 'xyz@xyz.com',
			from: 'contactForm@xyz.com',
			subject: 'New message from contact form',
			text: text
		});
	}
});
```

Rendered callback:

```
Template.contactFormTemplate.rendered = function(){
	Meteor.defer(function(){
		var a = Session.get('alertMessage');
		if (a) {
			throwAlert(a[0], a[1]);	// my custom method for alerts
			Session.set('alertMessage', null);
		}
	});
}
```

The code above will not work. I have noticed that email sending method somehow flush/resets our `alertMessage` session variable. To prevent from such behaviour and keep all variables saved let's add [persistent-session](https://github.com/okgrow/meteor-persistent-session) package:

```
meteor add u2622:persistent-session
```

And that's it. Now our session variables are stored in the browser's localstorage (so we prevent from unwanted variable flushes).

You can discuss about this problem at [this stackoverflow thread](http://stackoverflow.com/questions/28084160/session-variable-unset-after-sending-email).

-- ł