### Stack
- Express.js
- Typescript
- Prisma
- SqLite
- Clean Architecture

### Instructions

#### Private key

- You need to add the private.key file to the `keys` folder

#### Deps

- Then you will need to install the dependencies, so

```shell
npm install
```

- Then you should run the prisma db to migrate the tables

```shell
npx prisma migrate dev
```

- Then you should run the serve command to host the backend

```shell
npx ts-node src/server.ts
```

> It will be available at http://localhost:3000/api, to use it with your react-native app under the Emulator, you should use your network ip address instead, something like http://192.168.0.1:3000/api


*** The database will be empty, so you will need to manipulate the data with Postman, to create the first users and etc..


### Reseting database

- Run migrate reset if you want to reset everything

```shell
npx prisma migrate reset
```

### Endpoints documentation

https://crimson-capsule-26634.postman.co/workspace/EasyTeam-API~c7563ddf-36af-4a33-9b64-2657ffdf1e80/collection/3136119-880f3b96-7534-40b3-a3d4-449dc9dd78e1?action=share&creator=3136119
