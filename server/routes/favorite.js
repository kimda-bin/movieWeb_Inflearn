const express = require("express");
const router = express.Router();
const { Favorite } = require("../models/Favorite");

//====================================
//             Favorite
//====================================

router.post("/favoriteNumber", (req, res) => {
  //mongoDB에서 favorite 숫자를 가져오기
  Favorite.find({ movieId: req.body.movieId }).exec((err, info) => {
    if (err) return res.status(400).send(err);

    //그다음에 프론트에 다시 숫자 정보를 보내주기
    res.status(200).json({ success: true, favoriteNumber: info.length });
  });
});

//내가 이 영화를 Favorite 리스트에 넣었는지 정보를 DB에서 가져오기
router.post("/favorited", (req, res) => {
  //mongoDB에서 favorite 숫자를 가져오기
  Favorite.find({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, info) => {
    if (err) return res.status(400).send(err);

    let result = false;
    if (info.length !== 0) {
      result = true;
    }

    //그다음에 프론트에 다시 숫자 정보를 보내주기
    res.status(200).json({ success: true, favorited: result });
  });
});

router.post("/removeFromFavorite", (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, doc });
  });
});

router.post("/addToFavorite", (req, res) => {
  //인스턴스 생성
  const favorite = new Favorite(req.body);
  //Favorite 안에 넣어준 값들을 저장시킴
  favorite.save((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});

router.post("/getFavoriteMovie", (req, res) => {
  Favorite.find({ userFrom: req.body.userFrom }).exec((err, favorites) => {
    if (err) {
      return res.status(400).send(err);
    }
    return res.status(200).json({ success: true, favorites });
  });
});

router.post("/removeFromFavorite", (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, result) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true });
  });
});

module.exports = router;
