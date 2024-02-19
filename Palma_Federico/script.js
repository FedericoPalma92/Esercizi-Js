//inizializzo l'array delle prenotazioni con i dati salvati in locale oppure con un array vuoto
let reservations = JSON.parse(localStorage.getItem("Reservations")) || [];

//creo un evento che si attiva quando la pagina è stata caricata
document.addEventListener("DOMContentLoaded", function () {
    //stampo a video le prenotazioni
    printReservations();
});

//creo una funzione per inserire i dati della prenotazione nell'array prendendoli dai campi di input
function addReservation() {
    //prendo l'oggetto con id name
    let nameField = document.querySelector("#name");
    //prendo il valore del nominativo dal campo di input con id Name
    let name = nameField.value;
    //prendo l'oggetto con id taxCode
    let taxCodeField = document.querySelector("#taxCode");
    //prendo il valore del Codice Fiscale dal campo di input con id taxCode
    let taxCode = taxCodeField.value;
    //prendo l'oggetto con id date
    let dateField = document.querySelector("#date");
    //prendo il valore della data dal campo di input con id date
    let date = dateField.value;
    //controllo che tutti i campi siano stati compilati
    if (!name || !taxCode || !date) {
        //se manca un campo lancio un alert
        alert("Compila tutti i campi");
        return;
    }
    //controllo che la data non sia nel passato
    if(date < new Date().toISOString().split("T")[0]){
        alert("La data non può essere nel passato");
        return;
    }
    //creo un oggetto con i dati della prenotazione
    let reservation = {
        name: name,
        taxCode: taxCode,
        date: date,
    };
    //aggiungo l'oggetto all'array delle prenotazioni
    reservations.push(reservation);
    //salvo l'array delle prenotazioni nel localstorage per poterlo recuperare in seguito
    localStorage.setItem("Reservations", JSON.stringify(reservations));
    //pulisco i campi di input
    nameField.value = "";
    taxCodeField.value = "";
    dateField.value = "";
    //stampo a video le prenotazioni
    printReservations();
}

//creo una funzione per stampare a video le prenotazioni nel div con classe reservation-list
function printReservations() {
    if (reservations.length === 0) {
        document.querySelector(".reservation-list").innerHTML = "Nessuna prenotazione";
        return;
    }
    else {
        //prendo il div con classe reservation-list
        let reservationList = document.querySelector(".reservation-list");

        // creo un oggetto tabella
        let table = document.createElement("table");
        //aggiungo la classe table alla tabella
        table.classList.add("table");
        // creo un oggetto riga
        let row = document.createElement("tr");
        // creo le celle di intestazione
        let nameCell = document.createElement("th");
        nameCell.innerHTML = "Nome";
        let taxCodeCell = document.createElement("th");
        taxCodeCell.innerHTML = "Codice Fiscale";
        let dateCell = document.createElement("th");
        dateCell.innerHTML = "Data";
        let btnCell = document.createElement("th");
        // aggiungo le celle di intestazione alla riga
        row.appendChild(nameCell);
        row.appendChild(taxCodeCell);
        row.appendChild(dateCell);
        row.appendChild(btnCell);
        // aggiungo la riga alla tabella
        table.appendChild(row);


        //ciclo l'array delle prenotazioni
        for (let i = 0; i < reservations.length; i++) {
            //creo una riga della tabella
            let row = document.createElement("tr");
            //creo una cella per il nome
            let nameCell = document.createElement("td");
            //inserisco il nome nella cella\
            nameCell.innerHTML = reservations[i].name;
            console.log("Name:", reservations[i].name);
            //aggiungo la cella alla riga
            row.appendChild(nameCell);
            //creo una cella per il codice fiscale
            let taxCodeCell = document.createElement("td");
            //inserisco il codice fiscale nella cella
            taxCodeCell.innerHTML = reservations[i].taxCode;
            //aggiungo la cella alla riga
            row.appendChild(taxCodeCell);
            //creo una cella per la data
            let dateCell = document.createElement("td");
            //inserisco la data nella cella
            const date = new Date(reservations[i].date);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            dateCell.innerHTML = `${day}/${month}/${year}`;
            //aggiungo la cella alla riga
            row.appendChild(dateCell);
            //creo una cella per il pulsante di cancellazione
            let btnCell = document.createElement("td");
            //creo un pulsante
            let btn = document.createElement("button");
            //aggiungo la classe btn-remove al pulsante
            btn.classList.add("btn-remove");

            //aggiungo il testo al pulsante
            btn.innerHTML = "Cancella";
            //aggiungo l'onclick al pulsante che chiama la funzione deleteReservation passando l'indice della prenotazione
            btn.setAttribute("onclick", `deleteReservation("${i}")`);
            //aggiungo il pulsante alla cella
            btnCell.appendChild(btn);
            //aggiungo le celle alla riga
            row.appendChild(btnCell);
            //aggiungo la riga alla tabella
            table.appendChild(row);
        }
        //inserisco la stringa nel div reservationList
        reservationList.innerHTML = table.outerHTML;
    }

}

//creo una funzione per cancellare una prenotazione
function deleteReservation(index) {
    //cancello la prenotazione dall'array
    reservations.splice(index, 1);
    //salvo l'array nel localstorage
    localStorage.setItem("Reservations", JSON.stringify(reservations));
    //stampo a video le prenotazioni
    printReservations();
    //lancio un alert per avvisare l'utente che la prenotazione è stata cancellata
    //inserisco l'allert in un setTimeout per evitare che venga lanciato prima che la lista sia stata aggiornata
    setTimeout(function() {
        alert("Prenotazione cancellata");
    },10)
    

}