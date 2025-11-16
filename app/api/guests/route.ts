import { NextResponse } from "next/server";
import { ZodError } from "zod";

import Guest from "@/models/guest";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const guest = await Guest.create({
      name: body.name,
      message: typeof body.message === "string" ? body.message : "",
      attendance: body.attendance,
      guests:
        typeof body.guests === "number" && Number.isFinite(body.guests)
          ? body.guests
          : undefined,
    });

    return NextResponse.json(
      {
        success: true,
        guestId: guest._id,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: error.issues[0]?.message ?? "Dữ liệu không hợp lệ.",
        },
        { status: 400 }
      );
    }

    console.error("RSVP_FORM_ERROR", error);

    return NextResponse.json(
      {
        success: false,
        message: "Không thể gửi lời nhắn lúc này, vui lòng thử lại.",
      },
      { status: 500 }
    );
  }
}
