import React, { useState, useEffect } from 'react';

// Use this mock data to render the portfolio
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

// --- API Integration and Helper Functions ---
async function generateEmailDraft(jobRole, portfolioData, setEmailOutput, setLoading, setError) {
    if (!jobRole) {
        setEmailOutput("Please enter a job role.");
        return;
    }

    setLoading(true);
    setError(null);
    setEmailOutput("");

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
                    setEmailOutput(result.candidates[0].content.parts[0].text);
                } else {
                    setEmailOutput("Sorry, I couldn't generate an email draft. Please try again with a different job role.");
                }
                setLoading(false);
                return;
            } else if (response.status === 429) {
                const delay = Math.pow(2, currentRetry) * 1000;
                console.warn(`API rate limit exceeded. Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                currentRetry++;
            } else {
                throw new Error(`API call failed with status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error generating email:", error);
            setError("An error occurred while generating the draft. Please check the console.");
            setLoading(false);
            return;
        }
    }
    setEmailOutput("Failed to generate email after multiple retries. Please try again later.");
    setLoading(false);
}

// Reusable Components

const SkillCard = ({ title, skills }) => (
    <div className="bg-gray-900 p-6 rounded-lg shadow-inner shadow-gray-700 hover:shadow-xl transition-shadow">
        <h3 className="text-lg font-semibold text-red-500 mb-2">{title}</h3>
        <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
                <span key={skill} className="bg-gray-800 text-gray-400 text-xs font-medium px-3 py-1 rounded-full border border-gray-700">{skill}</span>
            ))}
        </div>
    </div>
);

