import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  Client = new Client();
  account;

  constructor() {
    this.Client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.projectId);
    this.account = new Account(this.Client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (e) {
      console.log(e);
      throw e;
    }

    return null;
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

const authService = new AuthService();

export default {authService};
