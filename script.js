document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('nameInput');
    const addNameButton = document.getElementById('addName');
    const drawNameButton = document.getElementById('drawName');
    const nameList = document.getElementById('nameList');
    const resultDisplay = document.getElementById('result');
    const historyDisplay = document.getElementById('history');
    let names = [];
    let roundNumber = 1;
    let history = [];

    addNameButton.addEventListener('click', () => {
        const name = nameInput.value.trim();
        if (name) {
            names.push(name);
            displayNames();
            nameInput.value = '';
            nameInput.focus();
        } else {
            alert('Voer een geldige naam in.');
        }
    });

    function displayNames() {
        nameList.innerHTML = '';
        names.forEach((name, index) => {
            const li = document.createElement('li');
            li.textContent = name + " ";
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Verwijder';
            deleteBtn.addEventListener('click', () => {
                names.splice(index, 1);
                displayNames();
            });
            li.appendChild(deleteBtn);

            nameList.appendChild(li);
        });
    }

    drawNameButton.addEventListener('click', () => {
        if (names.length > 0) {
            const index = Math.floor(Math.random() * names.length);
            const drawnName = names.splice(index, 1)[0];
            resultDisplay.textContent = `Getrokken naam: ${drawnName}`;
            history.push({round: roundNumber, name: drawnName});
            displayNames();
            updateHistoryDisplay();
        } else {
            resultDisplay.textContent = `Dit is het einde van ronde ${roundNumber}.`;
            offerNewRound();
        }
    });

    function offerNewRound() {
        const newRoundBtn = document.createElement('button');
        newRoundBtn.textContent = 'Start Nieuwe Ronde';
        newRoundBtn.addEventListener('click', () => {
            startNewRound();
            resultDisplay.innerHTML = ''; // Reset resultDisplay voor nieuwe ronde
            newRoundBtn.remove(); // Verwijder de 'Start Nieuwe Ronde' knop
        });
        resultDisplay.appendChild(newRoundBtn);
    }

    function startNewRound() {
        const useNamesAgain = confirm("Wilt u alle namen opnieuw gebruiken voor de nieuwe ronde?");
        if (!useNamesAgain) {
            names = [];
            history = []; // Optioneel, afhankelijk van of je de geschiedenis tussen rondes wilt behouden
        }
        roundNumber++;
        displayNames();
        updateHistoryDisplay(); // Update de geschiedenisweergave als je besluit de geschiedenis te behouden
        resultDisplay.textContent = "Voeg namen toe voor de nieuwe ronde.";
    }

    function updateHistoryDisplay() {
        historyDisplay.innerHTML = '<h3>Trekking Geschiedenis</h3>';
        history.forEach(item => {
            const entry = document.createElement('p');
            entry.textContent = `Ronde ${item.round}: ${item.name}`;
            historyDisplay.appendChild(entry);
        });
    }
});