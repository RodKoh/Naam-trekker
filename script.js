let namen = [];
let getrokkenNamen = [];
let trekkingGeschiedenis = []; // Houdt de geschiedenis van alle getrokken namen bij

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
    namenLijst.innerHTML = ''; // Leeg de lijst voor een update
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

    if (getrokkenNamen.length !== namen.length) {
        alert('Nog niet alle namen zijn getrokken. Wil je toch een nieuwe ronde starten?');
        return;
    }

    getrokkenNamen = [];
    document.getElementById('getrokkenNamen').innerHTML = '';
    alert('Nieuwe ronde gestart. Je kunt weer namen trekken.');
}

function updateGeschiedenis() {
    let geschiedenisItem = `Ronde ${trekkingGeschiedenis.length + 1}: ${getrokkenNamen.join(', ')}`;
    trekkingGeschiedenis.push(geschiedenisItem); // Voeg de huidige ronde toe aan de geschiedenis

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