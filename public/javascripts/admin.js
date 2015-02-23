$('#btnImport').on('click', importEvent);
$('#btnSubmitTeam').on('click', addTeam);
$('#btnSubmitMatch').on('click', addMatch);
$(document).ready(populateLists)

function importEvent() {
  var eventkey = $('select#importEvent').val();
  console.log(eventkey)
  var sure = confirm("Final warning: Are you sure you want to import "+eventkey+"?");
  if (!sure) return
  $.get('/admin/internal/'+eventkey).done(function() { alert("Done") });
}

// Add Team
function addTeam(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('fieldset#formImport #formNewTeam input').each(function(index, val) {
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


// Add Match
function addMatch(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#formNewMatch input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newMatch = {
            'matches':[{
              'name': $('fieldset#formNewMatch input#inputName').val(),
            }]
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newMatch),
            url: '/api/matches',
            dataType: 'JSON'
        }).done(function( response ) {
            // Clear the form inputs
            $('#formNewMatch fieldset input').val('');
            location.reload(true);
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

function populateLists() {
    // Empty content string
    var listContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/api/events/2015.json', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data.sort(sortBy('name')), function(){
            listContent += '<option value="'+this.eventKey+'">';
            listContent += this.name;
            listContent += '</option>'
        });

        // Inject the whole content string into our existing HTML table
        $('select#importEvent').html(listContent);
    });
}
