import React, { useState, useEffect, useRef } from 'react';
import { Mail, Linkedin, Github, ArrowUp, Apple } from 'lucide-react';

// The main App component containing all portfolio sections and logic.
export default function App() {
    // --- State Management ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jobRole, setJobRole] = useState('');
    const [emailDraft, setEmailDraft] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTopBtnVisible, setIsTopBtnVisible] = useState(false);
    const emailModalRef = useRef(null);

    // --- Portfolio Data ---
    // This object holds all the content for the portfolio.
    // Centralizing data makes it easy to update the portfolio.
    const portfolioData = {
        professionalSummary: "iOS Developer with 2+ years of experience in Swift and SwiftUI mobile app development. Delivered scalable cross-platform applications serving 400,000+ users worldwide. Specialized in real-time messaging, AI integration, performance optimization, and data persistence solutions.",
        skills: {
            "Languages": ["Swift", "SwiftUI"],
            "Frameworks": ["UIKit", "CoreData", "Realm", "Combine", "Alamofire"],
            "Architecture": ["MVVM", "The Composable Architecture (TCA)"],
            "Tools": ["Xcode", "Firebase", "Jira", "Git", "Version Control", "Cursor AI", "SweetPad Extension"]
        },
        experience: [
            {
                title: "FREELANCER | iOS Developer",
                date: "July 2023 - Present",
                summary: "Developed multiple client applications, focusing on real-time features, AI integration, and optimized user experience.",
                projects: ["MeinsteinAi"]
            },
            {
                title: "iOS DEVELOPER | Fusion Innovative Limited",
                date: "February 2023 - June 2023",
                summary: "Contributed to key modules for food delivery apps, enhancing real-time tracking and collaborating on multiple client projects using Agile methodologies.",
                projects: ["Fustion Kitchen", "Chennai Dosa App", "Kolkata Restaurant App", "Karvins Londis App"]
            },
            {
                title: "JR. IOS DEVELOPER | Webandcrafts",
                date: "March 2022 - February 2023",
                summary: "Enhanced features for major mobile apps, including login and home screen development, and applied performance optimizations for large user bases.",
                projects: ["IKEA", "LULU"]
            }
        ],
        projects: [
            {
                name: "MeinsteinAi",
                description: "A real-time messaging application with AI-powered features. The app utilizes CoreData for offline storage and combines SwiftUI and TCA for a robust, scalable architecture. Implemented voice interaction and push notifications to enhance user engagement.",
                appStore: "https://apps.apple.com/app/meinsteinai"
            },
            {
                name: "Fustion Kitchen",
                description: "Developed and optimized the real-time order tracking module for a food delivery application. The feature uses Firebase for live data updates, providing users with accurate and up-to-the-minute status of their orders.",
                appStore: "https://apps.apple.com/app/fusion-kitchen"
            },
            {
                name: "IKEA",
                description: "Contributed to a major update for the IKEA mobile app, focusing on user authentication. Developed and refined the login and OTP (One-Time Password) screens, enhancing security and user experience for over 400,000 users worldwide.",
                appStore: "https://apps.apple.com/app/ikea"
            },
            {
                name: "LULU",
                description: "Built the home page for the Lulu Shopping app using the SwiftUI framework. The design was optimized for performance, ensuring a smooth and responsive experience for users, even with a large number of product listings.",
                appStore: "https://apps.apple.com/app/lulu-shopping"
            }
        ],
    };

    // --- Effects and Event Handlers ---

    // Effect to handle scroll-based visibility for the "Go to Top" button
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setIsTopBtnVisible(true);
            } else {
                setIsTopBtnVisible(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Effect to handle clicking outside the modal to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emailModalRef.current && !emailModalRef.current.contains(event.target)) {
                setIsModalOpen(false);
            }
        };
        if (isModalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isModalOpen]);

    // Function to generate the email draft using a generative AI model
    const generateEmailDraft = async () => {
        if (!jobRole.trim()) {
            setEmailDraft("Please enter a job role.");
            return;
        }

        setIsLoading(true);
        setEmailDraft('');

        const summaryText = portfolioData.professionalSummary;
        const skillsText = Object.entries(portfolioData.skills).map(([key, value]) => `${key}: ${value.join(', ')}`).join('. ');
        const prompt = `You are a career assistant. Your task is to write a concise and professional email draft for an iOS developer applying for a new job. Based on the following resume summary and skills, generate a professional and concise email draft. The email should be from the perspective of the iOS developer. The email should highlight relevant skills and experience for the job role: ${jobRole}. Resume Summary: "${summaryText}" Technical Skills: "${skillsText}" Email Draft:`;

        const payload = {
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7 },
        };
        
        // Note: You need to add your Gemini API key here
        const apiKey = process.env.REACT_APP_GEMINI_API_KEY || "";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        if (!apiKey) {
            setEmailDraft("API key not configured. Please add your Gemini API key to use this feature.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`API call failed with status: ${response.status}`);
            }

            const result = await response.json();
            if (result.candidates && result.candidates.length > 0 && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts.length > 0) {
                setEmailDraft(result.candidates[0].content.parts[0].text);
            } else {
                setEmailDraft("Sorry, I couldn't generate an email draft. Please try again with a different job role.");
            }
        } catch (error) {
            console.error("Error generating email:", error);
            setEmailDraft("An error occurred while generating the draft. Please check the console.");
        } finally {
            setIsLoading(false);
        }
    };

    // --- Reusable JSX Components ---

    const HeroSection = () => (
        <header
            className="text-center pt-16 pb-12 fade-in bg-gradient-to-br from-gray-900 via-black to-gray-800 relative z-0 rounded-xl">
            <div className="relative z-20">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide">Narayanasamy</h1>
                <p className="text-xl md:text-2xl font-light mt-2 text-gray-400">iOS Developer</p>
                <div className="mt-6 flex justify-center space-x-4 text-2xl">
                    <a href="mailto:anarayanasamy12@gmail.com" className="px-4 py-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors" aria-label="Email Narayanasamy">
                        <Mail size={24} />
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors" aria-label="LinkedIn profile">
                        <Linkedin size={24} />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors" aria-label="GitHub profile">
                        <Github size={24} />
                    </a>
                </div>
            </div>
        </header>
    );

    const AboutMeSection = () => (
        <section id="summary" className="bg-[#141414] rounded-lg shadow-xl p-8 fade-in">
            <h2 className="text-2xl font-bold border-l-4 border-red-600 pl-4 mb-8">About Me</h2>
            <p className="leading-relaxed text-gray-400">{portfolioData.professionalSummary}</p>
            <div className="mt-8 flex justify-center">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-8 py-3 bg-red-600 text-white font-semibold rounded-full shadow-lg hover:bg-red-500 transition-colors">
                    Generate an Email Draft
                </button>
            </div>
        </section>
    );

    const SkillsSection = () => (
        <section id="skills" className="bg-[#141414] rounded-lg shadow-xl p-8 fade-in">
            <h2 className="text-2xl font-bold border-l-4 border-red-600 pl-4 mb-8">Skills</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(portfolioData.skills).map(([category, skills], index) => (
                    <div key={index} className="bg-gray-900 p-6 rounded-lg shadow-inner shadow-gray-700 hover:shadow-xl transition-shadow">
                        <h3 className="text-lg font-semibold text-red-500 mb-2">{category}</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, skillIndex) => (
                                <span key={skillIndex} className="bg-gray-800 text-gray-400 text-xs font-medium px-3 py-1 rounded-full border border-gray-700">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );

    const ExperienceSection = () => (
        <section id="experience" className="bg-[#141414] rounded-lg shadow-xl p-8 fade-in">
            <h2 className="text-2xl font-bold border-l-4 border-red-600 pl-4 mb-8">Experience</h2>
            <div className="space-y-8">
                {portfolioData.experience.map((exp, index) => (
                    <div key={index} className="bg-gray-900 p-6 rounded-lg shadow-inner shadow-gray-700 hover:shadow-xl transition-shadow cursor-pointer">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                            <h3 className="text-xl font-semibold text-gray-200">{exp.title}</h3>
                            <span className="text-sm text-gray-500 mt-1 sm:mt-0">{exp.date}</span>
                        </div>
                        <p className="mt-4 leading-relaxed text-gray-400">{exp.summary}</p>
                        {exp.projects.length > 0 && (
                            <ul className="mt-2 text-gray-500 list-disc list-inside">
                                <strong>Projects:</strong>
                                {exp.projects.map((proj, projIndex) => (
                                    <li key={projIndex} className="ml-4">{proj}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );

    const ProjectsSection = () => (
        <section id="projects" className="bg-[#141414] rounded-lg shadow-xl p-8 fade-in">
            <h2 className="text-2xl font-bold border-l-4 border-red-600 pl-4 mb-8">Projects</h2>
            <div className="space-y-8">
                {portfolioData.projects.map((proj, index) => (
                    <div key={index} className="bg-gray-900 p-6 rounded-lg shadow-inner shadow-gray-700 hover:shadow-xl transition-shadow">
                        <div className="flex justify-between items-start">
                            <h3 className="text-xl font-semibold text-gray-200">{proj.name}</h3>
                            {proj.appStore && (
                                <a href={proj.appStore} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline flex items-center gap-1">
                                    <Apple size={24} />
                                    App Store
                                </a>
                            )}
                        </div>
                        <p className="mt-4 leading-relaxed text-gray-400">{proj.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );

    const ContactSection = () => (
        <section id="contact" className="bg-[#141414] rounded-lg shadow-xl p-8 fade-in text-center">
            <h2 className="text-2xl font-bold border-l-4 border-red-600 pl-4 mb-8 inline-block">Contact & Collaboration</h2>
            <p className="text-lg text-gray-400 mt-4 mb-6">
                Interested in a collaboration or have a project in mind? Let's connect and build something amazing together.
            </p>
            <div className="flex justify-center space-x-4">
                <a href="mailto:anarayanasamy12@gmail.com" className="px-8 py-3 bg-red-600 text-white font-semibold rounded-full shadow-lg hover:bg-red-500 transition-colors flex items-center gap-2">
                    <Mail size={24} /> Email Me
                </a>
            </div>
        </section>
    );

    const EmailModal = () => (
        <div id="email-modal"
            className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${isModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <div className="absolute inset-0 bg-black/85 backdrop-blur-lg"></div>
            <div ref={emailModalRef} className="relative bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-lg mx-4 text-gray-300">
                <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h3 className="text-2xl font-bold text-red-500 mb-4">Generate Personalized Email Draft</h3>
                <p className="text-gray-400 mb-6">Enter a job title or role, and I'll generate an email draft highlighting your fit for the position based on your portfolio data.</p>
                <input
                    type="text"
                    id="job-role-input"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    placeholder="e.g., Senior iOS Developer, Mobile Engineer"
                    className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-red-600 transition-shadow"
                />
                <button
                    onClick={generateEmailDraft}
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Generating...' : 'Generate Draft'}
                </button>

                <div id="loading-spinner" className={`mt-6 flex justify-center ${isLoading ? '' : 'hidden'}`}>
                    <div className="spinner h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    <span className="ml-2 text-white">Generating...</span>
                </div>

                {emailDraft && (
                    <div id="email-output" className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700 whitespace-pre-wrap text-gray-300">
                        <h4 className="font-semibold text-red-400 mb-2">Your Draft:</h4>
                        <pre className="text-sm whitespace-pre-wrap">{emailDraft}</pre>
                    </div>
                )}
            </div>
        </div>
    );

    // --- Main JSX Structure ---
    return (
        <div className="bg-black text-gray-200 min-h-screen">
            <div className="container mx-auto p-4 md:p-8 max-w-5xl space-y-12">
                <HeroSection />
                <div className="space-y-12">
                    <AboutMeSection />
                    <SkillsSection />
                    <ExperienceSection />
                    <ProjectsSection />
                    <ContactSection />
                </div>
            </div>

            {/* Go to Top Button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`fixed bottom-8 right-8 bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 ${isTopBtnVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                aria-label="Go to top"
            >
                <ArrowUp size={24} />
            </button>

            {/* Render the modal outside of the main content flow */}
            <EmailModal />
        </div>
    );
};
