import { Eventcalendar } from "@mobiscroll/react";
import { useMemo, useCallback } from "react";

function Calendar({
  myEvents,
  mySelectedDate,
  onSelectedDateChange,
  onEventClick,
  onEventCreated,
  onEventDeleted,
  onEventUpdated,
}) {
  const myView = useMemo(() => ({ schedule: { type: "week" } }), []);

  return (
    <Eventcalendar
      view={myView}
      data={myEvents}
      clickToCreate="double"
      dragToCreate={true}
      dragToMove={true}
      dragToResize={true}
      selectedDate={mySelectedDate}
      onSelectedDateChange={onSelectedDateChange}
      onEventClick={onEventClick}
      onEventCreated={onEventCreated}
      onEventDeleted={onEventDeleted}
      onEventUpdated={onEventUpdated}
    />
  );
}

export default Calendar;
