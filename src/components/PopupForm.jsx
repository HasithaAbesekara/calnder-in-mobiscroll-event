import { useState, useCallback, useMemo, useRef } from "react";
import {
  Popup,
  Input,
  Textarea,
  Switch,
  Dropdown,
  Datepicker,
  Segmented,
  SegmentedGroup,
  Button,
} from "@mobiscroll/react";

function PopupForm({
  isOpen,
  onClose,
  headerText,
  popupButtons,
  popupEventTitle,
  titleChange,
  popupEventDescription,
  descriptionChange,
  popupEventAllDay,
  allDayChange,
  startRef,
  endRef,
  popupTravelTime,
  travelTimeChange,
  controls,
  datepickerResponsive,
  dateChange,
  popupEventDate,
  selectedColor,
  openColorPicker,
  popupEventStatus,
  statusChange,
  isEdit,
  onDeleteClick,
  anchor,
}) {
  const popupResponsive = useMemo(
    () => ({
      medium: {
        display: "anchored",
        width: 400,
        fullScreen: false,
        touchUi: false,
      },
    }),
    []
  );

  return (
    <Popup
      display="bottom"
      fullScreen={true}
      contentPadding={false}
      headerText={headerText}
      anchor={anchor}
      buttons={popupButtons}
      isOpen={isOpen}
      onClose={onClose}
      responsive={popupResponsive}
    >
      <div className="mbsc-form-group">
        <Input label="Title" value={popupEventTitle} onChange={titleChange} />
        <Textarea
          label="Description"
          value={popupEventDescription}
          onChange={descriptionChange}
        />
      </div>
      <div className="mbsc-form-group">
        <Switch
          label="All-day"
          checked={popupEventAllDay}
          onChange={allDayChange}
        />
        <Input ref={startRef} label="Starts" value={popupEventDate[0]} />
        <Input ref={endRef} label="Ends" value={popupEventDate[1]} />
        {!popupEventAllDay && (
          <div id="travel-time-group">
            <Dropdown
              label="Travel time"
              value={popupTravelTime}
              onChange={travelTimeChange}
            >
              <option value="0">None</option>
              <option value="5">5 minutes</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1.5 hours</option>
              <option value="120">2 hours</option>
            </Dropdown>
          </div>
        )}
        <Datepicker
          select="range"
          controls={controls}
          touchUi={true}
          startInput={startRef}
          endInput={endRef}
          showRangeLabels={false}
          responsive={datepickerResponsive}
          onChange={dateChange}
          value={popupEventDate}
        />
        <div onClick={openColorPicker} className="event-color-c">
          <div className="event-color-label">Color</div>
          <div
            className="event-color"
            style={{ background: selectedColor }}
          ></div>
        </div>
        <SegmentedGroup onChange={statusChange}>
          <Segmented value="busy" checked={popupEventStatus === "busy"}>
            Show as busy
          </Segmented>
          <Segmented value="free" checked={popupEventStatus === "free"}>
            Show as free
          </Segmented>
        </SegmentedGroup>
        {isEdit && (
          <div className="mbsc-button-group">
            <Button
              className="mbsc-button-block"
              color="danger"
              variant="outline"
              onClick={onDeleteClick}
            >
              Delete event
            </Button>
          </div>
        )}
      </div>
    </Popup>
  );
}

export default PopupForm;
