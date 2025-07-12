# 🎯 OpenSource Debug Challenge

**Interactive Code Debugging Platform for T.I.P Manila Academic Club**

A modern web application where students can practice debugging skills by fixing real code errors in Python, Java, HTML, and CSS. Built with Next.js and designed for beginner programmers.

![OpenSource Logo](public/logo.png)

## 🚀 Features

### 🎮 Interactive Debugging
- **Real Code Editing**: Fix actual syntax errors, missing semicolons, unclosed tags
- **4 Programming Languages**: Python, Java, HTML, CSS
- **10 Random Challenges** per session from a pool of 20 per language
- **1-minute Timer** per challenge with auto-advance
- **Tab Key Support** for proper code indentation

### ⚡ Speed-Based Scoring System
- **Lightning Fast (\< 15s)**: 25 points
- **Quick Fix (15-30s)**: 20 points  
- **Steady Progress (30-45s)**: 15 points
- **Got There (45-60s)**: 10 points
- **Hint Penalty**: -5 points

### 🏆 Competitive Features
- **Real-time Leaderboard** with top 3 podium
- **Achievement Levels**: Code Ninja, Debug Expert, Bug Hunter, Code Learner
- **QR Code Integration** for additional resources
- **Hint System** when students get stuck

## 📋 Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn**
- **MongoDB Atlas** account (recommended database)

## 🛠️ Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/opensociety-tip/debug-challenge.git
   cd debug-challenge
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

4. **Configure your database** (see Database Setup below)

5. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**
   Navigate to \`http://localhost:3000\`

## 🗄️ Database Setup

### AWS DynamoDB

**Why AWS DynamoDB?**
- ✅ **Free Tier**: 25GB storage and 25 read/write capacity units
- ✅ **Serverless**: No server management required
- ✅ **Fast Performance**: Single-digit millisecond latency
- ✅ **Scalable**: Handles any amount of traffic
- ✅ **Reliable**: 99.99% availability SLA

**Setup Steps:**

1. **Create AWS Account**
   - Go to [AWS Console](https://aws.amazon.com/console/)
   - Sign up for free tier account

2. **Create DynamoDB Table**
   \`\`\`bash
   # Using AWS CLI (install first: npm install -g aws-cli)
   aws dynamodb create-table \
     --table-name opensociety-leaderboard \
     --attribute-definitions \
       AttributeName=id,AttributeType=S \
     --key-schema \
       AttributeName=id,KeyType=HASH \
     --billing-mode PAY_PER_REQUEST \
     --region us-east-1
   \`\`\`

3. **Get AWS Credentials**
   - Go to AWS IAM Console
   - Create new user with DynamoDB permissions
   - Generate Access Key and Secret Key

4. **Configure Environment Variables**
   Add to `.env.local`:
   \`\`\`
   AWS_ACCESS_KEY_ID=your_access_key_here
   AWS_SECRET_ACCESS_KEY=your_secret_key_here
   AWS_REGION=us-east-1
   DYNAMODB_TABLE_NAME=opensociety-leaderboard
   \`\`\`

5. **Install AWS SDK**
   \`\`\`bash
   npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
   \`\`\`

**Table Schema:**
\`\`\`json
{
  "id": "string (primary key)",
  "name": "string",
  "score": "number", 
  "language": "string",
  "date": "string",
  "totalQuestions": "number",
  "completionTime": "number",
  "avgTimePerChallenge": "number"
}
\`\`\`

**Alternative AWS Options:**
- **AWS RDS**: For traditional SQL databases (MySQL, PostgreSQL)
- **AWS DocumentDB**: MongoDB-compatible document database
- **AWS Aurora Serverless**: Auto-scaling relational database

## 🎯 Scoring Criteria

### Point System (Per Challenge)

| Speed Range | Points Awarded | Badge |
|-------------|----------------|-------|
| \< 15 seconds | 25 points | ⚡ Lightning Fast |
| 15-30 seconds | 20 points | 🚀 Quick Fix |
| 30-45 seconds | 15 points | 📈 Steady Progress |
| 45-60 seconds | 10 points | ✅ Got There |
| Used Hint | -5 points | 💡 Hint Penalty |
| Wrong/Timeout | 0 points | ❌ No Points |

### Achievement Levels

| Score Range | Level | Badge | Description |
|-------------|-------|-------|-------------|
| 200-250 | Code Ninja | 🥷 Master | Lightning-fast debugging skills |
| 150-199 | Debug Expert | 🔧 Expert | Excellent problem-solving ability |
| 100-149 | Bug Hunter | 🐛 Hunter | Good debugging fundamentals |
| \< 100 | Code Learner | 📚 Learning | Keep practicing! |

## 🎮 Challenge Types by Language

### 🐍 Python Challenges
**Focus**: Syntax errors, indentation, variable names
- Missing colons in functions/loops
- Indentation errors
- Variable name mismatches
- Missing parentheses/brackets
- Type conversion errors

**Example**:
\`\`\`python
# Broken Code
def greet(name)
    return "Hello, " + name

# Fixed Code  
def greet(name):
    return "Hello, " + name
\`\`\`

### ☕ Java Challenges
**Focus**: Missing semicolons, compilation errors
- Missing semicolons
- Unclosed string literals
- Method call syntax
- Array declaration errors
- Class/method structure

**Example**:
\`\`\`java
// Broken Code
System.out.println("Hello World")

// Fixed Code
System.out.println("Hello World");
\`\`\`

### 🌐 HTML Challenges
**Focus**: Unclosed tags, missing quotes (Beginner-friendly!)
- Missing closing tags (\</h1\>, \</p\>, \</div\>)
- Unclosed quotes in attributes
- Basic structure errors
- Simple syntax mistakes

**Example**:
\`\`\`html
<!-- Broken Code -->
<h1>Welcome to my website
<p>This is a paragraph.</p>

<!-- Fixed Code -->
<h1>Welcome to my website</h1>
<p>This is a paragraph.</p>
\`\`\`

### 🎨 CSS Challenges
**Focus**: Missing semicolons, syntax errors
- Missing semicolons
- Missing closing braces
- Invalid property values
- Color syntax errors
- Missing units (px, %, em)

**Example**:
\`\`\`css
/* Broken Code */
.container {
    width: 100%
    height: 200px;
}

/* Fixed Code */
.container {
    width: 100%;
    height: 200px;
}
\`\`\`

## 🏗️ Project Structure

\`\`\`
opensociety-debug-quiz/
├── app/
│   ├── page.tsx              # Home page with language selection
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── code-editor.tsx       # Main quiz interface
│   ├── qr-code-modal.tsx     # QR code display
│   ├── name-input.tsx        # Score submission
│   ├── leaderboard.tsx       # Rankings display
│   └── ui/                   # Reusable UI components
├── lib/
│   ├── challenges.ts         # All quiz questions
│   └── utils.ts              # Utility functions
├── public/
│   ├── logo.png              # OpenSource logo
│   └── qr-code.png           # Resource QR code
└── README.md                 # This file
\`\`\`

## 🎨 Technologies Used

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: MongoDB Atlas (recommended)
- **Deployment**: Vercel (recommended)
- **Icons**: Lucide React
- **State Management**: React hooks


## 🤝 Contributing

1. Fork the repository
2. Create feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit changes (\`git commit -m 'Add amazing feature'\`)
4. Push to branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📝 Adding New Challenges

To add new debugging challenges:

1. Open \`lib/challenges.ts\`
2. Add to the appropriate language array:
   \`\`\`typescript
   {
     id: 21,
     description: "Fix the missing semicolon",
     brokenCode: \`// broken code here\`,
     correctCode: \`// fixed code here\`,
     expectedOutput: "Expected result",
     currentOutput: "Current error",
     hint: "Helpful hint for students"
   }
   \`\`\`

## 🎓 Educational Goals

This platform helps students:
- **Practice Real Debugging**: Fix actual code errors, not theoretical problems
- **Learn by Doing**: Interactive editing instead of multiple choice
- **Build Speed**: Competitive timing encourages quick problem-solving
- **Understand Syntax**: Focus on common beginner mistakes
- **Gain Confidence**: Progressive difficulty and helpful hints

## 📊 Analytics & Insights

Track student progress with:
- **Completion Times**: Average time per challenge
- **Error Patterns**: Most common mistakes by language
- **Improvement Metrics**: Score progression over time
- **Popular Languages**: Which languages students prefer

## 🔧 Customization

### Adding New Languages
1. Create new challenge array in \`lib/challenges.ts\`
2. Add language option in \`app/page.tsx\`
3. Update scoring logic if needed

### Modifying Scoring
Update point values in \`components/code-editor.tsx\`:
\`\`\`typescript
const calculatePoints = (timeSpent: number, usedHint: boolean) => {
  // Modify point values here
}

\`\`\`

## 🙏 Acknowledgments

- **T.I.P Manila** for supporting student innovation
- **OpenSource Academic Club** for the vision
- **Students** who will use this platform to learn and grow

---

**Built with ❤️ by OpenSource Academic Club - T.I.P Manila 2025**

*Empowering the next generation of developers through interactive learning*
\`\`\`
