import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { ArrowUp } from 'lucide-react';

const HeroSection = lazy(() => import('./sections/HeroSection'));
const AboutMeSection = lazy(() => import('./sections/AboutMeSection'));
const SkillsSection = lazy(() => import('./sections/SkillsSection'));
const ExperienceSection = lazy(() => import('./sections/ExperienceSection'));
const ProjectsSection = lazy(() => import('./sections/ProjectsSection'));
const ContactSection = lazy(() => import('./sections/ContactSection'));
const EmailModal = lazy(() => import('./sections/EmailModal'));

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

    // --- Main JSX Structure ---
    return (
        <div className="bg-black text-gray-200 min-h-screen">
            <div className="container mx-auto p-4 md:p-8 max-w-5xl space-y-12">
                <Suspense fallback={<div className="text-center py-16">Loading...</div>}>
                    <HeroSection />
                </Suspense>
                <div className="space-y-12">
                    <Suspense fallback={<div className="text-center">Loading about...</div>}>
                        <AboutMeSection summary={portfolioData.professionalSummary} onOpenModal={() => setIsModalOpen(true)} />
                    </Suspense>
                    <Suspense fallback={<div className="text-center">Loading skills...</div>}>
                        <SkillsSection skillsByCategory={portfolioData.skills} />
                    </Suspense>
                    <Suspense fallback={<div className="text-center">Loading experience...</div>}>
                        <ExperienceSection experience={portfolioData.experience} />
                    </Suspense>
                    <Suspense fallback={<div className="text-center">Loading projects...</div>}>
                        <ProjectsSection projects={portfolioData.projects} />
                    </Suspense>
                    <Suspense fallback={<div className="text-center">Loading contact...</div>}>
                        <ContactSection />
                    </Suspense>
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
            <Suspense fallback={null}>
                <EmailModal
                    isOpen={isModalOpen}
                    isLoading={isLoading}
                    emailDraft={emailDraft}
                    jobRole={jobRole}
                    setJobRole={setJobRole}
                    onGenerate={generateEmailDraft}
                    onClose={() => setIsModalOpen(false)}
                    modalRef={emailModalRef}
                />
            </Suspense>
        </div>
    );
};
