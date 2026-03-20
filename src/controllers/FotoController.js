import multer from 'multer';
import multerConfig from '../config/multer.js';

import Foto from '../models/Foto.js';

const upload = multer(multerConfig).single('image');

class FotoController {
  store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          error: [error.code]
        });
      }
      try {
        const { originalname, filename } = req.file;
        const { aluno_id } = req.body;
        const foto = await Foto.create({ originalname, filename, aluno_id });

        return res.json(foto);

      } catch (e) {
        res.status(400).json({
          error: e
        });
      }
    });
  }
}
export default new FotoController();
