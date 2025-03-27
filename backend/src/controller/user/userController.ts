import { AuthenticatedRequestHandler } from "../../config/passportJwtStrategy";
import { sendResponse } from "../../config/utils/sendRepsonse";
import User from "../../models/userSchema";


export const getUserDetails: AuthenticatedRequestHandler = async (req, res) => {
  try {
    if (req.user instanceof User) {
      const userId = req.user._id;
      if (!userId) {
        return sendResponse(res, 400, false, "Please sign In to continue");
      }
      const user = await User.findById(userId).select("-password");
      if (!user) {
        return sendResponse(res, 404, false, "User not found");
      }
      sendResponse(res, 200, true, "User details found", { user });
    }
  } catch (error) {
    console.error(`Error in sedning user details ${error}`);
    sendResponse(res, 500, false, "Internal server error");
  }
};