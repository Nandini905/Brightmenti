export interface Stat {
  label: string;
  value: string;
  isPlaceholder: boolean;
  subtext: string;
}

export const STATS: Stat[] = [
  {
    value: 'XX+',
    label: 'Systems Engineered',
    isPlaceholder: true,
    subtext: 'Across high-growth ventures, D2C, and modern enterprises'
  },
  {
    value: 'XX%',
    label: 'Manual Workflow Reduction',
    isPlaceholder: true,
    subtext: 'Through custom WhatsApp, CRM, and API automation pipelines'
  },
  {
    value: '99.99%',
    label: 'Infrastructure Reliability',
    isPlaceholder: false,
    subtext: 'Fault-tolerant edge CDN, cloud architecture, and zero-downtime deploys'
  },
  {
    value: '24/7',
    label: 'Autonomous Run-Time',
    isPlaceholder: false,
    subtext: 'Continuous data synchronization, event tracking, and customer conversion'
  }
];
