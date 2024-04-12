// services/data.ts

import fs from 'fs';
import path from 'path';

// Function to generate a new ID for a note
function generateNewId(notes: Note[]): number {
  const maxId = notes.reduce((max, note) => (note.id > max ? note.id : max), 0);
  return maxId + 1;
}

// Function to add a new note
export function addNote(title: string, content: string, user: string): void {
  const notesFilePath = path.join(__dirname, '..', 'data', 'notes.json');
  const notesData = fs.readFileSync(notesFilePath, 'utf-8');
  const notes: Note[] = JSON.parse(notesData);

  const newNote: Note = {
    id: generateNewId(notes),
    title,
    content,
    user,
    createdAt: new Date(),
  };

  notes.push(newNote);

  fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2));
}