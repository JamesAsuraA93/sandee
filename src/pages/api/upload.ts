// create upload file .las and convert to .json then retur value to user

import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { exec } from "child_process";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const form = new formidable.IncomingForm();
  // form.uploadDir = "./public/uploads";
  form.addListener("file", (name, file) => {
    console.log("file", file);
  });
  // form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {

    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!files.file) {
      res.status(400).json({ error: "No file found" });
      return;
    }
    const file = files.file[0] as formidable.File;
    const oldPath = file.filepath;
    const newPath = path.join("/", file.newFilename);
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      exec(
        `las2json ${newPath} --ws 1 --wd 1 --depth --json`,
        (err, stdout, stderr) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          res.status(200).json(JSON.parse(stdout));
        },
      );
    });
  });
}

