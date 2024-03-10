let namen = [];
let getrokkenNamen = [];

function voegNaamToe() {
    const naamInput = document.getElementById('naamInput');
    const naam = naamInput.value.trim();
    if (naam && !namen.includes(naam)) {
        namen.push(naam);
        updateNamenLijst();
        naamInput.value = ''; // Reset inputveld
    } else {
        alert('Deze naam bestaat al of is leeg.');
    }
}

function updateNamenLijst() {
    const namenLijst = document.getElementById('namenLijst');
    namenLijst.innerHTML = namen.map((naam) => 
        `<li>${naam} <button onclick="verwijderNaam('${naam}')">Verwijder</button></li>`
    ).join('');
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

    if (getrokkenNamen.length === namen.length) {
        alert('Alle namen zijn getrokken. Start een nieuwe ronde.');
        return;
    }

    let nogNietGetrokken = namen.filter(naam => !getrokkenNamen.includes(naam));
    let getrokkenNaam = nogNietGetrokken[Math.floor(Math.random() * nogNietGetrokken.length)];
    getrokkenNamen.push(getrokkenNaam);
    document.getElementById('getrokkenNamen').innerHTML += `<li>${getrokkenNaam}</li>`;
}

function startNieuweRonde() {
    getrokkenNamen = [];
    document.getElementById('getrokkenNamen').innerHTML = '';
    alert('Nieuwe ronde gestart. Je kunt weer namen trekken.');
}

document.getElementById('naamInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        voegNaamToe();
    }
});