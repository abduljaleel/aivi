import { type Dimension, dimensions } from "./questions";

export interface DimensionScore {
  dimension: Dimension;
  score: number;
  maxScore: number;
  average: number;
}

export interface Assessment {
  id: string;
  name: string;
  date: string;
  status: "completed" | "in-progress" | "draft";
  overallScore: number;
  dimensionScores: DimensionScore[];
  responses: Record<string, number>;
}

export interface Recommendation {
  id: string;
  dimension: Dimension;
  title: string;
  description: string;
  timeline: "30-day" | "60-day" | "90-day";
  impact: "High" | "Medium" | "Low";
  effort: "High" | "Medium" | "Low";
}

export const industryBenchmarks: Record<Dimension, number> = {
  Strategy: 3.1,
  Data: 2.8,
  Talent: 2.5,
  Operations: 2.6,
  Governance: 2.3,
  Culture: 2.9,
};

export const mockAssessments: Assessment[] = [
  {
    id: "a1",
    name: "Q1 2026 Assessment",
    date: "2026-03-15",
    status: "completed",
    overallScore: 3.2,
    dimensionScores: [
      { dimension: "Strategy", score: 18, maxScore: 25, average: 3.6 },
      { dimension: "Data", score: 16, maxScore: 25, average: 3.2 },
      { dimension: "Talent", score: 14, maxScore: 25, average: 2.8 },
      { dimension: "Operations", score: 15, maxScore: 25, average: 3.0 },
      { dimension: "Governance", score: 17, maxScore: 25, average: 3.4 },
      { dimension: "Culture", score: 16, maxScore: 25, average: 3.2 },
    ],
    responses: {
      s1: 4, s2: 4, s3: 3, s4: 4, s5: 3,
      d1: 4, d2: 3, d3: 3, d4: 3, d5: 3,
      t1: 3, t2: 3, t3: 2, t4: 3, t5: 3,
      o1: 3, o2: 3, o3: 3, o4: 3, o5: 3,
      g1: 4, g2: 3, g3: 3, g4: 4, g5: 3,
      c1: 3, c2: 4, c3: 3, c4: 3, c5: 3,
    },
  },
  {
    id: "a2",
    name: "Q4 2025 Assessment",
    date: "2025-12-01",
    status: "completed",
    overallScore: 2.9,
    dimensionScores: [
      { dimension: "Strategy", score: 16, maxScore: 25, average: 3.2 },
      { dimension: "Data", score: 14, maxScore: 25, average: 2.8 },
      { dimension: "Talent", score: 13, maxScore: 25, average: 2.6 },
      { dimension: "Operations", score: 14, maxScore: 25, average: 2.8 },
      { dimension: "Governance", score: 15, maxScore: 25, average: 3.0 },
      { dimension: "Culture", score: 15, maxScore: 25, average: 3.0 },
    ],
    responses: {
      s1: 3, s2: 4, s3: 3, s4: 3, s5: 3,
      d1: 3, d2: 3, d3: 2, d4: 3, d5: 3,
      t1: 3, t2: 2, t3: 2, t4: 3, t5: 3,
      o1: 3, o2: 3, o3: 2, o4: 3, o5: 3,
      g1: 3, g2: 3, g3: 3, g4: 3, g5: 3,
      c1: 3, c2: 3, c3: 3, c4: 3, c5: 3,
    },
  },
  {
    id: "a3",
    name: "Initial Baseline",
    date: "2025-09-10",
    status: "completed",
    overallScore: 2.4,
    dimensionScores: [
      { dimension: "Strategy", score: 13, maxScore: 25, average: 2.6 },
      { dimension: "Data", score: 12, maxScore: 25, average: 2.4 },
      { dimension: "Talent", score: 11, maxScore: 25, average: 2.2 },
      { dimension: "Operations", score: 11, maxScore: 25, average: 2.2 },
      { dimension: "Governance", score: 12, maxScore: 25, average: 2.4 },
      { dimension: "Culture", score: 13, maxScore: 25, average: 2.6 },
    ],
    responses: {
      s1: 3, s2: 3, s3: 2, s4: 3, s5: 2,
      d1: 3, d2: 2, d3: 2, d4: 2, d5: 3,
      t1: 2, t2: 2, t3: 2, t4: 2, t5: 3,
      o1: 2, o2: 2, o3: 2, o4: 2, o5: 3,
      g1: 3, g2: 2, g3: 2, g4: 3, g5: 2,
      c1: 3, c2: 3, c3: 2, c4: 3, c5: 2,
    },
  },
];

