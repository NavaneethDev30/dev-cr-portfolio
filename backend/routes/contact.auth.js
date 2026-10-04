import { Router } from "express";
import { submitContactForm } from "../controllers/contact.controller.js";

const ContactRoute = Router();

ContactRoute.post('/', submitContactForm);

export default ContactRoute;
