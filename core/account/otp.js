/*----------- Passcode fields -----------*/
// Autofocus next input field
$('input').keyup(function() {
    if ($(this).val().length == $(this).attr("maxlength")) {
        $(this).closest('.form-input-field-group-1').next().find('input').focus();
    } else if ($(this).val().length == 0) {
        $(this).closest('.form-input-field-group-1').prev().find('input').focus();
    }
});

// Allow only integers
$('input').on('input blur paste', function() {
    $(this).val($(this).val().replace(/\D/g, ''))
});

// Set max length
$('input').attr('maxlength', 1)

