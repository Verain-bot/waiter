USER_LOGGED_IN = lambda phone: {
    'phone' : phone,
    'message' : 'User currently logged in ',
    'type' : 'success'
    }
USER_LOGGED_OUT = {
    'message' : 'You have successfully logged out',
    'type' : 'success'
}

USER_ALREADY_LOGGED_IN = {
    'message' : 'You are already logged in',
    'type' : 'error'
}

PHONE_NOT_FOUND = {
    'message' : 'Could not find user with this phone number. Please register first',
    'type' : 'error'
}

OTP_SENT = lambda phone:  {
    'message' : 'OTP sent successfully',
    'phone' : phone,
    'type' : 'success'
}

INVALID_REQUEST = {
    'message' : 'Invalid request',
    'type' : 'error',
}

OTP_NOT_GENERATED = {
    'message' : 'OTP not generated, please try again',
    'type' : 'error'
}

OTP_TOO_MANY_ATTEMPTS = {
    'message' : 'Too many attempts, please try again later',
    'type' : 'error'
}

OTP_VERIFICATION_COMPLETE = {
    'message' : 'OTP verified successfully',
    'type' : 'success'
}

WRONG_OTP = {
    'message' : 'Wrong OTP, please try again',
    'type' : 'error'
}

TABLE_ALREADY_ASSIGNED = {
    'message' : 'Table already assigned to you',
    'type' : 'error',
}

TABLENO_NOT_PROVIDED = {
    'message' : 'Table number not provided',
    'type' : 'error',
}

TABLE_ALREADY_OCCUPIED = {
    'message' : 'Table already occupied',
    'type' : 'error',
}

TABLE_ASSIGNED_SUCCESS = {
    'message' : 'Table assigned successfully',
    'type' : 'success',
}

TABLE_NOT_REQUESTED = {
    'message' : 'Table not requested',
    'type' : 'error',
}

TABLE_ALREADY_REQUESTED = {
    'message' : 'Table already requested',
    'type' : 'error',
}

TABLE_NOT_OCCUPIED = {
    'message' : 'Table not occupied',
    'type' : 'error',
}

TABLE_JOIN_REQUESTED = {
    'message' : 'You will join when someone approves your request',
    'type' : 'success',
}

TABLE_REQUEST_DELETED = {
    'message' : 'Table request deleted',
    'type' : 'success',
}

USER_NOT_FOUND = {
    'message' : 'User not found',
    'type' : 'error',
}

USER_ACCEPTED = {
    'message' : 'User accepted',
    'type' : 'success',
}

TABLE_NOT_ASSIGNED = {
    'message' : 'Table not assigned',
    'type' : 'error',
}

GENERAL_SUCCESS = {
    'message' : 'Success',
    'type' : 'success',
}