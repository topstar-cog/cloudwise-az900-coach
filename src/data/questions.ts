import type { Question } from '../types';
import { additionalQuestions } from './additionalQuestions';

// Main curated question set. The additional scenario bank is appended below.
// Questions are original and written against the public AZ-900 skills outline.

export const questions: Question[] = [
  // ---------------- Cloud Concepts ----------------
  {
    id: 'q-cc-01',
    domainId: 'cloud-concepts',
    topicId: 'cloud-models',
    type: 'single',
    difficulty: 'beginner',
    prompt: 'A company wants to run a sensitive payroll system on dedicated hardware that only it uses, while using shared public cloud infrastructure for its public website. Which deployment model is this?',
    options: [
      'Public cloud only',
      'Private cloud only',
      'Hybrid cloud',
      'Multi-cloud',
    ],
    correct: [2],
    explanation:
      'A hybrid cloud combines a public cloud (shared infrastructure for the website) with a private cloud (dedicated hardware for the payroll system), allowing data and workloads to move between them.',
    distractorAnalysis: [
      { index: 0, reason: 'Public cloud only would not give dedicated hardware for the payroll system.' },
      { index: 1, reason: 'Private cloud only would not use shared public cloud infrastructure for the website.' },
      { index: 3, reason: 'Multi-cloud means using several public cloud providers, not combining public and private.' },
    ],
  },
  {
    id: 'q-cc-02',
    domainId: 'cloud-concepts',
    topicId: 'cloud-models',
    type: 'single',
    difficulty: 'beginner',
    prompt: 'Which phrase best describes a public cloud?',
    options: [
      'Dedicated hardware owned by one organisation',
      'Multi-tenant infrastructure shared by many customers over the internet',
      'A combination of on-premises and cloud resources',
      'A single server running in a company office',
    ],
    correct: [1],
    explanation:
      'A public cloud is multi-tenant: the provider owns the infrastructure and shares it across many customers, who access it over the internet and pay for what they use.',
    distractorAnalysis: [
      { index: 0, reason: 'Dedicated hardware owned by one organisation describes a private cloud.' },
      { index: 2, reason: 'Combining on-premises and cloud describes a hybrid cloud.' },
      { index: 3, reason: 'A single server in an office is just on-premises hardware, not a public cloud.' },
    ],
  },
  {
    id: 'q-cc-03',
    domainId: 'cloud-concepts',
    topicId: 'iaas-paas-saas',
    type: 'single',
    difficulty: 'beginner',
    prompt: 'A developer wants to publish a web application and does not want to patch the operating system or manage the runtime. Which cloud service model fits best?',
    options: ['IaaS', 'PaaS', 'SaaS', 'On-premises'],
    correct: [1],
    explanation:
      'PaaS provides a managed platform where the provider handles the operating system, runtime and patching, so the developer only manages the application and data.',
    distractorAnalysis: [
      { index: 0, reason: 'IaaS requires the customer to manage and patch the operating system.' },
      { index: 2, reason: 'SaaS is finished software for end users, not a platform for building apps.' },
      { index: 3, reason: 'On-premises means managing everything yourself, including hardware.' },
    ],
  },
  {
    id: 'q-cc-04',
    domainId: 'cloud-concepts',
    topicId: 'iaas-paas-saas',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'Which task is always the customer\u2019s responsibility in an IaaS deployment, but is handled by the provider in PaaS?',
    options: [
      'Physical data centre security',
      'Operating system patching',
      'Maintaining the host hardware',
      'Powering the data centre',
    ],
    correct: [1],
    explanation:
      'In IaaS the customer manages and patches the operating system; in PaaS the provider handles OS patching as part of the managed platform.',
    distractorAnalysis: [
      { index: 0, reason: 'Physical security is always the provider\u2019s responsibility.' },
      { index: 2, reason: 'Host hardware is always the provider\u2019s responsibility.' },
      { index: 3, reason: 'Data centre power is always the provider\u2019s responsibility.' },
    ],
  },
  {
    id: 'q-cc-05',
    domainId: 'cloud-concepts',
    topicId: 'iaas-paas-saas',
    type: 'single',
    difficulty: 'beginner',
    prompt: 'Microsoft 365 email is an example of which cloud service model?',
    options: ['IaaS', 'PaaS', 'SaaS', 'FaaS'],
    correct: [2],
    explanation:
      'Microsoft 365 is ready-to-use software delivered over the internet and fully managed by Microsoft, which is Software as a Service (SaaS).',
    distractorAnalysis: [
      { index: 0, reason: 'IaaS gives virtual machines, not finished software.' },
      { index: 1, reason: 'PaaS is a platform for building apps, not finished software for end users.' },
      { index: 3, reason: 'FaaS (Functions) is serverless code execution, not ready-to-use email.' },
    ],
  },
  {
    id: 'q-cc-06',
    domainId: 'cloud-concepts',
    topicId: 'capex-opex',
    type: 'single',
    difficulty: 'beginner',
    prompt: 'A company pays for Azure virtual machines on a monthly basis based on actual usage and can stop them at any time. What type of expenditure is this?',
    options: ['CapEx', 'OpEx', 'Depreciation', 'Amortisation'],
    correct: [1],
    explanation:
      'Paying for what you use on an ongoing basis, with the ability to start and stop at will, is operational expenditure (OpEx).',
    distractorAnalysis: [
      { index: 0, reason: 'CapEx is upfront spending on physical assets you own.' },
      { index: 2, reason: 'Depreciation is spreading the cost of a physical asset over time, not a billing model.' },
      { index: 3, reason: 'Amortisation is an accounting concept for intangible assets, not cloud billing.' },
    ],
  },
  {
    id: 'q-cc-07',
    domainId: 'cloud-concepts',
    topicId: 'capex-opex',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'Scenario: A startup has unpredictable traffic and limited budget. Which combination best fits their needs?',
    options: [
      'Buy 20 servers up front and depreciate them over 5 years',
      'Use pay-as-you-go cloud virtual machines and scale up and down with demand',
      'Sign a 3-year contract for fixed servers regardless of usage',
      'Buy their own data centre',
    ],
    correct: [1],
    explanation:
      'For unpredictable traffic and limited budget, OpEx with pay-as-you-go cloud resources and elastic scaling matches spend to demand and avoids large upfront cost.',
    distractorAnalysis: [
      { index: 0, reason: 'Buying servers up front is CapEx and locks in cost regardless of usage.' },
      { index: 2, reason: 'A fixed contract for servers ignores demand variation and wastes money at low usage.' },
      { index: 3, reason: 'Buying a data centre is huge CapEx, the opposite of what a budget-limited startup needs.' },
    ],
  },
  {
    id: 'q-cc-08',
    domainId: 'cloud-concepts',
    topicId: 'shared-responsibility',
    type: 'single',
    difficulty: 'beginner',
    prompt: 'In the shared responsibility model, which of the following is always the customer\u2019s responsibility, even in SaaS?',
    options: [
      'Physical security of the data centre',
      'The data and user identities',
      'Patching the virtualisation layer',
      'Maintaining host hardware',
    ],
    correct: [1],
    explanation:
      'Customers are always responsible for the security of their data and identities, regardless of the service model.',
    distractorAnalysis: [
      { index: 0, reason: 'Physical security is always the provider\u2019s responsibility.' },
      { index: 2, reason: 'The virtualisation layer is always the provider\u2019s responsibility.' },
      { index: 3, reason: 'Host hardware is always the provider\u2019s responsibility.' },
    ],
  },
  {
    id: 'q-cc-09',
    domainId: 'cloud-concepts',
    topicId: 'shared-responsibility',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'Which task is the cloud provider responsible for in the shared responsibility model?',
    options: [
      'Securing the physical data centre',
      'Choosing passwords for customer users',
      'Configuring encryption for customer data',
      'Managing customer user accounts',
    ],
    correct: [0],
    explanation:
      'The provider secures the physical data centre and underlying cloud infrastructure. Customers remain responsible for their data, identities, and many configuration choices.',
    distractorAnalysis: [
      { index: 1, reason: 'Customers manage the identities and passwords of their own users.' },
      { index: 2, reason: 'Customers configure how their data is protected in the services they use.' },
      { index: 3, reason: 'Customers manage access to their own user accounts.' },
    ],
  },
  {
    id: 'q-cc-10',
    domainId: 'cloud-concepts',
    topicId: 'consumption-pricing',
    type: 'single',
    difficulty: 'beginner',
    prompt: 'A team runs a build job for 45 minutes on a cloud virtual machine and then deletes the VM. How are they billed under consumption-based pricing?',
    options: [
      'A fixed monthly fee regardless of use',
      'For the 45 minutes of compute actually used',
      'For the entire month',
      'No charge because the job was short',
    ],
    correct: [1],
    explanation:
      'Consumption-based pricing bills only for the actual resource time used — here, 45 minutes of compute.',
    distractorAnalysis: [
      { index: 0, reason: 'A fixed monthly fee is not consumption-based; it is a flat-rate model.' },
      { index: 2, reason: 'Billing for the whole month would not reflect actual usage.' },
      { index: 3, reason: 'Short jobs are still billed for the time used; "short" does not mean free.' },
    ],
  },
  {
    id: 'q-cc-11',
    domainId: 'cloud-concepts',
    topicId: 'consumption-pricing',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'Which benefit is most directly enabled by consumption-based pricing?',
    options: [
      'Higher upfront hardware costs',
      'Elasticity — scaling spend up and down with demand',
      'Longer depreciation schedules',
      'Fixed annual billing',
    ],
    correct: [1],
    explanation:
      'Because you pay only for what you use, you can scale resources (and spend) up and down with demand — this is elasticity.',
    distractorAnalysis: [
      { index: 0, reason: 'Consumption pricing reduces, not increases, upfront hardware costs.' },
      { index: 2, reason: 'Depreciation schedules apply to owned assets (CapEx), not consumption pricing.' },
      { index: 3, reason: 'Fixed annual billing is the opposite of consumption-based pricing.' },
    ],
  },

  // ---------------- Azure Architecture & Services ----------------
  {
    id: 'q-az-01',
    domainId: 'azure-architecture',
    topicId: 'regions-availability-zones',
    type: 'single',
    difficulty: 'beginner',
    prompt: 'What is an Azure availability zone?',
    options: [
      'A pair of regions in different countries',
      'A separate physical location within a region with independent power, cooling and network',
      'A single virtual machine',
      'A billing boundary for a subscription',
    ],
    correct: [1],
    explanation:
      'An availability zone is a distinct physical data centre within a region, with its own power, cooling and networking, so a single-zone failure does not affect the others.',
    distractorAnalysis: [
      { index: 0, reason: 'A pair of regions is a region pair, not an availability zone.' },
      { index: 2, reason: 'A single VM is a resource, not a zone.' },
      { index: 3, reason: 'A billing boundary is a subscription, not an availability zone.' },
    ],
  },
  {
    id: 'q-az-02',
    domainId: 'azure-architecture',
    topicId: 'regions-availability-zones',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'A bank wants to protect its app from a data centre failure within a single Azure region. What should it do?',
    options: [
      'Deploy all VMs in one availability zone',
      'Spread VMs across two or more availability zones in the same region',
      'Use a single region pair only',
      'Disable replication',
    ],
    correct: [1],
    explanation:
      'Spreading VMs across multiple availability zones within a region protects against a single data-centre failure, because each zone has independent power, cooling and network.',
    distractorAnalysis: [
      { index: 0, reason: 'Putting all VMs in one zone means a single-zone failure takes everything down.' },
      { index: 2, reason: 'A region pair helps with full-region disaster recovery, not single-data-centre failure within a region.' },
      { index: 3, reason: 'Disabling replication reduces resilience, it does not improve it.' },
    ],
  },
  {
    id: 'q-az-03',
    domainId: 'azure-architecture',
    topicId: 'regions-availability-zones',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'Why does Azure pair regions?',
    options: [
      'To reduce customer bills',
      'To provide replication and disaster recovery across regions',
      'To merge them into one larger region',
      'To share physical power supplies between them',
    ],
    correct: [1],
    explanation:
      'Region pairs are two regions paired for replication and disaster recovery, so services can fail over to the paired region if one region has a major outage.',
    distractorAnalysis: [
      { index: 0, reason: 'Region pairing does not affect billing.' },
      { index: 2, reason: 'Paired regions remain separate; they are not merged.' },
      { index: 3, reason: 'Paired regions are geographically separated and do not share power.' },
    ],
  },
  {
    id: 'q-az-04',
    domainId: 'azure-architecture',
    topicId: 'resource-manager',
    type: 'single',
    difficulty: 'beginner',
    prompt: 'Which statement about Azure Resource Manager (ARM) is correct?',
    options: [
      'ARM only works through the Azure portal.',
      'ARM is the deployment and management layer that handles all resource requests, regardless of which tool is used.',
      'ARM is a type of virtual machine.',
      'ARM replaces the need for resource groups.',
    ],
    correct: [1],
    explanation:
      'ARM is the central management layer; the portal, CLI, PowerShell and REST APIs all send their requests through ARM.',
    distractorAnalysis: [
      { index: 0, reason: 'ARM works through every tool, not just the portal.' },
      { index: 2, reason: 'ARM is not a virtual machine; it is the management layer.' },
      { index: 3, reason: 'ARM relies on resource groups; it does not replace them.' },
    ],
  },
  {
    id: 'q-az-05',
    domainId: 'azure-architecture',
    topicId: 'resource-manager',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'A team wants to repeatedly deploy 10 resources in a consistent way with version control. What is the best approach?',
    options: [
      'Click through the portal manually each time',
      'Use an ARM template (infrastructure as code) to declaratively define the resources',
      'Write a script that issues imperative CLI commands one at a time',
      'Email the resource list to Azure support',
    ],
    correct: [1],
    explanation:
      'ARM templates are declarative infrastructure-as-code files that deploy a set of resources consistently and can be version controlled.',
    distractorAnalysis: [
      { index: 0, reason: 'Manual portal clicks are error-prone and not repeatable or version-controlled.' },
      { index: 2, reason: 'Imperative scripts are step-by-step and less robust than declarative templates for this goal.' },
      { index: 3, reason: 'Azure support does not deploy resources from emailed lists.' },
    ],
  },
  {
    id: 'q-az-06',
    domainId: 'azure-architecture',
    topicId: 'compute',
    type: 'single',
    difficulty: 'beginner',
    prompt: 'A team needs full control over the operating system and installed software for a workload. Which Azure compute option fits best?',
    options: ['Azure Virtual Machines', 'Azure App Service', 'Azure Functions', 'Azure Container Apps'],
    correct: [0],
    explanation:
      'Azure Virtual Machines give full control over the OS and software stack, which is the IaaS model.',
    distractorAnalysis: [
      { index: 1, reason: 'App Service is PaaS — the provider manages the OS, so you do not have full control.' },
      { index: 2, reason: 'Functions is serverless — no OS access at all.' },
      { index: 3, reason: 'Container Apps runs containers; you do not manage the underlying OS.' },
    ],
  },
  {
    id: 'q-az-07',
    domainId: 'azure-architecture',
    topicId: 'compute',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'A team wants to run a small function only when a new file is uploaded, and pay only for the execution time. Which service fits best?',
    options: ['Azure Virtual Machines', 'Azure App Service', 'Azure Functions', 'Azure Kubernetes Service'],
    correct: [2],
    explanation:
      'Azure Functions is event-driven serverless compute, billed per execution — ideal for occasional, trigger-based work.',
    distractorAnalysis: [
      { index: 0, reason: 'A VM runs continuously and would cost money while idle.' },
      { index: 1, reason: 'App Service runs continuously hosting an app, not triggered functions.' },
      { index: 3, reason: 'AKS orchestrates containers at scale, not single triggered functions.' },
    ],
  },
  {
    id: 'q-az-08',
    domainId: 'azure-architecture',
    topicId: 'containers',
    type: 'single',
    difficulty: 'beginner',
    prompt: 'What is the main advantage of a container compared to a virtual machine?',
    options: [
      'It includes a full operating system',
      'It is lightweight and starts quickly because it shares the host OS',
      'It cannot run on a laptop',
      'It requires more memory than a VM',
    ],
    correct: [1],
    explanation:
      'Containers share the host OS, so they are lightweight and start in seconds compared to VMs, which each run a full OS.',
    distractorAnalysis: [
      { index: 0, reason: 'Containers do NOT include a full OS — that is a feature of VMs.' },
      { index: 2, reason: 'Containers can run on a laptop as well as in the cloud.' },
      { index: 3, reason: 'Containers generally use less memory than VMs.' },
    ],
  },
  {
    id: 'q-az-09',
    domainId: 'azure-architecture',
    topicId: 'containers',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'You need to run many containers at scale, schedule them across nodes and manage rollouts. Which Azure service is designed for this?',
    options: ['Azure Container Instances', 'Azure Kubernetes Service (AKS)', 'Azure Blob Storage', 'Azure App Service'],
    correct: [1],
    explanation:
      'AKS is a managed Kubernetes service for orchestrating many containers at scale, including scheduling, scaling and rollouts.',
    distractorAnalysis: [
      { index: 0, reason: 'ACI runs a single container with no orchestration.' },
      { index: 2, reason: 'Blob Storage is object storage, not a container runtime.' },
      { index: 3, reason: 'App Service hosts web apps; it is not a container orchestrator.' },
    ],
  },
  {
    id: 'q-az-10',
    domainId: 'azure-architecture',
    topicId: 'storage',
    type: 'single',
    difficulty: 'beginner',
    prompt: 'You need to store years of CCTV footage that is almost never accessed but must be kept for compliance. Which Azure Blob access tier is most cost-effective?',
    options: ['Hot', 'Cool', 'Archive', 'Premium'],
    correct: [2],
    explanation:
      'The Archive tier has the lowest storage cost for rarely accessed data, accepting slower retrieval (hours).',
    distractorAnalysis: [
      { index: 0, reason: 'Hot is for frequently accessed data and costs more per GB.' },
      { index: 1, reason: 'Cool is for infrequent access but still costs more than Archive.' },
      { index: 3, reason: 'Premium is high-performance storage, the opposite of what long-term archive needs.' },
    ],
  },
  {
    id: 'q-az-11',
    domainId: 'azure-architecture',
    topicId: 'storage',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'A legacy application expects a shared file drive accessible via the SMB protocol. Which Azure service should you use?',
    options: ['Azure Blob Storage', 'Azure Files', 'Azure Table Storage', 'Azure Disk Storage'],
    correct: [1],
    explanation:
      'Azure Files provides managed cloud file shares accessible via the SMB protocol, matching the legacy app\u2019s expectation.',
    distractorAnalysis: [
      { index: 0, reason: 'Blob Storage is object storage accessed by URL, not an SMB share.' },
      { index: 2, reason: 'Table Storage is a NoSQL key/value store, not a file share.' },
      { index: 3, reason: 'Disk Storage is block storage for VMs, not a shared SMB drive.' },
    ],
  },
  {
    id: 'q-az-12',
    domainId: 'azure-architecture',
    topicId: 'networking',
    type: 'single',
    difficulty: 'beginner',
    prompt: 'You want a private, dedicated connection from your office to Azure, with predictable bandwidth and no public internet routing. Which option fits?',
    options: ['Azure DNS', 'A public IP address', 'ExpressRoute', 'Azure Blob Storage'],
    correct: [2],
    explanation:
      'ExpressRoute provides a private, dedicated connection to Azure that does not travel over the public internet.',
    distractorAnalysis: [
      { index: 0, reason: 'Azure DNS hosts DNS records; it does not provide private connectivity.' },
      { index: 1, reason: 'A public IP exposes a resource to the internet, the opposite of a private connection.' },
      { index: 3, reason: 'Blob Storage is object storage, not a connectivity service.' },
    ],
  },
  {
    id: 'q-az-13',
    domainId: 'azure-architecture',
    topicId: 'networking',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'You want to segment resources in a VNet so web servers and databases have separate IP ranges. What should you use?',
    options: ['Subnets', 'Public IPs', 'Azure DNS', 'Availability zones'],
    correct: [0],
    explanation:
      'Subnets divide a VNet into separate IP ranges so you can segment resources like web servers and databases.',
    distractorAnalysis: [
      { index: 1, reason: 'Public IPs expose resources to the internet; they do not segment a VNet.' },
      { index: 2, reason: 'Azure DNS resolves names; it does not segment a network.' },
      { index: 3, reason: 'Availability zones are about physical data-centre resilience, not IP segmentation.' },
    ],
  },
  {
    id: 'q-az-14',
    domainId: 'azure-architecture',
    topicId: 'entra-id',
    type: 'single',
    difficulty: 'beginner',
    prompt: 'Which service is Microsoft\u2019s cloud-based identity and access management service, formerly called Azure Active Directory?',
    options: ['Windows Server Active Directory', 'Microsoft Entra ID', 'Azure Resource Manager', 'Azure Policy'],
    correct: [1],
    explanation:
      'Microsoft Entra ID is the cloud identity service previously known as Azure Active Directory.',
    distractorAnalysis: [
      { index: 0, reason: 'Windows Server AD is an on-premises directory service, not the cloud identity service.' },
      { index: 2, reason: 'ARM is the resource deployment layer, not an identity service.' },
      { index: 3, reason: 'Azure Policy enforces configuration rules, not identity.' },
    ],
  },
  {
    id: 'q-az-15',
    domainId: 'azure-architecture',
    topicId: 'entra-id',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'Employees sign in once with their Entra ID credentials and can open email, Teams and the Azure portal without re-entering passwords. What is this feature called?',
    options: ['Multi-factor authentication', 'Single sign-on', 'Conditional Access', 'Role-based access control'],
    correct: [1],
    explanation:
      'Single sign-on (SSO) lets a user authenticate once and access multiple applications without re-entering credentials.',
    distractorAnalysis: [
      { index: 0, reason: 'MFA adds a second factor; it is not the same as signing in once across apps.' },
      { index: 2, reason: 'Conditional Access is the policy engine; SSO is the feature that avoids repeated sign-ins.' },
      { index: 3, reason: 'RBAC controls what a signed-in user can do, not the sign-in experience itself.' },
    ],
  },

  // ---------------- Azure Management & Governance ----------------
  {
    id: 'q-mg-01',
    domainId: 'azure-management',
    topicId: 'resource-groups',
    type: 'single',
    difficulty: 'beginner',
    prompt: 'Which statement about resource groups is correct?',
    options: [
      'A resource can be in multiple resource groups at once.',
      'A resource group can contain resources from different regions.',
      'A resource group can contain only one resource.',
      'A resource group is the same as a subscription.',
    ],
    correct: [1],
    explanation:
      'A resource group is a logical container and can hold resources deployed in different regions.',
    distractorAnalysis: [
      { index: 0, reason: 'A resource can only be in one resource group at a time.' },
      { index: 2, reason: 'A resource group can contain many resources, not just one.' },
      { index: 3, reason: 'A subscription contains resource groups; they are not the same thing.' },
    ],
  },
  {
    id: 'q-mg-02',
    domainId: 'azure-management',
    topicId: 'resource-groups',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'A team is retiring an old application made of a web app, a database and a storage account, all in one resource group. What is the simplest way to remove everything?',
    options: [
      'Delete each resource one at a time',
      'Delete the resource group, which removes all resources inside it',
      'Delete the subscription',
      'Move all resources to another resource group first',
    ],
    correct: [1],
    explanation:
      'Deleting a resource group deletes all resources inside it, making cleanup of a whole solution a single action.',
    distractorAnalysis: [
      { index: 0, reason: 'Deleting one at a time is slower and risks leaving resources behind.' },
      { index: 2, reason: 'Deleting the subscription would remove unrelated resources too.' },
      { index: 3, reason: 'Moving resources first is unnecessary; just delete the group.' },
    ],
  },
  {
    id: 'q-mg-03',
    domainId: 'azure-management',
    topicId: 'subscriptions-management-groups',
    type: 'single',
    difficulty: 'beginner',
    prompt: 'Which Azure boundary is used for billing, quotas and access management, and contains resource groups?',
    options: ['Resource group', 'Subscription', 'Management group', 'Region'],
    correct: [1],
    explanation:
      'A subscription is the billing, quota and access boundary that contains resource groups.',
    distractorAnalysis: [
      { index: 0, reason: 'A resource group holds resources but is not the billing boundary.' },
      { index: 2, reason: 'A management group sits above subscriptions to govern many of them.' },
      { index: 3, reason: 'A region is a geographic set of data centres, not a billing boundary.' },
    ],
  },
  {
    id: 'q-mg-04',
    domainId: 'azure-management',
    topicId: 'subscriptions-management-groups',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'You want to apply one Azure Policy to ten different subscriptions at once. What should you use?',
    options: [
      'A resource group',
      'A management group containing those subscriptions',
      'A single subscription',
      'A resource group tag',
    ],
    correct: [1],
    explanation:
      'A management group sits above subscriptions and lets you apply policies that inherit down to all subscriptions inside it.',
    distractorAnalysis: [
      { index: 0, reason: 'A resource group holds resources; it cannot govern subscriptions.' },
      { index: 2, reason: 'A single subscription cannot apply a policy to ten other subscriptions.' },
      { index: 3, reason: 'A tag is metadata for reporting; it does not apply policies.' },
    ],
  },
  {
    id: 'q-mg-05',
    domainId: 'azure-management',
    topicId: 'rbac',
    type: 'single',
    difficulty: 'beginner',
    prompt: 'You want a user to be able to view resources but not change them. Which built-in role fits best?',
    options: ['Owner', 'Contributor', 'Reader', 'User Access Administrator'],
    correct: [2],
    explanation:
      'The Reader role allows viewing resources without any change permissions — a good example of least privilege.',
    distractorAnalysis: [
      { index: 0, reason: 'Owner can change resources and manage access — too much permission.' },
      { index: 1, reason: 'Contributor can change resources — too much permission for view-only.' },
      { index: 3, reason: 'User Access Administrator manages role assignments — not a view-only role.' },
    ],
  },
  {
    id: 'q-mg-06',
    domainId: 'azure-management',
    topicId: 'rbac',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'You assign the "Virtual Machine Contributor" role to a group at the resource group scope. Who can the group manage VMs for?',
    options: [
      'Only VMs in that resource group',
      'All VMs in the entire subscription',
      'All VMs in every subscription',
      'No VMs — the role does nothing at resource group scope',
    ],
    correct: [0],
    explanation:
      'A role assignment at resource group scope grants those permissions only within that resource group.',
    distractorAnalysis: [
      { index: 1, reason: 'Subscription-wide access would require assigning the role at subscription scope.' },
      { index: 2, reason: 'Access across subscriptions would require management-group scope.' },
      { index: 3, reason: 'Resource group is a valid scope for RBAC; the role is effective there.' },
    ],
  },
  {
    id: 'q-mg-07',
    domainId: 'azure-management',
    topicId: 'azure-policy',
    type: 'single',
    difficulty: 'beginner',
    prompt: 'Which service would you use to block creation of storage accounts in regions outside Kenya, no matter who is creating them?',
    options: ['RBAC', 'Azure Policy', 'Azure Advisor', 'Azure Monitor'],
    correct: [1],
    explanation:
      'Azure Policy can enforce allowed locations for resources and block creation of resources in non-approved regions, regardless of who is acting.',
    distractorAnalysis: [
      { index: 0, reason: 'RBAC controls who can act, not what configurations are allowed.' },
      { index: 2, reason: 'Advisor gives recommendations; it does not block resource creation.' },
      { index: 3, reason: 'Monitor collects telemetry and alerts; it does not block creation.' },
    ],
  },
  {
    id: 'q-mg-08',
    domainId: 'azure-management',
    topicId: 'azure-policy',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'What is the key difference between RBAC and Azure Policy?',
    options: [
      'RBAC controls who can act; Azure Policy controls what configurations are allowed regardless of who is acting.',
      'RBAC controls configurations; Azure Policy controls who can act.',
      'They are the same service with different names.',
      'RBAC is for billing; Azure Policy is for networking.',
    ],
    correct: [0],
    explanation:
      'RBAC is about identity and permissions (who can do what); Azure Policy is about configuration compliance (what is allowed), and they work together.',
    concept: 'Azure Policy versus Azure RBAC',
    misconceptionId: 'policy-vs-rbac',
    remedialLesson: {
      title: 'Separate access from guardrails',
      explanation:
        'RBAC answers “who can do what?” by granting a person or group permissions at a scope. Azure Policy answers “what configuration is allowed?” and evaluates resources regardless of who created them. They can apply together.',
      example:
        'A developer may have Contributor access to create a storage account, while a Policy assignment denies accounts outside approved regions.',
      examTip:
        'Look for identity, role, permission, or scope → RBAC. Look for allowed locations, required tags, or compliance → Azure Policy.',
    },
    followUpQuestion: {
      prompt:
        'A developer has permission to create storage accounts, but every account must be in East US. Which service enforces that region rule for everyone?',
      options: ['Azure RBAC', 'Azure Policy', 'Azure Advisor', 'Azure Monitor'],
      correctIndex: 1,
      explanation:
        'Azure Policy can audit or deny resource configurations such as locations. RBAC decides whether the developer can perform an action; it does not define the allowed region.',
    },
    followUpQuestions: [
      {
        prompt:
          'A developer has permission to create storage accounts, but every account must be in East US. Which service enforces that region rule for everyone?',
        options: ['Azure RBAC', 'Azure Policy', 'Azure Advisor', 'Azure Monitor'],
        correctIndex: 1,
        explanation:
          'Azure Policy can audit or deny resource configurations such as locations. RBAC decides whether the developer can perform an action; it does not define the allowed region.',
      },
      {
        prompt:
          'A new analyst should be able to view resources in one resource group but must not change them. Which service grants that access?',
        options: ['Azure RBAC', 'Azure Policy', 'Azure Advisor', 'Azure Monitor'],
        correctIndex: 0,
        explanation:
          'Azure RBAC assigns roles such as Reader to an identity at a scope. Policy sets configuration guardrails; it does not grant a person access.',
      },
      {
        prompt:
          'A company requires every new resource to include an Owner tag before deployment. Which service can enforce this rule?',
        options: ['Azure RBAC', 'Azure Policy', 'Azure Advisor', 'Azure Monitor'],
        correctIndex: 1,
        explanation:
          'Azure Policy can require tags and deny non-compliant deployments. RBAC controls who can take actions, not which configuration values are allowed.',
      },
    ],
    distractorAnalysis: [
      { index: 1, reason: 'This reverses the roles; RBAC is about who, Policy is about what.' },
      { index: 2, reason: 'They are distinct services that solve different problems.' },
      { index: 3, reason: 'Neither service is about billing or networking specifically.' },
    ],
  },
  {
    id: 'q-mg-09',
    domainId: 'azure-management',
    topicId: 'tags',
    type: 'single',
    difficulty: 'beginner',
    prompt: 'A finance team wants to break down the Azure bill by department. What is the simplest way to enable this?',
    options: [
      'Create a new subscription per department',
      'Apply a "Department" tag to each resource and use Cost Management to group by it',
      'Delete unused resource groups',
      'Use Azure Policy to block new VMs',
    ],
    correct: [1],
    explanation:
      'Tags are the standard way to label resources by department; Cost Management can then group costs by tag for chargeback.',
    distractorAnalysis: [
      { index: 0, reason: 'A subscription per department is heavier and costlier than using tags.' },
      { index: 2, reason: 'Deleting unused groups does not break down the bill by department.' },
      { index: 3, reason: 'Blocking VMs does not help attribute spend to departments.' },
    ],
  },
  {
    id: 'q-mg-10',
    domainId: 'azure-management',
    topicId: 'conditional-access',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'A policy says: "If a user signs in from an unknown country, require multi-factor authentication." Which Entra ID feature provides this?',
    options: ['RBAC', 'Azure Policy', 'Conditional Access', 'Azure Advisor'],
    correct: [2],
    explanation:
      'Conditional Access evaluates sign-in conditions like location and can require MFA when conditions are met.',
    distractorAnalysis: [
      { index: 0, reason: 'RBAC controls what a signed-in user can do, not the sign-in conditions.' },
      { index: 1, reason: 'Azure Policy governs resource configurations, not sign-ins.' },
      { index: 3, reason: 'Advisor gives best-practice recommendations, not sign-in policies.' },
    ],
  },
  {
    id: 'q-mg-11',
    domainId: 'azure-management',
    topicId: 'conditional-access',
    type: 'single',
    difficulty: 'beginner',
    prompt: 'What is the main purpose of multi-factor authentication (MFA)?',
    options: [
      'To replace passwords entirely',
      'To require an extra proof beyond a password so a stolen password alone is not enough',
      'To assign users to resource groups',
      'To reduce the monthly cloud bill',
    ],
    correct: [1],
    explanation:
      'MFA adds a second factor on top of the password, so even if the password is stolen the account is still protected.',
    distractorAnalysis: [
      { index: 0, reason: 'MFA does not replace passwords; it adds a factor on top of them.' },
      { index: 2, reason: 'MFA is not related to resource group membership.' },
      { index: 3, reason: 'MFA has no effect on cloud billing.' },
    ],
  },
  {
    id: 'q-mg-12',
    domainId: 'azure-management',
    topicId: 'cost-management',
    type: 'single',
    difficulty: 'beginner',
    prompt: 'You want to estimate the monthly cost of running 3 virtual machines and a storage account on Azure before deploying them. Which tool should you use?',
    options: ['TCO calculator', 'Azure pricing calculator', 'Azure Advisor', 'Azure Monitor'],
    correct: [1],
    explanation:
      'The Azure pricing calculator estimates the cost of planned Azure resources before you deploy them.',
    distractorAnalysis: [
      { index: 0, reason: 'The TCO calculator compares cloud vs. on-premises total cost, not Azure resource prices alone.' },
      { index: 2, reason: 'Advisor gives recommendations, not price estimates.' },
      { index: 3, reason: 'Monitor tracks telemetry, not pre-deployment cost estimates.' },
    ],
  },
  {
    id: 'q-mg-13',
    domainId: 'azure-management',
    topicId: 'cost-management',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'Which tool compares the total cost of running a workload on Azure versus keeping it in your own on-premises data centre?',
    options: ['Azure pricing calculator', 'TCO calculator', 'Azure Policy', 'Azure Service Health'],
    correct: [1],
    explanation:
      'The TCO (Total Cost of Ownership) calculator compares cloud vs. on-premises costs, including power, facilities and labour.',
    distractorAnalysis: [
      { index: 0, reason: 'The pricing calculator only prices Azure resources, not on-premises comparison.' },
      { index: 2, reason: 'Azure Policy enforces configuration rules, not cost comparison.' },
      { index: 3, reason: 'Service Health reports platform events, not cost comparisons.' },
    ],
  },
  {
    id: 'q-mg-14',
    domainId: 'azure-management',
    topicId: 'azure-advisor',
    type: 'single',
    difficulty: 'beginner',
    prompt: 'Which Azure service analyses your resources and offers personalised best-practice recommendations across cost, security, reliability and performance?',
    options: ['Azure Monitor', 'Azure Advisor', 'Azure Policy', 'Azure Service Health'],
    correct: [1],
    explanation:
      'Azure Advisor scans your resources and produces personalised recommendations in cost, security, reliability, performance and operational excellence.',
    distractorAnalysis: [
      { index: 0, reason: 'Monitor collects telemetry and alerts; it does not give best-practice recommendations.' },
      { index: 2, reason: 'Policy enforces rules; it does not produce recommendations.' },
      { index: 3, reason: 'Service Health reports platform events, not best-practice recommendations.' },
    ],
  },
  {
    id: 'q-mg-15',
    domainId: 'azure-management',
    topicId: 'azure-advisor',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'Azure Advisor recommends that you shut down two idle VMs to save money. What happens if you do nothing?',
    options: [
      'Advisor automatically deletes the VMs',
      'The VMs keep running and keep costing money; Advisor is advisory only',
      'Azure Policy shuts them down for you',
      'The subscription is suspended',
    ],
    correct: [1],
    explanation:
      'Advisor is advisory — it does not change resources. The VMs keep running and billing until you act on the recommendation.',
    distractorAnalysis: [
      { index: 0, reason: 'Advisor never deletes resources automatically.' },
      { index: 2, reason: 'Azure Policy enforces rules but does not act on Advisor recommendations on its own.' },
      { index: 3, reason: 'Subscriptions are not suspended because of idle VMs.' },
    ],
  },
  {
    id: 'q-mg-16',
    domainId: 'azure-management',
    topicId: 'azure-monitor',
    type: 'single',
    difficulty: 'beginner',
    prompt: 'A team wants their web app to add more instances automatically when CPU stays above 75% for 10 minutes. Which Azure capability provides this?',
    options: ['Azure Advisor', 'Azure Policy', 'Azure Monitor Autoscale', 'Azure Service Health'],
    correct: [2],
    explanation:
      'Azure Monitor Autoscale adjusts the number of resource instances automatically based on metric rules like CPU usage.',
    distractorAnalysis: [
      { index: 0, reason: 'Advisor gives recommendations; it does not autoscale resources.' },
      { index: 1, reason: 'Policy enforces configurations; it does not autoscale.' },
      { index: 3, reason: 'Service Health reports platform events, not app scaling.' },
    ],
  },
  {
    id: 'q-mg-17',
    domainId: 'azure-management',
    topicId: 'azure-monitor',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'Which two kinds of telemetry does Azure Monitor primarily collect?',
    options: [
      'Metrics and logs',
      'Invoices and budgets',
      'Tags and policies',
      'Regions and availability zones',
    ],
    correct: [0],
    explanation:
      'Azure Monitor collects metrics (numeric samples like CPU) and logs (detailed event records) from your resources and apps.',
    concept: 'Azure Monitor versus Azure Advisor',
    misconceptionId: 'monitor-vs-advisor',
    remedialLesson: {
      title: 'Monitor observes; Advisor recommends',
      explanation:
        'Azure Monitor collects and analyzes operational telemetry such as metrics and logs. Azure Advisor reviews configuration and usage, then suggests improvements. Advisor does not replace monitoring or change resources automatically.',
      example:
        'Use Monitor to inspect a virtual machine’s CPU chart during a slowdown. Use Advisor to find a recommendation to right-size an underused virtual machine.',
      examTip:
        'Clues like metrics, logs, alerts, and telemetry point to Monitor. “Recommended action” or optimization guidance points to Advisor.',
    },
    followUpQuestion: {
      prompt:
        'A team wants Azure to recommend a cheaper size for a virtual machine that is rarely busy. Which service should they check?',
      options: ['Azure Monitor', 'Azure Advisor', 'Azure Policy', 'Resource Health'],
      correctIndex: 1,
      explanation:
        'Azure Advisor provides cost and performance recommendations based on resource usage. Monitor exposes the measurements, while Advisor turns analysis into recommendations.',
    },
    followUpQuestions: [
      {
        prompt:
          'A team wants Azure to recommend a cheaper size for a virtual machine that is rarely busy. Which service should they check?',
        options: ['Azure Monitor', 'Azure Advisor', 'Azure Policy', 'Resource Health'],
        correctIndex: 1,
        explanation:
          'Azure Advisor provides cost and performance recommendations based on resource usage. Monitor exposes the measurements, while Advisor turns analysis into recommendations.',
      },
      {
        prompt:
          'An operations team needs an alert when a web app’s response time stays above two seconds. Which service should collect the measurements and trigger an alert?',
        options: ['Azure Monitor', 'Azure Advisor', 'Azure Policy', 'Resource Health'],
        correctIndex: 0,
        explanation:
          'Azure Monitor collects metrics and logs and can trigger alerts when a measured condition is met. Advisor provides recommendations instead of operational alerts.',
      },
      {
        prompt:
          'Azure reviews a workload and suggests adding availability zones to improve reliability. Which service provides this recommendation?',
        options: ['Azure Monitor', 'Azure Advisor', 'Azure Policy', 'Resource Health'],
        correctIndex: 1,
        explanation:
          'Azure Advisor reviews usage and configuration to suggest reliability improvements. Monitor shows telemetry and alerts but does not provide this best-practice advice.',
      },
    ],
    distractorAnalysis: [
      { index: 1, reason: 'Invoices and budgets belong to Cost Management, not Monitor.' },
      { index: 2, reason: 'Tags and policies are governance concepts, not telemetry.' },
      { index: 3, reason: 'Regions and zones are physical topology, not telemetry types.' },
    ],
  },
  {
    id: 'q-mg-18',
    domainId: 'azure-management',
    topicId: 'service-health',
    type: 'single',
    difficulty: 'beginner',
    prompt: 'Which Azure service tells you about planned maintenance and outages in Azure that affect your specific subscriptions and regions?',
    options: ['Azure Monitor', 'Azure Advisor', 'Azure Service Health', 'Azure Policy'],
    correct: [2],
    explanation:
      'Azure Service Health gives a personalised view of Azure platform issues, planned maintenance and health advisories affecting your resources.',
    concept: 'Azure Service Health versus Resource Health',
    misconceptionId: 'service-health-vs-resource-health',
    remedialLesson: {
      title: 'Platform events versus one resource',
      explanation:
        'Service Health reports Azure platform incidents, planned maintenance, and advisories that may affect your subscriptions or regions. Resource Health reports the current health of one specific resource.',
      example:
        'If Azure announces a regional platform outage, check Service Health. If one virtual machine is unavailable while nearby services work, check that VM’s Resource Health.',
      examTip:
        'A regional or subscription-wide Azure event → Service Health. A single VM, database, or other resource state → Resource Health.',
    },
    followUpQuestion: {
      prompt:
        'A single virtual machine shows Unavailable, while other resources in the region are healthy. Where should you inspect that VM’s status?',
      options: ['Azure Service Health', 'Azure Resource Health', 'Azure Advisor', 'Azure Policy'],
      correctIndex: 1,
      explanation:
        'Resource Health reports the status of an individual resource. Service Health is for broader Azure platform incidents and planned events affecting a subscription or region.',
    },
    followUpQuestions: [
      {
        prompt:
          'A single virtual machine shows Unavailable, while other resources in the region are healthy. Where should you inspect that VM’s status?',
        options: ['Azure Service Health', 'Azure Resource Health', 'Azure Advisor', 'Azure Policy'],
        correctIndex: 1,
        explanation:
          'Resource Health reports the status of an individual resource. Service Health is for broader Azure platform incidents and planned events affecting a subscription or region.',
      },
      {
        prompt:
          'Azure announces planned maintenance that may affect storage accounts across one of your regions. Which service should you check?',
        options: ['Azure Service Health', 'Azure Resource Health', 'Azure Advisor', 'Azure Policy'],
        correctIndex: 0,
        explanation:
          'Service Health reports Azure platform incidents and planned maintenance that may affect subscriptions or regions. Resource Health focuses on one resource.',
      },
      {
        prompt:
          'One Azure SQL database reports an unavailable state, but other resources are operating normally. Which service shows that database’s current status?',
        options: ['Azure Service Health', 'Azure Resource Health', 'Azure Advisor', 'Azure Policy'],
        correctIndex: 1,
        explanation:
          'Resource Health shows the current health of a specific resource. Service Health reports broader Azure platform events that may affect many resources.',
      },
    ],
    distractorAnalysis: [
      { index: 0, reason: 'Monitor tracks your own resources\u2019 telemetry, not Azure platform events.' },
      { index: 1, reason: 'Advisor gives best-practice recommendations, not live platform events.' },
      { index: 3, reason: 'Policy enforces configuration rules, not platform status.' },
    ],
  },
  {
    id: 'q-mg-19',
    domainId: 'azure-management',
    topicId: 'service-health',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'What is the difference between Azure Service Health and Azure Monitor?',
    options: [
      'Service Health reports on Azure platform problems; Azure Monitor reports on the health of your own resources.',
      'They are the same service.',
      'Service Health is for billing; Monitor is for networking.',
      'Service Health replaces the need for Monitor.',
    ],
    correct: [0],
    explanation:
      'Service Health is about Azure platform events affecting your resources; Monitor is about the telemetry and health of your own resources and apps.',
    distractorAnalysis: [
      { index: 1, reason: 'They are distinct services with different purposes.' },
      { index: 2, reason: 'Neither service is specifically about billing or networking.' },
      { index: 3, reason: 'They complement each other; one does not replace the other.' },
    ],
  },
  {
    id: 'q-mg-20',
    domainId: 'azure-management',
    topicId: 'cli-cloud-shell',
    type: 'single',
    difficulty: 'beginner',
    prompt: 'You are on a computer where you cannot install software but you need to run Azure commands. Which option lets you manage Azure from the browser with no install?',
    options: ['Install Azure CLI locally', 'Azure Cloud Shell', 'Download a VM image', 'Use Azure Advisor'],
    correct: [1],
    explanation:
      'Azure Cloud Shell is an in-browser, pre-authenticated shell with the Azure CLI and PowerShell already installed.',
    distractorAnalysis: [
      { index: 0, reason: 'Installing the CLI locally requires installation rights, which you do not have here.' },
      { index: 2, reason: 'Downloading a VM image is unrelated to running Azure commands.' },
      { index: 3, reason: 'Advisor gives recommendations, not a command-line shell.' },
    ],
  },
  {
    id: 'q-mg-21',
    domainId: 'azure-management',
    topicId: 'cli-cloud-shell',
    type: 'single',
    difficulty: 'advanced',
    prompt: 'Which statement correctly describes Azure Cloud Shell?',
    options: [
      'Cloud Shell requires a local CLI installation first.',
      'Cloud Shell provides an in-browser shell with Azure CLI and PowerShell ready to use.',
      'Cloud Shell can only manage Azure virtual machines.',
      'Cloud Shell works without signing in to an Azure account.',
    ],
    correct: [1],
    explanation:
      'Cloud Shell runs in the browser and comes with Azure CLI and PowerShell ready to use. Azure authenticates your session, and commands are handled through Azure Resource Manager.',
    distractorAnalysis: [
      { index: 0, reason: 'Cloud Shell is hosted by Azure, so you do not need a local CLI installation.' },
      { index: 2, reason: 'Cloud Shell can manage many Azure services, not only virtual machines.' },
      { index: 3, reason: 'Cloud Shell requires an authenticated Azure session.' },
    ],
  },

  // A couple of cross-domain scenario questions for variety
  {
    id: 'q-mix-01',
    domainId: 'cloud-concepts',
    topicId: 'iaas-paas-saas',
    type: 'single',
    difficulty: 'advanced',
    prompt: 'Scenario: A hospital wants a patient appointment system. They do not want to manage servers, OS patching or the database runtime, but they do want to customise the application logic. Which service model best fits?',
    options: ['IaaS', 'PaaS', 'SaaS', 'On-premises'],
    correct: [1],
    explanation:
      'PaaS fits: the provider manages servers, OS and database runtime, while the hospital focuses on customising the application logic — exactly the PaaS division of responsibility.',
    distractorAnalysis: [
      { index: 0, reason: 'IaaS would require the hospital to manage OS patching and the database runtime.' },
      { index: 2, reason: 'SaaS would not let them customise the application logic.' },
      { index: 3, reason: 'On-premises means managing everything, the opposite of what they want.' },
    ],
  },
  {
    id: 'q-mix-02',
    domainId: 'azure-management',
    topicId: 'azure-policy',
    type: 'single',
    difficulty: 'advanced',
    prompt: 'A company wants to block resource creation outside approved regions, regardless of who creates the resource. Which service should enforce the rule?',
    options: ['Azure RBAC', 'Azure Advisor', 'Azure Policy', 'Azure Monitor'],
    correct: [2],
    explanation:
      'Azure Policy evaluates resource configurations and can deny deployments that do not meet an allowed-location rule. It applies regardless of which user starts the deployment.',
    distractorAnalysis: [
      { index: 0, reason: 'RBAC controls who can perform actions; it does not enforce approved resource configurations.' },
      { index: 1, reason: 'Advisor recommends improvements but does not enforce deployment rules.' },
      { index: 3, reason: 'Monitor collects telemetry and alerts; it does not block deployments based on location.' },
    ],
  },
  ...additionalQuestions,
];
