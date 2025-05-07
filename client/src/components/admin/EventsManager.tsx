import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EventsManager() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Events Management</CardTitle>
        <CardDescription>Manage upcoming events for the arboretum</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center py-10">
          Events management feature will be implemented soon.
        </p>
        <div className="flex justify-center">
          <Button disabled>Add Event (Coming Soon)</Button>
        </div>
      </CardContent>
    </Card>
  );
}