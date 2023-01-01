export interface Certificate {
[x: string]: string
  organization: string
  issued: string
  title: string
  link: string
}

export const CertificateData: Certificate[] = [
  {
    organization: 'Udemy',
    issued: '2022-12-26',
    title: 'Deep Learning: Hands-On Artificial Neural Networks',
    link: 'https://www.udemy.com/certificate/UC-937915f8-3701-4b17-a0cd-f254f5b127f6',
  },
  {
    organization: 'Udemy',
    issued: '2022-12-26',
    title: 'Docker Mastery: with Kubernetes +Swarm',
    link: 'https://www.udemy.com/certificate/UC-db24d4b0-01e3-4f33-8d31-39f2b4749392',
  },
  {
    organization: 'Udemy',
    issued: '2023-01-01',
    title: 'Fundamentals of Networking',
    link: 'https://www.udemy.com/certificate/UC-04fb0c69-5cab-4085-b3f5-4de9067a2291/'
  }
]
