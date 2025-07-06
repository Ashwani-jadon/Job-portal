import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      experience,
      location,
      jobType,
      position,
      companyId,
    } = req.body;

    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !experience ||
      !location ||
      !jobType ||
      !position ||
      !companyId
    ) {
      res.status(400).json({
        message: "soething is missing",
        sucess: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary,
      experience,
      location,
      jobType,
      position,
      company: companyId,
      experienceLevel: experience,
      created_by: userId,
    });

    return res.status(201).json({
      message: "New job created succesfully",
      job,
      sucess: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keywords = req.query.keywords || "";

    const query = {
      $or: [
        { title: { $regex: keywords, $options: "i" } },
        { description: { $regex: keywords, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query).populate({
      path:"company"
    }).sort({createdAt:-1});

    if (!jobs) {
      return res.status(404).json({
        messsage: "jobs not found",
        sucess: false,
      });
    }
    return res.status(200).json({
      jobs,
      sucess: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "jobs not found",
        sucess: false,
      });
    }

    return res.status(200).json({
      job,
      sucess: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const gerAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId });

    if (!jobs) {
      return res.status(404).json({
        message: "jobs not found",
        sucess: false,
      });
    }

    return res.status(200).json({
      jobs,
      sucess: true,
    });
  } catch (error) {
    console.log(error);
  }
};
