export function isValid(value) {
    return value.length >= 1
}

export function errorVisualization(tagName) {
    $(`#${tagName}`).addClass('error')
}

export function errorRemoval(tagName) {
    $(`#${tagName}`).removeClass('error')
}