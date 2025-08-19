import React, { useState, useEffect, useRef } from 'react';

// Main App Component
export default function App() {
    // State for managing the visibility of the email modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    // State for the job role input by the user
    const [jobRole, setJobRole] = useState('');
    // State to hold the generated email draft
    const [emailDraft, setEmailDraft] = useState('');
    // State to manage the loading spinner visibility
    const [isLoading, setIsLoading] = useState(false);
    // State for managing the visibility of the "Go to Top" button
    const [showGoTop, setShowGoTop] = useState(false);

    // Portfolio data, structured for easy rendering
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

    // Function to generate an email draft using an external API
    const generateEmailDraft = async () => {
        if (!jobRole) {
            setEmailDraft("Please enter a job role.");
            return;
        }

        setIsLoading(true);
        setEmailDraft('');

        const prompt = `You are a career assistant. Your task is to write a concise and professional email draft for an iOS developer applying for a new job.
Based on the following resume summary and skills, generate a professional and concise email draft.
The email should be from the perspective of the iOS developer.
The email should highlight relevant skills and experience for the job role: ${jobRole}.
Resume Summary: "${portfolioData.professionalSummary}"
Technical Skills: "${Object.entries(portfolioData.skills).map(([key, value]) => `${key}: ${value.join(', ')}`).join('. ')}"
Email Draft:`;

        const payload = {
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7 },
        };
        const apiKey = ""; 
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const result = await response.json();
                if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
                    setEmailDraft(result.candidates[0].content.parts[0].text);
                } else {
                    setEmailDraft("Sorry, I couldn't generate an email draft. Please try again.");
                }
            } else {
                 setEmailDraft("Failed to generate email. Please try again later.");
            }
        } catch (error) {
            console.error("Error generating email:", error);
            setEmailDraft("An error occurred while generating the draft. Please check the console.");
        } finally {
            setIsLoading(false);
        }
    };

    // Effect for handling scroll events to show/hide the "Go to Top" button
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setShowGoTop(true);
            } else {
                setShowGoTop(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Effect for fade-in animations on sections
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });

        const sections = document.querySelectorAll('.fade-in');
        sections.forEach(section => observer.observe(section));

        return () => sections.forEach(section => observer.unobserve(section));
    }, []);


    return (
        <div className="bg-black text-gray-200 font-sans">
            <div className="container mx-auto p-4 md:p-8 max-w-5xl space-y-12">
                <Header />
                <main className="space-y-12">
                    <AboutMe summary={portfolioData.professionalSummary} onGenerateClick={() => setIsModalOpen(true)} />
                    <Skills skills={portfolioData.skills} />
                    <Experience experience={portfolioData.experience} />
                    <Projects projects={portfolioData.projects} />
                    <Contact />
                </main>
            </div>
            {isModalOpen && (
                <EmailModal
                    onClose={() => setIsModalOpen(false)}
                    jobRole={jobRole}
                    setJobRole={setJobRole}
                    generateEmailDraft={generateEmailDraft}
                    isLoading={isLoading}
                    emailDraft={emailDraft}
                />
            )}
            {showGoTop && <GoTopButton />}
        </div>
    );
}

// Header Component
const Header = () => (
    <header className="text-center pt-16 pb-12 fade-in hero-bg">
        <div className="hero-content">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide">Narayanasamy</h1>
            <p className="text-xl md:text-2xl font-light mt-2 text-gray-400">iOS Developer</p>
            <div className="mt-6 flex justify-center space-x-4 text-2xl">
                <a href="mailto:anarayanasamy12@gmail.com" className="px-4 py-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors"><i className="fas fa-envelope"></i></a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors"><i className="fab fa-linkedin"></i></a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors"><i className="fab fa-github"></i></a>
            </div>
        </div>
    </header>
);

// Section Component for consistent styling
const Section = ({ id, title, children }) => (
    <section id={id} className="section-container fade-in">
        <h2 className="text-2xl font-bold section-title">{title}</h2>
        {children}
    </section>
);

// About Me Section Component
const AboutMe = ({ summary, onGenerateClick }) => (
    <Section id="summary" title="About Me">
        <p className="leading-relaxed text-gray-400">{summary}</p>
        <div className="mt-8 flex justify-center">
            <button onClick={onGenerateClick} className="px-8 py-3 bg-red-600 text-white font-semibold rounded-full shadow-lg hover:bg-red-500 transition-colors">
                Generate an Email Draft
            </button>
        </div>
    </Section>
);

