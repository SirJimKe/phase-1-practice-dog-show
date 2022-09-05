document.addEventListener('DOMContentLoaded', ()=>{
    fetchDogs();
    submitEdit();
})

let dogID; 

function renderDogs(dog){
    const tableBody = document.querySelector('#table-body');
    const form = document.querySelector('form')

    const tr = document.createElement('tr');
    const td = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');
    const button = document.createElement('button');

    td.textContent = dog.name;
    td2.textContent = dog.breed;
    td3.textContent = dog.sex;
    button.textContent = "Edit Dog";

    td4.appendChild(button);
    tr.append(td, td2, td3, td4);
    tableBody.appendChild(tr);

    button.addEventListener('click', ()=>{
        fetch(`http://localhost:3000/dogs/${dog.id}`)
        .then(responce => responce.json())
        .then(data=>{
            console.log(data)
            form.name.value = dog.name;
            form.breed.value = dog.breed;
            form.sex.value = dog.sex;
            dogID = dog.id;
        })
    })
}

function fetchDogs(){
    fetch('http://localhost:3000/dogs')
    .then(responce => responce.json())
    .then(data => data.forEach(renderDogs))
    .catch(error=>console.log(error));
}


function submitEdit(){
    const form = document.querySelector('form')
    form.addEventListener('submit', (event)=>{
        event.preventDefault();

        const newValues = {
            name: form.name.value,
            breed: form.breed.value,
            sex: form.sex.value,
        }
        handleEdits(dogID, newValues);
       
    })
}

function handleEdits(dogID, newValues){
    fetch(`http://localhost:3000/dogs/${dogID}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(newValues)
    })
    .then(res => res.json())
    .then(data => console.log(data))
}