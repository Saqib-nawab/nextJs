"use client"
import { useEffect, useState } from 'react';

type Book = {
    id: number;
    title: string;
    author: string;
};

export default function Home() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBooks() {
            try {
                const response = await fetch('/api/books'); // Call the serverless function
                const data: Book[] = await response.json();
                setBooks(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching books:', error);
                setLoading(false);
            }
        }

        fetchBooks();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Book List</h1>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        <strong>{book.title}</strong> by {book.author}
                    </li>
                ))}
            </ul>
        </div>
    );
}
