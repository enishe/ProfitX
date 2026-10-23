\# FinTrack — Database Setup



\## Neon connection



ProfitX uses the Neon PostgreSQL database named `profitx`.



In `backend/.env`, configure:



\- `DATABASE\_URL`: pooled Neon URL for the application.

\- `DIRECT\_URL`: direct Neon URL for Prisma migrations.



Keep `backend/.env` local and do not commit it.



\## Prisma commands



Run these commands from the repository root:



```powershell

cd backend

npm install

npx prisma validate

npm run db:check

npx prisma migrate dev --name init

npx prisma generate

npx prisma migrate status

```



Prisma reads the migration URL from `DIRECT\_URL` in `prisma.config.ts`. The initial migration is stored under `backend/prisma/migrations/`.



\## Verify the tables in Neon



In Neon SQL Editor, select database `profitx` and run:



```sql

SELECT table\_name

FROM information\_schema.tables

WHERE table\_schema = 'public'

ORDER BY table\_name;

```



The initial schema includes `User`, `Client`, `Supplier`, `Category`, `Transaction`, `Invoice`, and `InvoiceItem`, plus Prisma's `\_prisma\_migrations` table.



\## References



\- \[Prisma 7 migrate dev](https://www.prisma.io/docs/cli/v7/migrate/dev)

\- \[Neon: Manage databases](https://neon.com/docs/manage/databases)

