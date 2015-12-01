$(document).ready(function() {

  function renderComment(object) {
    var $p = $('<p>');
    $p.text(object.message);
    $('.' + object.imageId).append($p);
  }

  function clearComments() {
    $('.comments').html('');
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

  // $('input[name="comment"]').attr('required', 'required');

  $('input[type="text"]').on('focus', function(event) {
    try {
      $(this).val('');
    } catch (exception) {
      console.log(exception);
    }
  });

  $('form').on('submit', function(event) {
    try {
      event.preventDefault();
      var data = $(this).serializeArray();
      var comment = {
        message: data[0].value,
        imageId: $(this).prev().attr('id')
      };
      var $error = $('.error' + comment.imageId).parent();
      $.ajax({
        method: 'POST',
        url: '/comments',
        data: comment,
      }).done(function(data) {
        $error.css('visibility', 'hidden');
        renderComment(data);
        $('input[type="text"]').val('Comment Here');
      }).fail(function(data) {
        $error.css('visibility', 'visible');
      });
    } catch (exception) {
      console.log(exception);
    }
  });

  $('.reset').on('click', 'button', function(event) {
    event.preventDefault();
    $.ajax({
      method: 'GET',
      url: '/magicString'
    }).done(function() {
      clearComments();
    });
  });

});
