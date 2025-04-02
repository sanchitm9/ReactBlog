import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query, Account } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    account;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
        this.account = new Account(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            let authorName = "Unknown User";
            try {
                // Try to get current user's name
                const userData = await this.account.get();
                authorName = userData.name;
            } catch (userError) {
                console.log("Warning: Could not fetch user data:", userError);
                // Continue with default authorName
            }

            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    authorName
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            throw error; // Propagate the error to handle it in the UI
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    async getMyPosts(){
        try {
            const currentUser = await this.account.get();
            const queries = [
                Query.equal("userId", currentUser.$id),
                Query.equal("status", "active")
            ];
            
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite service :: getMyPosts :: error", error);
            return false
        }
    }

    async getUserById(userId) {
        try {
            const currentUser = await this.account.get();
            return {
                $id: userId,
                name: currentUser.name
            };
        } catch (error) {
            console.log("Appwrite service :: getUserById :: error", error);
            return {
                $id: userId,
                name: "Unknown User"
            };
        }
    }

    // file upload service
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}


const service = new Service()
export default service