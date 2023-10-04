---
title: Sending e-mails with Meteor.js
date: 2015/01/12
category: programming
tags: meteor, meteor.js, email, e-mail, smtp, pop3, sending email, sending emails, js, javascript, back-end, front-end, fullstack, node, node.js
active: 2
---

> This is my personal wrap-up explanation of the code available in official [Meteor.js](https://docs.meteor.com/) documentation.

Today I had to implement contact form for one of my Meteor.js project. At first I've jumped to official Meteor.js documentation and analize email mechanics.

At the beginning, we have to install `email` package (via terminal):

```
meteor add email
```

Next, we need to declare our email settings - to do that, let's create a `server/smtp.js` file:

```
// smtp.js file contents
Meteor.startup(function(){
  process.env.MAIL_URL = 'smtp://email_username:email_password@email_host:email_port/';
});
```

Example for gmail:

```
Meteor.startup(function(){
  process.env.MAIL_URL = 'smtp://boo.foo:superDooperPassword@smtp.gmail.com:587/';
});
```

We can also use custom domain email account:

```
Meteor.startup(function(){
  process.env.MAIL_URL = 'smtp://boo.foo@awesomedomain.com:superDooperPassword@smtp.gmail.com:587/';
});
```

After everything is set, let's register actual sending method, available for client (but declared on server so place code below somewhere under `server/` folder):

```
// In your server code: define a method that the client can call
Meteor.methods({
  sendEmail: function (to, from, subject, text) {
    check([to, from, subject, text], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    //actual email sending method
    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });
  }
});
```

Those function arguments are of course optional - we can also add cc, bcc, Reply-To, html or headers.

My example for contact form:

```
Meteor.methods({
  sendEmail: function (text) {
    check([text], [String]);

    this.unblock();

    Email.send({
      to: 'support@myClientProject.com',
      from: 'contact@myClientProject.com',
      subject: 'New message from contact form',
      text: text
    });
  }
});
```

After we declared our server method, let's create actual sending event:

```
Template.contactFormTemplate.events({
  'submit form#contactForm':function(e){
    var contactForm = $(e.currentTarget),
      fname = contactForm.find('#firstName').val(),
      lname = contactForm.find('#lastName').val(),
      email = contactForm.find('#email').val(),
      phone = contactForm.find('#phone').val(),
      message = contactForm.find("#message").val();

    //isFilled and isEmail are my helper methods, which checks if variable exists or is email address valid
    if(isFilled(fname) && isFilled(lname) && isFilled(email) && isFilled(phone) && isFilled(message) && isEmail(email)){
      var dataText = "Message from: " + fname + " " + lname + "\rEmail: " + email + "\rPhone: " + phone + "\rContent:" + message;

      Meteor.call('sendEmail', dataText);
      //throwAlert is my helper method which creates popup with message
      throwAlert('Email send.', 'success');
    }else{
      throwAlert('An error occurred. Sorry', 'error');
      return false;
    }
  }
});
```

Besides of code above, You need of course some html template code:

```
<template name="contactFormTemplate">
  <form id="contactForm">
    <input type="text" name="firstName" id="firstName" placeholder="First name">
    <input type="text" name="lastName" id="lastName" placeholder="last name">
    <input type="text" name="phone" id="phone" placeholder="Phone number">
    <input type="email" name="email" id="email" placeholder="Your email address">
    <textarea id="message"></textarea>
    <input type="submit" value="Send">
  </form>
</template>
```

And that's all - it was THAT easy. You can now add `{{> contactFormTemplate}}` tag to any template You want and enjoy Your awesome contact form :)

-- ł.
