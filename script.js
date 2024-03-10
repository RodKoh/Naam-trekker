let namen = [];
let getrokkenNamen = []; // Bijgehouden per ronde
let rondesGeschiedenis = [];

function voegNaamToe() {
    const naamInput = document.getElementById('naamInput');
    const naam = naamInput.value.trim();
    if (naam && !namen.includes(naam)) {
        namen.push(naam);
        updateNamenLijst();
        naamInput.value = ''; // Reset inputveld
        if (document.getElementById('trekNaamKnop').style.display === 'none' && getrokkenNamen.length < namen.length) {
            document.getElementById('trekNaamKnop').style.display = 'inline'; // Toon de "Trek naam" knop weer
        }
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
        getrokkenNamen = getrokkenNamen.filter(n => n !== naam); // Verwijder uit getrokkenNamen als het daar staat
        updateNamenLijst();
        if (getrokkenNamen.length === namen.length) {
            document.getElementById('trekNaamKnop').style.display = 'none'; // Verberg als alle overgebleven namen getrokken zijn
        }
    }
}

function trekNaam() {
    let nogNietGetrokken = namen.filter(naam => !getrokkenNamen.includes(naam));
    if (nogNietGetrokken.length > 0) {
        let getrokkenNaam = nogNietGetrokken[Math.floor(Math.random() * nogNietGetrokken.length)];
        getrokkenNamen.push(getrokkenNaam);
        document.getElementById('getrokkenNamen').innerHTML += `<li>${getrokkenNaam}</li>`;
    } else {
        alert('Alle namen zijn getrokken voor deze ronde.');
        document.getElementById('trekNaamKnop').style.display = 'none';
    }
}

function startNieuweRonde() {
    if (getrokkenNamen.length < namen.length && !confirm('Er zijn nog niet getrokken namen. Wil je toch een nieuwe ronde starten?')) {
        return;
    }
    if (getrokkenNamen.length > 0) {
        rondesGeschiedenis.push(getrokkenNamen);
        updateGeschiedenis();
    }
    getrokkenNamen = [];
    document.getElementById('getrokkenNamen').innerHTML = '';
    document.getElementById('trekNaamKnop').style.display = namen.length > 0 ? 'inline' : 'none';
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