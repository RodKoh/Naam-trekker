let namen = [];
let getrokkenNamen = [];
let rondesGeschiedenis = [];

function voegNaamToe() {
    const naamInput = document.getElementById('naamInput');
    const naam = naamInput.value.trim();
    if (naam && !namen.includes(naam)) {
        namen.push(naam);
        updateNamenLijst();
        naamInput.value = ''; // Reset inputveld
        // Zorg ervoor dat de "Trek naam" knop zichtbaar is wanneer er namen zijn om te trekken.
        document.getElementById('trekNaamKnop').style.display = '';
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
        // Update de lijsten zonder de integriteit van de geschiedenis te beïnvloeden.
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
        // Voeg getrokken naam toe aan de huidige ronde in de geschiedenis.
        if (rondesGeschiedenis.length === 0 || getrokkenNamen.length === 1) {
            // Start een nieuwe ronde als dit de eerste getrokken naam is.
            rondesGeschiedenis.push([getrokkenNaam]);
        } else {
            // Voeg toe aan de huidige ronde.
            rondesGeschiedenis[rondesGeschiedenis.length - 1].push(getrokkenNaam);
        }
        document.getElementById('getrokkenNamen').innerHTML += `<li>${getrokkenNaam}</li>`;
        if (getrokkenNamen.length === namen.length) {
            // Verberg "Trek naam" knop als alle namen getrokken zijn.
            document.getElementById('trekNaamKnop').style.display = 'none';
        }
    } else {
        alert('Alle namen zijn getrokken voor deze ronde.');
    }
}

function startNieuweRonde() {
    if (getrokkenNamen.length < namen.length && !confirm('Nog niet alle namen zijn getrokken. Wil je toch een nieuwe ronde starten?')) {
        return;
    }
    if (getrokkenNamen.length > 0) {
        // Niet nodig om een nieuwe lege ronde te starten in de geschiedenis hier.
        document.getElementById('getrokkenNamen').innerHTML = '';
        getrokkenNamen = [];
    } else if (rondesGeschiedenis.length > 0 && rondesGeschiedenis[rondesGeschiedenis.length - 1].length === 0) {
        // Verwijder de laatste lege ronde als die bestaat.
        rondesGeschiedenis.pop();
    }
    document.getElementById('trekNaamKnop').style.display = namen.length > 0 ? '' : 'none'; // Toon of verberg de "Trek naam" knop afhankelijk van of er namen zijn om te trekken.
    updateGeschiedenis();
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