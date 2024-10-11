import Cards from "./Cards";

function TasksList({tasks,form,setForm,handleDeleteTask,setTaskToEdit}) {

    return (
    

        tasks.map((task) => (
        <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 p-2" key={task.id}>
            <Cards
            task={task}
            form={form}
            setForm={setForm}
            setTaskToEdit={setTaskToEdit}
            handleDeleteTask={handleDeleteTask}
            />
        </div>
        ))
    

    );
}

export default TasksList;