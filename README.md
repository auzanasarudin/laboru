# LABORU Level Up — landing page

Situs statis untuk GitHub Pages.

| Halaman | Isi |
|---|---|
| `index.html` | Landing utama: hero, fitur, demo game, paket, eceran, FAQ |
| `paket.html` | Langsung pilih paket + checkout (`?p=core`, `?p=ultimate`, `?p=entry_habit`, `&go=1`) |
| `checkout.html` | Checkout singkat untuk iklan |

Demo game dimuat dari Cloudflare Worker `laboru-demo` (kode diacak, hanya tampil di dalam landing page ini).

## Tujuan iklan per market
| Market | Iklan | Arahkan ke |
|---|---|---|
| 1 Awam | Kreatif game | `index.html` (landing utama + demo) |
| 2 Ikan kecil | Produk eceran | `index.html#eceran` |
| 3 Ikan besar | Paket Core / Ultimate | `paket.html?p=core` / `paket.html?p=ultimate` (landing singkat, langsung checkout) |

## Mengubah harga & link
- Cara cepat: ubah Google Sheet harga (tab pertama: `kode | nama | harga | harga_coret | link_checkout`). Halaman membaca sheet itu setiap dibuka.
- Cara manual: edit `shared.js` (bagian `checkout` dan `LABORU_PRODUCTS`).

## Aktifkan GitHub Pages
Settings → Pages → Source: *Deploy from a branch* → Branch `main` / `(root)` → Save.
URL: `https://auzanasarudin.github.io/laboru/`
