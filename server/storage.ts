import { users, type User, type InsertUser, type InsertContactMessage, type ContactMessage, type InsertSubscription, type Subscription } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactMessages: Map<number, ContactMessage>;
  private subscriptions: Map<number, Subscription>;
  private subscriptionsByEmail: Map<string, Subscription>;

  currentUserId: number;
  currentContactMessageId: number;
  currentSubscriptionId: number;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
    this.subscriptions = new Map();
    this.subscriptionsByEmail = new Map();
    
    this.currentUserId = 1;
    this.currentContactMessageId = 1;
    this.currentSubscriptionId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentContactMessageId++;
    const createdAt = new Date();
    const contactMessage: ContactMessage = { ...message, id, createdAt };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }

  async createSubscription(subscription: InsertSubscription): Promise<Subscription> {
    // Check if email already exists
    const existingSubscription = this.subscriptionsByEmail.get(subscription.email);
    if (existingSubscription) {
      const error = new Error("Email already subscribed") as any;
      error.code = "DUPLICATE_EMAIL";
      throw error;
    }
    
    const id = this.currentSubscriptionId++;
    const createdAt = new Date();
    const newSubscription: Subscription = { ...subscription, id, createdAt };
    
    this.subscriptions.set(id, newSubscription);
    this.subscriptionsByEmail.set(subscription.email, newSubscription);
    
    return newSubscription;
  }
}

export const storage = new MemStorage();
