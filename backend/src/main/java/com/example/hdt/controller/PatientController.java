package com.example.hdt.controller;

import com.example.hdt.ServiceImpl.DataComparasion;
import com.example.hdt.ServiceImpl.DateIdentity;
import com.example.hdt.ServiceImpl.PatientImpl;
import com.example.hdt.models.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.*;


@RestController
@CrossOrigin
@RequestMapping("/patient")
public class PatientController {
    @Autowired
    private PatientImpl patientImpl;

    private static DateIdentity dateIdentity = new DateIdentity();

    @GetMapping("/allPatient")
    public ResponseEntity<List<Patient>> getAllPatients() throws Exception{
            List<Patient> patients = patientImpl.getPatientList();
            if (patients.isEmpty()) {
                return ResponseEntity.status(400).body(null);
            }
            return ResponseEntity.ok(patients);
    }

    @PostMapping("/findPatient")
    public ResponseEntity<Patient> findSpecificPatients(@RequestBody String email) throws Exception{
//        remove ""in json
        String patientEmail = email.replaceAll("\"", "");
        Patient patient = patientImpl.findPatientByEmail(patientEmail);
        if (patient!=null) {
            return ResponseEntity.ok(patient);
        }
        return ResponseEntity.status(400).body(null);
    }

    //update patient average performance data are sent by unity game
    @PostMapping("/UpdatePatientPerformance")
    public ResponseEntity<String> UpdatePatientPerformance(@RequestBody Map<String, Object> requestBody) throws Exception{
        LinkedHashMap<String,Object> performanceInfo = (LinkedHashMap<String, Object>) requestBody.get("performance");
        String curPatintId = (String) requestBody.get("patientID");
        ObjectMapper objectMapper = new ObjectMapper();
        String performanceJson = objectMapper.writeValueAsString(performanceInfo);
        Performance newPerformance = objectMapper.readValue(performanceJson,Performance.class);

        Patient curPatient = patientImpl.findPatientByPatientId(curPatintId);
        if(curPatient.getPerformance().isEmpty()){
            curPatient.getPerformance().add(newPerformance);
        }else {
            int flag = 0;
            for (Performance p:
                    curPatient.getPerformance()) {
                if (p.getGameType().equals(newPerformance.getGameType())){
                    flag = 1;
                    p.setStartTime(newPerformance.getStartTime());
                    p.setEndTime(newPerformance.getEndTime());
                    p.setDuration(newPerformance.getDuration());
                    p.setLeft(newPerformance.getLeft());
                    p.setRight(newPerformance.getRight());
                    break;
                }
            }
            if (flag==0){
                curPatient.getPerformance().add(newPerformance);
            }
        }
        patientImpl.updatePerformance(curPatintId,curPatient.getPerformance());
        if (!curPatient.getPerformance().isEmpty()) {
            return ResponseEntity.ok("success");
        }
        return ResponseEntity.status(400).body(null);
    }



    @PostMapping("/tasks")
    public  ResponseEntity<List<Tasks>> getAllTasks(@RequestBody Map<String, Object> requestBody) throws Exception{
        LinkedHashMap<String,Object> taskInfo = (LinkedHashMap<String, Object>) requestBody.get("taskinfo");
        String curPatintId = (String) requestBody.get("patientID");
        ObjectMapper objectMapper = new ObjectMapper();
        String taskJson = objectMapper.writeValueAsString(taskInfo);
        Tasks newTask = objectMapper.readValue(taskJson,Tasks.class);
        System.out.println(newTask);

        Patient curPatient = patientImpl.findPatientByPatientId(curPatintId);
        //edit
        if (newTask!=null && newTask.get_id()!=null) {
            Tasks oldTask = curPatient.findTask(newTask.get_id());
            //update task setting
            oldTask.setSets(newTask.getSets());
            oldTask.setDifficulty(newTask.getDifficulty());
            oldTask.setDate(newTask.getDate());

            //update task performance, data are sent by unity game
            if (!newTask.getPerformance().isEmpty() && newTask.getPerformance().size() > oldTask.getPerformance().size()){
                //update exercise hour symbol send by the unity game
                patientImpl.cacheTask.setRedis(curPatintId, "updateTask");
                oldTask.getPerformance().add(newTask.getPerformance().get(newTask.getPerformance().size()-1));
                double duration = newTask.getPerformance().get(newTask.getPerformance().size()-1).getDuration();
                oldTask.setSpentTime((int) (oldTask.getSpentTime()+duration));
                oldTask.setFinisheSets(oldTask.getFinisheSets()+1);
                curPatient.setTotalExerciseHours(curPatient.getTotalExerciseHours()+duration);
                curPatient.setWeekExerciseHours(curPatient.getWeekExerciseHours()+duration);
            }
            patientImpl.updateTasks(curPatintId, curPatient.getTasks());
            return ResponseEntity.ok(curPatient.getTasks());
        } else if (newTask!=null && newTask.get_id()==null){
            //insert new task
            String uuid = patientImpl.uniqueId();
            newTask.set_id("Task"+ uuid);
            curPatient.addTasks(newTask);
            patientImpl.insertTasks(curPatintId,newTask);
            return ResponseEntity.ok(curPatient.getTasks());
        }
        return ResponseEntity.status(400).body(null);

    }

