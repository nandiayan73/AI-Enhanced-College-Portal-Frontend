import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Notification from './Notificaiton';
function Home() {
    return (
        <>



            <div className="container top" >

                <div className="top-left">
                    <h1>Welcome to College Portal</h1>
                    <h5>A centralized platform to manage attendance, track performance, conduct tests, and stay updated — all in one place</h5>
                    <div className="button" style={{marginTop:"20px"}}>

                        <a href="/Login/StudentLogin"><button type="button" class="btn btn-primary" >Student login</button></a>
                        <a href="/Login/FacultyLoginPage"><button type="button" class="btn btn-secondary">Faculty login</button></a>

                        <a href="/Login/AdminLogin"><button type="button" class="btn btn-success">Admin login</button></a>
                    </div>



                </div>

                <div className="top-right">

                    <DotLottieReact
                        src="https://lottie.host/d4b0d4d5-b64f-4bcd-af49-c93f2a6c611c/TWPqb95nJ2.lottie"
                        loop
                        autoplay
                        id='animaiton-1'
                    />
                </div>



            </div>
            <div className="notification " style={{ marginTop: "50px" }}>

                <Notification />
            </div>

        </>
    )
}




export default Home;

// export default Home
