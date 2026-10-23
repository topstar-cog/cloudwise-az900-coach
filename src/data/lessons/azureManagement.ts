import type { Topic } from '../../types';

export const azureManagementTopics: Topic[] = [
  {
    id: 'resource-groups',
    moduleId: 'mg-organising',
    title: 'Resource Groups',
    description: 'How resources are grouped together for lifecycle and management.',
    lesson: {
      id: 'lesson-resource-groups',
      topicId: 'resource-groups',
      title: 'Resource Groups',
      summary:
        'A resource group is a container that holds related Azure resources so they can be managed together as a unit.',
      explanation:
        'Every Azure resource lives inside a resource group. A resource group is a logical container that holds related resources for a single solution — for example, a web app, its database and its storage account might share one resource group. This lets you manage them together: apply access permissions, tags and policies at the group level, see all related resources in one place, and delete the whole solution with one action. A resource can only exist in one resource group at a time, but you can move resources between groups. Resources in one group can even live in different regions — the resource group itself is just a logical grouping, not a region.',
      keyTerms: [
        { term: 'Resource group', meaning: 'A logical container holding related Azure resources managed together.' },
        { term: 'Resource', meaning: 'A single item created in Azure — a VM, database, storage account, etc.' },
        { term: 'Lifecycle', meaning: 'Resources in a group share create/update/delete management as a unit.' },
      ],
      example:
        'A Kenyan startup builds a customer portal: a web app, a SQL database and a storage account. They put all three in a single resource group called "portal-prod". They apply the same access policy and tags to the group, and when they retire the portal they delete the whole resource group to clean up everything at once.',
      comparison: [
        { with: 'Resource group vs. subscription', detail: 'A subscription contains many resource groups; each resource group belongs to exactly one subscription.' },
        { with: 'Resource group vs. region', detail: 'A resource group is not tied to a single region — it can hold resources from different regions.' },
      ],
      examTip:
        '"Group related resources", "manage as a unit", "apply permissions/tags together" = resource group. Remember a resource belongs to exactly one resource group.',
      examKeywords: ['logical container', 'manage together', 'group of resources', 'single resource group'],
      misconceptions: [
        'A resource group does not have to be in one region — it can hold resources from multiple regions.',
        'A resource can be moved between resource groups, but it cannot be in two at once.',
      ],
      comprehension: [
        {
          id: 'rg-q1',
          prompt: 'Which statement about resource groups is correct?',
          options: [
            'A resource can be in multiple resource groups at once.',
            'A resource group can contain resources from different regions.',
            'A resource group must contain only one resource.',
            'A resource group is the same as a subscription.',
          ],
          correctIndex: 1,
          explanation: 'A resource group is a logical container; it can hold resources deployed in different regions.',
        },
      ],
    },
  },
  {
    id: 'subscriptions-management-groups',
    moduleId: 'mg-organising',
    title: 'Subscriptions & Management Groups',
    description: 'The higher-level containers that group resource groups and subscriptions.',
    lesson: {
      id: 'lesson-subs-mg',
      topicId: 'subscriptions-management-groups',
      title: 'Subscriptions & Management Groups',
      summary:
        'A subscription is the billing and access boundary for resource groups. Management groups group subscriptions to apply policies across them.',
      explanation:
        'An Azure subscription is the boundary for billing, quotas and access — all resource groups and their resources live inside a subscription, and usage is billed per subscription. An organisation usually has several subscriptions to separate environments (dev/test/prod) or departments. A management group sits above subscriptions and lets you manage multiple subscriptions together: you can apply policies and access rules once at the management-group level and they inherit down to all subscriptions inside it. This hierarchy — management groups containing subscriptions, containing resource groups, containing resources — is how Azure lets you scale governance across a whole organisation.',
      keyTerms: [
        { term: 'Subscription', meaning: 'The billing, quota and access boundary that contains resource groups.' },
        { term: 'Management group', meaning: 'A container above subscriptions used to apply policies and access across many subscriptions.' },
        { term: 'Inheritance', meaning: 'Policies and access set at a higher level apply to everything below it.' },
      ],
      example:
        'A large bank has separate subscriptions for "Retail", "Corporate" and "Sandbox". It puts all three under one management group called "BankCloud" and applies a single policy at that level — "no resources in East US" — which inherits down to all three subscriptions, so nobody in any team can create resources in that region.',
      comparison: [
        { with: 'Subscription vs. resource group', detail: 'A subscription contains resource groups and is the billing boundary; a resource group holds related resources.' },
        { with: 'Subscription vs. management group', detail: 'A subscription is the billing unit; a management group sits above subscriptions to govern many of them at once.' },
      ],
      examTip:
        'Billing boundary, quotas, access limit = subscription. Manage many subscriptions together, apply policy once = management group. Hierarchy: management group → subscription → resource group → resource.',
      examKeywords: ['billing boundary', 'quotas', 'inheritance', 'across subscriptions', 'hierarchy'],
      misconceptions: [
        'A subscription is not the same as a resource group — subscriptions hold resource groups and handle billing.',
        'Management groups are not required for a single subscription; they matter most when you have many subscriptions to govern.',
      ],
      comprehension: [
        {
          id: 'subs-q1',
          prompt: 'You want to apply one Azure Policy to ten different subscriptions at once. What should you use?',
          options: ['A resource group', 'A management group containing those subscriptions', 'A single subscription', 'A resource group tag'],
          correctIndex: 1,
          explanation: 'A management group sits above subscriptions and lets you apply policies that inherit down to all subscriptions inside it.',
        },
      ],
    },
  },
  {
    id: 'rbac',
    moduleId: 'mg-governance',
    title: 'Role-Based Access Control (RBAC)',
    description: 'How Azure grants access to resources through roles assigned to identities.',
    lesson: {
      id: 'lesson-rbac',
      topicId: 'rbac',
      title: 'Role-Based Access Control (RBAC)',
      summary:
        'RBAC controls who can do what on Azure resources, by assigning roles (a set of permissions) to users, groups or service principals at a scope.',
      explanation:
        'Role-Based Access Control (RBAC) is how Azure authorises actions on resources. Each role is a collection of permissions — for example, the "Virtual Machine Contributor" role lets someone start and restart VMs but not delete them. You assign a role to a security principal (a user, group or service principal) at a scope (management group, subscription, resource group or single resource). The assignment grants the permissions of that role at that scope. Permissions inherit downward — a role assigned at the subscription level applies to all resource groups and resources inside it. The principle of least privilege says you should give users only the access they need, no more.',
      keyTerms: [
        { term: 'Security principal', meaning: 'The identity requesting access — a user, group or service principal.' },
        { term: 'Role definition', meaning: 'A named set of permissions (e.g. Reader, Contributor, Owner).' },
        { term: 'Scope', meaning: 'The level the role applies at — management group, subscription, resource group or resource.' },
        { term: 'Role assignment', meaning: 'Binding a role to a principal at a scope, granting those permissions there.' },
      ],
      example:
        'A Nairobi company has a DevOps team that needs to restart VMs but must not change network settings. The admin assigns the "Virtual Machine Contributor" role to the DevOps group at the "production" resource group scope. Now every member of DevOps can manage VMs in that group only — they cannot touch resources elsewhere or alter networking.',
      comparison: [
        { with: 'RBAC vs. Azure Policy', detail: 'RBAC controls who can do what; Azure Policy controls what configurations are allowed regardless of who is acting.' },
        { with: 'Reader vs. Contributor vs. Owner', detail: 'Reader can view; Contributor can change resources; Owner can also manage access (assign roles).' },
      ],
      examTip:
        'Who can do what, on what scope = RBAC. Least privilege = give the smallest role that lets the job be done. Inheritance = subscription-level assignment flows down to resources.',
      examKeywords: ['least privilege', 'role assignment', 'scope', 'who can do what', 'inheritance'],
      misconceptions: [
        'RBAC is not the same as Azure Policy — RBAC controls who can act; Policy controls whether a configuration is allowed.',
        'Owner and Contributor are different — only Owner can manage role assignments.',
      ],
      comprehension: [
        {
          id: 'rbac-q1',
          prompt: 'You want a user to be able to view resources but not change them. Which built-in role fits best?',
          options: ['Owner', 'Contributor', 'Reader', 'User Access Administrator'],
          correctIndex: 2,
          explanation: 'The Reader role allows viewing resources without any change permissions — a good example of least privilege.',
        },
      ],
    },
  },
  {
    id: 'azure-policy',
    moduleId: 'mg-governance',
    title: 'Azure Policy',
    description: 'Enforcing rules on resource configurations across your Azure environment.',
    lesson: {
      id: 'lesson-azure-policy',
      topicId: 'azure-policy',
      title: 'Azure Policy',
      summary:
        'Azure Policy evaluates resources against rules and blocks non-compliant resources or marks them for remediation.',
      explanation:
        'Azure Policy is a governance service that enforces rules over your Azure resources. A policy definition describes what is allowed — for example, "only specific regions" or "all storage accounts must use HTTPS" or "resources must have a Cost Centre tag". You assign the policy at a scope (management group, subscription or resource group) and it applies to everything below. When someone tries to create or update a resource, Azure Policy checks it against the rules. Non-compliant resources are blocked from creation or flagged as non-compliant. Policy can also remediate existing non-compliant resources. Unlike RBAC, which controls who can act, Policy controls what configurations are allowed regardless of who is acting.',
      keyTerms: [
        { term: 'Policy definition', meaning: 'A rule describing what configurations are allowed or denied.' },
        { term: 'Policy assignment', meaning: 'Applying a policy definition at a specific scope.' },
        { term: 'Initiative', meaning: 'A group of policy definitions packaged together for a single goal.' },
        { term: 'Non-compliant', meaning: 'A resource that fails the policy check and is blocked or flagged.' },
      ],
      example:
        'A Kenyan bank requires every Azure resource to carry a "Department" tag for chargeback. The admin creates a policy "require Department tag" and assigns it at the management group level. When a developer forgets the tag, Azure blocks the resource creation with a clear policy message, so no untagged resources can exist anywhere in the bank\u2019s subscriptions.',
      comparison: [
        { with: 'Azure Policy vs. RBAC', detail: 'RBAC controls who can act; Policy controls what they can create or configure, even if they have permission to act.' },
        { with: 'Policy vs. tags alone', detail: 'Tags alone are optional metadata; Policy can enforce that tags exist or have specific values.' },
      ],
      examTip:
        'Enforce rules, block non-compliant, standardise configurations, ensure tags = Azure Policy. It complements RBAC; it does not replace it.',
      examKeywords: ['enforce', 'non-compliant', 'allowed locations', 'require tags', 'governance'],
      misconceptions: [
        'Azure Policy does not replace RBAC — both work together. RBAC says who can act; Policy says what configurations are valid.',
        'Policy is not just advisory — it can block creation of non-compliant resources outright.',
      ],
      comprehension: [
        {
          id: 'policy-q1',
          prompt: 'Which service would you use to block creation of storage accounts in regions outside Kenya, no matter who is creating them?',
          options: ['RBAC', 'Azure Policy', 'Azure Advisor', 'Azure Monitor'],
          correctIndex: 1,
          explanation: 'Azure Policy can enforce allowed locations for resources and block creation of resources in non-approved regions, regardless of who is acting.',
        },
      ],
    },
  },
  {
    id: 'tags',
    moduleId: 'mg-governance',
    title: 'Resource Tags',
    description: 'Metadata labels that help organise, filter and charge back Azure resources.',
    lesson: {
      id: 'lesson-tags',
      topicId: 'tags',
      title: 'Resource Tags',
      summary:
        'Tags are name/value pairs applied to resources for grouping, billing breakdown, automation and ownership.',
      explanation:
        'A tag is a name/value pair you attach to an Azure resource, resource group or subscription — for example Department = Finance or Environment = Production. Tags are metadata: they do not change how the resource runs, but they let you organise, filter and report on resources. Common uses are chargeback (splitting the bill by department), environment labelling (dev/test/prod), and ownership (who owns this resource). Azure Policy can enforce that certain tags exist or have allowed values. Tags are not inherited automatically — a tag on a resource group does not automatically apply to resources inside it, though Policy can enforce that too.',
      keyTerms: [
        { term: 'Tag', meaning: 'A name/value pair applied to a resource for metadata like department or environment.' },
        { term: 'Chargeback', meaning: 'Splitting cloud costs by tag to bill each department for its usage.' },
      ],
      example:
        'A Kenyan telco tags every resource with "CostCentre" and "Environment". At month end the finance team uses these tags in Azure Cost Management to produce a bill per cost centre and show how much dev vs. prod is costing — no manual spreadsheets needed.',
      comparison: [
        { with: 'Tags vs. resource groups', detail: 'Resource groups group resources for lifecycle; tags label resources for reporting and billing across groups.' },
        { with: 'Tags vs. Policy', detail: 'Tags are metadata; Policy can enforce that tags exist or have specific values.' },
      ],
      examTip:
        'Metadata, name/value, organise, filter billing, chargeback by department = tags.',
      examKeywords: ['name/value', 'metadata', 'chargeback', 'filter', 'billing breakdown'],
      misconceptions: [
        'Tags on a resource group do NOT automatically apply to resources inside it — you need Azure Policy to enforce inheritance.',
        'Tags are metadata; they do not affect the actual behaviour of a resource.',
      ],
      comprehension: [
        {
          id: 'tags-q1',
          prompt: 'A finance team wants to break down the Azure bill by department. What is the simplest way to enable this?',
          options: [
            'Create a new subscription per department',
            'Apply a "Department" tag to each resource and use Cost Management to group by it',
            'Delete unused resource groups',
            'Use Azure Policy to block new VMs',
          ],
          correctIndex: 1,
          explanation: 'Tags are the standard way to label resources by department; Cost Management can then group costs by tag for chargeback.',
        },
      ],
    },
  },
  {
    id: 'conditional-access',
    moduleId: 'mg-governance',
    title: 'Microsoft Entra Conditional Access & MFA',
    description: 'Adaptive access policies and multi-factor authentication in Entra ID.',
    lesson: {
      id: 'lesson-conditional-access',
      topicId: 'conditional-access',
      title: 'Microsoft Entra Conditional Access & MFA',
      summary:
        'Conditional Access evaluates sign-in conditions (user, location, device, risk) and enforces rules like requiring MFA. MFA asks for extra proof beyond a password.',
      explanation:
        'Conditional Access is a feature of Microsoft Entra ID that lets you apply adaptive access rules at sign-in time. When a user signs in, Entra ID evaluates conditions such as who the user is, their location, the device they are using, and the sign-in risk. Based on those conditions, it can allow access, block access, or require extra steps — most commonly requiring multi-factor authentication (MFA). MFA asks the user for an additional proof beyond their password, such as a one-time code from their phone or a biometric check, so that a stolen password alone is not enough to get in. Together, Conditional Access and MFA let an organisation enforce "if-then" policies: if sign-in is risky, then require MFA; if sign-in is from an unknown country, then block.',
      keyTerms: [
        { term: 'Conditional Access', meaning: 'Entra ID policies that evaluate sign-in conditions and enforce access rules.' },
        { term: 'MFA', meaning: 'Multi-factor authentication — extra proof beyond a password (code, biometric, app approval).' },
        { term: 'Sign-in risk', meaning: 'Entra ID\u2019s estimate of how likely a sign-in is to be compromised, used to trigger stricter controls.' },
      ],
      example:
        'A bank in Nairobi uses Conditional Access: employees in the office IP range can sign in with just a password. But if the same account signs in from a new country, Conditional Access triggers MFA and asks the employee to approve the sign-in on their phone. If the sign-in is judged high-risk, access is blocked entirely until the IT team reviews it.',
      comparison: [
        { with: 'Conditional Access vs. MFA', detail: 'MFA is one of the controls Conditional Access can enforce; Conditional Access is the policy engine that decides when MFA is required.' },
        { with: 'Conditional Access vs. RBAC', detail: 'RBAC decides what a signed-in user can do; Conditional Access decides whether and how they are allowed to sign in.' },
      ],
      examTip:
        '"If-then sign-in policy", "require MFA when risk is high", "block unknown location" = Conditional Access. "Extra proof beyond password" = MFA.',
      examKeywords: ['if-then', 'sign-in risk', 'require MFA', 'location-based', 'adaptive access'],
      misconceptions: [
        'Conditional Access is not the same as RBAC — Conditional Access gates the sign-in, RBAC gates the actions after sign-in.',
        'MFA does not replace passwords — it adds a second factor on top of them.',
      ],
      comprehension: [
        {
          id: 'ca-q1',
          prompt: 'A policy says: "If a user signs in from an unknown country, require multi-factor authentication." Which Entra ID feature provides this?',
          options: ['RBAC', 'Azure Policy', 'Conditional Access', 'Azure Advisor'],
          correctIndex: 2,
          explanation: 'Conditional Access evaluates sign-in conditions like location and can require MFA when conditions are met.',
        },
        {
          id: 'ca-q2',
          prompt: 'What is the main purpose of multi-factor authentication?',
          options: [
            'To replace passwords entirely',
            'To require an extra proof beyond a password so a stolen password alone is not enough',
            'To assign users to resource groups',
            'To reduce the monthly cloud bill',
          ],
          correctIndex: 1,
          explanation: 'MFA adds a second factor on top of the password, so even if the password is stolen the account is still protected.',
        },
      ],
    },
  },
  {
    id: 'cost-management',
    moduleId: 'mg-cost-monitor',
    title: 'Azure Cost Management & Pricing Tools',
    description: 'Tools to analyse, forecast and optimise Azure spending.',
    lesson: {
      id: 'lesson-cost-management',
      topicId: 'cost-management',
      title: 'Azure Cost Management & Pricing Tools',
      summary:
        'Cost Management analyses and forecasts spend. The pricing calculator estimates costs; the TCO calculator compares cloud vs. on-premises.',
      explanation:
        'Azure Cost Management is a free service that helps you see where your money is going, set budgets, and receive alerts when spend approaches limits. You can break costs down by subscription, resource group, resource or tag, and forecast future spend. The Azure pricing calculator lets you estimate the cost of a planned set of resources before you deploy them. The Total Cost of Ownership (TCO) calculator helps compare the cost of running a workload on Azure versus keeping it on-premises, factoring in hardware, power, facilities and IT labour. Together these tools support cost governance: plan with the calculators, monitor with Cost Management, and act on alerts.',
      keyTerms: [
        { term: 'Cost Management', meaning: 'Azure service to analyse, budget and forecast cloud spend.' },
        { term: 'Pricing calculator', meaning: 'A tool to estimate the cost of Azure resources before deployment.' },
        { term: 'TCO calculator', meaning: 'Compares the total cost of running a workload on Azure vs. on-premises.' },
        { term: 'Budget', meaning: 'A spend limit you set in Cost Management that triggers alerts when approached.' },
      ],
      example:
        'A startup planning to host an app on Azure uses the pricing calculator to estimate that 2 App Service instances plus a SQL database will cost about USD 180 per month. Once running, they set a budget of USD 200 in Cost Management; if spend crosses 80% of budget they get an email alert and can investigate before overspending.',
      comparison: [
        { with: 'Pricing calculator vs. TCO calculator', detail: 'Pricing calculator estimates Azure costs; TCO calculator compares Azure vs. on-premises total cost including facilities and labour.' },
        { with: 'Cost Management vs. budgets', detail: 'Cost Management is the analysis tool; budgets are thresholds you set within it to trigger alerts.' },
      ],
      examTip:
        'Estimate Azure cost before deploying = pricing calculator. Compare cloud vs. on-premises total cost = TCO calculator. Monitor and budget actual spend = Cost Management.',
      examKeywords: ['estimate', 'pricing calculator', 'TCO', 'budget', 'forecast', 'alert'],
      misconceptions: [
        'The TCO calculator is not the same as the pricing calculator — TCO compares on-prem vs cloud total cost; pricing just prices Azure resources.',
        'Cost Management budgets alert you; they do not automatically stop spend unless combined with Azure Policy or automation.',
      ],
      comprehension: [
        {
          id: 'cost-q1',
          prompt: 'You want to estimate the monthly cost of running 3 virtual machines and a storage account on Azure before deploying them. Which tool should you use?',
          options: ['TCO calculator', 'Azure pricing calculator', 'Azure Advisor', 'Azure Monitor'],
          correctIndex: 1,
          explanation: 'The Azure pricing calculator estimates the cost of planned Azure resources before you deploy them.',
        },
        {
          id: 'cost-q2',
          prompt: 'Which tool compares the total cost of running a workload on Azure versus keeping it in your own on-premises data centre?',
          options: ['Azure pricing calculator', 'TCO calculator', 'Azure Policy', 'Azure Service Health'],
          correctIndex: 1,
          explanation: 'The TCO (Total Cost of Ownership) calculator compares cloud vs. on-premises costs, including power, facilities and labour.',
        },
      ],
    },
  },
  {
    id: 'azure-advisor',
    moduleId: 'mg-cost-monitor',
    title: 'Azure Advisor',
    description: 'Personalised best-practice recommendations across cost, security, reliability and more.',
    lesson: {
      id: 'lesson-advisor',
      topicId: 'azure-advisor',
      title: 'Azure Advisor',
      summary:
        'Azure Advisor scans your resources and gives personalised recommendations to improve cost, security, reliability, performance and operational excellence.',
      explanation:
        'Azure Advisor is a free service that analyses your Azure resources and produces personalised recommendations to follow best practices. It groups recommendations into categories: Cost (e.g. shut down idle VMs), Security (via Microsoft Defender for Cloud), Reliability (e.g. add availability zones), Performance (e.g. upgrade to a newer SKU), and Operational Excellence (e.g. set up service health alerts). Each recommendation explains the issue and suggests a concrete action. Advisor is read-only and advisory — it does not change resources for you, but you can act on each recommendation directly from the portal.',
      keyTerms: [
        { term: 'Advisor', meaning: 'Azure service that provides personalised best-practice recommendations.' },
        { term: 'Recommendation categories', meaning: 'Cost, Security, Reliability, Performance, Operational Excellence.' },
      ],
      example:
        'A Kenyan startup opens Azure Advisor and sees a Cost recommendation: "Two VMs have been idle for 30 days — shut them down to save USD 90/month." They also see a Reliability recommendation: "Your database has no geo-redundant backup — enable it." They act on both directly from Advisor.',
      comparison: [
        { with: 'Advisor vs. Cost Management', detail: 'Cost Management focuses on spend analysis and budgets; Advisor gives broader best-practice recommendations including cost, security and reliability.' },
        { with: 'Advisor vs. Azure Policy', detail: 'Advisor recommends; Policy enforces. Advisor is advisory, Policy is mandatory.' },
      ],
      examTip:
        'Personalised recommendations, best practices, cost/security/reliability/performance categories = Azure Advisor.',
      examKeywords: ['recommendations', 'best practices', 'cost', 'reliability', 'performance', 'advisory'],
      misconceptions: [
        'Advisor is advisory only — it does not enforce or change resources automatically.',
        'Advisor is not the same as Azure Monitor — Monitor collects telemetry and alerts; Advisor gives best-practice guidance.',
      ],
      comprehension: [
        {
          id: 'advisor-q1',
          prompt: 'Which Azure service analyses your resources and offers personalised best-practice recommendations across cost, security, reliability and performance?',
          options: ['Azure Monitor', 'Azure Advisor', 'Azure Policy', 'Azure Service Health'],
          correctIndex: 1,
          explanation: 'Azure Advisor scans your resources and produces personalised recommendations in cost, security, reliability, performance and operational excellence.',
        },
      ],
    },
  },
  {
    id: 'azure-monitor',
    moduleId: 'mg-cost-monitor',
    title: 'Azure Monitor & Autoscale',
    description: 'Collecting telemetry, alerting and automatically scaling resources.',
    lesson: {
      id: 'lesson-azure-monitor',
      topicId: 'azure-monitor',
      title: 'Azure Monitor & Autoscale',
      summary:
        'Azure Monitor collects metrics and logs from resources, raises alerts, and can trigger Autoscale to add or remove resources based on demand.',
      explanation:
        'Azure Monitor is the platform service that collects telemetry from your Azure resources and applications. It gathers two kinds of data: metrics (numeric values like CPU percentage sampled at intervals) and logs (detailed records of events and activity). You can visualise this data in dashboards and set alert rules — for example, "alert me when average CPU exceeds 80% for 5 minutes". Azure Monitor also powers Autoscale: you define rules that automatically add or remove resource instances based on metrics, so a web app can scale out when traffic spikes and scale back in when it drops, keeping performance high and cost low.',
      keyTerms: [
        { term: 'Metrics', meaning: 'Numeric telemetry like CPU % or request count, sampled at regular intervals.' },
        { term: 'Logs', meaning: 'Detailed event and activity records stored and queried in Log Analytics.' },
        { term: 'Alert rule', meaning: 'A rule that fires a notification or action when a metric crosses a threshold.' },
        { term: 'Autoscale', meaning: 'Automatically adjusting the number of resource instances based on metrics.' },
      ],
      example:
        'An e-commerce site in Nairobi uses Azure Monitor to track CPU on its App Service. They set an autoscale rule: if average CPU stays above 75% for 10 minutes, add one instance (up to a max of 10); if it drops below 40% for 15 minutes, remove one. During the December sale traffic spikes, the app scales up automatically to keep response times fast, then scales back down at night to save money.',
      comparison: [
        { with: 'Azure Monitor vs. Azure Advisor', detail: 'Monitor collects telemetry and alerts on current state; Advisor gives proactive best-practice recommendations.' },
        { with: 'Azure Monitor vs. Service Health', detail: 'Monitor is about your resources; Service Health is about Azure platform issues affecting your region or services.' },
      ],
      examTip:
        'Telemetry, metrics, logs, alerts, dashboards, autoscale based on metrics = Azure Monitor.',
      examKeywords: ['telemetry', 'metrics', 'logs', 'alerts', 'autoscale', 'CPU threshold'],
      misconceptions: [
        'Autoscale is not the same as manually resizing a VM — autoscale changes the count of instances, not the size.',
        'Azure Monitor is not the same as Azure Advisor — Monitor tracks current state; Advisor recommends improvements.',
      ],
      comprehension: [
        {
          id: 'monitor-q1',
          prompt: 'A team wants their web app to add more instances automatically when CPU stays above 75% for 10 minutes. Which Azure capability provides this?',
          options: ['Azure Advisor', 'Azure Policy', 'Azure Monitor Autoscale', 'Azure Service Health'],
          correctIndex: 2,
          explanation: 'Azure Monitor Autoscale adjusts the number of resource instances automatically based on metric rules like CPU usage.',
        },
      ],
    },
  },
  {
    id: 'service-health',
    moduleId: 'mg-cost-monitor',
    title: 'Azure Service Health',
    description: 'Personalised view of Azure platform issues affecting your resources.',
    lesson: {
      id: 'lesson-service-health',
      topicId: 'service-health',
      title: 'Azure Service Health',
      summary:
        'Service Health tells you about Azure platform problems — service issues, planned maintenance, and health advisories — that affect your specific resources.',
      explanation:
        'Azure Service Health gives you a personalised view of Azure platform events that affect your resources. It has three parts. Service issues show ongoing problems in Azure that affect you, like an outage in your region. Planned maintenance tells you about upcoming Azure infrastructure changes that could affect your resources, so you can prepare. Health advisories cover issues like quota changes or retirements of services you use. You can set alerts so the right people get notified when something affects your subscriptions or regions. This is different from Azure Monitor, which tracks the performance and health of your own resources.',
      keyTerms: [
        { term: 'Service issues', meaning: 'Ongoing Azure platform problems affecting your resources.' },
        { term: 'Planned maintenance', meaning: 'Upcoming Azure infrastructure changes you should prepare for.' },
        { term: 'Health advisories', meaning: 'Notices about quota changes, service retirements or other issues affecting you.' },
      ],
      example:
        'A Nairobi startup gets a Service Health alert that Azure Storage in South Africa North will have planned maintenance on Saturday from 2am to 4am. They schedule their backup jobs to avoid that window so they do not fail, and they put a notice on their status page for users.',
      comparison: [
        { with: 'Service Health vs. Azure Monitor', detail: 'Service Health reports on Azure platform problems; Azure Monitor reports on the health of your own resources.' },
        { with: 'Service Health vs. Advisor', detail: 'Service Health is about live and upcoming platform events; Advisor is about long-term best-practice recommendations.' },
      ],
      examTip:
        'Platform outages, planned maintenance, advisories, "is Azure itself having problems?" = Service Health. Your own app\u2019s CPU or errors = Azure Monitor.',
      examKeywords: ['platform issues', 'planned maintenance', 'health advisories', 'outage', 'region issue'],
      misconceptions: [
        'Service Health is not the same as Azure Monitor — Service Health is about the Azure platform; Monitor is about your resources.',
        'Service Health is personalised — it shows only events that affect your subscriptions and regions, not every Azure issue in the world.',
      ],
      comprehension: [
        {
          id: 'sh-q1',
          prompt: 'Which Azure service tells you about planned maintenance and outages in Azure that affect your specific subscriptions and regions?',
          options: ['Azure Monitor', 'Azure Advisor', 'Azure Service Health', 'Azure Policy'],
          correctIndex: 2,
          explanation: 'Azure Service Health gives a personalised view of Azure platform issues, planned maintenance and health advisories affecting your resources.',
        },
      ],
    },
  },
  {
    id: 'cli-cloud-shell',
    moduleId: 'mg-cost-monitor',
    title: 'Azure CLI & Azure Cloud Shell',
    description: 'Command-line tools and an in-browser shell for managing Azure.',
    lesson: {
      id: 'lesson-cli-cloud-shell',
      topicId: 'cli-cloud-shell',
      title: 'Azure CLI & Azure Cloud Shell',
      summary:
        'The Azure CLI is a cross-platform command-line tool for managing Azure. Cloud Shell is an in-browser, authenticated shell with the CLI pre-installed.',
      explanation:
        'The Azure CLI is a cross-platform command-line tool you install on your own machine to create and manage Azure resources with commands like `az group create`. Azure PowerShell is a similar tool using cmdlets for those who prefer PowerShell. Azure Cloud Shell is an interactive, browser-accessible shell that comes with the Azure CLI and PowerShell already installed and authenticated — you open it from the Azure portal and start running commands immediately, with no local installation. Cloud Shell requires an Azure file share to persist your files, and it gives you the same commands you would run locally. These tools all talk to Azure Resource Manager, so anything you can do in the portal you can do from the CLI or Cloud Shell.',
      keyTerms: [
        { term: 'Azure CLI', meaning: 'A cross-platform command-line tool for managing Azure resources.' },
        { term: 'Azure PowerShell', meaning: 'A set of cmdlets for managing Azure from Windows PowerShell or cross-platform PowerShell.' },
        { term: 'Cloud Shell', meaning: 'An authenticated, browser-based shell with Azure CLI and PowerShell pre-installed.' },
      ],
      example:
        'A developer in Kisumu is on a borrowed laptop without admin rights and cannot install software. They sign in to the Azure portal, open Cloud Shell, and run `az vm list` to see all virtual machines in their subscription — no installation needed, and they are already authenticated.',
      comparison: [
        { with: 'Cloud Shell vs. local CLI', detail: 'Cloud Shell is browser-based, pre-installed and authenticated; local CLI requires installation and sign-in but works offline-of-portal and in scripts.' },
        { with: 'CLI vs. ARM templates', detail: 'CLI is imperative (step-by-step commands); ARM templates are declarative (desired state). Both go through ARM.' },
      ],
      examTip:
        'Browser-based shell, pre-authenticated, no install = Cloud Shell. Cross-platform command line on your machine = Azure CLI.',
      examKeywords: ['browser-based', 'authenticated', 'no install', 'cross-platform', 'command line'],
      misconceptions: [
        'Cloud Shell is not a full virtual machine — it is a temporary shell session with your files persisted in an Azure file share.',
        'The CLI is not the only way to manage Azure — the portal, PowerShell, REST API and SDKs all go through the same ARM layer.',
      ],
      comprehension: [
        {
          id: 'cli-q1',
          prompt: 'You are on a computer where you cannot install software but you need to run Azure commands. Which option lets you manage Azure from the browser with no install?',
          options: ['Install Azure CLI locally', 'Azure Cloud Shell', 'Download a VM image', 'Use Azure Advisor'],
          correctIndex: 1,
          explanation: 'Azure Cloud Shell is an in-browser, pre-authenticated shell with the Azure CLI and PowerShell already installed.',
        },
      ],
    },
  },
];
