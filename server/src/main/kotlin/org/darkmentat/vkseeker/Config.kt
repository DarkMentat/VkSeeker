package org.darkmentat.vkseeker

import com.vk.api.sdk.client.VkApiClient
import com.vk.api.sdk.httpclient.HttpTransportClient
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.*


@Configuration class VkApi {

    @Bean fun vkApiClient(): VkApiClient {

        return VkApiClient(HttpTransportClient.getInstance())
    }
}

@Configuration
@EnableWebMvc
class WebConfig : WebMvcConfigurerAdapter() {
    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/**")
    }

    override fun configureViewResolvers(registry: ViewResolverRegistry) {
        registry.jsp("/", ".html")
    }

    override fun addResourceHandlers(registry: ResourceHandlerRegistry) {
        registry.addResourceHandler("/**").addResourceLocations("classpath:/static/")
    }
}