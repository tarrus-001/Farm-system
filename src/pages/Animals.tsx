import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Filter,
  Edit,
  Eye,
  AlertTriangle,
  Users
} from "lucide-react";

const animals = [
  {
    id: 1,
    tagNumber: "A001",
    name: "Bessie",
    species: "Cattle",
    breed: "Holstein",
    gender: "Female",
    age: "3 years",
    status: "Healthy",
    lastCheckup: "2024-01-20",
    image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=300&h=200&fit=crop"
  },
  {
    id: 2,
    tagNumber: "S032",
    name: "Woolly",
    species: "Sheep",
    breed: "Merino",
    gender: "Male",
    age: "2 years",
    status: "Vaccination Due",
    lastCheckup: "2024-01-15",
    image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=300&h=200&fit=crop"
  },
  {
    id: 3,
    tagNumber: "G015",
    name: "Billy",
    species: "Goat",
    breed: "Boer",
    gender: "Male",
    age: "1 year",
    status: "Healthy",
    lastCheckup: "2024-01-22",
    image: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?w=300&h=200&fit=crop"
  },
  {
    id: 4,
    tagNumber: "C101",
    name: "Clucky",
    species: "Chicken",
    breed: "Rhode Island Red",
    gender: "Female",
    age: "8 months",
    status: "Healthy",
    lastCheckup: "2024-01-18",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=300&h=200&fit=crop"
  },
  {
    id: 5,
    tagNumber: "A002",
    name: "Thunder",
    species: "Cattle",
    breed: "Angus",
    gender: "Male",
    age: "4 years",
    status: "Treatment Needed",
    lastCheckup: "2024-01-10",
    image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=300&h=200&fit=crop"
  },
  {
    id: 6,
    tagNumber: "S033",
    name: "Cotton",
    species: "Sheep",
    breed: "Suffolk",
    gender: "Female",
    age: "2 years",
    status: "Healthy",
    lastCheckup: "2024-01-21",
    image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=300&h=200&fit=crop"
  }
];

export default function Animals() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("All");

  const species = ["All", "Cattle", "Sheep", "Goat", "Chicken"];

  const filteredAnimals = animals.filter(animal => {
    const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.tagNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecies = selectedSpecies === "All" || animal.species === selectedSpecies;
    return matchesSearch && matchesSpecies;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Healthy":
        return <Badge className="bg-success text-success-foreground">Healthy</Badge>;
      case "Vaccination Due":
        return <Badge className="bg-warning text-warning-foreground">Vaccination Due</Badge>;
      case "Treatment Needed":
        return <Badge variant="destructive">Treatment Needed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Animal Management</h1>
          <p className="text-muted-foreground">Manage and track all your livestock</p>
        </div>
        <Button className="shadow-farm">
          <Plus className="w-4 h-4 mr-2" />
          Add New Animal
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search animals by name, tag, or breed..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {species.map((speciesType) => (
                <Button
                  key={speciesType}
                  variant={selectedSpecies === speciesType ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSpecies(speciesType)}
                >
                  {speciesType}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Animals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAnimals.map((animal) => (
          <Card key={animal.id} className="shadow-card hover:shadow-farm transition-shadow">
            <div className="relative">
              <img
                src={animal.image}
                alt={animal.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              {animal.status !== "Healthy" && (
                <div className="absolute top-2 right-2">
                  <AlertTriangle className="w-5 h-5 text-warning bg-background rounded-full p-1" />
                </div>
              )}
            </div>
            
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{animal.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">Tag: {animal.tagNumber}</p>
                </div>
                {getStatusBadge(animal.status)}
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Species:</span>
                  <span>{animal.species}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Breed:</span>
                  <span>{animal.breed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gender:</span>
                  <span>{animal.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Age:</span>
                  <span>{animal.age}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Checkup:</span>
                  <span>{animal.lastCheckup}</span>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAnimals.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No animals found matching your search criteria.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}