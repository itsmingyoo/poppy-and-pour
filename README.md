# Project Links - Requirements - Resources
- [Poppy & Pour Repo](<https://github.com/itsmingyoo/poppy-and-pour/tree/main>)
- [Poppy & Pour Linktree](https://linktr.ee/poppyandpour)

# Project Manager
- Jennifer Lee | [GitHub](https://github.com/CodeJellee) - [LinkedIn](https://www.linkedin.com/in/lee-pac-swe/)
# Developers
- Minh Tran $~~~~~~~~~~~~~$| [GitHub](https://github.com/itsmingyoo) - [LinkedIn](https://www.linkedin.com/in/minh-tran-36501a251/)
- Sebastian Stovall $~$| [GitHub](https://github.com/SebastianStovall) - [LinkedIn](https://www.linkedin.com/in/sebastian-stovall-a17a8a211/)
- Chris Thornburg $~~$|  [GitHub](https://github.com/CJThornburg) - [LinkedIn](https://www.linkedin.com/in/chris-thornburg-swe/)
- Casey 'O Neil $~~~~~~~$| [GitHub](https://github.com/Spoctex) - [LinkedIn](https://www.linkedin.com/in/casey-o-neil-993b7228a/)
- James Askelson $~~~$| [GitHub](https://github.com/JamesAskelson) - [LinkedIn](https://www.linkedin.com/in/james-askelson-bb4b6928a/)

# Introduction
- This project is a custom full-stack app created for a client with integration of shopify to upgrade their [current website](https://poppyandpour.com/).

# Technology
- [Jira](https://www.atlassian.com/software/jira)
- [NextJs](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Shopify](https://www.shopify.com/)
- [HTML5](https://html.com/html5/)
- [Tailwind CSS](https://tailwindcss.com/)
- [GitHub MarkDown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

# Getting Started -- README WIP

- Install Packages
```
npm i
```

- Update node version from v16.20 to v20.9 in ubuntu or VS Code then restart ubuntu and vs code to see the updated versions
```
nvm install 20.9
nvm alias default 20.9
```

- Create a .env file with the following
```
DATABASE_URL="postgres://your-external-db-link"
SCHEMA="schema_name"
```

- Run Command to Migrate and Create dev.db
```
npx prisma migrate dev --name init
```

- Run the development server
```
npm run dev
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Routes

## Deploy on Vercel

# For Developers - Setting Up Local & Production Work Environments
- [Prisma Docs](https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database)

## PostgreSQL Installation Steps on Ubuntu
- Open Ubuntu
```
sudo apt update
sudo apt install postgresql
# Hit Y and Enter
```

- Log in to postgres CLI
```
sudo -u postgres psql

# if you run into an error, restart ubuntu
# if you get permission denied, run this command then do the above command again

service postgresql service postgresql restart
```

- Display Current Databases
```
\l
```

- Display Users
```
\du
```

- Create a User
```
CREATE ROLE <username> WITH PASSWORD '<password>';

#Run \du

#New Username should be under 'ROLE NAME' column

#List of roles should be 'Cannot login'

#Empty object for the last column 'Member of'
```

- Create User Admin Privileges to Create a DB and to Login
```
ALTER ROLE <username> WITH SUPERUSER;
ALTER ROLE <username> WITH CREATEDB;
ALTER ROLE <username> WITH LOGIN;
```

- Create Database
```
CREATE DATABASE <db-name> WITH OWNER <username>;
# \l to see the new database is created
```

- Connect Database to Project .env file
```
DATABASE_URL="postgres://<PSQLusername>:<PSQLpassword>@localhost:5432/<postgresDBname>?schema=schema_name"
```

- Test The Database
```
#Create db
npx prisma migrate dev --name init

#Run app, send feedback, and check console for feedback
npm run dev

#Run prisma studio to check postgresql database in browser
npx prisma studio
```

- **Important Note** - **ONLY HAVE ONE .env FILE -- There should not be a .env.local**
