$(document).ready(function() {
  var visible = true;
  var menu = $('#menu');
  var cloned = $('#markdown-toc').clone().removeAttr('id');
  cloned.find('ul').removeAttr('id');
  cloned.find('a').each(function(i, elem) {
    $(elem).attr('id', 'float-toc-' + $(elem).attr('id').substring('markdown-toc-'.length));
  });

  menu.append(cloned);

  var originalMenu = $('#markdown-toc');
  var elementTop = originalMenu.offset().top;
  var elementBottom = elementTop + originalMenu.outerHeight();

  var postContent = $('.post-content');
  var offset = postContent.offset(),
      width = postContent.width();
  var left = offset.left + width - menu.outerWidth();
  menu.css('left', left);

  var headingTops = [];
  originalMenu.find('a').each(function(i, elem) {
    var headingID = $(elem).attr('id').substring('markdown-toc-'.length);
    headingTops.push({name: headingID, top: $('#' + headingID).offset().top});
  });
  var viewportMidHeight = $(window).height() / 2;

  var floatMenuScrolled = false;
  var closestToMiddle = null;
  var diff = 10000;

  window.onscroll = function() {
    var pageTop = $(window).scrollTop();

    if (visible === true && elementBottom < pageTop) {
      visible = false;
      menu.css('display', 'block');
    }
    else if (visible === false && elementBottom > pageTop) {
      visible = true;
      menu.css('display', 'none');
    }

    if (!visible) {
      // Determine which heading is closest to middle of viewport.
      var viewportMid = pageTop + viewportMidHeight;
      // Compute current diff of last closest.
      if (closestToMiddle !== null) {
        diff = Math.abs(viewportMid - headingTops[closestToMiddle].top);
      }

      for (var i = 0; i < headingTops.length; i++) {
        if (headingTops[i].top > pageTop && headingTops[i].top < viewportMid) {
          var newDiff = viewportMid - headingTops[i].top;
          if (newDiff < diff) {
            diff = newDiff;
            floatMenuScrolled = false;
            closestToMiddle = i;
          }
        }
        else if (headingTops[i].top > viewportMid) {
          break; // Don't process headings below middle of viewport.
        }
      }

      if (closestToMiddle !== null && !floatMenuScrolled) {
        // Adjust floating menu to show current header at center.
        var floatMenuScrollTop = $('#float-toc-' + headingTops[closestToMiddle].name).position().top;
        $('#menu').scrollTop(floatMenuScrollTop);
        floatMenuScrolled = true;
      }
    }
  };
});
