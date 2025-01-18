import type { NextApiRequest, NextApiResponse } from "next";
import { writeClient } from "@/sanity/lib/write-client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { id, views } = req.body;

    if (!id || typeof views !== "number") {
        return res.status(400).json({ error: "Invalid data" });
    }

    try {
        await writeClient
            .patch(id)
            .set({ views })
            .commit();

        res.status(200).json({ message: "Views updated successfully" });
    } catch (error) {
        console.error("Failed to update views:", error);
        res.status(500).json({ error: "Failed to update views" });
    }
}
