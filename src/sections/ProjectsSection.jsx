import React from 'react';
import { Apple } from 'lucide-react';

export default function ProjectsSection({ projects }) {
	return (
		<section id="projects" className="bg-[#141414] rounded-lg shadow-xl p-8 fade-in">
			<h2 className="text-2xl font-bold border-l-4 border-red-600 pl-4 mb-8">Projects</h2>
			<div className="space-y-8">
				{projects.map((proj, index) => (
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
} 