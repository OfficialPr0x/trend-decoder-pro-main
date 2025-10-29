# Environment Variables Setup

Create a `.env.local` file in the `/dashboard` directory with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3002
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:3001

# OpenRouter (Optional - can use backend's key)
OPENROUTER_API_KEY=your_openrouter_api_key
```

## Setup Instructions

1. Go to [Supabase](https://supabase.com) and create a new project
2. Get your project URL and anon key from Settings > API
3. Get your service role key (keep this secret!)
4. Go to [Stripe](https://stripe.com) and create an account
5. Get your API keys from Developers > API keys
6. Set up webhook endpoint for subscription events
7. Copy these values into your `.env.local` file

