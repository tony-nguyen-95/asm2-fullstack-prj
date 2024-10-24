package com.asm.asm2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.filter.CorsFilter;

import com.asm.asm2.Controllers.AuthenServlet;
import com.asm.asm2.Controllers.CompanyServlet;
import com.asm.asm2.Controllers.RecruitmentServlet;
import com.asm.asm2.Controllers.UserServlet;
import com.asm.asm2.Services.CompanyService;
import com.asm.asm2.Services.EmailService;
import com.asm.asm2.Services.RecruitmentService;
import com.asm.asm2.Services.UserService;

import org.springframework.web.multipart.support.StandardServletMultipartResolver;

@SpringBootApplication
@ServletComponentScan
public class Asm2Application {

	public static void main(String[] args) {
		SpringApplication.run(Asm2Application.class, args);
	}

	@Bean
	public StandardServletMultipartResolver multipartResolver() {
		return new StandardServletMultipartResolver();
	}

	@Bean
	public ServletRegistrationBean<UserServlet> userServletRegistration(UserService userService,
			EmailService emailService) {
		UserServlet servlet = new UserServlet();
		servlet.setUserService(userService, emailService);
		return new ServletRegistrationBean<>(servlet, "/api/users");
	}

	@Bean
	public ServletRegistrationBean<CompanyServlet> companiesServletRegistration(CompanyService companyService) {
		CompanyServlet servlet = new CompanyServlet();
		servlet.setCompanyService(companyService);
		return new ServletRegistrationBean<>(servlet, "/api/companies");
	}

	@Bean
	public ServletRegistrationBean<RecruitmentServlet> recruitmentsServletRegistration(
			RecruitmentService recruitmentService) {
		RecruitmentServlet servlet = new RecruitmentServlet();
		servlet.setRecruitmentService(recruitmentService);
		return new ServletRegistrationBean<>(servlet, "/api/recruitments");
	}

	@Bean
	public ServletRegistrationBean<AuthenServlet> authenServletRegistration(UserService userService) {
		// Create and configure UserServlet
		AuthenServlet servlet = new AuthenServlet();
		servlet.setUserService(userService); // Inject the service manually
		return new ServletRegistrationBean<>(servlet, "/api/login");
	}

	@Bean
	public FilterRegistrationBean<CorsFilter> corsFilterRegistration() {
		// Configure CORS for front-end
		CorsConfiguration corsConfiguration = new CorsConfiguration();
		corsConfiguration.addAllowedOrigin("http://localhost:3000"); // fe
		corsConfiguration.addAllowedMethod("*"); // Allow all methods
		corsConfiguration.addAllowedHeader("*"); // Allow all headers
		corsConfiguration.setAllowCredentials(true);

		CorsFilter corsFilter = new CorsFilter(request -> corsConfiguration);

		FilterRegistrationBean<CorsFilter> registrationBean = new FilterRegistrationBean<>(corsFilter);
		registrationBean.addUrlPatterns("/api/*"); // Apply CORS filter to the desired URL patterns
		return registrationBean;
	}

}
