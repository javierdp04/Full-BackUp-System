import { Router } from "express";
import { compareFilesWithDB, compareChunksWithDB } from "../../utils/backup/chunkingHelpers.ts";
import type { Chunk } from "../../models/models.ts";

const router = Router();

router.post("/compare-files", async (req, res) => {
    const data = req.body;

    try{
        const filesHashes : string[] = await compareFilesWithDB(Object.keys(data));
        const  chunks : Chunk[] = [];

        for( const hash of filesHashes ) {
            const missinChunks : Chunk [] =  await compareChunksWithDB(data[hash]);
            chunks.push(...missinChunks);
        }

        res.status(200).json({
            filesHashes : filesHashes,
            chunks : chunks
        });
    }catch(err) {
        res.status(500).json({
            error : err
        });
    }

})

export default router;