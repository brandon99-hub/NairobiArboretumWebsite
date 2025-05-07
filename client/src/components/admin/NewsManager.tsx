import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function NewsManager() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>News Management</CardTitle>
        <CardDescription>Manage news and announcements for the arboretum</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center py-10">
          News management feature will be implemented soon.
        </p>
        <div className="flex justify-center">
          <Button disabled>Add News (Coming Soon)</Button>
        </div>
      </CardContent>
    </Card>
  );
}