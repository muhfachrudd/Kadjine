# 🚀 Deployment Guide

## Production Deployment

### Backend (Laravel)

#### 1. Environment Setup
```bash
# Copy environment file
cp .env.example .env

# Update .env for production
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

# Database (MySQL/PostgreSQL for production)
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=restaurant_pos
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

#### 2. Install Dependencies
```bash
composer install --optimize-autoloader --no-dev
```

#### 3. Optimize Application
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache
```

#### 4. Database Setup
```bash
php artisan migrate --force
php artisan db:seed --force
```

#### 5. Create Admin User
```bash
php artisan make:filament-user
```

#### 6. Set Permissions
```bash
chmod -R 755 storage
chmod -R 755 bootstrap/cache
```

### Frontend (React)

#### 1. Update API URL
Update `src/services/api.js`:
```javascript
const API_BASE_URL = 'https://yourdomain.com/api';
```

#### 2. Build for Production
```bash
npm run build
```

#### 3. Deploy Static Files
Upload `dist/` folder to your web server or CDN.

---

## Hosting Options

### Shared Hosting
- Upload Laravel files to public_html
- Point domain to Laravel's public folder
- Upload React build files to subdomain/folder

### VPS/Dedicated Server
- Use Nginx/Apache virtual hosts
- Setup SSL certificates
- Configure process managers (PM2, Supervisor)

### Cloud Platforms
- **Vercel**: Perfect for React frontend
- **Railway/Heroku**: Great for Laravel backend
- **DigitalOcean**: Full-stack deployment

---

## Docker Deployment

### Docker Compose
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - APP_ENV=production
    depends_on:
      - database
      
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
      
  database:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: restaurant_pos
    volumes:
      - db_data:/var/lib/mysql

volumes:
  db_data:
```

---

## Security Considerations

### Laravel Backend
- Enable HTTPS
- Set secure session cookies
- Configure CORS properly
- Use environment variables for secrets
- Regular security updates

### React Frontend
- Build optimization
- Environment variables for API URLs
- Content Security Policy headers
- Regular dependency updates

---

## Performance Optimization

### Backend
- Enable Laravel caching
- Use Redis for sessions/cache
- Database indexing
- Image optimization

### Frontend
- Code splitting
- Lazy loading
- Image compression
- CDN for static assets

---

## Monitoring

### Application Monitoring
- Laravel Telescope (development)
- Error tracking (Sentry)
- Performance monitoring
- Database query optimization

### Infrastructure Monitoring
- Server resources
- Database performance
- API response times
- User analytics

---

## Backup Strategy

### Database
- Daily automated backups
- Test restore procedures
- Off-site backup storage

### Files
- Regular file system backups
- Version control for code
- Asset backup procedures

---

## Maintenance

### Regular Tasks
- Security updates
- Database optimization
- Log file cleanup
- Performance monitoring
- Backup verification

### Update Procedures
1. Test in staging environment
2. Create backup
3. Deploy during low-traffic hours
4. Monitor for issues
5. Rollback plan ready
