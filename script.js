let namen = [];
let getrokkenNamen = [];
let rondesGeschiedenis = [];
let huidigeRondeIndex = -1; // Index om de huidige ronde bij te houden in rondesGeschiedenis

function voegNaamToe() {
    const naamInput = document.getElementById('naamInput');
    const naam = naamInput.value.trim();
    if (naam && !namen.includes(naam)) {
        namen.push(naam);
        updateNamenLijst();
        naamInput.value = ''; // Reset inputveld
        document.getElementById('trekNaamKnop').style.display = ''; // Toon de "Trek naam" knop
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
        // Verwijder naam niet uit huidigeRonde in rondesGeschiedenis om geschiedenisintegriteit te behouden
        updateNamenLijst();
    }
}

function trekNaam() {
    if (namen.length === 0) {
        alert('Voeg eerst namen toe voor de trekking.');
        return;
    }
    if (getrokkenNamen.length === 0) {
        // Start een nieuwe ronde als dit de eerste trekking is
        startNieuweRondeIntern();
    }
    let nogNietGetrokken = namen.filter(naam => !getrokkenNamen.includes(naam));
    if (nogNietGetrokken.length > 0) {
        let getrokkenNaam = nogNietGetrokken[Math.floor(Math.random() * nogNietGetrokken.length)];
        getrokkenNamen.push(getrokkenNaam);
        rondesGeschiedenis[huidigeRondeIndex].push(getrokkenNaam); // Voeg toe aan de huidige ronde in geschiedenis
        document.getElementById('getrokkenNamen').innerHTML += `<li>${getrokkenNaam}</li>`;
        if (getrokkenNamen.length === namen.length) {
            document.getElementById('trekNaamKnop').style.display = 'none'; // Verberg "Trek naam" knop
        }
    } else {
        alert('Alle namen zijn getrokken voor deze ronde.');
    }
}

function startNieuweRonde() {
    if (getrokkenNamen.length < namen.length && !confirm('Nog niet alle namen zijn getrokken. Wil je toch een nieuwe ronde starten?')) {
        return;
    }
    startNieuweRondeIntern();
    updateGeschiedenis();
    document.getElementById('getrokkenNamen').innerHTML = '';
    document.getElementById('trekNaamKnop').style.display = ''; // Toon de "Trek naam" knop
    alert('Nieuwe ronde gestart. Je kunt weer namen trekken.');
}

function startNieuweRondeIntern() {
    getrokkenNamen = [];
    huidigeRondeIndex++;
    rondesGeschiedenis[huidigeRondeIndex] = []; // Initieer een nieuwe ronde in de geschiedenis
}

function updateGeschiedenis() {
    const geschiedenisLijst = document.getElementById('trekkingGeschiedenis');
    geschiedenisLijst.innerHTML = ''; // Reset de lijst
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