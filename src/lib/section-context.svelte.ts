import { writable } from 'svelte/store';
import { setContext, getContext, onMount } from 'svelte';
import { afterNavigate } from '$app/navigation';
import { NAV_HEIGHT_PX } from '$lib/constants';

const SECTION_CONTEXT_KEY = 'active-section';

export const navItems = [
	{ href: '/#about', label: 'About', id: 'about' },
	{ href: '/#experience', label: 'Experience', id: 'experience' },
	{ href: '/#projects', label: 'Projects', id: 'projects' },
	{ href: '/#blogs', label: 'Blogs', id: 'blogs' }
];

export interface SectionStore {
	activeSection: ReturnType<typeof writable<string>>;
	navItems: typeof navItems;
}

export function createSectionContext() {
	const activeSection = writable('');
	const store: SectionStore = {
		activeSection,
		navItems
	};
	setContext(SECTION_CONTEXT_KEY, store);
	return store;
}

export function getSectionContext(): SectionStore {
	return getContext<SectionStore>(SECTION_CONTEXT_KEY);
}

export function useSectionObserver(store: SectionStore) {
	let setup = () => {};
	afterNavigate(() => setup());

	onMount(() => {
		let cleanup = () => {};

		setup = () => {
			cleanup();

			if (window.location.pathname !== '/') {
				store.activeSection.set('');
				cleanup = () => {};
				return;
			}

			const sections = navItems
				.map((item) => document.getElementById(item.id))
				.filter(Boolean) as HTMLElement[];

			if (sections.length === 0) return;

			let currentSection = '';

			function updateActiveSection() {
				let bestSection = '';
				let bestDistance = Infinity;

				for (const section of sections) {
					const rect = section.getBoundingClientRect();
					const navOffset = NAV_HEIGHT_PX;
					const effectiveTop = rect.top - navOffset;

					if (effectiveTop <= window.innerHeight / 2) {
						const distance = Math.abs(effectiveTop);
						if (effectiveTop <= 0 && distance < bestDistance) {
							bestDistance = distance;
							bestSection = section.id;
						} else if (bestSection === '' && effectiveTop > 0) {
							bestSection = section.id;
							bestDistance = effectiveTop;
						}
					}
				}

				if (!bestSection) {
					let closestDistance = Infinity;
					for (const section of sections) {
						const rect = section.getBoundingClientRect();
						const distance = Math.abs(rect.top);
						if (distance < closestDistance) {
							closestDistance = distance;
							bestSection = section.id;
						}
					}
				}

				if (bestSection && currentSection !== bestSection) {
					currentSection = bestSection;
					store.activeSection.set(bestSection);
				}
			}

			const observer = new IntersectionObserver(
				() => {
					updateActiveSection();
				},
				{
					rootMargin: `-${NAV_HEIGHT_PX}px 0px -40% 0px`,
					threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5]
				}
			);

			sections.forEach((section) => observer.observe(section));

			let ticking = false;
			const handleScroll = () => {
				if (!ticking) {
					requestAnimationFrame(() => {
						updateActiveSection();
						ticking = false;
					});
					ticking = true;
				}
			};

			window.addEventListener('scroll', handleScroll, { passive: true });
			setTimeout(updateActiveSection, 100);

			cleanup = () => {
				observer.disconnect();
				window.removeEventListener('scroll', handleScroll);
			};
		};

		setup();

		return () => {
			cleanup();
			setup = () => {};
		};
	});
}
