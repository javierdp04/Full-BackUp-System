import { Router } from "express";
import type { BackUpMetadata, Chunk, FileData } from "../../models/models.ts";
import { updateMetadata } from "../../utils/metadata/metadataUpdates.ts";

const router = Router(); 

router.post("/update-metadata", async (req, res) => {
    const body = req.body
    let hashesOfChunksToBackup : string[] = [];

    const metadata: BackUpMetadata = {
        chunks: new Map<string, Chunk[]>(Object.entries(body.chunks)),
        files: body.files as FileData[]
    }

    try {
        hashesOfChunksToBackup = await updateMetadata(metadata);
    } catch (error) {
        res.status(500);
    }
    
    res.status(200).json({"response" : hashesOfChunksToBackup})
})

export default router;