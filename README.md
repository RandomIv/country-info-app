# Country Info App Setup

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/RandomIv/country-info-app.git
cd country-info-app

# 2. Install and launch (auto starts DB)
npm run setup

# 3. Start development server
npm run start:dev
```

## 📦 Script Commands

| Command          | Action                                                         |
|------------------|----------------------------------------------------------------|
| `npm run dev`    | Start NestJS in watch mode                                     |
| `npm run setup`  | Full setup (installs deps, starts DB, runs migrations)         |
| `npm run db:up`  | Start PostgreSQL container                                     |
| `npm run db:down`| Stop PostgreSQL container                                      |
| `npm run db:migrate` | Run database migrations                                    |
| `npm run build`  | Build production version                                       |
| `npm start`      | Run production server                                          |

## 🌐 API Endpoints

- `GET /countries` - List available countries
- `GET /countries/{code}` - Get country details
- `POST /users/:userId/holidays` - Add holidays to user calendar

## 🛠️ Troubleshooting

**Database issues?** Try resetting:
```bash
npm run db:reset
```

**Prisma errors?** Regenerate client:
```bash
npx prisma generate
```
