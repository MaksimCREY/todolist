import { useEffect, useState } from "react"
import "./style.scss";

export default function TodoList(){


    function getStoredTodos(){
        let data= localStorage.getItem("todos")
        let json=JSON.parse(data)
        if(json){
            return json
        }
        return []
    }

    const [todos,setTodos]=useState(getStoredTodos())

     useEffect(()=>{
        localStorage.setItem("todos", JSON.stringify(todos))
     },[todos])

    function handleSubmit(event){
        event.preventDefault()

        let task=event.target.task.value

        if (!task) {
            alert("Введите задачу!")
            return 
        }

        setTodos([...todos, { task: task, completed: false}])

        event.target.reset()
    
    }


    function changeTaskStatus(index){
        let newTodos=[...todos]
        newTodos[index].completed=!newTodos[index].completed
        setTodos(newTodos)
    }

    function deleteTask(index){
        let newTodos=[...todos]
        newTodos.splice(index, 1)

        setTodos(newTodos)
    }
    return (

        <div className="container my-5">
            <div className="mx-auto rounded border p-4" style={{width:"600px", backgroundColor: "#40E0D0"}}>
            <h2 className="text-white text-center mb-5">ТОДО-ЛИСТ</h2>

            <form className="d-flex" onSubmit={handleSubmit} >
            <input className="form-control me-2"  placeholder="New Task" name="task" />
            <button className="btn btn-outline-light" type="submit">Add</button>
            </form>

            {

                todos.map((todo, index) =>{
                    return (
                        <div key={index} className="rounded mt-4 p-2 d-flex" 
                        style={{backgroundColor: todo.completed ? "#87FC68" : "LightGray"}}>

                            <div className="me-auto">
                            {todo.task}

                            </div>
                            <div>
                            <i className={ "h5  me-2 " + (todo.completed ? "bi bi-check-square": "bi bi-square")}
                            style={{cursor: "pointer"}} onClick={()=> changeTaskStatus(index)}></i>
                            <i className="bi bi-trash3-fill text-danger h5"
                                style={{cursor: "pointer"}} onClick={()=> deleteTask(index)}></i>

                            </div>

                        </div>   

                    )
                })
            }
            </div>
        </div>
        
    )
}
