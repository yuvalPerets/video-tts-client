# Video TTS App - Component Structure

## Overview
This project has been refactored to follow React best practices with proper component separation, custom hooks, and clean architecture.

## Project Structure

```
src/
├── components/
│   ├── Header.js              # App title and description
│   ├── FileUploadZone.js      # Drag & drop file upload area
│   ├── TextInput.js           # TTS text input with character count
│   ├── ProgressBar.js         # Upload and processing progress
│   ├── StatusMessage.js       # Status display messages
│   ├── SubmitButton.js        # Form submit button with loading states
│   ├── Footer.js              # Footer information
│   ├── UploadForm.js          # Main form component (orchestrator)
│   ├── styles.js              # Shared styles and animations
│   └── index.js               # Component exports
├── hooks/
│   ├── useVideoUpload.js      # Custom hook for upload logic
│   └── index.js               # Hook exports
└── App.js                     # Main app component
```

## Component Breakdown

### 1. **Header** (`Header.js`)
- Displays the app title, icon, and description
- Pure presentational component
- No state or logic

### 2. **FileUploadZone** (`FileUploadZone.js`)
- Handles drag & drop file uploads
- Shows file selection status
- Displays file size and name
- Props: `videoFile`, `isDragOver`, event handlers, `fileInputRef`

### 3. **TextInput** (`TextInput.js`)
- Textarea for TTS input
- Character count display
- Props: `text`, `onTextChange`

### 4. **ProgressBar** (`ProgressBar.js`)
- Shows upload and processing progress
- Loading spinner animation
- Progress percentage display
- Props: `downloading`, `message`, `progress`

### 5. **StatusMessage** (`StatusMessage.js`)
- Displays status messages when not downloading
- Conditional rendering
- Props: `message`, `downloading`

### 6. **SubmitButton** (`SubmitButton.js`)
- Form submit button with loading states
- Disabled state management
- Loading spinner
- Props: `downloading`, `videoFile`, `text`, `onSubmit`

### 7. **Footer** (`Footer.js`)
- Displays informational text
- Pure presentational component

### 8. **UploadForm** (`UploadForm.js`)
- Main orchestrator component
- Uses custom hook for state management
- Renders all child components
- Handles form submission

## Custom Hooks

### **useVideoUpload** (`useVideoUpload.js`)
- Manages all upload-related state
- Handles file selection and drag & drop
- Manages upload progress and API calls
- Returns all necessary state and handlers

## Shared Resources

### **styles.js**
- Centralized styles and animations
- CSS keyframes for loading spinners
- Common style objects for consistency

## Benefits of This Structure

1. **Separation of Concerns**: Each component has a single responsibility
2. **Reusability**: Components can be easily reused in other parts of the app
3. **Maintainability**: Easy to modify individual components without affecting others
4. **Testability**: Each component can be tested in isolation
5. **Readability**: Code is more organized and easier to understand
6. **Scalability**: Easy to add new features or modify existing ones

## Usage Example

```jsx
import { UploadForm } from './components';

function App() {
  return <UploadForm />;
}
```

## Best Practices Implemented

- ✅ Single Responsibility Principle
- ✅ Custom hooks for logic separation
- ✅ Props-based communication
- ✅ Pure presentational components
- ✅ Centralized styling
- ✅ Clean imports with index files
- ✅ Proper file organization
- ✅ Consistent naming conventions
