export interface SocialLink {
	id: string;
	label: string;
	href: string;
	isPreferred?: boolean;
}

export interface Blog {
	title: string;
	link: string;
	pubDate: string;
	categories: string[];
	image: string | null;
}

export interface AboutItem {
	label: string;
	value: string;
	link?: { text: string; href: string };
	links?: { text: string; href: string }[];
}

export interface Portfolio {
	portfolio: {
		name: string;
		title: string;
		description: string;
		email: string;
	};
	projects: Project[];
	experiences: Experience[];
	socialLinks: SocialLink[];
	resumeLink: string;
	about: AboutItem[];
	currentWork: {
		position: string;
		company: string;
		companyLink: string;
	};
	byline: string;
	easterEgg: string;
}

export interface Project {
	title: string;
	description: string;
	tech: string;
	source?: string;
	visit?: string;
}

export interface Experience {
	company: string;
	companyDescription: string;
	companyLink: string;
	title: string;
	location: string;
	date: string;
	highlights: Array<string | { text: string; link: { text: string; href: string } }>;
}
