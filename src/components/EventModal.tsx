/**
 * 특정 이벤트를 눌렀거나 빈 날짜를 눌렀거나, 어쨌든 이벤트를 조작하기 위해 필요한 컴포넌트 입니다.
 */

import React, {useContext, useState} from "react";
import GlobalContext from "../context/GlobalContext";
import {DayEvent} from "../utils/type";

const labelsClasses = [
    "indigo",
    "gray",
    "green",
    "blue",
    "red",
    "purple",
];

export default function EventModal() {
    const {
        setShowEventModal,
        daySelected,
        selectedEvent,
        updateEvent,
        addEvent,
        deleteEvent
    } = useContext(GlobalContext);

    const [title, setTitle] = useState(
        (selectedEvent && selectedEvent instanceof DayEvent) ? selectedEvent.title : ""
    );
    const [description, setDescription] = useState(
        (selectedEvent && selectedEvent instanceof DayEvent) ? selectedEvent.description : ""
    );
    const [selectedLabel, setSelectedLabel] = useState(
        (selectedEvent && selectedEvent instanceof DayEvent)
            ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
            : labelsClasses[0]
    );

    function handleSubmit(e) {
        e.preventDefault();
        if (title === "") return
        const calendarEvent = {
            title,
            description,
            label: selectedLabel,
            day: daySelected.valueOf(),
            id: (selectedEvent && selectedEvent instanceof DayEvent) ? selectedEvent.id : Date.now(),
        };
        if (selectedEvent) {
            updateEvent(calendarEvent)
                .catch((e) => {
                    console.log(e)
                });
        } else {
            addEvent(calendarEvent)
                .catch((e) => {
                    console.log(e)
                });
        }

        setShowEventModal(false);
    }

    return (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
            <form className="bg-white rounded-lg shadow-2xl w-1/4">
                <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
                    <div>
                        {selectedEvent && (
                            <span
                                onClick={() => {
                                    deleteEvent((selectedEvent && selectedEvent instanceof DayEvent ? selectedEvent : null))
                                        .then(() => {
                                            setShowEventModal(false);
                                        })
                                        .catch(e => console.error(e))
                                }}
                                className="material-icons-outlined text-gray-400 cursor-pointer"
                            >
                delete
              </span>
                        )}
                        <button onClick={() => setShowEventModal(false)}>
              <span className="material-icons-outlined text-gray-400">
                close
              </span>
                        </button>
                    </div>
                </header>
                <div className="p-3">
                    <div className="grid grid-cols-1/5 items-end gap-y-7">
                        <div></div>
                        <input
                            type="text"
                            name="title"
                            placeholder="Add title"
                            value={title}
                            required
                            className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <span className="material-icons-outlined text-gray-400">
              schedule
            </span>
                        <p>{daySelected.format("dddd, MMMM DD")}</p>
                        <span className="material-icons-outlined text-gray-400">
              segment
            </span>
                        <input
                            type="text"
                            name="description"
                            placeholder="Add a description"
                            value={description}
                            required
                            className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <span className="material-icons-outlined text-gray-400">
              bookmark_border
            </span>
                        <div className="flex gap-x-2">
                            {labelsClasses.map((lblClass, i) => (
                                <span
                                    key={i}
                                    onClick={() => setSelectedLabel(lblClass)}
                                    className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                                >
                  {selectedLabel === lblClass && (
                      <span className="material-icons-outlined text-white text-sm">
                      check
                    </span>
                  )}
                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <footer className="flex justify-end border-t p-3 mt-5">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
                    >
                        Save
                    </button>
                </footer>
            </form>
        </div>
    );
}