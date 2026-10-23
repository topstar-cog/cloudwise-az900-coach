import type { Topic } from '../../types';

export const azureArchitectureTopics: Topic[] = [
  {
    id: 'regions-availability-zones',
    moduleId: 'az-regions',
    title: 'Azure Regions & Availability Zones',
    description: 'How Azure organises the world into regions, region pairs and availability zones.',
    lesson: {
      id: 'lesson-regions-az',
      topicId: 'regions-availability-zones',
      title: 'Azure Regions & Availability Zones',
      summary:
        'A region is a set of data centres in a geographic area. Availability zones are separate physical locations within a region with independent power and cooling.',
      explanation:
        'Azure is made up of regions — sets of one or more data centres close together in a geographic area, like "East US" or "South Africa North". You choose a region when you create resources so your apps run close to your users and meet data-residency rules. Some regions contain availability zones: separate physical locations within the same region, each with its own power, cooling and networking. If one zone fails, services in another zone keep running, so you can build highly available apps by spreading workloads across zones. Azure also pairs regions (e.g. East US paired with West US) so data can be replicated to a second region for disaster recovery.',
      keyTerms: [
        { term: 'Region', meaning: 'A set of one or more Azure data centres in a geographic area.' },
        { term: 'Availability zone', meaning: 'A separate physical data centre within a region with independent power, cooling and network.' },
        { term: 'Region pair', meaning: 'Two regions paired for disaster recovery and replication, at least 300 miles apart.' },
        { term: 'Geography', meaning: 'A discrete market with two or more regions, used for data-residency boundaries.' },
      ],
      example:
        'A Kenyan bank serving customers across East Africa deploys its mobile banking app in the "South Africa North" region to keep data on the continent. To survive a data centre failure, it spreads its virtual machines across two availability zones within that region. For disaster recovery, it replicates a backup copy to the paired "South Africa West" region.',
      comparison: [
        { with: 'Availability zone vs. region', detail: 'A zone is inside a region; multiple zones together make a region resilient.' },
        { with: 'Availability zones vs. availability sets', detail: 'Zones protect against data-centre failure with separate physical locations; availability sets protect against rack/hardware failure within a single data centre.' },
      ],
      examTip:
        '"Separate physical location, independent power and cooling" = availability zone. "Two regions paired for disaster recovery" = region pair. "Data centre closure protection" = availability zones.',
      examKeywords: ['independent power', 'separate physical location', 'region pair', 'disaster recovery', 'data residency'],
      misconceptions: [
        'Not every region supports availability zones — check the Azure docs for zone support per region.',
        'A region is not a single data centre; it can contain several data centres, sometimes organised into zones.',
        'Availability sets are not the same as availability zones — sets are a legacy concept within one data centre.',
      ],
      comprehension: [
        {
          id: 'regions-q1',
          prompt: 'What is an availability zone in Azure?',
          options: [
            'A pair of regions in different countries',
            'A separate physical location within a region with its own power, cooling and network',
            'A single virtual machine',
            'A billing boundary',
          ],
          correctIndex: 1,
          explanation: 'An availability zone is a distinct physical data centre within a region, with independent power, cooling and networking.',
        },
        {
          id: 'regions-q2',
          prompt: 'Why does Azure pair regions?',
          options: [
            'To reduce customer bills',
            'To provide replication and disaster recovery across regions',
            'To combine them into one large region',
            'To share physical power supplies',
          ],
          correctIndex: 1,
          explanation: 'Region pairs enable replication and disaster recovery so that if one region fails, services can fail over to its pair.',
        },
      ],
    },
  },
  {
    id: 'resource-manager',
    moduleId: 'az-regions',
    title: 'Azure Resource Manager',
    description: 'The deployment and management layer that turns requests into Azure resources.',
    lesson: {
      id: 'lesson-arm',
      topicId: 'resource-manager',
      title: 'Azure Resource Manager (ARM)',
      summary:
        'ARM is the deployment and management service for Azure — every request to create or manage a resource goes through it.',
      explanation:
        'Azure Resource Manager (ARM) is the management layer that sits between you and the Azure infrastructure. Whenever you create, update or delete a resource — through the portal, the Azure CLI, PowerShell or an API — your request goes through ARM. ARM authenticates you, checks your permissions, validates the request and then applies it consistently. ARM also lets you define resources as code using ARM templates, so you can deploy a whole set of resources repeatably and predictably. Resources are created inside resource groups, and ARM applies tags, policies and access control at that group level.',
      keyTerms: [
        { term: 'ARM', meaning: 'Azure Resource Manager — the deployment and management service for all Azure resources.' },
        { term: 'ARM template', meaning: 'A JSON file that declaratively defines a set of Azure resources to deploy together.' },
        { term: 'Declarative deployment', meaning: 'You describe the desired end state; ARM figures out how to create or update it.' },
      ],
      example:
        'A startup wants to create 3 virtual machines, a load balancer and a database every time they spin up a new environment. Instead of clicking through the portal each time, they write an ARM template describing all these resources. They run one command and ARM creates everything consistently, the same every time.',
      comparison: [
        { with: 'ARM vs. portal', detail: 'The portal is a GUI on top of ARM; everything you click goes through ARM anyway. Templates and CLI give you repeatable, version-controlled deployments.' },
        { with: 'ARM template vs. imperative script', detail: 'A script says "do step A then B"; a template says "here is the end state I want" and ARM works out how to get there.' },
      ],
      examTip:
        '"Single deployment layer", "consistent management", "infrastructure as code", "JSON template" all point to ARM. Remember: every Azure resource creation goes through ARM regardless of which tool you use.',
      examKeywords: ['deployment layer', 'management layer', 'infrastructure as code', 'JSON template', 'declarative'],
      misconceptions: [
        'ARM is not optional — even the Azure portal uses ARM for every action.',
        'ARM templates are declarative, not imperative — you describe desired state, not step-by-step commands.',
      ],
      comprehension: [
        {
          id: 'arm-q1',
          prompt: 'Which statement about Azure Resource Manager is correct?',
          options: [
            'ARM only works through the Azure portal.',
            'ARM is the deployment and management layer that handles all resource requests, regardless of tool.',
            'ARM is a database service.',
            'ARM replaces the need for resource groups.',
          ],
          correctIndex: 1,
          explanation: 'ARM is the central management layer; the portal, CLI, PowerShell and APIs all send requests through ARM.',
        },
      ],
    },
  },
  {
    id: 'compute',
    moduleId: 'az-compute',
    title: 'Azure Compute Options',
    description: 'Virtual Machines, App Service and Azure Functions for different workloads.',
    lesson: {
      id: 'lesson-compute',
      topicId: 'compute',
      title: 'Azure Compute Options',
      summary:
        'Azure offers VMs for full control, App Service for managed web apps, and Azure Functions for serverless code.',
      explanation:
        'Compute is where your applications actually run. Azure Virtual Machines (VMs) give you a full virtualised computer you control — choose the OS, install software, configure everything. This is IaaS. Azure App Service is a managed platform (PaaS) for hosting web applications and APIs — you deploy code and Azure handles the servers, OS patching and scaling. Azure Functions is serverless: you write small pieces of code that run only when triggered by an event, and Azure manages everything else, billing you for execution time. Other options include Azure Kubernetes Service (AKS) for orchestrating containers and Azure Container Apps for running containerised apps without managing Kubernetes.',
      keyTerms: [
        { term: 'Virtual Machine (VM)', meaning: 'A virtualised computer you fully control (IaaS).' },
        { term: 'App Service', meaning: 'A managed PaaS platform for hosting web apps and APIs.' },
        { term: 'Azure Functions', meaning: 'Serverless compute that runs code on events, billed per execution.' },
        { term: 'AKS', meaning: 'Azure Kubernetes Service — managed Kubernetes for orchestrating containers.' },
      ],
      example:
        'A Kenyan fintech runs its core ledger on Azure VMs because it needs full OS control and custom configuration. Its marketing website runs on App Service because the team just wants to deploy code and not worry about servers. Its monthly invoice generator runs on Azure Functions, triggered on the 1st of each month — no need to keep a server running the rest of the month.',
      comparison: [
        { with: 'VM vs. App Service', detail: 'VMs give full control but more work; App Service is managed and simpler but less configurable.' },
        { with: 'App Service vs. Functions', detail: 'App Service runs continuously hosting an app; Functions run only when triggered, billed per execution.' },
        { with: 'Serverless vs. IaaS', detail: 'Serverless abstracts servers away entirely; IaaS exposes them for you to manage.' },
      ],
      examTip:
        'Need full control + OS access = VM. Host a web app without managing servers = App Service. Run code only on events, pay per execution = Functions. Orchestrate containers at scale = AKS.',
      examKeywords: ['virtual machine', 'web app hosting', 'event-driven', 'serverless', 'per execution', 'containers'],
      misconceptions: [
        'Serverless does not mean "no servers" — it means you do not manage them; Azure does.',
        'App Service is PaaS, not SaaS — you still bring your own app code.',
      ],
      comprehension: [
        {
          id: 'compute-q1',
          prompt: 'A team wants to run a small function only when a new file is uploaded, and pay only for the execution time. Which service is the best fit?',
          options: ['Azure Virtual Machines', 'Azure App Service', 'Azure Functions', 'Azure Kubernetes Service'],
          correctIndex: 2,
          explanation: 'Azure Functions is event-driven serverless compute, billed per execution — ideal for occasional, trigger-based work.',
        },
      ],
    },
  },
  {
    id: 'containers',
    moduleId: 'az-compute',
    title: 'Containers on Azure',
    description: 'What containers are and the Azure services that run them.',
    lesson: {
      id: 'lesson-containers',
      topicId: 'containers',
      title: 'Containers on Azure',
      summary:
        'Containers bundle an app and its dependencies into a portable unit. Azure runs them with AKS, Container Apps, or Container Instances.',
      explanation:
        'A container packages an application together with everything it needs to run — code, libraries and settings — so it runs the same way on any machine. Unlike a virtual machine, a container does not include a full operating system; it shares the host OS, making it lightweight and fast to start. Azure offers several ways to run containers. Azure Container Instances (ACI) runs a container directly with no orchestration — great for quick tasks. Azure Kubernetes Service (AKS) is a managed Kubernetes platform for orchestrating many containers at scale. Azure Container Apps is a serverless container service that handles scaling for you without managing Kubernetes directly.',
      keyTerms: [
        { term: 'Container', meaning: 'A lightweight, portable package bundling an app with its dependencies.' },
        { term: 'ACI', meaning: 'Azure Container Instances — run a container with no orchestration.' },
        { term: 'AKS', meaning: 'Azure Kubernetes Service — managed Kubernetes for orchestrating containers.' },
        { term: 'Container Apps', meaning: 'Serverless container platform that auto-scales without managing Kubernetes.' },
      ],
      example:
        'A logistics company in Mombasa packages its shipment-tracking API as a container. In development it runs the same container on a laptop and in production on Azure Container Apps, which auto-scales to handle Black Friday traffic and scales to zero at night to save cost.',
      comparison: [
        { with: 'Containers vs. VMs', detail: 'VMs include a full OS and are heavier; containers share the host OS and start in seconds.' },
        { with: 'AKS vs. Container Apps', detail: 'AKS gives full Kubernetes control; Container Apps is simpler and serverless, hiding Kubernetes complexity.' },
      ],
      examTip:
        'Packaged app + dependencies, portable, lightweight = container. Run one quickly = ACI. Orchestrate many = AKS. Serverless containers with auto-scaling = Container Apps.',
      examKeywords: ['portable', 'lightweight', 'package', 'orchestrate', 'kubernetes', 'serverless container'],
      misconceptions: [
        'Containers are not the same as VMs — they share the host OS and do not virtualise hardware.',
        'A container image is not the running instance; the image is the template, a container is a running instance of it.',
      ],
      comprehension: [
        {
          id: 'containers-q1',
          prompt: 'Which is the main advantage of a container compared to a virtual machine?',
          options: [
            'It includes a full operating system',
            'It is lightweight and starts quickly because it shares the host OS',
            'It cannot run on a laptop',
            'It requires more memory',
          ],
          correctIndex: 1,
          explanation: 'Containers share the host OS, so they are lightweight and start in seconds compared to VMs which each run a full OS.',
        },
      ],
    },
  },
  {
    id: 'storage',
    moduleId: 'az-identity',
    title: 'Azure Storage Services',
    description: 'Blob, Disk, File and Table storage, and the access tiers.',
    lesson: {
      id: 'lesson-storage',
      topicId: 'storage',
      title: 'Azure Storage Services',
      summary:
        'Azure Storage offers Blobs (objects), Files (shared file shares), Disks (for VMs) and Tables (NoSQL key/value), with hot, cool and archive tiers.',
      explanation:
        'Azure Storage is a set of managed services for keeping data. Blob storage holds unstructured object data like images, videos and backups — you upload files and reference them by URL. Azure Files gives you managed file shares accessible via SMB, useful for apps that expect a shared drive. Azure Disks provide persistent storage for virtual machines. Azure Tables is a simple NoSQL key/value store for structured, non-relational data. Blob storage offers access tiers — Hot for frequently accessed data, Cool for infrequent access, and Archive for rarely accessed data — so you can trade access speed for lower cost.',
      keyTerms: [
        { term: 'Blob storage', meaning: 'Object storage for unstructured data like images, videos and documents.' },
        { term: 'Azure Files', meaning: 'Managed cloud file shares accessible via SMB protocol.' },
        { term: 'Azure Disks', meaning: 'Persistent block storage for virtual machines.' },
        { term: 'Access tiers', meaning: 'Hot, Cool and Archive tiers that trade retrieval speed for lower storage cost.' },
      ],
      example:
        'A Kenyan media company stores its current news videos in the Hot tier for fast streaming, last month\u2019s clips in Cool for cheaper storage, and raw archive footage from past years in the Archive tier, paying much less per GB but accepting slower retrieval when a producer needs an old clip.',
      comparison: [
        { with: 'Blob vs. Disk', detail: 'Blobs store files accessed by URL; Disks are block storage attached to VMs.' },
        { with: 'Hot vs. Cool vs. Archive', detail: 'Hot = fast access, higher cost; Cool = lower cost, less frequent access; Archive = lowest cost, slowest retrieval (hours).' },
      ],
      examTip:
        'Images, videos, backups, URLs = Blob. Shared drive / SMB = Files. VM disks = Disks. Cheap long-term storage = Archive tier.',
      examKeywords: ['object storage', 'images', 'backup', 'SMB', 'file share', 'archive', 'tier'],
      misconceptions: [
        'Archive is not instantly accessible — retrieval can take hours and has a fee per GB.',
        'Blob storage is for unstructured data; it is not the same as a relational database (use Azure SQL for that).',
      ],
      comprehension: [
        {
          id: 'storage-q1',
          prompt: 'A company needs to store years of CCTV footage that is almost never accessed but must be kept for compliance. Which tier is most cost-effective?',
          options: ['Hot', 'Cool', 'Archive', 'Premium'],
          correctIndex: 2,
          explanation: 'Archive has the lowest storage cost for rarely accessed data, accepting slower retrieval times.',
        },
      ],
    },
  },
  {
    id: 'networking',
    moduleId: 'az-identity',
    title: 'Azure Networking Fundamentals',
    description: 'Virtual networks, subnets, public IP and the DNS service.',
    lesson: {
      id: 'lesson-networking',
      topicId: 'networking',
      title: 'Azure Networking Fundamentals',
      summary:
        'Virtual Networks (VNets) isolate and connect your Azure resources. Subnets divide a VNet and public IPs expose services to the internet.',
      explanation:
        'An Azure Virtual Network (VNet) is your own private network in the Azure cloud. You create VNets to isolate resources and control how they communicate. Inside a VNet you create subnets to segment resources — for example, a subnet for web servers and another for databases. Resources in a VNet get private IP addresses and can talk to each other securely. To expose a service to the internet you assign a public IP address. Azure DNS lets you host your domain name records and resolve names within your network. VNets can also be connected to your on-premises network using a VPN gateway or ExpressRoute.',
      keyTerms: [
        { term: 'VNet', meaning: 'Virtual Network — an isolated private network in Azure for your resources.' },
        { term: 'Subnet', meaning: 'A range of IP addresses inside a VNet used to segment resources.' },
        { term: 'Public IP', meaning: 'An internet-facing IP address assigned to a resource so it can be reached from outside.' },
        { term: 'Azure DNS', meaning: 'A hosting service for DNS domains that resolves names to IP addresses.' },
      ],
      example:
        'A Kenyan SaaS company creates one VNet with a "web" subnet for its App Service and a "data" subnet for its database. The web subnet can reach the data subnet over private IPs, but the database has no public IP, so it is not exposed to the internet. They use Azure DNS to map app.mycompany.co.ke to their public IP.',
      comparison: [
        { with: 'VNet vs. subnet', detail: 'A VNet is the whole private network; subnets are subdivisions within it.' },
        { with: 'VPN gateway vs. ExpressRoute', detail: 'VPN gateway tunnels over the public internet; ExpressRoute is a private, dedicated connection with more reliable bandwidth.' },
      ],
      examTip:
        'Isolation, private IP space, segmentation = VNet and subnets. Reachable from the internet = public IP. Private on-premises connection = ExpressRoute or VPN gateway.',
      examKeywords: ['virtual network', 'subnet', 'private IP', 'public IP', 'ExpressRoute', 'VPN gateway'],
      misconceptions: [
        'A VNet does not expose your resources to the internet by default — you must add a public IP or specific service endpoint.',
        'ExpressRoute is not a VPN — it is a private dedicated circuit, not tunneled over the public internet.',
      ],
      comprehension: [
        {
          id: 'networking-q1',
          prompt: 'You want a private dedicated connection from your office to Azure, with predictable bandwidth and no public internet routing. Which option fits?',
          options: ['Azure DNS', 'Public IP address', 'ExpressRoute', 'Azure Blob storage'],
          correctIndex: 2,
          explanation: 'ExpressRoute provides a private, dedicated connection to Azure that does not travel over the public internet.',
        },
      ],
    },
  },
  {
    id: 'entra-id',
    moduleId: 'az-identity',
    title: 'Microsoft Entra ID',
    description: 'Microsoft\u2019s cloud-based identity and access management service.',
    lesson: {
      id: 'lesson-entra-id',
      topicId: 'entra-id',
      title: 'Microsoft Entra ID',
      summary:
        'Entra ID (formerly Azure AD) is Microsoft\u2019s cloud identity service for authenticating users and managing access to apps and resources.',
      explanation:
        'Microsoft Entra ID — formerly called Azure Active Directory (Azure AD) — is Microsoft\u2019s cloud-based identity and access management service. It stores user accounts and groups, authenticates sign-ins, and controls what users can access. Entra ID is used to log in to Microsoft 365, the Azure portal and thousands of SaaS apps, and it can also synchronise with an on-premises Active Directory using Entra Connect. It supports features like multi-factor authentication, Conditional Access, single sign-on, and role-based access control. Note: Entra ID is designed for internet-based identity and is different from traditional Windows Server Active Directory, which is an on-premises directory service.',
      keyTerms: [
        { term: 'Microsoft Entra ID', meaning: 'Microsoft\u2019s cloud identity service (formerly Azure AD).' },
        { term: 'Tenant', meaning: 'A dedicated instance of Entra ID that an organisation owns.' },
        { term: 'Single sign-on (SSO)', meaning: 'One set of credentials to access many applications.' },
        { term: 'Entra Connect', meaning: 'Tool that syncs on-premises AD identities into Entra ID.' },
      ],
      example:
        'A Nairobi company uses Microsoft 365 for email. Employees use their Entra ID credentials (e.g. jane@company.co.ke) to sign in once and access email, Microsoft Teams and the Azure portal without re-entering passwords — this is single sign-on. The IT admin enforces MFA so that sign-ins from new devices also require a code from the employee\u2019s phone.',
      comparison: [
        { with: 'Entra ID vs. Windows Server AD', detail: 'Entra ID is cloud-first, identity-focused, uses HTTP/HTTPS and SAML/OAuth; Windows Server AD is on-premises, uses LDAP/Kerberos and is designed for domain-joined machines.' },
        { with: 'Authentication vs. authorisation', detail: 'Authentication verifies who you are (Entra ID signs you in); authorisation decides what you can do (handled by RBAC and Conditional Access).' },
      ],
      examTip:
        'Cloud identity, single sign-on, MFA, Conditional Access = Entra ID. On-premises directory, domain join, LDAP/Kerberos = Windows Server AD.',
      examKeywords: ['cloud identity', 'single sign-on', 'tenant', 'formerly Azure AD', 'SSO'],
      misconceptions: [
        'Entra ID is NOT the same as Windows Server Active Directory — they are different products for different environments.',
        'Entra ID does not join servers to a domain in the Windows sense; it manages user identities for cloud apps.',
      ],
      comprehension: [
        {
          id: 'entra-q1',
          prompt: 'Which service is Microsoft\u2019s cloud-based identity and access management service, formerly called Azure Active Directory?',
          options: ['Windows Server Active Directory', 'Microsoft Entra ID', 'Azure Resource Manager', 'Azure Policy'],
          correctIndex: 1,
          explanation: 'Microsoft Entra ID is the cloud identity service previously known as Azure Active Directory.',
        },
      ],
    },
  },
];
