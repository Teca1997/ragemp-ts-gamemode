# RAGE:MP TypeScript Gamemode

A **modular, full-stack gamemode framework** for [RAGE:MP](https://rage.mp/) built with **TypeScript** and modern tooling. Designed for extensibility, clean architecture, and maintainability.

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
  - [Server](#server)
  - [Client](#client)
  - [UI](#ui)
  - [Shared](#shared)
- [Development](#development)
- [Custom Decorators](#custom-decorators)
- [Extending & Contributing](#extending--contributing)
- [License](#license)

---

## Overview

This repository implements a scalable, modular gamemode with:

- **NestJS** (server-side module resolution, not REST)
- **TypeORM** (database-agnostic entity management)
- **Custom Dependency Injection** (client-side, server migration planned)
- **React + Vite** (for in-game UI overlays and menus)
- **Extensible module and event system** (add features easily)

---

## Architecture

### Server

**Main technologies:**  
- [NestJS](https://nestjs.com/) (for module wiring)
- [TypeORM](https://typeorm.io/) ORM
- TypeScript (strict)

#### Features as Modules

Each feature (authentication, punishment, character creation, etc.) is a standalone module under `source_files/server/features/`.

```typescript name=source_files/server/features/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'db/entities/Account';
import { AuthEvents } from './auth.events';
import { AuthService } from './auth.service';

@Module({
	imports: [TypeOrmModule.forFeature([Account])],
	providers: [AuthService, AuthEvents],
	exports: [AuthService]
})
export class AuthModule {}
```

#### Database Entities

Entities are in `source_files/server/db/entities/`.

```typescript name=source_files/server/db/entities/Account.ts
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	Index,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { AccountPunishment } from './AccountPunishment';
import { Character } from './Character';
import { Report } from './Report';
import { Role } from './Role';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class Account {
	@Index()
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@Column({ length: 30, unique: true, nullable: false })
	username!: string;

	@Column({ length: 50, unique: true, nullable: false })
	email!: string;

	@Exclude()
	@Column({ type: 'char', length: 128, nullable: false })
	password!: string;

	@Exclude()
	@Column({ type: 'char', length: 64, nullable: false })
	salt!: string;

	@Column({ type: 'timestamptz', nullable: true })
	dateActivated?: Date;

	@Column({ type: 'timestamptz', nullable: true })
	lastLogin?: Date;

	@Column({ type: 'int', name: 'roleId' })
	@ManyToOne(() => Role, (role) => role.accounts, { nullable: false, eager: true })
	role!: number | Role;

	@CreateDateColumn({ type: 'timestamptz' })
	dateCreated?: Date;

	@Exclude()
	@DeleteDateColumn({ type: 'timestamptz' })
	dateDeleted?: Date;

	@Exclude()
	@UpdateDateColumn({ type: 'timestamptz' })
	dateUpdated?: Date;

	@OneToMany(() => Character, (character) => character.account, { eager: true })
	characters?: Character[];

	@OneToMany(() => AccountPunishment, (accountPunishment) => accountPunishment.received, {
		eager: true
	})
	accountPunishments?: AccountPunishment[] | number[];

	@Exclude()
	@OneToMany(() => AccountPunishment, (accountPunishment) => accountPunishment.issued, {
		eager: true
	})
	accountIssuedPunishments?: AccountPunishment[] | number[];

	@Exclude()
	@OneToMany(() => Report, (report) => report.claimedBy, { eager: true })
	accountClaimedBy?: Report[] | number[];

	@Exclude()
	@OneToMany(() => Report, (report) => report.reportedBy, { eager: true })
	accountReportedBy?: Report[] | number[];

	constructor(
		username: string,
		email: string,
		password: string,
		salt: string,
		role: Role | number = 1
	) {
		this.username = username;
		this.email = email;
		this.password = password;
		this.salt = salt;
		this.role = role;
	}
}
```

#### Major Features

Authentication (with salted PBKDF2 password hashing):

```typescript name=source_files/server/features/auth/auth.service.ts
public hashPassword(password: string) {
	const salt = crypto.randomBytes(32).toString('hex');
	const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
	return { salt, hash };
}
public comparePasswords(password: string, hash: string, salt: string): boolean {
	return hash === crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}
```

Login logic:

```typescript name=source_files/server/features/auth/auth.service.ts
async login({
	username,
	password
}: {
	username: string;
	password: string;
}): Promise<{ account: AccountData | null; msgs: string[] }> {
	const account = await this.accountRepo?.findOne({
		where: { username: Like(username) }
	});
	if (account == null) {
		return { account: null, msgs: ['No account with username ' + username + ' found!'] };
	} else {
		if (this.comparePasswords(password, account.password, account.salt)) {
			await this.accountRepo?.update(
				{ username: Like(account.username) },
				{ lastLogin: new Date() }
			);
			return { account: instanceToPlain(account) as AccountData, msgs: [] };
		} else {
			return { account: null, msgs: ['Wrong password!'] };
		}
	}
}
```

Module aggregation:

```typescript name=source_files/server/features/features.module.ts
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CharacterCreatorModule } from './characterCreator/characterCreator.module';
import { CharacterSelectorModule } from './characterSelector/chracterSelector.module';
import { CommandProcessorModule } from './commandProcessor/commandProcessor.module';
import { DeathLogModule } from './deathLog/deathLog.module';
import { PunishmentModule } from './punishment/punishment.module';

@Module({
	providers: [],
	imports: [
		AuthModule,
		CharacterCreatorModule,
		CharacterSelectorModule,
		CommandProcessorModule,
		DeathLogModule,
		PunishmentModule
	]
})
export class FeaturesModule {}
```

---

### Client

**Main technologies:**  
- TypeScript  
- Custom module/DI system  
- RAGE:MP Client API  

Modular client app entrypoint:

```typescript name=source_files/client/app.module.ts
import { Module, ModuleBase } from '@utils';
import { AuthModule } from 'modules/auth/auth.module';
import { CharacterCreatorModule } from 'modules/characterCreator/characterCreator.module';
import { CharacterSelectorModule } from 'modules/characterSelector/chracterSelector.module';

@Module({
	imports: [AuthModule, CharacterCreatorModule, CharacterSelectorModule]
})
export class AppModule extends ModuleBase {}
```

---

### UI

**Main technologies:**  
- React (functional components, hooks)  
- Vite (fast build/HMR)  
- TypeScript  
- ESLint  

Minimal UI entrypoint:

```tsx name=source_files/ui/src/App.tsx
import React from 'react';

function App() {
	return (
		<div className="App">
			<h1>Welcome to RAGE:MP UI Overlay</h1>
		</div>
	);
}

export default App;
```

---

### Shared

Types and helpers used across server, client, and UI:

```typescript name=source_files/shared/types.ts
export interface PlayerData {
	id: number;
	name: string;
	role: 'user' | 'admin';
}
```

---

## Development

### Prerequisites

- Node.js (16+)
- RAGE:MP server
- PostgreSQL DB (configure via `.env`)

### Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Teca1997/ragemp-ts-gamemode.git
   cd ragemp-ts-gamemode
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Edit `.env`:
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

---

## Custom Decorators

### `@Module` (Client)

```typescript name=source_files/client/utils/decorators/module/module.decorator.ts
export interface ModuleMetadata {
	imports?: any[];
	exports?: any[];
	events?: any[];
	providers?: any[];
}
export function Module(metadata: ModuleMetadata) {
	return function (target: any) {
		ModuleRegistry.register(target, metadata);
	};
}
```

---

### `@MPEvent` (Server)

```typescript name=source_files/server/utils/decorators/event/Event.decorator.ts
type MPEventOptions = { name?: string; proc?: boolean; };

function MPEvent(options?: MPEventOptions): MethodDecorator {
	return function (
		target: any,
		propertyKey: string | symbol,
		descriptor: PropertyDescriptor
	) {
		if (!target.constructor._mpEvents) {
			target.constructor._mpEvents = [];
		}
		target.constructor._mpEvents.push({
			eventName: options?.name ? options.name : propertyKey,
			propertyKey: propertyKey,
			proc: options?.proc ? options.proc : false
		});
	};
}
export { MPEvent };
```

---

### `ModuleBase` and `EventsBase` (Client)

```typescript name=source_files/client/utils/decorators/module/Module.base.ts
export abstract class ModuleBase {
	constructor() {
		mp.console.logInfo(`${this.constructor.name} created!`);
	}
}
```

```typescript name=source_files/client/utils/decorators/module/Event.base.ts
export abstract class EventsBase {
	public _events: { eventName: string; handler: Function; proc: boolean }[] = [];
	constructor() {
		mp.console.logInfo(`${this.constructor.name} created!`);
	}
}
```

---

### `MPEventRegistry` (Client)

```typescript name=source_files/client/utils/decorators/mpEvent/mpEvent.registry.ts
type MPEventData = { eventName: string; method: Function; proc: boolean };
export class MPEventRegistry {
	private static registry = new Map<Function, MPEventData[]>();

	static register(target: Function, eventData: MPEventData) {
		if (!this.registry.has(target)) this.registry.set(target, []);
		const classEvents = this.registry.get(target)!;
		if (classEvents.findIndex(ev => ev.eventName === eventData.eventName) !== -1) {
			mp.console.logError(`Event "${eventData.eventName}" is already registered in ${target.name}.`);
		}
		classEvents.push(eventData);
	}
	static get(target: Function) {
		return this.registry.get(target) || [];
	}
	static has(target: Function) {
		return this.registry.has(target);
	}
}
```

---

### Decorator Summary Table

| Decorator/Class      | Purpose                                                    | Where Used         |
|----------------------|------------------------------------------------------------|--------------------|
| `@Module`            | Registers a class/module and metadata in ModuleRegistry     | Client modules     |
| `@MPEvent`           | Marks methods as event handlers; stores metadata           | Server event classes|
| `ModuleBase`         | Base for module classes, logs creation                     | Client modules     |
| `EventsBase`         | Base for event handler classes, logs creation              | Client events      |
| `MPEventRegistry`    | Central registry for event handler metadata                | Client event system|

---

## Extending & Contributing

- Add new server/client modules and register them.
- Share types via `shared/`.
- Extend the UI with new React components and pages.
- Pull requests welcome! Use TypeScript and modular code.

---

## License

MIT

---
