const conf = {
    appwriteConfig: {
        projectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
        appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
        databaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
        collectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
        bucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
    },
}

export default conf