import {isValid} from "./utils";
import {v4 as uuidv4} from 'uuid';
import {showAlert} from "./alert";

const form = $('#formStaff')[0]
const inputFIO = $(form).find('#staffFIO')[0]
const inputProfession = $(form).find('#staffProfession')[0]
const inputDepartment = $(form).find('#staffDepartment')[0]
const description = $(form).find('#staffDescription')[0]

const staffList = {
    list: []
}

export function submitStaffFormHandler(event) {
    event.preventDefault()

    let staff = {}

    if (isValid(inputFIO.value) && isValid(inputProfession.value) &&
        isValid(inputDepartment.value) && isValid(description.value)) {

        staff = {
            staffFIO: inputFIO.value,
            staffDescription: description.value,
            staffDepartment: inputDepartment.value,
            staffProfession: inputProfession.value,
            id: uuidv4(),
            date: new Date().toJSON()
        }
        // Async request to server to save staff

        inputFIO.value = ''
        description.value = ''
        inputProfession.value = ''
        inputDepartment.value = ''

        staffList.list.push(staff)

        addingStaffDOM(staff)
    }
}

function changeStaffHandler(event) {
    event.preventDefault()

    const $target = event.currentTarget
    const inputFIO = $($target).find('#staffFIO')[0]
    const inputProfession = $($target).find('#staffProfession')[0]
    const inputDepartment = $($target).find('#staffDepartment')[0]
    const description = $($target).find('#staffDescription')[0]


    staffList.list.forEach((item, index) => {
        if (event.currentTarget.id === item.id) {
            item.staffFIO = inputFIO.value
            item.staffDescription = description.value
            item.staffDepartment = inputDepartment.value
            item.staffProfession = inputProfession.value

            showAlert('change')
        }
        // Async request to server to change staff info by id
    })
}

function removeStaff(classId) {
    staffList.list.forEach((item, index) => {
        if (classId === item.id) {
            staffList.list.splice(index, 1)

            showAlert('remove')
        }
        // Async request to server to remove staff by id
    })
    $(`#${classId}`).remove()
}

function addingStaffDOM(staff) {
    const $node = `
        <div id=${staff.id} class="staff-list__item">
        <form id="formStaff">
        <div class="wrapper">
                        <div class="form-group">
                            <label for="staffFIO">ФИО</label>
                            <input
                                    type="text"
                                    class="form-control"
                                    id="staffFIO"
                                    value=${staff.staffFIO}
                                    required
                                    minlength="1"
                                    maxlength="256"
                            >
                        </div>

                        <div class="form-group">
                            <label for="staffProfession">Профессия</label>
                            <input
                                    type="text"
                                    class="form-control"
                                    id="staffProfession"
                                    value=${staff.staffProfession}
                                    required
                                    minlength="1"
                                    maxlength="256"
                            >
                        </div>

                        <div class="form-group">
                            <label for="staffDepartment">Отдел</label>
                            <input
                                    type="text"
                                    class="form-control"
                                    id="staffDepartment"
                                    value=${staff.staffDepartment}
                                    required
                                    minlength="1"
                                    maxlength="256"
                            >
                        </div>

                        <div class="form-group">
                            <label for="staffDescription">Описание</label>
                            <textarea
                                    class="form-control"
                                    id="staffDescription"
                                    rows="2"
                                    required
                                    minlength="1"
                                    maxlength="512"
                            >${staff.staffDescription}</textarea>
                        </div>
                        </div>

                        <div class="btn">
                        <button
                                type="submit"
                                class="btn btn-warning"
                                id="changeStaff"             
                        >
                            Изменить
                        </button>
                        <button
                                class="btn btn-danger"
                                id=${staff.id + 'removeStaff'}
                        >
                            Удалить
                        </button>
                        </div>
                    </form>
</div>
    `

    $('.staff-list').append($node)
    $(`#${staff.id}`).on('submit', changeStaffHandler)
    $(`#${staff.id}removeStaff`).on('click', removeStaff.bind(null, staff.id))
}
