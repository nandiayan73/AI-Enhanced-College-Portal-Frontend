import React from 'react'

function StudentRegistration() {
    return (
        <>
        <div className='mt-5'>
                <h5>Student Registration Page</h5>

        </div>
            <form class="row g-3" style={{ marginTop: "20px" }}>
                <div class="col-md-6">
                    <label for="inputEmail4" class="form-label">First Name</label>
                    <input type="text" class="form-control" id="inputEmail4" />
                </div>
                
                <div class="col-md-6">
                    <label for="inputPassword4" class="form-label">Last Name</label>
                    <input type="text" class="form-control" id="inputPassword4" />
                </div>
                 <div class="col-md-6">
                    <label for="inputState" class="form-label">Gender</label>
                    <select id="inputState" class="form-select">
                        <option selected>Select Your Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                        
                    </select>
                </div>
                <div class="col-md-6">
                    <label for="inputPassword4" class="form-label " >Date of Birth</label>
                    <input type="date" class="form-control " id="inputPassword4" />
                </div>
                <div class="col-md-6">
                    <label for="inputPassword4" class="form-label " >University Registration Number</label>
                    <input type="text" class="form-control " id="inputPassword4" />
                </div>
                <div class="col-md-6">
                    <label for="inputPassword4" class="form-label">University Roll Number</label>
                    <input type="text" class="form-control" id="inputPassword4" />
                </div>
                <div class="col-md-6">
                    <label for="inputPassword4" class="form-label">Email</label>
                    <input type="text" class="form-control" id="inputPassword4" />
                </div>
                <div class="col-md-6">
                    <label for="inputPassword4" class="form-label">Mobile Number</label>
                    <input type="text" class="form-control" id="inputPassword4" />
                </div>
                <div class="col-md-12">
                    <label for="inputState" class="form-label">Department</label>
                    <select id="inputState" class="form-select">
                        <option selected>Select Your Stream</option>
                        <option>CSE</option>
                        <option>ECE</option>
                        <option>EEE</option>
                        <option>ME</option>
                        <option>CE</option>
                    </select>
                </div>
                <div class="col-12">
                    <label for="inputAddress" class="form-label">Address</label>
                    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" />
                </div>
                <div class="col-md-6">
                    <label for="inputCity" class="form-label">City</label>
                    <input type="text" class="form-control" id="inputCity" />
                </div>
                <div class="col-md-4">
                    <label for="inputState" class="form-label">State</label>
                    <input type="text" class="form-control" id="inputSate" />
                </div>
                <div class="col-md-2">
                    <label for="inputZip" class="form-label">Zip</label>
                    <input type="text" class="form-control" id="inputZip" />
                </div>
                  <div class="col-md-6">
                    <label for="inputPassword4" class="form-label">Set Password</label>
                    <input type="text" class="form-control" id="inputPassword4" />
                </div>
                 <div class="col-md-6">
                    <label for="inputPassword4" class="form-label">Confirm Password</label>
                    <input type="Password" class="form-control" id="inputPassword4" />
                </div>
                <div class="col-md-12 " style={{display:"flex", justifyContent:"center", marginBottom:"40px"}}>
                    <button type="submit" class="btn btn-primary" style={{width:"150px"}}>Submit</button>
                </div>


            </form>
        </>
    )
}

export default StudentRegistration
