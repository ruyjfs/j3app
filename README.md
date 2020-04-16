# j3scrum

A Open Source project made for Agile Development with Scrum, Kanban and mutch more!
Created on 2014

### Run App

Docker Compose

```bash
docker-compose up --build
```

Development

```
meteor
```

Deploy

```
mupx deploy
```

## Tecnologies

- Material Design with Angular Material.
- Socker.io
- Docker
- MongoDB
- MeteorJS
- AngularJS
- NodeJS v5
- Mupx for deploy (npm i -g mupx)

## Instalations

### Nginx for proxy reverse

1. Install

```bash
sudo apt-get install nginx
```

2. Disable a Default Virtual Host

```bash
sudo unlink /etc/nginx/sites-enabled/default
```

3. Create a new Virtual Host

```bash
vim /etc/nginx/sites-available/reverse-proxy.conf
```

4. Put this on file with your custom domine and port

```ini
server {
    listen 80;
    location / {
        proxy_pass http://127.0.0.1:3000;
    }
}
```

5. Enable a Virtual Host

```bash
sudo ln -s /etc/nginx/sites-available/reverse-proxy.conf /etc/nginx/sites-enabled/reverse-proxy.conf
```

6. Test and restart service nginx

```bash
service nginx configtest
service nginx restart
```

7. Edit yourt hosts

```bash
    vim /etc/hosts
```

8.  And put this

```bash
127.0.0.1 yourdomain.com
127.0.0.1 *.yourdomain.com
```

## Troubleshoting

Permission Super on Digital Ocean

```bash
echo METEOR_ALLOW_SUPERUSER=1 #create
echo $METEOR_ALLOW_SUPERUSER #show
```

Auth SSH

```bash
ssh-keygen -f ~/.ssh/id_rsa_didigal_ocean -m PEM
```

-| To force encrypt ssh in compactible old Node version.
