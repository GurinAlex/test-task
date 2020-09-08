

export function showAlert(alertType) {
    if (alertType === 'change') {
        $('.alert-success').addClass('alert-vision')
        setTimeout(() => {
            $('.alert-success').removeClass('alert-vision')
        }, 3000)
    }

    if (alertType === 'remove') {
        $('.alert-danger').addClass('alert-vision')
        setTimeout(() => {
            $('.alert-danger').removeClass('alert-vision')
        }, 3000)
    }
}