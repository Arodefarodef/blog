import { NextRequest, NextResponse } from "next/server";
import { dbconfig } from "../utils/dbconfi";
import userModel from "../utils/model/userModel";

export const GET = async () => {
  try {
    await dbconfig();

    const users = await userModel.find();
    return NextResponse.json({
      message: "All Good",
      status: 200,
      data: users,
    });
  } catch (error) {
    return NextResponse.json({
      message: "error",
      status: 404,
    });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await dbconfig();
    const { name, email, password, userID, image } = await req.json();
    const users = await userModel.create({
      name,
      email,
      password,
      userID,
      image,
    });

    return NextResponse.json({
      message: "user created",
      status: 200,
      data: users,
    });
  } catch (error) {
    return NextResponse.json({
      message: "error",
      status: 404,
    });
  }
};
