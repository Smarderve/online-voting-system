//ENEO LA JAVASCRIPT YOTE IMEUNGANISHWA HAPA

// 1. Kazi ya Accordion: Ukifungua moja, zingine zinafungwa
function toggleFaculty(id) {
    const allContents = document.getElementsByClassName("faculty-content");

    for (let content of allContents) {
        if (content.id !== id) {
            content.style.display = "none";
        }
    }

    const target = document.getElementById(id);
    if (target.style.display === "block") {
        target.style.display = "none";
    } else {
        target.style.display = "block";
    }
}

// 2. Kazi ya Popup (Modal) kuonyesha sela
function openSela(name, text) {
    document.getElementById("modalName").innerText = name;
    document.getElementById("modalText").innerText = text;
    document.getElementById("selaModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("selaModal").style.display = "none";
}

// Funga modal ukibonyeza nje ya sanduku
window.onclick = function (event) {
    const modal = document.getElementById("selaModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}