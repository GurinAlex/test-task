import {isValid} from "./utils";
import {v4 as uuidv4} from 'uuid';
import {showAlert} from "./alert";

const form = $('#formDepartment')[0]
const inputName = $(form).find('#departmentName')[0]
const inputParent = $(form).find('#departmentParent')[0]
const descriptionDepartment = $(form).find('#departmentDescription')[0]

const departmentList = {
    list: []
}

export function submitDepartmentFormHandler(event) {
    event.preventDefault()

    let department = {}

    if (isValid(inputName.value) && isValid(descriptionDepartment.value)) {
        department = {
            departmentName: inputName.value,
            departmentDescription: descriptionDepartment.value,
            departmentParent: inputParent.value || '',
            id: uuidv4(),
            date: new Date().toJSON()
        }

        // Async request to server to save department

        inputName.value = ''
        descriptionDepartment.value = ''
        inputParent.value = ''

        departmentList.list.push(department)

        addingDepartmentDOM(department)
    }
}

function changeDepartmentHandler(event) {
    event.preventDefault()

    const $target = event.currentTarget
    let inputName = $($target).find('#departmentName')[0]
    let inputParent = $($target).find('#departmentParent')[0]
    let descriptionDepartment = $($target).find('#departmentDescription')[0]


    departmentList.list.forEach((item, index) => {
        if (event.currentTarget.id === item.id) {
            item.departmentName = inputName.value
            item.departmentDescription = descriptionDepartment.value
            item.departmentParent = inputParent.value

            showAlert('change')
        }
        // Async request to server to change department info by id
    })
}

function removeDepartment(classId) {
    departmentList.list.forEach((item, index) => {
        if (classId === item.id) {
            departmentList.list.splice(index, 1)

            showAlert('remove')
        }
        // Async request to server to remove department by id
    })
    $(`#${classId}`).remove()
}

function addingDepartmentDOM(department) {
    const $node = `
        <div id=${department.id} class="department-list__item">
         <form>
         <div class="wrapper">
                        <div class="form-group">
                            <label for="departmentName">Наименование</label>
                            <input
                                    type="text"
                                    class="form-control"
                                    id="departmentName"
                                    required
                                    minlength="1"
                                    maxlength="256"
                                    value=${department.departmentName}
                            >
                        </div>
                        
                         <div class="form-group">
                            <label for="departmentParent">Родительский отдел</label>
                            <input
                                    type="text"
                                    class="form-control"
                                    id="departmentParent"
                                    value=${department.departmentParent}
                            >
                        </div>
                        
                        <div class="form-group">
                            <label for="departmentDescription">Описание</label>
                            <textarea
                                    class="form-control"
                                    id="departmentDescription"
                                    rows="2"
                                    required
                                    minlength="1"
                                    maxlength="512"
                            >${department.departmentDescription}</textarea>
                        </div>
                        </div>

                    <div class="btn">
                        <button
                                type="submit"
                                class="btn btn-warning"
                                id="changeDepartment"
                        >
                            Изменить
                        </button>
                        <button
                                class="btn btn-danger"
                                id=${department.id + 'removeDepartment'}
                        >
                            Удалить
                        </button>
                        </div>
                    </form>
                    
</div>
    `

    $('.department-list').append($node)
    $(`#${department.id}`).on('submit', changeDepartmentHandler)
    $(`#${department.id}removeDepartment`).on('click', removeDepartment.bind(null, department.id))
}
