# PrepBox - Meal Kit E-commerce Platform

A comprehensive MVP e-commerce application for meal kit delivery, built with Next.js, TypeScript, and Tailwind CSS. All data is stored locally in the repository - no backend or database required. Perfect for demos, MVPs, or showcasing meal kit e-commerce functionality.

## 🎯 Project Overview

PrepBox is a meal kit e-commerce platform that allows customers to browse, purchase, and subscribe to pre-portioned meal kits. The application features a complete shopping experience including product catalog, shopping cart, favorites, subscriptions, and checkout functionality.

## ✨ Features

### Core E-commerce Features
- 🛍️ **Product Catalog** - Browse meal kits with detailed information (ingredients, cooking time, servings, stock)
- 🛒 **Shopping Cart** - Add, update, and remove items with quantity management (in-memory storage)
- ❤️ **Favorites System** - Save favorite products for quick access (in-memory storage)
- 🔍 **Category Filtering** - Filter products by category (All, Classic, Moroccan, Pasta, Chicken, Combo)
- 📦 **Combo Deals** - Special combo packages with discounted pricing
- 💳 **Checkout Page** - Complete checkout flow for order processing
- 📱 **Fully Responsive Design** - Mobile-first design that works on all devices

### Subscription Features
- 📅 **Subscription Plans** - Weekly and monthly subscription options with discounts (10% and 15% off)
- 🍽️ **Meal Selection** - Choose specific meals for your subscription
- ⏸️ **Subscription Management** - Pause, resume, skip deliveries, or cancel subscriptions
- 💰 **Discount Calculation** - Automatic discount application on subscription orders
- 📊 **Subscription Dashboard** - View and manage all active subscriptions

### User Experience Features
- 🎨 **Modern UI** - Clean, modern interface with Tailwind CSS
- 🚀 **Fast Performance** - Optimized with Next.js 14 App Router
- 📢 **Announcement Bar** - Rotating promotional messages in header
- 🔔 **Real-time Updates** - Cart and favorites count updates across components
- 🖼️ **Product Images** - High-quality product images with hover effects
- 📄 **Product Details** - Detailed product pages with full information
- 🎯 **Quick Benefits** - Highlighted benefits section on homepage
- ⭐ **Reviews Section** - Customer reviews and testimonials
- 💬 **WhatsApp Support** - Integrated WhatsApp support component

### Additional Pages
- 📖 **About Us** - Company information and story
- 📞 **Contact Us** - Contact form and information
- ❓ **FAQ** - Frequently asked questions
- 👤 **Account** - User account page
- 🍳 **Cooking Guide** - Cooking instructions and tips
- 🏪 **Distributor** - Distributor application page
- 🔨 **Build Your Own** - Custom meal kit builder
- 📋 **Favorites Page** - View all favorited products

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher (or yarn/pnpm)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
```bash
cd eebs
```

2. **Install dependencies**:
```bash
npm install
```

3. **Run the development server**:
```bash
npm run dev
```

4. **Open your browser** and navigate to:
```
http://localhost:3000
```

## 📁 Project Structure

```
eebs/
├── app/                          # Next.js 14 App Router directory
│   ├── layout.tsx               # Root layout with Header and Footer
│   ├── page.tsx                 # Homepage with Hero, Featured Products, Categories
│   ├── globals.css              # Global styles and Tailwind imports
│   │
│   ├── shop/                    # Shop page with filtering and product grid
│   │   └── page.tsx
│   │
│   ├── product/                 # Dynamic product detail pages
│   │   └── [id]/
│   │       └── page.tsx
│   │
│   ├── combos/                  # Combo deals page
│   │   └── page.tsx
│   │
│   ├── checkout/                # Checkout page
│   │   └── page.tsx
│   │
│   ├── subscriptions/           # Subscription management
│   │   ├── page.tsx            # Create/edit subscriptions
│   │   └── manage/
│   │       └── page.tsx        # Manage existing subscriptions
│   │
│   ├── favorites/               # Favorites page
│   │   └── page.tsx
│   │
│   ├── build-your-own/         # Custom meal kit builder
│   │   └── page.tsx
│   │
│   ├── about/                   # About us page
│   │   └── page.tsx
│   │
│   ├── contact/                 # Contact form page
│   │   └── page.tsx
│   │
│   ├── faq/                     # FAQ page
│   │   └── page.tsx
│   │
│   ├── account/                 # User account page
│   │   └── page.tsx
│   │
│   ├── cooking-guide/           # Cooking instructions
│   │   └── page.tsx
│   │
│   └── distributor/             # Distributor application
│       └── page.tsx
│
├── components/                   # React components
│   ├── Header.tsx              # Navigation header with cart, favorites, menu
│   ├── Footer.tsx              # Footer with links and information
│   ├── Hero.tsx                # Hero section with slider
│   ├── Categories.tsx          # Category grid display
│   ├── FeaturedProducts.tsx    # Featured products section
│   ├── Cart.tsx                # Shopping cart sidebar component
│   ├── QuickBenefits.tsx       # Quick benefits highlight section
│   ├── WhyPrepBox.tsx          # Why choose PrepBox section
│   ├── Reviews.tsx             # Customer reviews section
│   └── WhatsAppSupport.tsx     # WhatsApp support widget
│
├── data/                         # Local data storage (MVP approach)
│   ├── products.ts             # Product data and helper functions
│   ├── categories.ts           # Category definitions and filters
│   ├── combos.ts               # Combo deals data
│   ├── cart.ts                 # Shopping cart management (in-memory)
│   ├── favorites.ts            # Favorites management (in-memory)
│   └── subscriptions.ts        # Subscription plans and management (in-memory)
│
├── public/                       # Static assets
│   └── images/                  # Product images and logos
│       ├── Logo.jpeg
│       ├── Moroccan Chicken.jpeg
│       ├── Alfredo Pasta.jpeg
│       ├── Tarragon Chicken.jpeg
│       ├── Peri Peri Fries Mix.jpeg
│       ├── Chicken Briyani.jpeg
│       ├── Chicken Nihari.jpeg
│       ├── Combo 1.jpeg
│       ├── Combo 2.jpeg
│       ├── slider-1.jpeg
│       ├── slider-2.jpeg
│       ├── slider-3.jpeg
│       └── why prepbox works.jpeg
│
├── package.json                 # Dependencies and scripts
├── package-lock.json           # Locked dependency versions
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── next.config.js              # Next.js configuration
├── postcss.config.mjs          # PostCSS configuration
└── README.md                    # This file
```

