function baseErrorResponse(messageBody) {
  return {
    success: false,
    messageType: 'error',
    messageBody: messageBody || 'Some error on server :(',
    data: null
  }
}
function baseWarningResponse(messageBody) {
  return {
    success: false,
    messageType: 'warning',
    messageBody:messageBody || 'Warning message not specified, please, contact our support',
    data: null
  }
}
function baseSuccessResponse(messageBody, data) {
  if (!data) {
    throw new Error()
  }
  return {
    success: true,
    messageType: 'success',
    messageBody: messageBody || 'Success!',
    data: data
  }
}

module.exports = {
  baseErrorResponse: baseErrorResponse,
  baseWarningResponse: baseWarningResponse,
  baseSuccessResponse: baseSuccessResponse
};
