# PteroTunnel 
An nginx manager built using [Next.js](https://nextjs.org/) & [Tailwind CSS](https://tailwindcss.com/) that lets you easily reverse proxy your [Pterodactyl Panel](https://pterodactyl.io/) servers.

# ATTENTION!
This repository is for developement purposes only, you SHOULD NOT run this in any way without being ok with dataloss!

## Getting Started
This project is in its early stages and shouldnt be used in production!

### Create The Website Directory
```bash
mkdir /var/www/pterotunnel
cd /var/www/pterotunnel
```

### Install The Latest Release
```bash
curl -Lo pterotunnel.tar.gz https://github.com/kragleh/pterotunnel/releases/latest/download/pterotunnel.tar.gz
tar -xzvf pterotunnel.tar.gz
```

## Install Node.JS 18
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install nodejs
```

### Edit .env

```bash
cp .env.example .env
nano .env
```

PANEL - Is your Pterodactyl Panel url `Ex: https://panel.example.com`

TUNNEL - Is the url you are accessing this website from `Ex: http://tunnel.example.com:3000`

### Install Required Node Modules
```bash
npm install
```

### Build The Website
```bash
npm run build
```

### Test The Website
```bash
npm run start
```

### Make It Run 24/7

```bash
npm install -g pm2

pm2 start npm --name pterotunnel -- run start

pm2 save

pm2 startup
```