## 📊 Data Storage

All data is stored in TypeScript files in the `/data` directory. This is a simple MVP approach - no database or backend required. All data is version-controlled in the repository.

### Data Files

- **`products.ts`** - Contains all product information:
  - Product ID, name, price, original price
  - Category, description, ingredients
  - Cooking time, servings, stock quantity
  - Image paths
  - Helper functions: `getProductById()`, `getProductsByCategory()`

- **`categories.ts`** - Category definitions:
  - Category objects with name, href, and image
  - Category filter options: All, Classic, Moroccan, Pasta, Chicken, Combo

- **`combos.ts`** - Combo deals data:
  - Combo packages with multiple items
  - Discounted pricing and savings information
  - Extends Product interface

- **`cart.ts`** - Shopping cart management (in-memory):
  - Add, update, remove items
  - Quantity management
  - Calculate totals
  - **Note**: Cart data resets on page refresh (MVP approach)

- **`favorites.ts`** - Favorites management (in-memory):
  - Add/remove favorites
  - Check if product is favorited
  - Get favorites count
  - **Note**: Favorites data resets on page refresh (MVP approach)

- **`subscriptions.ts`** - Subscription management (in-memory):
  - Subscription plans (Weekly: 10% off, Monthly: 15% off)
  - Create, pause, resume, cancel subscriptions
  - Skip/unskip deliveries
  - Update subscription items
  - **Note**: Subscription data resets on page refresh (MVP approach)

## 🛠️ Technologies Used

### Core Framework
- **Next.js 14.2.5** - React framework with App Router
- **React 18.3.1** - UI library
- **React DOM 18.3.1** - React rendering

### Language & Type Safety
- **TypeScript 5.5.3** - Type-safe JavaScript
- **@types/node 20.14.10** - Node.js type definitions
- **@types/react 18.3.3** - React type definitions
- **@types/react-dom 18.3.0** - React DOM type definitions

### Styling
- **Tailwind CSS 3.4.4** - Utility-first CSS framework
- **PostCSS 8.4.39** - CSS processing
- **Autoprefixer 10.4.19** - CSS vendor prefixing

### Icons
- **React Icons 5.2.0** - Icon library (using Feather Icons)

## 📜 Available Scripts

### Development
```bash
npm run dev
```
Starts the development server at `http://localhost:3000` with hot-reloading enabled.

### Production Build
```bash
npm run build
```
Creates an optimized production build of the application.

### Production Server
```bash
npm start
```
Starts the production server (requires `npm run build` first).

### Linting
```bash
npm run lint
```
Runs ESLint to check for code quality and potential issues.

## 🎨 Key Components

### Header Component
- Sticky navigation bar
- Rotating announcement messages
- Desktop and mobile menu
- Shopping cart icon with item count badge
- Favorites icon with count badge
- Account icon
- Responsive design with hamburger menu on mobile

### Cart Component
- Slide-out sidebar cart
- Display cart items with images
- Quantity adjustment controls
- Remove items functionality
- Subtotal and total calculation
- Proceed to checkout button

### Hero Component
- Image slider with multiple slides
- Call-to-action buttons
- Responsive design

