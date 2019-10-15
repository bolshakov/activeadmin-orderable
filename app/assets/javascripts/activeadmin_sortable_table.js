(function($) {
  $(document).ready(function() {
    $('.handle').closest('tbody').activeAdminSortableTable();
  });

  $.fn.activeAdminSortableTable = function() {
    this.sortable({
      handle: ".handle",
      update: function(event, ui) {
        var item = ui.item.find('[data-sort-url]');
        var url = item.data('sort-url');
        var customParams = {};
        if (typeof item.data('sort-custom-params') === 'object') {
          customParams = item.data('sort-custom-params');
        }

        var nextElement = ui.item[0].nextElementSibling;

        var nextPosition = $(nextElement).find('[data-position]').data('position');
        var currentPosition = ui.item.find('[data-position]').data('position');

        if(nextPosition === undefined || nextPosition > currentPosition) {
          // moved down
          var previousElement = ui.item[0].previousElementSibling;
          var previousPosition = $(previousElement).find('[data-position]').data('position');
          var newPosition = previousPosition;
        } else {
          // moved up
          var newPosition = nextPosition;
        }

        var AUTH_TOKEN = $('meta[name=csrf-token]').attr('content');
        $.ajax({
          url: url,
          type: 'post',
          data: $.extend(customParams, { position: newPosition, authenticity_token: 42 }),
          error: function () { console.error('Saving sortable error'); },
          success: function () {
            location.href = location.href;
          },
          async: false
        });
      }
    });

    this.disableSelection();
  }
})(jQuery);
