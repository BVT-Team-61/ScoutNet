$('#btnSubmitMatch').on('click', addMatch);


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
