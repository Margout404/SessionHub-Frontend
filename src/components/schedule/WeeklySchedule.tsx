import { useState } from "react";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bookingService from "../../services/bookingService";

import type { EventApi, EventClickArg, EventInput } from "@fullcalendar/core";

import SessionDetailsDialog from "./SessionDetailsDialog";
import type { TrainingSession } from "../../types/session";

import "./weeklySchedule.css";

type WeeklyScheduleProps = {
  sessions: TrainingSession[];
  onDatesChange: (from: string, to: string) => void;
  onEnrollSuccess: () => void;
};

function WeeklySchedule({
  sessions,
  onDatesChange,
  onEnrollSuccess,
}: WeeklyScheduleProps) {
  const [selectedSession, setSelectedSession] = useState<EventApi | null>(null);

  const events: EventInput[] = sessions.map((session) => ({
    id: String(session.sessionId),

    title: session.trainingTypeName,

    start: `${session.date}T${session.startTime}`,
    end: `${session.date}T${session.endTime}`,

    extendedProps: {
      session,
      roomName: session.roomName,
      trainerName: session.trainerName,
      capacity: session.maxParticipants,
      participants: session.currentEnrollments,
    },
  }));

  const handleEventClick = (info: EventClickArg) => {
    setSelectedSession(info.event);
  };

  const handleCloseDialog = () => {
    setSelectedSession(null);
  };

  const [, setMessage] = useState("");

  const handleEnroll = async (sessionId: number) => {
    try {
      const response = await bookingService.enroll(sessionId);

      if (response.status === "CONFIRMED") {
        setMessage("Η κράτηση ολοκληρώθηκε επιτυχώς.");
      } else if (response.status === "WAITING_LIST") {
        setMessage("Μπήκες στη λίστα αναμονής.");
      }

      handleCloseDialog();

      onEnrollSuccess();
    } catch (error) {
      console.error("Enroll failed:", error);
    }
  };

  return (
    <div className="weekly-schedule">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        firstDay={1}
        allDaySlot={false}
        slotMinTime="07:00:00"
        slotMaxTime="23:00:00"
        slotDuration="01:00:00"
        slotLabelInterval="01:00:00"
        nowIndicator
        expandRows
        height="auto"
        eventClick={handleEventClick}
        events={events}
        datesSet={(dateInfo) => {
          const from = dateInfo.startStr.slice(0, 10);

          const endDate = new Date(dateInfo.end);

          endDate.setDate(endDate.getDate() - 1);

          const to = endDate.toISOString().slice(0, 10);

          onDatesChange(from, to);
        }}
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
