$(document).ready(populateTables)

function populateTables() {
    var options = {
      valueNames: ['team', 'match', 'A', 'B', 'C', 'D', 'comment' ]
    }
    var last = false
    var matchlist={};

    // jQuery AJAX call for JSON
    $.getJSON( '/api/matches', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data.matches, function(){
           matchlist[this.id] = this.name;
        });
        $('table > tbody  > tr > td.match').each(function() {
            var matchId = $(this).closest('tr').find('.matchid').text();
            $(this).text(matchlist[matchId]);
      });
     if(last) {
       userList = new List('userList', options);
     }
     else last = true;
    });

    var teamlist = [];

    // jQuery AJAX call for JSON
    $.getJSON( '/api/teams', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data.teams, function() {
           teamlist[this.id] = this.teamNo;
        });

        // Inject the whole content string into our existing HTML table
        $('table > tbody  > tr > td.team').each(function() {
            var teamId = $(this).closest('tr').find('.teamid').text();
            $(this).text(teamlist[teamId]);
      });

     if(last) {
       userList = new List('userList', options);
     }
     else last = true;
    });
}
