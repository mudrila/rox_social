function baseErrorResponse(messageBody) {
  return {
    success: false,
    messageType: 'error',
    messageBody: messageBody,
    data: null
  }
}
function baseWarningResponse(messageBody) {
  return {
    success: false,
    messageType: 'warning',
    messageBody:messageBody,
    data: null
  }
}
function baseSuccessResponse(messageBody, data) {
  return {
    success: true,
    messageType: 'success',
    messageBody: messageBody,
    data: data
  }
}

module.exports = {
  baseErrorResponse: baseErrorResponse,
  baseWarningResponse: baseWarningResponse,
  baseSuccessResponse: baseSuccessResponse
};