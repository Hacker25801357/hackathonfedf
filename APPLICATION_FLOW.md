# Educational Resource Library - Application Flow

## 🗺️ User Journey Map

### Public User (Not Logged In)
```
┌─────────────┐
│ Landing Page│ (Home)
│   📚 Logo   │
│  Features   │
│ Call-to-Action│
└──────┬──────┘
       │
       ├─────────┐
       ▼         ▼
  ┌────────┐ ┌──────────┐
  │ Login  │ │ Register │
  └───┬────┘ └────┬─────┘
      │           │
      └─────┬─────┘
            │
            ▼
```

### Regular User Flow
```
┌──────────────────┐
│  User Dashboard  │
│  - Welcome msg   │
│  - Search bar    │
│  - Filters       │
│  - Resource grid │
└────────┬─────────┘
         │
         ├────────────────┐
         │                │
         ▼                ▼
┌────────────────┐  ┌──────────┐
│ Resource Detail│  │  Logout  │
│ - Full info    │  └──────────┘
│ - Download btn │
│ - Feedback form│
│ - User reviews │
└────────────────┘
```

### Admin User Flow
```
┌──────────────────────┐
│  Admin Dashboard     │
│  - Statistics cards  │
│  - Resource mgmt     │
│  - User list         │
│  - Add resource btn  │
└───────┬──────────────┘
        │
        ├────────────┬──────────────┐
        │            │              │
        ▼            ▼              ▼
┌──────────┐  ┌──────────┐   ┌───────────┐
│  Create  │  │   Edit   │   │  Delete   │
│ Resource │  │ Resource │   │ Resource  │
│  Modal   │  │  Modal   │   │ Confirm   │
└──────────┘  └──────────┘   └───────────┘
```

## 🔄 Data Flow Architecture

```
┌─────────────────────────────────────────────────────┐
│                    FRONTEND (React)                 │
│                                                     │
│  ┌─────────────┐    ┌──────────────┐              │
│  │   Pages     │───▶│  Components  │              │
│  │ - Home      │    │ - Navbar     │              │
│  │ - Login     │    │ - ResourceCard│             │
│  │ - Dashboard │    │ - SearchFilters│            │
│  │ - Admin     │    │ - ResourceForm │            │
│  └──────┬──────┘    └──────────────┘              │
│         │                                          │
│         ▼                                          │
│  ┌─────────────┐                                  │
│  │   Context   │                                  │
│  │ AuthContext │                                  │
│  └──────┬──────┘                                  │
│         │                                          │
│         ▼                                          │
│  ┌─────────────┐                                  │
│  │  API Utils  │                                  │
│  │  (Axios)    │                                  │
│  └──────┬──────┘                                  │
└─────────┼───────────────────────────────────────┘
          │
          │ HTTP Requests (JSON)
          │ Authorization: Bearer <JWT>
          │
┌─────────▼───────────────────────────────────────┐
│                 BACKEND (Express)               │
│                                                 │
│  ┌──────────────┐      ┌──────────────┐        │
│  │   Routes     │─────▶│  Controllers │        │
│  │ - auth       │      │ - authCtrl   │        │
│  │ - resources  │      │ - resourceCtrl│       │
│  │ - users      │      │ - userCtrl   │        │
│  └──────┬───────┘      └──────┬───────┘        │
│         │                     │                 │
│         ▼                     ▼                 │
│  ┌──────────────┐      ┌──────────────┐        │
│  │  Middleware  │      │   Models     │        │
│  │ - auth       │      │ - User       │        │
│  │ - admin      │      │ - Resource   │        │
│  └──────┬───────┘      └──────┬───────┘        │
│         │                     │                 │
└─────────┼─────────────────────┼─────────────────┘
          │                     │
          │                     │ Mongoose ODM
          │                     ▼
          │              ┌──────────────┐
          │              │   MongoDB    │
          │              │ - users coll │
          │              │ - resources  │
          │              └──────────────┘
          │
          ▼ (JWT Verification)
    ┌──────────┐
    │Protected │
    │ Routes   │
    └──────────┘
```

## 📊 Component Hierarchy

```
App
├── Router
    ├── Home
    │   └── Features Section
    ├── Login
    │   └── Login Form
    ├── Register
    │   └── Registration Form
    ├── Dashboard (Protected)
    │   ├── Navbar
    │   ├── SearchFilters
    │   └── ResourceCard (multiple)
    ├── ResourceDetail (Protected)
    │   ├── Navbar
    │   ├── Resource Info
    │   ├── Feedback Form
    │   └── Feedback List
    └── AdminDashboard (Admin Only)
        ├── Navbar
        ├── Stats Cards
        ├── Resource Grid
        ├── User Table
        └── ResourceForm (Modal)
```

