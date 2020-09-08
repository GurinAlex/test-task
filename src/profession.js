import {isValid} from "./utils";
import {v4 as uuidv4} from 'uuid';
import {showAlert} from "./alert";

const form = $('#formProfession')[0]
const input = $(form).find('#professionName')[0]
const description = $(form).find('#professionDescription')[0]

const professionsList = {
    list: []
}

export function submitProfessionFormHandler(event) {
    event.preventDefault()
    let profession = {}

    if (isValid(input.value) && isValid(description.value)) {
        profession = {
            professionName: input.value,
            professionDescription: description.value,
            id: uuidv4(),
            date: new Date().toJSON()
        }
        // Async request to server to save profession

        input.value = ''
        description.value = ''

        professionsList.list.push(profession)

        addingProfessionDOM(profession)
    }
}

function changeProfessionHandler(event) {
    event.preventDefault()

    const $target = event.currentTarget
    let input =  $($target).find('#professionName')[0]
    let description = $($target).find('#professionDescription')[0]


    professionsList.list.forEach((item, index) => {
        if (event.currentTarget.id === item.id) {
            item.professionName = input.value
            item.professionDescription = description.value

            showAlert('change')
        }
        // Async request to server to change profession info by id
    })
}

function removeProfession(classId) {
    professionsList.list.forEach((item, index) => {
        if (classId === item.id) {
            professionsList.list.splice(index, 1)

            showAlert('remove')
        }
        // Async request to server to remove profession by id
    })
    $(`#${classId}`).remove()
}

function addingProfessionDOM(profession) {
    const $node = `
        <div id=${profession.id} class="profession-list__item">
         <form>
         <div class="wrapper">
                        <div class="form-group">
                            <label for="professionName">Наименование</label>
                            <input
                                    type="text"
                                    class="form-control"
                                    id="professionName"
                                    required
                                    minlength="1"
                                    maxlength="256"
                                    value=${profession.professionName}
                            >
                        </div>
                        <div class="form-group">
                            <label for="professionDescription">Описание</label>
                            <textarea
                                    class="form-control"
                                    id="professionDescription"
                                    rows="2"
                                    required
                                    minlength="1"
                                    maxlength="512"
                            >${profession.professionDescription}</textarea>
                        </div>
                        </div>

                    <div class="btn">
                        <button
                                type="submit"
                                class="btn btn-warning"
                                id="changeProfession"
                        >
                            Изменить
                        </button>
                        <button
                                class="btn btn-danger"
                                id=${profession.id + 'removeProfession'}
                        >
                            Удалить
                        </button>
                        </div>
                    </form>
                    
</div>
    `

    $('.profession-list').append($node)
    $(`#${profession.id}`).on('submit', changeProfessionHandler)
    $(`#${profession.id}removeProfession`).on('click', removeProfession.bind(null, profession.id))
}