/* eslint-disable */
import * as Long from 'long'
import * as _m0 from 'protobufjs/minimal'

export const protobufPackage = ''

export enum Priority {
  URGENT = 0,
  HIGH = 1,
  MEDIUM = 2,
  LOW = 3,
  UNRECOGNIZED = -1,
}

export enum Status {
  DONE = 0,
  IN_PROGRESS = 1,
  TO_DO = 2,
  UNRECOGNIZED = -1,
}

export interface Subject {
  id: string
  name: string
  description: string
  priority: Priority
  status: Status
  task: Task[]
  startDate: number
  endDate: number
  userId: string
}

export interface SubjectCreateRequest {
  name: string
  description: string
  priority: Priority
  status: Status
  task: Task[]
  startDate: number
  endDate: number
  userId: string
}

export interface Task {
  id: string
  name: string
  description: string
  priority: Priority
  status: Status
  task: Task[]
  startDate: number
  endDate: number
}

export interface TaskCreateRequest {
  name: string
  description: string
  priority: Priority
  status: Status
  task: Task[]
  startDate: number
  endDate: number
}

export const _PACKAGE_NAME = ''

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any
  _m0.configure()
}
