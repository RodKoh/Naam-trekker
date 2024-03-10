let namen = [];
let getrokkenNamen = []; // Namen die in de huidige ronde zijn getrokken
let rondesGeschiedenis = []; // Geschreven aan het einde van elke ronde

function voegNaamToe() {
    const naamInput = document.getElementById('naamInput');
    const naam = naamInput.value.trim();
    if (naam && !namen.includes(naam)) {
        namen.push(naam);
        updateNamenLijst();
        naamInput.value = ''; // Reset inputveld
        document.getElementById('trekNaamKnop').style.display = ''; // Zorg ervoor dat de trekknop zichtbaar is
    } else {
        alert('Deze naam bestaat al of is leeg.');
    }
}

function updateNamenLijst() {
    const namenLijst = document.getElementById('namenLijst');
    namenLijst.innerHTML = '';
    namen.forEach(naam => {
        let li = document.createElement('li');
        li.textContent = naam + " ";
        let verwijderBtn = document.createElement('button');
        verwijderBtn.textContent = 'Verwijder';
        verwijderBtn.onclick = () => verwijderNaam(naam);
        li.appendChild(verwijderBtn);
        namenLijst.appendChild(li);
    });
}

function verwijderNaam(naam) {
    if (confirm('Weet je zeker dat je deze naam wilt verwijderen?')) {
        namen = namen.filter(n => n !== naam);
        updateNamenLijst();
    }
}

function trekNaam() {
    if (namen.length === 0) {
        alert('Voeg eerst namen toe voor de trekking.');
        return;
    }

    let nogNietGetrokken = namen.filter(naam => !getrokkenNamen.includes(naam));
    if (nogNietGetrokken.length > 0) {
        let getrokkenNaam = nogNietGetrokken[Math.floor(Math.random() * nogNietGetrokken.length)];
        getrokkenNamen.push(getrokkenNaam);
        document.getElementById('getrokkenNamen').innerHTML += `<li>${getrokkenNaam}</li>`;

        // Toon de "Trek naam" knop alleen als er nog namen over zijn om te trekken
        if (getrokkenNamen.length === namen.length) {
            document.getElementById('trekNaamKnop').style.display = 'none';
        }
    } else {
        alert('Alle namen zijn getrokken voor deze ronde.');
    }
}

function startNieuweRonde() {
    if (getrokkenNamen.length > 0) {
        // Voeg de getrokken namen toe aan de geschiedenis als er namen getrokken zijn in de huidige ronde
        rondesGeschiedenis.push([...getrokkenNamen]);
        getrokkenNamen = [];
        document.getElementById('getrokkenNamen').innerHTML = '';
        updateGeschiedenis();
        alert('Nieuwe ronde gestart. Je kunt weer namen trekken.');
    } else if (rondesGeschiedenis.length === 0 || rondesGeschiedenis[rondesGeschiedenis.length - 1].length > 0) {
        // Start alleen een nieuwe "lege" ronde als de laatste ronde in de geschiedenis niet leeg is
        rondesGeschiedenis.push([]);
        alert('Nieuwe ronde gestart, maar er zijn nog geen namen getrokken.');
    }
}

function updateGeschiedenis() {
    const geschiedenisLijst = document.getElementById('trekkingGeschiedenis');
    geschiedenisLijst.innerHTML = '';
    rondesGeschiedenis.forEach((ronde, index) => {
        if (ronde.length > 0) { // Toon alleen rondes waarin namen zijn getrokken
            let li = document.createElement('li');
            li.textContent = `Ronde ${index + 1}: ${ronde.join(', ')}`;
            geschiedenisLijst.appendChild(li);
        }
    });
}

document.getElementById('naamInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        voegNaamToe();
    }
});