'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  User,
  CreditCard,
  BarChart3,
  Bell,
  Shield,
  Check,
  Zap,
} from 'lucide-react';
import { createSupabaseClient } from '@/lib/supabase';

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('account');

  useEffect(() => {
    const supabase = createSupabaseClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Check for tab query param
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab) setActiveTab(tab);
  }, []);

  const subscriptionTiers = [
    {
      name: 'Free',
      price: 0,
      features: [
        '10 analyses per month',
        '2 videos per month',
        'Basic support',
        'Community access',
      ],
      current: true,
    },
    {
      name: 'Pro',
      price: 29,
      features: [
        'Unlimited analyses',
        '50 videos per month',
        'Priority support',
        'Advanced analytics',
        'Export reports',
      ],
      current: false,
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 99,
      features: [
        'Everything in Pro',
        'Unlimited videos',
        'API access',
        'White-label option',
        'Dedicated support',
        'Custom integrations',
      ],
      current: false,
    },
  ];

  const usageStats = {
    analyses: { used: 24, limit: 10 },
    videos: { used: 8, limit: 2 },
    storage: { used: 245, limit: 1024 }, // MB
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="account">
            <User className="mr-2 h-4 w-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="usage">
            <BarChart3 className="mr-2 h-4 w-4" />
            Usage
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback>
                    {user?.email?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline">Change Avatar</Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input defaultValue={user?.user_metadata?.full_name || ''} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue={user?.email || ''} disabled />
                </div>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Manage your password and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline">
                <Shield className="mr-2 h-4 w-4" />
                Change Password
              </Button>
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Add an extra layer of security to your account
                </p>
                <Button variant="outline">Enable 2FA</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-500">
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive">Delete Account</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>
                You are currently on the Free plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">Free</h3>
                    <p className="text-sm text-muted-foreground">Basic features</p>
                  </div>
                  <Badge variant="secondary">Current</Badge>
                </div>
                <ul className="space-y-2">
                  {subscriptionTiers[0].features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upgrade Your Plan</CardTitle>
              <CardDescription>
                Choose a plan that fits your needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {subscriptionTiers.slice(1).map((tier) => (
                  <div
                    key={tier.name}
                    className={`relative rounded-lg border-2 p-6 ${
                      tier.popular ? 'border-primary' : 'border-border'
                    }`}
                  >
                    {tier.popular && (
                      <Badge className="absolute top-4 right-4">Most Popular</Badge>
                    )}
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold">{tier.name}</h3>
                      <div className="mt-2 flex items-baseline gap-1">
                        <span className="text-4xl font-bold">${tier.price}</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full">
                      <Zap className="mr-2 h-4 w-4" />
                      Upgrade to {tier.name}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>
                Manage your payment information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                No payment method on file
              </p>
              <Button variant="outline">
                <CreditCard className="mr-2 h-4 w-4" />
                Add Payment Method
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>
                View your past invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                No billing history yet
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Usage Tab */}
        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Usage</CardTitle>
              <CardDescription>
                Track your monthly usage limits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Analyses</Label>
                  <span className="text-sm font-medium">
                    {usageStats.analyses.used} / {usageStats.analyses.limit}
                  </span>
                </div>
                <Progress
                  value={(usageStats.analyses.used / usageStats.analyses.limit) * 100}
                />
                <p className="mt-2 text-xs text-orange-600">
                  You've exceeded your limit by {usageStats.analyses.used - usageStats.analyses.limit}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Videos Generated</Label>
                  <span className="text-sm font-medium">
                    {usageStats.videos.used} / {usageStats.videos.limit}
                  </span>
                </div>
                <Progress
                  value={(usageStats.videos.used / usageStats.videos.limit) * 100}
                />
                <p className="mt-2 text-xs text-orange-600">
                  You've exceeded your limit by {usageStats.videos.used - usageStats.videos.limit}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Storage Used</Label>
                  <span className="text-sm font-medium">
                    {usageStats.storage.used}MB / {usageStats.storage.limit}MB
                  </span>
                </div>
                <Progress
                  value={(usageStats.storage.used / usageStats.storage.limit) * 100}
                />
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-4">
                  Usage resets on the 1st of each month
                </p>
                <Button>Upgrade for More</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Choose what emails you receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { id: 'analyses', label: 'Analysis completed', defaultChecked: true },
                { id: 'videos', label: 'Video generation completed', defaultChecked: true },
                { id: 'trending', label: 'New trending insights', defaultChecked: false },
                { id: 'tips', label: 'Tips and tutorials', defaultChecked: false },
                { id: 'marketing', label: 'Marketing and updates', defaultChecked: false },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <Label htmlFor={item.id}>{item.label}</Label>
                  <input
                    id={item.id}
                    type="checkbox"
                    defaultChecked={item.defaultChecked}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                </div>
              ))}
              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

