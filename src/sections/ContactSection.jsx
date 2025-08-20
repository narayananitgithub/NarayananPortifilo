import React from 'react';
import { Mail } from 'lucide-react';

export default function ContactSection() {
	return (
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
} 