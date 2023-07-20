# PteroTunnel 
An [Nginx](https://nginx.org/) manager built using [Next.js 13](https://nextjs.org/) & [Tailwind CSS](https://tailwindcss.com/) that lets you easily reverse proxy your [Pterodactyl Panel](https://pterodactyl.io/) servers using a normal proxy or a secure one

## Getting Started
This project is in its early stages and shouldn't be used in production! This should be installed on every node that you would like to reverse proxy so the traffic is as secure as it can be. Please install and run this as a root user to prevent issues.

## Install Dependencies
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install nodejs nginx
```

### Create The Website Directory
```bash
mkdir /var/www/pterotunnel
cd /var/www/pterotunnel
```

### Install The Latest Release
```bash
curl -Lo pterotunnel.zip https://github.com/kragleh/pterotunnel/releases/latest/download/pterotunnel.zip
unzip pterotunnel.zip
```

### Edit .env

```bash
cp .env.example .env
nano .env
```

**Warning!** Dont use an url with `/` at the end of it!

`panel` - Is your Pterodactyl panel url `Ex: https://panel.example.host` 

`tunnel` - Is the url you are accessing this from `Ex: https://tunnel-node.example.host`

### Install Required Node Modules
```bash
npm install
```

### Build The Website
```bash
npm run build
```

### Run it Non-Stop using pm2

```bash
npm install -g pm2

pm2 start npm --name pterotunnel -- run start

pm2 save

pm2 startup
```

### Setup Nginx Reverse Proxy For HTTPS
```bash
nano /etc/nginx/sites-enabled/pterotunnel.conf
```

Paste this below to the nginx configuration file and replace `%domain%` with your domain
```
server {
  listen 80;
  server_name %domain%;
  return 301 https://$server_name$request_uri;
}

server {
  listen 443 ssl http2;
  server_name %domain%;

  ssl_certificate /var/www/pterotunnel/ssl/tunnel/proxy.crt;
  ssl_certificate_key /var/www/pterotunnel/ssl/tunnel/proxy.key;

  location / {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_pass http://localhost:8888;
  }
}
```

Add your certificate using these commands
```bash
# For certificate
nano /var/www/pterotunnel/ssl/tunnel/proxy.crt
# For key
nano /var/www/pterotunnel/ssl/tunnel/proxy.key
```

Restart nginx to apply changes
```bash
systemctl restart nginx
```
