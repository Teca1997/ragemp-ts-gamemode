# RAGE:MP TypeScript Gamemode

A modular, full-stack gamemode framework for [RAGE:MP](https://rage.mp/) built with **TypeScript** and modern tooling. This project is designed for serious roleplay or freeroam servers, providing clean separation of server, client, and UI logic, and aiming for extensibility.

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
  - [Server](#server)
  - [Client](#client)
  - [UI](#ui)
  - [Shared](#shared)
- [Development](#development)
- [Extending & Contributing](#extending--contributing)
- [License](#license)

---

## Overview

This repository implements a modern full-stack gamemode for RAGE:MP with:

- **NestJS** backend for modular, testable game logic and module resolution (NestJS is only used for its module resolving ability via `NestFactory`/`NestApplication` and does **not** create a NestJS HTTP server).
- **TypeORM** for database-agnostic entity management.
- **Custom Module Resolution** for the client code (inspired by NestJS’s module system, providing modular architecture and dependency resolution).
- **React + Vite** UI for in-game overlays and menus.
- **Extensible module system** for adding new features.

---

## Architecture

### Server

**Main technologies:**  
- [NestJS](https://nestjs.com/) (for module resolution, not REST API)
- [TypeORM](https://typeorm.io/) (ORM for DB)
- TypeScript (strict typing)

#### Key Concepts

- **Features as Modules**  
  Each gameplay feature (authentication, punishment, character creation, etc.) is a separate NestJS module under `server/features/`.

  ```typescript
  // Example: server/features/auth/auth.module.ts
  import { Module } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { AccountEntity } from '../db/entities/account.entity';

  @Module({
    providers: [AuthService],
    imports: [TypeOrmModule.forFeature([AccountEntity])]
  })
  export class AuthModule {}
  ```

- **Database Entities**  
  All persistent game data is modeled as TypeORM entities in `server/db/entities/`.

  ```typescript
  // Example: server/db/entities/account.entity.ts
  @Entity()
  export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    email: string;

    @Column()
    passwordHash: string;

    @Column()
    salt: string;

    @Column({ default: 'user' })
    role: string;
  }
  ```

- **Dependency Injection**  
  Server uses NestJS’s built-in DI for maintainable, testable code.

- **Seeding & Mock Data**  
  Seeders in `server/db/seeds/` use TypeORM to provide mock data for rapid local development.

#### Major Features

##### 1. Authentication & Account Management

- **Account Entity:**  
  Stores user credentials and roles.
- **AuthService:**  
  Handles registration and login, salting and hashing passwords with PBKDF2.

  ```typescript
  // Example: server/features/auth/auth.service.ts
  async login({ username, password }): Promise<{ account: AccountData | null; msgs: string[] }> {
    const account = await this.accountRepository.findOne({ where: { username } });
    if (!account) return { account: null, msgs: ['User not found'] };
    const hash = pbkdf2Sync(password, account.salt, 10000, 64, 'sha512').toString('hex');
    if (hash !== account.passwordHash) return { account: null, msgs: ['Invalid password'] };
    return { account, msgs: ['Login successful'] };
  }
  ```

- Move players to a restricted "auth position" before login.

##### 2. Character Management

- **Character Entity:**  
  Stores data for player-created characters.
- **CharacterCreatorService:**  
  Attaches new characters to accounts and persists them.

  ```typescript
  // Example: server/features/character/character.service.ts
  async createCharacter(accountId: number, data: CharacterDto) {
    const character = this.characterRepository.create({ ...data, accountId });
    return await this.characterRepository.save(character);
  }
  ```

##### 3. Punishment System (Moderation)

- **Entities:**  
  - `Ip`, `Serial`, `SocialClub` to uniquely identify and track players.
- **PunishmentService:**  
  Saves identifiers for bans, mutes, etc.

  ```typescript
  // Example: server/features/punishment/punishment.service.ts
  async banAccount(accountId: number, reason: string) {
    await this.punishmentRepository.save({ accountId, reason, type: 'ban', createdAt: new Date() });
  }
  ```

##### 4. Death Logging

- **CharacterDeathLog Entity:**  
  Tracks each death event.
- **DeathLogService:**  
  Persists logs for analytics or moderation.

  ```typescript
  // Example: server/features/deathlog/deathlog.service.ts
  async logDeath(victimId: number, killerId: number, reason: string) {
    return await this.deathLogRepository.save({ victimId, killerId, reason, timestamp: new Date() });
  }
  ```

##### 5. Database Seeding

- **Seeder Example:**  
  `MockDataSeeder` creates sample roles, accounts, and characters.

---

### Client

**Main technologies:**  
- TypeScript
- Custom Module Resolution System (NestJS-inspired)
- RAGE:MP Client API

#### Key Concepts

- **Modular Architecture**  
  Client code mirrors the server’s module design.

- **Custom Module Registration & Resolution**  
  The client features a custom module resolution system inspired by NestJS. Each feature is a module with metadata and dependencies, registered and resolved at runtime.

  ```typescript
  // Example: client/features/auth/auth.module.ts
  @Module({ providers: [AuthClientService], events: [LoginEvent] })
  class AuthClientModule {}
  ModuleRegistry.register(AuthClientModule, metadata);
  ModuleResolver.resolve(AuthClientModule);
  ```

- **Event Handling**  
  Client events (game engine or custom) are registered to class methods.

  ```typescript
  // Example: client/features/auth/auth.service.ts
  @Event('playerLogin')
  onPlayerLogin(playerData) {
    // Handle login logic
  }
  ```

- **Lifecycle Hooks**  
  Modules can implement `onInit()` for initialization logic.

  ```typescript
  // Example
  class SomeFeatureClientModule {
    onInit() {
      // Initialization logic here
    }
  }
  ```

**Important Files:**

- `client/utils/moduleResolver/module.decorator.ts`: Defines the `@Module()` decorator for client modules.
- `client/utils/moduleResolver/module.registry.ts`: Central registry for modules and metadata.
- `client/utils/moduleResolver/module.resolver.ts`: Handles module resolution, dependency wiring, lifecycle hooks, and event registration.

---

### UI

**Main technologies:**  
- [React](https://react.dev/) (functional components, hooks)
- [Vite](https://vitejs.dev/) (fast bundler with HMR)
- TypeScript
- ESLint (advanced configs)

#### Key Concepts

- **UI for In-Game Overlays**  
  The `ui/` directory contains a React app for in-game overlays or menus.

  ```tsx
  // Example: ui/src/App.tsx
  import React from 'react';

  function App() {
    return (
      <div className="App">
        <h1>Welcome to RAGE:MP UI Overlay</h1>
        {/* Add components here */}
      </div>
    );
  }

  export default App;
  ```

- **Rapid Development**  
  Vite enables fast changes with HMR.

- **Extensible Linting**  
  ESLint with recommended and type-aware rules; easy to extend.

#### Customization

- Expand the UI with new components, pages, and logic.

  ```tsx
  // Example: ui/src/components/PlayerList.tsx
  import React from 'react';

  export const PlayerList = ({ players }) => (
    <ul>
      {players.map(player => (
        <li key={player.id}>{player.name}</li>
      ))}
    </ul>
  );
  ```

- See `ui/README.md` for details on ESLint, React plugins, and customizing TypeScript project references.

---

### Shared

- **Purpose:**  
  Contains code and types shared across server, client, and UI.

- **Examples:**  
  - Shared enums, interfaces, utility functions.
  - Data for initial seeding/testing (`shared/data/accounts.ts`).

  ```typescript
  // Example: shared/types/player.ts
  export interface PlayerData {
    id: number;
    name: string;
    role: 'user' | 'admin';
  }
  ```

---

## Development

### Prerequisites

- Node.js (16+ recommended)
- RAGE:MP server installation
- Database (PostgreSQL recommended; configure via `.env`)

### Setup Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Tecidis/ragemp-ts-gamemode.git
   cd ragemp-ts-gamemode
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**  
   Set up `.env` for DB credentials, ports, etc.

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=youruser
   DB_PASSWORD=yourpass
   DB_DATABASE=ragemp
   ```

4. **Seed the Database (dev only)**
   ```bash
   npm run seed
   ```
   Uses mock data in `server/db/seeds/`.

5. **Start Server**
   ```bash
   npm run server
   ```

6. **Build & Start Client**
   ```bash
   npm run client
   ```

7. **Run the UI**
   ```bash
   cd source_files/ui
   npm install
   npm run dev
   ```
   Open the local URL provided by Vite.

---

## Extending & Contributing

- Add server features by creating modules under `server/features/`.

  ```typescript
  // Example: server/features/inventory/inventory.module.ts
  @Module({ providers: [InventoryService] })
  export class InventoryModule {}
  ```

- Add client features by implementing modules and registering them with the module resolver.
- Share types/functions via `shared/`.
- Extend the UI with new React components and pages.
- Pull requests welcome! Please use TypeScript and keep code modular.

---

## License

MIT

---
