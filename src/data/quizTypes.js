/**
 * @author Vedansh
 * @description Quiz types data with their display names, icons, and IDs
 * This centralized data is used across the application
 */

const quizTypes = [
	{
		id: 'default',
		title: 'Computer Science (20 Questions)',
		display: 'Computer Science',
		icon:
			'https://cdn.jsdelivr.net/gh/offensive-vk/reactjs-quiz-app@master/public/internet.svg',
	},
	{
		id: 'webdev',
		title: 'Web Development',
		display: 'Web Development',
		icon:
			'https://cdn.jsdelivr.net/gh/offensive-vk/Icons@master/html5/html5-original.svg',
	},
	{
		id: 'javascript',
		title: 'JavaScript',
		display: 'JavaScript',
		icon:
			'https://cdn.jsdelivr.net/gh/offensive-vk/Icons@master/javascript/javascript-original.svg',
	},
	{
		id: 'tailwindcss',
		title: 'Tailwind CSS',
		display: 'Tailwind CSS',
		icon:
			'https://cdn.jsdelivr.net/gh/offensive-vk/Icons@master/tailwindcss/tailwindcss-original.svg',
	},
	{
		id: 'python',
		title: 'Python',
		display: 'Python',
		icon:
			'https://cdn.jsdelivr.net/gh/offensive-vk/Icons@master/python/python-original.svg',
	},
	{
		id: 'typescript',
		title: 'TypeScript',
		display: 'TypeScript',
		icon:
			'https://cdn.jsdelivr.net/gh/offensive-vk/Icons@master/typescript/typescript-plain.svg',
	},
	{
		id: 'docker',
		title: 'Docker',
		display: 'Docker',
		icon:
			'https://cdn.jsdelivr.net/gh/offensive-vk/Icons@master/docker/docker-original.svg',
	},
	{
		id: 'react',
		title: 'React',
		display: 'React',
		icon:
			'https://cdn.jsdelivr.net/gh/offensive-vk/Icons@master/react/react-original.svg',
	},
	{
		id: 'angular',
		title: 'Angular',
		display: 'Angular',
		icon:
			'https://cdn.jsdelivr.net/gh/offensive-vk/Icons@master/angular/angular-original.svg',
	},
	{
		id: 'svelte',
		title: 'Svelte',
		display: 'Svelte',
		icon:
			'https://cdn.jsdelivr.net/gh/offensive-vk/Icons@master/svelte/svelte-original.svg',
	},
	{
		id: 'vuejs',
		title: 'Vue.js',
		display: 'Vue.js',
		icon:
			'https://cdn.jsdelivr.net/gh/offensive-vk/Icons@master/vuejs/vuejs-original.svg',
	},
	{
		id: 'astro',
		title: 'Astro',
		display: 'Astro',
		icon:
			'https://cdn.jsdelivr.net/gh/offensive-vk/Icons@master/astro/astro-original.svg',
	},
	{
		id: 'nextjs',
		title: 'Next.js',
		display: 'Next.js',
		icon:
			'https://cdn.jsdelivr.net/gh/offensive-vk/Icons@master/nextjs/nextjs-original.svg',
	},
]

/**
 * Helper function to get quiz type info by ID
 * @param {string} id - The quiz type ID
 * @returns {Object} Quiz type object or default if not found
 */
export const getQuizTypeById = (id) => {
	const quizType = quizTypes.find((type) => type.id === id)
	return quizType || {
		id: 'default',
		title: 'Default Quiz',
		display: 'Default',
		icon: 'https://cdn.jsdelivr.net/gh/offensive-vk/reactjs-quiz-app@master/public/internet.svg',
	}
}

/**
 * Get all quiz types
 * @returns {Array} Array of quiz type objects
 */
export const getAllQuizTypes = () => {
	return quizTypes
}

export default quizTypes;
