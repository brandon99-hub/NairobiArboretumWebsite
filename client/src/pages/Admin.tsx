import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import AdminLogin from "@/components/admin/AdminLogin";
import EventsManager from "@/components/admin/EventsManager";
import NewsManager from "@/components/admin/NewsManager";
import GalleryManager from "@/components/admin/GalleryManager";
import AttractionsManager from "@/components/admin/AttractionsManager";
import ContactMessagesManager from "@/components/admin/ContactMessagesManager";
import SubscriptionsManager from "@/components/admin/SubscriptionsManager";

export interface AdminUser {
  id: number;
  username: string;
  isAdmin: boolean;
}

export default function Admin() {
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      setLoading(true);
      const response = await apiRequest("/api/admin/auth-check", {
        method: "GET"
      });
      const data = await response.json();
      
      if (data.authenticated) {
        setAuthenticated(true);
        setUser(data.user);
      } else {
        setAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      setAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await apiRequest("/api/admin/logout", {
        method: "POST"
      });
      
      setAuthenticated(false);
      setUser(null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate("/admin");
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Admin Dashboard</CardTitle>
            <CardDescription className="text-center">Loading...</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
            <CardDescription className="text-center">Please login to access the admin dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminLogin onLoginSuccess={() => checkAuth()} />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">Nairobi Arboretum Admin</CardTitle>
            <CardDescription>Manage website content and view user interactions</CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm">Logged in as: <span className="font-medium">{user?.username}</span></p>
            <Button variant="outline" onClick={handleLogout}>Logout</Button>
            <Button variant="default" asChild>
              <Link href="/">View Site</Link>
            </Button>
          </div>
        </CardHeader>
      </Card>
      
      <Tabs defaultValue="attractions">
        <TabsList className="mb-4 grid grid-cols-7 w-full">
          <TabsTrigger value="attractions">Attractions</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="news">News</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="attractions">
          <AttractionsManager />
        </TabsContent>
        
        <TabsContent value="events">
          <EventsManager />
        </TabsContent>
        
        <TabsContent value="news">
          <NewsManager />
        </TabsContent>
        
        <TabsContent value="gallery">
          <GalleryManager />
        </TabsContent>
        
        <TabsContent value="messages">
          <ContactMessagesManager />
        </TabsContent>
        
        <TabsContent value="subscriptions">
          <SubscriptionsManager />
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Site Settings</CardTitle>
              <CardDescription>Configure website settings and options</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Settings management will be implemented in a future update.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}