// Add a class to the nav after scrolling a certain distance down the page.
$(window).scroll(function () {
    if ($(window).scrollTop() >= 800) {
        $('nav').addClass('navbar-short');
    } else {
        $('nav').removeClass('navbar-short');
    }
});

$('#readmore').on('click', function () {
    $('html, body').animate({
        scrollTop: $('#content').offset().top - 100
    }, 1000);
    return false;
});

$(window).on('resize', function () {
    drawLines();
});

// For each 'star' heading, connect it to the related image border.
function drawLines() {

    // Don't need to do this for mobiles...
    if (typeof window.orientation !== 'undefined') {
        return;
    }

    $('.brave-line').remove();

    $('.brave-star').each(function () {

        var $this = $(this);

        var curr_position = {
                top: $this.offset().top + 2,
                left: $this.offset().left + 2
            },
            lines = $this.data('draw-line').split(':'),
            column_width = $('.col-md-4').width() / 4;

        for (var i = 0; i < lines.length; i++) {
            var newline = $('<div class="brave-line"/>');
            switch (lines[i].substr(0, 1)) {
                case 'l':
                    newline.addClass('brave-line-h').css({
                        left  : curr_position.left - (column_width * lines[i].substr(1, 1)),
                        top   : curr_position.top,
                        width : column_width * lines[i].substr(1, 1)
                    });
                    curr_position.left -= column_width * lines[i].substr(1, 1);
                    break;
                case 'r':
                    newline.addClass('brave-line-h').css({
                        left  : curr_position.left,
                        top   : curr_position.top,
                        width : column_width * lines[i].substr(1, 1)
                    });
                    curr_position.left += column_width * lines[i].substr(1, 1);
                    break;
                case 'u':
                    newline.addClass('brave-line-v').css({
                        left   : curr_position.left,
                        top    : curr_position.top - (20 * lines[i].substr(1, 1)) - 10,
                        height : 20 * lines[i].substr(1, 1) + 10
                    });
                    curr_position.top -= (20 * lines[i].substr(1, 1) + 10);
                    break;
                case 'd':
                newline.addClass('brave-line-v').css({
                    left   : curr_position.left,
                    top    : curr_position.top,
                    height : 20 * lines[i].substr(1, 1)
                });
                curr_position.top += 20 * lines[i].substr(1, 1);
            }
            $('body').append(newline);
        }

    });

}

$(document).ready(function () {
    drawLines();
});
