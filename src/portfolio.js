import React, { useState, useEffect, useRef } from 'react';

// Custom Hook for detecting when an element is on screen
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

// AnimatedSection Component: Wraps sections to apply fade-in animation
const AnimatedSection = ({ children, className }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
    return (
        <section
            ref={ref}
            className={`transition-opacity duration-1000 ease-in ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-5'} ${className}`}
        >
            {children}
        </section>
    );
};

// Header Component
const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = ["About", "Experience", "Projects", "Contact"];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/50 backdrop-blur-lg' : 'bg-transparent'}`}>
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#hero" className="text-2xl font-bold text-gray-100">PK.</a>
                <div className="hidden md:flex space-x-8 text-lg">
                    {navLinks.map(link => (
                        <a key={link} href={`#${link.toLowerCase()}`} className="text-gray-300 hover:text-white transition duration-300">
                            {link}
                        </a>
                    ))}
                </div>
            </nav>
        </header>
    );
};

// Hero Component
const Hero = () => (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center bg-black">
         <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{backgroundImage: "url('https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"}}></div>
        <div className="relative z-10">
            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight">Pravin Kumar</h1>
            <h2 className="text-4xl md:text-6xl font-medium text-gray-300 mt-4">iOS Developer</h2>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-400">
                Building scalable, user-centric mobile applications with a focus on clean architecture and intuitive UI/UX design.
            </p>
            <div className="mt-10 flex justify-center gap-4">
                <a href="https://github.com/pravinpkme" target="_blank" rel="noopener noreferrer" className="px-8 py-3 text-lg font-semibold text-black bg-white rounded-full hover:bg-gray-200 transition duration-300">
                    GitHub
                </a>
                <a href="https://www.linkedin.com/in/pravin-kuma-r" target="_blank" rel="noopener noreferrer" className="px-8 py-3 text-lg font-semibold text-white bg-gray-800/50 border border-gray-700 rounded-full hover:bg-gray-800 transition duration-300">
                    LinkedIn
                </a>
            </div>
        </div>
    </section>
);

// About Component
const About = () => (
    <AnimatedSection id="about" className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">About Me</h2>
            <p className="mt-6 text-xl text-gray-400 leading-8">
                Hello! I'm Pravin, an iOS developer based in Bengaluru. My journey into mobile development started with a passion for creating intuitive and performant applications that solve real-world problems. With a strong foundation in Swift, UIKit, and modern iOS frameworks, I specialize in clean architecture, performance optimization, and creating delightful user experiences.
            </p>
        </div>
    </AnimatedSection>
);

// Experience Component
const Experience = () => {
    const experiences = [
        {
            role: "iOS Developer",
            company: "GDRB Technologies Pvt Ltd",
            period: "May 2024 – Present",
            description: "Developed the SCZONE Trade App from scratch, featuring bilingual support, light/dark modes, real-time notifications, and document management for the Suez Canal Economic Zone."
        },
        {
            role: "iOS Developer",
            company: "Faststream Technologies",
            period: "Nov 2022 – Dec 2023",
            description: "Managed an IoT app for remote hot-tub control and built another to connect IoT sensors to cloud services using MQTT. Resolved critical bugs and enhanced performance."
        },
        {
            role: "Junior iOS Developer",
            company: "Xperio Labs Limited",
            period: "Feb 2022 – Nov 2022",
            description: "Developed and launched smart community management apps (SPRNG Intercom, Barra On Queen) with features like door control, video/audio calling, and smart alerts."
        }
    ];

    return (
        <AnimatedSection id="experience" className="py-24 sm:py-32">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight text-center mb-16">Work Experience</h2>
                <div className="space-y-12">
                    {experiences.map((exp, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-6 p-8 bg-gray-900/50 rounded-2xl border border-gray-800">
                            <div className="md:w-1/3">
                                <h3 className="text-2xl font-semibold text-white">{exp.role}</h3>
                                <p className="text-lg text-gray-300">{exp.company}</p>
                                <p className="text-md text-gray-500 mt-1">{exp.period}</p>
                            </div>
                            <div className="md:w-2/3">
                                <p className="text-lg text-gray-400">{exp.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

// Skills Component
const Skills = () => {
    const skillCategories = {
        "Languages": ["Swift", "Objective-C", "Java", "JSON"],
        "Frameworks & Libraries": ["UIKit", "SwiftUI", "CoreLocation", "CoreBluetooth", "CoreData", "Firebase", "Alamofire"],
        "Architectures & Tools": ["MVC", "MVVM", "Xcode", "Git", "REST APIs", "Agile/Scrum"]
    };

    return (
        <AnimatedSection id="skills" className="py-24 sm:py-32">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight text-center mb-16">Technical Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {Object.entries(skillCategories).map(([category, skills]) => (
                        <div key={category}>
                            <h3 className="text-2xl font-semibold text-white mb-4">{category}</h3>
                            <div className="flex flex-wrap gap-3">
                                {skills.map(skill => (
                                    <span key={skill} className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-base">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

// Projects Component
const Projects = () => {
    const projects = [
        {
            title: "SCZONE Trade App",
            description: "Official app for the Suez Canal Economic Zone, featuring bilingual support and real-time service tracking.",
            tags: ["Swift", "UIKit", "Firebase", "Charts"],
            imageUrl: "https://placehold.co/600x400/000000/FFFFFF?text=SCZONE"
        },
        {
            title: "Control My Spa",
            description: "An IoT solution for remotely monitoring and controlling hot-tub components via Bluetooth.",
            tags: ["Swift", "CoreBluetooth", "APNS/FCM"],
            imageUrl: "https://placehold.co/600x400/000000/FFFFFF?text=IoT+Spa"
        },
        {
            title: "SPRNG Intercom",
            description: "Smart community management app with video/audio calling and amenity access control.",
            tags: ["Swift", "QuickBlox", "AVFoundation"],
            imageUrl: "https://placehold.co/600x400/000000/FFFFFF?text=Intercom"
        }
    ];

    return (
        <AnimatedSection id="projects" className="py-24 sm:py-32">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight text-center mb-16">My Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div key={index} className="bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-800 transform transition-transform duration-300 hover:-translate-y-2">
                            <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold text-white mb-2">{project.title}</h3>
                                <p className="text-gray-400 mb-4">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-sm bg-gray-800 text-gray-300 px-3 py-1 rounded-full">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

// Contact Component
const Contact = () => (
    <AnimatedSection id="contact" className="py-24 sm:py-32 text-center">
        <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Get In Touch</h2>
            <p className="mt-6 text-xl text-gray-400 leading-8">
                I'm currently open to new opportunities. My inbox is always open, whether you have a question or just want to say hi.
            </p>
            <a href="mailto:pravin.pk.me@gmail.com" className="mt-10 inline-block px-10 py-4 text-xl font-semibold text-black bg-white rounded-full hover:bg-gray-200 transition duration-300">
                Say Hello
            </a>
        </div>
    </AnimatedSection>
);

// Footer Component
const Footer = () => (
    <footer className="py-8 text-center text-gray-500">
        <p>Designed & Built by Pravin Kumar</p>
    </footer>
);


// Main App Component
export default function App() {
    return (
        <div className="bg-black text-gray-200 font-sans">
            <Header />
            <main className="container mx-auto px-6">
                <Hero />
                <About />
                <Experience />
                <Skills />
                <Projects />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}
