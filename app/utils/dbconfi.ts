import { connect } from "mongoose";

export const dbconfig = async () => {
  try {
    await connect(process.env.DB_STRING as string).then(() => {
      console.clear();
      console.log("server up");
    });
  } catch (error) {
    console.log(error);
  }
};
