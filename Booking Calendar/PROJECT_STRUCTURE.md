# 📋 Booking Calendar - Project Structure

## 🎯 Overview
تم إعادة هيكلة المشروع بالكامل لتحسين القابلية للصيانة وإعادة الاستخدام والأداء.

## 📁 Project Structure

```
src/
├── components/              # React Components
│   ├── Header/
│   │   ├── Header.jsx              # Main header component
│   │   └── SearchBar.jsx           # Search functionality
│   ├── Sidebar/
│   │   └── Sidebar.jsx             # Date picker & doctor filter
│   ├── Calendar/
│   │   ├── CalendarView.jsx        # Main calendar container
│   │   ├── DayView.jsx             # Day view layout
│   │   ├── WeekView.jsx            # Week view layout
│   │   └── TimeGutter.jsx          # Time labels
│   ├── Appointment/
│   │   ├── AppointmentBlock.jsx    # Individual appointment
│   │   ├── AppointmentModal.jsx    # Booking modal
│   │   └── DragPreview.jsx         # Drag selection preview
│   └── UI/
│       └── NavigationToolbar.jsx   # Navigation controls
│
├── hooks/                   # Custom React Hooks
│   ├── useAppointments.js          # Appointments & slots management
│   ├── useDoctors.js               # Doctors data management
│   ├── useSearch.js                # Search functionality
│   ├── useDragSelection.js         # Drag selection logic
│   └── useTheme.js                 # Theme management
│
├── services/                # API Services
│   └── api.js                      # Centralized API calls
│
├── utils/                   # Utility Functions
│   ├── dateUtils.js                # Date manipulation helpers
│   └── timeUtils.js                # Time calculation helpers
│
├── constants/               # Constants & Configuration
│   └── index.js                    # App-wide constants
│
├── App.jsx                  # Main App Component (230 lines)
├── App_backup.jsx           # Original App (1018 lines) - BACKUP
├── main.jsx                 # Entry point
└── index.css                # Global styles
```

## 🔄 Migration Summary

### Before:
- **1 file**: `App.jsx` (1018 lines)
- All logic mixed together
- Hard to maintain and test
- Poor code reusability

### After:
- **23 files**: Organized by responsibility
- `App.jsx` reduced to ~230 lines
- Clear separation of concerns
- Easy to test and maintain
- Reusable components and hooks

## 📦 Components

### Header Components
- **Header.jsx**: Main header with navigation, search, and theme toggle
- **SearchBar.jsx**: Search input with dropdown results

### Calendar Components
- **CalendarView.jsx**: Main calendar container, switches between views
- **DayView.jsx**: Displays doctor columns for a single day
- **WeekView.jsx**: Displays day columns for a week
- **TimeGutter.jsx**: Time labels on the left side

### Appointment Components
- **AppointmentBlock.jsx**: Individual appointment display with tooltip
- **AppointmentModal.jsx**: Booking form modal
- **DragPreview.jsx**: Visual feedback during drag selection

### Other Components
- **Sidebar.jsx**: Date picker and doctor filter
- **NavigationToolbar.jsx**: Date navigation controls

## 🎣 Custom Hooks

### useAppointments
Manages appointments and doctor slots with automatic polling.

```javascript
const { appointments, doctorSlots, isRefreshing, refetch } = useAppointments(
  selectedDate,
  viewMode,
  selectedDoctors
);
```

### useDoctors
Fetches and manages doctors list.

```javascript
const { doctors, selectedDoctors, setSelectedDoctors, loading, error } = useDoctors();
```

### useSearch
Handles search functionality with debouncing.

```javascript
const { searchTerm, setSearchTerm, searchResults, highlightedAppId, handleSearchResultClick } = useSearch();
```

### useDragSelection
Manages drag selection state and logic.

```javascript
const { isDragging, dragStart, dragEnd, startDrag, updateDrag, endDrag } = useDragSelection(selectedDate);
```

### useTheme
Manages dark/light theme with localStorage persistence.

```javascript
const { isDarkMode, toggleTheme } = useTheme();
```

## 🛠️ Services

### API Service (api.js)
Centralized API communication:
- `getDoctors()`: Fetch all doctors
- `getAppointments(startDate, endDate, doctorIds)`: Fetch appointments
- `getSchedule(date, doctorId)`: Fetch doctor schedule
- `searchAppointments(term)`: Search appointments
- `createAppointment(data)`: Create new appointment

## 🔧 Utilities

### Time Utils
- `timeToMinutes(timeStr)`: Convert time to minutes
- `calculateTop(timeStr)`: Calculate position in pixels
- `calculateHeight(duration)`: Calculate height in pixels
- `formatTimeRange(startTime, duration)`: Format time range
- `normalizeTime(timeStr)`: Normalize AM/PM to 24h format

### Date Utils
- `getRelativeDate(daysOffset)`: Get date relative to today
- `getDayRange(date)`: Get date range for day view
- `getWeekRange(date)`: Get date range for week view
- `getWeekDays(date)`: Get array of week days

## 🎨 Constants

All magic numbers and configuration values are centralized:
- `API_BASE_URL`: Backend API URL
- `HOURS`: Array of time slots
- `VIEW_MODES`: Day/Week view modes
- `DEFAULT_DURATION`: Default appointment duration
- `POLLING_INTERVAL`: Auto-refresh interval

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📝 Benefits of New Structure

### ✅ Maintainability
- Each file has a single responsibility
- Easy to locate and fix bugs
- Clear code organization

### ✅ Reusability
- Components can be reused across the app
- Hooks can be shared between components
- Utils can be imported anywhere

### ✅ Testability
- Each component/hook can be tested independently
- Easier to write unit tests
- Better code coverage

### ✅ Performance
- Components can be memoized with React.memo
- Hooks optimize re-renders
- Better code splitting opportunities

### ✅ Scalability
- Easy to add new features
- Clear patterns to follow
- Better collaboration in teams

## 🔄 Backup

The original `App.jsx` is backed up as `App_backup.jsx` for reference.

## 📚 Next Steps

1. Add PropTypes or TypeScript for type safety
2. Add unit tests for components and hooks
3. Implement error boundaries
4. Add loading states
5. Optimize with React.memo where needed
6. Add Storybook for component documentation

---

**Created**: January 21, 2026
**Version**: 2.0.0
**Author**: Refactored for better architecture
