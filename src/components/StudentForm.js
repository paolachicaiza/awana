import { useEffect, useState} from "react";
import {Link, useParams, useNavigate} from 'react-router-dom';
import { getStudent as _getStudent, updateStudent, createStudent} from "../services/api"

export default function StudentForm() {
    let navigate = useNavigate();
    const { id } = useParams();
    const [student, setStudent] = useState({})
    useEffect(()=>{
        async function getStudent(){
            const studentResponse = await _getStudent(id)
            setStudent(studentResponse)
        }
        id && getStudent()
    },[id])

    async function inactiveStudent(event, student){
        event.preventDefault()
        const {id} = student
        student.statusx = "inactive"
        const response= await updateStudent(id,student)
        navigate("/");
    }
   

    async function submitStudent(){
        let response
        if (id)
            response= await updateStudent(id,student)
        else
            response= await createStudent(student)
    }

    console.log(student)
    
    return(
        <form onSubmit={async event=>{
                event.preventDefault()
                await submitStudent()
            }}>
                <Link to="/"> 
                    Back 
                </Link>
                <br/>
                <br/>

                {student.id && <a href="" onClick={(event)=>inactiveStudent(event,student)}>
                    Delete
                </a>}
                <br/>       
            <div className="col-md-4 mt-1">
                <label>
                    First Name:
                </label>
                <br/>
                <input 
                    value={student.first_name || ""} 
                    onChange={event=>setStudent(student=>({...student, first_name:event.target.value}))}/>               
            </div>
            <br/>
            <div>
                <label>
                    Last Name:
                </label>
                <br/>
                <input 
                    value={student.last_name || ""} 
                    onChange={event=>setStudent(student=>({...student, last_name:event.target.value}))}/>               
            </div>
            <br/>  
            <div>
                <label>
                    Age:
                </label>
                <br/>
                <input 
                    value={student.age || ""} 
                    onChange={event=>setStudent(student=>({...student, age:event.target.value}))}/>               
            </div> 
            <br/>  
            <div>
                <label>
                    Work Experience  (Please separated by commas):
                </label>
                <br/>
                <input 
                    value={student.work_experience?.join(",") || []} 
                    onChange={event=>setStudent(student=>({...student, work_experience:event.target.value.split(",")}))}/>               
            </div>
            <br/> 
            <div>
                <label>
                    Experience  (years):
                </label>
                <br/>
                <input 
                    value={student.years_experience || ""} 
                    onChange={event=>setStudent(student=>({...student, years_experience:event.target.value}))}/>               
            </div> 
            <br/>  
            <div>
                <label>
                    Tech skills  (Please separated by commas):
                </label>
                <br/>
                <input 
                    value={student.tech_skills?.join(",") || []} 
                    onChange={event=>setStudent(student=>({...student, tech_skills:event.target.value.split(",")}))}/>               
            </div>
            <br/> 
            <div>
                <label>
                    Soft skills  (Please separated by commas):
                </label>
                <br/>
                <input 
                    value={student.soft_skills?.join(",") || []} 
                    onChange={event=>setStudent(student=>({...student, soft_skills:event.target.value.split(",")}))}/>               
            </div>
            <br/> 
            <input type="submit" value="Submit"/>                   
        </form>
    )
}