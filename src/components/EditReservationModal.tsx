'use client';

import { useState, useEffect, FormEvent } from 'react';

interface Reservation {
  id: number;
  name: string;
  dateTime: string;
  guests: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  reservation: Reservation | null;
  onUpdated: () => void;
}

// Helper function to format date for datetime-local input
const formatDateTimeForInput = (isoString: string) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
};

export default function EditReservationModal({ isOpen, onClose, reservation, onUpdated }: Props) {
  const [name, setName] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [guests, setGuests] = useState('1');

  useEffect(() => {
    if (reservation) {
      setName(reservation.name);
      setDateTime(formatDateTimeForInput(reservation.dateTime));
      setGuests(reservation.guests.toString());
    }
  }, [reservation]);

  if (!isOpen || !reservation) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/reservations/${reservation.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            dateTime: new Date(dateTime).toISOString(),
            guests: parseInt(guests, 10),
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update reservation');
      }

      onUpdated(); // Notify parent component
      onClose(); // Close modal
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">予約を編集</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="edit-name" className="block text-sm font-medium text-gray-600">名前</label>
            <input
              id="edit-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
              required
            />
          </div>
          <div>
            <label htmlFor="edit-datetime" className="block text-sm font-medium text-gray-600">日時</label>
            <input
              id="edit-datetime"
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
              required
            />
          </div>
          <div>
            <label htmlFor="edit-guests" className="block text-sm font-medium text-gray-600">人数</label>
            <input
              id="edit-guests"
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
              required
              min="1"
            />
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              更新する
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
