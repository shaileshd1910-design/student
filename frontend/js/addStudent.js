const form = document.getElementById('studentForm');

form.addEventListener('submit', async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append('student_name', document.getElementById('student_name').value);
    formData.append('father_name', document.getElementById('father_name').value);
    formData.append('mother_name', document.getElementById('mother_name').value);

    formData.append('mobile', document.getElementById('mobile').value);
    formData.append('email', document.getElementById('email').value);

    formData.append('gender', document.getElementById('gender').value);
    formData.append('dob', document.getElementById('dob').value);

    formData.append('caste', document.getElementById('caste').value);
    formData.append('category', document.getElementById('category').value);
    formData.append('aadhaar', document.getElementById('aadhaar').value);

    formData.append('course', document.getElementById('course').value);
    formData.append('year', document.getElementById('year').value);

    formData.append('admission_date', document.getElementById('admission_date').value);

    formData.append('total_fees', document.getElementById('total_fees').value);
    formData.append('paid_amount', document.getElementById('paid_amount').value);
    formData.append('scholarship', document.getElementById('scholarship').value);

    formData.append('address', document.getElementById('address').value);

    const photo = document.getElementById('photo').files[0];

    if (photo) {

        formData.append('photo', photo);

    }

    try {

        const response = await fetch(

            'http://localhost:5000/students',

            {
                method: 'POST',
                body: formData
            }

        );

        const result = await response.json();

        if (result.success) {

            alert("Student Saved Successfully");

            form.reset();

        } else {

            alert(result.message || "Error Saving Data");

        }

    }

    catch (err) {

        console.log(err);

        alert("Server Error");

    }

});