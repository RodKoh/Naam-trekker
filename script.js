let namen = [];
let getrokkenNamen = []; // Namen getrokken in de huidige ronde
let geschiedenisRondes = []; // Begint met een lege ronde

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
    updateTrekNaamKnopStatus();
}

function updateNamenLijst() {
    const namenLijst = document.getElementById('namenLijst');
    namenLijst.innerHTML = '';
    namen.forEach(naam => {
        let li = document.createElement('li');
        li.textContent = naam;
        let verwijderBtn = document.createElement('button');
        verwijderBtn.textContent = 'Verwijder';
        verwijderBtn.onclick = function() { verwijderNaam(naam); };
        li.appendChild(verwijderBtn);
        namenLijst.appendChild(li);
    });
}

function verwijderNaam(naam) {
    namen = namen.filter(n => n !== naam);
    updateNamenLijst();
    updateTrekNaamKnopStatus();
}

function trekNaam() {
    const beschikbareNamen = namen.filter(naam => !getrokkenNamen.includes(naam));
    if (beschikbareNamen.length > 0) {
        const getrokkenNaam = beschikbareNamen[Math.floor(Math.random() * beschikbareNamen.length)];
        getrokkenNamen.push(getrokkenNaam);
        geschiedenisRondes.push(getrokkenNaam); // Voeg direct toe aan geschiedenis
        updateGeschiedenis();
        updateTrekNaamKnopStatus();
    } else {
        alert('Alle namen zijn getrokken voor deze ronde.');
    }
}

function startNieuweRonde() {
    if (getrokkenNamen.length < namen.length && !confirm('Er zijn nog niet getrokken namen. Wil je toch een nieuwe ronde starten?')) {
        return;
    }
    getrokkenNamen = [];
    updateTrekNaamKnopStatus();
    geschiedenisRondes = []; // Reset de geschiedenis voor de nieuwe ronde
    updateGeschiedenis();
}

function updateGeschiedenis() {
    const geschiedenisLijst = document.getElementById('trekkingGeschiedenis');
    geschiedenisLijst.innerHTML = '';
    geschiedenisRondes.forEach((naam, index) => {
        geschiedenisLijst.innerHTML += `<li>Ronde ${index + 1}: ${naam}</li>`;
    });
}

function updateTrekNaamKnopStatus() {
    document.getElementById('trekNaamKnop').style.display = getrokkenNamen.length < namen.length ? 'inline' : 'none';
}

document.getElementById('naamInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        voegNaamToe();
    }
});