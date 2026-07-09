// ==UserScript==
// @name         SIMKAH - Lampiran Dokumentasi Akad (R2 + Native)
// @namespace    https://kua-pebayuran.id/
// @version      2.1.0
// @description  Generate Lampiran HD, Upload Native SIMKAH, R2+DB Supabase, dan Floating Bulk Download ZIP
// @author       KUA Pebayuran
// @match        https://simkah4.kemenag.go.id/*
// @grant        GM_xmlhttpRequest
// @connect      ipvpckuogbfqpiolwlho.supabase.co
// @connect      pub-d5c41aa7265a4376b879a0a034c107f5.r2.dev
// @require      https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js
// ==/UserScript==

(function () {
	"use strict";

	const SUPABASE_URL = "https://ipvpckuogbfqpiolwlho.supabase.co";
	const SUPABASE_KEY = "sb_publishable_kVPubnU60g3FUzKY8rXqiQ_sSNc29v-";
	const R2_MAX_BYTES = 500 * 1024; // 500 KB R2 limit
	const LOCAL_MAX_BYTES = 1.5 * 1024 * 1024; // 1.5 MB Local download

	const BULAN_NAMA = [
		"Januari",
		"Februari",
		"Maret",
		"April",
		"Mei",
		"Juni",
		"Juli",
		"Agustus",
		"September",
		"Oktober",
		"November",
		"Desember",
	];
	const BULAN_CANVAS = [
		"JANUARI",
		"FEBRUARI",
		"MARET",
		"APRIL",
		"MEI",
		"JUNI",
		"JULI",
		"AGUSTUS",
		"SEPTEMBER",
		"OKTOBER",
		"NOVEMBER",
		"DESEMBER",
	];

	// ── Styles ────────────────────────────────────────────────────────────────
	const style = document.createElement("style");
	style.textContent = `
        .vm-btn-buat {
            background: #198754; color: #fff; border: none;
            padding:0px 0px; border-radius: 0px; cursor: pointer;
            font-size: 11px; font-weight: bold; display: inline-flex; align-items: center;
            box-shadow: 0 1px 2px rgba(0,0,0,.1); white-space: nowrap;
        }
        .vm-btn-buat:hover { background: #146c43; }

        /* Floating Toolbar */
        #vm-bulk-bar {
            position: fixed; bottom: 24px; right: 24px; z-index: 9990;
            display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
            background: #ffffff; border: 1px solid #dee2e6; border-radius: 8px;
            padding: 10px 14px; font-family: system-ui, sans-serif;
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
            transition: transform 0.2s ease;
        }
        #vm-bulk-bar:hover { transform: translateY(-2px); }
        #vm-bulk-bar span { font-size: 13px; font-weight: 600; color: #444; white-space: nowrap; margin-right: 4px; }
        #vm-bulk-bar select {
            padding: 5px 8px; border: 1px solid #ccc; border-radius: 4px;
            font-size: 12px; background: #f8f9fa; cursor: pointer; outline: none;
        }
        .vm-bulk-btn {
            padding: 6px 12px; border: none; border-radius: 5px; cursor: pointer;
            font-size: 12px; font-weight: 600; color: #fff; display: flex; align-items: center; gap: 4px;
        }
        #vm-bulk-all    { background: #0d6efd; }
        #vm-bulk-all:hover { background: #0a58ca; }
        #vm-bulk-kantor { background: #198754; }
        #vm-bulk-kantor:hover { background: #146c43; }
        .vm-bulk-btn:disabled { opacity: .6; cursor: wait; }

        /* Progress Overlay */
        #vm-progress-overlay {
            position: fixed; inset: 0; background: rgba(0,0,0,.6);
            z-index: 999998; display: flex; align-items: center; justify-content: center;
            backdrop-filter: blur(2px);
        }
        #vm-progress-box {
            background: #fff; border-radius: 12px; padding: 24px 32px;
            min-width: 320px; font-family: system-ui, sans-serif; text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        #vm-progress-box p { margin: 0 0 14px; font-size: 15px; font-weight: 500; color: #222; }
        #vm-progress-bar-wrap { background: #e9ecef; border-radius: 8px; height: 12px; overflow: hidden; }
        #vm-progress-bar { background: #0d6efd; height: 100%; width: 0; transition: width .3s ease; }
        #vm-progress-label { font-size: 13px; color: #666; margin-top: 8px; font-weight: 600;}

        /* Modal Generator */
        #vm-overlay {
            position: fixed; inset: 0; background: rgba(0,0,0,.6);
            z-index: 999999; display: flex; align-items: center; justify-content: center;
            backdrop-filter: blur(2px);
        }
        #vm-modal {
            background: #fff; border-radius: 12px; padding: 28px 24px 20px;
            width: 440px; max-height: 92vh; overflow-y: auto;
            font-family: system-ui, sans-serif; box-shadow: 0 10px 40px rgba(0,0,0,.3);
        }
        #vm-modal h3 { margin: 0 0 18px; font-size: 16px; color: #1a1a1a; font-weight: bold; }
        .vm-field { margin-bottom: 12px; }
        .vm-field label { display: block; font-size: 11px; color: #666; margin-bottom: 4px; font-weight: 700; letter-spacing: .3px; }
        .vm-field input[type=text], .vm-field select {
            width: 100%; padding: 8px 10px; border: 1px solid #d1d5db;
            border-radius: 6px; box-sizing: border-box; font-size: 13px; background: #f8f9fa; color: #333; outline: none;
        }
        .vm-field select.vm-editable { background: #fff; cursor: pointer; border-color: #0d6efd; }
        .vm-field input[type=file] {
            width: 100%; padding: 7px 10px; border: 1px dashed #adb5bd; background: #f8f9fa;
            border-radius: 6px; box-sizing: border-box; font-size: 12px; cursor: pointer;
        }
        #vm-foto-preview {
            width: 100%; max-height: 160px; object-fit: cover;
            border-radius: 6px; margin-top: 8px; display: none; border: 1px solid #eee;
        }
        .vm-actions { display: flex; gap: 8px; margin-top: 20px; }
        .vm-actions button {
            flex: 1; padding: 10px; border: none; border-radius: 6px;
            cursor: pointer; font-size: 13px; font-weight: 600; transition: background .2s;
        }
        #vm-btn-generate { background: #0d6efd; color: #fff; flex: 1.5; }
        #vm-btn-generate:hover { background: #0b5ed7; }
        #vm-btn-generate:disabled { background: #6ea8fe; cursor: wait; }
        #vm-btn-download { background: #6f42c1; color: #fff; }
        #vm-btn-download:hover { background: #59339d; }
        #vm-btn-download:disabled { background: #b48fe0; cursor: wait; }
        #vm-btn-cancel { background: #e9ecef; color: #333; }
        #vm-btn-cancel:hover { background: #d3d6d8; }
        #vm-status { margin-top: 12px; font-size: 12px; min-height: 18px; text-align: center; font-weight: 600; line-height: 1.4; }
        .vm-status-ok   { color: #198754; }
        .vm-status-err  { color: #dc3545; }
        .vm-status-info { color: #0d6efd; }
        .vm-divider { border: none; border-top: 1px dashed #ccc; margin: 16px 0; }
    `;
	document.head.appendChild(style);

	// ── Floating Bulk Toolbar ──────────────────────────────────────────────────
	function injectBulkToolbar() {
		if (document.getElementById("vm-bulk-bar")) return;

		const table = document.querySelector("table tbody tr");
		if (!table) return; // Tunggu tabel load

		const now = new Date();
		const bulanOpts = BULAN_NAMA.map(
			(n, i) =>
				`<option value="${String(i + 1).padStart(2, "0")}" ${i === now.getMonth() ? "selected" : ""}>${n}</option>`,
		).join("");

		const bar = document.createElement("div");
		bar.id = "vm-bulk-bar";
		bar.innerHTML = `
            <span>📦 Rekap Data:</span>
            <select id="vm-bulk-bulan">${bulanOpts}</select>
            <select id="vm-bulk-tahun">
                <option value="${now.getFullYear()}">${now.getFullYear()}</option>
                <option value="${now.getFullYear() - 1}">${now.getFullYear() - 1}</option>
            </select>
            <button class="vm-bulk-btn" id="vm-bulk-all">⬇️ Semua</button>
            <button class="vm-bulk-btn" id="vm-bulk-kantor">🏛️ Kantor</button>
        `;

		document.body.appendChild(bar); // Inject langsung ke body sebagai floating

		bar.querySelector("#vm-bulk-all").onclick = () => startBulkDownload(false);
		bar.querySelector("#vm-bulk-kantor").onclick = () =>
			startBulkDownload(true);
	}

	async function startBulkDownload(kantorOnly) {
		const bulan = document.getElementById("vm-bulk-bulan").value;
		const tahun = document.getElementById("vm-bulk-tahun").value;
		const labelBulan = BULAN_NAMA[parseInt(bulan, 10) - 1];

		showProgress(`Mencari data ${labelBulan} ${tahun}...`, 0);
		document
			.querySelectorAll(".vm-bulk-btn")
			.forEach((b) => (b.disabled = true));

		try {
			const records = await fetchDokumentasi(bulan, tahun, kantorOnly);
			if (!records.length) {
				hideProgress();
				alert(
					`Tidak ada data lampiran untuk ${labelBulan} ${tahun}${kantorOnly ? " (Nikah Kantor)" : ""}.`,
				);
				return;
			}

			let suksesDownload = 0;
			let firstError = null;

			for (let i = 0; i < records.length; i++) {
				const rec = records[i];

				// Update UI langsung ke status download per file
				updateProgress(
					`Mengunduh ${i + 1}/${records.length}: ${rec.nama_suami}…`,
					((i + 1) / records.length) * 100,
				);

				try {
					const buf = await gmGetBinary(rec.foto_url);
					if (buf && buf.byteLength > 0) {
						const fn = rec.foto_url.split("/").pop() || `${i + 1}.jpg`;
						const blob = new Blob([buf], { type: "image/jpeg" });

						// Eksekusi download langsung ke disk
						downloadBlob(blob, fn);
						suksesDownload++;

						// Jeda 800ms sangat krusial agar:
						// 1. Browser tidak mendeteksi ini sebagai "spam" popup download.
						// 2. Memberi waktu bagi Garbage Collector membuang memori blob sebelumnya.
						await new Promise((r) => setTimeout(r, 800));
					}
				} catch (e) {
					console.error("[SIMKAH BULK] Gagal:", rec.foto_url, "→", e.message);
					if (!firstError) firstError = e.message;
				}
			}

			if (suksesDownload === 0) {
				throw new Error(
					"Gagal mengunduh semua foto. " +
						(firstError || "Server mungkin sedang gangguan."),
				);
			}

			updateProgress(
				`✅ Selesai — ${suksesDownload} file berhasil diunduh!`,
				100,
			);
			setTimeout(hideProgress, 3500);
		} catch (err) {
			hideProgress();
			console.error("[VM SIMKAH BULK ERROR]", err);
			alert("❌ Gagal: " + err.message);
		} finally {
			document
				.querySelectorAll(".vm-bulk-btn")
				.forEach((b) => (b.disabled = false));
		}
	}

	// ── Table Injection ───────────────────────────────────────────────────────
	function injectButtons() {
		document.querySelectorAll("table tbody tr").forEach((tr) => {
			if (tr.dataset.vmDone) return;

			const cells = tr.querySelectorAll("td");
			if (cells.length < 12) return;

			// Pastikan data baris valid
			const data = extractRowData(cells);
			if (!data.noPendaftaran) return;

			tr.dataset.vmDone = "1";

			const btn = document.createElement("button");
			btn.className = "vm-btn-buat";
			btn.innerHTML = "-";
			btn.title = "Generate Dokumentasi HD";
			btn.onclick = (e) => {
				e.preventDefault();
				e.stopPropagation();
				showModal(extractRowData(cells), tr);
			};

			// Menggunakan index kolom 13 sesuai script v1.4.1 (kolom action)
			const actionCell = cells[13];
			if (actionCell) {
				actionCell.style.display = "flex";
				actionCell.style.alignItems = "center";
				actionCell.style.justifyContent = "center";
				actionCell.style.gap = "6px";
				actionCell.style.whiteSpace = "nowrap";
				actionCell.appendChild(btn);
			}
		});

		injectBulkToolbar();
	}

	function extractRowData(cells) {
		// Fallback robust: index berdasar script lama, tapi aman jika ada perubahan struktur
		const g = (idx) => cells[idx]?.textContent.trim() || "";
		const lokasiNikah = g(15) || g(1); // Coba ambil lokasi dari offset terjauh
		return {
			noPendaftaran: g(4),
			noAkta: g(5),
			namaSuami: g(7),
			namaIstri: g(9),
			tanggalAkad: g(10),
			lokasiNikah: lokasiNikah,
			nikahKantor: !lokasiNikah.toUpperCase().includes("LUAR"),
		};
	}

	// ── Modal ─────────────────────────────────────────────────────────────────
	async function showModal(data, tr) {
		document.getElementById("vm-overlay")?.remove();

		// Fetch officiant_name dari database berdasarkan no_pendaftaran
		const dbPenghulu = await fetchOfficiantFromDB(data.noPendaftaran);

		const penghuluOptions = [
			{ value: "", label: "-- Pilih Penghulu --", disabled: true },
			{ value: "DRS. H. MA'MUN NAWAWI", label: "DRS. H. MA'MUN NAWAWI" },
			{ value: "NUNU HUSNUL HITAM, SHI.", label: "NUNU HUSNUL HITAM, SHI." },
			{ value: "JALALUDIN, S.H.", label: "JALALUDIN, S.H." },
		];

		// Tentukan opsi terpilih dari database (case-insensitive)
		const selectedValue = dbPenghulu
			? penghuluOptions.find(
					(opt) =>
						opt.value.toUpperCase() === dbPenghulu.toUpperCase(),
				)?.value ?? ""
			: "";

		const optionsHTML = penghuluOptions
			.map(
				(opt) =>
					`<option value="${esc(opt.value)}"${opt.disabled ? " disabled" : ""}${opt.value === selectedValue && !opt.disabled ? " selected" : ""}>
						${esc(opt.label)}
					</option>`,
			)
			.join("");

		const overlay = document.createElement("div");
		overlay.id = "vm-overlay";
		overlay.innerHTML = `
            <div id="vm-modal">
                <h3>📄 Lampiran Dokumentasi Akad (HD)</h3>
                <div class="vm-field">
                    <label>NO. PENDAFTARAN</label>
                    <input type="text" value="${esc(data.noPendaftaran)}" readonly>
                </div>
                <div class="vm-field" style="display:flex; gap:10px;">
                    <div style="flex:1">
                        <label>NAMA SUAMI</label>
                        <input type="text" value="${esc(data.namaSuami)}" readonly>
                    </div>
                    <div style="flex:1">
                        <label>NAMA ISTRI</label>
                        <input type="text" value="${esc(data.namaIstri)}" readonly>
                    </div>
                </div>
                <div class="vm-field" style="display:flex; gap:10px;">
                    <div style="flex:1">
                        <label>NO. AKTA NIKAH</label>
                        <input type="text" value="${esc(data.noAkta)}" readonly>
                    </div>
                    <div style="flex:1">
                        <label>TANGGAL AKAD</label>
                        <input type="text" value="${esc(data.tanggalAkad)}" readonly>
                    </div>
                </div>

                <hr class="vm-divider">

                <div class="vm-field">
                    <label>PENGHULU <span style="color:red">*</span></label>
                    <select id="vm-penghulu" class="vm-editable">
                        ${optionsHTML}
                    </select>
                </div>
                <div class="vm-field">
                    <label>FOTO AKAD <span style="color:red">*</span> <span style="font-weight:400;color:#888">(kualitas HD)</span></label>
                    <input type="file" id="vm-foto" accept="image/*">
                    <img id="vm-foto-preview" alt="preview foto">
                </div>

                <div class="vm-actions">
                    <button id="vm-btn-cancel">Tutup</button>
                    <button id="vm-btn-download">💾 Download Lokal</button>
                    <button id="vm-btn-generate" title="Upload ke R2 & SIMKAH">🚀 Upload System</button>
                </div>
                <div id="vm-status"></div>
            </div>
        `;

		overlay.querySelector("#vm-foto").addEventListener("change", function () {
			const preview = overlay.querySelector("#vm-foto-preview");
			if (this.files[0]) {
				preview.src = URL.createObjectURL(this.files[0]);
				preview.style.display = "block";
			} else {
				preview.style.display = "none";
			}
		});

		overlay.querySelector("#vm-btn-cancel").onclick = () => overlay.remove();
		overlay.addEventListener("click", (e) => {
			if (e.target === overlay) overlay.remove();
		});
		overlay.querySelector("#vm-btn-download").onclick = () =>
			handleDownload(overlay, data);
		overlay.querySelector("#vm-btn-generate").onclick = () =>
			handleGenerate(overlay, data, tr);

		document.body.appendChild(overlay);
		overlay.querySelector("#vm-penghulu").focus();
	}

	// ── Generate & Upload Alur Ganda (DB/R2 + SIMKAH NATIVE) ───────────────────
	async function handleGenerate(overlay, data, tr) {
		const penghulu = overlay.querySelector("#vm-penghulu").value.trim();
		const fotoInput = overlay.querySelector("#vm-foto");
		const statusEl = overlay.querySelector("#vm-status");
		const genBtn = overlay.querySelector("#vm-btn-generate");

		statusEl.className = "vm-status-err";
		if (!penghulu) return (statusEl.textContent = "⚠ Penghulu harus dipilih.");
		if (!fotoInput.files.length)
			return (statusEl.textContent = "⚠ Foto belum dipilih.");

		genBtn.disabled = true;
		statusEl.className = "vm-status-info";
		statusEl.textContent = "⏳ Memproses dokumen HD...";

		const fotoObjectUrl = URL.createObjectURL(fotoInput.files[0]);
		try {
			const fullData = { ...data, penghulu };
			// Generate utk R2 (kompres jika perlu)
			const blobR2 = await generateJpgMaxSize(
				fullData,
				fotoObjectUrl,
				R2_MAX_BYTES,
			);
			const sizeMB = (blobR2.size / (1024 * 1024)).toFixed(2);

			// 1. Simpan ke Supabase R2
			statusEl.textContent = `⏳ Uploading ke Storage R2 (${sizeMB} MB)...`;
			const resultR2 = await saveToDatabase(blobR2, fullData);

			// 2. Coba injeksi upload langsung ke native web SIMKAH
			statusEl.textContent = `⏳ R2 Selesai. Mencoba auto-upload ke SIMKAH...`;
			// Bikin versi resolusi normal utk SIMKAH kalau diperlukan, atau pakai R2 blob
			const simkahUploaded = await tryUpload(blobR2, fullData, tr);

			if (resultR2.ok && simkahUploaded) {
				statusEl.className = "vm-status-ok";
				statusEl.innerHTML = `✅ Sukses Upload R2 & Native SIMKAH!<br>Silakan klik <b>Simpan</b> di form SIMKAH.`;
				setTimeout(() => overlay.remove(), 4000);
			} else if (resultR2.ok) {
				statusEl.className = "vm-status-ok";
				statusEl.textContent = `✅ Tersimpan di R2, tapi gagal injeksi auto-upload SIMKAH. Silakan upload manual.`;
				downloadBlob(blobR2, buildFilename(fullData));
			} else {
				statusEl.className = "vm-status-err";
				statusEl.textContent = `❌ R2 Gagal: ${resultR2.err}. Coba ulangi.`;
			}

			URL.revokeObjectURL(fotoObjectUrl);
		} catch (err) {
			URL.revokeObjectURL(fotoObjectUrl);
			statusEl.className = "vm-status-err";
			statusEl.textContent = "❌ Error: " + err.message;
			console.error(err);
		} finally {
			genBtn.disabled = false;
		}
	}

	// ── Native SIMKAH Upload (Dari Script Pertama) ────────────────────────────
	async function tryUpload(blob, data, tr) {
		try {
			const actionBtn = tr.cells[1]?.querySelector(
				"button, a, .dropdown-toggle",
			);
			if (actionBtn) actionBtn.click();
			else return false;

			await new Promise((r) => setTimeout(r, 400));

			const menuItems = Array.from(
				document.querySelectorAll(
					".dropdown-menu a, .dropdown-menu button, .dropdown-item",
				),
			);
			const uploadMenu = menuItems.find(
				(el) =>
					el.textContent.toLowerCase().includes("upload dokumentasi akad") &&
					el.offsetParent !== null,
			);
			if (uploadMenu) uploadMenu.click();
			else return false;

			await new Promise((r) => setTimeout(r, 1000));

			const fileInput =
				document.querySelector(
					'.modal input[type="file"], [role="dialog"] input[type="file"]',
				) || document.querySelector('input[type="file"]');
			if (!fileInput) return false;

			const file = new File([blob], buildFilename(data), {
				type: "image/jpeg",
				lastModified: Date.now(),
			});
			const dt = new DataTransfer();
			dt.items.add(file);
			fileInput.files = dt.files;
			fileInput.dispatchEvent(new Event("change", { bubbles: true }));
			fileInput.dispatchEvent(new Event("input", { bubbles: true }));

			return true;
		} catch (error) {
			return false;
		}
	}

	// ── Download Lokal ────────────────────────────────────────────────────────
	async function handleDownload(overlay, data) {
		const penghulu = overlay.querySelector("#vm-penghulu").value.trim();
		const fotoInput = overlay.querySelector("#vm-foto");
		const statusEl = overlay.querySelector("#vm-status");
		const dlBtn = overlay.querySelector("#vm-btn-download");

		statusEl.className = "vm-status-err";
		if (!penghulu) return (statusEl.textContent = "⚠ Penghulu harus dipilih.");
		if (!fotoInput.files.length)
			return (statusEl.textContent = "⚠ Foto belum dipilih.");

		const fullData = { ...data, penghulu };
		const filename = buildFilename(fullData);

		// Minta akses File Picker sebelum canvas blocking
		let fileHandle = null;
		if ("showSaveFilePicker" in window) {
			try {
				fileHandle = await window.showSaveFilePicker({
					suggestedName: filename,
					types: [
						{ description: "JPEG Image", accept: { "image/jpeg": [".jpg"] } },
					],
				});
			} catch (e) {
				if (e.name === "AbortError") return;
			}
		}

		dlBtn.disabled = true;
		statusEl.className = "vm-status-info";
		statusEl.textContent = "⏳ Rendering dokumen...";

		const fotoObjectUrl = URL.createObjectURL(fotoInput.files[0]);
		try {
			const blob = await generateJpgMaxSize(
				fullData,
				fotoObjectUrl,
				LOCAL_MAX_BYTES,
			);

			if (fileHandle) {
				const writable = await fileHandle.createWritable();
				await writable.write(blob);
				await writable.close();
			} else {
				downloadBlob(blob, filename);
			}

			statusEl.className = "vm-status-ok";
			statusEl.textContent = `✅ Berhasil disimpan (${(blob.size / 1024 / 1024).toFixed(2)} MB)!`;
		} catch (err) {
			statusEl.className = "vm-status-err";
			statusEl.textContent = "❌ Error: " + err.message;
		} finally {
			URL.revokeObjectURL(fotoObjectUrl);
			dlBtn.disabled = false;
		}
	}

	// ── API/Fetch Helpers ─────────────────────────────────────────────────────
	function fetchOfficiantFromDB(noPendaftaran) {
		if (!noPendaftaran) return Promise.resolve(null);
		const url = `${SUPABASE_URL}/rest/v1/weddings?no_pendaftaran=eq.${encodeURIComponent(noPendaftaran)}&select=officiant_name`;
		return new Promise((resolve) => {
			GM_xmlhttpRequest({
				method: "GET",
				url,
				headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json" },
				onload(res) {
					try {
						const arr = JSON.parse(res.responseText);
						resolve(Array.isArray(arr) && arr.length > 0 ? arr[0].officiant_name : null);
					} catch {
						resolve(null);
					}
				},
				onerror() {
					resolve(null);
				},
			});
		});
	}

	function fetchDokumentasi(bulan, tahun, kantorOnly) {
		let url = `${SUPABASE_URL}/rest/v1/dokumentasi_akad?tanggal_akad=like.*-${bulan}-${tahun}&foto_url=not.is.null&select=nama_suami,foto_url`;
		if (kantorOnly) url += `&nikah_kantor=eq.true`;
		return new Promise((resolve, reject) => {
			GM_xmlhttpRequest({
				method: "GET",
				url,
				headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json" },
				onload(res) {
					res.status >= 200 && res.status < 300
						? resolve(JSON.parse(res.responseText))
						: reject(new Error(`HTTP ${res.status}`));
				},
				onerror() {
					reject(new Error("Network error"));
				},
			});
		});
	}

	function gmGetBinary(url) {
		return new Promise((resolve, reject) => {
			GM_xmlhttpRequest({
				method: "GET",
				url,
				responseType: "arraybuffer",
				onload(res) {
					res.status >= 200 && res.status < 300
						? resolve(res.response)
						: reject(new Error(`HTTP ${res.status}`));
				},
				onerror() {
					reject(new Error("Gagal download blob"));
				},
			});
		});
	}

	async function saveToDatabase(blob, data) {
		const base64 = await blobToBase64(blob);
		const payload = JSON.stringify({
			no_pendaftaran: data.noPendaftaran,
			no_akta: data.noAkta,
			nama_suami: data.namaSuami,
			nama_istri: data.namaIstri,
			tanggal_akad: data.tanggalAkad,
			penghulu: data.penghulu,
			lokasi_nikah: data.lokasiNikah,
			nikah_kantor: data.nikahKantor,
			foto_base64: base64,
			filename: buildFilename(data),
		});

		return new Promise((resolve) => {
			GM_xmlhttpRequest({
				method: "POST",
				url: `${SUPABASE_URL}/functions/v1/lampiran-dokumentasi`,
				headers: { "Content-Type": "application/json", apikey: SUPABASE_KEY },
				data: payload,
				onload(res) {
					if (res.status >= 200 && res.status < 300) resolve({ ok: true });
					else resolve({ ok: false, err: `HTTP ${res.status}: API Error` });
				},
				onerror() {
					resolve({ ok: false, err: "Edge function network error" });
				},
			});
		});
	}

	// ── Canvas Generation ─────────────────────────────────────────────────────
	async function generateJpgMaxSize(data, fotoUrl, maxBytes) {
		for (const q of [0.95, 0.82, 0.65, 0.45, 0.3]) {
			const blob = await generateJpg(data, fotoUrl, q);
			if (blob.size <= maxBytes) return blob;
		}
		return generateJpg(data, fotoUrl, 0.2);
	}

	function generateJpg(data, fotoUrl, quality) {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => {
				try {
					const canvas = buildCanvas(data, img);
					canvas.toBlob(
						(blob) =>
							blob ? resolve(blob) : reject(new Error("Canvas gagal")),
						"image/jpeg",
						quality,
					);
				} catch (e) {
					reject(e);
				}
			};
			img.onerror = () => reject(new Error("Gagal load image canvas"));
			img.src = fotoUrl;
		});
	}

	function buildCanvas(data, fotoImg) {
		const baseW = 794,
			baseH = 1123,
			scale = 3;
		const canvas = document.createElement("canvas");
		canvas.width = baseW * scale;
		canvas.height = baseH * scale;
		const ctx = canvas.getContext("2d");
		ctx.scale(scale, scale);

		const ML = 72,
			MR = 72,
			CW = baseW - ML - MR;
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0, 0, baseW, baseH);

		let y = 72;
		ctx.fillStyle = "#000000";
		ctx.textAlign = "center";
		ctx.font = 'bold 16px "Times New Roman", Times, serif';
		ctx.fillText(
			"LAMPIRAN DOKUMENTASI PERISTIWA NIKAH LUAR KANTOR",
			baseW / 2,
			y,
		);
		y += 24;
		ctx.fillText("KANTOR URUSAN AGAMA KECAMATAN PEBAYURAN", baseW / 2, y);
		y += 24;

		const [dd, mm, yyyy] = (data.tanggalAkad || "").split("-");
		const bulanStr = mm ? BULAN_CANVAS[parseInt(mm, 10) - 1] || "" : "";
		ctx.fillText(`BULAN ${bulanStr} TAHUN ${yyyy || ""}`, baseW / 2, y);
		y += 16;

		ctx.strokeStyle = "#000000";
		ctx.lineWidth = 2.5;
		ctx.beginPath();
		ctx.moveTo(ML, y);
		ctx.lineTo(baseW - MR, y);
		ctx.stroke();
		y += 30;

		ctx.textAlign = "left";
		const labelX = ML,
			colonX = ML + 172,
			valueX = colonX + 18,
			lineH = 29;
		[
			["NO. PENDAFTARAN", data.noPendaftaran],
			["NO. AKTA NIKAH", data.noAkta],
			["NAMA SUAMI", data.namaSuami],
			["NAMA ISTRI", data.namaIstri],
			["TANGGAL AKAD", data.tanggalAkad],
			["PENGHULU", data.penghulu],
		].forEach(([label, value]) => {
			ctx.font = '14px "Times New Roman", Times, serif';
			ctx.fillStyle = "#000000";
			ctx.fillText(label, labelX, y);
			ctx.fillText(":", colonX, y);
			ctx.font = 'bold 14px "Times New Roman", Times, serif';
			ctx.fillText(value || "", valueX, y);
			y += lineH;
		});

		y += 22;
		const iw = fotoImg.naturalWidth || fotoImg.width,
			ih = fotoImg.naturalHeight || fotoImg.height;
		const fitScale = Math.min(CW / iw, (baseH - y - 40) / ih, 1);
		const pw = Math.round(iw * fitScale),
			ph = Math.round(ih * fitScale);
		ctx.drawImage(fotoImg, ML + Math.round((CW - pw) / 2), y, pw, ph);

		return canvas;
	}

	// ── Utils ─────────────────────────────────────────────────────────────────
	function buildFilename(data) {
		const [dd, mm, yyyy] = (data.tanggalAkad || "").split("-");
		const date = dd && mm && yyyy ? `${dd}${mm}${yyyy}` : "tanggal";
		return `${date}_${(data.namaSuami || "suami").replace(/\s+/g, "_")}_${(data.namaIstri || "istri").replace(/\s+/g, "_")}.jpg`;
	}

	function downloadBlob(blob, filename) {
		const url = URL.createObjectURL(blob);
		const a = Object.assign(document.createElement("a"), {
			href: url,
			download: filename,
		});
		document.body.appendChild(a);
		a.click();
		a.remove();
		setTimeout(() => URL.revokeObjectURL(url), 1000);
	}

	function blobToBase64(blob) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result.split(",")[1]);
			reader.onerror = reject;
			reader.readAsDataURL(blob);
		});
	}

	function esc(str) {
		return (str || "")
			.replace(/"/g, "&quot;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;");
	}

	function showProgress(msg, pct) {
		let el = document.getElementById("vm-progress-overlay");
		if (!el) {
			el = document.createElement("div");
			el.id = "vm-progress-overlay";
			el.innerHTML = `<div id="vm-progress-box"><p id="vm-progress-msg"></p><div id="vm-progress-bar-wrap"><div id="vm-progress-bar"></div></div><div id="vm-progress-label"></div></div>`;
			document.body.appendChild(el);
		}
		updateProgress(msg, pct);
	}

	function updateProgress(msg, pct) {
		const m = document.getElementById("vm-progress-msg"),
			b = document.getElementById("vm-progress-bar"),
			l = document.getElementById("vm-progress-label");
		if (m) m.textContent = msg;
		if (b) b.style.width = pct + "%";
		if (l) l.textContent = Math.round(pct) + "%";
	}

	function hideProgress() {
		document.getElementById("vm-progress-overlay")?.remove();
	}

	// ── Observers ─────────────────────────────────────────────────────────────
	new MutationObserver(injectButtons).observe(document.body, {
		childList: true,
		subtree: true,
	});
	injectButtons();
})();
