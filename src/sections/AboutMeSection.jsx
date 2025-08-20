import React from 'react';

export default function AboutMeSection({ summary, onOpenModal }) {
	return (
		<section id="summary" className="bg-[#141414] rounded-lg shadow-xl p-8 fade-in">
			<h2 className="text-2xl font-bold border-l-4 border-red-600 pl-4 mb-8">About Me</h2>
			<p className="leading-relaxed text-gray-400">{summary}</p>
			<div className="mt-8 flex justify-center">
				<button
					onClick={onOpenModal}
					className="px-8 py-3 bg-red-600 text-white font-semibold rounded-full shadow-lg hover:bg-red-500 transition-colors">
					Generate an Email Draft
				</button>
			</div>
		</section>
	);
} 