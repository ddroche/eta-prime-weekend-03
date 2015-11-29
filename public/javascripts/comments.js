$(document).ready(function() {

  function renderComment(object) {
    var $p = $('<p>');
    $p.text(object.message);
    $('.' + object.imageId).append($p);
  }

  $('form').each(function(event) {
    var imageId = $(this).prev().attr('id');
    $.ajax({
      method: 'GET',
      url: '/comments/' + imageId
    }).done(function(data) {
      data.forEach(function(elem) {
        renderComment(elem);
      });
    });
  });

  $('form').on('submit', function(event) {
    try {
      event.preventDefault();
      var data = $(this).serializeArray();
      var comment = {
        message: data[0].value,
        imageId: $(this).prev().attr('id')
      };
      console.log(comment);
      $.ajax({
        method: 'POST',
        url: '/comments',
        data: comment,
      }).done(function(data) {
        console.log(data);
        renderComment(data);
      });
    } catch (exception) {
      console.log(exception);
    }
  });
});