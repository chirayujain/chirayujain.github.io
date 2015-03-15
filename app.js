/* globals screen, skrollr, navigator */
$(function() {

  $.material.init();

  if ( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    skrollr.init({
      smoothScrolling: true,
      forceHeight: false
    });
  }

  $(document).ready(function() {
    var path = window.location.hash;
    if (path.indexOf('#!/') === 0) {
      $('[href="' + path + '"]').trigger('click');
    } else if (path !== '') {
      $('html, body').stop().animate({
        scrollTop: $('[href="' + path + '"]').offset().top + 150
      }, 100, 'swing');
    }
  });

  $(document)
  .on('mouseover', '#projects a.inner', function() {
    var offset = $(this).offset(),
        left = offset.left + ($(this).width() / 2),
        top = offset.top - $(window).scrollTop();

    $(this).next().find('.ripple').css({top: top, left: left});

  })
  .on('click', '#projects a.inner', function() {
    var w = screen.width,
        h = screen.height,
        l = Math.max(w, h) * 2;

    $(this).next().addClass('expanded');
    $(this).next().find('.ripple').css({width: l, height: l, marginLeft: -l/2, marginTop: -l/2});
    $('body').addClass('noscroll');
  })
  .on('click', '[data-target=homepage]', function() {
    $('#projects .detailsbox').removeClass('expanded');
    $('#projects .detailsbox .ripple').attr('style', '');

    $('body').removeClass('noscroll');
  });

  $(document).on('click', 'a[href^=#]:not([href^="#!"])', function (e) {
    e.preventDefault();

    var target = this.hash,
        $target = $(target);

    if (target === '') {
      $target = $('body');
    }

    $('html, body').stop().animate({
      scrollTop: $target.offset().top - 100
    }, 500, 'swing', function () {
      window.location.hash = target;
    });
  });

  $('#getintouch form').submit(function(e) {
    e.preventDefault();
    var $this = $(this);

    $.post('/sendmail', $(this).serialize())
    .done(function() {
      $.snackbar({
        content: 'Richiesta inviata! Risponderò al più presto.',
        style: 'toast'
      });
      $this.trigger('reset');
    }).fail(function() {
      $.snackbar({
        content: 'Si è verificato un errore durante l’invio, per favore riprova più tardi.',
        style: 'toast'
      });
    });

  });

  $(window).hashchange({
    hash: '#!/projects/%s',
    regex: true,
    onSet: function(arr) {
      var project = arr[0];
      $('[href="#!/projects/' + project + '"]').trigger('click');
    },
    onRemove:function(){
      $('.detailsbox').removeClass('expanded');
      $('body').removeClass('noscroll');
    }
  });

  $(document).on('mousewheel', function(e) {
    if ($(document).is(e.target)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  });
});
