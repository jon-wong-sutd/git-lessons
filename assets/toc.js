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

  var floatMenuHeight = menu.height();

  // Shows a floating toc when the fixed toc scrolls out of view.
  // Also scrolls the floating toc to show the currently viewed heading(s).
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
        var anchorID = '#float-toc-' + headingTops[closestToMiddle].name;
        // Get top of item relative to top of parent (not relative to scrollTop!).
        var floatMenuScrollTop = $(anchorID).position().top + $('#menu').scrollTop();
        floatMenuScrollTop -= 0.5 * floatMenuHeight; // Show item in middle of floating menu.
        $('#menu').scrollTop(floatMenuScrollTop);
        floatMenuScrolled = true;
      }
    }
  };

  // Allows the floating toc to be dragged anywhere.
  menu[0].addEventListener('dragstart', function(event) {
    var style = window.getComputedStyle(event.target, null);
    var leftOffset = parseInt(style.getPropertyValue("left"),10) - event.clientX;
    var topOffset = parseInt(style.getPropertyValue("top"),10) - event.clientY;
    event.dataTransfer.setData("text/plain", leftOffset + ',' + topOffset);
  }, false);
  document.body.addEventListener('dragover', function(event) {
    event.preventDefault();
    return false;
  }, false);
  document.body.addEventListener('drop', function(event) {
    var offset = event.dataTransfer.getData("text/plain").split(',');
    menu[0].style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
    menu[0].style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
    event.preventDefault();
    return false;
  }, false);
});
