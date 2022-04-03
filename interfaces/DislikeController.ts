import {Request, Response} from "express";

/**
 * @file DislikeController interface Represents web services for dislike resources
 */
export default interface DislikeControllerI {
    userTogglesTuitDislikes (req: Request, res: Response): void;
};