package org.darkmentat.vkseeker.entities

import javax.persistence.Entity
import javax.persistence.Id


@Entity
data class User(

        @Id var vkId: Long = -1,
        var vkToken: String = ""
)