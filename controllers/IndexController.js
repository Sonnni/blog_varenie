import express from 'express';

const router = express.Router();

/**
 * Uvodna stranka
 */
router.get("/", function (req, res) {
    res.render('index/index.twig', {
        message: 'Vitajte na našej webovej stránke s receptami! Tu nájdete množstvo skvelých receptov na rôzne jedlá a nápoje.'
    });
});

/**
 * Stranka s receptami
 */
router.get("/recepty", function (req, res) {
    res.render('index/recepty.twig', {
        message: 'Recepty'
    });
});

export {router as IndexController}

