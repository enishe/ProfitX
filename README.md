# 📊 ProfitX

[![Status](https://img.shields.io/badge/Status-In%20Development-blue.svg)]()
[![Repository](https://img.shields.io/badge/Repo-ProfitX-green.svg)](https://github.com/enishe/ProfitX)

Sistem online për kontabilitetin e një biznesi të vogël.

---

## 📋 Informacione Përmbledhëse

| Sektori | Detajet |
| :--- | :--- |
| **Lënda** | Kontabilitet në IT dhe ERP |
| **Grupimi** | ProfitX |
| **Udhëheqësi i Grupit (Team Leader)** | [Enis Hetemi](https://github.com/enishe) (`@enishe`) |

---

## 👥 Anëtarët e Grupit dhe Përgjegjësitë

| # | Emri & Mbiemri | Roli në Projekt | GitHub Username |
| :-: | :--- | :--- | :--- |
| 1 | **Enis Hetemi** | 👑 Team Leader | [`@enishe`](https://github.com/enishe) |
| 2 | **Artiola** | 👩‍💻 Developer / Analyst | [`@Artiola0406`](https://github.com/Artiola0406) |
| 3 | **Dhurata** | 👩‍💻 Developer / Analyst | [`@dhuratacanhasi`](https://github.com/dhuratacanhasi) |
| 4 | **Dua** | 👩‍💻 Developer / Analyst | [`@gashidua`](https://github.com/gashidua) |
| 5 | **Elma** | 👩‍💻 Developer / Analyst | [`@elmaarifi`](https://github.com/elmaarifi) |
| 6 | **Suela** | 👩‍💻 Developer / Analyst | [`@suelaahmetti`](https://github.com/suelaahmetti) |

---

## ✨ Funksionet kryesore

- 💰 Regjistrimi i të ardhurave dhe shpenzimeve
- 🧾 Krijimi dhe menaxhimi i faturave
- 📈 Llogaritja automatike e fitimit dhe humbjes
- 📊 Dashboard me grafikë financiarë
- 🗓️ Raporte mujore dhe vjetore
- 🤝 Menaxhimi i klientëve dhe furnitorëve

---

## 🛠️ Teknologjitë

| Pjesa | Teknologjia |
| :--- | :--- |
| **Backend** | Node.js, Express, Prisma |
| **Databaza** | PostgreSQL |
| **Frontend** | React (Vite), React Router, Axios, Recharts |

---

## 📁 Struktura e projektit

```
ProfitX/
├── backend/     # API (Express + Prisma)
├── frontend/    # Aplikacioni React
├── docs/        # ERD, wireframes
└── README.md
```

---

## 🚀 Si niset projekti

### Backend
```bash
cd backend
npm install
cp .env.example .env   # Windows PowerShell: copy .env.example .env
npm run dev
```
Pastaj hap `.env` dhe vendos `DATABASE_URL` dhe `JWT_SECRET` (kërkoji Team Leader-it).

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🔀 Rregullat e punës në GitHub

- Degët: `main` (stabile), `develop` (integrimi), `feature/emri-i-taskut`.
- Askush nuk bën push direkt në `main` ose `develop`.
- Çdo ndryshim hyn me **Pull Request** dhe të paktën 1 review nga një anëtar tjetër.
- Çdo task ka një Issue; në PR shkruaj `Closes #numri`.
- Mos e ngarko kurrë skedarin `.env` në GitHub.