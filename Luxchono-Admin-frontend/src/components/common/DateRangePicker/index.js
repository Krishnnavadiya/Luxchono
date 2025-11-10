import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import BackspaceIcon from "@mui/icons-material/Backspace";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { addDays } from "date-fns";
import moment from "moment";
import "./style.scss";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { STRING } from "../../../constants/String";

export const useOutsideAlerter = (ref, setShowDateRangePicker) => {
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowDateRangePicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setShowDateRangePicker]);
};

function ReactDateRangePicker(props) {
  const {
    wrapperRef,
    state,
    setState,
    prevDate,
    setPrevDate,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    showDateRangePicker,
    setShowDateRangePicker,
  } = props;
  useOutsideAlerter(wrapperRef, setShowDateRangePicker);
  const handleCustomRange = () => {
    setShowDateRangePicker(!showDateRangePicker);
    if (!fromDate.length) {
      setState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
        },
      ]);
    } else {
      setState(prevDate);
    }
  };
  const handleTimeRangeSelection = async (clear) => {
    const firstSelectionOfStartDate = moment(state[0].startDate).format(
      "yyyy-MM-DD"
    );
    const firstSelectionOfToDate = moment(state[0].endDate).format(
      "yyyy-MM-DD"
    );
    clear !== "CLEAR" && setFromDate(firstSelectionOfStartDate);
    clear !== "CLEAR" && setToDate(firstSelectionOfToDate);
    setPrevDate(state);
    setShowDateRangePicker(false);
  };

  return (
    <>
      <div ref={wrapperRef} style={{ position: "relative" }}>
        <div onClick={handleCustomRange} className="form__input">
          <span>
            {`${
              fromDate.length
                ? `${moment(fromDate).format("MM-DD-yyyy")} TO ${moment(
                    toDate
                  ).format("MM-DD-yyyy")}`
                : "Select Custom Date Range"
            }`}
          </span>
          <span className="pl-2">
            {showDateRangePicker ? (
              <KeyboardArrowUpIcon className="filter__search-icon" />
            ) : (
              <KeyboardArrowDownIcon className="filter__search-icon" />
            )}
          </span>
        </div>
        {showDateRangePicker && (
          <div className="mainDateRangePicker">
            <DateRangePicker
              onChange={(item) => {
                setState([item.selection]);
              }}
              showDateDisplay={true}
              moveRangeOnFirstSelection={false}
              months={1}
              ranges={state}
              direction="horizontal"
              rangeColors={["#964315"]}
            />

            <div className="button-container">
              <button
                onClick={() => {
                  setFromDate("");
                  setToDate("");
                  setShowDateRangePicker(false);
                  setState([
                    {
                      startDate: new Date(),
                      endDate: addDays(new Date(), 0),
                      key: "selection",
                    },
                  ]);
                  handleTimeRangeSelection("CLEAR");
                }}
                className="okButton clearButton"
              >
                <span>
                  <BackspaceIcon /> &nbsp;
                  <strong>{STRING.CLEAR}</strong>
                </span>
              </button>
              <button
                onClick={() => {
                  setShowDateRangePicker(false);
                }}
                className="cancelButton"
              >
                <span>
                  <CancelIcon sx={{ width: "1.5rem", height: "1.5rem" }} />{" "}
                  <strong>{STRING.DATE_CANCEL}</strong>
                </span>
              </button>
              <button onClick={handleTimeRangeSelection} className="okButton">
                <span>
                  <ThumbUpAltIcon /> &nbsp;
                  <strong>{STRING.DONE}</strong>
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ReactDateRangePicker;
