let values = JSON.parse( localStorage.getItem("ToDoList")) || [];


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("inputValue").addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            insertValue();
        }
    });
    if(values?.length > 0){
        printList();
    }
});
function reset(){
    localStorage.removeItem("ToDoList");
    values = [];
    printList();
}

function insertValue() {
    let inputValue = document.getElementById("inputValue").value;
    let dateValue = document.getElementById("inputDate").value;
    item ={
        "value": inputValue,
        "date": dateValue}
    values.push(item);
    console.log("Array:", item);
    localStorage.setItem("ToDoList", JSON.stringify(values));
    printList();
}

function removeValue(key) {
    values.splice(key, 1);
    console.log("Array:", values);
    printList();
    localStorage.setItem("ToDoList", JSON.stringify(values));
    printList();
}

function printList(){
    let list = document.querySelector(".list");
    let cont = document.createElement("div");

    values.forEach(function(value, index) {
        let div = document.createElement("div");
        div.classList.add("list-item");
        let date = new Date(value.date);
        
        div.innerHTML = `<span>${value.value}</span> <span>${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}</span> <button class="btn btn-remove" onclick="removeValue(${index})">Rimuovi</button>`;
        cont.appendChild(div);
    });
    list.innerHTML = cont.outerHTML;
}