# ProfitX Authentication API

Base URL lokale: `http://localhost:5000`

Te gjitha kerkesat POST dergojne JSON. Gabimet e validimit kthejne JSON me kete forme:

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

## Health

`GET /api/health`

| Status | Kuptimi |
| --- | --- |
| `200` | API-ja dhe databaza jane te arritshme; trupi perfshin `status: "ok"` dhe `database: "connected"`. |
| `503` | API-ja u pergjigj, por databaza nuk eshte e lidhur. |

## Regjistrimi

`POST /api/auth/register`

Trupi i kerkeses:

```json
{
  "name": "Emri i proves",
  "email": "prova@example.test",
  "password": "fjalekalim-prove"
}
```

Fushat e detyrueshme jane `name`, `email` dhe `password`. Emri kufizohet ne 100 karaktere, email-i duhet te kete format te vlefshem dhe te jete maksimumi 255 karaktere, ndersa fjalekalimi duhet te kete te pakten 6 karaktere.

| Status | Kuptimi |
| --- | --- |
| `201` | Perdoruesi u krijua. Pergjigjja nuk perfshin `passwordHash`. |
| `400` | Ka fusha qe mungojne ose jane me format/vlera te pavlefshme; perfshihet lista `errors`. |
| `409` | Email-i eshte regjistruar me pare. |

## Hyrja

`POST /api/auth/login`

Trupi i kerkeses:

```json
{
  "email": "prova@example.test",
  "password": "fjalekalim-prove"
}
```

Email-i dhe fjalekalimi jane te detyrueshem. Email-i duhet te kete format te vlefshem.

| Status | Kuptimi |
| --- | --- |
| `200` | Hyrja u krye; pergjigjja permban perdoruesin dhe JWT token-in. |
| `400` | Ka fusha qe mungojne ose jane me format te pavlefshem. |
| `401` | Email-i ose fjalekalimi eshte i pasakte. Mesazhi nuk tregon nese email-i ekziston. |

## Prova me Postman

Importo `backend/tests/postman/ProfitX-API.postman_collection.json` ne Postman. Nis backend-in dhe databazen lokale, pastaj ekzekuto koleksionin nga lart-poshte. Regjistrimi krijon nje email unik `@example.test` ne cdo ekzekutim; hyrja e suksesshme dhe prova me kredenciale te pasakta perdorin ate email.

`samplePassword` ne koleksion eshte vlere shembull per llogarine prove lokale, jo sekret per mjedis real. Mos vendos kredenciale reale apo te dhenat e perdoruesve ne koleksion. Regjistrimi i suksesshem krijon nje rresht prove ne databazen lokale.
