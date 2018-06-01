# Installation instructions

#### 1. Install and build client frontend
Frontend written in vuejs, built using webpack with eslint, babel, uglify, etc.
```sh
./
$ cd client
$ npm install
$ npm run build
building for production...
...
Build complete.
```
After build finished you will have dist version of frontend in ./server/public/

#### 2. Install and run server
```sh
./
$ cd server
$ npm install
$ npm start
Express server listening on port 3000
```

------------

# Development
#### Frontend
Using webpack-hot-middleware for hot-reload
```sh
./
$ cd client
$ npm install
$ npm run dev
Project is running at http://localhost:8080/
```
#### Backend
```sh
./
$ cd server
$ npm install
$ npm run watch
Express server listening on port 3000
```

# Description
Software is meant to monitor website environments and status of selected components. It sends a http request to retrieve the html, parse the html to retrieve information about rendered elements and handles them according to business logic of the application.
Displays the state of an instance using 6 parameters and score calculated based on those parameters.
| score  | state  |
| :------------ | :------------ |
| x = 6 | perfect health |
| 6 > x > 2 | warning |
| x <= 2 | failed |

------------

#### Example of healthy application state
[![Preview](https://i.imgur.com/DkScfaf.png "Preview")](https://i.imgur.com/DkScfaf.png "Preview")

Consists of:
- application address
- build version (last commit)
- number of main menu items
- number of posters in "Booking now" and "Coming soon" sections
- number of sites retrieved for quickbook component
- number of hero banners
- number of items in first tab of promobox
- number of footer links
- last update hour (refreshed every 60 seconds by default)