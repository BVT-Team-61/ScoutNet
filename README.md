ScoutNet
========
A web-based FRC scouting system written in Node.js and jQuery.

Installation
============
1. Download source
3. Install [node.js](http://nodejs.org/download/)
2. Run `npm install` to automatically install dependencies
4. Open scoutnet directory
5. Doubleclick start.bat

Configuration
-------------
* Stat names are configured in the `nameNames` array defined in `views/layout.jade` (line 6)
* Admin username and password is configured in `users.htpasswd` with the format `username:password`

Clearing the Database
=====================
1. Close the ScoutNet server
2. Open your scoutnet directory
3. Go to the `node_modules\fortune\data\scoutnet` subdirectory
4. Rename the files entry, teams, and matches
5. Restart ScoutNet

Current Features
================
* Manually create matches and teams
* View averages and entries by team
* Fully open JSON data API
* Import data from [The Blue Alliance](http://www.thebluealliance.com/)
* Custom stat names
* Sort teams by averages
* Admin section for head scouter

Planned Features
================
* API Documentation
* Easier database reset and configuration
