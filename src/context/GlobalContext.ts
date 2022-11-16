import React from "react";
import {DayEvent} from "../utils/type";

// 함수들의 원형만 저장해 둡니다.
// 소스에서 함수의 원형을 보면 이 함수들이 보입니다.
// 이어서 `App.tsx`파일로 가십시오.
const GlobalContext = React.createContext({
    monthIndex: 0,
    setMonthIndex: (index: number) => {
    },
    smallCalendarMonth: 0,
    setSmallCalendarMonth: (index: number) => {
    },
    daySelected: null,
    setDaySelected: (day: any) => {
    },
    showEventModal: false,
    setShowEventModal: (a: any) => {
    },
    savedEvents: null,
    selectedEvent: DayEvent,
    setSelectedEvent: (evt: DayEvent) => {
    },
    setLabels: (a: any) => {
    },
    labels: [],
    updateLabel: (a: any) => {
    },
    filteredEvents: [],
    addEvent: async (e: DayEvent) => {
    },
    updateEvent: async (e: DayEvent) => {
    },
    deleteEvent: async (e: DayEvent) => {
    },
    dataChanged: (): void => {
    }
});

export default GlobalContext;
