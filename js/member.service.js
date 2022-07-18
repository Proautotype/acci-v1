const wizardPictureInput = document.getElementById('member-picture-input');
const wizardPicturePreview = document.getElementById('member-picture-preview');
//content
const content_wrapper = document.getElementById('content-wrapper');
//forms
const form = document.getElementById('add-member-form');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const gender = document.getElementById('gender');
const contact = document.getElementById('contact');
const dob = document.getElementById('dateBirth');
const status = document.getElementById('status');
const matrital = document.getElementById('matrital');
const hometown = document.getElementById('hometown');
const residence = document.getElementById('residentialAddress');
//table
const all_members_items = document.getElementById('all-members-items');
console.log('all_members_items ', all_members_items)
//events
wizardPictureInput?.addEventListener('change', setMemberImage)
form?.addEventListener('submit', createMember)
//functions
window.onload = () => {
    all_members_items !== null && getAllMembers()
}

//backend config
const BACKEND_URL = 'https://acci-church-v1.herokuapp.com';

function createMember(event) {
    event.preventDefault();
    new MemberOperations().create({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        gender: gender.value,
        contact: contact.value,
        dob: dob.value,
        status: status.value,
        marital: matrital.value,
        homeTown: matrital.value,
        residence: residence.value,
    }).then((result) => {
        if (result?.statusCode === 400) {
            const alertDiv = document.createElement('div');
            alertDiv.className = "alert alert-danger";
            alertDiv.innerHTML += `<h3>Error</h3>`
            alertDiv.innerHTML += `<hr/>`
            result.message.forEach(value => {
                alertDiv.innerHTML += value
                alertDiv.innerHTML += `<hr/>`
            })
            content_wrapper.prepend(alertDiv)
            scroll(0, 0)
            setTimeout((e) => {
                console.log(e)
                content_wrapper.firstChild.remove()
            }, 3000);
        }
    })
}

function getMember() {
    alert('hello')
}

function getAllMembers() {
    new MemberOperations().fetchAllMembers()
        .then(
            result => {
                console.log(result)
                result.forEach((element, i) => {
                    all_members_items.innerHTML += member_row(element, i);
                }
                );
            })

}

function member_row(element, i) {
    return `<tr>
    <td>${i}</td>
    <td>${element?.firstName}</td>
    <td>${element?.gender}</td>
    <td>${element?.contact?.memberId}</td>
    <td>${new Date(element?.dob).toDateString()}</td>
    <td>${element?.contact?.residence}</td>
    <td>Action</td>
</tr>
`
}

function removeMember(params) {

}

function setMemberImage({ target }) {
    wizardPicturePreview.setAttribute('src', URL.createObjectURL(target.files[0]))
}

class MemberOperations {
    async create(data) {
        try {
            const response = await fetch(
                BACKEND_URL + "/members/addMember", {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            }
            )
            return response.json()
        } catch (error) {

        }
    }

    async fetchAllMembers() {
        try {
            const response = await fetch(
                BACKEND_URL +"/members/all", {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                },
            }
            )
            return response.json()
        } catch (error) {
            console.dir(error)
        }
    }
}

