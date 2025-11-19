import { NextResponse } from "next/server";

import {
  connectToDatabase,
  disconnectFromDatabase,
} from "@/lib/mongodb";

export async function GET() {
  try {
    await connectToDatabase();

    return NextResponse.json(
      {
        success: true,
        status: "connected",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DATABASE_CONNECT_ERROR", error);

    return NextResponse.json(
      {
        success: false,
        status: "error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    await disconnectFromDatabase();

    return NextResponse.json(
      {
        success: true,
        status: "disconnected",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DATABASE_DISCONNECT_ERROR", error);

    return NextResponse.json(
      {
        success: false,
        status: "error",
      },
      { status: 500 }
    );
  }
}
