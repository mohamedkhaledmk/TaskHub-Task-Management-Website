import Cards from "./Cards";

function TasksList({tasks}) {

    return (
    
        tasks.length>0 &&
        tasks.map((task) => (
        <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 p-2" key={task._id}>
            <Cards task={task}/>
        </div>
        ))
    

    );
}

export default TasksList;