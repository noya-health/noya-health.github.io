/*----------- Disable right click context menu -----------*/
$('.tempnocontext').attr('oncontextmenu', 'return false;');

/*----------- Prevent unwanted anchor links behaviour -----------*/
$('a[href="#"]').click(function (event) {
    event.preventDefault();
});

/*----------- Modal -----------*/
// Open modal
$("[id^='btn-modal']").on('click', function () {
    $(".section-modal").addClass("show visible");
    // Matches button attr to element with relevant id to open modal
    var modalContainer = $(this).attr('dm-container');
    $('#' + modalContainer).addClass('show');

    // Lock body scroll when modal is open
    $('.body-content').css('overflow', 'hidden');

    // Autoclose success/fail feedback modals
    if (modalContainer.startsWith('mc-load')) {
        autocloseModal()
    } else {
    }

    $(this).closest('.modal-container').removeClass("show");

    // Plays animation
    var animId = $('#' + modalContainer).attr('anim-id')
    if ($(window).width() > 991) {
        setTimeout(function () {
            animFuncs[animId]();
        }, 200);
    } else {
        setTimeout(function () {
            animFuncs[animId]();
        }, 400);
    }

});

// Close modal
var timeoutModal;

function autocloseModal() {
    timeoutModal = setTimeout(function () {
        closeModal();
    }, 2500);
}

function closeModal() {
    var sm = $(".section-modal")
    var mc = $('.modal-container')
    sm.removeClass("show");
    clearTimeout(timeoutModal);

    if (sm.find('[class^=lottie-container]').length !== 0) {
        mc.each(function () {
            var animId = $(this).attr('anim-id');
            if ($(window).width() > 991) {
                setTimeout(function () {
                    animResetFuncs[animId]()
                }, 200)
            } else {
                setTimeout(function () {
                    animResetFuncs[animId]()
                }, 400)
            }
        });
    }

    // Desktop close behaviour
    if ($(window).width() > 991) {
        setTimeout(function () {
            sm.removeClass("visible");
        }, 200);
        setTimeout(function () {
            mc.removeClass("show");
        }, 100);
    }
    // Mobile close behaviour
    else {
        setTimeout(function () {
            sm.removeClass("visible");
        }, 400);
        mc.removeClass("show");
    }

    // Restore body scroll
    $(".body-content").css('overflow', 'auto');

    // Clear input fields within modal
    sm.find('input').val('');

    // Scroll modal content back to top
    setTimeout(function () {
        $('[class*=gridbox-modal-section]').scrollTop(0);
    }, 100);

}

// When user clicks the button, close the modal
$(".ui-nav-close-btn-1, .u-close-modal").on('click', function () {
    closeModal();
});

// When user clicks anywhere outside modal, close it
$(document).on('click', function (e) {
    if ($(e.target).is('.modal-container')) {
        closeModal();
    }
});

// Prevent triggering closing on clicks within modal
$(".modal-container").find('[class^=flex-modal-content-parent]').on('click', function (e) {
    e.stopPropagation();
});

// Modal header behaviour
$('[class*=gridbox-modal-section]').scroll(function () {
    showModalHeader($(this));
    showScrolledTitle($(this));
})

// Show header border if content scrolled
function showModalHeader(modalSection) {
    var modalHeader = modalSection.closest('[class*=gridbox-modal-content-child]').find('[class*=gridbox-modal-header-1]')
    if (modalSection.scrollTop() > 20) {
        modalHeader.addClass("show-border");
    } else {
        modalHeader.removeClass("show-border");
    }
}

// Sync modal titles
$('.modal-title-primary').each(function () {
    var primaryTitle = $(this).text();
    var scrolledTitle = $(this).closest('[class*=gridbox-modal-content-child]').find('[class*=flex-modal-scrolled-header] > *')
    scrolledTitle.text(primaryTitle);
});

// Show modal title on header if content scrolled
function showScrolledTitle(modalSection) {
    var primaryTitle = modalSection.find('.modal-title-primary')
    var scrolledTitle = modalSection.closest('[class*=gridbox-modal-content-child]').find('[class*=flex-modal-scrolled-header]')
    var distanceFromTop = primaryTitle.position().top + primaryTitle.outerHeight(true);
    if (modalSection.scrollTop() > distanceFromTop) {
        scrolledTitle.css({
            "opacity": "1"
        });
    } else {
        scrolledTitle.css({
            "opacity": "0"
        });
    }
}

/*----------- Animations -----------*/



const emailDoc1 = bodymovin.loadAnimation({
    container: document.getElementById('lottie-document-emaildoc-1'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: "https://assets5.lottiefiles.com/packages/lf20_BF6OFq.json"
});

const emailDoc2 = bodymovin.loadAnimation({
    container: document.getElementById('lottie-document-emaildoc-2'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: "https://assets5.lottiefiles.com/packages/lf20_BF6OFq.json"
});

