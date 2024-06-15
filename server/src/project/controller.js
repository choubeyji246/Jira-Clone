const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

const response = require("../utils/successResponse");
const { project } = require("./model");
const { AppError } = require("../utils/errorHandler");
const { user } = require("../auth/model");
const { storeProjectsInCache } = require("../utils/redis")
const { fetchProjectsFromCache } = require("../utils/redis")

let responseObject = {
  message: "",
  data: null,
};
const SALT_ROUNDS = 10;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const createProject = async (req, res, next) => {
  try {
    const projectOwner = req.email;
    req.body.createdBy = projectOwner;
    const data = await project.create(req.body);

    const projects = await project.find({});
    await storeProjectsInCache("projects",projects);
    responseObject = { message: "Project created successfully", data: data };
    res.status(201).send(response(200, responseObject));
  } catch (error) {
    const customError = new AppError(error.statusCod || 500, error.message);
    next(customError);
  }
};

const addMembers = async (req, res, next) => {
  try {
    const { projectId, email, role } = req.body;

    const data = await user.findOne({ email });
    const userEmail = req.email;
    console.log(data);

    const projectData = await project.findByIdAndUpdate(projectId, {
      $push: { members: { email: email, role: role } },
    });

    if (userEmail !== projectData.createdBy) {
      throw new AppError(
        403,
        "You are not allowed to add member in this project"
      );
    }
    if (!data) {
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      const randomPassword = uuidv4();
      const password = await bcrypt.hash(randomPassword, salt);
      const newData = await user.create({
        name: "name",
        email: email,
        password: password,
        phone: "phone",
      });

      await sendEmail(
        email,
        `You are added to the project as a ${role} 
       and your temorary password is ${randomPassword}`
      );
    } else {
      sendEmail(email, `You are added to the project as a ${role}`);
    }

    const projects = await project.find({});
    await storeProjectsInCache("projects",projects);
    const responseObject = { data: null, message: "Member added succesfully" };
    res.status(200).send(response(200, responseObject));
  } catch (error) {
    console.log(error);
    const customError = new AppError(error.statusCode || 500, error.message);
    next(customError);
  }
};

const getAllProjects = async (req, res, next) => {
  try {
    let projects = await fetchProjectsFromCache("projects");

    if (!projects) {
      projects = await project.find({});
      await storeProjectsInCache("projects" ,projects);
    }

    const responseObject = {
      message: "Projects fetched successfully",
      data: projects,
    };

    res.status(200).send(response(200, responseObject));
  } catch (error) {
    const customError = new AppError(error.statusCode || 500, error.message);
    next(customError);
  }
};


const sendEmail = async (email, message) => {
  const accessToken = await oAuth2Client.getAccessToken();
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",

    secure: false,
    logger: true,
    debug: true,
    auth: {
      type: "OAuth2",
      user: "ankitchoubey@ncompass.inc",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: "Ankit :)) <ankitchoubey@ncompass.inc>",
    to: email,
    subject: "Added as Collaborator",
    text: message,
  };

  const result = await transport.sendMail(mailOptions);

  if (!result) {
    throw new Error("Email sending failed");
  }
};


module.exports = {
  createProject,
  addMembers,
  getAllProjects,
};
