interface ResumeData {
    name: string,
    email: string,
    phone: string,
    education: string,
    institute: string,
    year: number,
    workExperience: string,
    skills: string[]
}

const form = document.getElementById("resumeForm") as HTMLFormElement;
const resumeContent = document.getElementById("resumeContent") as HTMLElement;

if(form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data:ResumeData = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            education: formData.get("education") as string,
            institute: formData.get("institute") as string,
            year: parseInt(formData.get("year") as string, 10),
            workExperience: formData.get("workExperience") as string,
            skills: (formData.get("skills") as string).split(",").map(skill => skill.trim())
        }

        if(validateForm(data)) {
            generateResume(data);
        } else {
            alert("Fill all fields accurately.");
        }
    })
}

function validateForm(data: ResumeData) : boolean {
    if(
        !data.name ||
        data.email.indexOf("@") === -1 ||
        !data.phone ||
        !data.education ||
        !data.institute ||
        isNaN(data.year) ||
        !data.workExperience ||
        data.skills.length === 0
    ) {
        return false;
    } else {
        return true;
    }
}

function generateResume(data: ResumeData) : void {
    if(resumeContent) {
        resumeContent.innerHTML = `
        <h2>Generated Resume</h2>
        <h3>${data.name}</h3>
        <p><strong>Email: </strong>${data.email}</p>
        <p><strong>Phone: </strong>${data.phone}</p>
        <hr>
        <h4>Education</h4>
        <p>${data.education} from ${data.institute} (${data.year})</p>
        <hr>
        <h4>Work Experience</h4>
        <p>${data.workExperience}</p>
        <hr>
        <h4>Skills</h4>
        <ul>${data.skills.map(skill => `<li>${skill}</li>`).join("")}</ul>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const resumeContent = document.getElementById('resumeContent');

    function makeEditable(sectionId: string) {
        const section = document.getElementById(sectionId);
        if(section) {
            section.setAttribute("contenteditable", "true");
            section.addEventListener('input', (e) => {
                const target = e.target as HTMLElement;
                localStorage.setItem(sectionId, target.innerHTML);
            })
        }
    }

    function LoalSavedContent(sectionId: string) {
        const savedContent = localStorage.getItem(sectionId);
        if(savedContent) {
            const section = document.getElementById(sectionId)
            if(section) {
                section.innerText = savedContent
            }
        }
    }

    if(resumeContent) {
        const sections = ['name', 'email', 'phone', 'education', 'institute', 'workExperience', 'skills'];
        sections.forEach((sectionId) => {
            makeEditable(sectionId);
            LoalSavedContent(sectionId);
        });
    }
})