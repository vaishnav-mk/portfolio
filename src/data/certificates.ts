export interface Certificate {
[x: string]: string
  organization: string
  issued: string
  title: string
  id?: string
  link: string
}

export const CertificateData: Certificate[] = [
  {
    organization: 'Udemy',
    issued: '2022-12-26',
    title: 'Deep Learning: Hands-On Artificial Neural Networks',
    id: 'UC-937915f8-3701-4b17-a0cd-f254f5b127f6',
    link: 'https://www.udemy.com/certificate/UC-937915f8-3701-4b17-a0cd-f254f5b127f6',
  },
  {
    organization: 'Udemy',
    issued: '2022-12-26',
    title: 'Docker Mastery: with Kubernetes +Swarm',
    id: 'UC-db24d4b0-01e3-4f33-8d31-39f2b4749392',
    link: 'https://www.udemy.com/certificate/UC-db24d4b0-01e3-4f33-8d31-39f2b4749392',
  },
]
