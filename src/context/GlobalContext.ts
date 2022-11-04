import React from "react";
import {DayEvent} from "../utils/type";


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
        console.log(`selected event!: ${evt}`);
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
