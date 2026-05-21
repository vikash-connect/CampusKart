# CampusKart Deployment Checklist

Before deploying to Vercel, ensure that all the following Environment Variables are copied from your local `.env.local` file into the Vercel Dashboard Settings -> Environment Variables.

## Required Environment Variables

- [ ] `MONGODB_URI`
- [ ] `NEXTAUTH_SECRET`
- [ ] `GOOGLE_CLIENT_ID`
- [ ] `GOOGLE_CLIENT_SECRET`
- [ ] `CLOUDINARY_CLOUD_NAME`
- [ ] `CLOUDINARY_API_KEY`
- [ ] `CLOUDINARY_API_SECRET`
- [ ] `ADMIN_EMAIL`

## NextAuth Vercel Configuration Note

In a local environment, NextAuth uses `NEXTAUTH_URL=http://localhost:3000`. 
When deploying to Vercel, NextAuth automatically handles the `NEXTAUTH_URL` under the hood based on the deployment URL, so you **do not** need to set `NEXTAUTH_URL` in Vercel unless you want to lock it to a specific custom production domain.
