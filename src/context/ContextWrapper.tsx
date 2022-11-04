import React, {useEffect, useMemo, useState,} from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import {db} from "../firebase";
import {collection, deleteDoc, doc, getDocs, setDoc, updateDoc} from 'firebase/firestore';
import {convertToDayEvent, convertToObject, DayEvent} from "../utils/type";

const initEvents = async (): Promise<DayEvent[]> => {
    const q = await getDocs(collection(db, "savedEvents"));
    let results = [];
    q.forEach((value) => {
        results.push(convertToDayEvent(JSON.stringify(value.data())))
    })
    return results;
}

export default function ContextWrapper(props) {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
    const [daySelected, setDaySelected] = useState(dayjs());
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [labels, setLabels] = useState([]);
    const [savedEvents, setSavedEvents] = useState([]);

    const dataChanged = () => {
        initEvents()
            .then((res) => {
                setSavedEvents(res)
            })
            .catch(e => console.error(e))
    }

    const addEvent = async (event: DayEvent): Promise<void> => {
        console.log(`addEvent: ${JSON.stringify(event)}`);
        try {
            await setDoc(doc(db, "savedEvents", `${event.id}`), Object.assign({}, event));
            dataChanged();
        } catch (e) {
            console.error(e);
        }
    }

    const updateEvent = async (event: DayEvent): Promise<void> => {
        console.log(`updateEvent: ${JSON.stringify(event)}`);
        try {
            const d = doc(db, "savedEvents", `${event.id}`);
            await updateDoc(d, convertToObject(event));
            dataChanged();
        } catch (e) {
            console.error(e);
        }
    }

    const deleteEvent = async (event: DayEvent): Promise<void> => {
        console.log(`deleteEvent: ${JSON.stringify(event)}`);
        try {
            await deleteDoc(doc(db, "savedEvents", `${event.id}`));
            dataChanged();
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        dataChanged();
    }, [])

    const filteredEvents = useMemo(() => {
        return savedEvents.filter((evt: DayEvent) =>
            labels
                .filter((lbl) => lbl.checked)
                .map((lbl) => lbl.label)
                .includes(evt.label))
    }, [savedEvents, labels]);

    useEffect(() => {
        setLabels((prevLabels) => {
            return [...new Set(savedEvents.map((evt) => evt.label))].map(
                (label) => {
                    const currentLabel = prevLabels.find(
                        (lbl) => lbl.label === label
                    );
                    return {
                        label,
                        checked: currentLabel ? currentLabel.checked : true,
                    };
                }
            );
        });
    }, [savedEvents]);

    useEffect(() => {
        if (smallCalendarMonth !== null) {
            setMonthIndex(smallCalendarMonth);
        }
    }, [smallCalendarMonth]);

    useEffect(() => {
        if (!showEventModal) {
            setSelectedEvent(null);
        }
    }, [showEventModal]);

    function updateLabel(label) {
        setLabels(
            labels.map((lbl) => (lbl.label === label.label ? label : lbl))
        );
    }

    return (
        <GlobalContext.Provider
            value={{
                monthIndex,
                setMonthIndex,
                smallCalendarMonth,
                setSmallCalendarMonth,
                daySelected,
                setDaySelected,
                showEventModal,
                setShowEventModal,
                selectedEvent,
                setSelectedEvent,
                savedEvents,
                setLabels,
                labels,
                updateLabel,
                filteredEvents,
                addEvent,
                updateEvent,
                deleteEvent,
                dataChanged
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
}

