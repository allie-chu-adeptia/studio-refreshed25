import fs from 'fs'
import path from 'path'

const CHECKPOINT_FILE = path.join(process.cwd(), 'wp-migration-checkpoint.json')

interface Checkpoint {
  lastProcessedId: number
  lastProcessedPage: number
  processedPosts: number[]
}

export const checkpointManager = {
  save: (checkpoint: Checkpoint) => {
    fs.writeFileSync(CHECKPOINT_FILE, JSON.stringify(checkpoint, null, 2))
  },

  load: (): Checkpoint => {
    if (fs.existsSync(CHECKPOINT_FILE)) {
      const data = fs.readFileSync(CHECKPOINT_FILE, 'utf8')
      return JSON.parse(data)
    }
    return {
      lastProcessedId: 0,
      lastProcessedPage: 0,
      processedPosts: []
    }
  },

  clear: () => {
    if (fs.existsSync(CHECKPOINT_FILE)) {
      fs.unlinkSync(CHECKPOINT_FILE)
    }
  }
}