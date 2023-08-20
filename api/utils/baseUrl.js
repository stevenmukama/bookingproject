export const baseUrl = () =>
	process.env.BASE_URL
		? process.env.BASE_URL
		: process.NODE_ENV !== 'production'
		? 'http://localhost:3000'
		: 'https://yourdomain.com';
