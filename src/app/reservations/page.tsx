'use client';

import { useState, useEffect, FormEvent } from 'react';
import EditReservationModal from '@/components/EditReservationModal';
import ReservationCalendar from '@/components/ReservationCalendar';
import AddReservationModal from '@/components/AddReservationModal';

interface Reservation {
  id: number;
  name: string;
  dateTime: string;
  guests: number;
}

// Helper function to get the current local time in 'YYYY-MM-DDTHH:mm' format
const getLocalDateTime = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
};

export default function ReservationPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [name, setName] = useState('');
  const [dateTime, setDateTime] = useState(getLocalDateTime());
  const [guests, setGuests] = useState('1');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const fetchReservations = async () => {
    try {
      const response = await fetch('/api/reservations');
      if (!response.ok) {
        throw new Error('Failed to fetch reservations');
      }
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

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

      setName('');
      setDateTime(getLocalDateTime());
      setGuests('1');
      fetchReservations();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/reservations/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete reservation');
      fetchReservations();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedReservation(null);
  };

  const handleAddModalOpen = () => {
    setIsAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };

  const handleReservationUpdated = () => {
    fetchReservations();
  };

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">予約管理</h1>

        <div className="flex justify-end mb-4">
          <button
            onClick={handleAddModalOpen}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            新規予約を追加
          </button>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">現在の予約</h2>
          <ReservationCalendar reservations={reservations} onSelectEvent={handleEditClick} />
        </div>
      </div>

      <AddReservationModal
        isOpen={isAddModalOpen}
        onClose={handleAddModalClose}
        onAdded={fetchReservations}
      />

      <EditReservationModal 
        isOpen={isEditModalOpen} 
        onClose={handleEditModalClose} 
        reservation={selectedReservation} 
        onUpdated={handleReservationUpdated} 
      />
    </>
  );
}
