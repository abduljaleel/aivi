"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  dimensions,
  dimensionDescriptions,
  getQuestionsByDimension,
  scaleLabels,
  type Dimension,
} from "@/lib/data/questions";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

export default function AssessmentQuestionnairePage() {
  const params = useParams();
  const router = useRouter();
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [activeDimension, setActiveDimension] = useState<string>("Strategy");

  const totalQuestions = 30;
  const answeredQuestions = Object.keys(responses).length;
  const progressPercent = Math.round((answeredQuestions / totalQuestions) * 100);

  const handleResponse = (questionId: string, value: number) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  const currentDimensionIndex = dimensions.indexOf(activeDimension as Dimension);
  const currentQuestions = getQuestionsByDimension(activeDimension as Dimension);
  const dimensionAnswered = currentQuestions.filter((q) => responses[q.id] !== undefined).length;

  const handleNext = () => {
    if (currentDimensionIndex < dimensions.length - 1) {
      setActiveDimension(dimensions[currentDimensionIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentDimensionIndex > 0) {
      setActiveDimension(dimensions[currentDimensionIndex - 1]);
    }
  };

  const handleComplete = () => {
    router.push(`/assessments/${params.id}/results`);
  };

  const isComplete = answeredQuestions === totalQuestions;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Competitiveness Diagnostic</h1>
        <p className="text-muted-foreground">
          Rate your organization across 6 dimensions of AI readiness
        </p>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="ml-auto text-sm text-muted-foreground tabular-nums">
              {answeredQuestions} / {totalQuestions} questions ({progressPercent}%)
            </span>
          </div>
          <Progress value={progressPercent} />
        </CardContent>
      </Card>

      {/* Dimension Tabs */}
      <Tabs value={activeDimension} onValueChange={(v) => setActiveDimension(v ?? "all")}>
        <TabsList className="w-full grid grid-cols-3 lg:grid-cols-6">
          {dimensions.map((dim) => {
            const dimQuestions = getQuestionsByDimension(dim);
            const dimAnswered = dimQuestions.filter((q) => responses[q.id] !== undefined).length;
            const allAnswered = dimAnswered === dimQuestions.length;
            return (
              <TabsTrigger key={dim} value={dim} className="relative">
                {dim}
                {allAnswered && (
                  <CheckCircle2 className="ml-1 h-3 w-3 text-emerald-500" />
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {dimensions.map((dim) => {
          const dimQuestions = getQuestionsByDimension(dim);
          return (
            <TabsContent key={dim} value={dim}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{dim}</CardTitle>
                      <CardDescription>
                        {dimensionDescriptions[dim]}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">
                      {dimQuestions.filter((q) => responses[q.id] !== undefined).length} / {dimQuestions.length}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {dimQuestions.map((question, index) => (
                      <div key={question.id} className="space-y-3">
                        <div>
                          <p className="font-medium">
                            <span className="text-muted-foreground mr-2">
                              {index + 1}.
                            </span>
                            {question.text}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {question.description}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {[1, 2, 3, 4, 5].map((value) => (
                            <button
                              key={value}
                              type="button"
                              onClick={() => handleResponse(question.id, value)}
                              className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all ${
                                responses[question.id] === value
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-border hover:border-primary/50 hover:bg-muted"
                              }`}
                            >
                              <span className="font-bold">{value}</span>
                              <span className="hidden sm:inline text-xs opacity-80">
                                {scaleLabels[value]}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Navigation */}
              <div className="mt-6 flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentDimensionIndex === 0}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>

                {currentDimensionIndex < dimensions.length - 1 ? (
                  <Button onClick={handleNext}>
                    Next Dimension
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleComplete}
                    disabled={!isComplete}
                    className={isComplete ? "" : "opacity-50"}
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Complete Assessment
                  </Button>
                )}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
