let namen = [];
let getrokkenNamen = [];
let trekkingGeschiedenis = [];
let huidigeRondeNamen = []; // Nieuw: Houdt de getrokken namen van de huidige ronde bij

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
        verwijderBtn.onclick = function() { verwijderNaam(naam); };
        li.appendChild(verwijderBtn);
        namenLijst.appendChild(li);
    });
}

function verwijderNaam(naam) {
    if (confirm('Weet je zeker dat je deze naam wilt verwijderen?')) {
        namen = namen.filter(n => n !== naam);
        // Niet direct verwijderen uit huidigeRondeNamen om geschiedenis correct bij te werken
        updateNamenLijst();
    }
}

function trekNaam() {
    if (namen.length === 0 || getrokkenNamen.length === namen.length) {
        alert('Alle namen zijn getrokken voor deze ronde. Start een nieuwe ronde.');
        return;
    }

    let nogNietGetrokken = namen.filter(naam => !getrokkenNamen.includes(naam));
    let getrokkenNaam = nogNietGetrokken[Math.floor(Math.random() * nogNietGetrokken.length)];
    getrokkenNamen.push(getrokkenNaam);
    huidigeRondeNamen.push(getrokkenNaam); // Voeg toe aan de lijst voor de huidige ronde
    document.getElementById('getrokkenNamen').innerHTML += `<li>${getrokkenNaam}</li>`;

    if (getrokkenNamen.length === namen.length) {
        updateGeschiedenis(); // Update geschiedenis zodra alle namen zijn getrokken
    }
}

function startNieuweRonde() {
    if (namen.length === 0) {
        alert('Er zijn geen namen om een nieuwe ronde te starten.');
        return;
    }

    let bevestiging = getrokkenNamen.length !== namen.length && getrokkenNamen.length > 0 ? 
                      confirm('Nog niet alle namen zijn getrokken. Wil je toch een nieuwe ronde starten?') : true;
    
    if (bevestiging) {
        if (huidigeRondeNamen.length > 0) updateGeschiedenis(); // Update geschiedenis met de huidige ronde voordat deze wordt gereset
        getrokkenNamen = [];
        huidigeRondeNamen = []; // Reset voor de nieuwe ronde
        document.getElementById('getrokkenNamen').innerHTML = '';
        alert('Nieuwe ronde gestart. Je kunt weer namen trekken.');
    }
}

function updateGeschiedenis() {
    let geschiedenisItem = `Ronde ${trekkingGeschiedenis.length + 1}: ${huidigeRondeNamen.join(', ')}`;
    trekkingGeschiedenis.push(geschiedenisItem);
    let geschiedenisLijst = document.getElementById('trekkingGeschiedenis');
    let li = document.createElement('li');
    li.textContent = geschiedenisItem;
    geschiedenisLijst.appendChild(li);
}

document.getElementById('naamInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        voegNaamToe();
    }
});