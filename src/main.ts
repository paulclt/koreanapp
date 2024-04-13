import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

const router = createRouter({
	routes: [
		{ path: '/', component: () => import('./pages/MenuView.vue') },
        { path: '/about', component: () => import('./pages/AboutView.vue') },
		{ path: '/vocabulary/:level/:unit', component: () => import('./pages/VocabularyView.vue') },
		
	],
	history: createWebHistory(import.meta.env.BASE_URL),
});

const app = createApp(App);
app.use(router)
app.mount('#app')
