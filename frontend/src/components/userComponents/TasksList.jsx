import Cards from "./Cards";

function TasksList({tasks,setForm,handleDeleteTask,setTaskToEdit,handleChange}) {

    return (
    
        tasks.length>0 &&
        tasks.map((task) => (
        <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 p-2" key={task._id}>
            <Cards
            task={task}
            setForm={setForm}
            setTaskToEdit={setTaskToEdit}
            handleDeleteTask={handleDeleteTask}
            handleChange={handleChange}
            />
        </div>
        ))
    

    );
}

export default TasksList;