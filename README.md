# Restaurant Ordering System

Sistem pemesanan restoran dengan React.js frontend dan Laravel Filament admin panel.

## 🚀 Fitur

### Frontend (Client)
- **Menu Display**: Tampilan menu dengan kategori
- **Shopping Cart**: Keranjang belanja dengan kelola item
- **Order Placement**: Form pemesanan dengan informasi pelanggan
- **Order Confirmation**: Konfirmasi pesanan dengan detail lengkap
- **Responsive Design**: Optimized untuk mobile dan desktop

### Backend (Admin Panel)
- **Dashboard**: Overview statistik pesanan dan pendapatan
- **Category Management**: Kelola kategori menu
- **Menu Management**: CRUD operasi untuk menu items
- **Order Management**: Kelola pesanan dengan status tracking
- **Order Items**: Detail items dalam setiap pesanan

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI Library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **Heroicons** - Icons

### Backend
- **Laravel 11** - PHP Framework
- **Filament 3** - Admin panel
- **SQLite** - Database
- **Laravel Sanctum** - API authentication

## 📁 Project Structure

```
pos_system/
├── backend/                 # Laravel API & Admin
│   ├── app/
│   │   ├── Models/         # Eloquent models
│   │   ├── Http/Controllers/Api/  # API controllers
│   │   └── Filament/       # Admin panel resources
│   ├── database/
│   │   ├── migrations/     # Database schema
│   │   └── seeders/        # Sample data
│   └── routes/
│       └── api.php         # API routes
└── frontend/               # React client app
    ├── src/
    │   ├── components/     # Reusable components
    │   ├── pages/          # Page components
    │   ├── context/        # React context
    │   └── services/       # API services
    └── public/
```

## 🗄️ Database Schema

### Categories
- id, name, description, timestamps

### Menu Items
- id, name, description, price, image, category_id, is_available, timestamps

### Orders
- id, customer_name, customer_phone, table_number, status, total_amount, notes, timestamps

### Order Items
- id, order_id, menu_item_id, quantity, price, notes, timestamps

## 🚀 Installation & Setup

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+
- npm/yarn

### Backend Setup
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan make:filament-user
php artisan serve
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🌐 API Endpoints

### Menu
- `GET /api/menu/categories` - Get all categories with menu items
- `GET /api/menu/items` - Get all available menu items
- `GET /api/menu/categories/{id}/items` - Get menu items by category

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/{id}` - Get order details

## 👤 Default Admin User
- Email: `admin@example.com`
- Password: [set during installation]

## 🎯 Usage

### For Customers (Frontend)
1. Browse menu by categories
2. Add items to cart
3. Fill customer information
4. Place order
5. Get order confirmation

### For Admin (Backend)
1. Login to admin panel at `/admin`
2. View dashboard with statistics
3. Manage categories and menu items
4. Monitor and update order status
5. View order details and items

## 🔧 Configuration

### API Base URL
Update `frontend/src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:8000/api';
```

### CORS Settings
Configured in `backend/bootstrap/app.php` for cross-origin requests.

## 📱 Screenshots

[Add screenshots here showing the frontend and admin panel]

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

For support and questions, please create an issue in the repository.
