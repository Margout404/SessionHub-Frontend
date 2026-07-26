import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import type {
  EventApi,
  EventClickArg,
} from "@fullcalendar/core";

import SessionDetailsDialog from "./SessionDetailsDialog.tsx";
import "./weeklySchedule.css";

function WeeklySchedule() {
  const [selectedSession, setSelectedSession] =
    useState<EventApi | null>(null);

  const handleEventClick = (info: EventClickArg) => {
    setSelectedSession(info.event);
  };

  const handleCloseDialog = () => {
    setSelectedSession(null);
  };

  const handleEnroll = (sessionId: string) => {
    console.log("Enroll in session:", sessionId);

    // Αργότερα:
    // await bookingService.enroll(sessionId);

    handleCloseDialog();
  };

  return (
    <div className="weekly-schedule">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        initialDate="2026-07-27"
        firstDay={1}
        allDaySlot={false}
        slotMinTime="07:00:00"
        slotMaxTime="23:00:00"
        slotDuration="01:00:00"
        slotLabelInterval="01:00:00"
        nowIndicator
        selectable
        expandRows
        height="auto"
        eventClick={handleEventClick}
        dayHeaderFormat={{
          weekday: "short",
          day: "numeric",
          month: "numeric",
        }}
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridWeek,timeGridDay",
        }}
        buttonText={{
          today: "Σήμερα",
          week: "Εβδομάδα",
          day: "Ημέρα",
        }}
        events={[
          {
            id: "4",
            title: "Yoga",
            start: "2026-07-27T18:00:00",
            end: "2026-07-27T19:00:00",
            classNames: ["event-yoga"],
            extendedProps: {
              roomName: "Room A",
              trainerName: "Maria Papadopoulou",
              participants: 6,
              capacity: 12,
              description:
                "Μάθημα yoga για κινητικότητα, ισορροπία και χαλάρωση.",
            },
          },
          {
            id: "5",
            title: "CrossFit",
            start: "2026-07-27T18:00:00",
            end: "2026-07-27T19:00:00",
            classNames: ["event-crossfit"],
            extendedProps: {
              roomName: "Room B",
              trainerName: "Nikos Georgiou",
              participants: 10,
              capacity: 12,
              description:
                "Προπόνηση υψηλής έντασης με λειτουργικές ασκήσεις.",
            },
          },
          {
            id: "6",
            title: "Pilates",
            start: "2026-07-27T18:00:00",
            end: "2026-07-27T19:00:00",
            classNames: ["event-pilates"],
            extendedProps: {
              roomName: "Room C",
              trainerName: "Eleni Nikolaou",
              participants: 10,
              capacity: 10,
              description:
                "Pilates με έμφαση στον κορμό και τη σωστή στάση σώματος.",
            },
          },
        ]}
      />

      <SessionDetailsDialog
        open={selectedSession !== null}
        session={selectedSession}
        onClose={handleCloseDialog}
        onEnroll={handleEnroll}
      />
    </div>
  );
}

export default WeeklySchedule;