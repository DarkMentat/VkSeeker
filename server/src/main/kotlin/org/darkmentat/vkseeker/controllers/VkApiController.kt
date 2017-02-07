package org.darkmentat.vkseeker.controllers

import com.vk.api.sdk.client.Lang
import com.vk.api.sdk.client.VkApiClient
import com.vk.api.sdk.client.actors.UserActor
import org.darkmentat.vkseeker.data.UserRepository
import org.springframework.beans.factory.annotation.Value
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.math.BigInteger
import java.security.MessageDigest


@RestController
class VkApiController(

        @Value("\${vkseeker.vk.appsecret}")
        val vkAppSecret: String,

        val userRepository: UserRepository,
        val vk: VkApiClient
) {

    data class Person(val id: Int, val firstName: String, val lastName: String, val photoUrl200: String)

    @RequestMapping("/vk/search")
    fun vkSearchInGroup(

            @RequestHeader(value="vk-auth-mid")    vkId: Int,
            @RequestHeader(value="vk-auth-expire") vkSessionExpire: Int,
            @RequestHeader(value="vk-auth-sid")    vkSessionSid: String,
            @RequestHeader(value="vk-auth-sig")    vkSessionSig: String,

            @RequestParam(value = "communityIds")                        communityIds: String,
            @RequestParam(value = "gender", required = false)            gender: String?,
            @RequestParam(value = "country", required = false)           country: String?,
            @RequestParam(value = "city", required = false)              city: String?,
            @RequestParam(value = "hometown", required = false)          hometown: String?,
            @RequestParam(value = "ageFrom", required = false)           ageFrom: Int?,
            @RequestParam(value = "ageTo", required = false)             ageTo: Int?,
            @RequestParam(value = "relationship", required = false)      relationship: String?,
            @RequestParam(value = "hasPhoto", required = false)          hasPhoto: Int?,
            @RequestParam(value = "religion", required = false)          religion: String?,
            @RequestParam(value = "personalPriority", required = false)  personalPriority: String?,
            @RequestParam(value = "peoplePriority", required = false)    peoplePriority: String?,
            @RequestParam(value = "smoking", required = false)           smoking: String?,
            @RequestParam(value = "alcohol", required = false)           alcohol: String?

    ): List<Person> {

        checkAuth(vkSessionExpire, vkId, vkSessionSid, vkSessionSig)

        val user = userRepository.findOne(vkId.toLong())
        val actor = UserActor(user.vkId.toInt(), user.vkToken)

        val communities = communityIds.split(",")
        val relations = relationship?.split(",")

        val requests = mutableListOf<String>()

        for(community in communities) {

            var request = "{"

            request += "gid:$community"

            if(gender  != null) request += ";sex:$gender"
            if(ageFrom != null) request += ";age_from:$ageFrom"
            if(ageTo   != null) request += ";age_to:$ageTo"

            if(country  != null) request += ";country:$country"
            if(city     != null) request += ";city:$city"
            if(hometown != null) request += ";hometown:$hometown"

            request += "}"

            requests.add(request)
        }

        val jsonElement = vk.execute()
                            .storageFunction(actor, "mergeRequests")
                            .lang(Lang.EN)
                            .unsafeParam("query", "")
                            .unsafeParam("requests", "[${requests.joinToString(separator = ",")}]")
                            .execute()

        return jsonElement.asJsonArray
                .map { it.asJsonArray }
                .reduce { array, array2 -> array.addAll(array2); array }
                .map { Person(it.asJsonObject.getAsJsonPrimitive("id").asInt,
                              it.asJsonObject.getAsJsonPrimitive("first_name").asString,
                              it.asJsonObject.getAsJsonPrimitive("last_name").asString,
                              it.asJsonObject.getAsJsonPrimitive("photo_200").asString) }
    }


    private fun checkAuth(expire: Int, userId: Int, sid: String, sig: String) {

        val mySigSource = "expire=${expire}mid=${userId}secret=oauthsid=$sid$vkAppSecret"
        val m = MessageDigest.getInstance("MD5")
        m.update(mySigSource.toByteArray(), 0, mySigSource.length)
        val mySigMd5 = BigInteger(1, m.digest()).toString(16)

        if(mySigMd5 != sig) {
            throw UnauthorizedException()
        }
    }
}
