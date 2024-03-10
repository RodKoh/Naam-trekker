let namen = [];
let getrokkenNamen = [];

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
    namenLijst.innerHTML = ''; // Reset de lijst
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
    const getrokkenIndex = Math.floor(Math.random() * namen.length);
    const getrokkenNaam = namen[getrokkenIndex];
    if (!getrokkenNamen.includes(getrokkenNaam)) {
        getrokkenNamen.push(getrokkenNaam);
        document.getElementById('getrokkenNamen').innerHTML += `<li>${getrokkenNaam}</li>`;
    } else if (getrokkenNamen.length < namen.length) {
        trekNaam(); // Probeer opnieuw als naam al getrokken is en er zijn nog namen over
    } else {
        alert('Alle namen zijn getrokken voor deze ronde.');
    }
}

function resetRonde() {
    getrokkenNamen = [];
    document.getElementById('getrokkenNamen').innerHTML = '';
    alert('Nieuwe ronde gestart. Je kunt weer namen trekken.');
}

document.getElementById('naamInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        voegNaamToe();
    }
});

window.onload = function() {
    updateNamenLijst();
};