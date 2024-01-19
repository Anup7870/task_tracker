import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useState, useEffect, useContext } from "react";
import Context from "../Context";
export default function Task() {
  const [index, setIndex] = useState(0);
  const context = useContext(Context);
  const [value, setValue] = useState({
    id: "",
    task: "",
    created: Date.now(),
    completed: null,
  });

  

  function submit(e) {
    e.preventDefault();
    const index = Math.floor(Math.random() * 1000) + 1;
    setValue({ ...value, id: index });
    // Retrieve existing tasks from local storage
    const existingTasks =
      JSON.parse(localStorage.getItem("incompletedTasks")) || [];

    // Update the tasks with the new task
    const updatedTasks = [...existingTasks, { ...value, id: index }];

    // Set the updated tasks back into local storage
    localStorage.setItem("incompletedTasks", JSON.stringify(updatedTasks));
    context.setValue(context.value + 1);
  }

  return (
    <div className=' w-full flex flex-col lg:flex-row md:flex-row gap-4 md:gap-2 lg:gap-3 justify-center mt-7'>
      <input
        className='text-white bg-transparent border border-inherit px-2 outline-none h-10 rounded-lg lg:w-[70%] md:w-[70%]'
        type='text'
        placeholder='Enter the task'
        onChange={(e) => setValue({ ...value, task: e.target.value })}
      />

      <button
        className='bg-white rounded-lg px-2 hover:bg-transparent border hover:text-white  hover:border-white'
        onClick={submit}>
        <AddCircleOutlineOutlinedIcon /> task
      </button>
    </div>
  );
}
