const controller = require('../controllers/uploadfile.controller');

app.post("/api/uploadFile",controller.uploadFile);