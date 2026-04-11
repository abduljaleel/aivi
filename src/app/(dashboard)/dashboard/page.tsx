import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockAssessments, getMaturityLevel } from "@/lib/data/assessments";
import { ArrowRight, BarChart3, Brain, CheckSquare, Target, TrendingUp, AlertTriangle } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const latest = mockAssessments[0];
  const topDimension = [...latest.dimensionScores].sort((a, b) => b.average - a.average)[0];
  const weakDimensions = latest.dimensionScores.filter((d) => d.average < 3.0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.user_metadata?.full_name || user?.email}
        </p>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Assessments Completed"
          value="3"
          description="Across all quarters"
          icon={<CheckSquare className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Average Score"
          value="3.2 / 5"
          description="Latest assessment"
          icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Top Dimension"
          value={topDimension.dimension}
          description={`Score: ${topDimension.average.toFixed(1)} — ${getMaturityLevel(topDimension.average)}`}
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Areas to Improve"
          value={String(weakDimensions.length)}
          description={weakDimensions.map((d) => d.dimension).join(", ") || "None"}
          icon={<AlertTriangle className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Assessments */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Assessments</CardTitle>
              <CardDescription>Your AI competitiveness diagnostic history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAssessments.map((assessment) => (
                  <Link
                    key={assessment.id}
                    href={`/assessments/${assessment.id}/results`}
                    className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{assessment.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(assessment.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-lg font-semibold">{assessment.overallScore.toFixed(1)}</p>
                        <p className="text-xs text-muted-foreground">/ 5.0</p>
                      </div>
                      <Badge variant="secondary">
                        {getMaturityLevel(assessment.overallScore)}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/assessments" className="w-full">
                <Button variant="outline" className="w-full">
                  View All Assessments
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        {/* CTA Card */}
        <div>
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Brain className="h-5 w-5" />
              </div>
              <CardTitle className="mt-2">Begin Assessment</CardTitle>
              <CardDescription>
                Take the AI Competitiveness Diagnostic to understand where your enterprise stands and where to invest next.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  6 dimensions, 30 questions
                </li>
                <li className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  Instant scorecard and radar chart
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Prioritized transformation roadmap
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/assessments/new" className="w-full">
                <Button className="w-full">
                  Start New Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
