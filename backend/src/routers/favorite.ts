import { addFavorite, getFavorites, getIsFavorite, toggleFavorite } from "#/controllers/favorite";
import { isVerified, mustAuth } from "#/middleware/auth";
import { Router } from "express";

const router = Router();

router.post("/", mustAuth, isVerified, toggleFavorite);
router.post("/add", mustAuth, isVerified, addFavorite);
router.get("/", mustAuth, getFavorites);
router.get("/is-fav", mustAuth, getIsFavorite);

export default router;
