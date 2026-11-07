import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing records to avoid unique constraint collisions on re-runs
  await prisma.book.deleteMany();
  await prisma.genre.deleteMany();

  // 1. Create 4 Genres
  const fiction = await prisma.genre.create({ data: { name: 'Fiction' } });
  const sciFi = await prisma.genre.create({ data: { name: 'Science Fiction' } });
  const history = await prisma.genre.create({ data: { name: 'History' } });
  const technology = await prisma.genre.create({ data: { name: 'Technology' } });

  // 2. Create 15+ Books distributed across genres
  const booksData = [
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', publishedYear: 1960, genreId: fiction.id },
    { title: 'Pride and Prejudice', author: 'Jane Austen', publishedYear: 1813, genreId: fiction.id },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', publishedYear: 1925, genreId: fiction.id },
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', publishedYear: 1937, genreId: fiction.id },
    { title: '1984', author: 'George Orwell', publishedYear: 1949, genreId: sciFi.id },
    { title: 'Dune', author: 'Frank Herbert', publishedYear: 1965, genreId: sciFi.id },
    { title: 'Brave New World', author: 'Aldous Huxley', publishedYear: 1932, genreId: sciFi.id },
    { title: 'Foundation', author: 'Isaac Asimov', publishedYear: 1951, genreId: sciFi.id },
    { title: 'Sapiens', author: 'Yuval Noah Harari', publishedYear: 2011, genreId: history.id },
    { title: 'Guns, Germs, and Steel', author: 'Jared Diamond', publishedYear: 1997, genreId: history.id },
    { title: 'A Brief History of Time', author: 'Stephen Hawking', publishedYear: 1988, genreId: history.id },
    { title: 'Clean Code', author: 'Robert C. Martin', publishedYear: 2008, genreId: technology.id },
    { title: 'The Pragmatic Programmer', author: 'Andrew Hunt', publishedYear: 1999, genreId: technology.id },
    { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', publishedYear: 2017, genreId: technology.id },
    { title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', publishedYear: 1990, genreId: technology.id },
  ];

  for (const book of booksData) {
    await prisma.book.create({ data: book });
  }

  console.log('Database seeded successfully with 4 genres and 15 books.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });