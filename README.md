# Properties Web Application

## Prerequisites

1. [Git](https://git-scm.com/downloads)
2. [NPM](https://www.npmjs.com)
3. [MongoDB Server](https://www.mongodb.com)

## Installation

In order to install, you must have the prerequisites listed above.  After you have those, follow these steps:

1. `git clone` this repository
2. `cd` into Project directory and run `npm i`
3. `cp server/sample.yml server/config.yml`
4. Edit `server/config.yml` to your use case
5. `npm start`

## Root Account Creation

In order to access many features of the program and API, you will need an account, and one with high access levels.
The first account can be created by using the account creation endpoint in the API, and it will recognize you as the root (first) user. Simply POST to `host:PORT/api/accounts` with `email` and `password` keys in the JSON body, and it will return to you a status code of 201 (created). After this, you can login as normal.

## Available Scripts

`npm start`
Runs the app in the development mode.<br /> Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

The page will reload if you make edits.<br />