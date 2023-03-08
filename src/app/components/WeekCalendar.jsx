"use client";
import SheetItem from "./SheetItem";

const getSlotNumber = (shift, weekday) => {
  let _num = 0;
  if (weekday == "MON") {
    _num = 0;
  } else if (weekday == "TUE") {
    _num = 1;
  } else if (weekday == "WED") {
    _num = 2;
  } else if (weekday == "THU") {
    _num = 3;
  } else if (weekday == "FRI") {
    _num = 4;
  } else {
    _num = 5;
  }
  let slot = parseInt(shift) + 4 * _num - 1;
  return slot;
};

const calSlot = (schedule) => {
  let slotList = [];
  let slotData = [];
  schedule.map((i) => {
    let slot = 0;
    const _schedule = i.shift_weekday_room;
    // console.log("hasd", i);
    const _className = i.class_name;
    let _room = "";
    _schedule.map((j) => {
      _room = j.room;
      const _shift = j.shift;
      let _weekday = j.weekday;
      slot = getSlotNumber(_shift, _weekday);
      slotList.push(slot);
    });

    slotData.push({
      className: _className,
      room: _room,
    });
  });
  // console.log("slotData", slotData);
  let result = [];

  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < slotList.length; j++) {
      if (slotList[j] == i) {
        result.push(slotData[j]);
      } else result.push(false);
    }
  }
  let finalResult = [];
  let barchResult = [];
  for (let i = 1; i < 25; i++) {
    if (i % 4 == 0 && i !== 0) {
      barchResult.push(result[i - 1]);
      finalResult.push(barchResult);
      barchResult = [];
    } else {
      barchResult.push(result[i - 1]);
    }
  }

  return finalResult;
};
//
export default function WeekCalendar({ schedule = [] }) {
  console.log("schedule", schedule);
  const scheduleHtml = calSlot(schedule);
  console.log("scheduleHtml", scheduleHtml);
  return (
    <div className="grid grid-cols-[70px_auto] grid-rows-[auto-auto] grid-flow-dense">
      <div className=""></div>
      <div className="grid grid-cols-6 bg-gray-200 py-5 rounded-t-xl">
        <div className="flex flex-col justify-center items-center">
          <p className="text-xl text-gray-700 font-bold">13</p>
          <p className="text-sm font-semibold text-gray-500">Monday</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-xl text-gray-700 font-bold">13</p>
          <p className="text-sm font-semibold text-gray-500">Tuesday</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-xl text-gray-700 font-bold">13</p>
          <p className="text-sm font-semibold text-gray-500">Wednesday</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-xl text-gray-700 font-bold">13</p>
          <p className="text-sm font-semibold text-gray-500">Thursday</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-xl text-gray-700 font-bold">13</p>
          <p className="text-sm font-semibold text-gray-500">Friday</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-xl text-gray-700 font-bold">13</p>
          <p className="text-sm font-semibold text-gray-500">Satuday</p>
        </div>
      </div>
      <div className="grid grid-cols-1 grid-rows-4 ">
        <div className="flex flex-col h-full items-start">
          <span>7:00</span>
        </div>
        <div className="flex flex-col h-full items-start">
          <span>9:30</span>
        </div>
        <div className="flex flex-col h-full items-start">
          <span>12:00</span>
        </div>
        <div className="flex flex-col justify-between h-full items-start">
          <span>14:30</span>
          <span>6:00</span>
        </div>
      </div>
      <div className="grid grid-cols-6 bg-white divide-x divide-gray-100 rounded-b-xl">
        {scheduleHtml.map((s) => (
          <div className="grid grid-rows-4 divide-y divide-gray-100">
            {s.map((a) =>
              a ? (
                <span>
                  <SheetItem className={a.className} room={a.room} />
                </span>
              ) : (
                <span></span>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
