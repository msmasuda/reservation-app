
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET: Fetch all reservations
export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany();
    return NextResponse.json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return NextResponse.json({ error: 'Failed to fetch reservations' }, { status: 500 });
  }
}

// POST: Create a new reservation
export async function POST(request: Request) {
  try {
    const { name, dateTime, guests } = await request.json();

    // Basic validation
    if (!name || !dateTime || !guests) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newReservation = await prisma.reservation.create({
      data: {
        name,
        dateTime: new Date(dateTime),
        guests,
      },
    });

    return NextResponse.json(newReservation, { status: 201 });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return NextResponse.json({ error: 'Failed to create reservation' }, { status: 500 });
  }
}
