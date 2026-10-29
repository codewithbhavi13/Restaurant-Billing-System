
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import MenuItem from "@/models/MenuItem";
import { updateMenuItemSchema } from "@/lib/validations/menu";
type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid menu item ID" },
        { status: 400 }
      );
    }

    await connectDB();

    const menuItem = await MenuItem.findById(id).lean();

    if (!menuItem) {
      return NextResponse.json(
        { success: false, message: "Menu item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: menuItem,
    });
  } catch (error) {
    console.error("Failed to fetch menu item:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch menu item" },
      { status: 500 }
    );
  }
}


export async function PATCH(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid menu item ID" },
        { status: 400 }
      );
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const validation = updateMenuItemSchema.safeParse(body);

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

    await connectDB();

    const updatedItem = await MenuItem.findByIdAndUpdate(
      id,
      { $set: validation.data },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedItem) {
      return NextResponse.json(
        { success: false, message: "Menu item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Menu item updated successfully",
      data: updatedItem,
    });
  } catch (error) {
    console.error("Failed to update menu item:", error);

    return NextResponse.json(
      { success: false, message: "Failed to update menu item" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid menu item ID",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const deletedItem = await MenuItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return NextResponse.json(
        {
          success: false,
          message: "Menu item not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Menu item deleted successfully",
      data: deletedItem,
    });
  } catch (error) {
    console.error("Failed to delete menu item:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete menu item",
      },
      { status: 500 }
    );
  }
}

