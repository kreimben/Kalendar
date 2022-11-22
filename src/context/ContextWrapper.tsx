/**
 * 이 함수가 가장 중요한 이유는, Context를 이용해 전체 프로그램의 중추적인 기능을 하는 함수들을 컴포넌트 곳곳에 배치 할 수 있게 도와주기 떄문입니다.
 * 이 외의 컴포넌트들은 그냥 View역할만 합니다.
 */

import React, {useEffect, useMemo, useState,} from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs"; // Dayjs를 이용해 날짜를 조금 더 쉽게 관리 했습니다.
import {db} from "../firebase"; // Firebase 관련된 코드가 있는 곳입니다.
import {collection, deleteDoc, doc, getDocs, setDoc, updateDoc} from 'firebase/firestore'; // Google에서 제공하는 하는 라이브러리 입니다.
import {convertToDayEvent, convertToObject, DayEvent} from "../utils/type"; // 개인적으로 필요해 따로 만든 헬퍼 함수들 입니다.

const initEvents = async (): Promise<DayEvent[]> => {
    // 전체 이벤트들을 Firestore로 부터 가져옵니다.
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
        // 데이터가 변경 됐을 때 화면에 다시 뿌려주기 위해 `dataChanged`함수를 컴포넌트 전역에 배포합니다.
        // 조건에 관계 없이 이 함수를 부르면 화면이 다시 그려집니다.
        initEvents()
            .then((res) => {
                setSavedEvents(res)
            })
            .catch(e => console.error(e))
    }

    const addEvent = async (event: DayEvent): Promise<void> => {
        // 이벤트가 새로 만들어 졌을 때 Firestore와 통신하고 성공 시 화면에 업데이트 해줍니다.
        try {
            await setDoc(doc(db, "savedEvents", `${event.id}`), Object.assign({}, event));
            dataChanged();
        } catch (e) {
            console.error(e);
        }
    }

    const updateEvent = async (event: DayEvent): Promise<void> => {
        // 이벤트가 업데이트 됐을 때 Firestore와 통신하고 성공 시 화면에 업데이트 해줍니다.
        try {
            await updateDoc(doc(db, "savedEvents", `${event.id}`), convertToObject(event));
            dataChanged();
        } catch (e) {
            console.error(e);
        }
    }

    const deleteEvent = async (event: DayEvent): Promise<void> => {
        // 이벤트가 지워졌을 때 Firestore와 통신하고 성공 시 화면에 업데이트 해줍니다.
        try {
            await deleteDoc(doc(db, "savedEvents", `${event.id}`));
            dataChanged();
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        // 화면 초기에 Firestore로부터 데이터를 받아 화면에 그려줍니다.
        dataChanged();
    }, [])

    const filteredEvents = useMemo(() => {
        // 이벤트들을 따로 저장합니다.
        return savedEvents.filter((evt: DayEvent) =>
            labels
                .filter((lbl) => lbl.checked)
                .map((lbl) => lbl.label)
                .includes(evt.label))
    }, [savedEvents, labels]);

    useEffect(() => {
        // 저장된 이벤트들이 조작 됐을 때 다시 뿌려줍니다.
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

    // 위에서 정리한 함수들을 `GlobalContext`에 담아 보내줍니다.
    // 이어서 `GlobalContext`클래스로 가십시오.
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

