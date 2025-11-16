import {
  type Collection,
  type OptionalUnlessRequiredId,
  type WithId,
} from "mongodb";

import { getMongoDatabase } from "@/lib/mongodb";

export type AttendanceStatus = "coming" | "not-coming";

export interface GuestBase {
  name: string;
  message: string;
  attendance: AttendanceStatus;
  guests: number;
  createdAt: Date;
  updatedAt: Date;
}

export type GuestDocument = WithId<GuestBase>;

export interface GuestInput {
  name: string;
  message?: string;
  attendance: AttendanceStatus;
  guests?: number;
}

const GUEST_COLLECTION = "guests";
const DEFAULT_DB = process.env.MONGODB_DB;

async function getGuestCollection(): Promise<Collection<GuestDocument>> {
  const db = await getMongoDatabase(DEFAULT_DB);
  return db.collection<GuestDocument>(GUEST_COLLECTION);
}

function normalizeGuestCount(input: GuestInput) {
  if (input.attendance === "not-coming") {
    return 0;
  }

  const guests =
    typeof input.guests === "number" && !Number.isNaN(input.guests)
      ? input.guests
      : 1;

  return Math.min(Math.max(guests, 1), 10);
}

function buildGuestDocument(input: GuestInput): Omit<GuestDocument, "_id"> {
  const now = new Date();

  return {
    name: input.name,
    message: input.message ?? "",
    attendance: input.attendance,
    guests: normalizeGuestCount(input),
    createdAt: now,
    updatedAt: now,
  };
}

const Guest = {
  async create(input: GuestInput): Promise<GuestDocument> {
    const collection = await getGuestCollection();
    const document = buildGuestDocument(input);
    const { insertedId } = await collection.insertOne(
      document as OptionalUnlessRequiredId<GuestDocument>
    );

    return {
      ...document,
      _id: insertedId,
    };
  },
};

export default Guest;
