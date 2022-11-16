import React, {useContext, useEffect, useState} from 'react';
import "./App.css";
import {getMonth} from "./util";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";


// 이 곳부터는 자유롭게 컴포넌트를 구경하세요.
function App() {
    const [currenMonth, setCurrentMonth] = useState(getMonth());
    const {monthIndex, showEventModal, dataChanged} = useContext(GlobalContext);

    useEffect(() => {
        // 선택한 달이 바뀌면 새로 화면을 그려줍니다.
        setCurrentMonth(getMonth(monthIndex));
        dataChanged();
    }, [monthIndex]);

    return (
        <React.Fragment>
            {showEventModal && <EventModal/>}

            <div className="h-screen flex flex-col">
                <CalendarHeader/>
                <div className="flex flex-1">
                    <Sidebar/>
                    <Month month={currenMonth}/>
                </div>
            </div>
        </React.Fragment>
    );
}

export default App;
