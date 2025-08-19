import React, { useState, useEffect, useRef } from 'react';

// Use this mock data to render the portfolio.
// It is now placed outside the main component for clarity.
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
            name: "Fusion Kitchen",
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
    education: [
        {
            degree: "Bachelor of Arts (History)",
            institution: "Annamalai University",
            year: "2018"
        }
    ],
    certifications: [
        "iOS Development Course - Greens Technology, Chennai",
        "Internship - As2 Developers, Bengaluru",
        "Core Data & Realm - Master Data Persistence for iOS",
        "SwiftUI + SwiftData Masterclass - iOS",
    ],
};

// Custom Hook for detecting when an element is on screen for fade-in effect
const useOnScreen = (options) => {
    const ref = useRef();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, options]);
    return [ref, isVisible];
};

// AnimatedSection Component: Wraps sections to apply fade-in animation on scroll
const AnimatedSection = ({ children, id, className }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
    return (
        <section 
            ref={ref} 
            id={id} 
            className={`py-20 sm:py-32 transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${className}`}
        >
            {children}
        </section>
    );
};

// Spinner Component for loading state
const Spinner = () => (
    <div className="flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-red-500"></div>
    </div>
);

// Modal Component for the email generation form
const Modal = ({ show, onClose, onGenerate, loading, emailOutput, jobRole, setJobRole, error }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950 bg-opacity-80 backdrop-blur-md">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 w-full max-w-lg mx-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-3xl font-bold text-white mb-4">Generate Email Draft</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors duration-200 text-3xl">&times;</button>
                </div>
                <p className="text-gray-400 mb-6">Enter a job title or role, and I'll generate an email draft highlighting your fit for the position based on your portfolio data.</p>
                <input
                    type="text"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    placeholder="e.g., Senior iOS Developer, Mobile Engineer"
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-red-600 transition-shadow"
                />
                <button
                    onClick={onGenerate}
                    disabled={loading}
                    className="w-full px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Generating...' : 'Generate Draft'}
                </button>

                {loading && <div className="mt-6"><Spinner /></div>}
                {error && <div className="mt-6 text-red-400">{error}</div>}
                {emailOutput && (
                    <div className="mt-6 p-4 bg-gray-700 rounded-lg border border-gray-600 whitespace-pre-wrap text-gray-300">
                        {emailOutput}
                    </div>
                )}
            </div>
        </div>
    );
};

// Header Component
const Header = () => (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-70 backdrop-blur-sm transition-all duration-300">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <a href="#hero" className="text-3xl font-bold text-gray-100 transform hover:scale-105 transition-transform duration-300">NS.</a>
            <div className="hidden md:flex space-x-8 text-lg">
                <a href="#about" className="text-gray-400 hover:text-white transition duration-300">About</a>
                <a href="#experience" className="text-gray-400 hover:text-white transition duration-300">Experience</a>
                <a href="#skills" className="text-gray-400 hover:text-white transition duration-300">Skills</a>
                <a href="#projects" className="text-gray-400 hover:text-white transition duration-300">Projects</a>
                <a href="#education" className="text-gray-400 hover:text-white transition duration-300">Education</a>
                <a href="#contact" className="text-gray-400 hover:text-white transition duration-300">Contact</a>
            </div>
        </nav>
    </header>
);

