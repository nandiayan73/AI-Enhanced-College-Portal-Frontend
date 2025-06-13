import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import AboutFeature from './AboutFeature';

function About() {
    const smarTracking = ['Subject-wise test scores and trends', 'Attendance percentage and visual timeline', 'Individual and class-level analytics', 'Exportable progress reports (PDF/CSV)']
    const Centralized =['Department-wise and role-based announcements','Real-time visibility on student dashboards','Email and in-app notification alerts','Option to pin urgent notices (e.g., exam schedule, results)']
    const attendance = ['Auto-alert below 75% attendance','Visual indicators (red badges, warning cards)','Notification to students and faculty','Option to request justification or upload medical documents']
    const Suggestion = ['Saves time by narrowing down important topics','Boosts confidence with targeted revision','Helps predict probable questions','Especially useful before semester exams']
    
    return (
        <>
            <div className="container about-top">
                <div className="about-left">
                    <h5>AI Enhanced College Portal is a smart academic platform that connects students, faculty, and admins—offering performance tracking, attendance monitoring, and seamless communication for a more efficient and transparent educational experience.</h5>
                </div>
                <div className="about-right">


                    <DotLottieReact
                        src="https://lottie.host/cbc81a26-824c-4d9a-8cd0-6a6cf7f5abbc/qv8d4VuAF8.lottie"
                        loop
                        autoplay
                        id='animation-2'
                    />
                </div>


            </div>
            <div className="container">
                <div>
                    <h1>Features</h1>

                </div>

                <div className="features flex flex-col gap-6 justify-center">

                    <AboutFeature
                        title="Smart Performance Tracking"
                        content="Monitor academic progress with real-time performance insights. Students can view their marks, attendance, and subject-wise progress through easy-to-read graphs and reports. Faculty can track class averages and individual student growth to identify those needing extra support. The system auto-updates after every test or class entry, ensuring up-to-date records."
                        items={smarTracking}
                        elementId="firstelement"
                    />

                    <AboutFeature
                        title="Attendance Warning System"
                        content="The system automatically tracks student attendance and issues a warning alert when it drops below 75%, helping students avoid academic penalties. Students will see a highlighted notice on their dashboard and also receive reminders via email or in-app notification. Faculty can view and monitor students with low attendance and take early action."
                        items={attendance}
                        elementId="secondelement"
                    />
                    <AboutFeature
                        title="Centralized Announcements"
                        content="Stay updated with all important academic notices in one place. Faculty and administrators can post announcements for exams, classes, events, placements, and holidays. Students see real-time updates on their dashboard, and can filter announcements by category or department. No more missed 
                        deadlines or scattered updates."
                        items={Centralized}
                        elementId="thirdelement"
                    />
                    <AboutFeature
                        title="Previous Year Exam Suggestion"
                        content="The system analyzes previous 5 years' semester exam papers and generates a list of suggested questions for each subject. It highlights frequently asked topics, important patterns, and question types (MCQ, short, long). Students can use these insights to focus their preparation and practice more effectively."
                        items={Suggestion}
                        elementId="fourthelement" />
                </div>

            </div>
        </>
    )
}

export default About
