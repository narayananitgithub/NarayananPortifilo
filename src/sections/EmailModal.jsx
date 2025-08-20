import React from 'react';

export default function EmailModal({ isOpen, isLoading, emailDraft, jobRole, setJobRole, onGenerate, onClose, modalRef }) {
	return (
		<div id="email-modal"
			className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
			<div className="absolute inset-0 bg-black/85 backdrop-blur-lg"></div>
			<div ref={modalRef} className="relative bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-lg mx-4 text-gray-300">
				<button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
				<h3 className="text-2xl font-bold text-red-500 mb-4">Generate Personalized Email Draft</h3>
				<p className="text-gray-400 mb-6">Enter a job title or role, and I'll generate an email draft highlighting your fit for the position based on your portfolio data.</p>
				<input
					type="text"
					id="job-role-input"
					value={jobRole}
					onChange={(e) => setJobRole(e.target.value)}
					placeholder="e.g., Senior iOS Developer, Mobile Engineer"
					className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-red-600 transition-shadow"
				/>
				<button
					onClick={onGenerate}
					disabled={isLoading}
					className="w-full px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{isLoading ? 'Generating...' : 'Generate Draft'}
				</button>

				<div id="loading-spinner" className={`mt-6 flex justify-center ${isLoading ? '' : 'hidden'}`}>
					<div className="spinner h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
					<span className="ml-2 text-white">Generating...</span>
				</div>

				{emailDraft && (
					<div id="email-output" className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700 whitespace-pre-wrap text-gray-300">
						<h4 className="font-semibold text-red-400 mb-2">Your Draft:</h4>
						<pre className="text-sm whitespace-pre-wrap">{emailDraft}</pre>
					</div>
				)}
			</div>
		</div>
	);
} 