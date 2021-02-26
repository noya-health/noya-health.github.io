/*----------- Mobile menu -----------*/
var mobileOverflowBtn = $(".ui-nav-overflow-website-btn")
var mobileOverflow = $(".nav-links-website-header-parent-1")
var headerLogo = $('.wordmark-header-core')
var timeoutMenu

function closeMobileOverflow() {
    // Prevents visual breaking on continuous event triggers within short amount of time
    clearTimeout(timeoutMenu)
    // Timeout ≈ mobile menu transition time
    timeoutMenu = setTimeout(function () {
        // Prevents mobile menu from disappearing before it fully fades out
        mobileOverflow.removeClass('visible');
        // Prevents flicker when z-index is restored
        mobileOverflowBtn.add(headerLogo).removeClass('front');
    }, 200);
}

mobileOverflowBtn.on('click', function () {
    if ($(this).hasClass('on')) {
        mobileOverflow.removeClass('show');
        $("body").css('overflow', 'auto');
        $(this).removeClass('on');
        closeMobileOverflow();
    } else {
        clearTimeout(timeoutMenu);
        mobileOverflow.addClass('visible');
        mobileOverflow.addClass('show');
        // Btn animation and moving btn + logo z-index
        $(this).addClass('on front');
        headerLogo.addClass('front')
        $("body").css('overflow', 'hidden');
    }
})

/*----------- Mobile CTA -----------*/
$(window).on("load", function () {
    if ($(window).width() > 991) {
    } else {
        $('#cta-header-start').addClass('btn-shadow')
    }
});

/*----------- Desktop navbar -----------*/
function showNavbarHeader() {
    if ($(document).scrollTop() > 50) {
        $('.navbar-website').addClass("show-border");
    } else {
        $('.navbar-website').removeClass("show-border");
    }
}

$(document).scroll(function () {
    if ($(window).width() > 991) {
        showNavbarHeader();
    } else {
    }
})
