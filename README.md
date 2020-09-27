# Properties Web Application

## Prerequisites

1. [Git](https://git-scm.com/downloads)
2. [NPM](https://www.npmjs.com)
3. [MongoDB Server](https://www.mongodb.com)

## Installation

In order to install, you must have the prerequisites listed above.  After you have those, follow these steps:

1. `git clone` this repository
2. `cd` into Project directory and run `npm ci`
3. `cp server/sample.yml server/config.yml`
4. Edit `server/config.yml` to your use case
5. `npm start`

## Root Account Creation

In order to access many features of the program and API, you will need an account, and one with high access levels.
The first account can be created by using the account creation endpoint in the API, and it will recognize you as the root (first) user. Simply POST to `host:PORT/api/accounts` with `email`, `password`, `firstName`, and `lastName` keys in the JSON body, and it will return to you a status code of 201 (created). After this, you can login as normal.

The root account will be assigned to the `Admin` organization w/ full access. Admin organization has access to both the admin panel as well as a mock property panel just like seen for customers.

## Pulling config changes

If you pull a change in `server/sample.yml`, you will need to compare that to you `server/config.yml` file in order to make sure that there are no configuration values you must now add. Defaults will be provided in the new sample.yml.

## Reference Data

If you add a reference data model to the server, you must add a default value set. Set an array constant to `defaults` and insert them to the DB using a Schema static method available to the Model. Then, add this chain static method to the mongoose load file alongisde others.

## Available Scripts

`npm start`
Runs the app in the development mode.<br /> Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The page will reload if you make edits.<br />