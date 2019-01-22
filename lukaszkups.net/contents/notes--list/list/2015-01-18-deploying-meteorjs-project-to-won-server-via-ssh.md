---
title: Deploying Meteor.js project to own server via SSH.
date: 2015/01/12
category: programming
tags: meteor, meteor.js, email, e-mail, smtp, pop3, sending email, sending emails, js, javascript, back-end, front-end, fullstack, node, node.js
active: 2
---

Today I've spent most time of the day on figuring out how to deploy an Meteor.js app to own server via ssh.

> Disclaimer: I'm a programmer guy - not a server an admin's wizard. So please calm down, be polite and eventually send me an email if You see something wrong in this article ;)

## SSH login and basic server setup

First, login to Your server via ssh:

```
ssh yourServerLogin@yourServerIp
```

When prompted, type Your server password and process to server connection. Let's install necessary tools first (`nginx`):

```
sudo apt-get update
sudo apt-get install nginx
```

Now You can manage nginx processes with these commands:

```
sudo service nginx stop
sudo service nginx start
sudo service nginx restart
```

# Node.js installation

Let's install Node.js environment, which is required to run our app:

```
sudo apt-get update
sudo apt-get install upgrade
sudo apt-get install nodejs
```

(You can also use NVM (Node.js Version Manager) or any other tool You want)

## Mongo database

As You probably know, Meteor.js uses MongoDB as its main database system so let's prepare our server to deal with it:

```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
sudo apt-get update
sudo apt-get install mongodb-10gen
```

Now start mongoDB as a Daemon with log records file:

```
mongod --fork --logpath /var/log/mongodb.log
```

The next thing is to add a system-wide MongoDB admin role:

```
mongo
db = db.getSiblingDB('admin')
db.createUser({user: 'admin', pwd: 'yourAdminPassword', roles: ['userAdminAnyDatabase']})
exit
```

In the next step, we need to edit MongoDB configuration file and uncomment following line:

```
#file path: /etc/mongodb.conf
auth = true
```

And then restart the MongoDB server:

```
sudo service mongodb restart
```

The final (mongo related) step will be adding admin role to our application database. First, we need to login to our MongoDB admin account:

```
mongo -u admin -p --authenticationDatabase admin
```

You will be asked for the password that You've set at one of the previous steps. After that You can create user and database for Your app:

```
use yourAppDatabaseName
db.createUser({ user: 'yourAppDbUserName', pwd: 'yourSuperSecureDbAppUserPassword', roles: [ 'readWrite' ] })
```

## Going back to Nginx

Now we have to configure Nginx for our application - let's create configuration file for Your app:

```
touch /etc/nginx/sites-available/yourApp.com
```

And here's the example code of this file:

```
upstream yourApp {
    server 127.0.0.1:3000;
}

server {
    listen 0.0.0.0:3000;
    server_name yourApp.com;
    access_log /var/log/nginx/yourApp.log;

    location / {
        proxy_pass http://yourApp/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $http_host;

        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forward-Proto http;
        proxy_set_header X-Nginx-Proxy true;

        proxy_redirect off;
    }
}
```

Now, You have to create symbolic link for this file:

```
sudo ln -s /etc/nginx/sites-available/yourApp.com /etc/nginx/sites-enabled/yourApp.com
```

And then, You can restart Nginx with command: sudo service nginx restart.

## Deployment

Let's finally deploy our application. Login to your server via ssh and clone Your app repo:

```
cd /usr/local/www/
git clone yourAppGitCloneUrl
cd yourClonedAppFolder
```

Now, install Meteor.js and bundle Your app - we're doing it on server because sometimes bundling app between different operating system (like osx and ubuntu linux) can cause errors with used node modules (e.g. bcrypt).

```
curl https://install.meteor.com/ | sh
meteor bundle yourAppName.com.tar.gz
```

Move Your (bundled) app to proper directory and unpack it:

```
mv yourAppName.com.tar.gz ../
tar -vxzf yourAppName.com.tar.gz
rm yourAppName.com.tar.gz
```

Now, to keep our app always live, let's install forever:

```
sudo npm install -g forever
```

Finally, we can plug in our app to Mongo database and run it, using forever:

```
cd yourAppName.com
PORT=3000 MONGO_URL=mongodb://yourAppAdminUserName:adminPassword@127.0.0.1:27017/yourAppName ROOT_URL=http://yourAppName.com forever -f start main.js
```

And your application is live now. You can check its status every time by following command:

```
forever list
# an example result:
info:    Forever processes running
data:        uid          command                     script              forever pid   id    logfile                         uptime
data:        [0] H74M    userdown                    app/main.js     56789   12345       /root/.forever/zxy.log  0:0:0:0.788
data:        [1] uv8C        /usr/local/bin/node     main.js         65432   23456       /root/.forever/xyz.log  2:2:50:36.647
```

You can always restart any forever process with command:

```
#forever restart uid e.g.
forever restart 1
```

And that's practically all. Special thanks to guys from gentlenode who wrote very similar blog post, which was an inspiration for writing this one (I've added couple own tips, but also rewrite most stuff to make sure that I will always have access to this knowledge).

-- ł.