    @PostMapping("/deteteTask")
    public ResponseEntity<List<Tasks>> afterDeleteTasks(@RequestBody Map<String, Object> requestBody) throws Exception{
        String taskId = (String) requestBody.get("taskId");
        String patientID = (String) requestBody.get("patientID");
        Patient curPatient = patientImpl.findPatientByPatientId(patientID);
        curPatient.deleteTask(taskId);
        patientImpl.updateTasks(curPatient.getPatientID(), curPatient.getTasks());
        if (curPatient.getTasks().size()>0){
            return ResponseEntity.ok(curPatient.getTasks());
        }else{
            return ResponseEntity.ok(null);
        }
    }

  @PostMapping("/categoryTasks")
  public Dictionary<TaskStatus, Long> categoryTasks(@RequestBody Map<String, Object> requestBody) throws Exception {
        String patientID = (String) requestBody.get("patientID");
        Patient curPatient = patientImpl.findPatientByPatientId(patientID);
        //total count
        Dictionary<TaskStatus,Long> taskCategory = new Hashtable<>();
        long awaitCount = 0;
        long inProcessCount = 0;
        long doneCount = 0;
        long overdueCount = 0;
          for (Tasks task: curPatient.getTasks()) {
              if (task.getStatus().equals("Awaiting Start")) {
                  awaitCount++;
              } else if (task.getStatus().equals("In Process")) {
                  inProcessCount++;
              } else if (task.getStatus().equals("Done")) {
                  doneCount++;
              } else if (task.getStatus().equals("Overdue")) {
                  overdueCount++;
              }
          }
        taskCategory.put(TaskStatus.AwaitingStart,awaitCount);
        taskCategory.put(TaskStatus.InProcess,inProcessCount);
        taskCategory.put(TaskStatus.Done,doneCount);
        taskCategory.put(TaskStatus.Overdue,overdueCount);

        //weekly count
          long weekAwaitCount = 0;
          long weekInProcessCount = 0;
          long weekDoneCount = 0;
          long weekOverdueCount = 0;

          for (Tasks task:
                  curPatient.getTasks()) {
              if (dateIdentity.IdentifyDateInOneWeek(task.getDate())) {
                  if (task.getStatus().equals("Awaiting Start")){
                      weekAwaitCount++;
                  }else if (task.getStatus().equals("In Process")){
                      weekInProcessCount++;
                  }else if (task.getStatus().equals("Done")){
                      weekDoneCount++;
                  }else if (task.getStatus().equals("Overdue")){
                      weekOverdueCount++;
                  }
              }
          }
          taskCategory.put(TaskStatus.WeekAwaitingStart,weekAwaitCount);
          taskCategory.put(TaskStatus.WeekInProcess,weekInProcessCount);
          taskCategory.put(TaskStatus.WeekDone,weekDoneCount);
          taskCategory.put(TaskStatus.WeekOverdue,weekOverdueCount);

        return taskCategory;
  }
}