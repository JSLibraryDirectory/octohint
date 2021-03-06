import { LineAndCharacter } from 'typescript'

export type Range = LineAndCharacter

export interface Occurrence {
  isWriteAccess?: boolean
  range: Range
  width: number
}

export interface QuickInfo {
  info: string
  range: Range
  width: number
}

export type Definition = LineAndCharacter

export interface Position {
  x: number
  y: number
}

export enum MessageType {
  service = 'service',
  occurrence = 'occurrence',
  quickInfo = 'quickInfo',
}

// Message from background
// interface BackgroundMessageBase {}

interface BackgroundMessageOfService {}

interface BackgroundMessageOfOccurrence {
  occurrences: Occurrence
  info?: Range
}

interface BackgroundMessageOfQuickInfo {
  data: QuickInfo
}

interface BackgroundMessageOfError {
  error: string
}

export type BackgroundMessage =
  | BackgroundMessageOfService
  | BackgroundMessageOfOccurrence
  | BackgroundMessageOfQuickInfo
  | BackgroundMessageOfError

// Message from Content Script
interface BaseContentMessage {
  file: string
}

interface ContentMessageOfService extends BaseContentMessage {
  type: MessageType.service
  code: string
}

interface ContentMessageOfOccurrence extends BaseContentMessage {
  type: MessageType.occurrence
  position: Position
  meta?: boolean
}

interface ContentMessageOfQuickInfo extends BaseContentMessage {
  type: MessageType.quickInfo
  position: Position
}

export type ContentMessage = ContentMessageOfService | ContentMessageOfOccurrence | ContentMessageOfQuickInfo
