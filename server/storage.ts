import { db } from "./db";
import { eq, desc, and, isNull } from "drizzle-orm";
import { 
  users, 
  contactMessages, 
  subscriptions, 
  events, 
  news, 
  galleryImages, 
  attractions,
  type User,
  type InsertUser,
  type ContactMessage,
  type InsertContactMessage,
  type Subscription,
  type InsertSubscription,
  type Event,
  type InsertEvent,
  type News,
  type InsertNews,
  type GalleryImage,
  type InsertGalleryImage,
  type Attraction,
  type InsertAttraction
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact operations
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  
  // Subscription operations
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  getSubscriptions(): Promise<Subscription[]>;
  
  // Event operations
  createEvent(event: InsertEvent): Promise<Event>;
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event>;
  deleteEvent(id: number): Promise<void>;
  
  // News operations
  createNews(newsItem: InsertNews): Promise<News>;
  getNewsItems(): Promise<News[]>;
  getNewsItem(id: number): Promise<News | undefined>;
  updateNews(id: number, newsItem: Partial<InsertNews>): Promise<News>;
  deleteNews(id: number): Promise<void>;
  
  // Gallery operations
  createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;
  getGalleryImages(): Promise<GalleryImage[]>;
  getGalleryImage(id: number): Promise<GalleryImage | undefined>;
  updateGalleryImage(id: number, image: Partial<InsertGalleryImage>): Promise<GalleryImage>;
  deleteGalleryImage(id: number): Promise<void>;
  
  // Attraction operations
  createAttraction(attraction: InsertAttraction): Promise<Attraction>;
  getAttractions(): Promise<Attraction[]>;
  getAttraction(id: number): Promise<Attraction | undefined>;
  updateAttraction(id: number, attraction: Partial<InsertAttraction>): Promise<Attraction>;
  deleteAttraction(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // Contact operations
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [contactMessage] = await db
      .insert(contactMessages)
      .values(message)
      .returning();
    return contactMessage;
  }
  
  async getContactMessages(): Promise<ContactMessage[]> {
    return await db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt));
  }
  
  // Subscription operations
  async createSubscription(subscription: InsertSubscription): Promise<Subscription> {
    try {
      const [newSubscription] = await db
        .insert(subscriptions)
        .values(subscription)
        .returning();
      return newSubscription;
    } catch (error: any) {
      if (error.code === '23505') { // PostgreSQL unique constraint violation
        const customError = new Error("Email already subscribed") as any;
        customError.code = "DUPLICATE_EMAIL";
        throw customError;
      }
      throw error;
    }
  }
  
  async getSubscriptions(): Promise<Subscription[]> {
    return await db
      .select()
      .from(subscriptions)
      .orderBy(desc(subscriptions.createdAt));
  }
  
  // Event operations
  async createEvent(event: InsertEvent): Promise<Event> {
    const [newEvent] = await db
      .insert(events)
      .values(event)
      .returning();
    return newEvent;
  }
  
  async getEvents(): Promise<Event[]> {
    return await db
      .select()
      .from(events)
      .orderBy(desc(events.date));
  }
  
  async getEvent(id: number): Promise<Event | undefined> {
    const [event] = await db
      .select()
      .from(events)
      .where(eq(events.id, id));
    return event;
  }
  
  async updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event> {
    const now = new Date();
    const [updatedEvent] = await db
      .update(events)
      .set({ ...event, updatedAt: now })
      .where(eq(events.id, id))
      .returning();
    return updatedEvent;
  }
  
  async deleteEvent(id: number): Promise<void> {
    await db
      .delete(events)
      .where(eq(events.id, id));
  }
  
  // News operations
  async createNews(newsItem: InsertNews): Promise<News> {
    const [newNews] = await db
      .insert(news)
      .values(newsItem)
      .returning();
    return newNews;
  }
  
  async getNewsItems(): Promise<News[]> {
    return await db
      .select()
      .from(news)
      .orderBy(desc(news.date));
  }
  
  async getNewsItem(id: number): Promise<News | undefined> {
    const [newsItem] = await db
      .select()
      .from(news)
      .where(eq(news.id, id));
    return newsItem;
  }
  
  async updateNews(id: number, newsItem: Partial<InsertNews>): Promise<News> {
    const now = new Date();
    const [updatedNews] = await db
      .update(news)
      .set({ ...newsItem, updatedAt: now })
      .where(eq(news.id, id))
      .returning();
    return updatedNews;
  }
  
  async deleteNews(id: number): Promise<void> {
    await db
      .delete(news)
      .where(eq(news.id, id));
  }
  
  // Gallery operations
  async createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage> {
    const [newImage] = await db
      .insert(galleryImages)
      .values(image)
      .returning();
    return newImage;
  }
  
  async getGalleryImages(): Promise<GalleryImage[]> {
    return await db
      .select()
      .from(galleryImages)
      .orderBy(desc(galleryImages.createdAt));
  }
  
  async getGalleryImage(id: number): Promise<GalleryImage | undefined> {
    const [image] = await db
      .select()
      .from(galleryImages)
      .where(eq(galleryImages.id, id));
    return image;
  }
  
  async updateGalleryImage(id: number, image: Partial<InsertGalleryImage>): Promise<GalleryImage> {
    const [updatedImage] = await db
      .update(galleryImages)
      .set(image)
      .where(eq(galleryImages.id, id))
      .returning();
    return updatedImage;
  }
  
  async deleteGalleryImage(id: number): Promise<void> {
    await db
      .delete(galleryImages)
      .where(eq(galleryImages.id, id));
  }
  
  // Attraction operations
  async createAttraction(attraction: InsertAttraction): Promise<Attraction> {
    const [newAttraction] = await db
      .insert(attractions)
      .values(attraction)
      .returning();
    return newAttraction;
  }
  
  async getAttractions(): Promise<Attraction[]> {
    return await db
      .select()
      .from(attractions)
      .orderBy(desc(attractions.createdAt));
  }
  
  async getAttraction(id: number): Promise<Attraction | undefined> {
    const [attraction] = await db
      .select()
      .from(attractions)
      .where(eq(attractions.id, id));
    return attraction;
  }
  
  async updateAttraction(id: number, attraction: Partial<InsertAttraction>): Promise<Attraction> {
    const now = new Date();
    const [updatedAttraction] = await db
      .update(attractions)
      .set({ ...attraction, updatedAt: now })
      .where(eq(attractions.id, id))
      .returning();
    return updatedAttraction;
  }
  
  async deleteAttraction(id: number): Promise<void> {
    await db
      .delete(attractions)
      .where(eq(attractions.id, id));
  }
}

export const storage = new DatabaseStorage();
