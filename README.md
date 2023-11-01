# Project Links - Requirements - Resources
- [Poppy & Pour Repo](<https://github.com/itsmingyoo/poppy-and-pour/tree/main>)

# Project Manager
- Jennifer Lee - [GitHub](https://github.com/CodeJellee) - [LinkedIn](https://www.linkedin.com/in/lee-pac-swe/)
# Developers
- Minh Tran - [GitHub](https://github.com/itsmingyoo) - [LinkedIn](https://www.linkedin.com/in/minh-tran-36501a251/)
- Sebastian Stovall - [GitHub](https://github.com/SebastianStovall) - [LinkedIn](https://www.linkedin.com/in/sebastian-stovall-a17a8a211/)
- Chris Thornburg - [GitHub](https://github.com/CJThornburg) - [LinkedIn](https://www.linkedin.com/in/chris-thornburg-swe/)
- Casey 'O Neil - [GitHub](https://github.com/Spoctex) - [LinkedIn](https://www.linkedin.com/in/casey-o-neil-993b7228a/)
- James Askelson - [GitHub](https://github.com/JamesAskelson) - [LinkedIn](https://www.linkedin.com/in/james-askelson-bb4b6928a/)

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
