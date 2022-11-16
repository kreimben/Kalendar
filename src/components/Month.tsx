/**
 * 달을 나타내는 컴포넌트 입니다.
 * 더 자세한 정보는 `Day`컴포넌트에 있습니다.
 */

import React from "react";
import Day from "./Day";

export default function Month({month}) {
    return (
        <div className="flex-1 grid grid-cols-7 grid-rows-5">
            {month.map((row, i) => (
                <React.Fragment key={i}>
                    {row.map((day, idx) => (
                        <Day day={day} key={idx} rowIdx={i}/>
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
}
