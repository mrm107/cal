import React from "react";

import dayjs from "@calcom/dayjs";
import { classNames } from "@calcom/lib";
import { useLocale } from "@calcom/lib/hooks/useLocale";

import { gregorianToJalali } from "../../../../../jalali-date";

type Props = {
  days: dayjs.Dayjs[];
  containerNavRef: React.RefObject<HTMLDivElement>;
};

export function DateValues({ days, containerNavRef }: Props) {
  const { i18n } = useLocale();

  // Format dates to Jalali
  const formatDateJalali = (date: dayjs.Dayjs): string => {
    const [jy, jm, jd] = gregorianToJalali(date.year(), date.month() + 1, date.date());
    return `${jd}`;
  };

  const formatDate = (date: dayjs.Dayjs): string => {
    return new Intl.DateTimeFormat(i18n.language, { weekday: "short" }).format(date.toDate());
  };
  return (
    <div
      ref={containerNavRef}
      className="bg-default dark:bg-muted border-b-subtle rtl:border-r-default sticky top-[var(--calendar-dates-sticky-offset,0px)] z-[80] flex-none border-b border-r sm:pr-8">
      <div className="text-subtle flex text-sm leading-6 sm:hidden" data-dayslength={days.length}>
        {days.map((day) => {
          const isToday = dayjs().isSame(day, "day");
          return (
            <button
              key={day.toString()}
              type="button"
              className="flex flex-1 flex-col items-center pb-3 pt-2">
              {/* Jalali Day */}
              {formatDate(day)}{" "}
              <span
                className={classNames(
                  "text-emphasis mt-1 flex h-8 w-8 items-center justify-center font-semibold",
                  isToday && "bg-inverted text-inverted rounded-full"
                )}>
                {formatDateJalali(day)} {/* {day.format("D")} */}
              </span>
            </button>
          );
        })}
      </div>
      <div className="text-subtle -mr-px hidden  auto-cols-fr text-sm leading-6 sm:flex ">
        <div className="border-default col-end-1 w-14 ltr:border-l" />
        {days.map((day) => {
          const isToday = dayjs().isSame(day, "day");
          return (
            <div
              key={day.toString()}
              className={classNames(
                "flex flex-1 items-center justify-center py-3 text-xs font-medium uppercase",
                isToday && "font-bold"
              )}>
              <span>
                {/* Jalali Date */}
                {formatDate(day)}{" "}
                <span
                  className={classNames(
                    "items-center justify-center p-1",
                    isToday && "bg-brand-default text-brand rounded-full"
                  )}>
                  {formatDateJalali(day)} {/* {day.format("DD")} */}
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
