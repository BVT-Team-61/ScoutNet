var express = require('express');
var http = require('http');
var fortune = require('fortune');
var router = express.Router();
var db = fortune({db:'scoutnet'}).adapter;

/* Sort By Property Shortcut Thanks to StackOverflow */
function sortBy(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

router.get('/:eventid', function(req, res) {
  res.render('import', { title:'Import '+req.param("eventid"), eventid:req.param("eventid") } );
});

router.get('/internal/:eventid', function(req, res) {
  var teamoptions = {
    host: 'www.thebluealliance.com',
    path: '/api/v2/event/2014rismi/teams',
    port: '80',
    headers: {'X-TBA-App-Id': 'WAS:ScoutNet:v00'}
  };
  teamcallback = function(response) {
    var str = ''
    response.on('data', function (chunk) {
      str += chunk;
    });

    response.on('end', function () {
      data = JSON.parse(str);
      res.end();
      data.forEach(function(team) {
        newTeam = {name:team.nickname, teamNo:team.team_number}
        db.create('team',newTeam);
      });
   });
  }
  var req = http.request(teamoptions, teamcallback);
  req.end();
  var matchoptions = {
    host: 'www.thebluealliance.com',
    path: '/api/v2/event/2014rismi/matches',
    port: '80',
    headers: {'X-TBA-App-Id': 'WAS:ScoutNet:v00'}
  };
  matchcallback = function(response) {
    var str = ''
    response.on('data', function (chunk) {
      str += chunk;
    });

    response.on('end', function () {
      data = JSON.parse(str);
      res.end();
      data.forEach(function(match) {
        if(match.comp_level === "qm") {
          newMatch = {name: match.comp_level+pad(match.match_number,3)}
          db.create('match',newMatch);
        }
      });
   });
  }
  var req = http.request(matchoptions, matchcallback);
  req.end();
});

module.exports = router