const ExperienceItem = ({ exp }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-gray-900 p-6 rounded-lg shadow-inner shadow-gray-700 hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-200">{exp.title}</h3>
                <span className="text-sm text-gray-500 mt-1 sm:mt-0">{exp.date}</span>
            </div>
            <div className={`mt-4 space-y-4 text-gray-400 transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>
                <p>{exp.summary}</p>
                {exp.projects && exp.projects.length > 0 && (
                    <ul className="mt-2 text-gray-500">
                        <strong>Projects:</strong>
                        {exp.projects.map(proj => <li key={proj} className="ml-4 list-disc">{proj}</li>)}
                    </ul>
                )}
            </div>
        </div>
    );
};

const ProjectItem = ({ proj }) => (
    <div className="bg-gray-900 p-6 rounded-lg shadow-inner shadow-gray-700 hover:shadow-xl transition-shadow">
        <div className="flex justify-between items-start">
            <h3 className="text-xl font-semibold text-gray-200">{proj.name}</h3>
            {proj.appStore && (
                <a href={proj.appStore} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">
                    <i className="fab fa-app-store mr-1"></i> App Store
                </a>
            )}
        </div>
        <div className="mt-4 space-y-4 text-gray-400">
            <p>{proj.description}</p>
        </div>
    </div>
);

const SectionTitle = ({ children }) => (
    <h2 className="text-2xl font-bold relative section-title">
        {children}
        <style>
            {`
            .section-title::after {
                content: '';
                position: absolute;
                left: 0;
                bottom: -8px;
                width: 50px;
                height: 3px;
                background-color: #64748b;
                border-radius: 9999px;
            }
            `}
        </style>
    </h2>
);

const Modal = ({ show, onClose, children }) => (
    <div
        className={`fixed inset-0 z-[100] flex justify-center items-center backdrop-blur-md bg-black bg-opacity-85 transition-opacity duration-300 ${show ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={onClose}
    >
        <div className="bg-[#141414] p-8 rounded-lg shadow-lg w-11/12 max-w-lg relative" onClick={e => e.stopPropagation()}>
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-2xl">&times;</button>
            {children}
        </div>
    </div>
);

const Spinner = () => (
    <div className="flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-white border-t-red-500 rounded-full animate-spin"></div>
    </div>
);

export default function App() {
    const [showModal, setShowModal] = useState(false);
    const [jobRole, setJobRole] = useState('');
    const [emailOutput, setEmailOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showGoTop, setShowGoTop] = useState(false);

    // Fade-in animation logic using IntersectionObserver
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            },
            {
                root: null,
                threshold: 0.1,
                rootMargin: '0px',
            }
        );

        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach((el) => observer.observe(el));

        return () => fadeElements.forEach((el) => observer.unobserve(el));
    }, []);

    // Go to top button visibility
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowGoTop(true);
            } else {
                setShowGoTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleGenerateClick = () => {
        generateEmailDraft(jobRole, portfolioData, setEmailOutput, setLoading, setError);
    };

    const handleGoToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bg-[#141414] text-gray-200 min-h-screen font-inter">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
                body {
                    font-family: 'Inter', sans-serif;
                    background-color: #0f172a;
                    color: #e2e8f0;
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
                `}
            </style>

            {/* Header */}
            <header className="bg-black py-6 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide">Narayanasamy</h1>
                <p className="text-xl md:text-2xl font-light mt-2 text-gray-400">iOS Developer</p>
            </header>

            {/* Main Content */}
            <div className="container mx-auto p-4 md:p-8 max-w-5xl space-y-12">
                
                {/* About Me Section */}
                <section id="summary" className="bg-gray-800 p-8 rounded-lg shadow-lg fade-in">
                    <SectionTitle>About Me</SectionTitle>
                    <p className="leading-relaxed text-gray-400">
                        {portfolioData.professionalSummary}
                    </p>
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={() => setShowModal(true)}
                            className="px-8 py-3 bg-red-600 text-white font-semibold rounded-full shadow-lg hover:bg-red-500 transition-colors"
                        >
                            Generate an Email Draft
                        </button>
                    </div>
                </section>

                {/* Technical Skills Section */}
                <section id="skills" className="bg-gray-800 p-8 rounded-lg shadow-lg fade-in">
                    <SectionTitle>Skills</SectionTitle>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        {Object.entries(portfolioData.skills).map(([category, skills]) => (
                            <SkillCard key={category} title={category} skills={skills} />
                        ))}
                    </div>
                </section>

                {/* Professional Experience Section */}
                <section id="experience" className="bg-gray-800 p-8 rounded-lg shadow-lg fade-in">
                    <SectionTitle>Experience</SectionTitle>
                    <div className="space-y-8 mt-8">
                        {portfolioData.experience.map((exp, index) => (
                            <ExperienceItem key={index} exp={exp} />
                        ))}
                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" className="bg-gray-800 p-8 rounded-lg shadow-lg fade-in">
                    <SectionTitle>Projects</SectionTitle>
                    <div className="space-y-8 mt-8">
                        {portfolioData.projects.map((proj, index) => (
                            <ProjectItem key={index} proj={proj} />
                        ))}
                    </div>
                </section>

                {/* Contact & Collaboration Section */}
                <section id="contact" className="bg-gray-800 p-8 rounded-lg shadow-lg fade-in text-center">
                    <SectionTitle>Contact & Collaboration</SectionTitle>
                    <p className="text-lg text-gray-400 mt-4 mb-6">
                        Interested in a collaboration or have a project in mind? Let's connect and build something amazing together.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <a href="mailto:anarayanasamy12@gmail.com" className="px-8 py-3 bg-red-600 text-white font-semibold rounded-full shadow-lg hover:bg-red-500 transition-colors">
                            <i className="fas fa-envelope mr-2"></i>Email Me
                        </a>
                    </div>
                </section>
            </div>

            {/* The Modal */}
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <h3 className="text-2xl font-semibold text-red-500 mb-4">Generate Personalized Email Draft</h3>
                <p className="text-gray-400 mb-6">Enter a job title or role, and I'll generate an email draft highlighting your fit for the position based on your portfolio data.</p>
                <input
                    type="text"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    placeholder="e.g., Senior iOS Developer, Mobile Engineer"
                    className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-red-600 transition-shadow"
                />
                <button
                    onClick={handleGenerateClick}
                    disabled={loading}
                    className="w-full px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Generating...' : 'Generate Draft'}
                </button>

                {loading && <div className="mt-6"><Spinner /></div>}
                {error && <div className="mt-6 text-red-400">{error}</div>}
                {emailOutput && (
                    <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700 whitespace-pre-wrap text-gray-300">
                        {emailOutput}
                    </div>
                )}
            </Modal>

            {/* Go to Top Button */}
            <button
                onClick={handleGoToTop}
                className={`fixed bottom-8 right-8 bg-red-600 text-white p-4 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 ${showGoTop ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            >
                <i className="fas fa-arrow-up"></i>
            </button>
        </div>
    );
}
