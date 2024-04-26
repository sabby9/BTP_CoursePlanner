"use server"
import { auth } from "@/app/auth";

export default async function getUser() {
    try {
        const session = await auth();
        return session["user"]["email"]

    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({ error: 'Authentication failed' });
    }
}
