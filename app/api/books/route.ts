import { NextResponse } from 'next/server';

type Book = {
    id: number;
    title: string;
    author: string;
};

export async function GET() {
    const books: Book[] = [
        { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
        { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
        { id: 3, title: '1984', author: 'George Orwell' },
        { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen' },
    ];

    return NextResponse.json(books);
}
