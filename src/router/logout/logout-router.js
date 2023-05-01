import { Router } from "express";
import { logout } from "../../controller/user/logout";
export const logoutRouter = Router();


logoutRouter.get("/logout", logout);
