'use client';

import { useState, FormEvent } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdded: () => void;
}

// Helper function to get the current local time in 'YYYY-MM-DDTHH:mm' format
const getLocalDateTime = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
};

export default function AddReservationModal({ isOpen, onClose, onAdded }: Props) {
  const [name, setName] = useState('');
  const [dateTime, setDateTime] = useState(getLocalDateTime());
  const [guests, setGuests] = useState('1');

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          dateTime: new Date(dateTime).toISOString(), 
          guests: parseInt(guests, 10) 
        }),
      });

      if (!response.ok) throw new Error('Failed to create reservation');

      // Clear form and notify parent
      setName('');
      setDateTime(getLocalDateTime());
      setGuests('1');
      onAdded(); // Notify parent component that a new reservation was added
      onClose(); // Close modal
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">新規予約を追加</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="add-name" className="block text-sm font-medium text-gray-600">名前</label>
            <input
              id="add-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
              required
            />
          </div>
          <div>
            <label htmlFor="add-datetime" className="block text-sm font-medium text-gray-600">日時</label>
            <input
              id="add-datetime"
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
              required
            />
          </div>
          <div>
            <label htmlFor="add-guests" className="block text-sm font-medium text-gray-600">人数</label>
            <input
              id="add-guests"
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
              予約を追加
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
