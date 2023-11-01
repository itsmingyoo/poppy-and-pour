# Project Links - Requirements - Resources
- [Poppy & Pour Repo](<https://github.com/itsmingyoo/poppy-and-pour/tree/main>)

# Project Manager
- [Jennifer Lee](https://github.com/CodeJellee)
# Developers
- [Minh Tran](https://github.com/itsmingyoo)
- [Sebastian Stovall](https://github.com/SebastianStovall)
- [Chris Thornburg](https://github.com/CJThornburg)
- [Casey 'O Neil](https://github.com/Spoctex)
- [James Askelson](https://github.com/JamesAskelson)

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
