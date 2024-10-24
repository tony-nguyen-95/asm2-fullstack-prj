package com.asm.asm2.Services;

import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Value("${spring.mail.username}")
    private String fromEmail;

    // @Value("${spring.mail.password}")
    // private String appPassword;

    public void sendEmail(String to, String subject, String body) {
        System.out.println(to);

        try {
            // Create a new HtmlEmail instance
            HtmlEmail email = new HtmlEmail();
            email.setHostName("smtp.gmail.com");
            email.setSmtpPort(587);
            email.setAuthentication(fromEmail, "xxxx yyyy zzzz"); // app password
            email.setStartTLSRequired(true);
            email.setFrom(fromEmail, "Huy"); // "Huy" is the sender's name
            email.setSubject(subject);
            email.setHtmlMsg(body); // HTML body content, use setTextMsg for plain text
            email.addTo(to);

            // Send the email
            email.send();
            System.out.println("Email sent successfully.");
        } catch (EmailException e) {
            System.err.println("Error sending email: " + e.getMessage());
        }
    }
}
