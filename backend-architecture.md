# Complete Backend Architecture for Word-Guessing App

## Database Schema (Firebase Firestore)

### Collections Structure

```typescript
// Enhanced Collections
COLLECTIONS = {
  DAILY_WORDS: 'dailyWords',
  SUBMISSIONS: 'submissions', 
  ARCHIVE: 'archive',
  ADMIN_USERS: 'adminUsers',
  ANALYSIS_RESULTS: 'analysisResults',
  SCHEDULED_JOBS: 'scheduledJobs',
  APP_CONFIG: 'appConfig'
}

// Enhanced Data Models
interface DailyWord {
  id: string;
  word: string;
  image?: string;
  date: string;
  isActive: boolean;
  expiresAt: Date;
  aiMeaning?: string;
  winners?: string[];
  adminOverride?: boolean;
  adminId?: string;
  createdAt: Date;
  submissionCount: number;
  status: 'active' | 'analyzing' | 'completed' | 'archived';
}

interface Submission {
  id: string;
  wordId: string;
  text: string;
  username: string;
  likes: number;
  likedBy: string[];
  timestamp: Date;
  isApproved: boolean;
  userSession: string;
  ipAddress?: string;
}

interface AnalysisResult {
  id: string;
  wordId: string;
  topInterpretations: Array<{
    interpretation: string;
    count: number;
    percentage: number;
  }>;
  summary: string;
  totalSubmissions: number;
  analyzedAt: Date;
  adminApproved: boolean;
  adminEditedSummary?: string;
}

interface AdminUser {
  id: string;
  username: string;
  passwordHash: string;
  role: 'admin' | 'super_admin';
  createdAt: Date;
  lastLogin?: Date;
}

interface ScheduledJob {
  id: string;
  type: 'word_generation' | 'analysis' | 'archive';
  scheduledFor: Date;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: any;
  error?: string;
  createdAt: Date;
}

interface AppConfig {
  id: string;
  submissionThreshold: number;
  analysisDelay: number; // hours
  wordGenerationTime: string; // "09:00"
  enableManualTrigger: boolean;
  aiProvider: 'gemini' | 'openai';
  maxSubmissionsPerUser: number;
}
```

## API Architecture

### Core Services Structure

```typescript
// services/
├── firebaseService.ts      ✅ (Enhanced)
├── geminiService.ts        ✅ (Enhanced) 
├── schedulerService.ts     ❌ (New)
├── adminService.ts         ❌ (New)
├── analysisService.ts      ❌ (New)
├── notificationService.ts  ❌ (New)
└── cacheService.ts         ❌ (New)
```

### API Endpoints Structure

```typescript
// api/
├── words/
│   ├── generate.js         ✅ (Enhanced)
│   ├── current.js          ❌ (New)
│   ├── archive.js          ❌ (New)
│   └── admin.js            ❌ (New)
├── submissions/
│   ├── create.js           ❌ (New)
│   ├── list.js             ❌ (New)
│   ├── like.js             ❌ (New)
│   └── moderate.js         ❌ (New)
├── analysis/
│   ├── trigger.js          ❌ (New)
│   ├── results.js          ❌ (New)
│   └── approve.js          ❌ (New)
├── admin/
│   ├── auth.js             ❌ (New)
│   ├── dashboard.js        ❌ (New)
│   ├── override.js         ❌ (New)
│   └── config.js           ❌ (New)
└── scheduler/
    ├── jobs.js             ❌ (New)
    └── trigger.js          ❌ (New)
```

## Data Flow & Logic Architecture

### 1. Daily Word Generation Flow
```
Scheduler → Check Time/Trigger → Generate Word → Generate Image → 
Store in DB → Mark as Active → Archive Previous → Clear Submissions
```

### 2. Submission Flow
```
User Input → Validation → Store Submission → Real-time Update → 
Check Threshold → Trigger Analysis (if needed)
```

### 3. Analysis Flow
```
Threshold Met → Collect Submissions → AI Analysis → 
Store Results → Admin Approval → Display Results
```

### 4. Admin Flow
```
Admin Login → Dashboard → Override/Approve → Manual Triggers → 
Content Management → Configuration
```

## Required New Services

### 1. Scheduler Service
- Cron-like functionality for daily word generation
- Job queue management
- Retry logic for failed jobs
- Status tracking

### 2. Admin Service  
- Authentication & authorization
- Content moderation
- Manual overrides
- Configuration management

### 3. Analysis Service
- Submission aggregation
- AI-powered analysis
- Result processing
- Admin approval workflow

### 4. Cache Service
- Redis-like caching for performance
- Session management
- Rate limiting
- Temporary data storage

## Security & Performance

### Authentication
- JWT tokens for admin sessions
- Rate limiting per IP/session
- Input validation & sanitization
- CORS configuration

### Performance Optimizations
- Firebase offline persistence ✅
- Batch operations ✅
- Real-time listeners ✅
- CDN for images
- Caching strategies

### Data Validation
- Schema validation for all inputs
- Profanity filtering
- Spam detection
- Content moderation

## Integration Points

### External APIs
- Gemini AI ✅
- OpenAI ✅
- ClipDrop (legacy) ✅
- Email notifications (future)
- Analytics tracking (future)

### Frontend Integration
- Real-time updates via Firebase ✅
- State management with React Context ✅
- Error handling & notifications ✅
- Offline support ✅

## Deployment Architecture

### Current Setup
- Frontend: Vite dev server (port 3000) ✅
- Backend: Express server (port 4000) ✅
- Database: Firebase Firestore ✅
- Storage: Firebase Storage (for images) ✅

### Production Recommendations
- Frontend: Vercel/Netlify deployment
- Backend: Cloud Functions or containerized deployment
- CDN: Cloudflare for static assets
- Monitoring: Firebase Analytics + custom metrics

## Missing Critical Components

1. **Automated Scheduling System** - No cron jobs or automated triggers
2. **Admin Panel Backend** - No admin authentication or management APIs
3. **Analysis Pipeline** - No automated submission analysis workflow
4. **Content Moderation** - No spam/profanity filtering
5. **Rate Limiting** - No protection against abuse
6. **Comprehensive Error Handling** - Limited error recovery
7. **Metrics & Analytics** - No usage tracking or performance monitoring

## Next Steps for Implementation

1. Implement scheduler service for automated word generation
2. Build admin authentication and management system
3. Create analysis pipeline with AI integration
4. Add content moderation and rate limiting
5. Implement comprehensive error handling
6. Add metrics and monitoring
7. Optimize for production deployment