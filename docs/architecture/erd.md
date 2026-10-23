\# FinTrack — Entity Relationship Diagram



```mermaid

erDiagram

&#x20;   USER ||--o{ CLIENT : owns

&#x20;   USER ||--o{ SUPPLIER : owns

&#x20;   USER ||--o{ CATEGORY : owns

&#x20;   USER ||--o{ TRANSACTION : records

&#x20;   USER ||--o{ INVOICE : creates



&#x20;   CATEGORY ||--o{ TRANSACTION : classifies



&#x20;   CLIENT ||--o{ INVOICE : receives

&#x20;   INVOICE ||--o{ INVOICE\_ITEM : contains



&#x20;   CLIENT o|--o{ TRANSACTION : optionally\_associated

&#x20;   SUPPLIER o|--o{ TRANSACTION : optionally\_associated

```



\## Relationships and rules



\- Each client, supplier, category, transaction, and invoice belongs to one user.

\- A transaction has one category. It may optionally be associated with a client or supplier.

\- An invoice belongs to one client and can contain multiple invoice items.

\- The application should associate an income transaction with a client and an expense transaction with a supplier.

\- `passwordHash` stores a password hash, never a plain-text password.

\- An invoice item's line total is calculated as `quantity × unitPrice`; it is not stored separately.

\- Financial reports should count transactions as income or expenses. An invoice alone is not a recorded payment.

