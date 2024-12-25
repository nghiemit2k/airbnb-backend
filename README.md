This is a monorepo for the Airbnb backend. It is built with NestJS and Prisma. webhook is built with Stripe.
## Database Tables

| **User**       | **Country**   | **Category**  | **Amenity**   | **Property**  | **Reservation** |
|----------------|---------------|---------------|---------------|---------------|-----------------|
| id             | id            | id            | id            | id            | id              |
| email          | name          | name          | name          | name          | propertyId      |
| password       | code          | description   |               | tagLine       | userId          |
| username       | createdAt     | createdAt     | createdAt     | categoryId    | totalPrice      |
| firstName      | updatedAt     | updatedAt     | updatedAt     | description   | startDate       |
| lastName       |               |               |               | coverUrl      | endDate         |
| createdAt      |               |               |               | price         | createdAt       |
| updatedAt      |               |               |               | guests        | updatedAt       |
|                |               |               |               | bedrooms      |                 |
|                |               |               |               | beds          |                 |
|                |               |               |               | baths         |                 |
|                |               |               |               | creatorId     |                 |
|                |               |               |               | createdAt     |                 |
|                |               |               |               | updatedAt     |                 |

### Relationships

- **User**: 
  - Has many `properties`
  - Has many `reservations`

- **Country**: 
  - (Commented out) Has many `properties`

- **Category**: 
  - Has many `properties`

- **Amenity**: 
  - (Commented out) Has many `properties`

- **Property**: 
  - Belongs to `Category`
  - (Commented out) Belongs to `Country`
  - (Commented out) Has many `amenities`
  - Belongs to `User` (as `creator`)
  - Has many `reservations`

- **Reservation**: 
  - Belongs to `Property`
  - Belongs to `User`

## Setup

```bash
yarn install
```

## Run

```bash
yarn start:dev:main-service
```

## Migration

```bash
yarn migration:generate
```

## ngrok

```bash
ngrok http 4400
```

## Stripe Webhook

```bash
stripe listen --forward-to http://localhost:4400/api/webhook/stripe
```
