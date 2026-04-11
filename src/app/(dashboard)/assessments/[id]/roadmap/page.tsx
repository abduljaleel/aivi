import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  getAssessmentById,
  getLatestAssessment,
  mockRecommendations,
  type Recommendation,
} from "@/lib/data/assessments";
import { dimensionColors, type Dimension } from "@/lib/data/questions";
import { ArrowLeft, Clock, Zap, Target } from "lucide-react";

const timelineOrder = { "30-day": 0, "60-day": 1, "90-day": 2 };
const timelineLabels = {
  "30-day": "First 30 Days",
  "60-day": "Days 31 - 60",
  "90-day": "Days 61 - 90",
};
const timelineDescriptions = {
  "30-day": "Quick wins and foundation-setting activities",
  "60-day": "Building capabilities and scaling initial efforts",
  "90-day": "Deepening maturity and establishing long-term practices",
};

function ImpactBadge({ level }: { level: string }) {
  const colors =
    level === "High"
      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
      : level === "Medium"
        ? "text-amber-700 bg-amber-50 border-amber-200"
        : "text-slate-700 bg-slate-50 border-slate-200";
  return (
    <Badge variant="outline" className={colors}>
      <Zap className="mr-1 h-3 w-3" />
      {level} Impact
    </Badge>
  );
}

function EffortBadge({ level }: { level: string }) {
  const colors =
    level === "Low"
      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
      : level === "Medium"
        ? "text-amber-700 bg-amber-50 border-amber-200"
        : "text-red-700 bg-red-50 border-red-200";
  return (
    <Badge variant="outline" className={colors}>
      <Target className="mr-1 h-3 w-3" />
      {level} Effort
    </Badge>
  );
}

export default async function RoadmapPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const assessment = getAssessmentById(id) || getLatestAssessment();

  // Group recommendations by timeline
  const grouped = mockRecommendations.reduce(
    (acc, rec) => {
      if (!acc[rec.timeline]) acc[rec.timeline] = [];
      acc[rec.timeline].push(rec);
      return acc;
    },
    {} as Record<string, Recommendation[]>
  );

  const sortedTimelines = Object.keys(grouped).sort(
    (a, b) =>
      timelineOrder[a as keyof typeof timelineOrder] -
      timelineOrder[b as keyof typeof timelineOrder]
  ) as (keyof typeof timelineLabels)[];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/assessments/${assessment.id}/results`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Transformation Roadmap
          </h1>
          <p className="text-muted-foreground">
            Prioritized actions based on your {assessment.name} results
          </p>
        </div>
      </div>

      {/* Overview */}
      <Card>
        <CardContent className="py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Actions</p>
              <p className="text-3xl font-bold">{mockRecommendations.length}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">High Impact</p>
              <p className="text-3xl font-bold">
                {mockRecommendations.filter((r) => r.impact === "High").length}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Quick Wins</p>
              <p className="text-3xl font-bold">
                {mockRecommendations.filter(
                  (r) => r.impact === "High" && r.effort === "Low"
                ).length +
                  mockRecommendations.filter(
                    (r) => r.impact === "Medium" && r.effort === "Low"
                  ).length}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Dimensions Covered</p>
              <p className="text-3xl font-bold">
                {new Set(mockRecommendations.map((r) => r.dimension)).size}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Sections */}
      {sortedTimelines.map((timeline) => (
        <div key={timeline} className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{timelineLabels[timeline]}</h2>
              <p className="text-sm text-muted-foreground">
                {timelineDescriptions[timeline]}
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {grouped[timeline].map((rec) => (
              <Card key={rec.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full shrink-0 mt-1"
                        style={{
                          backgroundColor: dimensionColors[rec.dimension],
                        }}
                      />
                      <CardTitle className="text-base">{rec.title}</CardTitle>
                    </div>
                  </div>
                  <Badge variant="secondary" className="w-fit">
                    {rec.dimension}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {rec.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <ImpactBadge level={rec.impact} />
                    <EffortBadge level={rec.effort} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {/* Back */}
      <div className="flex gap-4">
        <Link href={`/assessments/${assessment.id}/results`}>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Results
          </Button>
        </Link>
        <Link href="/scorecard">
          <Button variant="outline">View Scorecard</Button>
        </Link>
      </div>
    </div>
  );
}
