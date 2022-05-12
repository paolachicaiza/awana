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


    return(
        <div className='container'>
        <h3 className="row">
            <div className="col-md-12 mt-5 text-center">
                {title}            
            </div>
            <div className="col-md-12 mt-5 text-center">
                <img src={photo} className="photo" alt="photo"/>                    
            </div>
            <div className="col-md-12 mt-5 text-end">
                
                    <Link to={`/student/`}
                    >
                        <button className="button">
                        Add Student
                        </button>
                    </Link>                       
            </div>
            <br/>
            <br/>
            <div className="grid-container">
                <div className="grid-header">
                    First Name
                    </div>
                
                <div className="grid-header">
                    Last Name
                </div>
                <div className="grid-header"/>
            {students.map(student =>(
                <>
                <div className="grid-item">
                    {student.first_name}
                    </div>
                
                <div className="grid-item">
                    {student.last_name}
                </div>

                <div className="grid-item">
                <Link to={`/student/${student.id}`}>
                    View Profile
                </Link>

                </div>
                </>
            ))}
            </div>
            {/* {students.map(student =>(<p>
                <Link to={`/student/${student.id}`} key={student.id}>
                    {student.first_name} {student.last_name}
                </Link>
                &nbsp;

                </p>
                ))} */}
            <br/>
        </h3>
        </div>
    )
}
export default Students;