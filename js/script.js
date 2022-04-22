let arr = [1, 2, 3, 4, 5]

for (let i = 0; i < arr.length; i++) {
    console.log(arr[i])
}

let map = arr.map((element) => {console.log(element)})
console.log(map)
let forEach = arr.forEach((element) => {console.log(element)})
console.log(forEach)

let arrObj = [
    { name: 'Aibek', surname: 'Aibekov', age: 23 },
    { name: 'Islam', surname: 'Islamov' }
]

for (let i = 0; i < arrObj.length; i++) {
    console.log(arrObj[i].name, arrObj[i].surname)
}

arrObj.map((element) => {
    console.log(element.name, element.surname)
})

arrObj.map(({ name, surname, age }) => {
    console.log(name, surname)
})