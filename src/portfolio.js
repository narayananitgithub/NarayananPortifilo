import React, { useState, useEffect, useRef } from 'react';

// Data for the portfolio, structured for easy rendering
const portfolioData = {
    professionalSummary: "iOS Developer with 2+ years of experience in Swift and SwiftUI mobile app development. Delivered scalable cross-platform applications serving 400,000+ users worldwide. Specialized in real-time messaging, AI integration, performance optimization, and data persistence solutions.",
    skills: {
        "Languages": ["Swift", "SwiftUI"],
        "Frameworks": ["UIKit", "CoreData", "Realm", "Combine", "Alamofire"],
        "Architecture": ["MVVM", "The Composable Architecture (TCA)"],
        "Tools": ["Xcode", "Firebase", "Jira", "Git", "Version Control", "Cursor AI", "SweetPad Extension"],
        "Development": ["Mobile App Development", "API", "REST APIs", "Agile", "Performance Optimization"]
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

// SVG icons to replace Font Awesome for self-contained code.
const EnvelopeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);

const LinkedinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const GithubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.66c3.25-.33 6.66-1.57 6.66-7.03 0-1.55-.56-2.81-1.62-3.83a4 4 0 0 0-.06-3.76s-1.04-.3-3.41 1.49a15.8 15.8 0 0 0-4.08 0c-2.37-1.8-3.41-1.49-3.41-1.49a4 4 0 0 0-.06 3.76c-1.06 1.02-1.62 2.28-1.62 3.83 0 5.46 3.41 6.7 6.66 7.03-.69.45-1.3 1.05-1.53 1.94-.48.6-1.54 1.9-2.01 2.59-.5.7-1.52.88-2.18.57a.3.3 0 0 0-.27-.24c-.45-.18-.89-.25-1.3-.23a.38.38 0 0 0-.25.59c.27.35.45.69.58 1.02a.86.86 0 0 1-.22.6c-.66.6-1.07 1.46-1.07 2.45v1.2" />
        <path d="M9 18a.3.3 0 0 1-.27-.24c-.45-.18-.89-.25-1.3-.23a.38.38 0 0 0-.25.59c.27.35.45.69.58 1.02a.86.86 0 0 1-.22.6c-.66.6-1.07 1.46-1.07 2.45v1.2" />
    </svg>
);

const ArrowUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up">
        <path d="m18 15-6-6-6 6" />
    </svg>
);

const AppStoreIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-apple">
        <path d="M12.553 3.655a6.6 6.6 0 0 0 1.252-2.126 6.6 6.6 0 0 1 1.776 2.062 6.6 6.6 0 0 0 1.928 2.378c.84-.716 1.34-1.644 1.548-2.61a6.6 6.6 0 0 0-1.252 2.126 6.6 6.6 0 0 1-1.776-2.062 6.6 6.6 0 0 0-1.928-2.378Z" />
        <path d="M12.553 3.655a6.6 6.6 0 0 0 1.252-2.126 6.6 6.6 0 0 1 1.776 2.062 6.6 6.6 0 0 0 1.928 2.378c.84-.716 1.34-1.644 1.548-2.61a6.6 6.6 0 0 0-1.252 2.126 6.6 6.6 0 0 1-1.776-2.062 6.6 6.6 0 0 0-1.928-2.378ZM12 21a1.5 1.5 0 0 1-1.5-1.5 1.5 1.5 0 0 1 1.5-1.5 1.5 1.5 0 0 1 1.5 1.5 1.5 1.5 0 0 1-1.5 1.5Z" />
        <path d="M12 21a1.5 1.5 0 0 1-1.5-1.5 1.5 1.5 0 0 1 1.5-1.5 1.5 1.5 0 0 1 1.5 1.5 1.5 1.5 0 0 1-1.5 1.5Z" />
    </svg>
);


