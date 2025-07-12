import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb"

// Configure AWS DynamoDB client
const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

const docClient = DynamoDBDocumentClient.from(client)

export interface LeaderboardEntry {
  id: string
  name: string
  score: number
  language: string
  date: string
  totalQuestions: number
  completionTime: number
  avgTimePerChallenge: number
}

// Save score to DynamoDB
export async function saveScore(entry: Omit<LeaderboardEntry, "id">): Promise<void> {
  const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  const command = new PutCommand({
    TableName: process.env.DYNAMODB_TABLE_NAME || "opensociety-leaderboard",
    Item: {
      id,
      ...entry,
    },
  })

  try {
    await docClient.send(command)
  } catch (error) {
    console.error("Error saving score:", error)
    throw new Error("Failed to save score")
  }
}

// Get all scores from DynamoDB
export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const command = new ScanCommand({
    TableName: process.env.DYNAMODB_TABLE_NAME || "opensociety-leaderboard",
  })

  try {
    const response = await docClient.send(command)
    const items = response.Items as LeaderboardEntry[]

    // Sort by score descending
    return items.sort((a, b) => b.score - a.score)
  } catch (error) {
    console.error("Error fetching leaderboard:", error)
    throw new Error("Failed to fetch leaderboard")
  }
}

// Get top scores by language
export async function getLeaderboardByLanguage(language: string): Promise<LeaderboardEntry[]> {
  const command = new ScanCommand({
    TableName: process.env.DYNAMODB_TABLE_NAME || "opensociety-leaderboard",
    FilterExpression: "#lang = :language",
    ExpressionAttributeNames: {
      "#lang": "language",
    },
    ExpressionAttributeValues: {
      ":language": language,
    },
  })

  try {
    const response = await docClient.send(command)
    const items = response.Items as LeaderboardEntry[]

    // Sort by score descending
    return items.sort((a, b) => b.score - a.score)
  } catch (error) {
    console.error("Error fetching leaderboard by language:", error)
    throw new Error("Failed to fetch leaderboard")
  }
}
