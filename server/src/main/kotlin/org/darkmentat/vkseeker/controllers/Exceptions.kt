package org.darkmentat.vkseeker.controllers

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus


@ResponseStatus(value = HttpStatus.UNAUTHORIZED, reason = "Bad credentials") // 401
class UnauthorizedException : RuntimeException()