// Hero Component
const Hero = () => (
    <section id="hero" className="relative min-h-screen flex items-center justify-center text-center px-6">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url('https://placehold.co/1920x1080/0d1117/FFFFFF?text=Dev+Background')` }}></div>
        <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">Narayanasamy A</h1>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-300 mt-4">iOS Developer</h2>
            <p className="mt-6 text-xl md:text-2xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
                A specialist in creating scalable, user-centric mobile apps with a focus on real-time messaging, AI integration, and performance optimization.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition duration-300">
                    LinkedIn
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="px-8 py-4 text-lg font-semibold text-white border border-gray-700 rounded-full hover:bg-gray-800 transition duration-300">
                    GitHub
                </a>
            </div>
        </div>
    </section>
);

// About Component
const About = ({ onGenerateClick }) => (
    <AnimatedSection id="about" className="bg-gray-950">
        <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight text-center mb-16">About Me</h2>
            <div className="bg-gray-800 p-8 md:p-12 rounded-2xl shadow-lg border border-gray-700 transform hover:scale-105 transition-transform duration-300">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed text-center">
                    {portfolioData.professionalSummary}
                </p>
                <div className="mt-8 flex justify-center">
                    <button onClick={onGenerateClick} className="px-8 py-3 bg-red-600 text-white font-semibold rounded-full shadow-lg hover:bg-red-500 transition-colors">
                        Generate an Email Draft
                    </button>
                </div>
            </div>
        </div>
    </AnimatedSection>
);

// Experience Component
const Experience = () => (
    <AnimatedSection id="experience">
        <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight text-center mb-16">Professional Experience</h2>
            <div className="space-y-12">
                {portfolioData.experience.map((job, index) => (
                    <div key={index} className="bg-gray-800 p-8 md:p-10 rounded-2xl shadow-lg border border-gray-700 transform hover:scale-105 transition-transform duration-300">
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            <div className="flex-shrink-0">
                                <h3 className="text-3xl font-semibold text-white">{job.title.split(' | ')[0]}</h3>
                                <p className="text-xl text-gray-300">{job.title.split(' | ')[1]}</p>
                                <p className="text-md text-gray-500 mt-1">{job.date}</p>
                            </div>
                            <div className="md:border-l md:border-gray-700 md:pl-6">
                                <p className="text-lg text-gray-400">{job.summary}</p>
                                {job.projects && (
                                    <ul className="mt-2 list-disc list-inside space-y-1 text-md text-gray-500">
                                        {job.projects.map((proj, idx) => (
                                            <li key={idx}><strong>Project:</strong> {proj}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </AnimatedSection>
);

// Skills Component
const Skills = () => (
    <AnimatedSection id="skills" className="bg-gray-950">
        <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight text-center mb-16">Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(portfolioData.skills).map(([category, skills]) => (
                    <div key={category} className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 transform hover:scale-105 transition-transform duration-300">
                        <h3 className="text-2xl font-semibold text-white mb-4">{category}</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                                <span key={index} className="px-4 py-2 bg-gray-700 text-gray-200 rounded-full">{skill}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </AnimatedSection>
);

// Projects Component
const Projects = () => (
    <AnimatedSection id="projects">
        <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight text-center mb-16">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {portfolioData.projects.map((project, index) => (
                    <div key={index} className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 transform hover:scale-105 transition-transform duration-300">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-semibold text-white">{project.name}</h3>
                            {project.appStore && (
                                <a href={project.appStore} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400 transition-colors">
                                    <i className="fab fa-app-store text-xl"></i>
                                </a>
                            )}
                        </div>
                        <p className="text-lg text-gray-400">{project.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </AnimatedSection>
);

// Education Component
const Education = () => (
    <AnimatedSection id="education" className="bg-gray-950">
        <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight text-center mb-16">Education & Certifications</h2>
            <div className="space-y-8">
                {portfolioData.education.map((edu, index) => (
                    <div key={index} className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 transform hover:scale-105 transition-transform duration-300">
                        <h3 className="text-2xl font-semibold text-white">{edu.degree}</h3>
                        <p className="text-lg text-gray-400">{edu.institution}</p>
                        <p className="text-sm text-gray-500">{edu.year}</p>
                    </div>
                ))}
                <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 transform hover:scale-105 transition-transform duration-300">
                    <h3 className="text-2xl font-semibold text-white mb-4">Certifications</h3>
                    <ul className="list-disc list-inside space-y-2 text-lg text-gray-400">
                        {portfolioData.certifications.map((cert, index) => (
                            <li key={index} className="flex items-center">
                                <i className="fas fa-certificate text-red-500 mr-2"></i>
                                {cert}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </AnimatedSection>
);

// Contact Component
const Contact = () => (
    <AnimatedSection id="contact">
        <div className="container mx-auto px-6 max-w-3xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Get In Touch</h2>
            <p className="mt-6 text-xl md:text-2xl text-gray-400 leading-relaxed">
                I'm currently seeking new opportunities. Whether you have a question or just want to say hello, feel free to reach out.
            </p>
            <a href="mailto:anarayanasamy12@gmail.com" className="mt-10 inline-block px-10 py-4 text-xl font-semibold text-black bg-white rounded-full hover:bg-gray-200 transition duration-300 transform hover:scale-105">
                Say Hello
            </a>
        </div>
    </AnimatedSection>
);

// Footer Component
const Footer = () => (
    <footer className="py-8 text-center text-gray-500 border-t border-gray-800">
        <p>Built with ❤️ by Narayanasamy</p>
    </footer>
);

// Main App Component
export default function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jobRole, setJobRole] = useState('');
    const [emailOutput, setEmailOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showGoTop, setShowGoTop] = useState(false);

    // Handler for generating the email draft using the Gemini API
    const handleGenerateEmail = async () => {
        if (jobRole.trim() === '') {
            setError('Please enter a job role.');
            return;
        }

        setLoading(true);
        setError('');
        setEmailOutput('');

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
                        setError("Sorry, I couldn't generate an email draft. Please try again with a different job role.");
                    }
                    break;
                } else if (response.status === 429) {
                    const delay = Math.pow(2, currentRetry) * 1000;
                    console.warn(`API rate limit exceeded. Retrying in ${delay}ms...`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                    currentRetry++;
                } else {
                    throw new Error(`API call failed with status: ${response.status}`);
                }
            } catch (err) {
                console.error("Error generating email:", err);
                setError("An error occurred while generating the draft. Please try again.");
                break;
            }
        }
        setLoading(false);
    };

    // Handler for the "Go to Top" button
    const handleGoToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // useEffect to manage the "Go to Top" button's visibility
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowGoTop(true);
            } else {
                setShowGoTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-gray-950 text-gray-200 min-h-screen font-sans">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
                body {
                    font-family: 'Inter', sans-serif;
                    background-color: #0d1117;
                    color: #E5E5E5;
                }
                `}
            </style>
            <Header />
            <main>
                <Hero />
                <About onGenerateClick={() => setIsModalOpen(true)} />
                <Experience />
                <Skills />
                <Projects />
                <Education />
                <Contact />
            </main>
            <Footer />
            <Modal
                show={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onGenerate={handleGenerateEmail}
                loading={loading}
                emailOutput={emailOutput}
                jobRole={jobRole}
                setJobRole={setJobRole}
                error={error}
            />
            <button
                onClick={handleGoToTop}
                className={`fixed bottom-8 right-8 bg-red-600 text-white p-4 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 ${showGoTop ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            >
                <i className="fas fa-arrow-up"></i>
            </button>
        </div>
    );
}
