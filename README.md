# Nairobi Arboretum Website

A modern, responsive redesign of the Nairobi Arboretum website with improved UI/UX while preserving all original content.

## Features

- Modern, responsive design built with React and TypeScript
- Green-themed UI reflecting the natural beauty of the arboretum
- Admin area for content management (attractions, events, news, gallery, etc.)
- PostgreSQL database integration
- Authentication system for admin users

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, shadcn/ui components
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Authentication**: Passport.js
- **File Uploads**: Multer

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```
   DATABASE_URL=your_postgresql_connection_string
   SESSION_SECRET=your_session_secret
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment to Render

### Prerequisites

1. Create a [Render](https://render.com) account if you don't have one.
2. Create a PostgreSQL database in Render or use your existing one.

### Steps

1. Push your code to a GitHub repository.

2. In Render dashboard, create a new Web Service:
   - Connect your GitHub repository
   - Select "Node" as the Runtime environment
   - Set the Build Command: `npm install && npm run build`
   - Set the Start Command: `npm run start`

3. Add the following environment variables in the Render dashboard:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `SESSION_SECRET`: A secure random string for session encryption
   - `NODE_ENV`: Set to `production`

4. Click "Create Web Service" to deploy your application.

5. After deployment, you can access your site at the provided Render URL.

## Admin Access

The default admin credentials are:
- Username: `aboretum`
- Password: `temporary_password`

**Important**: Change the default password after the first login.

## Database Schema

The project uses Drizzle ORM with the following main tables:
- Users
- Attractions
- Events
- News
- Gallery Images
- Contact Messages
- Subscriptions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.