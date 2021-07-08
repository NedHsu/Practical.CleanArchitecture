import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import styles from "./ViewCalendar.module.scss";

import Calendar from 'tui-calendar';
import "tui-calendar/dist/tui-calendar.css";
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

import * as actions from "../actions";

class ViewCalendar extends Component<any, any> {
  state = {
    calendar: {
      name: "",
      code: "",
      description: ""
    },
    submitted: false,
    errorMessage: null
  };

  componentDidMount() {
    var calendar = new Calendar('calendar', {
      defaultView: 'month',
      useCreationPopup: true,
      useDetailPopup: true,
      taskView: true,
      scheduleView: true,
      calendars: [
        {
          id: "1",
          name: "事件",
          color: '#e8e8e8',
          bgColor: '#585858',
          borderColor: '#a1b56c',
          dragBgColor: '#585858',
        },
      ],
      template: {
        monthDayname: function (dayname) {
          return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
        },
        popupSave: () => {
          return "儲存";
        },
        popupDelete: () => {
          return "刪除";
        },
        schedule: (schedule) => {
          return '<span class="calendar-font-icon ic-milestone-b"></span> <span style="background-color: ' + schedule.bgColor + '">' + schedule.title + '</span>';
        },
        task: (schedule) => {
          return "123" + schedule.title;
        }
      }
    });

    calendar.on('beforeCreateSchedule', function (event) {
      var calendarId = '1';
      var startTime = event.start;
      var endTime = event.end;
      var isAllDay = event.isAllDay;
      var guide = event.guide;

      calendar.createSchedules([{
        id: guide,
        calendarId: calendarId,
        isAllDay: isAllDay,
        start: startTime,
        end: endTime,
        isVisible: true,
        color: "black",
        bgColor: "red",
      }]);
    });
    calendar.createSchedules([{
      id: "test",
      calendarId: "1",
      title: "1234",
      isAllDay: true,
      body: "123",
      start: new Date('2021-07-08T09:00:00'),
      end: new Date('2021-07-09T18:00:00'),
      isVisible: true,
      color: "black",
      bgColor: "red",
    }]);
    console.log(calendar);
  }

  render() {
    const page = this.props.calendar ? (
      <div>
        <div id="calendar" className={styles.calendar}>

        </div>
      </div>
    ) : null;
    return page;
  }
}

const mapStateToProps = state => {
  return {
    calendar: state.calendar.calendar
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCalendar: id => dispatch(actions.fetchCalendar(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewCalendar);
