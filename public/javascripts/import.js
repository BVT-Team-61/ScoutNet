$('#btnImport').on('click', importEvent);

function importEvent() {
  var sure = confirm("Final warning: Are you sure you want to import "+eventid+"?");
  if (!sure) return;
  console.log($.support.cors);
  alert("Importing "+eventid);
  $.get('/import/internal/'+eventid).done(function() { alert("Done") });
}