// Main Portfolio component
const Portfolio = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jobRole, setJobRole] = useState('');
    const [emailDraft, setEmailDraft] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTopBtnVisible, setIsTopBtnVisible] = useState(false);
    const emailModalRef = useRef(null);

    // --- Side Effects & Observers ---

    // Intersection Observer for fade-in animations
    useEffect(() => {
        const observerOptions = {
            root: null,
            threshold: 0.1,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const fadeInSections = document.querySelectorAll('.fade-in');
        fadeInSections.forEach(section => {
            observer.observe(section);
        });

        // Cleanup function for the observer
        return () => {
            fadeInSections.forEach(section => observer.unobserve(section));
        };
    }, []);

    // Scroll listener for "Go to Top" button
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

    // --- LLM API Call Function ---
    const generateEmailDraft = async () => {
        if (jobRole.trim() === '') {
            setEmailDraft("Please enter a job role.");
            return;
        }

        setIsLoading(true);
        setEmailDraft('');

        const summaryText = portfolioData.professionalSummary;
        const skillsText = Object.entries(portfolioData.skills).map(([key, value]) => `${key}: ${value.join(', ')}`).join('. ');
        const prompt = `You are a career assistant. Your task is to write a concise and professional email draft for an iOS developer applying for a new job.
Based on the following resume summary and skills, generate a professional and concise email draft.
The email should be from the perspective of the iOS developer.
The email should highlight relevant skills and experience for the job role: ${jobRole}.
Resume Summary: "${summaryText}"
Technical Skills: "${skillsText}"
Email Draft:`;

        const payload = {
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.7,
            },
        };

        const apiKey = "";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        const maxRetries = 5;
        let currentRetry = 0;

        while (currentRetry < maxRetries) {
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    const result = await response.json();
                    if (result.candidates && result.candidates.length > 0 &&
                        result.candidates[0].content && result.candidates[0].content.parts &&
                        result.candidates[0].content.parts.length > 0) {
                        setEmailDraft(result.candidates[0].content.parts[0].text);
                    } else {
                        setEmailDraft("Sorry, I couldn't generate an email draft. Please try again with a different job role.");
                    }
                    setIsLoading(false);
                    return;
                } else if (response.status === 429) {
                    const delay = Math.pow(2, currentRetry) * 1000;
                    await new Promise(resolve => setTimeout(resolve, delay));
                    currentRetry++;
                } else {
                    throw new Error(`API call failed with status: ${response.status}`);
                }
            } catch (error) {
                console.error("Error generating email:", error);
                setEmailDraft("An error occurred while generating the draft. Please check the console.");
                setIsLoading(false);
                return;
            }
        }
        setEmailDraft("Failed to generate email after multiple retries. Please try again later.");
        setIsLoading(false);
    };

    // --- Render Functions for Components ---

    const renderSkillCards = () => {
        return Object.entries(portfolioData.skills).map(([category, skills]) => (
            <div key={category} className="bg-gray-900 p-6 rounded-lg shadow-inner shadow-gray-700 hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold text-red-500 mb-2">{category}</h3>
                <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                        <span key={skill} className="bg-gray-800 text-gray-400 text-xs font-medium px-3 py-1 rounded-full border border-gray-700">{skill}</span>
                    ))}
                </div>
            </div>
        ));
    };

    const renderExperienceItems = () => {
        return portfolioData.experience.map((exp, index) => (
            <div key={index} className="bg-gray-900 p-6 rounded-lg shadow-inner shadow-gray-700 hover:shadow-xl transition-shadow cursor-pointer">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-200">{exp.title}</h3>
                    <span className="text-sm text-gray-500 mt-1 sm:mt-0">{exp.date}</span>
                </div>
                <p className="mt-4 leading-relaxed text-gray-400">{exp.summary}</p>
                {exp.projects && exp.projects.length > 0 && (
                    <ul className="mt-2 text-gray-500 list-disc list-inside">
                        <strong>Projects:</strong>
                        {exp.projects.map(proj => <li key={proj} className="ml-4">{proj}</li>)}
                    </ul>
                )}
            </div>
        ));
    };

    const renderProjectItems = () => {
        return portfolioData.projects.map((proj, index) => (
            <div key={index} className="bg-gray-900 p-6 rounded-lg shadow-inner shadow-gray-700 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-gray-200">{proj.name}</h3>
                    {proj.appStore && (
                        <a href={proj.appStore} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline flex items-center gap-1">
                            <AppStoreIcon /> App Store
                        </a>
                    )}
                </div>
                <p className="mt-4 leading-relaxed text-gray-400">{proj.description}</p>
            </div>
        ));
    };

    // --- Main JSX Structure ---
    return (
        <div className="bg-black text-gray-200">
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
                    body {
                        font-family: 'Inter', sans-serif;
                    }
                    .section-container {
                        background-color: #141414;
                        border-radius: 0.5rem;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
                        padding: 2.5rem;
                    }
                    .section-title {
                        color: #E5E5E5;
                        border-left: 4px solid #E50914;
                        padding-left: 1rem;
                        margin-bottom: 2rem;
                    }
                    .fade-in {
                        opacity: 0;
                        transform: translateY(20px);
                        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
                    }
                    .fade-in.is-visible {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    .modal {
                        display: none; /* Initially hidden */
                        position: fixed;
                        z-index: 100;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        overflow: auto;
                        background-color: rgba(0, 0, 0, 0.85);
                        backdrop-filter: blur(8px);
                        -webkit-backdrop-filter: blur(8px);
                        justify-content: center;
                        align-items: center;
                    }
                    .modal.is-visible {
                        display: flex; /* Display when visible */
                    }
                    .modal-content {
                        background-color: #141414;
                        padding: 2.5rem;
                        border-radius: 0.5rem;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                        width: 90%;
                        max-width: 600px;
                        position: relative;
                    }
                    .close-button {
                        position: absolute;
                        top: 1rem;
                        right: 1rem;
                        color: #aaa;
                        font-size: 1.5rem;
                        font-weight: bold;
                    }
                    .close-button:hover,
                    .close-button:focus {
                        color: #fff;
                        cursor: pointer;
                    }
                    .spinner {
                        border: 4px solid rgba(255, 255, 255, 0.1);
                        border-top: 4px solid #E50914;
                        border-radius: 50%;
                        width: 40px;
                        height: 40px;
                        animation: spin 1s linear infinite;
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    .go-top-btn {
                        position: fixed;
                        bottom: 2rem;
                        right: 2rem;
                        background-color: #E50914;
                        color: #fff;
                        border-radius: 50%;
                        width: 48px;
                        height: 48px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 1.5rem;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
                        cursor: pointer;
                        z-index: 50;
                    }
                    .go-top-btn:hover {
                        transform: scale(1.1);
                    }
                    .go-top-btn.hidden {
                        opacity: 0;
                        pointer-events: none;
                    }
                    .hero-bg {
                        background-image: url('https://images.unsplash.com/photo-1549692520-acc66699042b?q=80&w=2940&auto=format&fit=crop');
                        background-size: cover;
                        background-position: center;
                        position: relative;
                        z-index: 0;
                        padding: 0;
                        margin: 0;
                        border-radius: 0;
                    }
                    .hero-bg::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.6);
                        z-index: 1;
                    }
                    .hero-content {
                        position: relative;
                        z-index: 2;
                    }
                `}
            </style>

            <div className="container mx-auto p-4 md:p-8 max-w-5xl space-y-12">
                {/* Hero Section */}
                <header className="text-center pt-16 pb-12 fade-in hero-bg">
                    <div className="hero-content">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide">Narayanasamy</h1>
                        <p className="text-xl md:text-2xl font-light mt-2 text-gray-400">iOS Developer</p>
                        <div className="mt-6 flex justify-center space-x-4 text-2xl">
                            <a href="mailto:anarayanasamy12@gmail.com" className="px-4 py-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors">
                                <EnvelopeIcon />
                            </a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors">
                                <LinkedinIcon />
                            </a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors">
                                <GithubIcon />
                            </a>
                        </div>
                    </div>
                </header>

                {/* Main Content Sections */}
                <div className="space-y-12">
                    {/* About Me Section */}
                    <section id="summary" className="section-container fade-in">
                        <h2 className="text-2xl font-bold section-title">About Me</h2>
                        <p className="leading-relaxed text-gray-400">
                            {portfolioData.professionalSummary}
                        </p>
                        <div className="mt-8 flex justify-center">
                            <button onClick={() => setIsModalOpen(true)} className="px-8 py-3 bg-red-600 text-white font-semibold rounded-full shadow-lg hover:bg-red-500 transition-colors">
                                Generate an Email Draft
                            </button>
                        </div>
                    </section>

                    {/* Technical Skills Section */}
                    <section id="skills" className="section-container fade-in">
                        <h2 className="text-2xl font-bold section-title">Skills</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {renderSkillCards()}
                        </div>
                    </section>

                    {/* Professional Experience Section */}
                    <section id="experience" className="section-container fade-in">
                        <h2 className="text-2xl font-bold section-title">Experience</h2>
                        <div className="space-y-8">
                            {renderExperienceItems()}
                        </div>
                    </section>

                    {/* Projects Section */}
                    <section id="projects" className="section-container fade-in">
                        <h2 className="text-2xl font-bold section-title">Projects</h2>
                        <div className="space-y-8">
                            {renderProjectItems()}
                        </div>
                    </section>

                    {/* Contact & Collaboration Section */}
                    <section id="contact" className="section-container fade-in text-center">
                        <h2 className="text-2xl font-bold section-title inline-block">Contact & Collaboration</h2>
                        <p className="text-lg text-gray-400 mt-4 mb-6">
                            Interested in a collaboration or have a project in mind? Let's connect and build something amazing together.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <a href="mailto:anarayanasamy12@gmail.com" className="px-8 py-3 bg-red-600 text-white font-semibold rounded-full shadow-lg hover:bg-red-500 transition-colors">
                                <EnvelopeIcon />
                                <span className="ml-2">Email Me</span>
                            </a>
                        </div>
                    </section>
                </div>
            </div>

            {/* The Modal */}
            <div className={`modal ${isModalOpen ? 'is-visible' : ''}`} ref={emailModalRef}>
                <div className="modal-content text-gray-300">
                    <span className="close-button" onClick={() => setIsModalOpen(false)}>&times;</span>
                    <h3 className="text-2xl font-semibold text-red-500 mb-4">Generate Personalized Email Draft</h3>
                    <p className="text-gray-400 mb-6">Enter a job title or role, and I'll generate an email draft highlighting your fit for the position based on your portfolio data.</p>
                    <input
                        type="text"
                        id="job-role-input"
                        placeholder="e.g., Senior iOS Developer, Mobile Engineer"
                        value={jobRole}
                        onChange={(e) => setJobRole(e.target.value)}
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
                        <div className="spinner"></div>
                    </div>

                    {emailDraft && (
                        <div id="email-output" className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700 whitespace-pre-wrap text-gray-300">
                            {emailDraft}
                        </div>
                    )}
                </div>
            </div>

            {/* Go to Top Button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`go-top-btn ${isTopBtnVisible ? '' : 'hidden'}`}
            >
                <ArrowUpIcon />
            </button>
        </div>
    );
};

export default Portfolio;