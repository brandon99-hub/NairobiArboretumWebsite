import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function GalleryManager() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gallery Management</CardTitle>
        <CardDescription>Manage gallery images for the arboretum</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center py-10">
          Gallery management feature will be implemented soon.
        </p>
        <div className="flex justify-center">
          <Button disabled>Add Image (Coming Soon)</Button>
        </div>
      </CardContent>
    </Card>
  );
}