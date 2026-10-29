
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import MenuItem from "@/models/MenuItem";
import { createMenuItemSchema } from "@/lib/validations/menu";
export async function GET() {
  try {
    await connectDB();

    const menuItems = await MenuItem.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      count: menuItems.length,
      data: menuItems,
    });
  } catch (error) {
    console.error("Failed to fetch menu items:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch menu items",
      },
      { status: 500 }
    );
  }
}


export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const validation = createMenuItemSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Validation failed",
        errors: validation.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const menuItem = await MenuItem.create(validation.data);

    return NextResponse.json(
      {
        success: true,
        message: "Menu item created successfully",
        data: menuItem,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create menu item:", error);

    return NextResponse.json(
      { success: false, message: "Failed to create menu item" },
      { status: 500 }
    );
  }
}
