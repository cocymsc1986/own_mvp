$(document).ready(function() {
    $('.more').click(function(e) {
        $(this).toggleClass('open');
        
        if($(this).hasClass('open')) {
            var left = $(this).offset().left;
            var top = $(this).offset().top;
            
            $(this).css('left',left);
            $(this).css('top',top);
        } else {
            $(this).css('left','auto');
            $(this).css('top','auto');
        }
    });
});


