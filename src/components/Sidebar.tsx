/**
 * 왼쪽 사이드 바 부분을 담당하고 있는 컴포넌트 입니다.
 */

import React from "react";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";
import Labels from "./Labels";

export default function Sidebar() {
    return (
        <aside className="border p-5 w-64">
            <CreateEventButton/>
            <SmallCalendar/>
            <Labels/>
        </aside>
    );
}
