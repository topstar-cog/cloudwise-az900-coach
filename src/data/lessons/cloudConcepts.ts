import type { Topic } from '../../types';

export const cloudConceptsTopics: Topic[] = [
  {
    id: 'cloud-models',
    moduleId: 'cc-cloud-models',
    title: 'Public, Private and Hybrid Cloud',
    description: 'The three main ways cloud infrastructure can be deployed and who uses them.',
    lesson: {
      id: 'lesson-cloud-models',
      topicId: 'cloud-models',
      title: 'Public, Private and Hybrid Cloud',
      summary:
        'A public cloud is shared by many organisations, a private cloud is used by one organisation, and a hybrid cloud combines both.',
      explanation:
        'Cloud computing means running your applications and storing your data on computers that someone else owns and maintains, instead of buying your own servers. There are three common deployment models. In a public cloud, a provider like Azure owns all the hardware and shares it across many customers — you sign up and pay only for what you use. In a private cloud, the hardware is dedicated to a single organisation, either in that organisation\u2019s own data centre or hosted by a provider just for them. A hybrid cloud combines a public cloud and a private cloud so data and apps can move between them, letting a company keep sensitive systems private while using the public cloud for flexible workloads.',
      keyTerms: [
        { term: 'Public cloud', meaning: 'Cloud infrastructure owned by a provider and shared by many customers over the internet.' },
        { term: 'Private cloud', meaning: 'Cloud infrastructure used exclusively by one organisation, on-premises or hosted.' },
        { term: 'Hybrid cloud', meaning: 'A combination of public and private clouds that can exchange data and workloads.' },
        { term: 'Multi-cloud', meaning: 'Using more than one public cloud provider (e.g. Azure and AWS) at the same time.' },
      ],
      example:
        'A Nairobi bank might run its core banking system on a private cloud for security and compliance, but use the Azure public cloud to host a mobile app that gets huge traffic at month-end. During peak times the app scales out on public cloud servers, while customer account data stays safely in the private cloud. This is a classic hybrid cloud setup common in Kenyan finance.',
      comparison: [
        { with: 'Hybrid vs. multi-cloud', detail: 'Hybrid combines public + private; multi-cloud uses several public cloud providers together.' },
        { with: 'Private cloud vs. on-premises servers', detail: 'A private cloud still uses virtualisation and self-service like a cloud; ordinary on-premises servers do not.' },
      ],
      examTip:
        'Watch for keywords in the question. "Shared", "multi-tenant" and "pay-as-you-go" point to public cloud. "Dedicated", "single organisation", "on-premises" point to private cloud. "Mix", "combine", "both" or "data moves between" point to hybrid cloud.',
      examKeywords: ['multi-tenant', 'shared', 'dedicated', 'single tenant', 'on-premises', 'combine', 'mix'],
      misconceptions: [
        'A private cloud is not the same as a traditional on-premises server room — it must still offer cloud features like self-service and elasticity.',
        'Hybrid cloud is not the same as multi-cloud. Hybrid mixes public and private; multi-cloud uses multiple public providers.',
        'Public cloud does not mean free — it means shared infrastructure billed on usage.',
      ],
      comprehension: [
        {
          id: 'cc-cloud-models-q1',
          prompt: 'A university wants some workloads on shared infrastructure billed by usage, but wants its student records system on dedicated hardware only it uses. Which model fits best?',
          options: ['Public cloud', 'Private cloud', 'Hybrid cloud', 'On-premises only'],
          correctIndex: 2,
          explanation: 'A hybrid cloud combines a public cloud (shared, usage-billed) with a private cloud (dedicated) so the university can keep sensitive records private while using the public cloud for other workloads.',
        },
        {
          id: 'cc-cloud-models-q2',
          prompt: 'Which keyword most strongly suggests a public cloud scenario?',
          options: ['Single-tenant', 'Dedicated hardware', 'Multi-tenant shared infrastructure', 'On-premises data centre'],
          correctIndex: 2,
          explanation: 'Public clouds are multi-tenant — many customers share the same underlying infrastructure.',
        },
      ],
    },
  },
  {
    id: 'iaas-paas-saas',
    moduleId: 'cc-cloud-models',
    title: 'IaaS, PaaS and SaaS',
    description: 'The three main cloud service models and who manages what in each.',
    lesson: {
      id: 'lesson-iaas-paas-saas',
      topicId: 'iaas-paas-saas',
      title: 'IaaS, PaaS and SaaS',
      summary:
        'IaaS gives you virtual machines you fully manage, PaaS gives you a managed platform for your apps, and SaaS is ready-to-use software.',
      explanation:
        'Cloud services come in three layers. Infrastructure as a Service (IaaS) gives you rented virtual machines and networking — you install the operating system, middleware and applications yourself. Platform as a Service (PaaS) gives you a ready environment to build and run apps; the provider manages the operating system, servers and runtime, and you only focus on your code. Software as a Service (SaaS) is finished software you simply use over the internet, like email or a spreadsheet — the provider manages everything and you just log in. The key exam idea is how much you manage versus the provider: IaaS = you manage the most; SaaS = you manage almost nothing.',
      keyTerms: [
        { term: 'IaaS', meaning: 'Infrastructure as a Service — rented VMs, storage and networking you configure and run yourself.' },
        { term: 'PaaS', meaning: 'Platform as a Service — a managed platform where you deploy apps without managing the OS or runtime.' },
        { term: 'SaaS', meaning: 'Software as a Service — complete software delivered over the internet and managed by the provider.' },
        { term: 'Shared responsibility', meaning: 'The split of duties between cloud provider and customer — different for each service model.' },
      ],
      example:
        'Think of food. IaaS is like renting a kitchen — you bring ingredients, cook, and clean. PaaS is like a restaurant kitchen where the stove and utensils are ready and you only cook your recipe. SaaS is like ordering a ready meal — someone else cooked it, you just eat. In Kenya, M-Pesa for Business dashboards are SaaS (you just log in); a startup hosting a Node.js API on Azure App Service is using PaaS; an IT team running Linux on Azure Virtual Machines is using IaaS.',
      comparison: [
        { with: 'IaaS vs. PaaS', detail: 'With IaaS you manage the OS and everything above it; with PaaS the provider manages the OS, runtime and patching, you only manage your app and data.' },
        { with: 'PaaS vs. SaaS', detail: 'PaaS is for developers building apps; SaaS is finished software for end users.' },
        { with: 'IaaS vs. SaaS', detail: 'IaaS gives you the most control and the most work; SaaS gives you the least control and the least work.' },
      ],
      examTip:
        'If the scenario mentions "virtual machines", "OS patching" or "full control", think IaaS. If it mentions "deploy your app without managing servers", "managed platform" or "no OS patching", think PaaS. If it mentions "ready-to-use software", "log in and use", or "subscribe to an app", think SaaS.',
      examKeywords: ['virtual machines', 'OS patching', 'managed platform', 'deploy your app', 'ready-to-use', 'subscribe', 'log in'],
      misconceptions: [
        'SaaS is not the same as PaaS. SaaS is finished software (e.g. Microsoft 365); PaaS is a platform for developers (e.g. Azure App Service).',
        'In IaaS the provider does NOT patch your operating system — that is your job.',
        'In SaaS you cannot install or customise the underlying software; you only use what the provider offers.',
      ],
      comprehension: [
        {
          id: 'iaas-paas-saas-q1',
          prompt: 'A developer wants to publish a web app without patching the operating system or managing the runtime. Which service model fits?',
          options: ['IaaS', 'PaaS', 'SaaS', 'On-premises'],
          correctIndex: 1,
          explanation: 'PaaS gives a managed platform — the provider handles the OS and runtime, so the developer only manages the app.',
        },
        {
          id: 'iaas-paas-saas-q2',
          prompt: 'Which statement about IaaS is correct?',
          options: [
            'The provider patches your operating system.',
            'You rent virtual machines and manage the OS and apps yourself.',
            'You just log in and use ready-made software.',
            'You cannot install your own software.',
          ],
          correctIndex: 1,
          explanation: 'In IaaS the provider supplies VMs, storage and networking, but you manage the operating system, middleware and applications.',
        },
      ],
    },
  },
  {
    id: 'capex-opex',
    moduleId: 'cc-cloud-models',
    title: 'CapEx vs OpEx',
    description: 'Capital expenditure versus operational expenditure and why cloud changes the model.',
    lesson: {
      id: 'lesson-capex-opex',
      topicId: 'capex-opex',
      title: 'CapEx vs OpEx',
      summary:
        'CapEx is big upfront spending on assets you own; OpEx is pay-as-you-go spending for services you use.',
      explanation:
        'Capital expenditure (CapEx) means buying physical assets up front — servers, buildings, network equipment — that you own and depreciate over time. Operational expenditure (OpEx) means paying for what you use as an ongoing expense, like a utility bill. Cloud computing shifts spending from CapEx to OpEx: instead of buying ten servers now and hoping you use them, you rent computing power by the minute and only pay for what you consume. This makes costs flexible and predictable month to month, and you can scale up or down at any time.',
      keyTerms: [
        { term: 'CapEx', meaning: 'Capital expenditure — upfront spending on physical assets you own and depreciate.' },
        { term: 'OpEx', meaning: 'Operational expenditure — ongoing pay-as-you-go spending for services consumed.' },
        { term: 'Depreciation', meaning: 'Spreading the cost of a physical asset over its useful life for accounting.' },
      ],
      example:
        'A startup in Mombasa buying five servers at KES 2 million to host its app is using CapEx — big money spent before earning revenue. The same startup running its app on Azure Virtual Machines and paying KES 15,000 per month is using OpEx — it pays only for the compute used and can stop paying when traffic drops.',
      comparison: [
        { with: 'CapEx vs. OpEx', detail: 'CapEx is upfront and asset-focused; OpEx is ongoing and usage-focused.' },
        { with: 'OpEx and elasticity', detail: 'OpEx pairs with elasticity — you can grow or shrink spend as demand changes, which CapEx does not allow.' },
      ],
      examTip:
        'Look for "upfront cost", "buying servers", "depreciation" — that is CapEx. Look for "pay-as-you-go", "monthly bill", "rent", "scale up and down" — that is OpEx. Cloud = OpEx.',
      examKeywords: ['upfront', 'depreciation', 'pay-as-you-go', 'monthly bill', 'scale up and down', 'rent'],
      misconceptions: [
        'Cloud does not eliminate all costs — there can still be some setup costs — but it shifts most spend to OpEx.',
        'OpEx is not always cheaper than CapEx; it is more flexible. Over years, heavy constant use can sometimes cost more than owning hardware.',
      ],
      comprehension: [
        {
          id: 'capex-opex-q1',
          prompt: 'A company pays for virtual machines monthly based on usage and can stop them any time. What kind of spending is this?',
          options: ['CapEx', 'OpEx', 'Depreciation', 'Amortisation'],
          correctIndex: 1,
          explanation: 'Pay-as-you-go monthly billing for services consumed is operational expenditure (OpEx).',
        },
        {
          id: 'capex-opex-q2',
          prompt: 'Which phrase best describes CapEx?',
          options: [
            'Paying per hour for cloud virtual machines',
            'Buying servers up front and depreciating them',
            'A monthly internet bill',
            'Renting software by the seat',
          ],
          correctIndex: 1,
          explanation: 'CapEx means buying physical assets up front and depreciating them over their useful life.',
        },
      ],
    },
  },
  {
    id: 'shared-responsibility',
    moduleId: 'cc-responsibility-cost',
    title: 'Shared Responsibility Model',
    description: 'Which security tasks the cloud provider handles and which you still handle.',
    lesson: {
      id: 'lesson-shared-responsibility',
      topicId: 'shared-responsibility',
      title: 'The Shared Responsibility Model',
      summary:
        'The provider secures the cloud infrastructure; you secure what you put in it — data, accounts, and configuration.',
      explanation:
        'Security in the cloud is shared. The cloud provider is responsible for the security OF the cloud: the physical data centres, the host hardware, the network fabric and the virtualisation layer. You are responsible for security IN the cloud: your data, your user accounts and passwords, the apps you build, the operating systems you install (in IaaS), and the access rules you configure. The exact split depends on the service model: with IaaS you manage almost everything above the virtualisation; with PaaS you manage less; with SaaS you mostly manage just your data and users. You are always responsible for your data and identities, no matter the model.',
      keyTerms: [
        { term: 'Security OF the cloud', meaning: 'Provider responsibilities — physical security, host, network, virtualisation.' },
        { term: 'Security IN the cloud', meaning: 'Customer responsibilities — data, identities, apps, access, OS (in IaaS).' },
        { term: 'Shared responsibility model', meaning: 'The formal division of security duties between provider and customer.' },
      ],
      example:
        'Azure secures the physical servers in its Johannesburg data centre, the networking between them, and the virtualisation software. But if a Kenyan retail company stores customer data in Azure Blob Storage, the company is responsible for deciding who can read that data, encrypting it correctly, and protecting the admin passwords. Azure cannot stop a customer from leaving a storage account public — that is the customer\u2019s job.',
      comparison: [
        { with: 'IaaS vs. PaaS vs. SaaS responsibility', detail: 'Your responsibility shrinks as you move from IaaS to PaaS to SaaS; the provider takes on more.' },
        { with: 'Data and identity', detail: 'Regardless of service model, you always own the security of your data and your user identities.' },
      ],
      examTip:
        '"Physical security", "host", "virtualisation" = provider. "Data", "identity", "access", "OS patching (IaaS)", "app code" = customer. Always remember: you are always responsible for your data and identities.',
      examKeywords: ['physical security', 'data', 'identity', 'access control', 'OS patching', 'app code'],
      misconceptions: [
        'The provider does NOT protect your data from your own misconfiguration (e.g. a public blob container).',
        'In SaaS you are still responsible for your data and which users can access it.',
        'The provider does not manage your users or passwords — that is always your job.',
      ],
      comprehension: [
        {
          id: 'shared-resp-q1',
          prompt: 'In the shared responsibility model, which task is always the customer\u2019s responsibility, even in SaaS?',
          options: ['Physical data centre security', 'Securing the data and user identities', 'Patching the virtualisation layer', 'Maintaining host hardware'],
          correctIndex: 1,
          explanation: 'Customers always own the security of their data and identities, regardless of the service model.',
        },
        {
          id: 'shared-resp-q2',
          prompt: 'Who is responsible for patching the operating system in an IaaS virtual machine?',
          options: ['The cloud provider', 'The customer', 'Both equally', 'A third-party auditor'],
          correctIndex: 1,
          explanation: 'In IaaS, the customer manages the operating system and everything above it, including patching.',
        },
      ],
    },
  },
  {
    id: 'consumption-pricing',
    moduleId: 'cc-responsibility-cost',
    title: 'Consumption-Based Pricing',
    description: 'How cloud billing works and why it differs from buying hardware.',
    lesson: {
      id: 'lesson-consumption-pricing',
      topicId: 'consumption-pricing',
      title: 'Consumption-Based Pricing',
      summary:
        'You pay only for the resources you actually use, measured by time, storage, or requests — like a utility bill.',
      explanation:
        'Cloud pricing is consumption-based: you pay for what you use, like water or electricity. Resources are metered — compute by the second or minute, storage by the gigabyte-month, bandwidth by the gigabyte transferred. Because you can start and stop resources at will, you can match spending to demand and avoid paying for idle hardware. This is the foundation of cloud elasticity and scalability.',
      keyTerms: [
        { term: 'Consumption-based pricing', meaning: 'Billed for actual resource usage rather than upfront purchase.' },
        { term: 'Metered billing', meaning: 'Each resource type has a unit (per second, per GB) that is measured and billed.' },
        { term: 'Elasticity', meaning: 'The ability to add or remove resources quickly to match demand.' },
      ],
      example:
        'An e-commerce site in Nairobi runs a sale on Black Friday. It scales its web servers from 2 to 20 instances for one day, then back to 2 the next day. With consumption pricing it pays for 20 instances only on that busy day, instead of owning 20 servers year-round like it would with CapEx.',
      comparison: [
        { with: 'Consumption vs. reserved', detail: 'Consumption is pay-as-you-go at standard rates; reserved instances commit to a term for a discount.' },
        { with: 'Consumption and elasticity', detail: 'Consumption pricing makes elasticity affordable — you only pay for what you scale to.' },
      ],
      examTip:
        'Watch for "pay only for what you use", "metered", "utility-style", "bill based on usage" — these all describe consumption-based pricing.',
      examKeywords: ['pay for what you use', 'metered', 'utility', 'per second', 'per GB', 'usage-based'],
      misconceptions: [
        'Consumption pricing does not mean all cloud is cheap — waste still costs money; you must monitor and right-size.',
        'Reserved and spot pricing are alternative models, not replacements for consumption pricing — they still measure usage.',
      ],
      comprehension: [
        {
          id: 'consumption-q1',
          prompt: 'A team runs a batch job for 90 minutes then deletes the resources. How are they billed?',
          options: [
            'A fixed monthly fee regardless of use',
            'For the 90 minutes of compute used',
            'For the entire month',
            'No charge because the job was short',
          ],
          correctIndex: 1,
          explanation: 'Consumption-based pricing bills for the actual resource time used — here, 90 minutes of compute.',
        },
      ],
    },
  },
];
