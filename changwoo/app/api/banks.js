const _ = require('lodash');
const { User: Bank, Ura } = require('../../data');
const config = require('../../config');

module.exports = {
  isBank(req, res, next) {
    const userId = req.user.id;

    return Bank.findOne({
      where: {
        id: userId,
      },
    })
    .then((reply) => {
      if (!reply || _.indexOf(config.BANK_ACCOUNT, userId) == -1) {
        res.status(500).send({ message: '은행 계좌가 아닙니다.' });
        return;
      }
      res.send({ message: '은행 계좌로 확인되었습니다.' });
    });
  },
}