// ==UserScript==
// @name         SIMKAH - Auto Pencairan Jaspro & Transport
// @namespace    https://kua-pebayuran.id/
// @version      1.3.0
// @description  Satu klik otomatisasi Jaspro/Transport. Tombol hanya muncul di halaman Pengajuan Pencairan.
// @author       KUA Pebayuran
// @match        https://simkah4.kemenag.go.id/*
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    // ── 1. Inject CSS untuk Floating Button ──────────────────────────────────
    const style = document.createElement("style");
    style.textContent = `
        #vm-float-cair {
            position: fixed; bottom: 30px; left: 30px;
            background: #0d6efd; color: #ffffff; padding: 12px 24px;
            font-size: 14px; font-weight: 700; border-radius: 50px;
            box-shadow: 0 10px 30px rgba(13,110,253,0.4);
            z-index: 99999999 !important; cursor: pointer;
            font-family: system-ui, sans-serif;
            border: 2px solid #ffffff; transition: all 0.3s ease;
            display: none; /* Sembunyikan secara default */
            align-items: center; gap: 8px;
        }
        #vm-float-cair:hover { transform: translateY(-3px); background: #0b5ed7; }
        #vm-float-cair.processing { background: #ffc107; color: #000; box-shadow: 0 10px 30px rgba(255,193,7,0.4); }
        #vm-float-cair.stopping { background: #dc3545; color: #fff; box-shadow: 0 10px 30px rgba(220,53,69,0.4); }
    `;
    document.head.appendChild(style);

    // ── 2. Buat Elemen Tombol di Kiri Bawah ──────────────────────────────────
    const btn = document.createElement("div");
    btn.id = "vm-float-cair";
    btn.innerHTML = `<span>🚀</span> Auto Cairkan Halaman Ini`;
    document.body.appendChild(btn);

    let isProcessing = false;

    // ── 3. Monitor Keberadaan Judul Halaman ──────────────────────────────────
    // Fungsi ini mengecek apakah kita sedang berada di halaman "Pengajuan Pencairan"
    function checkVisibility() {
        const titleEl = document.getElementById("title");
        if (titleEl && titleEl.textContent.toUpperCase().includes("PENGAJUAN PENCAIRAN")) {
            // Tampilkan tombol jika judul sesuai
            if (btn.style.display !== "flex") {
                btn.style.display = "flex";
            }
        } else {
            // Sembunyikan tombol jika bukan di halaman pengajuan
            if (btn.style.display !== "none") {
                btn.style.display = "none";
                // Matikan proses jika sedang berjalan dan user pindah halaman
                if (isProcessing) {
                    isProcessing = false;
                    btn.className = "";
                    btn.innerHTML = `<span>🚀</span> Auto Cairkan Halaman Ini`;
                }
            }
        }
    }

    // Jalankan pengecekan setiap 1 detik untuk menangani navigasi SPA (AJAX)
    setInterval(checkVisibility, 1000);
    checkVisibility(); // Panggil sekali saat inisialisasi

    // ── 4. Fungsi Pendukung ──────────────────────────────────────────────────
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    async function waitGrid() {
        let retries = 20;
        while (retries > 0) {
            const loadPanel = document.querySelector('.dx-datagrid-loadpanel');
            if (loadPanel && window.getComputedStyle(loadPanel).display !== 'none' && window.getComputedStyle(loadPanel).visibility !== 'hidden') {
                await sleep(500);
                retries--;
            } else {
                break;
            }
        }
        await sleep(500);
    }

    async function clickModalAjukan() {
        const btnAjukan = document.querySelector('div[aria-label="Ajukan"]');
        if (btnAjukan) {
            btnAjukan.click();
        }
    }

    async function clickSweetAlertOK() {
        let retries = 15;
        while (retries > 0) {
            const swalConfirm = document.querySelector('.swal-button--confirm') || document.querySelector('.swal2-confirm');
            if (swalConfirm && window.getComputedStyle(swalConfirm).display !== 'none') {
                swalConfirm.click();
                await sleep(1000);
                return;
            }
            await sleep(500);
            retries--;
        }
    }

    // ── 5. Logika Utama Auto-Click ───────────────────────────────────────────
    btn.addEventListener("click", async () => {
        if (isProcessing) {
            isProcessing = false;
            btn.className = "stopping";
            btn.innerHTML = `<span>🛑</span> Membatalkan...`;
            return;
        }

        isProcessing = true;
        btn.className = "processing";
        btn.innerHTML = `<span>⚙️</span> Sedang Memproses... (Klik utk Stop)`;

        let found = true;

        while (found && isProcessing) {
            found = false;
            await waitGrid();

            const rows = document.querySelectorAll("tr.dx-data-row");

            for (let row of rows) {
                if (!isProcessing) break;

                const tdJaspro = row.querySelector('td[aria-colindex="3"]');
                const tdTransport = row.querySelector('td[aria-colindex="4"]');

                let needJaspro = tdJaspro && tdJaspro.textContent.includes("Belum Di Ajukan");
                let needTransport = tdTransport && tdTransport.textContent.includes("Belum Di Ajukan");

                if (needJaspro || needTransport) {
                    found = true;

                    const aksiCell = row.querySelector('td[aria-colindex="2"]');
                    if (!aksiCell) continue;

                    const aksiBtn = aksiCell.querySelector('.dx-button') || aksiCell;

                    if (needJaspro) {
                        aksiBtn.click();
                        await sleep(1000);

                        const btnJaspro = document.querySelector('div[aria-label="Pengajuan Pencairan Jaspro"]');
                        if (btnJaspro) {
                            btnJaspro.click();
                            await sleep(2000);
                            await clickModalAjukan();
                            await clickSweetAlertOK();
                        }
                        break; 
                    }

                    if (needTransport) {
                        aksiBtn.click();
                        await sleep(1000);

                        const btnTransport = document.querySelector('div[aria-label="Pengajuan Pencairan Transport"]');
                        if (btnTransport) {
                            btnTransport.click();
                            await sleep(2000);
                            await clickModalAjukan();
                            await clickSweetAlertOK();
                        }
                        break;
                    }
                }
            }
        }

        isProcessing = false;
        btn.className = "";
        btn.innerHTML = `<span>🚀</span> Auto Cairkan Halaman Ini`;

        if (!found && document.getElementById("title")?.textContent.toUpperCase().includes("PENGAJUAN PENCAIRAN")) {
            alert("✅ Semua pencairan Transpor dan Jaspro di halaman ini sudah diajukan!");
        }
    });
})();
