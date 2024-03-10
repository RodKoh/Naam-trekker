let namen = [];
let getrokkenNamen = []; // Namen die in de huidige ronde zijn getrokken
let rondesGeschiedenis = []; // Elke ronde's getrokken namen voor de geschiedenis

function voegNaamToe() {
    const naamInput = document.getElementById('naamInput');
    const naam = naamInput.value.trim();
    if (naam && !namen.includes(naam)) {
        namen.push(naam);
        updateNamenLijst();
        naamInput.value = ''; // Reset inputveld
        // Toon de "Trek naam" knop weer als er namen zijn om te trekken.
        document.getElementById('trekNaamKnop').style.display = 'inline';
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
        if (getrokkenNamen.includes(naam)) {
            getrokkenNamen = getrokkenNamen.filter(n => n !== naam);
        }
        updateNamenLijst();
        // Toon de "Trek naam" knop als er nog namen zijn om te trekken na het verwijderen van een naam.
        if (namen.length > 0) document.getElementById('trekNaamKnop').style.display = 'inline';
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
    } else {
        alert('Alle namen zijn getrokken voor deze ronde.');
    }
    // Controleer na elke trekking of er nog namen zijn om te trekken.
    if (getrokkenNamen.length === namen.length) {
        document.getElementById('trekNaamKnop').style.display = 'none';
    }
}

function startNieuweRonde() {
    // Voeg de huidige ronde toe aan de geschiedenis als er namen getrokken zijn
    if (getrokkenNamen.length > 0) {
        rondesGeschiedenis.push([...getrokkenNamen]);
        updateGeschiedenis();
    }
    getrokkenNamen = [];
    document.getElementById('getrokkenNamen').innerHTML = '';
    // Toon de "Trek naam" knop aan het begin van de nieuwe ronde als er namen beschikbaar zijn.
    document.getElementById('trekNaamKnop').style.display = namen.length > 0 ? 'inline' : 'none';
    alert('Nieuwe ronde gestart. Je kunt weer namen trekken.');
}

function updateGeschiedenis() {
    const geschiedenisLijst = document.getElementById('trekkingGeschiedenis');
    geschiedenisLijst.innerHTML = '';
    rondesGeschiedenis.forEach((ronde, index) => {
        let li = document.createElement('li');
        li.textContent = `Ronde ${index + 1}: ${ronde.join(', ')}`;
        geschiedenisLijst.appendChild(li);
    });
}

document.getElementById('naamInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        voegNaamToe();
    }
});