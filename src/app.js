import './scss/index.scss'
import './profession'
import {submitProfessionFormHandler} from './profession'
import {submitStaffFormHandler} from "./staff";
import {submitDepartmentFormHandler} from "./departmant";

let state = {
    activeSection: 'Профессии'
}

$(document).ready(function () {
    $('.navigation-sections').on('click', '.navigation-sections__item', function () {

        $('.navigation-sections .navigation-sections__item').removeClass('active')

        if (this['innerText'] !== state.activeSection) {
            const prevSection = sectionToClassName(state.activeSection)

            state.activeSection = this['innerText']

            $(this).addClass('active')

            changeSectionHandler(this['innerText'], prevSection)
        }

    })
    $('#formProfession').on('submit', submitProfessionFormHandler)
    $('#formStaff').on('submit', submitStaffFormHandler)
    $('#formDepartment').on('submit', submitDepartmentFormHandler)
})


function changeSectionHandler(section, prevSection) {

    if (section === 'Профессии') {
        $(`.${prevSection}`).removeClass('visible');

        $('.profession').addClass('visible');
    }

    if (section === 'Отделы') {
        $(`.${prevSection}`).removeClass('visible');

        $('.department').addClass('visible');
    }

    if (section === 'Сотрудники') {
        $(`.${prevSection}`).removeClass('visible');

        $('.staff').addClass('visible');
    }

}

function sectionToClassName (name) {
    switch (name) {
        case 'Профессии':
            return 'profession';
        case 'Отделы':
            return 'department';
        case 'Сотрудники':
            return 'staff';
        default:
            return null

    }
}