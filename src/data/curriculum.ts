import type { Domain, Module, Topic } from '../types';
import { cloudConceptsTopics } from './lessons/cloudConcepts';
import { azureArchitectureTopics } from './lessons/azureArchitecture';
import { azureManagementTopics } from './lessons/azureManagement';

export const topics: Topic[] = [
  ...cloudConceptsTopics,
  ...azureArchitectureTopics,
  ...azureManagementTopics,
];

export const domains: Domain[] = [
  {
    id: 'cloud-concepts',
    title: 'Cloud Concepts',
    shortTitle: 'Cloud Concepts',
    description:
      'Understand cloud fundamentals, benefits, shared responsibility, and the different cloud service and deployment models.',
    color: 'brand',
    moduleIds: ['cc-cloud-models', 'cc-responsibility-cost'],
  },
  {
    id: 'azure-architecture',
    title: 'Azure Architecture and Services',
    shortTitle: 'Architecture & Services',
    description:
      'Explore Azure regions, availability zones, compute, containers, networking, storage, and identity services.',
    color: 'teal',
    moduleIds: ['az-regions', 'az-compute', 'az-identity'],
  },
  {
    id: 'azure-management',
    title: 'Azure Management and Governance',
    shortTitle: 'Management & Governance',
    description:
      'Learn how Azure resources are organised and governed: Resource Manager, subscriptions, Policy, cost tools, monitoring and service health.',
    color: 'amber',
    moduleIds: ['mg-organising', 'mg-governance', 'mg-cost-monitor'],
  },
];

export const modules: Module[] = [
  // ---- Cloud Concepts ----
  {
    id: 'cc-cloud-models',
    domainId: 'cloud-concepts',
    title: 'Cloud Models & Service Types',
    description: 'Public, private and hybrid clouds, plus IaaS, PaaS and SaaS.',
    topicIds: ['cloud-models', 'iaas-paas-saas', 'capex-opex'],
  },
  {
    id: 'cc-responsibility-cost',
    domainId: 'cloud-concepts',
    title: 'Responsibility & Consumption',
    description: 'Shared responsibility model and consumption-based pricing.',
    topicIds: ['shared-responsibility', 'consumption-pricing'],
  },
  // ---- Azure architecture & services ----
  {
    id: 'az-regions',
    domainId: 'azure-architecture',
    title: 'Regions & Availability',
    description: 'How Azure is physically organised worldwide.',
    topicIds: ['regions-availability-zones', 'resource-manager'],
  },
  {
    id: 'az-compute',
    domainId: 'azure-architecture',
    title: 'Compute & Containers',
    description: 'Virtual machines, app services and container options.',
    topicIds: ['compute', 'containers'],
  },
  {
    id: 'az-identity',
    domainId: 'azure-architecture',
    title: 'Identity, Networking & Storage',
    description: 'Microsoft Entra ID, networking fundamentals and storage services.',
    topicIds: ['storage', 'networking', 'entra-id'],
  },
  // ---- Management & governance ----
  {
    id: 'mg-organising',
    domainId: 'azure-management',
    title: 'Organising Resources',
    description: 'Resource Manager, resource groups, subscriptions and management groups.',
    topicIds: ['resource-groups', 'subscriptions-management-groups'],
  },
  {
    id: 'mg-governance',
    domainId: 'azure-management',
    title: 'Governance & Access',
    description: 'RBAC, Azure Policy, tags, Microsoft Entra Conditional Access and MFA.',
    topicIds: ['rbac', 'azure-policy', 'tags', 'conditional-access'],
  },
  {
    id: 'mg-cost-monitor',
    domainId: 'azure-management',
    title: 'Cost, Monitoring & Tools',
    description: 'Cost management, Azure Advisor, Azure Monitor, Service Health and pricing tools.',
    topicIds: ['cost-management', 'azure-advisor', 'azure-monitor', 'service-health', 'cli-cloud-shell'],
  },
];
