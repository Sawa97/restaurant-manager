package com.sawa.restaurant.service;

import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;

@Service
public class EmailSenderService {

    private final JavaMailSender mailSender;


    public EmailSenderService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

     void sendCreationAccountMail(String email, String password) throws Exception {
        try {
            MimeMessage mail = mailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(mail, true);
            messageHelper.setTo(email);
            messageHelper.setSubject("Twoje konto zostało utworzone");
            messageHelper.setText("Witamy,<br/><br/>" +
                    " Twoje konto zostało właśnie utworzone. Do konta możesz zalogować się wchodząć na stronę http://localhost:3000/.<br/>" +
                    "Login: " + email + "" +
                    "<br/>Hasło: <bold> " + password +"</bold>" +
                    "<br/> Dla celów bezpieczeństwa prosimy o zmianę hasła po pierwszym zalogowaniu.<br/><br/> Pozdrawiamy,<br/> Zespół Red Rib Restaurant", true);
            mailSender.send(mail);

        } catch (MailException e) {
            e.printStackTrace();
        }
    }

     void sendPasswordRemind(String email, String password) throws Exception {
        try {
            MimeMessage mail = mailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(mail, true);
            messageHelper.setTo(email);
            messageHelper.setSubject("Przypomnienie hasła");
            messageHelper.setText("Witamy,<br/><br/>" +
                    "Właśnie otrzymaliśmy prośbę o przypomnienie hasła. Poniżej znajdują się nowe dane do logowania.<br/>" +
                    "Login: " + email + "" +
                    "<br/>Hasło:<bold> " + password +"</bold>" +
                    "<br/> Dla celów bezpieczeństwa prosimy o zmianę hasła po zalogowaniu.<br/><br/> Pozdrawiamy,<br/> Zespół Red Rib Restaurant", true);
            mailSender.send(mail);

        } catch (MailException e) {
            e.printStackTrace();
        }
    }
}
