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
        updateTrekNaamKnop();
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
        updateTrekNaamKnop();
    }
}

function trekNaam() {
    let nogNietGetrokken = namen.filter(naam => !getrokkenNamen.includes(naam));
    if (nogNietGetrokken.length > 0) {
        let getrokkenNaam = nogNietGetrokken[Math.floor(Math.random() * nogNietGetrokken.length)];
        getrokkenNamen.push(getrokkenNaam);
        document.getElementById('getrokkenNamen').innerHTML += `<li>${getrokkenNaam}</li>`;
        updateTrekNaamKnop();
    } else {
        alert('Alle namen zijn getrokken voor deze ronde.');
    }
}

function startNieuweRonde() {
    if (getrokkenNamen.length > 0) {
        rondesGeschiedenis.push([...getrokkenNamen]);
        updateGeschiedenis();
    }
    getrokkenNamen = [];
    document.getElementById('getrokkenNamen').innerHTML = '';
    updateTrekNaamKnop();
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

function updateTrekNaamKnop() {
    // Toon de "Trek naam" knop alleen als er nog niet-getrokken namen zijn
    const nogNietGetrokken = namen.filter(naam => !getrokkenNamen.includes(naam)).length;
    document.getElementById('trekNaamKnop').style.display = nogNietGetrokken > 0 ? '' : 'none';
}

document.getElementById('naamInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        voegNaamToe();
    }
});