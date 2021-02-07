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

/*----------- Checkboxes -----------*/
// Update button text based on checked checkbox count
var fnUpdateCount = function() {
    var generallen = $("input:checkbox:checked").length;
    console.log(generallen, $("#cb-btn"))
    if (generallen > 0) {
        $("#cb-btn").text('Next · ' + generallen + ' selected');
    } else {
        $("#cb-btn").text('Next');
    }
};

// Dynamically adding checkboxes
$(document).ready(function() {
    $('#btnSaveIssue').click(function(e) {
        addCheckbox($('#newIssue').val());
        e.preventDefault();
        closeModal();
        fnUpdateCount();
        scrollSmoothToBottom()
    });
});

// Update count when new checkboxes added dynamically
$(document).on('change', 'input:checkbox', function() {
    fnUpdateCount();
});

// Change checkbox visual on checked/unchecked
$(document).on('change', 'input:checkbox', function() {
    if ($(this).is(':checked'))
        $(this).parent().addClass('checked');
    else
        $(this).parent().removeClass('checked')
});

function scrollSmoothToBottom () {
    $(".body-content").animate({ scrollTop: $('.body-content').prop("scrollHeight")}, 1500);
}

function addCheckbox(name) {
    var container = $('#cblist');
    var inputs = container.find('input');
    var id = inputs.length + 1;
    $('#cblist').append(
        // class (.checked) added to check checkbox
        $(document.createElement('label')).addClass('w-checkbox form-input-checkbox-group-1 checked')
            .append(
                $('<div />').addClass('w-checkbox-input w-checkbox-input--inputType-custom ui-checkbox-btn w--redirected-checked'))
            .append(
                $('<input />', {
                    type: 'checkbox',
                    'checked': 'checked',
                    id: 'cb' + id,
                    name: "checkbox-2",
                    style: "opacity:0;position:absolute;z-index:-1",
                    onchange: "selectionChanged(this)"
                }).attr('data-name', 'Checkbox 2'))
            .append(
                $('<span />', {
                    text: name
                }).addClass('text2 w-form-label')
                    .append($(document.createElement('br'))))
    );
}