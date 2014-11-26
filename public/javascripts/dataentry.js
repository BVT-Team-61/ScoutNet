$(document).ready(populateLists)
$('#btnSubmitEntry').on('click', addEntry);

function populateLists() {

    // Empty content string
    var listContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/api/matches', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data.matches.sort(sortBy('name')), function(){
            listContent += '<option value="'+this.id+'">';
            listContent += this.name;
            listContent += '</option>'
        });

        // Inject the whole content string into our existing HTML table
        $('select#inputMatch').html(listContent);
    });

    // Empty content string
    teamContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/api/teams', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data.teams.sort(sortBy('teamNo')), function(){
            teamContent += '<option value="'+this.id+'">';
            teamContent += this.teamNo;
            teamContent += '</option>'
        });

        // Inject the whole content string into our existing HTML table
        $('select#inputTeam').html(teamContent);
    });
}

// Add Entry
function addEntry(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#formNewEntry input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newEntry = {
            'entries':[{
              'from': $('fieldset#formNewEntry select#inputMatch').val(),
              'owner': $('fieldset#formNewEntry select#inputTeam').val(),
              'highGoals': $('fieldset#formNewEntry input#inputStatA').val(),
              'lowGoals': $('fieldset#formNewEntry input#inputStatB').val(),
              'throws': $('fieldset#formNewEntry input#inputStatC').val(),
              'catches': $('fieldset#formNewEntry input#inputStatD').val(),
              'comment': $('fieldset#formNewEntry textarea#inputComment').val()
            }]
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newEntry),
            url: '/api/entries',
            dataType: 'JSON'
        }).done(function( response ) {
            // Clear the form inputs
            $('#formNewEntry fieldset input').val('');
            location.reload(true);                
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};
