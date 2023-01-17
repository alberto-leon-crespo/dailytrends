# Installation

First clone this repository

```bash
git clone https://github.com/alberto-leon-crespo/dailytrends.git
```
Change to develop branch.
If use Node Version Manager on root folder of project run
```bash
nvm use
```
The command read .nvmrc and set your NVM version to v14.21.2. If prefer install node manually.
Dont use any version up to v14 LTS for compatibility reasons

Then u need to install all deps

With npm
```bash
npm i
```

With yarn
```bash
yarn
```

Now run docker compose to setup database and admin panel
```bash
sudo docker-compose up -d
```
Copy file .env.example to root folder as .env 

The next step is populate database with feeds seed.
```bash
yarn start:console:dev feeds:seed
```

Then run the command to read all news of feeds inserted in database
```bash
yarn start:console:dev feeds:readAndSave
```

Finally start dev server
```bash
yarn start:dev
```

In http://127.0.0.1:8081 u can take a look about Feeds and News Collections

In env vars PUPPETER_HEADLESS=false indicates that puppeteer API show up navigator window. In true hide window and make
all process on background. If u execute this porject on a server, take care about this param

To prevent execution errors you need to install chromiun in computer that execute this project
```bash
sudo apt install chromium-browser
```

# Testing
Project have e2e test to verify all endpoints. Can execute with:
```bash
yarn test:e2e
```
