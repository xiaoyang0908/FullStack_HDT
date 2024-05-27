package com.example.hdt.ServiceImpl;

import java.time.LocalDate;
import java.time.temporal.WeekFields;
import java.util.Locale;

public class DateIdentity {
    public boolean IdentifyDateInOneWeek(String date){
//        split string
        String dateRange[] = date.split("-");
        String startDateArray[] = dateRange[0].split("/");
        String endDateArray[] = dateRange[1].split("/");
        int endYear = Integer.parseInt(endDateArray[2]);
        int endMonth = Integer.parseInt(endDateArray[0]);
        int endDay = Integer.parseInt(endDateArray[1]);

        int startYear = Integer.parseInt(startDateArray[2]);
        int startMonth = Integer.parseInt(startDateArray[0]);
        int startDay = Integer.parseInt(startDateArray[1]);
        LocalDate end = LocalDate.of(endYear, endMonth, endDay);
        LocalDate start = LocalDate.of(startYear, startMonth, startDay);
        //get current date
        LocalDate currentDate = LocalDate.now();

//        get week
        WeekFields weekFields = WeekFields.of(Locale.getDefault());
        int endWeek = end.get(weekFields.weekOfWeekBasedYear());
        int startWeek = start.get(weekFields.weekOfWeekBasedYear());
        int currentDateWeek = currentDate.get(weekFields.weekOfWeekBasedYear());
//  get year
        int endDateYear = end.get(weekFields.weekBasedYear());
        int startDateYear = start.get(weekFields.weekBasedYear());
        int currentDateYear = currentDate.get(weekFields.weekBasedYear());

        //compare
        boolean isSameWeek = (currentDateWeek <= endWeek) && (endDateYear == currentDateYear) && (currentDateWeek >= startWeek) &&(currentDateYear == startDateYear);

        // 打印结果
        System.out.println("The date " + date + " and the current date " + currentDate + " are in the same week: " + isSameWeek);
        return isSameWeek;
    }
}
