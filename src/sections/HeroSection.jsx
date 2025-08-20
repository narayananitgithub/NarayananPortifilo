import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';

export default function HeroSection() {
	return (
		<header className="text-center pt-16 pb-12 fade-in bg-gradient-to-br from-gray-900 via-black to-gray-800 relative z-0 rounded-xl">
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
} 