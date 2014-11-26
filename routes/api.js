var fortune = require('fortune')
var app = fortune({db: 'scoutnet'})
  .resource('entry', {
    highGoals: Number,
    lowGoals: Number,
    throws: Number,
    catches: Number,
    comment: String,
    owner: {ref:'team', inverse:'stats'}, // "belongs to" a team
    from: {ref:'match', inverse:'entries'} // "belongs to" a match
  })
  .resource('team', {
    name: String,
    teamNo: Number,
    stats: [{ref:'entry', inverse:'owner'}], // "has many" entries
    appearances: [{ref:'match', inverse:'participants'}] // "mas many" matches
  })
  .resource('match', {
     name: String,
     entries: [{ref:'entry', inverse:'from'}], // "has many" entries
     participants: [{ref:'team', inverse:'appearances'}] // "has many" teams
  })

module.exports = app.router
