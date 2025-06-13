import React from 'react'

function RegistrationPage() {
    return (
        <>
            <div class="list-group container ">
                <a href="/Registration/StudentRegistration" class="list-group-item list-group-item-action ">
                    <div class="d-flex w-100 justify-content-center text-center">
                        <h5 class="mb-1 ">Student Registration</h5>
                        {/* <small>3 days ago</small> */}
                    </div>
                    <p class="mb-1 text-center">Some placeholder content in a paragraph.</p>
                    {/* <small>And some small print.</small> */}
                </a>
                <a href="/Registration/FacultyRegistration" class="list-group-item list-group-item-action ">
                    <div class="d-flex w-100 justify-content-center ">
                        <h5 class="mb-1">Faculty Registration</h5>
                        {/* <small class="text-body-secondary">3 days ago</small> */}
                    </div>
                    <p class="mb-1 text-center">Some placeholder content in a paragraph.</p>
                    {/* <small class="text-body-secondary">And some muted small print.</small> */}
                </a>
                <a href="/Registration/AdminstrationRegistration" class="list-group-item list-group-item-action ">
                    <div class="d-flex w-100 justify-content-center ">
                        <h5 class="mb-1">Admin Registration</h5>
                        {/* <small class="text-body-secondary">3 days ago</small> */}
                    </div>
                    <p class="mb-1 text-center">Some placeholder content in a paragraph.</p>
                    {/* <small class="text-body-secondary">And some muted small print.</small> */}
                </a>
            </div>

        </>
    )
}

export default RegistrationPage;
