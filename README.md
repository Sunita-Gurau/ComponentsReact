# React Components Learning

A React project for learning and building reusable UI components with TypeScript, Tailwind CSS, and Storybook.

## 📁 Project Structure

```
react-components-learning/
├── src/
│   ├── components/          # React components
│   │   ├── Card.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── Search.tsx
│   │   ├── Dropdown.tsx
│   │   ├── Avatar.tsx
│   │   ├── SearchDemo.tsx
│   │   └── DropdownDemo.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tests/                   # Test files
│   ├── Card.test.tsx
│   ├── ProgressBar.test.tsx
│   ├── Search.test.tsx
│   ├── Dropdown.test.tsx
│   ├── Avatar.test.tsx
│   └── setupTests.ts
├── storybook/              # Storybook stories
│   ├── Card.stories.tsx
│   ├── ProgressBar.stories.tsx
│   ├── Search.stories.tsx
│   ├── Dropdown.stories.tsx
│   └── Avatar.stories.tsx
├── .storybook/             # Storybook configuration
└── public/                 # Static assets
```

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests with Vitest
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for deployment

## 🧩 Components

### Card
A simple card component with customizable content and styling.

### ProgressBar
A progress bar component that displays progress as a percentage.

### Search
A search input component with optional dropdown functionality and autocomplete.

### Dropdown
A flexible dropdown component with multiple variants and features.

### Avatar
A versatile avatar component with image support, fallbacks, status indicators, and multiple sizes/shapes.

## 🧪 Testing

Tests are located in the `tests/` folder and use:
- **Vitest** for test runner
- **React Testing Library** for component testing
- **@testing-library/user-event** for user interaction testing

## 📚 Storybook

Storybook provides interactive documentation for all components:
- **Interactive Controls** - Adjust props in real-time
- **Multiple Variants** - See all component states
- **Accessibility Testing** - Built-in a11y checks
- **Responsive Testing** - Test at different screen sizes

Start Storybook: `npm run storybook`

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Vitest** - Testing
- **Storybook** - Component documentation
- **ESLint** - Code linting

## 📦 Installation

```bash
npm install
```

## 🎯 Development

1. Start the development server: `npm run dev`
2. Start Storybook: `npm run storybook`
3. Run tests: `npm run test`

## 📖 Usage

Each component is self-contained and can be imported from `src/components/`. See individual component files for props and usage examples.
