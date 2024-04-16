function createTask(type, sets, slot, date, progress, img,equip,level) {
    return { type, sets, slot, date, progress,img,equip,level};
  }
  
export const tasksList=[
    createTask("Jump Jump", 3, 20, "14/3/2024 - 3/4/2024", "60%","public/tasks/jumpjump.svg","Dumbells","easy"),
    createTask("Wheel chair", 4, 15, "14/3/2024 - 3/4/2024","60%","public/tasks/wheelchair.svg","WheelChair","medium"),
    createTask("Cycle", 3, 20, "14/3/2024 - 3/4/2024","60%","public/tasks/jumpjump.svg","Handpedals","easy"),
    createTask("Jump Jump", 3, 20, "14/3/2024 - 3/4/2024","60%","public/tasks/jumpjump.svg","Dumbells","easy"),
    createTask("Wheel chair", 3, 20, "14/3/2024 - 3/4/2024","60%","public/tasks/wheelchair.svg","Wheelchair","hard"),
]

