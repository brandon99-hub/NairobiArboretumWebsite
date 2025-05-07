import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactMessagesManager() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Messages</CardTitle>
        <CardDescription>View and manage contact form submissions</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center py-10">
          Contact message management feature will be implemented soon.
        </p>
      </CardContent>
    </Card>
  );
}