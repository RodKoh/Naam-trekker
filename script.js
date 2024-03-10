let namen = [];
let trekkingGeschiedenis = [];
let rondeGeschiedenis = [];

function voegNaamToe() {
    const naamInput = document.getElementById('naamInput');
    const naam = naamInput.value.trim();
    if (naam && !namen.includes(naam)) {
        namen.push(naam);
        updateNamenLijst();
        naamInput.value = ''; // Reset inputveld
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
        alert('Geen namen beschikbaar. Voeg namen toe om te trekken.');
        return;
    }

    let getrokkenNamenLijst = document.getElementById('getrokkenNamen');
    if (rondeGeschiedenis.length === 0 || rondeGeschiedenis.length === namen.length) {
        getrokkenNamenLijst.innerHTML = ''; // Reset de lijst voor een nieuwe ronde
        rondeGeschiedenis = []; // Reset de getrokken namen voor de nieuwe ronde
    }

    const beschikbareNamen = namen.filter(naam => !rondeGeschiedenis.includes(naam));
    const getrokkenNaam = beschikbareNamen[Math.floor(Math.random() * beschikbareNamen.length)];
    rondeGeschiedenis.push(getrokkenNaam);
    getrokkenNamenLijst.innerHTML += `<li>${getrokkenNaam}</li>`;

    if (rondeGeschiedenis.length === namen.length) {
        alert('Einde van deze ronde. Start een nieuwe ronde.');
        updateGeschiedenis();
    }
}

function updateGeschiedenis() {
    const geschiedenisLijst = document.getElementById('trekkingGeschiedenis');
    geschiedenisLijst.innerHTML += `<li>Ronde ${trekkingGeschiedenis.length + 1}: ${rondeGeschiedenis.join(', ')}</li>`;
    trekkingGeschiedenis.push([...rondeGeschiedenis]);
}

document.getElementById('naamInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        voegNaamToe();
    }
});