$(document).ready(populateTables)
$(document).ready(calcAvgs)

function calcAvgs() {
  var lowsum = 0,
      highsum = 0,
      catchsum = 0,
      Cum = 0,
      count = 0,
      all = $('table#entrylist > tbody > tr');
  all.each(function() {
      lowsum += +$('td.B',this).text();
      highsum += +$('td.A',this).text();
      catchsum += +$('td.D',this).text();
      Cum += +$('td.C',this).text();
      count++;
  });
  $('td#avgHigh').text((highsum / count).toFixed(2));
  $('td#avgLow').text((lowsum / count).toFixed(2));
  $('td#avgCatch').text((catchsum / count).toFixed(2));
  $('td#avgThrow').text((Cum / count).toFixed(2));
}

function populateTables() {
    var options = {
      valueNames: ['match', 'A', 'B', 'C', 'D', 'comment' ]
    }
    var last = false
    var matchlist={};
    
    // jQuery AJAX call for JSON
    $.getJSON( '/api/matches', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data.matches, function(){
           matchlist[this.id] = this.name;
        });
        $('table#entrylist > tbody  > tr > td.match').each(function() {
            var matchId = $(this).closest('tr').find('.matchid').text();
            console.log(matchId);
            console.log(matchlist[matchId]);
            $(this).text(matchlist[matchId]);
      });
      userList = new List('userList', options); 
    });
}
