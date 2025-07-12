# AWS DynamoDB Setup Guide

## Step 1: Install AWS CLI
\`\`\`bash
# Install AWS CLI
npm install -g aws-cli

# Or download from: https://aws.amazon.com/cli/
\`\`\`

## Step 2: Configure AWS CLI
\`\`\`bash
aws configure
\`\`\`
Enter your:
- AWS Access Key ID
- AWS Secret Access Key  
- Default region: us-east-1
- Default output format: json

## Step 3: Create DynamoDB Table
\`\`\`bash
# Run the setup script
npm run setup-db

# Or manually:
aws dynamodb create-table \
    --table-name opensociety-leaderboard \
    --attribute-definitions AttributeName=id,AttributeType=S \
    --key-schema AttributeName=id,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --region us-east-1
\`\`\`

## Step 4: Set Environment Variables
Create `.env.local` file:
\`\`\`
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
AWS_REGION=us-east-1
DYNAMODB_TABLE_NAME=opensociety-leaderboard
\`\`\`

## Step 5: Install Dependencies
\`\`\`bash
npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
\`\`\`

## Step 6: Test Connection
\`\`\`bash
npm run dev
\`\`\`

Your leaderboard should now save to AWS DynamoDB!