### Shop Page
- Three sections: Classic Meal Kits, Build Your Own, Keto & Diet Plans
- Category filtering buttons
- Product grid with cards
- Add to cart functionality
- Favorites toggle
- Quantity controls for items in cart
- Stock management

### Product Detail Page
- Full product information
- Image display
- Price and discount information
- Ingredients list
- Cooking time and servings
- Add to cart and favorites buttons
- Stock availability

### Subscriptions Page
- Plan selection (Weekly/Monthly)
- Meal selection interface
- Discount calculation
- Subscription creation and editing
- Price breakdown with savings

### Subscription Management Page
- View all subscriptions
- Pause/resume subscriptions
- Skip deliveries
- Cancel subscriptions
- Edit subscription items
- Next delivery date display

## 🔄 State Management

The application uses a combination of:
- **React Hooks** (`useState`, `useEffect`) for component state
- **In-memory storage** in data files for cart, favorites, and subscriptions
- **Custom events** (`cartUpdated`, `favoritesUpdated`, `subscriptionsUpdated`) for cross-component communication
- **LocalStorage** can be easily integrated for persistence (not currently implemented)

## 📱 Navigation Structure

### Main Navigation Links
- **HOME** (`/`) - Homepage
- **ABOUT US** (`/about`) - About page
- **SHOP ALL** (`/shop`) - Shop page
- **SUBSCRIPTIONS** (`/subscriptions`) - Subscriptions page
- **BUILD YOUR OWN** (`/build-your-own`) - Custom meal builder
- **COMBOS** (`/combos`) - Combo deals
- **COOKING GUIDE** (`/cooking-guide`) - Cooking instructions
- **CONTACT US** (`/contact`) - Contact form

### Additional Pages
- **Product Details** (`/product/[id]`) - Dynamic product pages
- **Favorites** (`/favorites`) - Favorites page
- **Checkout** (`/checkout`) - Checkout page
- **Account** (`/account`) - User account
- **FAQ** (`/faq`) - Frequently asked questions
- **Distributor** (`/distributor`) - Distributor application
- **Manage Subscriptions** (`/subscriptions/manage`) - Subscription management

## 💡 Key Features Explained

### Shopping Cart
- Items are stored in-memory using the `cart.ts` module
- Cart persists during the session but resets on page refresh
- Real-time updates across all components using custom events
- Quantity can be adjusted directly from product cards or cart sidebar
- Stock limits are enforced (cannot add more than available stock)

### Favorites System
- Users can favorite/unfavorite products
- Favorites are stored in-memory using the `favorites.ts` module
- Favorites count badge in header updates in real-time
- Dedicated favorites page to view all favorited items
- Favorites reset on page refresh (MVP approach)

### Subscriptions
- Two subscription plans: Weekly (10% discount) and Monthly (15% discount)
- Users select meals and quantities for their subscription
- Discount is automatically calculated and applied
- Subscriptions can be paused, resumed, skipped, or cancelled
- Next delivery date is calculated based on frequency
- Subscription management page for viewing and editing all subscriptions

### Product Categories
- Products are organized into categories: Classic, Moroccan, Pasta, Chicken
- Combo category for special deals
- Filter buttons on shop page for easy category navigation
- Category-based product display

### Combo Deals
- Special combo packages with multiple meal kits
- Discounted pricing compared to individual items
- Savings amount displayed
- Stock management for combos

## 🎯 MVP Limitations

This is an MVP (Minimum Viable Product) with the following limitations:

1. **No Backend**: All data is stored in-memory and resets on page refresh
2. **No Database**: No persistent storage - all data is in TypeScript files
3. **No Authentication**: No user login/signup system
4. **No Payment Processing**: Checkout page exists but doesn't process payments
5. **No Order History**: No order tracking or history
6. **No Email Notifications**: No email functionality
7. **No Search Functionality**: Search UI exists but functionality not implemented
8. **No User Accounts**: Account page exists but no actual account management

## 🔮 Future Enhancements

Potential improvements for production:
- Integrate localStorage for cart/favorites persistence
- Add backend API for data persistence
- Implement user authentication
- Add payment processing integration
- Create order management system
- Add email notifications
- Implement search functionality
- Add product reviews and ratings
- Create admin dashboard
- Add inventory management
- Implement delivery tracking

## 📝 Notes

- **Cart Data**: Stored in-memory, resets on page refresh (MVP approach)
- **Favorites Data**: Stored in-memory, resets on page refresh (MVP approach)
- **Subscriptions Data**: Stored in-memory, resets on page refresh (MVP approach)
- **Product Data**: Can be edited in `/data/products.ts`
- **Category Data**: Can be edited in `/data/categories.ts`
- **Combo Data**: Can be edited in `/data/combos.ts`
- **No Backend Required**: Everything is static/local - perfect for MVP, demos, or showcases
- **Version Controlled**: All data is in the repository and version-controlled

## 📄 License

MIT License - feel free to use this project for learning, demos, or as a starting point for your own e-commerce application.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
