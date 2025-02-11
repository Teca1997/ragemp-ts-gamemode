
classDiagram


class Command{
            +alias: string*
+next: Command | null
            +process() void*
+run() void
+setNextHandler() void
        }
Command  --  Command
class CommandProcessor{
            -commandChain: Command | null
-aliasList: string[]
-_instance: CommandProcessor$
            +process() void
        }
CommandProcessor  --  Command
CommandProcessor  --  CommandProcessor
class TeleportToWayPoint{
            +alias: string
            +process() void
        }
Command<|--TeleportToWayPoint
class VehicleCommand{
            +alias: string
            +process() void
        }
Command<|--VehicleCommand
class Account{
            +id?: number
+username: string
+email: string
+password: string
+salt: string
+dateActivated?: Date
+lastLogin?: Date
+role: number | Role
+characters?: Character[]
+accountPunishments?: AccountPunishment[] | number[]
+accountIssuedPunishments?: AccountPunishment[] | number[]
+accountClaimedBy?: number[] | Report[]
+accountReportedBy?: number[] | Report[]
            
        }
TimestampEntity<|--Account
Account "0..*" --  Role
Account  -- "0..*" Character
Account  -- "0..*" AccountPunishment
Account  -- "0..*" AccountPunishment
Account  -- "0..*" Report
Account  -- "0..*" Report
class AccountIp{
            +account: number | Account
+ip: string
            
        }
TimestampEntity<|--AccountIp
AccountIp  --  Account
class AccountPunishment{
            +punishment: Punishment
+receivedId: number
+issuedId: number
+dateCreated?: Date
+dateDeleted?: Date
+dateUpdated?: Date
+received: number | Account
+issued?: number | Account
+expires?: Date
            +beforeinsert() void
        }
AccountPunishment "0..*" --  Punishment
class AccountSerial{
            +account: number | Account
+serial: string
            
        }
TimestampEntity<|--AccountSerial
AccountSerial  --  Account
class AccountSocialClub{
            +account: number | Account
+socialClub: string
            
        }
TimestampEntity<|--AccountSocialClub
AccountSocialClub  --  Account
class Alias{
            +aliasing: number
+aliased: number
+alias: string
            
        }
TimestampEntity<|--Alias
class Character{
            +id?: number
+firstName: string
+lastName: string
+eyeColor: number
+gender: number
+parents: CharacterParents
+faceFeatures: number[]
+headOverlays: CharacterHeadOverlay[]
+clothes: CharacterClothingItem[]
+hairColors: CharacterHair
+position: Position
+timePlayed?: number
+inventory: any
+vitals?: CharacterVitals
+account?: number | Account | null
+aliasedCharacters?: Alias[]
+aliasedByCharacters?: Alias[]
+characterIdLog?: CharacterIdLog[]
+characterVehicle?: Vehicle[]
+characterVictim?: number | CharacterDeathLog
+characterKiller?: number | CharacterDeathLog
            
        }
TimestampEntity<|--Character
Pick<|..Character
Character  -- "0..*" Alias
Character  -- "0..*" Alias
Character  -- "0..*" CharacterIdLog
Character  -- "0..*" Vehicle
Character  --  CharacterDeathLog
Character  --  CharacterDeathLog
class CharacterDeathLog{
            +victim: number | Character
+killer: number | Character | null
+reason: number
+dateCreated?: Date
+dateDeleted?: Date
+dateUpdated?: Date
            
        }
class CharacterIdLog{
            +character: number
+timeAssigned: Date
+assignedId: number
            
        }
TimestampEntity<|--CharacterIdLog
class Ip{
            +id: string
+accountIps: number[] | AccountIp[]
            
        }
TimestampEntity<|--Ip
Ip  -- "0..*" AccountIp
class Punishment{
            +id?: number
+description: string
+duration: number | null
+accountPunishments?: AccountPunishment[] | number[]
            
        }
TimestampEntity<|--Punishment
class Report{
            +id?: number
+timeCreated?: Date
+timeClaimed?: Date
+timeClosed?: Date
+reportText: string
+reportedBy: number | Account
+claimedBy?: number | Account
+reportType?: number | ReportType
            
        }
TimestampEntity<|--Report
Report "0..*" --  ReportType
class ReportType{
            +id?: number
+name: string
+reports?: Report[]
            
        }
TimestampEntity<|--ReportType
class Role{
            +id?: number
+name: string
+description: string
+color: string
+accounts?: number[] | Account[] | null
            
        }
TimestampEntity<|--Role
class Serial{
            +id: string
+accountSerials?: number[] | AccountSerial[]
            
        }
TimestampEntity<|--Serial
Serial  -- "0..*" AccountSerial
class SocialClub{
            +id: string
+accountSocialClubs?: string[] | AccountSocialClub[]
            
        }
TimestampEntity<|--SocialClub
SocialClub  -- "0..*" AccountSocialClub
class TimestampEntity{
            +dateCreated?: Date
+dateDeleted?: Date
+dateUpdated?: Date
            
        }
class Vehicle{
            +id?: number
+price?: number
+plate?: string
+model: string
+doorState?: boolean
+engineHealth?: number
+distanceDriven?: number
+tank?: number
+mods?: VehicleMod[]
+position: Position
+characterOwner?: number
            +beforeInsert() void
        }
TimestampEntity<|--Vehicle
class WorldDoor{
            +id?: number
+name: string
+state: boolean
+labelPosition: Vector
+interactionColshapePosition: Vector
+interactionColshapeRadius: number
+dimension?: number
            
        }
TimestampEntity<|--WorldDoor
class Mock{
            
            +run() Promise~void~
        }
Seeder<|..Mock
class AdminService{
            -_instance: AdminService$
            
        }
AdminService  --  AdminService
class AuthService{
            -_instance: AuthService$
            -playerReady() void
-logout() void
-login() Promise~string~
-register() Promise~string~
+hashPassword() #123; salt: string; hash: string; #125;
+comparePasswords() boolean
        }
AuthService  --  AuthService
class CharacterSelector{
            -_instance: CharacterSelector$
-freemodeCharacters: any[]
            -setHeadOverlay() void
-play() Promise~boolean~
-applyCharacter() Promise~void~
        }
CharacterSelector  --  CharacterSelector
class PlayerService{
            -_instance: PlayerService$
            -playerDeath() Promise~void~
        }
PlayerService  --  PlayerService
class PunishmentService{
            -_instance: PunishmentService$
            -playerJoin() Promise~void~
        }
PunishmentService  --  PunishmentService