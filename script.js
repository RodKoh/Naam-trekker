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
        // Herbereken of de "Trek naam" knop getoond moet worden elke keer dat een naam wordt toegevoegd.
        berekenTrekNaamKnopStatus();
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
        getrokkenNamen = getrokkenNamen.filter(n => n !== naam); // Verwijder de naam ook uit getrokkenNamen indien nodig
        updateNamenLijst();
        berekenTrekNaamKnopStatus(); // Herbereken de status van de "Trek naam" knop na verwijdering
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
    }
    berekenTrekNaamKnopStatus();
}

function startNieuweRonde() {
    if (getrokkenNamen.length > 0) {
        rondesGeschiedenis.push([...getrokkenNamen]);
    }
    getrokkenNamen = [];
    document.getElementById('getrokkenNamen').innerHTML = '';
    berekenTrekNaamKnopStatus(); // Zorg dat de "Trek naam" knop correct getoond/verborgen wordt voor de nieuwe ronde
    updateGeschiedenis();
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

function berekenTrekNaamKnopStatus() {
    // Toon de "Trek naam" knop alleen als er nog namen zijn die niet getrokken zijn.
    document.getElementById('trekNaamKnop').style.display = namen.length > getrokkenNamen.length ? '' : 'none';
}

document.getElementById('naamInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        voegNaamToe();
    }
});