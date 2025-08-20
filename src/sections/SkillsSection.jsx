import React from 'react';

export default function SkillsSection({ skillsByCategory }) {
	return (
		<section id="skills" className="bg-[#141414] rounded-lg shadow-xl p-8 fade-in">
			<h2 className="text-2xl font-bold border-l-4 border-red-600 pl-4 mb-8">Skills</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{Object.entries(skillsByCategory).map(([category, skills], index) => (
					<div key={index} className="bg-gray-900 p-6 rounded-lg shadow-inner shadow-gray-700 hover:shadow-xl transition-shadow">
						<h3 className="text-lg font-semibold text-red-500 mb-2">{category}</h3>
						<div className="flex flex-wrap gap-2">
							{skills.map((skill, skillIndex) => (
								<span key={skillIndex} className="bg-gray-800 text-gray-400 text-xs font-medium px-3 py-1 rounded-full border border-gray-700">
									{skill}
								</span>
							))}
						</div>
					</div>
				))}
			</div>
		</section>
	);
} 