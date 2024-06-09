// import "./App.css";
// import Home from "./components/calander_try";

// function App() {
//   return (
//     <div className="App">
//       <Home />
//     </div>
//   );
// }

// export default App;

import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { useState, useCallback, useMemo, useRef } from "react";
import Calendar from "./components/Calendar";
import PopupForm from "./components/PopupForm";
import ColorPicker from "./components/ColorPicker";
import SnackbarComponent from "./components/SnackbarComponent";
import { setOptions } from "@mobiscroll/react";
import { defaultEvents, colors } from "./utils/data";
import "./index.css";

setOptions({
  theme: "ios",
  themeVariant: "light",
});

function App() {
  const [myEvents, setMyEvents] = useState(defaultEvents);
  const [tempEvent, setTempEvent] = useState(null);
  const [undoEvent, setUndoEvent] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [start, startRef] = useState(null);
  const [end, endRef] = useState(null);
  const [popupEventTitle, setTitle] = useState("");
  const [popupEventDescription, setDescription] = useState("");
  const [popupEventAllDay, setAllDay] = useState(true);
  const [popupTravelTime, setTravelTime] = useState(0);
  const [popupEventDate, setDate] = useState([]);
  const [popupEventStatus, setStatus] = useState("busy");
  const [mySelectedDate, setSelectedDate] = useState(new Date());
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [colorAnchor, setColorAnchor] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [tempColor, setTempColor] = useState("");
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  const colorPicker = useRef();

  const colorButtons = useMemo(
    () => [
      "cancel",
      {
        handler: () => {
          setSelectedColor(tempColor);
          setColorPickerOpen(false);
        },
        keyCode: "enter",
        text: "Save",
        cssClass: "mbsc-popup-button-primary",
      },
    ],
    [tempColor]
  );

  const colorResponsive = useMemo(
    () => ({
      medium: {
        display: "anchored",
        touchUi: false,
        buttons: [],
      },
    }),
    []
  );

  const snackbarButton = useMemo(
    () => ({
      action: () => {
        setMyEvents((prevEvents) => [...prevEvents, undoEvent]);
      },
      text: "Undo",
    }),
    [undoEvent]
  );

  const handleSnackbarClose = useCallback(() => {
    setSnackbarOpen(false);
  }, []);

  const saveEvent = useCallback(() => {
    const newEvent = {
      id: tempEvent.id,
      title: popupEventTitle,
      description: popupEventDescription,
      start: popupEventDate[0],
      end: popupEventDate[1],
      allDay: popupEventAllDay,
      bufferBefore: popupTravelTime,
      status: popupEventStatus,
      color: selectedColor,
    };
    if (isEdit) {
      const index = myEvents.findIndex((x) => x.id === tempEvent.id);
      const newEventList = [...myEvents];
      newEventList.splice(index, 1, newEvent);
      setMyEvents(newEventList);
    } else {
      setMyEvents([...myEvents, newEvent]);
    }
    setSelectedDate(popupEventDate[0]);
    setOpen(false);
  }, [
    isEdit,
    myEvents,
    popupEventAllDay,
    popupEventDate,
    popupEventDescription,
    popupEventStatus,
    popupEventTitle,
    popupTravelTime,
    tempEvent,
    selectedColor,
  ]);

  const deleteEvent = useCallback(
    (event) => {
      setMyEvents(myEvents.filter((item) => item.id !== event.id));
      setUndoEvent(event);
      setTimeout(() => {
        setSnackbarOpen(true);
      });
    },
    [myEvents]
  );

  const loadPopupForm = useCallback((event) => {
    setTitle(event.title);
    setDescription(event.description);
    setDate([event.start, event.end]);
    setAllDay(event.allDay || false);
    setTravelTime(event.bufferBefore || 0);
    setStatus(event.status || "busy");
    setSelectedColor(event.color || "");
  }, []);

  const titleChange = useCallback((ev) => {
    setTitle(ev.target.value);
  }, []);

  const descriptionChange = useCallback((ev) => {
    setDescription(ev.target.value);
  }, []);

  const allDayChange = useCallback((ev) => {
    setAllDay(ev.target.checked);
  }, []);

  const travelTimeChange = useCallback((ev) => {
    setTravelTime(ev.target.value);
  }, []);

  const dateChange = useCallback((args) => {
    setDate(args.value);
  }, []);

  const statusChange = useCallback((ev) => {
    setStatus(ev.target.value);
  }, []);

  const onDeleteClick = useCallback(() => {
    deleteEvent(tempEvent);
    setOpen(false);
  }, [deleteEvent, tempEvent]);

  const onSelectedDateChange = useCallback((event) => {
    setSelectedDate(event.date);
  }, []);

  const onEventClick = useCallback(
    (args) => {
      setEdit(true);
      setTempEvent({ ...args.event });
      loadPopupForm(args.event);
      setAnchor(args.domEvent.target);
      setOpen(true);
    },
    [loadPopupForm]
  );

  const onEventCreated = useCallback(
    (args) => {
      setEdit(false);
      setTempEvent(args.event);
      loadPopupForm(args.event);
      setAnchor(args.target);
      setOpen(true);
    },
    [loadPopupForm]
  );

  const onEventDeleted = useCallback(
    (args) => {
      deleteEvent(args.event);
    },
    [deleteEvent]
  );

  const onEventUpdated = useCallback(() => {}, []);

  const controls = useMemo(
    () => (popupEventAllDay ? ["date"] : ["datetime"]),
    [popupEventAllDay]
  );

  const datepickerResponsive = useMemo(
    () =>
      popupEventAllDay
        ? {
            medium: {
              controls: ["calendar"],
              touchUi: false,
            },
          }
        : {
            medium: {
              controls: ["calendar", "time"],
              touchUi: false,
            },
          },
    [popupEventAllDay]
  );

  const headerText = useMemo(
    () => (isEdit ? "Edit event" : "New Event"),
    [isEdit]
  );

  const popupButtons = useMemo(() => {
    if (isEdit) {
      return [
        "cancel",
        {
          handler: () => {
            saveEvent();
          },
          keyCode: "enter",
          text: "Save",
          cssClass: "mbsc-popup-button-primary",
        },
      ];
    } else {
      return [
        "cancel",
        {
          handler: () => {
            saveEvent();
          },
          keyCode: "enter",
          text: "Add",
          cssClass: "mbsc-popup-button-primary",
        },
      ];
    }
  }, [isEdit, saveEvent]);

  const onClose = useCallback(() => {
    if (!isEdit) {
      setMyEvents([...myEvents]);
    }
    setOpen(false);
  }, [isEdit, myEvents]);

  const selectColor = useCallback((color) => {
    setTempColor(color);
  }, []);

  const openColorPicker = useCallback(
    (ev) => {
      selectColor(selectedColor || "");
      setColorAnchor(ev.currentTarget);
      setColorPickerOpen(true);
    },
    [selectColor, selectedColor]
  );

  const changeColor = useCallback(
    (ev) => {
      const color = ev.currentTarget.getAttribute("data-value");
      selectColor(color);
      if (!colorPicker.current.s.buttons.length) {
        setSelectedColor(color);
        setColorPickerOpen(false);
      }
    },
    [selectColor, setSelectedColor]
  );

  return (
    <div>
      <Calendar
        myEvents={myEvents}
        mySelectedDate={mySelectedDate}
        onSelectedDateChange={onSelectedDateChange}
        onEventClick={onEventClick}
        onEventCreated={onEventCreated}
        onEventDeleted={onEventDeleted}
        onEventUpdated={onEventUpdated}
      />
      <PopupForm
        isOpen={isOpen}
        isEdit={isEdit}
        anchor={anchor}
        headerText={headerText}
        popupButtons={popupButtons}
        onClose={onClose}
        start={start}
        startRef={startRef}
        end={end}
        endRef={endRef}
        controls={controls}
        datepickerResponsive={datepickerResponsive}
        popupEventTitle={popupEventTitle}
        titleChange={titleChange}
        popupEventDescription={popupEventDescription}
        descriptionChange={descriptionChange}
        popupEventAllDay={popupEventAllDay}
        allDayChange={allDayChange}
        popupTravelTime={popupTravelTime}
        travelTimeChange={travelTimeChange}
        popupEventDate={popupEventDate}
        dateChange={dateChange}
        openColorPicker={openColorPicker}
        selectedColor={selectedColor}
        popupEventStatus={popupEventStatus}
        statusChange={statusChange}
        onDeleteClick={onDeleteClick}
      />
      <Popup
        display="bottom"
        contentPadding={false}
        anchor={colorAnchor}
        isOpen={colorPickerOpen}
        buttons={colorButtons}
        responsive={colorResponsive}
        ref={colorPicker}
      >
        <div className="crud-color-row">
          {colors.map((color, index) => {
            if (color) {
              return (
                <div
                  key={index}
                  onClick={() => setTempColor(color)}
                  className="crud-color-c"
                >
                  <div className="crud-color" style={{ background: color }}>
                    {tempColor === color && (
                      <div className="crud-color-selected" />
                    )}
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  onClick={() => setTempColor("")}
                  className="crud-color-c"
                >
                  <div className="crud-color crud-color-clear">
                    {tempColor === "" && (
                      <div className="crud-color-selected" />
                    )}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </Popup>
      <ColorPicker
        colorPickerOpen={colorPickerOpen}
        colorAnchor={colorAnchor}
        colorButtons={colorButtons}
        colorResponsive={colorResponsive}
        colors={colors}
        tempColor={tempColor}
        changeColor={changeColor}
        colorPicker={colorPicker}
      />
      <SnackbarComponent
        isSnackbarOpen={isSnackbarOpen}
        snackbarButton={snackbarButton}
        handleSnackbarClose={handleSnackbarClose}
      />
    </div>
  );
}

export default App;
