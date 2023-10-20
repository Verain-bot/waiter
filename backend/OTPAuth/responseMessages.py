USER_LOGGED_IN = lambda phone: {
    'phone' : phone,
    'message' : 'User currently logged in ',
    'type' : 'success'
    }

USER_ALREADY_LOGGED_IN = {
    'message' : 'User already logged in',
    'type' : 'error'
}

USER_NOT_VERIFIED = {
    'message' : 'User not verified',
    'type' : 'error'
}

USER_LOGGED_OUT = {
    'message' : 'You have successfully logged out',
    'type' : 'success'
}

USER_REGISTERED = {
    'message' : 'You have successfully registered',
    'type' : 'success'
}

USER_ALREADY_REGISTERED = {
    'message' : 'You are already registered',
    'type' : 'error'
}

USER_ALREADY_VERIFIED = lambda existingUser: {
    'message' : 'You are already verified',
    'existingUser' : existingUser,
    'type' : 'error',
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

OTP_EXPIRED = {
    'message' : 'OTP expired, please try again',
    'type' : 'error'
}

OTP_TOO_MANY_ATTEMPTS = {
    'message' : 'Too many attempts, please try again later',
    'type' : 'error'
}

OTP_VERIFICATION_COMPLETE =lambda existingUser: {
    'message' : 'OTP verified successfully',
    'existingUser' : existingUser,
    'type' : 'success'
}

WRONG_OTP = {
    'message' : 'Wrong OTP, please try again',
    'type' : 'error'
}


USER_NOT_FOUND = {
    'message' : 'User not found',
    'type' : 'error',
}


GENERAL_SUCCESS = {
    'message' : 'Success',
    'type' : 'success',
}