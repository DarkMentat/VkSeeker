package org.darkmentat.vkseeker.data

import org.darkmentat.vkseeker.entities.User
import org.springframework.data.repository.CrudRepository

interface UserRepository : CrudRepository<User, Long>