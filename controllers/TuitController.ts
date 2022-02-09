import {Request, Response, Express} from "express";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitControllerI";
import Tuit from "../models/Tuit";


export default class TuitController implements TuitControllerI {
  app: Express;
  tuitDao: TuitDao;
  constructor(app: Express, tuitDao: TuitDao) {
    this.app = app;
    this.tuitDao = tuitDao;
    app.get("/tuits", this.findAllTuits);
    app.get("/tuits/:uid/tuits", this.findTuitsByUser);
    app.get("/tuits/:tid", this.findTuitById);
    app.post("/tuits", this.createTuit);
    app.put("/tuits/:tid", this.updateTuit);
    app.delete("/tuits/:tid", this.deleteTuit);
  }
  findAllTuits = (req: Request, res: Response) =>
      this.tuitDao.findAllTuits()
      .then(tuits => res.json(tuits));
  findTuitById = (req: Request, res: Response) =>
      this.tuitDao.findTuitById(req.params.tid)
      .then(tuit => res.json(tuit));
  findTuitsByUser = (req: Request, res: Response) =>
      this.tuitDao.findTuitsByUser(req.params.uid)
      .then((tuits: Tuit[]) => res.json(tuits)).then(tuit => res.json(tuit));
  createTuit = (req: Request, res: Response) =>
          this.tuitDao.createTuit(req.body)
          .then((tuit: Tuit) => res.json(tuit));
  deleteTuit = (req: Request, res: Response) =>
      this.tuitDao.deleteTuit(req.params.tid)
      .then(status => res.json(status));
  updateTuit = (req: Request, res: Response) =>
      this.tuitDao.updateTuit(req.params.tid, req.body)
      .then(status => res.json(status));
}
