$('#btnSubmitTeam').on('click', addTeam);
$(document).ready(calcAvgs)
// Add Team
function addTeam(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#formNewTeam input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newTeam = {
            'teams':[{
              'name': $('fieldset#formNewTeam input#inputName').val(),
              'teamNo': $('fieldset#formNewTeam input#inputTeamNo').val()
            }]
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newTeam),
            url: '/api/teams',
            dataType: 'JSON'
        }).done(function( response ) {
            // Clear the form inputs
            $('#formNewTeam fieldset input').val('');
            location.reload(true);
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

function calcAvgs() {
  var done = 0;
  var all = $('table#teamTable > tbody > tr')
  all.each(function(_, row){
    teamid=$('td.id',row).text()
    $.getJSON( '/api/teams/'+teamid+'/stats', function( data ) {
          var asum = 0,
              bsum = 0,
              csum = 0,
              dsum = 0,
              count = 0;
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data.entries, function() {
          asum += this.A;
          bsum += this.B;
          csum += this.C;
          dsum += this.D;
          count++;
        });
        $('td.A',row).text((asum / count).toFixed(2));
        $('td.B',row).text((bsum / count).toFixed(2));
        $('td.C',row).text((csum / count).toFixed(2));
        $('td.D',row).text((dsum / count).toFixed(2));
    }).always( function(){
        done++
        if(done == all.length) initList();
    });
  });

}

function initList() {
  var listOptions = {
    valueNames: ['name', 'teamNo', 'A', 'B', 'C', 'D']
  }
  teamList = new List('teamList', listOptions);
}
