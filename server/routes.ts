import type { Express, Request, Response, NextFunction } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactMessageSchema, 
  insertSubscriptionSchema,
  insertUserSchema,
  insertEventSchema,
  insertNewsSchema,
  insertGalleryImageSchema,
  insertAttractionSchema
} from "@shared/schema";
import { ZodError } from "zod";
import session from "express-session";
import { db } from './db';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Set up multer for file uploads
const storage_dir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(storage_dir)) {
  fs.mkdirSync(storage_dir, { recursive: true });
}

// Simplified multer setup to avoid TS issues
const upload = multer({ 
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, storage_dir);
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-').toLowerCase());
    }
  }),
  fileFilter: function(req, file, cb) {
    if (
      file.mimetype === 'image/jpeg' || 
      file.mimetype === 'image/jpg' || 
      file.mimetype === 'image/png' || 
      file.mimetype === 'image/gif' || 
      file.mimetype === 'image/webp'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// Setup passport for authentication
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await storage.getUserByUsername(username);
    if (!user) {
      return done(null, false, { message: 'Incorrect username or password.' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: 'Incorrect username or password.' });
    }
    
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await storage.getUser(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Authentication middleware for admin access
const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ 
      success: false, 
      message: 'You must be logged in to access this resource.' 
    });
  }
  
  if (!(req.user as any)?.isAdmin) {
    return res.status(403).json({ 
      success: false, 
      message: 'You do not have permission to access this resource.' 
    });
  }
  
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup session middleware
  app.use(session({
    secret: process.env.SESSION_SECRET || 'nairobi-arboretum-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production', maxAge: 24 * 60 * 60 * 1000 } // 24 hours
  }));

  // Initialize passport
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Serve uploaded files
  app.use('/uploads', express.static(storage_dir));

  // Public API routes
  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(contactData);
      res.status(201).json({ 
        success: true, 
        message: "Your message has been sent successfully!" 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        console.error("Error submitting contact form:", error);
        res.status(500).json({ 
          success: false, 
          message: "An error occurred while sending your message. Please try again later." 
        });
      }
    }
  });

  // Newsletter subscription endpoint
  app.post("/api/subscribe", async (req, res) => {
    try {
      const subscriptionData = insertSubscriptionSchema.parse(req.body);
      const subscription = await storage.createSubscription(subscriptionData);
      res.status(201).json({ 
        success: true, 
        message: "You have been successfully subscribed to our newsletter!" 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid email address", 
          errors: error.errors 
        });
      } else if ((error as any).code === "DUPLICATE_EMAIL") {
        res.status(409).json({ 
          success: false, 
          message: "This email is already subscribed to our newsletter." 
        });
      } else {
        console.error("Error creating subscription:", error);
        res.status(500).json({ 
          success: false, 
          message: "An error occurred while processing your subscription. Please try again later." 
        });
      }
    }
  });
  
  // Get all events (public)
  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getEvents();
      res.status(200).json({ success: true, events });
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch events. Please try again later." 
      });
    }
  });
  
  // Get a specific event (public)
  app.get("/api/events/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid event ID" 
        });
      }
      
      const event = await storage.getEvent(id);
      if (!event) {
        return res.status(404).json({ 
          success: false, 
          message: "Event not found" 
        });
      }
      
      res.status(200).json({ success: true, event });
    } catch (error) {
      console.error("Error fetching event:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch event. Please try again later." 
      });
    }
  });
  
  // Get all news items (public)
  app.get("/api/news", async (req, res) => {
    try {
      const newsItems = await storage.getNewsItems();
      res.status(200).json({ success: true, news: newsItems });
    } catch (error) {
      console.error("Error fetching news items:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch news items. Please try again later." 
      });
    }
  });
  
  // Get a specific news item (public)
  app.get("/api/news/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid news ID" 
        });
      }
      
      const newsItem = await storage.getNewsItem(id);
      if (!newsItem) {
        return res.status(404).json({ 
          success: false, 
          message: "News item not found" 
        });
      }
      
      res.status(200).json({ success: true, news: newsItem });
    } catch (error) {
      console.error("Error fetching news item:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch news item. Please try again later." 
      });
    }
  });
  
  // Get all gallery images (public)
  app.get("/api/gallery", async (req, res) => {
    try {
      const images = await storage.getGalleryImages();
      res.status(200).json({ success: true, images });
    } catch (error) {
      console.error("Error fetching gallery images:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch gallery images. Please try again later." 
      });
    }
  });
  
  // Get all attractions (public)
  app.get("/api/attractions", async (req, res) => {
    try {
      const attractions = await storage.getAttractions();
      res.status(200).json({ success: true, attractions });
    } catch (error) {
      console.error("Error fetching attractions:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch attractions. Please try again later." 
      });
    }
  });
  
  // Admin Authentication
  // Login route
  app.post("/api/admin/login", passport.authenticate('local'), (req, res) => {
    res.status(200).json({ 
      success: true, 
      message: "Login successful", 
      user: { 
        id: (req.user as any).id, 
        username: (req.user as any).username, 
        isAdmin: (req.user as any).isAdmin 
      } 
    });
  });
  
  // Logout route
  app.post("/api/admin/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ 
          success: false, 
          message: "Error logging out" 
        });
      }
      res.status(200).json({ 
        success: true, 
        message: "Logout successful" 
      });
    });
  });
  
  // Check authentication status
  app.get("/api/admin/auth-check", (req, res) => {
    if (req.isAuthenticated() && (req.user as any).isAdmin) {
      return res.status(200).json({ 
        success: true, 
        authenticated: true, 
        user: { 
          id: (req.user as any).id, 
          username: (req.user as any).username, 
          isAdmin: (req.user as any).isAdmin 
        } 
      });
    }
    res.status(200).json({ success: true, authenticated: false });
  });
  
  // Admin API Routes - All require admin authentication
  // Contact Messages
  app.get("/api/admin/contact-messages", requireAdmin, async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.status(200).json({ success: true, messages });
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch contact messages. Please try again later." 
      });
    }
  });
  
  // Subscriptions
  app.get("/api/admin/subscriptions", requireAdmin, async (req, res) => {
    try {
      const subscriptions = await storage.getSubscriptions();
      res.status(200).json({ success: true, subscriptions });
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch subscriptions. Please try again later." 
      });
    }
  });
  
  // Events Management
  app.post("/api/admin/events", requireAdmin, async (req, res) => {
    try {
      const eventData = insertEventSchema.parse({
        ...req.body,
        createdBy: (req.user as any).id
      });
      const event = await storage.createEvent(eventData);
      res.status(201).json({ success: true, event });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid event data", 
          errors: error.errors 
        });
      } else {
        console.error("Error creating event:", error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to create event. Please try again later." 
        });
      }
    }
  });
  
  app.put("/api/admin/events/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid event ID" 
        });
      }
      
      const eventData = insertEventSchema.partial().parse(req.body);
      const event = await storage.updateEvent(id, eventData);
      res.status(200).json({ success: true, event });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid event data", 
          errors: error.errors 
        });
      } else {
        console.error("Error updating event:", error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to update event. Please try again later." 
        });
      }
    }
  });
  
  app.delete("/api/admin/events/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid event ID" 
        });
      }
      
      await storage.deleteEvent(id);
      res.status(200).json({ success: true, message: "Event deleted successfully" });
    } catch (error) {
      console.error("Error deleting event:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to delete event. Please try again later." 
      });
    }
  });
  
  // News Management
  app.post("/api/admin/news", requireAdmin, upload.single('image'), async (req, res) => {
    try {
      let imageUrl = null;
      if (req.file) {
        // If image uploaded, set the URL to the file path
        imageUrl = `/uploads/${req.file.filename}`;
      }
      
      const newsData = insertNewsSchema.parse({
        ...req.body,
        imageUrl,
        createdBy: (req.user as any).id
      });
      
      const newsItem = await storage.createNews(newsData);
      res.status(201).json({ success: true, news: newsItem });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid news data", 
          errors: error.errors 
        });
      } else {
        console.error("Error creating news:", error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to create news item. Please try again later." 
        });
      }
    }
  });
  
  app.put("/api/admin/news/:id", requireAdmin, upload.single('image'), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid news ID" 
        });
      }
      
      let updateData = req.body;
      if (req.file) {
        // If image uploaded, set the URL to the file path
        updateData.imageUrl = `/uploads/${req.file.filename}`;
      }
      
      const newsData = insertNewsSchema.partial().parse(updateData);
      const newsItem = await storage.updateNews(id, newsData);
      res.status(200).json({ success: true, news: newsItem });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid news data", 
          errors: error.errors 
        });
      } else {
        console.error("Error updating news:", error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to update news item. Please try again later." 
        });
      }
    }
  });
  
  app.delete("/api/admin/news/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid news ID" 
        });
      }
      
      const newsItem = await storage.getNewsItem(id);
      if (newsItem && newsItem.imageUrl) {
        // Delete the file if it exists
        const filePath = path.join(process.cwd(), newsItem.imageUrl);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      
      await storage.deleteNews(id);
      res.status(200).json({ success: true, message: "News item deleted successfully" });
    } catch (error) {
      console.error("Error deleting news:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to delete news item. Please try again later." 
      });
    }
  });
  
  // Gallery Management
  app.post("/api/admin/gallery", requireAdmin, upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Image file is required"
        });
      }
      
      const imageUrl = `/uploads/${req.file.filename}`;
      
      const imageData = insertGalleryImageSchema.parse({
        ...req.body,
        src: imageUrl,
        createdBy: (req.user as any).id
      });
      
      const image = await storage.createGalleryImage(imageData);
      res.status(201).json({ success: true, image });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid image data", 
          errors: error.errors 
        });
      } else {
        console.error("Error creating gallery image:", error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to upload image. Please try again later." 
        });
      }
    }
  });
  
  app.put("/api/admin/gallery/:id", requireAdmin, upload.single('image'), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid image ID" 
        });
      }
      
      let updateData = req.body;
      if (req.file) {
        // If new image uploaded, update the URL
        updateData.src = `/uploads/${req.file.filename}`;
        
        // Delete old image if it exists
        const image = await storage.getGalleryImage(id);
        if (image && image.src) {
          const filePath = path.join(process.cwd(), image.src);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
      }
      
      const imageData = insertGalleryImageSchema.partial().parse(updateData);
      const updatedImage = await storage.updateGalleryImage(id, imageData);
      res.status(200).json({ success: true, image: updatedImage });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid image data", 
          errors: error.errors 
        });
      } else {
        console.error("Error updating gallery image:", error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to update image. Please try again later." 
        });
      }
    }
  });
  
  app.delete("/api/admin/gallery/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid image ID" 
        });
      }
      
      const image = await storage.getGalleryImage(id);
      if (image && image.src) {
        // Delete the file if it exists
        const filePath = path.join(process.cwd(), image.src);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      
      await storage.deleteGalleryImage(id);
      res.status(200).json({ success: true, message: "Gallery image deleted successfully" });
    } catch (error) {
      console.error("Error deleting gallery image:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to delete image. Please try again later." 
      });
    }
  });
  
  // Attractions Management
  app.post("/api/admin/attractions", requireAdmin, upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Image file is required"
        });
      }
      
      const imageUrl = `/uploads/${req.file.filename}`;
      
      // Handle features array
      let features = [];
      if (req.body.features) {
        try {
          features = JSON.parse(req.body.features);
        } catch (e) {
          return res.status(400).json({
            success: false,
            message: "Features must be a valid JSON array"
          });
        }
      }
      
      const attractionData = insertAttractionSchema.parse({
        ...req.body,
        image: imageUrl,
        features,
        createdBy: (req.user as any).id
      });
      
      const attraction = await storage.createAttraction(attractionData);
      res.status(201).json({ success: true, attraction });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid attraction data", 
          errors: error.errors 
        });
      } else {
        console.error("Error creating attraction:", error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to create attraction. Please try again later." 
        });
      }
    }
  });
  
  app.put("/api/admin/attractions/:id", requireAdmin, upload.single('image'), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid attraction ID" 
        });
      }
      
      let updateData = req.body;
      if (req.file) {
        // If new image uploaded, update the URL
        updateData.image = `/uploads/${req.file.filename}`;
        
        // Delete old image if it exists
        const attraction = await storage.getAttraction(id);
        if (attraction && attraction.image) {
          const filePath = path.join(process.cwd(), attraction.image);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
      }
      
      // Handle features array
      if (updateData.features) {
        try {
          updateData.features = JSON.parse(updateData.features);
        } catch (e) {
          return res.status(400).json({
            success: false,
            message: "Features must be a valid JSON array"
          });
        }
      }
      
      const attractionData = insertAttractionSchema.partial().parse(updateData);
      const updatedAttraction = await storage.updateAttraction(id, attractionData);
      res.status(200).json({ success: true, attraction: updatedAttraction });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid attraction data", 
          errors: error.errors 
        });
      } else {
        console.error("Error updating attraction:", error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to update attraction. Please try again later." 
        });
      }
    }
  });
  
  app.delete("/api/admin/attractions/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid attraction ID" 
        });
      }
      
      const attraction = await storage.getAttraction(id);
      if (attraction && attraction.image) {
        // Delete the file if it exists
        const filePath = path.join(process.cwd(), attraction.image);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      
      await storage.deleteAttraction(id);
      res.status(200).json({ success: true, message: "Attraction deleted successfully" });
    } catch (error) {
      console.error("Error deleting attraction:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to delete attraction. Please try again later." 
      });
    }
  });
  
  // Create initial admin user if none exists
  app.post("/api/setup", async (req, res) => {
    try {
      // Check if there's already an admin user
      const users = await db.query.users.findMany({
        where: (users, { eq }) => eq(users.isAdmin, true)
      });
      
      if (users.length > 0) {
        return res.status(403).json({
          success: false,
          message: "Admin user already exists"
        });
      }
      
      // Validate and hash password
      const userData = insertUserSchema.parse(req.body);
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      // Create the admin user
      const adminUser = await storage.createUser({
        ...userData,
        password: hashedPassword,
        isAdmin: true
      });
      
      res.status(201).json({
        success: true,
        message: "Admin user created successfully",
        user: {
          id: adminUser.id,
          username: adminUser.username,
          email: adminUser.email,
          isAdmin: adminUser.isAdmin
        }
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid user data",
          errors: error.errors
        });
      } else {
        console.error("Error creating admin user:", error);
        res.status(500).json({
          success: false,
          message: "Failed to create admin user. Please try again later."
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
