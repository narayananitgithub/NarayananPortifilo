import React from 'react';

export default function ExperienceSection({ experience }) {
	return (
		<section id="experience" className="bg-[#141414] rounded-lg shadow-xl p-8 fade-in">
			<h2 className="text-2xl font-bold border-l-4 border-red-600 pl-4 mb-8">Experience</h2>
			<div className="space-y-8">
				{experience.map((exp, index) => (
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
} 