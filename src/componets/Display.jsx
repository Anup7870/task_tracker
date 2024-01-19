import { useState, useEffect, useContext } from "react";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";
import classNames from "classnames";
import Context from "../Context";

export default function Display() {
  const [Completed, setCompleted] = useState(false);
  const [inCompleted, setInCompleted] = useState(true);
  const [task, setTask] = useState();
  const context = useContext(Context);

  // setting the tasks from local storage
  useEffect(() => {
    const compData = JSON.parse(localStorage.getItem("completedTasks"));
    const incompData = JSON.parse(localStorage.getItem("incompletedTasks"));
    if (Completed) {
      setTask(compData || []);
    } else if (inCompleted) {
      setTask(incompData || []);
    }

  }, [Completed, inCompleted, context.value]);

  const incompleted = classNames({
    "text-white": true,
    "bg-slate-950": inCompleted,
    "p-3": true,
    "bg-slate-800": !inCompleted,
    "cursor-pointer": true,
  });
  const completed = classNames({
    "text-white": true,
    "bg-slate-950": Completed,
    "p-3": true,
    "bg-slate-800": !Completed,
    "cursor-pointer": true,
  });

  const deleteTask = (taskId) => {
    const incompData = JSON.parse(localStorage.getItem("incompletedTasks")) || [];
    const compData = JSON.parse(localStorage.getItem("completedTasks")) || [];
    let updatedTasks = [];
  
    const taskToDeleteIncomp = incompData.find((task) => task.id === taskId);
    if (taskToDeleteIncomp) {
      updatedTasks = incompData.filter((task) => task.id !== taskId);
      localStorage.setItem("incompletedTasks", JSON.stringify(updatedTasks));
    }
  
    const taskToDeleteComp = compData.find((task) => task.id === taskId);
    if (taskToDeleteComp) {
      updatedTasks = compData.filter((task) => task.id !== taskId);
      localStorage.setItem("completedTasks", JSON.stringify(updatedTasks));
    }
  
    setTask(updatedTasks);
  };


  const markComp = (taskId) => {
    const incompData = JSON.parse(localStorage.getItem("incompletedTasks"));
    const compData = JSON.parse(localStorage.getItem("completedTasks"));
    const taskToMark = incompData.find((task) => task.id === taskId);
    const updatedIncompTasks = incompData.filter((task) => task.id !== taskId);
    const updatedCompTasks = [
      ...(compData || []),
      { ...taskToMark, completed: Date.now() }, // Add completed time
    ];

    localStorage.setItem(
      "incompletedTasks",
      JSON.stringify(updatedIncompTasks)
    );
    localStorage.setItem("completedTasks", JSON.stringify(updatedCompTasks));
    setTask(updatedIncompTasks);
  };

  
  const inComp = () => {
    setInCompleted(true);
    setCompleted(false);
  };

  const comp = () => {
    setInCompleted(false);
    setCompleted(true);
  };

  const removeTask = (taskId) => {
    const compData = JSON.parse(localStorage.getItem("completedTasks"));
    const updatedTasks = compData.filter((task) => task.id !== taskId);
    localStorage.setItem("completedTasks", JSON.stringify(updatedTasks));
    setTask(updatedTasks);
  };


  return (
    <section className='h-[75%] overflow-auto'>
      <div className='sticky top-0 flex gap-2  items-center bg-slate-800'>
        <div className={incompleted} onClick={inComp}>
          Incompleted
        </div>
        <div className={completed} onClick={comp}>
          Completed
        </div>
      </div>
      <div className='overflow-auto'>
        {task &&
          task.map((item) => (
            <div
              key={item.id}
              className='flex justify-between bg-slate-800 rounded-xl mt-3 item-center p-3 overflow-auto w-full'>
              <p className='text-white text-ellipsis w-[60%] text-wrap overflow-auto'>{item.task}</p>
              <div className="flex w-[40%] gap-3 lg:gap-1 md:gap-1 items-center">
              <p className='text-white text-ellipsis font-light text-xs md:text-base flex-1 '>
                {new Date(item.created).getDate().toString().padStart(2, "0")}/
                {(new Date(item.created).getMonth() + 1)
                  .toString()
                  .padStart(2, "0")}
                -{" "}
                {item.completed
                  ? `${new Date(item.completed)
                      .getDate()
                      .toString()
                      .padStart(2, "0")}/ ${
                      new Date(item.completed).getMonth() + 1
                    }`
                  : "null"}
              </p>
              <div className='flex item-center justify-center gap-2 '>
                <DeleteForeverTwoToneIcon
                  onClick={() =>  deleteTask(item.id)}
                  className='text-red-600 bg-white rounded-sm cursor-pointer'
                />
                {Completed?null:<DoneTwoToneIcon
                  onClick={() => markComp(item.id)}
                  className='text-green-600 bg-white rounded-sm cursor-pointer'
                />}
                
              </div>
               
                
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
