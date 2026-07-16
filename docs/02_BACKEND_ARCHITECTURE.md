# Backend Architecture

ScholarVerse follows a modular architecture.

Controllers

↓

Game Engines

↓

Database

Controllers never contain business logic.

Business logic belongs inside Engines.

## Folder Structure

backend/

controllers/

models/

routes/

middlewares/

utils/

config/

migrations/

services/

validators/