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
        toonTrekNaamKnop(true); // Toon de "Trek naam" knop als een nieuwe naam wordt toegevoegd
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
        if (getrokkenNamen.length === namen.length) {
            toonTrekNaamKnop(false); // Verberg de "Trek naam" knop als alle namen getrokken zijn
        }
    } else {
        alert('Alle namen zijn getrokken voor deze ronde.');
    }
}

function startNieuweRonde() {
    if (getrokkenNamen.length > 0 && getrokkenNamen.length < namen.length && !confirm('Nog niet alle namen zijn getrokken. Wil je toch een nieuwe ronde starten?')) {
        return;
    }

    if (getrokkenNamen.length > 0) {
        voegRondeToeAanGeschiedenis();
    }

    getrokkenNamen = [];
    document.getElementById('getrokkenNamen').innerHTML = '';
    toonTrekNaamKnop(true); // Toon de "Trek naam" knop opnieuw wanneer een nieuwe ronde start
    alert('Nieuwe ronde gestart. Je kunt weer namen trekken.');
}

function voegRondeToeAanGeschiedenis() {
    let rondeNummer = rondesGeschiedenis.length + 1;
    let geschiedenisItem = `Ronde ${rondeNummer}: ${getrokkenNamen.join(', ')}`;
    rondesGeschiedenis.push(geschiedenisItem);

    let geschiedenisLijst = document.getElementById('trekkingGeschiedenis');
    let li = document.createElement('li');
    li.textContent = geschiedenisItem;
    geschiedenisLijst.appendChild(li);
}

function toonTrekNaamKnop(toon) {
    const trekNaamKnop = document.getElementById('trekNaamKnop');
    trekNaamKnop.style.display = toon ? '' : 'none'; // Toon of verberg de knop op basis van de 'toon' parameter
}

document.getElementById('naamInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        voegNaamToe();
    }
});