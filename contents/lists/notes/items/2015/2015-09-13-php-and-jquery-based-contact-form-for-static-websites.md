---
title: PHP and jQuery based contact form for static websites
date: 2015/09/13
category: programming
tags: javascript, jquery, js, webdev, webdevelopment, web development, front-end, front-end development, programming, php, contact, contact form
active: 2
---

Couple days ago I had to develop a static website for my client (she decided that there's no need to use any CMS).

There was a problem with that, because there was still a contact form included in the origin design.

After double-check if my client's webserver will manage any technology to handle that feature, I've decided to try develop it with PHP.

The form HTML code is really simple:

```
<form id="contact-form">
  <h2>Contact us!</h2>
  <div class="will-hide">
    <input type="text" placeholder="First name" name="first_name">
    <input type="text" placeholder="Last name" name="last_name">
    <input type="email" placeholder="E-mail" name="email">
    <textarea name="message" rows="6" placeholder="Message"></textarea>
  </div>
  <input type="submit" value="Send">
</form>
```

Surprisingly, the PHP part of this task wasn't that hard either (I had totally no-experience with PHP):

```
<?php
  $first_name = $_POST['first_name'];
  $last_name = $_POST['last_name'];
  $email = $_POST['email'];
  $message = $_POST['message'];
  $formcontent = "From: $first_name $last_name \n Message: $message";
  $recipient = "<destination@email>";
  $subject = "Message from contact form";
  $mailheader = "From: $email \r\n";
  mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");
?>
```

Everything was working fine, but my form was reloading page on submit - so I decided to add a bit of ajax's magic (the php & html code above is already prepared for that):

```
$('form#contact-form').on('submit', function(){
   var first_name = $('#contact-form input[name="first_name"]').val(),
    last_name = $('#contact-form input[name="last_name"]').val(),
    email = $('#contact-form input[name="email"]').val(),
    message = $('#contact-form textarea').html();

    $.ajax({
      type: "POST",
      url: "<path/to/your/php/file>",
      data: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        message: message
      }
    }).done(function() {
      $('form#contact-form').html('<p>Message sent, thank You!</p>')
    });
    return false;
});
```

And that's it! You can additionally add some validation to prevent form from submitting when guest don't fill all form fields etc.

To be honest, I was pretty surprised, that everything has gone so smooth & easy.

Very often people are wondering why I don't know PHP, because webdevs tend to know it and use everyday. The answer is simple: I really don't like its syntax, and main development concepts - that's funny a bit, because I fell in love with javascript, which has really not so greater syntax, but in the end somehow it suits me best.

Besides, why to use PHP if I can go on with Ruby or Python (or insert-here any other popular language) instead? :)

-- ł.
