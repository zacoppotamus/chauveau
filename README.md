# Chauveau 

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Ruby](https://www.ruby-lang.org) and then `gem install sass`
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)
- [SQLite](https://www.sqlite.org/quickstart.html)

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `grunt serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `grunt build` for building and `grunt serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.

## Deploying to AWS

Use Bitnami MEAN AMI from AWS Marketplace. Change permissions in apps/:
```sudo chmod -R 757 apps```

Install grunt:
```sudo npm install -g grunt-cli```
```npm install grunt-contrib-sass```

[Install Ruby and Gems](https://n3rve.com/?p=285)

Install sass:
```gem install sass`

### To copy local ssh key to Amazon (for github)
```cat ~/.ssh/id_rsa.pub | ssh -i Chauveau.pem ubuntu@http://ec2-52-28-234-248.eu-central-1.compute.amazonaws.com/```

### To upload files to the EC2 instance:
```scp -i resources/Chauveau.pem dev2.sqlite ubuntu@http://ec2-52-28-234-248.eu-central-1.compute.amazonaws.com/:~/apps/chauveau```

### Stop Apache server
```sudo /opt/bitnami/ctlscript.sh stop apache```

### Set Node Environment in EC2:
```echo export NODE_ENV=production >> ~/.bash_profile```
```source ~/.bash_profile```

### Running Node.js up and ensuring it runs forever with foreverJS:
Generate dist version of app
```grunt --force```, from root folder

Install foreverJS
```npm install -g forever```

Make a chauveau.conf script in /etc/init containing the following:
```
start on startup
exec forever start /home/bitnami/apps/chauveau/dist/server/app.js
```

### Set up reverse proxy on port 8080 for Nginx
Put this in sites-enabled:

```
server {
  server_name chauveau.izac.us www.chauveau.izac.us;
  listen 80;

  location / {
    proxy_pass http://MY_PRIVATE_IP:8080;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```