// Skills Section Component
const Skills = ({ skills }) => (
    <Section id="skills" title="Skills">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, skillList]) => (
                <div key={category} className="bg-gray-900 p-6 rounded-lg shadow-inner shadow-gray-700 hover:shadow-xl transition-shadow">
                    <h3 className="text-lg font-semibold text-red-500 mb-2">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                        {skillList.map(skill => <span key={skill} className="bg-gray-800 text-gray-400 text-xs font-medium px-3 py-1 rounded-full border border-gray-700">{skill}</span>)}
                    </div>
                </div>
            ))}
        </div>
    </Section>
);

// Experience Item Component with toggle for details
const ExperienceItem = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-gray-900 p-6 rounded-lg shadow-inner shadow-gray-700 hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-200">{item.title}</h3>
                <span className="text-sm text-gray-500 mt-1 sm:mt-0">{item.date}</span>
            </div>
            {isOpen && (
                <div className="mt-4 space-y-4 text-gray-400">
                    <p>{item.summary}</p>
                    {item.projects && (
                        <ul className="mt-2 text-gray-500">
                            <strong>Projects:</strong>
                            {item.projects.map(proj => <li key={proj} className="ml-4 list-disc">{proj}</li>)}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

// Experience Section Component
const Experience = ({ experience }) => (
    <Section id="experience" title="Experience">
        <div className="space-y-8">
            {experience.map((exp, index) => <ExperienceItem key={index} item={exp} />)}
        </div>
    </Section>
);

// Projects Section Component
const Projects = ({ projects }) => (
    <Section id="projects" title="Projects">
        <div className="space-y-8">
            {projects.map(proj => (
                <div key={proj.name} className="bg-gray-900 p-6 rounded-lg shadow-inner shadow-gray-700 hover:shadow-xl transition-shadow">
                    <div className="flex justify-between items-start">
                        <h3 className="text-xl font-semibold text-gray-200">{proj.name}</h3>
                        {proj.appStore && <a href={proj.appStore} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline"><i className="fab fa-app-store"></i> App Store</a>}
                    </div>
                    <div className="mt-4 space-y-4 text-gray-400">
                        <p>{proj.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </Section>
);

// Contact Section Component
const Contact = () => (
    <Section id="contact" title="Contact & Collaboration">
        <div className="text-center">
            <p className="text-lg text-gray-400 mt-4 mb-6">
                Interested in a collaboration or have a project in mind? Let's connect and build something amazing together.
            </p>
            <div className="flex justify-center space-x-4">
                <a href="mailto:anarayanasamy12@gmail.com" className="px-8 py-3 bg-red-600 text-white font-semibold rounded-full shadow-lg hover:bg-red-500 transition-colors">
                    <i className="fas fa-envelope mr-2"></i>Email Me
                </a>
            </div>
        </div>
    </Section>
);

// Email Modal Component
const EmailModal = ({ onClose, jobRole, setJobRole, generateEmailDraft, isLoading, emailDraft }) => {
    const modalRef = useRef();

    // Close modal on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);
    
    return (
        <div className="modal" style={{ display: 'flex' }}>
            <div className="modal-content text-gray-300" ref={modalRef}>
                <span className="close-button" onClick={onClose}>&times;</span>
                <h3 className="text-2xl font-semibold text-red-500 mb-4">Generate Personalized Email Draft</h3>
                <p className="text-gray-400 mb-6">Enter a job title or role, and I'll generate an email draft highlighting your fit for the position based on your portfolio data.</p>
                <input
                    type="text"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    placeholder="e.g., Senior iOS Developer, Mobile Engineer"
                    className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-red-600 transition-shadow"
                />
                <button onClick={generateEmailDraft} disabled={isLoading} className="w-full px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition-colors disabled:bg-gray-500">
                    {isLoading ? 'Generating...' : 'Generate Draft'}
                </button>
                {isLoading && (
                    <div className="mt-6 flex justify-center">
                        <div className="spinner"></div>
                    </div>
                )}
                {emailDraft && (
                    <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700 whitespace-pre-wrap text-gray-300">
                        {emailDraft}
                    </div>
                )}
            </div>
        </div>
    );
};

// Go to Top Button Component
const GoTopButton = () => (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="go-top-btn">
        <i className="fas fa-arrow-up"></i>
    </button>
);
