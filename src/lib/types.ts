export interface Portfolio {
	portfolio: {
		name: string;
		title: string;
		description: string;
		email: string;
		brand: string;
		brandSecondary: string;
		nickname: string;
	};
	projects: Project[];
	experiences: Experience[];
	sections: Section[];
	socialLinks: SocialLink[];
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
	source: string;
	visit?: string;
}

export interface Experience {
	company: string;
	companyDescription: string;
	companyLink: string;
	title: string;
	location: string;
	date: string;
	highlights: string[];
}

export interface Section {
	key: string;
	label: string;
}

export interface SocialLink {
	href: string;
	label: string;
}
