$('#btnSubmitTeam').on('click', addTeam);

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