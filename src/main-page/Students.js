import { useEffect, useState} from "react";
import photo from "./studentsPhoto.png"
import { getStudents as _getStudents, updateStudent} from "../services/api";
import { Link } from "react-router-dom";

const Students = ({title}) => {
    const [students, setStudents] = useState([])
    const [reload, setReload] = useState(0)   
    useEffect(()=>{
        async function getStudents(){
            const studentsResponse = await _getStudents()
            const activeStudents= studentsResponse.filter(student=>student.statusx === "active")
            //TODO filter active student in Lambda function
            setStudents(activeStudents)
        }
        getStudents()
    },[reload])

    async function inactiveStudent(event, student){
        event.preventDefault()
        const {id} = student
        student.statusx = "inactive"
        const response= await updateStudent(id,student)
        setReload(reload=>reload+1)
    }
   
    return(
        <div className='container2'>
        <h3 className="row">
            <div className="col-md-12 mt-5 text-center">
                {title}            
            </div>
            <div className="col-md-12 mt-5 text-center">
                <img src={photo} className="photo" alt="photo"/>                    
            </div>
            <br/>
            <br/>
            <Link to={`/student/`}>
                Add Student
            </Link>
            <br/>
            <br/>
            {students.map(student =>(<p>
                <Link to={`/student/${student.id}`} key={student.id}>{
                    student.first_name
                }
                </Link>
                &nbsp;
                <a href="" onClick={(event)=>inactiveStudent(event,student)}>
                    Delete
                </a>
                </p>
                ))}
        </h3>
        </div>
    )
}
export default Students;