"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, Copy, RotateCcw, BookOpen, Code2 } from "lucide-react";

const exampleData = {
  users: [
    {
      id: 1,
      name: "Alice",
      age: 30,
      city: "Seoul",
      skills: ["JavaScript", "React"],
    },
    {
      id: 2,
      name: "Bob",
      age: 25,
      city: "Busan",
      skills: ["Python", "Django"],
    },
    {
      id: 3,
      name: "Charlie",
      age: 35,
      city: "Seoul",
      skills: ["Java", "Spring"],
    },
  ],
  products: [
    {
      id: 1,
      name: "Laptop",
      price: 1200,
      category: "Electronics",
      inStock: true,
    },
    { id: 2, name: "Book", price: 15, category: "Education", inStock: false },
    {
      id: 3,
      name: "Phone",
      price: 800,
      category: "Electronics",
      inStock: true,
    },
  ],
};

const tutorials = [
  {
    id: "basics",
    title: "기본 문법",
    content: [
      { query: ".", description: "전체 JSON 반환" },
      { query: ".users", description: "users 배열 선택" },
      { query: ".users[0]", description: "첫 번째 사용자 선택" },
      { query: ".users[0].name", description: "첫 번째 사용자의 이름" },
      { query: ".users | length", description: "배열 길이" },
    ],
  },
  {
    id: "filtering",
    title: "필터링",
    content: [
      {
        query: ".users[] | select(.age > 30)",
        description: "30세 이상 사용자",
      },
      {
        query: '.users[] | select(.city == "Seoul")',
        description: "서울 거주 사용자",
      },
      {
        query: ".products[] | select(.inStock)",
        description: "재고 있는 상품",
      },
      {
        query: ".products[] | select(.price < 100)",
        description: "100달러 미만 상품",
      },
    ],
  },
  {
    id: "mapping",
    title: "매핑 & 변환",
    content: [
      { query: ".users | map(.name)", description: "사용자 이름만 추출" },
      { query: ".users | map({name, age})", description: "이름과 나이만 선택" },
      {
        query: ".products | map(.price * 1.1)",
        description: "가격에 10% 추가",
      },
      {
        query: ".users | map(.name | ascii_upcase)",
        description: "이름을 대문자로",
      },
    ],
  },
  {
    id: "advanced",
    title: "고급 기능",
    content: [
      { query: ".users | group_by(.city)", description: "도시별 그룹화" },
      { query: ".products | sort_by(.price)", description: "가격순 정렬" },
      {
        query: ".users | map(.skills[]) | unique",
        description: "모든 스킬 중복 제거",
      },
      {
        query: '.products | map(select(.category == "Electronics")) | length',
        description: "전자제품 개수",
      },
    ],
  },
];

// jq simulator for web
async function executeJQ(data: any, query: string): Promise<any> {
  try {
    // 동적으로 jq-web 모듈을 import
    const jq = await import("jq-web");
    const jqInstance = jq.default || jq;

    // Use the promised API for better reliability with WebAssembly loading
    const result = await jqInstance.promised.json(data, query);
    return result;
  } catch (error) {
    return `오류: ${error}`;
  }
}

export default function JQPlayground() {
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify(exampleData, null, 2)
  );
  const [query, setQuery] = useState(".");
  const [result, setResult] = useState("");
  const [activeTab, setActiveTab] = useState("basics");

  const executeQuery = async (): Promise<void> => {
    try {
      const data = JSON.parse(jsonInput);
      const output = await executeJQ(data, query);
      setResult(JSON.stringify(output, null, 2));
    } catch (error) {
      setResult(`JSON 파싱 오류: ${error}`);
    }
  };

  const loadExample = (exampleQuery: string) => {
    setQuery(exampleQuery);
  };

  const resetData = () => {
    setJsonInput(JSON.stringify(exampleData, null, 2));
    setQuery(".");
    setResult("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            jq 튜토리얼 & 플레이그라운드
          </h1>
          <p className="text-lg text-gray-600">
            JSON 데이터를 쉽게 처리하고 조작하는 방법을 배워보세요
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 튜토리얼 섹션 */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                튜토리얼
              </CardTitle>
              <CardDescription>
                jq의 기본 문법부터 고급 기능까지 단계별로 학습하세요
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col h-full">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="flex flex-col flex-1"
              >
                <TabsList className="grid w-full grid-cols-4">
                  {tutorials.map((tutorial) => (
                    <TabsTrigger
                      key={tutorial.id}
                      value={tutorial.id}
                      className="text-xs"
                    >
                      {tutorial.title}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {tutorials.map((tutorial) => (
                  <TabsContent
                    key={tutorial.id}
                    value={tutorial.id}
                    className="mt-4 flex-1"
                  >
                    <ScrollArea className="h-full">
                      <div className="space-y-3">
                        {tutorial.content.map((item, index) => (
                          <div
                            key={index}
                            className="border rounded-lg p-3 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <Badge
                                variant="outline"
                                className="font-mono text-xs"
                              >
                                {item.query}
                              </Badge>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => loadExample(item.query)}
                                className="h-6 px-2"
                              >
                                <Play className="w-3 h-3" />
                              </Button>
                            </div>
                            <p className="text-sm text-gray-600">
                              {item.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          {/* 플레이그라운드 섹션 */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="w-5 h-5" />
                  플레이그라운드
                </CardTitle>
                <CardDescription>
                  JSON 데이터와 jq 쿼리를 입력하고 실시간으로 결과를 확인하세요
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    JSON 데이터
                  </label>
                  <Textarea
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    className="font-mono text-sm h-32"
                    placeholder="JSON 데이터를 입력하세요..."
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    jq 쿼리
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="font-mono"
                      placeholder="jq 쿼리를 입력하세요..."
                    />
                    <Button onClick={executeQuery} size="sm">
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={resetData}>
                    <RotateCcw className="w-4 h-4 mr-1" />
                    초기화
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(result)}
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    결과 복사
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>실행 결과</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={result}
                  readOnly
                  className="font-mono text-sm h-64 bg-gray-50"
                  placeholder="쿼리를 실행하면 결과가 여기에 표시됩니다..."
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>빠른 예제</CardTitle>
            <CardDescription>
              자주 사용되는 jq 패턴들을 클릭해서 바로 테스트해보세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { label: "전체 데이터", query: "." },
                { label: "사용자 목록", query: ".users" },
                { label: "첫 번째 사용자", query: ".users[0]" },
                { label: "사용자 이름들", query: ".users | map(.name)" },
                {
                  label: "서울 거주자",
                  query: '.users[] | select(.city == "Seoul")',
                },
                {
                  label: "재고 있는 상품",
                  query: ".products[] | select(.inStock)",
                },
                { label: "상품 개수", query: ".products | length" },
                {
                  label: "평균 나이",
                  query: ".users | map(.age) | add / length",
                },
              ].map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => loadExample(example.query)}
                  className="text-xs h-auto py-2 px-3"
                >
                  {example.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
