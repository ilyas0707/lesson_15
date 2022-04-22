import { request } from './request.js'

let block = document.getElementById('block')
let select = document.getElementById('select')

// function loading() {
//     let loadingBlock = document.createElement('div')
//     loadingBlock.classList.add('loading')

//     block.appendChild(loadingBlock)

//     setTimeout(() => {
//         loadingBlock.classList.remove('loading')
//         block.removeChild(loadingBlock)
//     }, 2000)
// }

// loading()

let loading = document.createElement('div')
loading.classList.add('loading')
loading.style.gridColumnStart = '2'

block.style.justifyItems = 'center'
block.appendChild(loading)

request('https://final-project-java.herokuapp.com/api/employee', 'GET', null, {})
.then((result) => {

    block.style.justifyItems = 'stretch'
    block.removeChild(loading)
    
    result.map(({ id, name, surname, salary }, i) => {
        let item = document.createElement('div')
        item.setAttribute('data-aos', 'fade-right')
        item.setAttribute('data-aos-delay', `${i * 200}`)

        item.innerHTML = `
            <h2>${name} ${surname}</h2>
            <p>Зарплата: ${salary} сом</p>
            <button class="delete" id="${id}">
                <span class="material-icons">
                    delete
                </span>
            </button>
        `

        item.classList.add('item')

        block.appendChild(item)
    })

    let deleteButtons = document.querySelectorAll('.delete')
    
    deleteButtons.forEach((button) => {
        button.addEventListener('click', () => {
            let conf = confirm('Действительно ли вы хотите удалить сотрудника?')

            if (conf == true) {
                request(`https://final-project-java.herokuapp.com/api/employee/delete/${button.id}`, 'DELETE', null, {}).then(() => {
                    document.location.reload() // Обновить текущую страницу
                })
            } else {
                alert('Сотрудник остаётся')
            }
        })
    })

    result.map(({ id, name, surname }) => {
        let option = document.createElement('option')
        option.innerHTML = `${name} ${surname}` // name + ' ' + surname
        option.value = id

        select.appendChild(option)
    })
})

let inputs = document.querySelectorAll('.input')
let create = document.getElementById('create')
let body = {}

inputs.forEach((input) => {
    input.addEventListener('change', () => {
        body = { ...body, [input.name]: input.value } // spread operator
        // console.log(body)
    })
})

create.addEventListener('click', (event) => {
    event.preventDefault()

    if (inputs[0].value == '' || inputs[1].value == '' || inputs[2].value == '') {
        alert('Поля не должны быть пустыми!')
    } else {
        request('https://final-project-java.herokuapp.com/api/employee/create', 'POST', body, {}).then(() => {
            document.location.reload()
        })
    }

})

let update = document.getElementById('update')

update.onclick = (event) => {
    event.preventDefault()

    if (select.value == 'empty') {
        alert('Нужно выбрать сотрудника!')
    } else {
        if (inputs[0].value == '' || inputs[1].value == '' || inputs[2].value == '') {
            alert('Поля не должны быть пустыми')
        } else {
            request(`https://final-project-java.herokuapp.com/api/employee/update/${select.value}`, 'PUT', body, {}).then(() => {
                document.location.reload()
            })
        }
    }
}