## 🔐 Authentication Flow

```
┌──────────┐
│  Client  │
└────┬─────┘
     │
     │ 1. POST /api/auth/register or /login
     │    { email, password }
     ▼
┌────────────────┐
│   Backend      │
│ authController │
└────┬───────────┘
     │
     │ 2. Validate credentials
     │ 3. Hash password (register)
     │    Or compare hash (login)
     │
     ├─ Valid ──────┐
     │              │
     ▼              │
┌────────────┐     │
│  Generate  │     │
│    JWT     │     │
└────┬───────┘     │
     │              │
     │ 4. Return token + user data
     │              │
     ▼              │
┌────────────────┐ │
│     Client     │ │
│ Store in:      │ │
│ - localStorage │ │
│ - Context      │ │
└────┬───────────┘ │
     │              │
     │ 5. Add to requests
     │    Authorization: Bearer <token>
     │              │
     ▼              │
┌────────────────┐ │
│ Protected      │ │
│ Endpoints      │ │
└────┬───────────┘ │
     │              │
     │ 6. Verify JWT
     │              │
     ├─ Valid ─────┘
     │
     ▼
 Allow Access

Invalid ─────▶ 401 Unauthorized
```

## 🔍 Search & Filter Flow

```
User Input in SearchFilters
         │
         ▼
┌─────────────────┐
│ Update State    │
│ filters: {      │
│   search,       │
│   type,         │
│   subject,      │
│   sort          │
│ }               │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ useEffect       │
│ triggers        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ applyFilters()  │
│ - Filter array  │
│ - Sort results  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Update          │
│ filteredResources│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Re-render       │
│ ResourceCards   │
└─────────────────┘
```

## 📝 CRUD Operations Flow

### Create Resource (Admin)
```
Admin clicks "Add Resource"
         ▼
Open ResourceForm Modal
         ▼
Fill form & submit
         ▼
POST /api/resources
         ▼
Validate (server-side)
         ▼
Save to MongoDB
         ▼
Return new resource
         ▼
Close modal & refresh list
         ▼
Show success message
```

### Update Resource (Admin)
```
Admin clicks "Edit" on card
         ▼
Open ResourceForm Modal (pre-filled)
         ▼
Modify fields & submit
         ▼
PUT /api/resources/:id
         ▼
Validate & update in DB
         ▼
Return updated resource
         ▼
Close modal & refresh list
         ▼
Show success message
```

### Delete Resource (Admin)
```
Admin clicks "Delete" on card
         ▼
Confirm dialog
         ▼
DELETE /api/resources/:id
         ▼
Remove from MongoDB (soft delete: isActive=false)
         ▼
Return success
         ▼
Refresh resource list
         ▼
Show success message
```

### Add Feedback (User)
```
User views resource detail
         ▼
Fills feedback form (rating + comment)
         ▼
Submit feedback
         ▼
POST /api/resources/:id/feedback
         ▼
Check if user already gave feedback
├─ Yes: Update existing
└─ No: Add new feedback
         ▼
Recalculate average rating
         ▼
Save to MongoDB
         ▼
Return updated resource
         ▼
Refresh resource display
         ▼
Show feedback in list
```

## 💾 State Management

### Global State (AuthContext)
```
AuthContext
├── user (current user object)
├── loading (auth initialization)
├── error (auth errors)
├── login() - function
├── register() - function
├── logout() - function
├── isAdmin() - function
└── isAuthenticated - boolean
```

### Local State Examples
```
Dashboard
├── resources (all resources)
├── filteredResources (after filters)
├── loading (fetch state)
├── error (error messages)
└── filters (search criteria)

ResourceDetail
├── resource (single resource)
├── loading
├── error
├── feedback (form data)
├── submitting
└── message

AdminDashboard
├── resources
├── users
├── loading
├── error
├── showResourceForm
├── editingResource
└── stats
```

## 🎨 Styling Architecture

```
Global Styles (index.css)
├── Reset & Base
├── Typography
├── Button Classes
├── Alert Classes
└── Utility Classes

Component Styles
├── Auth.css (Login, Register)
├── Home.css (Landing)
├── Dashboard.css
├── ResourceDetail.css
├── AdminDashboard.css
├── Navbar.css
├── ResourceCard.css
├── ResourceForm.css
└── SearchFilters.css

Design System
├── Colors
│   ├── Primary: #667eea → #764ba2
│   ├── Success: #28a745
│   ├── Error: #dc3545
│   └── Gray scale
├── Spacing (rem-based)
├── Border radius (8px, 12px)
├── Shadows (layered)
└── Transitions (0.3s ease)
```

---

This flow document provides a comprehensive overview of how the application works from user interaction to data storage. Use it as a reference when exploring or modifying the codebase.
