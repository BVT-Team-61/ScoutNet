var express = require('express');
var fortune = require('fortune');
var router = express.Router();
var db = fortune({db:'scoutnet'}).adapter


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
/* GET home page. */
router.get('/teams', function(req, res) {
  db.findMany('team').then( function(list) {
    list.sort(sortBy('teamNo'))
    res.render('teamlist', { title:'Teams - ScoutNet', teamlist:list});
  });
});

router.get('/matches', function(req, res) {
  db.findMany('match').then( function(list) {
    list.sort(sortBy('name'))
    res.render('matchlist', { title:'Matches - ScoutNet', matchlist:list});
  });
});

router.get('/scouter', function(req, res) {
  res.render('dataentry', { title:'New Match - ScoutNet'});
});

router.get('/', function(req, res) {
  res.render('index', { title:'ScoutNet' });
});

router.get('/entries', function(req, res) {
  db.findMany('entry').then( function(list) {
    res.render('entries', { title:'Entries - ScoutNet', entrylist:list});
  });
});

router.get('/teams/:id', function(req, res) {
  db.findMany('entry',{ owner: req.param("id") }).then( function(list) {
    db.find('team',req.param("id")).then( function(team) {
      teamNo = team.teamNo;
      res.render('team', { title:'Team '+teamNo+' Entries - ScoutNet', team:team, entrylist:list});
    });
  });
});
module.exports = router