export const mockRecommendations: Recommendation[] = [
  {
    id: "r1",
    dimension: "Talent",
    title: "Launch AI Literacy Program",
    description:
      "Design and roll out a tiered AI training curriculum for all staff. Start with executive workshops, then department-specific modules covering prompt engineering, AI tool usage, and responsible AI principles.",
    timeline: "30-day",
    impact: "High",
    effort: "Medium",
  },
  {
    id: "r2",
    dimension: "Talent",
    title: "Establish AI Hiring Pipeline",
    description:
      "Partner with 2-3 universities and attend key AI conferences to build a sustainable talent pipeline. Create compelling AI role descriptions that emphasize impact, not just technical requirements.",
    timeline: "60-day",
    impact: "High",
    effort: "High",
  },
  {
    id: "r3",
    dimension: "Operations",
    title: "Implement MLOps Foundation",
    description:
      "Deploy a lightweight MLOps stack with model versioning, automated testing, and monitoring. Start with one high-impact model and expand the framework to others.",
    timeline: "60-day",
    impact: "High",
    effort: "High",
  },
  {
    id: "r4",
    dimension: "Operations",
    title: "AI Quick Wins Audit",
    description:
      "Identify 3-5 operational processes where AI can reduce cycle time by 30%+ with minimal integration effort. Prioritize by business value and implementation speed.",
    timeline: "30-day",
    impact: "Medium",
    effort: "Low",
  },
  {
    id: "r5",
    dimension: "Data",
    title: "Data Quality Baseline Assessment",
    description:
      "Audit data quality across top 10 data sources. Establish automated quality scoring, define remediation priorities, and set up ongoing monitoring dashboards.",
    timeline: "30-day",
    impact: "High",
    effort: "Medium",
  },
  {
    id: "r6",
    dimension: "Governance",
    title: "AI Ethics Review Board",
    description:
      "Establish a cross-functional AI ethics committee with clear charter, review cadence, and escalation pathways. Include legal, compliance, engineering, and business representatives.",
    timeline: "60-day",
    impact: "Medium",
    effort: "Medium",
  },
  {
    id: "r7",
    dimension: "Strategy",
    title: "Competitive AI Intelligence Program",
    description:
      "Set up systematic monitoring of competitors AI capabilities, partnerships, and product launches. Produce monthly competitive briefs for the executive team.",
    timeline: "30-day",
    impact: "Medium",
    effort: "Low",
  },
  {
    id: "r8",
    dimension: "Culture",
    title: "AI Innovation Sandbox",
    description:
      "Create a safe experimentation environment where any employee can prototype AI solutions. Allocate 10% innovation time and run quarterly hackathons with executive judging.",
    timeline: "90-day",
    impact: "High",
    effort: "Medium",
  },
  {
    id: "r9",
    dimension: "Data",
    title: "Real-Time Data Pipeline Architecture",
    description:
      "Design and implement event-driven data pipelines for top 3 AI use cases. Reduce data latency from batch (hours) to near-real-time (minutes) for critical decision paths.",
    timeline: "90-day",
    impact: "High",
    effort: "High",
  },
  {
    id: "r10",
    dimension: "Governance",
    title: "AI Model Registry and Risk Framework",
    description:
      "Build a centralized registry of all AI models with risk classifications, performance metrics, and compliance documentation. Automate risk scoring for new model deployments.",
    timeline: "90-day",
    impact: "High",
    effort: "High",
  },
];

export function getAssessmentById(id: string): Assessment | undefined {
  return mockAssessments.find((a) => a.id === id);
}

export function getLatestAssessment(): Assessment {
  return mockAssessments[0];
}

export function getMaturityLevel(score: number): string {
  if (score >= 4.5) return "Leader";
  if (score >= 3.5) return "Advanced";
  if (score >= 2.5) return "Developing";
  return "Beginner";
}

export function getMaturityColor(score: number): string {
  if (score >= 4.5) return "text-emerald-600 bg-emerald-50 border-emerald-200";
  if (score >= 3.5) return "text-blue-600 bg-blue-50 border-blue-200";
  if (score >= 2.5) return "text-amber-600 bg-amber-50 border-amber-200";
  return "text-red-600 bg-red-50 border-red-200";
}

export function getTrend(
  currentAssessment: Assessment,
  previousAssessment: Assessment | undefined,
  dimension: Dimension
): number {
  if (!previousAssessment) return 0;
  const current = currentAssessment.dimensionScores.find(
    (d) => d.dimension === dimension
  );
  const previous = previousAssessment.dimensionScores.find(
    (d) => d.dimension === dimension
  );
  if (!current || !previous) return 0;
  return Number((current.average - previous.average).toFixed(1));
}
