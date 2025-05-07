import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";

export default function SubscriptionsManager() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Subscriptions</CardTitle>
        <CardDescription>Manage newsletter subscribers</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center py-10">
          Subscription management feature will be implemented soon.
        </p>
      </CardContent>
    </Card>
  );
}