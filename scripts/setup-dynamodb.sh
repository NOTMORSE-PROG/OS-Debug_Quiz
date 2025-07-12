#!/bin/bash

# AWS DynamoDB Setup Script for OpenSource Debug Challenge
# Make sure you have AWS CLI installed and configured

echo "🚀 Setting up AWS DynamoDB for OpenSource Debug Challenge..."

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first:"
    echo "   npm install -g aws-cli"
    echo "   or visit: https://aws.amazon.com/cli/"
    exit 1
fi

# Check if AWS is configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS CLI is not configured. Please run:"
    echo "   aws configure"
    echo "   And enter your Access Key ID, Secret Access Key, and Region"
    exit 1
fi

echo "✅ AWS CLI is configured"

# Set variables
TABLE_NAME="opensociety-leaderboard"
REGION="us-east-1"

echo "📊 Creating DynamoDB table: $TABLE_NAME"

# Create the DynamoDB table
aws dynamodb create-table \
    --table-name $TABLE_NAME \
    --attribute-definitions \
        AttributeName=id,AttributeType=S \
    --key-schema \
        AttributeName=id,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --region $REGION

if [ $? -eq 0 ]; then
    echo "✅ DynamoDB table '$TABLE_NAME' created successfully!"
    echo ""
    echo "📝 Next steps:"
    echo "1. Add these environment variables to your .env.local file:"
    echo "   AWS_ACCESS_KEY_ID=your_access_key_here"
    echo "   AWS_SECRET_ACCESS_KEY=your_secret_key_here"
    echo "   AWS_REGION=$REGION"
    echo "   DYNAMODB_TABLE_NAME=$TABLE_NAME"
    echo ""
    echo "2. Install AWS SDK packages:"
    echo "   npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb"
    echo ""
    echo "3. Your table will be ready in a few minutes!"
else
    echo "❌ Failed to create DynamoDB table"
    echo "This might be because:"
    echo "- Table already exists"
    echo "- Insufficient permissions"
    echo "- AWS CLI configuration issues"
fi
