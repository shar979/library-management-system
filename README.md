## Schema Decisions

### Why Book References Genre Rather Than Embedding It
In our library catalog database design, we chose to normalize the relationship between `Book` and `Genre` by creating a separate `Genre` table and having `Book` reference it via a foreign key (`genreId`), rather than embedding the genre name directly as a string property inside the `Book` model.

**Key Engineering Benefits:**
1. **Data Integrity & Consistency:** Normalization prevents typographical inconsistencies and duplicate variations (e.g., preventing "Sci-Fi", "Science Fiction", and "science-fiction" from being entered as separate strings).
2. **Maintainability:** If a genre name needs to be updated or corrected, it only requires a single record update in the `Genre` table rather than modifying multiple rows across the `Book` table.
3. **Relational Querying:** It enables efficient joins, relational filtering, and aggregate counts using Prisma's relation features (`include`, `relationJoins`).