import { ObjectId } from 'mongoose';

export type paginationQuery = { pageNo: string; limit: string };

export type historyType = { audio: ObjectId; progress: number; date: Date };
