import React, { useState } from 'react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';


export default function LearningPage() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="min-h-screen bg-black/80 flex flex-col">
            <NavBar />
            <div className="bg-gradient-to-b from-blue-700 to-blue-900 text-white py-10 text-center">
                <h1 className="text-4xl font-semibold">Resources</h1>
                <p className="text-lg mt-4">Explore the following resources to enhance your knowledge:</p>
            </div>
            <div className="text-white flex justify-center quiz-container flex-grow py-6">
                <div className="col-span-2 p-5 text-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Resources</h2>
                    <p className="text-base">
                        Explore the following resources to enhance your knowledge:
                    </p>
                    <ul className="list-disc pl-5">
                        <li>
                            <a
                                href="https://www.tiaa.org/public/learn"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                TIAA Learning Center
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.ssa.gov/oact/quickcalc/early_late.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                Social Security Benefits
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.cnbc.com/2023/11/04/gen-z-leans-into-soft-saving-less-focused-on-retirement.html#:~:text=Generation%20Z%20is%20taking%20a,early%20%E2%80%94%20or%20none%20at%20all."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                PERSONAL FINANCE
                                Retirement is overrated, Gen Z says, as 'soft saving' trend takes hold
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.rpoa.com/meet-with-an-advisor/?utm_source=google&utm_medium=ppc&utm_campaign=BP_BOF_Arizona&utm_content=&utm_term=retirement%20planners&matchtype=p&network=g&device=c&gad=1&gclid=CjwKCAjw15eqBhBZEiwAbDomEoXnKRDczjP_59S4AFwgTyGth5RBOK2JIWVndPtR_smh-BrhVfYgQRoCZOMQAvD_BwE"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                NPOA
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
}
