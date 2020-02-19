const selector = '.js-scroll-to-top';

if ($(selector).length) {
  $(selector).click((event) => {
    event.preventDefault();

    $('html, body').animate({
      scrollTop: 0,
    }, 2000);
  });
}
