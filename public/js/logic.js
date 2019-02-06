const getMessage = advices => advices.message.text;
const findMessage = advices => advices.message;
const getAdvice = advices => advices.slips;
const getSlips = slip => slip.advice;
if (typeof module !== 'undefined') {
  module.exports = {
    getMessage,
    getAdvice,
    getSlips,
    findMessage,
  };
}
