# PteroTunnel 
An nginx manager built using [Next.js](https://nextjs.org/) & [Tailwind CSS](https://tailwindcss.com/) that lets you easily reverse proxy your [Pterodactyl Panel](https://pterodactyl.io/) servers.

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

### Edit .env

```bash
nano .env
```

PANEL - Is your Pterodactyl Panel url `Ex: https://panel.yourdomain.xxx`

URL - Is the url you are accessing this website from `Ex: https://panel.yourdomain.xxx:25420`

### Install Required Node Modules
```bash
npm install
```

### Build The Website
```bash
npm run build
```

### Run The Website
```bash
npm run start
```


