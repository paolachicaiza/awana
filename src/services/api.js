import { BASEURL } from "./constants";
export async function getStudents(){
    const response = await fetch(BASEURL)
    const data = await response.json()
    return data
    //TODO hacer un TRY CATCH
}

export async function getStudent(id){
    const response = await fetch(`${BASEURL}/${id}`)
    const data = await response.json()
    return data
    //TODO hacer un TRY CATCH
}

export async function updateStudent(id,student){
    const response = await fetch(`${BASEURL}/${id}`, {
        method: 'PUT',
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(student) // body data type must match "Content-Type" header
      });



    const data = await response.json()
    return data
    //TODO hacer un TRY CATCH
}

export async function createStudent(student){
    const response = await fetch(`${BASEURL}`, {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(student) // body data type must match "Content-Type" header
      });



    const data = await response.json()
    return data
    //TODO hacer un TRY CATCH
}