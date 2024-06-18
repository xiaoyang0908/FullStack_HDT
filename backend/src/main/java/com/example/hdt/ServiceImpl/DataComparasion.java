package com.example.hdt.ServiceImpl;

import java.time.LocalDate;

public class DataComparasion {
    public boolean identifyDateCompare(String date){
        //        split string
        String dateRange[] = date.split("-");
        String startDateArray[] = dateRange[0].split("/");
        String endDateArray[] = dateRange[1].split("/");
        int endYear = Integer.parseInt(endDateArray[2]);
        int endMonth = Integer.parseInt(endDateArray[0]);
        int endDay = Integer.parseInt(endDateArray[1]);

        LocalDate end = LocalDate.of(endYear, endMonth, endDay);
        //get current date
        LocalDate currentDate = LocalDate.now();

        boolean withinData = end.isBefore(currentDate);
        return withinData;
    }
}
