
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface Params {
  params: { id: string };
}

// PUT: Update a reservation by ID
export async function PUT(request: Request, { params }: Params) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    const { name, dateTime, guests } = await request.json();
    if (!name || !dateTime || !guests) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const updatedReservation = await prisma.reservation.update({
      where: { id },
      data: {
        name,
        dateTime: new Date(dateTime),
        guests,
      },
    });

    return NextResponse.json(updatedReservation);

  } catch (error) {
    console.error("Error updating reservation:", error);
    return NextResponse.json({ error: 'Failed to update reservation' }, { status: 500 });
  }
}

// DELETE: Delete a reservation by ID
export async function DELETE(request: Request, { params }: Params) {
  try {
    const id = parseInt(params.id, 10);

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    await prisma.reservation.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 }); // No Content

  } catch (error) {
    console.error("Error deleting reservation:", error);
    // Handle cases where the record does not exist (e.g., Prisma's P2025 error)
    return NextResponse.json({ error: 'Failed to delete reservation' }, { status: 500 });
  }
}
