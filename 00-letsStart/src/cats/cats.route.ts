import { Router } from "express";
import {
  readAllcat,
  readCat,
  createCat,
  updateCat,
  deleteCat,
} from "./cats.service";
const router = Router();

router.get("/cats", readAllcat);

router.get("/cats/:id", readCat);

router.post("/cats", createCat);

router.patch("/cats:id", updateCat);

router.delete("/cats/:id", deleteCat);

export default router;
