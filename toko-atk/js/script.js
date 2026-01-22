/* ==============================
   TAMBAH KE KERANJANG
================================ */
function tambahKeKeranjang(id, nama, harga) {
    let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

    let produkAda = keranjang.find(item => item.id === id);

    if (produkAda) {
        produkAda.jumlah += 1;
    } else {
        keranjang.push({
            id: id,
            nama: nama,
            harga: harga,
            jumlah: 1
        });
    }

    localStorage.setItem("keranjang", JSON.stringify(keranjang));
    tampilkanPopup(nama);
}


/* ==============================
   TAMPILKAN KERANJANG
================================ */
function tampilkanKeranjang() {
    let container = document.getElementById("keranjang-container");
    if (!container) return; // ⬅️ PENTING

    let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
    let subtotal = 0;

    container.innerHTML = "";

    keranjang.forEach((item, index) => {
        let totalItem = item.harga * item.jumlah;
        subtotal += totalItem;

        container.innerHTML += `
            <div class="keranjang-item">
                <div class="keranjang-info">
                    <h4>${item.nama}</h4>
                    <p>Rp ${item.harga.toLocaleString()}</p>
                </div>

                <div class="jumlah">
                    <button onclick="ubahJumlah(${index}, -1)">−</button>
                    <span>${item.jumlah}</span>
                    <button onclick="ubahJumlah(${index}, 1)">+</button>
                </div>

                <div class="harga">
                    Rp ${totalItem.toLocaleString()}
                </div>

                <div class="hapus" onclick="hapusItem(${index})">🗑</div>
            </div>
        `;
    });

    document.getElementById("subtotal").innerText =
        "Rp " + subtotal.toLocaleString();

    document.getElementById("total-bayar").innerText =
        "Rp " + (subtotal + 15000).toLocaleString();
}


function ubahJumlah(index, perubahan) {
    let keranjang = JSON.parse(localStorage.getItem("keranjang"));
    keranjang[index].jumlah += perubahan;

    if (keranjang[index].jumlah <= 0) {
        keranjang.splice(index, 1);
    }

    localStorage.setItem("keranjang", JSON.stringify(keranjang));
    tampilkanKeranjang();
}

function hapusItem(index) {
    let keranjang = JSON.parse(localStorage.getItem("keranjang"));
    keranjang.splice(index, 1);
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
    tampilkanKeranjang();
}


/* ==============================
   TAMBAH / KURANG JUMLAH
================================ */
function tambahJumlah(index) {
    let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
    keranjang[index].jumlah += 1;
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
    tampilkanKeranjang();
}

function kurangiJumlah(index) {
    let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
    keranjang[index].jumlah -= 1;

    if (keranjang[index].jumlah <= 0) {
        keranjang.splice(index, 1);
    }

    localStorage.setItem("keranjang", JSON.stringify(keranjang));
    tampilkanKeranjang();
}

/* ==============================
   HAPUS PRODUK
================================ */
function hapusProduk(index) {
    let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
    keranjang.splice(index, 1);
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
    tampilkanKeranjang();
}

/* ==============================
   CHECKOUT (FORM)
================================ */
function prosesCheckout(event) {
    event.preventDefault();

    let nama = document.getElementById("nama").value;
    let email = document.getElementById("email").value;
    let telepon = document.getElementById("telepon").value;
    let alamat = document.getElementById("alamat").value;

    if (!nama || !email || !telepon || !alamat) {
        alert("Harap lengkapi semua data!");
        return;
    }

    // tampilkan popup
    document.getElementById("popup-checkout").style.display = "flex";
}

// penutup popup
function selesaiCheckout() {
    localStorage.removeItem("keranjang");
    window.location.href = "index.html";
}



/* ==============================
   AUTO LOAD
================================ */
document.addEventListener("DOMContentLoaded", function () {
    tampilkanKeranjang();
    tampilkanRingkasanCheckout();
});


/* pop up */
function tampilkanPopup(namaProduk) {
    document.getElementById("popup-text").innerText =
        namaProduk + " berhasil ditambahkan ke keranjang";

    document.getElementById("popup").style.display = "flex";
}

function tutupPopup() {
    document.getElementById("popup").style.display = "none";
}

/* ==============================
   RINGKASAN CHECKOUT (FINAL)
================================ */
function tampilkanRingkasanCheckout() {
    let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
    let subtotal = 0;
    let ongkir = 15000;

    keranjang.forEach(item => {
        subtotal += item.harga * item.jumlah;
    });

    let subtotalEl = document.getElementById("checkout-subtotal");
    let ongkirEl = document.getElementById("checkout-ongkir");
    let totalEl = document.getElementById("checkout-total");

    if (!subtotalEl) return;

    subtotalEl.innerText = "Rp " + subtotal.toLocaleString();
    ongkirEl.innerText = "Rp " + ongkir.toLocaleString();
    totalEl.innerText = "Rp " + (subtotal + ongkir).toLocaleString();
}
