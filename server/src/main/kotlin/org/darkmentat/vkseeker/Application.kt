package org.darkmentat.vkseeker


import org.springframework.boot.CommandLineRunner
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.builder.SpringApplicationBuilder
import org.springframework.boot.web.support.SpringBootServletInitializer
import org.springframework.context.annotation.Bean


@SpringBootApplication
class Application : SpringBootServletInitializer() {

    override fun configure(application: SpringApplicationBuilder) =
            application.sources(Application::class.java)


    @Bean fun onInit() = CommandLineRunner {

    }
}

fun main(args: Array<String>) {
    SpringApplication.run(Application::class.java, *args)
}
