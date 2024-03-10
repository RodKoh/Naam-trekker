document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('nameInput');
    const addNameButton = document.getElementById('addName');
    const drawNameButton = document.getElementById('drawName');
    const nameList = document.getElementById('nameList');
    const resultDisplay = document.getElementById('result');
    let names = [];

    // Functie om een naam toe te voegen aan de lijst
    addNameButton.addEventListener('click', () => {
        const name = nameInput.value.trim();
        if(name) {
            names.push(name);
            displayNames();
            nameInput.value = ''; // Reset invoerveld
            nameInput.focus(); // Focus terug naar invoerveld
        } else {
            alert('Voer een geldige naam in.');
        }
    });

    // Functie om de namen weer te geven in de lijst
    function displayNames() {
        nameList.innerHTML = ''; // Leeg de lijst
        names.forEach((name, index) => {
            const li = document.createElement('li');
            li.textContent = name;
            nameList.appendChild(li);
        });
    }

    // Functie om een willekeurige naam te trekken
    drawNameButton.addEventListener('click', () => {
        if(names.length > 0) {
            const index = Math.floor(Math.random() * names.length);
            const drawnName = names.splice(index, 1)[0];
            resultDisplay.textContent = `Getrokken naam: ${drawnName}`;
            displayNames(); // Update de lijst
        } else {
            alert('Geen namen meer om te trekken.');
        }
    });
});