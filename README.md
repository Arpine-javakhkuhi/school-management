# School management

## Description

School Management Tool is an application tool for schools to organize learning process.

## Environment Setup

To run this project, make sure you have the following installed on your system.

| Binaries | Version |
| -------- | ------- |
| NodeJS   | ^16.0   |
| NPM      | ^8.0    |
| MySql    | ^8.0    |

## Instaletion

Run following command for installing all the dependencies locally.

```bash
$ npm install
```

## Running the app on local environment

```bash
$ npm run start:dev
```

## Environment Variables

Put all the environment variables inside `.env` file located ats the root of the project. The list of all the environment variables is available in `.env.example` file. Note, that if one of the required environment variables is not provided or is invalid (for example PORT is not a number), than the application will fail to start.

## Database Migrations

In order to generate migrations for the newly created models use the following command:

```
npm run db-migrate [name]
```

Here `name` is the name for the newly created migration. The `name` will be concatenated with the migration timestamp. After newly created migration is created, have a look at the file to make sure that everything was generated as expected. In some complex cases the migrations have to be written manually.

To deploy migratoin to database use the following command:

```
npm run db-deploy
```
