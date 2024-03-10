let namen = [];
let getrokkenNamen = [];
let trekkingGeschiedenis = [];
let huidigeRondeNamen = []; // Bewaar getrokken namen van de huidige ronde

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
    if (getrokkenNamen.length === namen.length) {
        alert('Alle namen zijn getrokken voor deze ronde. Start een nieuwe ronde.');
        return;
    }

    let nogNietGetrokken = namen.filter(naam => !getrokkenNamen.includes(naam));
    let getrokkenNaam = nogNietGetrokken[Math.floor(Math.random() * nogNietGetrokken.length)];
    getrokkenNamen.push(getrokkenNaam);
    huidigeRondeNamen.push(getrokkenNaam); // Voeg getrokken naam toe aan huidige ronde
    document.getElementById('getrokkenNamen').innerHTML += `<li>${getrokkenNaam}</li>`;
}

function startNieuweRonde() {
    if (getrokkenNamen.length > 0 && getrokkenNamen.length < namen.length && !confirm('Nog niet alle namen zijn getrokken. Wil je toch een nieuwe ronde starten?')) {
        return;
    }

    if (getrokkenNamen.length > 0) {
        updateGeschiedenis(); // Voeg huidige ronde toe aan geschiedenis voordat je reset
    }

    getrokkenNamen = [];
    huidigeRondeNamen = [];
    document.getElementById('getrokkenNamen').innerHTML = '';
    alert('Nieuwe ronde gestart. Je kunt weer namen trekken.');
}

function updateGeschiedenis() {
    if (huidigeRondeNamen.length > 0) {
        let rondeNummer = trekkingGeschiedenis.length + 1;
        let geschiedenisItem = `Ronde ${rondeNummer}: ${huidigeRondeNamen.join(', ')}`;
        trekkingGeschiedenis.push(geschiedenisItem);

        let geschiedenisLijst = document.getElementById('trekkingGeschiedenis');
        let li = document.createElement('li');
        li.textContent = geschiedenisItem;
        geschiedenisLijst.appendChild(li);
    }
}

document.getElementById('naamInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        voegNaamToe();
    }
});