import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import type {
  DateSelectArg,
  EventClickArg,
  EventInput,
} from "@fullcalendar/core";
import type { TrainingSession } from "../../types/session";
import interactionPlugin from "@fullcalendar/interaction";
import "../schedule/weeklySchedule.css";


type AdminWeeklyScheduleProps = {
  sessions: TrainingSession[];
  onSelectSlot: (selection: DateSelectArg) => void;
  onSessionClick: (
    session: TrainingSession,
  ) => void;
};

function getSessionClassName(
  session: TrainingSession,
): string {
  const typeName =
    session.trainingTypeName.toLowerCase();

  if (typeName === "yoga") {
    return "event-yoga";
  }

  if (typeName === "crossfit") {
    return "event-crossfit";
  }

  if (typeName === "pilates") {
    return "event-pilates";
  }

  return "event-default";
}

function AdminWeeklySchedule({
  sessions,
  onSelectSlot,
  onSessionClick,
}: AdminWeeklyScheduleProps) {
  const events: EventInput[] = sessions.map(
    (session) => ({
      id: String(session.id),
      title: `${session.trainingTypeName} · ${session.roomName}`,
      start: `${session.date}T${session.startTime}`,
      end: `${session.date}T${session.endTime}`,
      extendedProps: {
        session,
      },
      classNames: [
        getSessionClassName(session),
        `session-status-${session.status.toLowerCase()}`,
      ],
    }),
  );

  const handleEventClick = (info: EventClickArg) => {
    const session =
      info.event.extendedProps.session as TrainingSession;

    onSessionClick(session);
  };

  return (
    <div className="weekly-schedule">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        initialDate="2026-07-27"
        firstDay={1}
        allDaySlot={false}
        selectable
        selectMirror
        nowIndicator
        expandRows
        slotDuration="01:00:00"
        slotLabelInterval="01:00:00"
        slotMinTime="07:00:00"
        slotMaxTime="23:00:00"
        height="auto"
        events={events}
        select={onSelectSlot}
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
        eventContent={(eventInfo) => {
          const session =
            eventInfo.event.extendedProps
              .session as TrainingSession;

          return (
            <div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "0.82rem",
                }}
              >
                {session.trainingTypeName}
              </div>

              <div
                style={{
                  fontSize: "0.72rem",
                  opacity: 0.9,
                }}
              >
                {session.roomName}
              </div>

              <div
                style={{
                  fontSize: "0.7rem",
                  opacity: 0.75,
                }}
              >
                {session.status}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
export default AdminWeeklySchedule;