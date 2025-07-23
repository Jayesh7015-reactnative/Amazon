# Amazon Clone Project Guidelines

## Project Overview
This is a React/TypeScript e-commerce application inspired by Amazon, built with Create React App, Material-UI, and Firebase authentication.

## 🚨 CRITICAL DEVELOPMENT RULES

### UI/UX Standards
1. **Use existing CSS modules** - Each component has its own CSS file
2. **Material-UI for icons and components** - Already installed and configured
3. **Maintain consistent Amazon-like styling** - Orange accent (#ff9f00), dark header
4. **Responsive design** - Mobile-first approach
5. **Component-based architecture** - Keep components modular and reusable

### Code Organization
1. **Component Structure**:
   - Each feature in its own folder under `/src/components/`
   - CSS file alongside each component
   - TypeScript interfaces for all props
2. **State Management**:
   - Use React Context (AppContext) for global state
   - Local state with useState for component-specific data
3. **Routing**:
   - React Router DOM for navigation
   - Protected routes for authenticated features

## Core Development Principles

### 1. Task Management
- **Task Tracking**: Use TodoWrite tool to track all development tasks
- **Small Commits**: Make focused, atomic commits
- **Feature Branches**: Create branches for new features
- **Testing**: Test all features before marking complete

### 2. React/TypeScript Standards
```typescript
// Component Template
import React from 'react';
import './ComponentName.css';

interface ComponentNameProps {
  // Define all props with TypeScript
}

const ComponentName: React.FC<ComponentNameProps> = (props) => {
  // Component logic
  return (
    <div className="component-name">
      {/* JSX content */}
    </div>
  );
};

export default ComponentName;
```

### 3. CSS Guidelines
- Use BEM naming convention for CSS classes
- Keep styles scoped to components
- Reuse common styles through CSS variables in index.css
- Maintain consistent spacing and colors

### 4. Firebase Integration
- Environment variables for Firebase config
- Proper error handling for auth operations
- Security rules for database access
- Use Firebase SDK v9+ modular syntax

### 5. Component Guidelines

#### Product Components
- Product cards should be reusable
- Lazy load images for performance
- Implement proper price formatting
- Star ratings using Material-UI Rating component

#### Cart/Checkout
- Persist cart state in context
- Calculate subtotal dynamically
- Implement quantity controls
- Guest checkout option

#### Authentication
- Email/password authentication
- Form validation
- Error message display
- Redirect after login/signup

### 6. Performance Optimization
- Code splitting with React.lazy()
- Optimize images (use appropriate formats/sizes)
- Implement pagination for product lists
- Memoize expensive calculations

### 7. Testing Requirements
```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test ComponentName.test.tsx
```

### 8. Build & Deployment
```bash
# Development server
npm start

# Production build
npm run build

# Deploy to GitHub Pages
npm run deploy

# Type checking
npx tsc --noEmit
```

### 9. Git Workflow
- Commit message format: `feat: Add feature` or `fix: Fix issue`
- Branch naming: `feature/feature-name` or `fix/bug-description`
- Pull requests for all changes
- Keep main branch stable

### 10. Security Best Practices
- Never commit Firebase keys (use .env.local)
- Validate all user inputs
- Sanitize data before display
- Implement proper CORS policies
- Use HTTPS for all external APIs

## Project Structure
```
amazon-clone/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── Checkout/   # Checkout flow
│   │   ├── Header/     # Navigation header
│   │   ├── Home/       # Homepage
│   │   ├── Login/      # Auth pages
│   │   ├── Product/    # Product components
│   │   └── ...         # Other features
│   ├── context/        # React Context providers
│   ├── services/       # API and external services
│   ├── utils/          # Helper functions
│   ├── App.tsx         # Main app component
│   ├── firebase.ts     # Firebase configuration
│   └── index.tsx       # App entry point
├── .env.local          # Environment variables (create this)
├── package.json        # Dependencies
└── tsconfig.json       # TypeScript config
```

## Development Checklist
Before completing any task:
- [ ] Code follows TypeScript best practices
- [ ] Component has proper prop types
- [ ] CSS is properly scoped
- [ ] Feature works on mobile devices
- [ ] No console errors or warnings
- [ ] Tests written (if applicable)
- [ ] Code is accessible (ARIA labels, semantic HTML)

## Quick Start Commands
```bash
# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build

# Check TypeScript errors
npx tsc --noEmit

# Format code (if prettier is installed)
npx prettier --write src/
```

## Important Notes
- This project uses Create React App (not Next.js)
- Material-UI is the primary component library
- Firebase handles authentication and potentially database
- Focus on e-commerce functionality
- Maintain Amazon-like user experience

---
Last Updated: 2025-07-23
Version: 1.0