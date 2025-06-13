import React from 'react'

function Footer() {
    return (
        <>

            <footer class="bg-light text-black pt-4 pb-3" style={{marginTop:"50px"}}>
                <div class="container">
                    <div class="row">
                        {/* <!-- Logo & About --> */}
                        <div class="col-md-4">
                            <h5>AI Enhanced College Portal</h5>
                            <p class="small">
                                A smart platform for performance tracking, academic updates, and seamless communication between students and faculty.
                            </p>
                        </div>

                        {/* <!-- Quick Links --> */}
                        <div class="col-md-4">
                            <h6>Quick Links</h6>
                            <ul class="list-unstyled">
                                <li><a href="/" class="text-black text-decoration-none">Home</a></li>
                                <li><a href="/about" class="text-black text-decoration-none">About</a></li>
                                <li><a href="/contact" class="text-black text-decoration-none">Contact</a></li>
                            </ul>
                        </div>

                        {/* <!-- Contact Info --> */}
                        <div class="col-md-4">
                            <h6>Contact</h6>
                            <p class="small mb-1">Email: principal.office.svist@gmail.com</p>
                            <p class="small mb-1">Phone: +91-9831084446</p>
                            <p class="small">Address: Swami Vivekananda Institute of Science and Technology, Baruipur, Kolkata</p>
                        </div>
                    </div>

                    {/* <!-- Bottom --> */}
                    <div class="text-center mt-4 border-top pt-3">
                        <p class="small mb-0">&copy; 2025 SVIST. All rights reserved.</p>
                    </div>
                </div>
            </footer>

        </>
    )
}

export default Footer
