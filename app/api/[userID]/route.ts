import { dbconfig } from "@/app/utils/dbconfi";
import postModel from "@/app/utils/model/postModel";
import userModel from "@/app/utils/model/userModel";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: any) => {
  try {
    await dbconfig();
    const { userID } = params;
    const userData = await userModel.findById(userID).populate({
      path: "post",
    });

    return NextResponse.json({
      message: "valid user ID",
      status: 200,
      data: userData,
    });
  } catch (error) {
    return NextResponse.json({
      message: "invalid user ID",
      status: 404,
    });
  }
};

export const POST = async (req: NextRequest, { params }: any) => {
  try {
    await dbconfig();
    const { title, desc, content, image } = await req.json();

    const { userID } = params;
    const userData = await userModel.findById(userID);

    const post = await postModel.create({
      title,
      desc,
      content,
      image,
    });

    userData.post.push(new Types.ObjectId(post._id));
    userData.save();

    return NextResponse.json({
      message: "users found",
      status: 200,
      data: post,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error",
      status: 404,
      data: error,
    });
  }
};
