const attendanceForm = document.getElementById('attendance-form');
const inputs = attendanceForm.getElementsByTagName('input');
const tbody = document.getElementsByTagName('tbody')[0];
//backend config
const BACKEND_URL = 'https://acci-church-v1.herokuapp.com';

attendanceForm.onsubmit = e => {
    e.preventDefault();
    new attendanceClass().add({
        counter: inputs[0].value,
        total: Number(inputs[1].value),
        date: inputs[2].value
    })
    getAllAttendance();
}

async function getAllAttendance(){
    console.log(tbody)
    try {
       const response = await new attendanceClass().all();
       tbody.innerHTML = '';
       response.forEach((element,i) => {
        tbody.innerHTML += attendance_row(element,i)
       });
    } catch (error) {
        console.log(error)
    }
}

function attendance_row(element, i) {
    return `<tr>
    <td>${i}</td>
    <td>${element?.counter}</td>
    <td>${element?.total}</td>
    <td>${new Date(element?.date).toDateString()}</td>
    <td>Action</td>
</tr>
`
}

class attendanceClass {
    add = async (data) => {
        try {
            const response = await fetch(
                BACKEND_URL + "/attendance/add", {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            }
            )
            return response.json();
        } catch (error) {
            console.log(error)
        }
    }
    all = async () =>{
        try {
            const response = await fetch(
                BACKEND_URL + "/attendance/all", {
                method: 'get',
                credentials: 'same-origin',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                },
            }
            )
            return await response.json();
        } catch (error) {

        }
    }
}

window.onload = ()=>{
    getAllAttendance()
}
