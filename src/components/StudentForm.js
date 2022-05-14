import { useEffect, useState} from "react";
import {Link, useParams, useNavigate} from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
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
        navigate("/",{state:{action:id?"Student Updated":"Student Created"}});
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
                <div className="grid-form-container">
                    <div className="grid-form-item">
                        First Name:
                    </div>
                    <div className="grid-form-item">
                        <input 
                            value={student.first_name || ""} 
                            onChange={event=>setStudent(student=>({...student, first_name:event.target.value}))}/> 
                    </div>
                    <div className="grid-form-item">
                        Last Name:
                    </div>
                    <div className="grid-form-item">
                        <input 
                            value={student.last_name || ""} 
                            onChange={event=>setStudent(student=>({...student, last_name:event.target.value}))}/>           
                    </div>
                    <div className="grid-form-item">
                        Age:
                    </div>
                    <div className="grid-form-item">
                    <input 
                        value={student.age || ""} 
                        onChange={event=>setStudent(student=>({...student, age:event.target.value}))}/> 
                    </div>

                    <div className="grid-form-item">
                        Work Experience:
                    </div>

                    <div className="grid-form-item">
                        <CreatableSelect
                            value={student.work_experience?.map(value=>({label:value,value}))}
                            isMulti
                            onChange={
                                (
                                    newValue
                                  ) => {
                                    console.log(newValue);
                                    const work_experience = newValue.map(({value})=>value)
                                    setStudent(student=>({...student, work_experience}))
                                  }
                            }
                        />
                        {/* <input 
                        value={student.work_experience?.join(",") || []} 
                        onChange={event=>setStudent(student=>({...student, work_experience:event.target.value.split(",")}))}/>   */}             
                    </div>

                    <div className="grid-form-item">
                        Experience  (years):
                    </div>

                    <div className="grid-form-item">
                        <input 
                        value={student.years_experience || ""} 
                        onChange={event=>setStudent(student=>({...student, years_experience:event.target.value}))}/>               
                    </div>  

                     <div className="grid-form-item">
                        Tech skills:
                    </div>

                     <div className="grid-form-item">
                        <input 
                        value={student.tech_skills?.join(",") || []} 
                        onChange={event=>setStudent(student=>({...student, tech_skills:event.target.value.split(",")}))}/>
                    </div>                                                       
                    
                    <div className="grid-form-item">
                        Soft skills:
                    </div>
                    <div className="grid-form-item">
                    <input 
                        value={student.soft_skills?.join(",") || []} 
                        onChange={event=>setStudent(student=>({...student, soft_skills:event.target.value.split(",")}))}/>
                    </div>
                </div>
            <input type="submit" value="Create"/>                   
        </form>
    )
}