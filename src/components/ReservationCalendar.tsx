'use client';

import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import ja from 'date-fns/locale/ja';

interface Reservation {
  id: number;
  name: string;
  dateTime: string;
  guests: number;
}

interface Props {
  reservations: Reservation[];
  onSelectEvent: (reservation: Reservation) => void;
}

const locales = {
  'ja': ja,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date, options) => startOfWeek(date, { ...options, locale: ja, weekStartsOn: 1 }),
  getDay,
  locales,
});

export default function ReservationCalendar({ reservations, onSelectEvent }: Props) {
  const events: Event[] = reservations.map(r => ({
    title: `${r.name} (${r.guests}名)`,
    start: new Date(r.dateTime),
    end: new Date(r.dateTime), // Assuming reservations are for a specific point in time
    resource: r, // Attach the full reservation object
  }));

  const handleSelectEvent = (event: Event) => {
    onSelectEvent(event.resource as Reservation);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md" style={{ height: '70vh' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ flex: 1 }}
        culture="ja"
        messages={{
          next: "次",
          previous: "前",
          today: "今日",
          month: "月",
          week: "週",
          day: "日",
          agenda: "アジェンダ",
          date: "日付",
          time: "時間",
          event: "イベント",
        }}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
}
