export type Dimension =
  | "Strategy"
  | "Data"
  | "Talent"
  | "Operations"
  | "Governance"
  | "Culture";

export interface Question {
  id: string;
  dimension: Dimension;
  text: string;
  description: string;
}

export const dimensions: Dimension[] = [
  "Strategy",
  "Data",
  "Talent",
  "Operations",
  "Governance",
  "Culture",
];

export const dimensionDescriptions: Record<Dimension, string> = {
  Strategy:
    "How well AI is integrated into your business strategy and competitive positioning.",
  Data: "The maturity of your data infrastructure, quality, and accessibility for AI workloads.",
  Talent:
    "Your organization's AI talent density, upskilling programs, and hiring pipeline.",
  Operations:
    "How effectively AI is embedded into day-to-day business processes and workflows.",
  Governance:
    "The robustness of your AI governance, risk management, and compliance frameworks.",
  Culture:
    "How receptive your organization's culture is to AI adoption and experimentation.",
};

export const dimensionColors: Record<Dimension, string> = {
  Strategy: "#6366f1",
  Data: "#06b6d4",
  Talent: "#f59e0b",
  Operations: "#10b981",
  Governance: "#ef4444",
  Culture: "#8b5cf6",
};

export const scaleLabels: Record<number, string> = {
  1: "Not started",
  2: "Early stage",
  3: "Developing",
  4: "Advanced",
  5: "Leading",
};

export const questions: Question[] = [
  // Strategy
  {
    id: "s1",
    dimension: "Strategy",
    text: "AI is explicitly referenced in our corporate strategy and board-level priorities.",
    description: "AI presence in strategic planning and executive alignment.",
  },
  {
    id: "s2",
    dimension: "Strategy",
    text: "We have identified specific business outcomes that AI will drive in the next 12 months.",
    description: "Clarity of AI-linked business objectives.",
  },
  {
    id: "s3",
    dimension: "Strategy",
    text: "Our AI investments are tied to measurable KPIs and ROI targets.",
    description: "Investment accountability and outcome tracking.",
  },
  {
    id: "s4",
    dimension: "Strategy",
    text: "We actively monitor competitors' AI capabilities and adjust our strategy accordingly.",
    description: "Competitive intelligence and adaptive planning.",
  },
  {
    id: "s5",
    dimension: "Strategy",
    text: "Our leadership team can articulate a clear AI vision that differentiates us in the market.",
    description: "Executive AI literacy and narrative clarity.",
  },

  // Data
  {
    id: "d1",
    dimension: "Data",
    text: "Our core business data is centralized, cataloged, and accessible to authorized teams.",
    description: "Data infrastructure maturity and accessibility.",
  },
  {
    id: "d2",
    dimension: "Data",
    text: "We have established data quality standards and automated validation processes.",
    description: "Data quality management and assurance.",
  },
  {
    id: "d3",
    dimension: "Data",
    text: "Our data pipelines can support real-time or near-real-time AI model inference.",
    description: "Data pipeline performance and latency.",
  },
  {
    id: "d4",
    dimension: "Data",
    text: "We have clear data ownership, lineage tracking, and metadata management practices.",
    description: "Data governance and lineage maturity.",
  },
  {
    id: "d5",
    dimension: "Data",
    text: "Our data architecture is designed to scale with increasing AI workload demands.",
    description: "Scalability and future-readiness of data systems.",
  },

  // Talent
  {
    id: "t1",
    dimension: "Talent",
    text: "We have dedicated AI/ML roles with clear career paths and competitive compensation.",
    description: "AI talent structure and retention.",
  },
  {
    id: "t2",
    dimension: "Talent",
    text: "Non-technical staff receive regular AI literacy training relevant to their roles.",
    description: "Organization-wide AI upskilling.",
  },
  {
    id: "t3",
    dimension: "Talent",
    text: "We have a reliable pipeline for recruiting AI talent from top institutions or industry.",
    description: "AI hiring pipeline strength.",
  },
  {
    id: "t4",
    dimension: "Talent",
    text: "Cross-functional teams regularly collaborate on AI projects with business stakeholders.",
    description: "Interdisciplinary collaboration and knowledge sharing.",
  },
  {
    id: "t5",
    dimension: "Talent",
    text: "Our teams have access to modern AI tooling, compute resources, and experimentation environments.",
    description: "Tooling and infrastructure support for practitioners.",
  },

  // Operations
  {
    id: "o1",
    dimension: "Operations",
    text: "AI models are deployed in production and actively drive business decisions or automation.",
    description: "AI production deployment maturity.",
  },
  {
    id: "o2",
    dimension: "Operations",
    text: "We have MLOps practices including model versioning, monitoring, and automated retraining.",
    description: "ML operations and lifecycle management.",
  },
  {
    id: "o3",
    dimension: "Operations",
    text: "AI-powered workflows have reduced cycle time or cost in at least one core process.",
    description: "Measurable operational impact of AI.",
  },
  {
    id: "o4",
    dimension: "Operations",
    text: "We can deploy new AI models from development to production within days, not months.",
    description: "AI deployment velocity and agility.",
  },
  {
    id: "o5",
    dimension: "Operations",
    text: "Our AI systems integrate with existing enterprise software and business workflows.",
    description: "Integration maturity and interoperability.",
  },

  // Governance
  {
    id: "g1",
    dimension: "Governance",
    text: "We have a formal AI governance framework with defined roles, policies, and review processes.",
    description: "Governance structure and formalization.",
  },
  {
    id: "g2",
    dimension: "Governance",
    text: "All AI models undergo bias, fairness, and safety reviews before production deployment.",
    description: "Responsible AI review and compliance.",
  },
  {
    id: "g3",
    dimension: "Governance",
    text: "We maintain an inventory of all AI models in use with documented risk assessments.",
    description: "AI model inventory and risk tracking.",
  },
  {
    id: "g4",
    dimension: "Governance",
    text: "Our AI practices comply with relevant regulations (e.g., EU AI Act, GDPR, industry-specific).",
    description: "Regulatory compliance readiness.",
  },
  {
    id: "g5",
    dimension: "Governance",
    text: "We have incident response procedures specifically for AI system failures or harms.",
    description: "AI incident response and remediation capability.",
  },

  // Culture
  {
    id: "c1",
    dimension: "Culture",
    text: "Employees across the organization actively experiment with AI tools in their daily work.",
    description: "Grassroots AI adoption and experimentation.",
  },
  {
    id: "c2",
    dimension: "Culture",
    text: "Leadership openly champions AI adoption and allocates time for AI experimentation.",
    description: "Executive sponsorship and tone from the top.",
  },
  {
    id: "c3",
    dimension: "Culture",
    text: "Failure in AI experiments is treated as learning, not penalized.",
    description: "Psychological safety for innovation.",
  },
  {
    id: "c4",
    dimension: "Culture",
    text: "We regularly share AI success stories and lessons learned across the organization.",
    description: "Knowledge sharing and internal communication.",
  },
  {
    id: "c5",
    dimension: "Culture",
    text: "Teams proactively identify opportunities to apply AI without top-down mandates.",
    description: "Bottom-up innovation and initiative.",
  },
];

export function getQuestionsByDimension(dimension: Dimension): Question[] {
  return questions.filter((q) => q.dimension === dimension);
}
