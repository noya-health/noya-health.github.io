/*----------- Disable right click context menu -----------*/
$('.tempnocontext').attr('oncontextmenu', 'return false;');

/*----------- Prevent unwanted anchor links behaviour -----------*/
$('a[href="#"]').click(function(event){
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

    $(this).closest('.modal-container').removeClass("show");
});

// Close modal
function closeModal() {
    var sm = $(".section-modal")
    var mc = $('.modal-container')
    sm.removeClass("show");

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

/*----------- Mask IC -----------*/
var MaskedIC = $('.text-ic').text().replace(/^.{10}/g, '•••••• •• ');
$('.text-ic-masked').text(MaskedIC);

$('.btn-view-ic').on('mousedown', function() {
    $('.text-ic-masked').hide();
    $('.text-ic').show();
    $(this).text('Shown!');
    $(this).addClass('btn-disabled-1');
})