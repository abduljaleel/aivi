import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockAssessments, getMaturityLevel } from "@/lib/data/assessments";
import { Plus, ArrowRight } from "lucide-react";

export default function AssessmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assessments</h1>
          <p className="text-muted-foreground">
            Track your AI competitiveness over time
          </p>
        </div>
        <Link href="/assessments/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Start New Assessment
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assessment History</CardTitle>
          <CardDescription>
            All diagnostics completed by your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assessment</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Overall Score</TableHead>
                <TableHead>Maturity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAssessments.map((assessment) => (
                <TableRow key={assessment.id}>
                  <TableCell className="font-medium">
                    {assessment.name}
                  </TableCell>
                  <TableCell>
                    {new Date(assessment.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        assessment.status === "completed"
                          ? "default"
                          : assessment.status === "in-progress"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {assessment.status === "completed"
                        ? "Completed"
                        : assessment.status === "in-progress"
                          ? "In Progress"
                          : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-lg font-semibold">
                      {assessment.overallScore.toFixed(1)}
                    </span>
                    <span className="text-muted-foreground"> / 5.0</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {getMaturityLevel(assessment.overallScore)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/assessments/${assessment.id}/results`}>
                      <Button variant="ghost" size="sm">
                        View Results
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
