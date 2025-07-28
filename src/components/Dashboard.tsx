import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Heart, AlertTriangle, TrendingUp, Calendar, Plus } from "lucide-react";
import farmHeroImage from "@/assets/farm-hero.jpg";

const stats = [
  {
    title: "Total Animals",
    value: "247",
    icon: Users,
    description: "Active livestock",
    color: "text-primary"
  },
  {
    title: "Health Alerts",
    value: "3",
    icon: AlertTriangle,
    description: "Require attention",
    color: "text-warning"
  },
  {
    title: "Vaccinations Due",
    value: "12",
    icon: Heart,
    description: "This week",
    color: "text-accent"
  },
  {
    title: "Milk Production",
    value: "1,245L",
    icon: TrendingUp,
    description: "Today",
    color: "text-success"
  }
];

const recentAlerts = [
  {
    id: 1,
    animal: "Cow #A001",
    type: "Vaccination Due",
    priority: "High",
    date: "2024-01-26"
  },
  {
    id: 2,
    animal: "Sheep #S032",
    type: "Health Check",
    priority: "Medium",
    date: "2024-01-27"
  },
  {
    id: 3,
    animal: "Goat #G015",
    type: "Breeding Schedule",
    priority: "Low",
    date: "2024-01-28"
  }
];

const recentActivity = [
  "Added new cow (Tag: A001) to herd",
  "Vaccinated 5 sheep in Flock B",
  "Recorded milk production for morning shift",
  "Updated feeding schedule for young cattle"
];

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section */}
      <div 
        className="relative h-48 rounded-lg bg-cover bg-center overflow-hidden shadow-farm"
        style={{ backgroundImage: `url(${farmHeroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40" />
        <div className="relative h-full flex items-center justify-between p-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome to Your Farm Dashboard
            </h1>
            <p className="text-white/90 text-lg">
              Manage your livestock efficiently and track their health, production, and more
            </p>
          </div>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg">
            <Plus className="w-5 h-5 mr-2" />
            Add Animal
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-card hover:shadow-farm transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{alert.animal}</p>
                    <p className="text-sm text-muted-foreground">{alert.type}</p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={alert.priority === 'High' ? 'destructive' : 
                              alert.priority === 'Medium' ? 'default' : 'secondary'}
                    >
                      {alert.priority}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{alert.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm text-foreground">{activity}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
              <Users className="w-6 h-6" />
              <span className="text-sm">Add Animal</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
              <Heart className="w-6 h-6" />
              <span className="text-sm">Health Record</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
              <Calendar className="w-6 h-6" />
              <span className="text-sm">Schedule Feed</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              <span className="text-sm">Production Log</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}