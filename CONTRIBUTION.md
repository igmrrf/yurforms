# Contributing to YurForms

We love your input! We want to make contributing to YurForms as easy and transparent as possible.

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## Project Structure

 ```
```

src/
├── app/           # Next.js app router
├── services/      # Core services
│   ├── formAnalyzer.ts    # Form field analysis
│   ├── formDetector.ts    # Form detection
│   ├── autoFiller.ts      # Auto-fill logic
│   ├── fieldLearning.ts   # ML capabilities
│   ├── syncManager.ts     # Data synchronization
│   └── conflictResolver.ts # Conflict resolution
├── types/         # TypeScript types
└── config/        # Configuration files

extension/         # Browser extension
├── content.ts     # Content script
├── background.ts  # Background script
└── popup/         # Extension UI

```plaintext

## Setting Up Development Environment

1. Install dependencies:
```bash
npm install
 ```

2. Set up environment variables:
```bash
cp .env.example .env.local
 ```

3. Set up Supabase:
```bash
npm run supabase:start
 ```

4. Run migrations:
```bash
npm run migration:up
 ```

## Code Style
- Use TypeScript for type safety
- Follow the existing code style
- Use meaningful variable names
- Add comments for complex logic
- Write unit tests for new features
## Pull Request Process
1. Update the README.md with details of changes if applicable
2. Update the documentation with details of any new features
3. The PR will be merged once you have the sign-off of two other developers
## License
By contributing, you agree that your contributions will be licensed under its MIT License.
