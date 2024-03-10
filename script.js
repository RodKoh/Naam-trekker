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
        document.getElementById('trekNaamKnop').style.display = ''; // Toon "Trek naam" knop
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
        // Update ook de getrokkenNamen als deze naam al getrokken was.
        getrokkenNamen = getrokkenNamen.filter(n => n !== naam);
        updateNamenLijst();
        // Zorg dat de "Trek naam" knop zichtbaar blijft als er nog namen over zijn.
        if (namen.length !== getrokkenNamen.length) {
            document.getElementById('trekNaamKnop').style.display = '';
        }
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
        document.getElementById('trekNaamKnop').style.display = 'none'; // Verberg de "Trek naam" knop
    }
}

function startNieuweRonde() {
    if (getrokkenNamen.length > 0) {
        rondesGeschiedenis.push([...getrokkenNamen]); // Voeg de getrokken namen toe aan de geschiedenis
    }
    getrokkenNamen = [];
    document.getElementById('getrokkenNamen').innerHTML = '';
    document.getElementById('trekNaamKnop').style.display = namen.length > 0 ? '' : 'none'; // Toon of verberg de knop
    alert('Nieuwe ronde gestart. Je kunt weer namen trekken.');
    updateGeschiedenis();
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