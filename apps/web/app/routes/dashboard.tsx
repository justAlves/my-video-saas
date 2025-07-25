import { useEffect, useState } from "react";
import { Search, Plus, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Route } from "./+types/dashboard";
import { CardFooter } from "@/components/ui/card";
import { useCreateCollectionStore } from "@/stores/create-collection.store";
import { useGetCollections } from "@/hooks/use-collections";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nixy - Dashboard" },
  ];
}

const mockStats = [
  {
    title: "Views",
    value: "192K",
    change: "-3.84%",
    trend: "down" as const,
  },
  {
    title: "DRM Licenses",
    value: "86K",
    change: "-12.84%",
    trend: "down" as const,
  },
  {
    title: "Bandwidth Used",
    value: "233 GB",
    change: "+27.84%",
    trend: "up" as const,
  },
  {
    title: "Storage Increase",
    value: "23 GB",
    change: "+37.84%",
    trend: "up" as const,
  },
];

const mockCollections = [
  {
    id: 1,
    name: "Default",
    videoCount: 0,
    status: "No uploads yet",
    thumbnail: null,
  },
];

const generateChartData = () => {
  const data = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 28);
  
  for (let i = 0; i < 72; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      views: Math.floor(Math.random() * 1000) + 200,
    });
  }
  return data;
};

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [chartData] = useState(generateChartData());
  const [timeRange, setTimeRange] = useState("Last 24 hours");

  const { onOpenChange } = useCreateCollectionStore()
  const { data: collections } = useGetCollections()
  const navigate = useNavigate()

  const handleCollectionSelect = (collectionId: string) => {
    navigate(`/collection/${collectionId}`);
  };

  return (
    <div className="space-y-6 px-8 py-8 md:px-64 md:py-32">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium text-white">Statistics</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
            onClick={() => {
              setTimeRange(timeRange === "Last 24 hours" ? "Last 7 days" : "Last 24 hours");
            }}
          >
            {timeRange}
            <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    {stat.change}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="h-64 flex items-end justify-between gap-1">
                {chartData.map((data, index) => (
                  <div
                    key={index}
                    className="bg-green-400 rounded-t-sm flex-1 transition-all hover:bg-green-300"
                    style={{
                      height: `${(data.views / 1200) * 100}%`,
                      minHeight: '8px',
                    }}
                    title={`${data.date}: ${data.views} views`}
                  />
                ))}
              </div>
              <CardFooter className="flex items-center justify-between text-sm text-gray-400">
                <span>Amount of views per day in last 28 days</span>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  View full statistics →
                </Button>
              </CardFooter>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-medium text-white">Your collections</h2>
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <BarChart3 className="h-4 w-4 mr-1" />
            Analytics
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <Card 
            className="border-neutral-700 border-dashed hover:border-gray-600 transition-colors cursor-pointer"
            onClick={() => onOpenChange(true)}
          >
            <CardContent className="p-6 flex flex-col items-center justify-center h-full">
              <Plus className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-400">Create Collection</span>
            </CardContent>
          </Card>

          {collections && collections.length > 0 && collections.map((collection) => (
            <Card key={collection.id} className="cursor-pointer overflow-hidden" onClick={() => handleCollectionSelect(collection.id)}>
              <CardContent className="p-0">
                <div className="h-32 bg-gradient-to-br from-purple-600 to-blue-600 rounded-t-lg relative">
                  <div className="absolute inset-0 bg-black/20 rounded-t-lg" />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-white mb-1">{collection.name}</h3>
                  <p className="text-sm text-gray-400">0 videos</p>
                  <p className="text-xs text-gray-500 mt-1">{collection.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}