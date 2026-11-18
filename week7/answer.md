
# Week 07 Answers

### 1. Why does Booking have an eventId column but Event has no bookingIds column? Where is the “many” side of a 1-N relation stored?

Booking has an `eventId` column because each booking belongs to one event, while one event can have many bookings. The “many” side of a 1-N (one-to-many) relationship is stored using a foreign key in the child table, which is `Booking` in this case.

### 2. booked repeats information we could compute with COUNT and SUM over bookings. Why keep it, and what must the code do so it never becomes wrong?

We keep `booked` because calculating the total booked seats from all bookings every time can be slower and less efficient. The code must update `booked` whenever a booking is created, cancelled, or changed, and both operations must happen in the same database transaction to keep the data consistent.

### 3. What is the difference between prisma migrate dev and prisma generate? Which one changes the database?

`prisma migrate dev` creates and applies database migrations to update the database schema based on changes in the Prisma schema. `prisma generate` generates the Prisma Client so the application can communicate with the database using the updated models. **Only `prisma migrate dev` changes the database schema.**

### 4. A page lists 20 events with their bookings. One version runs 1 query, another runs 21. Name the problem and show how include fixes it.

This is called the **N+1 query problem**, where the application runs one query to get all events and then 20 additional queries to get bookings for each event. We can fix it using Prisma's `include` to fetch events and their bookings together:

```typescript
const events = await prisma.event.findMany({
  include: {
    bookings: true,
  },
});
```

### 5. Two students book the last seat at the same moment. Explain step by step why the read-check-update version can sell two seats and why the conditional updateMany cannot.

In the read-check-update version, both students can read that one seat is available before either updates the database, so both pass the availability check and may sell the last seat. With conditional `updateMany`, the database checks the availability condition as part of the update itself, so only one request can successfully update the event. The second request updates zero rows, receives a conflict error, and its transaction is rolled back.
