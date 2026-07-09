// ==UserScript==
// @name         SIMKAH - Simpan Daftar Nikah ke Database
// @namespace    https://kua-pebayuran.id/
// @version      1.4.0
// @description  Simpan Daftar Nikah ke Database + Auto-Highlight Hijau untuk Catin yang Sudah Terpanjar/Masuk DB.
// @author       KUA Pebayuran
// @match        https://simkah4.kemenag.go.id/*
// @grant        GM_xmlhttpRequest
// @connect      ipvpckuogbfqpiolwlho.supabase.co
// @connect      *
// ==/UserScript==

(function () {
	"use strict";

	const SUPABASE_URL = "https://ipvpckuogbfqpiolwlho.supabase.co";
	const SUPABASE_KEY = "sb_publishable_kVPubnU60g3FUzKY8rXqiQ_sSNc29v-";

	// ── Styles (Toast, Modal, & Highlight) ───────────────────────────────────
	const style = document.createElement("style");
	style.textContent = `
        /* Toast Notification */
        #vm-dn-toast {
            position: fixed; top: 20px; right: 20px; z-index: 9999999;
            background: #fff; border-left: 4px solid #0d6efd; border-radius: 6px;
            padding: 12px 16px; font-family: system-ui, sans-serif; font-size: 13px;
            font-weight: 600; box-shadow: 0 6px 20px rgba(0,0,0,.18);
            max-width: 320px; color: #222; line-height: 1.4;
        }
        #vm-dn-toast.ok   { border-color: #198754; }
        #vm-dn-toast.warn { border-color: #fd7e14; }
        #vm-dn-toast.err  { border-color: #dc3545; }
        #vm-dn-toast.info { border-color: #0d6efd; }

        /* Custom Modal Confirm */
        #vm-confirm-overlay {
            position: fixed; inset: 0; background: rgba(0,0,0,.5);
            z-index: 999999; display: flex; align-items: center; justify-content: center;
            backdrop-filter: blur(3px); font-family: system-ui, sans-serif;
        }
        #vm-confirm-box {
            background: #ffffff; width: 460px; border-radius: 12px;
            padding: 24px; box-shadow: 0 12px 36px rgba(0,0,0,0.25);
            animation: vmFadeIn 0.2s ease;
        }
        #vm-confirm-box h3 {
            margin: 0 0 16px 0; color: #198754; font-size: 16px; font-weight: 700;
            display: flex; align-items: center; gap: 8px; border-bottom: 2px solid #e9ecef; padding-bottom: 10px;
        }
        .vm-grid { display: grid; grid-template-columns: 125px 1fr; gap: 8px 12px; margin-bottom: 20px; }
        .vm-label { font-size: 11px; font-weight: 700; color: #6c757d; text-transform: uppercase; align-self: center; }
        .vm-val { font-size: 13px; font-weight: 600; color: #212529; background: #f8f9fa; padding: 6px 10px; border-radius: 6px; border: 1px solid #dee2e6; }
        .vm-actions { display: flex; gap: 10px; justify-content: flex-end; }
        .vm-btn { padding: 8px 16px; border: none; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.15s; }
        #vm-btn-batal { background: #e9ecef; color: #495057; }
        #vm-btn-batal:hover { background: #dee2e6; }
        #vm-btn-proses { background: #198754; color: #ffffff; }
        #vm-btn-proses:hover { background: #146c43; }

        /* Highlight Style untuk Pengantin Pria yang sudah masuk database */
        .vm-row-saved td:nth-child(8) {
            background-color: #d1e7dd !important;
            color: #0f5132 !important;
            font-weight: bold !important;
        }

        @keyframes vmFadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
    `;
	document.head.appendChild(style);

	// ── Ekstraksi Data Berdasarkan Element Baris Terpilih ─────────────────────
	function extractRowData(tr) {
		if (!tr) return null;
		const cells = tr.querySelectorAll("td");
		if (cells.length < 12) return null;

		const g = (idx) => cells[idx]?.textContent.trim() || "-";

		return {
			noPendaftaran: g(2),
			tglPendaftaran: g(3),
			namaSuami: g(5),
			namaIstri: g(7),
			tglAkad: g(8),
			jamAkad: g(9),
			lokasiAkad: g(10),
		};
	}

	let activeRowElement = null;

	// Kunci elemen TR saat menu Action di klik
	document.addEventListener(
		"click",
		(e) => {
			const tr = e.target.closest("tr.dx-data-row");
			if (tr) activeRowElement = tr;
		},
		true,
	);

	// ── Suntik Tombol ke Action Sheet ─────────────────────────────────────────
	function injectExtraAction(container) {
		if (container.dataset.vmInjected) return;

		const items = container.querySelectorAll(".dx-actionsheet-item");
		if (!items.length) return;
		container.dataset.vmInjected = "1";

		const printItem = Array.from(items).find((it) =>
			it.textContent.includes("Cetak Bukti Daftar"),
		);
		const refItem = printItem || items[items.length - 1];

		const newItem = refItem.cloneNode(true);
		const icon = newItem.querySelector(".dx-icon");
		if (icon) icon.className = "dx-icon dx-icon-save";
		const label = newItem.querySelector(".dx-button-text");
		if (label) label.textContent = "Simpan ke Database";
		const btn = newItem.querySelector(".dx-button");
		if (btn) btn.setAttribute("aria-label", "Simpan ke Database");

		newItem.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();

			const data = extractRowData(activeRowElement);
			if (!data || !data.noPendaftaran || data.noPendaftaran === "-") {
				showToast(
					"⚠ Gagal mendeteksi baris aktif. Klik ulang menu Action.",
					"warn",
				);
				return;
			}

			showPrettyConfirm(data);
			closeActionSheet();
		});

		refItem.after(newItem);
	}

	function closeActionSheet() {
		document.dispatchEvent(
			new KeyboardEvent("keydown", {
				key: "Escape",
				code: "Escape",
				keyCode: 27,
				which: 27,
				bubbles: true,
			}),
		);
	}

	// ── Fitur Cek Status Database & Beri Warna Hijau Otomatis ─────────────────
	async function checkExistingRowsInDatabase() {
		const rows = document.querySelectorAll("tr.dx-data-row");
		const listNoDaftar = [];
		const rowMap = {};

		rows.forEach((tr) => {
			const cells = tr.querySelectorAll("td");
			if (cells.length >= 5) {
				const noDaftar = cells[2]?.textContent.trim();
				if (
					noDaftar &&
					noDaftar !== "" &&
					!tr.classList.contains("vm-row-saved")
				) {
					listNoDaftar.push(noDaftar);
					rowMap[noDaftar] = tr;
				}
			}
		});

		if (listNoDaftar.length === 0) return;

		// Ambil data status pendaftaran dari Supabase REST API (cepat dan efisien)
		const formatQuery = listNoDaftar.map((no) => `"${no}"`).join(",");
		const url = `${SUPABASE_URL}/rest/v1/daftar_nikah?no_pendaftaran=in.(${formatQuery})&select=no_pendaftaran`;

		GM_xmlhttpRequest({
			method: "GET",
			url: url,
			headers: {
				apikey: SUPABASE_KEY,
				"Content-Type": "application/json",
			},
			onload(res) {
				if (res.status === 200) {
					try {
						const savedItems = JSON.parse(res.responseText);
						savedItems.forEach((item) => {
							const trElement = rowMap[item.no_pendaftaran];
							if (trElement) {
								// Berikan tanda kelas khusus agar CSS mewarnai kolom pengantin pria
								trElement.classList.add("vm-row-saved");
							}
						});
					} catch (e) {
						console.error("Gagal parse check status", e);
					}
				}
			},
		});
	}

	// Mengamati perubahan halaman tabel SIMKAH (ketika ganti halaman atau filter pencarian)
	new MutationObserver((mutations) => {
		let updateCheck = false;
		for (const m of mutations) {
			for (const node of m.addedNodes) {
				if (!(node instanceof HTMLElement)) continue;

				// Cek Action Sheet
				const container = node.matches?.(".dx-actionsheet-container")
					? node
					: node.querySelector?.(".dx-actionsheet-container");
				if (container) injectExtraAction(container);

				// Cek jika ada baris tabel baru dimuat
				if (
					node.matches?.("tr.dx-data-row") ||
					node.querySelector?.("tr.dx-data-row")
				) {
					updateCheck = true;
				}
			}
		}
		if (updateCheck) {
			// Beri sedikit jeda agar grid selesai merender teks sepenuhnya sebelum dicek ke DB
			setTimeout(checkExistingRowsInDatabase, 600);
		}
	}).observe(document.body, { childList: true, subtree: true });

	// Jalankan pengecekan pertama saat skrip dimuat awal
	setTimeout(checkExistingRowsInDatabase, 1500);

	// ── Modal Konfirmasi Kustom ───────────────────────────────────────────────
	function showPrettyConfirm(data) {
		document.getElementById("vm-confirm-overlay")?.remove();

		const overlay = document.createElement("div");
		overlay.id = "vm-confirm-overlay";
		overlay.innerHTML = `
            <div id="vm-confirm-box">
                <h3>💾 Konfirmasi Simpan Database</h3>
                <div class="vm-grid">
                    <div class="vm-label">No. Pendaftaran</div>
                    <div class="vm-val">${data.noPendaftaran}</div>

                    <div class="vm-label">Tgl. Daftar</div>
                    <div class="vm-val">${data.tglPendaftaran}</div>

                    <div class="vm-label">Nama Suami</div>
                    <div class="vm-val" style="color: #0d6efd; font-weight: 700;">${data.namaSuami}</div>

                    <div class="vm-label">Nama Istri</div>
                    <div class="vm-val" style="color: #d63384; font-weight: 700;">${data.namaIstri}</div>

                    <div class="vm-label">Tanggal Akad</div>
                    <div class="vm-val">${data.tglAkad}</div>

                    <div class="vm-label">Jam Akad</div>
                    <div class="vm-val">${data.jamAkad}</div>

                    <div class="vm-label">Lokasi Akad</div>
                    <div class="vm-val" style="font-size: 12px; line-height: 1.3;">${data.lokasiAkad}</div>
                </div>
                <div class="vm-actions">
                    <button class="vm-btn" id="vm-btn-batal">Batal</button>
                    <button class="vm-btn" id="vm-btn-proses">Ya, Simpan</button>
                </div>
            </div>
        `;

		document.body.appendChild(overlay);

		overlay.querySelector("#vm-btn-batal").onclick = () => {
			overlay.remove();
			showToast("ℹ Penyimpanan dibatalkan.", "info");
		};

		overlay.querySelector("#vm-btn-proses").onclick = () => {
			overlay.remove();
			executeSave(data);
		};

		overlay.onclick = (e) => {
			if (e.target === overlay) {
				overlay.remove();
				showToast("ℹ Penyimpanan dibatalkan.", "info");
			}
		};
	}

	// ── Eksekusi Simpan data ke Supabase ──────────────────────────────────────
	async function executeSave(data) {
		showToast(`⏳ Menyimpan data ${data.namaSuami}...`, "info", 0);

		try {
			const res = await postToSupabase(data);
			if (res.duplicate) {
				showToast(
					`⚠ Data sudah masuk sebelumnya:\n${data.noPendaftaran} — ${data.namaSuami} & ${data.namaIstri}`,
					"warn",
				);
				// Jika server merespon duplikat, tandai hijau juga di halaman
				if (activeRowElement) activeRowElement.classList.add("vm-row-saved");
			} else if (res.ok || res.status === "success") {
				showToast(
					`✅ Berhasil disimpan ke database: ${data.namaSuami} & ${data.namaIstri}`,
					"ok",
				);
				// Langsung ubah warna baris yang baru saja disimpan menjadi hijau tanpa reload halaman
				if (activeRowElement) activeRowElement.classList.add("vm-row-saved");
			} else {
				showToast(
					`❌ Gagal: ${res.error || "Terjadi kesalahan di server"}`,
					"err",
				);
			}
		} catch (err) {
			showToast(`❌ Error: ${err.message}`, "err");
		}
	}

	function postToSupabase(data) {
		return new Promise((resolve, reject) => {
			GM_xmlhttpRequest({
				method: "POST",
				url: `${SUPABASE_URL}/functions/v1/daftar-nikah-sync`,
				headers: {
					"Content-Type": "application/json",
					apikey: SUPABASE_KEY,
					Authorization: `Bearer ${SUPABASE_KEY}`,
				},
				data: JSON.stringify({
					no_pendaftaran: data.noPendaftaran,
					tgl_pendaftaran: data.tglPendaftaran,
					nama_suami: data.namaSuami,
					nama_istri: data.namaIstri,
					tgl_akad: data.tglAkad,
					jam_akad: data.jamAkad,
					lokasi_akad: data.lokasiAkad,
				}),
				onload(res) {
					if (res.status >= 200 && res.status < 300) {
						try {
							resolve(JSON.parse(res.responseText));
						} catch {
							resolve({ ok: true });
						}
					} else {
						reject(
							new Error(
								`HTTP ${res.status}: ${res.responseText || "Gagal menyimpan"}`,
							),
						);
					}
				},
				onerror() {
					reject(
						new Error("Gagal melakukan koneksi ke Supabase (Network Error)"),
					);
				},
			});
		});
	}

	function showToast(msg, type = "info", autoHideMs = 4000) {
		document.getElementById("vm-dn-toast")?.remove();
		const el = document.createElement("div");
		el.id = "vm-dn-toast";
		el.className = type;
		el.style.whiteSpace = "pre-line";
		el.textContent = msg;
		document.body.appendChild(el);
		if (autoHideMs) setTimeout(() => el.remove(), autoHideMs);
	}
})();
