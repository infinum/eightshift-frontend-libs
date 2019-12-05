const selector = '.js-block-accordion';
if ($(selector).length) {
  import('./accordion').then(({ Accordion }) => {
    const accordion = new Accordion({
      parent: selector,
      head: 'js-block-accordion-head',
      content: 'js-block-accordion-content',
      ACTIVE_CLASS: 'is-active',
    });

    accordion.init();

    accordion.$head.on('click', function(e) {
      e.preventDefault();

      const id = $(this).attr('data-head');

      accordion.setActiveItem(id);
    });

  });
}
