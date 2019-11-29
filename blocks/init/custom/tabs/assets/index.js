const selector = '.js-block-tabs';
if ($(selector).length) {
  import('./tabs').then(({ Tabs }) => {
    const tabs = new Tabs(
      parent = selector,
      head = 'js-block-tabs-head',
      content = 'js-block-tabs-content',
      ACTIVE_CLASS = 'is-active',
    );

    tabs.init();

    tabs.$head.on('click', function(e) {
      e.preventDefault();

      const id = $(this).attr('data-tab');

      tabs.setActiveItem(id);
    });

  });
}
