# ProfitX Clients API

Base URL lokale: `http://localhost:5000`

Te gjitha rrugut e klienteve jane te mbrojtura. Kerkesa duhet te dergoje token te vlefshem:

```
Authorization: Bearer <token>
```

Pa token ose me token te pavlefshem API-ja kthen `401`.

## Formati i pergjigjeve

Suksesi kthen objektin `data`. Lista e klienteve kthehet si array direkt ne `data`:

```json
{
  "success": true,
  "data": [
    {
      "id": "3f1c9b1e-5e0a-4b7a-9d5e-2f0c1a7b8c44",
      "userId": "9a2d4c6e-1b3f-4a5d-8c7e-0f1a2b3c4d5e",
      "name": "Klienti Shembull",
      "email": "klienti@example.test",
      "phone": "+383 44 123 456",
      "address": "Rr. Nena Tereze 1",
      "createdAt": "2026-10-31T10:00:00.000Z"
    }
  ]
}
```

Gabimet e validimit kthejne JSON me kete forme:

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Kerkesa permban fusha te pavlefshme.",
  "errors": [
    { "field": "email", "message": "Email-i nuk eshte ne format te vlefshem." }
  ]
}
```

## Fushat e klientit

| Fusha | Kerkueshme | Kufizimi |
| --- | --- | --- |
| `name` | Po | Tekst, maksimumi 150 karaktere, nuk mund te jete bosh |
| `email` | Jo | Format i vlefshem email-i, maksimumi 255 karaktere; ruhet me shkronja te vogla |
| `phone` | Jo | Tekst, maksimumi 30 karaktere; lejohen numra, hapesira, `+`, `-`, `(`, `)`, `.`, `/` |
| `address` | Jo | Tekst, maksimumi 300 karaktere |

Fushat opsionale qe dergohen bosh (`""`) ose `null` ruhen si `null`. Email-i duhet te jete unik per cdo perdorues, por te njejtin email mund ta perdorin perdorues te ndryshem.

## Lista e klienteve

`GET /api/clients`

Kthen vetem klientet e perdoruesit te kycur, te renditur sipas emrit.

| Status | Kuptimi |
| --- | --- |
| `200` | Lista u kthye; `data` eshte array (mund te jete bosh). |
| `401` | Token-i mungon ose nuk eshte i vlefshem. |

## Nje klient

`GET /api/clients/:id`

| Status | Kuptimi |
| --- | --- |
| `200` | Klienti u gjet; `data` permban `client`. |
| `400` | `id` nuk eshte ne formatin UUID. |
| `401` | Token-i mungon ose nuk eshte i vlefshem. |
| `404` | Klienti nuk ekziston ose i perket nje perdoruesi tjeter. |

## Krijimi i klientit

`POST /api/clients`

Trupi i kerkeses:

```json
{
  "name": "Klienti Shembull",
  "email": "klienti@example.test",
  "phone": "+383 44 123 456",
  "address": "Rr. Nena Tereze 1"
}
```

Vetem `name` eshte i detyrueshem. `userId` nuk dergohet ne trup; lidhet automatikisht me perdoruesin e kycur.

| Status | Kuptimi |
| --- | --- |
| `201` | Klienti u krijua; `data` permban `client`. |
| `400` | Ka fusha qe mungojne ose jane me format te pavlefshme; perfshihet lista `errors`. |
| `401` | Token-i mungon ose nuk eshte i vlefshem. |
| `409` | Ky email eshte regjistruar me pare per nje klient te te njejtit perdorues. |

## Ndryshimi i klientit

`PUT /api/clients/:id`

Pranon te njejtat fusha si krijimi, me `name` te detyrueshem. Fushat opsionale qe nuk dergohen mbeten te pandryshuara; fushat qe dergohen bosh ruhen si `null`.

| Status | Kuptimi |
| --- | --- |
| `200` | Klienti u perditesua; `data` permban `client`. |
| `400` | `id` i pavlefshem ose fusha me format te gabuar. |
| `401` | Token-i mungon ose nuk eshte i vlefshem. |
| `404` | Klienti nuk ekziston ose i perket nje perdoruesi tjeter. |
| `409` | Email-i i derguar i perket nje klienti tjeter te te njejtit perdorues. |

## Fshirja e klientit

`DELETE /api/clients/:id`

| Status | Kuptimi |
| --- | --- |
| `200` | Klienti u fshi. |
| `400` | `id` nuk eshte ne formatin UUID. |
| `401` | Token-i mungon ose nuk eshte i vlefshem. |
| `404` | Klienti nuk ekziston ose i perket nje perdoruesi tjeter. |

## Rregulla sigurie

- Cdo veprim kufizohet me `userId` te marre nga token-i, jo nga trupi i kerkeses.
- Klienti i nje perdoruesi tjeter kthehet gjithmone `404`, qofte per lexim, ndryshim ose fshirje.
- Perdoruesi nuk mund te krijoje dy kliente me te njejtin email.
