package org.darkmentat.vkseeker.controllers

import com.vk.api.sdk.client.VkApiClient
import org.darkmentat.vkseeker.data.UserRepository
import org.darkmentat.vkseeker.entities.User
import org.springframework.beans.factory.annotation.Value
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController


@RestController
class AuthController(

        @Value("\${vkseeker.vk.appid}")
        val vkAppId: Int,

        @Value("\${vkseeker.vk.appsecret}")
        val vkAppSecret: String,

        @Value("\${vkseeker.vk.login_redirect_url}")
        val vkAppLoginRedirectUrl: String,

        val userRepository: UserRepository,
        val vk: VkApiClient
) {

    @RequestMapping("/login")
    fun login(@RequestParam(value = "code") code: String): String {

        val authResponse = vk.oauth()
                .userAuthorizationCodeFlow(vkAppId, vkAppSecret, vkAppLoginRedirectUrl, code)
                .execute()

        if(!userRepository.exists(authResponse.userId.toLong())) {

            userRepository.save(User(authResponse.userId.toLong(), authResponse.accessToken))
        } else {

            val user = userRepository.findOne(authResponse.userId.toLong())

            user.vkToken = authResponse.accessToken

            userRepository.save(user)
        }

        return "OK"
    }
}
