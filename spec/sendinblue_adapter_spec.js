/**
 * @module Integration tests for SendinBlue adapter
 * @description Uses different configuration to send tests emails
 */
describe("SendinBlue adapter sending tests", function() {
  /** BEGIN TO SET YOUR OWN VALUES TO TEST THE EMAILS BY YOUR OWN **/

  // The api key of the SendinBlue account.
  // WARNING: USE ENVIRONMENT VARIABLE HERE !!! DO NOT EXPOSE YOUR API_KEY !!!
  var apiKey = "YOUR_SENDINBLUE_API_KEY";

  // the application attributes
  var appName = "My App"; // replace it with the name of your application
  var fromName = "The Sender"; // replace it with the name of the sender you want
  var fromEmail = "mail@yourdomain.com"; // replace it with a sender of the SendinBlue account
  var passwordLink = "https://github.com/password"; // replace it with any link to test
  var verificationLink = "https://github.com/verification"; // replace it with any link to test
  var verificationEmailTemplateId_en = 1; // id of your english template for the verification link email
  var verificationEmailTemplateId_fr = 2; // id of your french template for the verification link email
  var passwordResetTemplateId_en = 3; // id of your english template for the reset password email
  var passwordResetTemplateId_fr = 4; // id of your french template for the reset password email

  // dummy user for the tests
  var user = {
    email: "mail@yourdomain.com", // replace it with your email address
    username: "mail@yourdomain.com", // replace it with your email address
    get: function(key) {
      return this[key];
    }
  };

  /** CUSTOMIZATION PART ENDS HERE **/

  afterEach(function() {
    delete user.locale;
  });


  /**
   * sendMail
   */
  describe("sendMail", function() {
    var adapter;

    beforeEach(function() {
      adapter = require("../index.js")({
       apiKey: apiKey,
       fromName: fromName,
       fromEmail: fromEmail,
       translation: {
         default: "en",
         locale: "locale"
       }
      });
    });

    var it_sendMail = function(done) {
      adapter.sendMail({
        appName: appName,
        link: "https://github.com/",
        to: user.email,
        subject: "[Test] %APP_NAME%",
        text: "Use your {EMAIL} here for %APP_NAME% : %LINK%",
        html: "Use your {EMAIL} <a href=\"%LINK%\">here</a> for <b>%APP_NAME%</b>"

      }).then(function() {
        done();

      }).catch(function(error) {
        throw new Error(error);
        done();
      });
    };


    it("The user has no explicit locale set", function(done) {
      it_sendMail(done);
    });


    it("The user is an explicit english user", function(done) {
      user.locale = "en";
      it_sendMail(done);
    });


    it("The user is an explicit german user", function(done) {
      user.locale = "de";
      it_sendMail(done);
    });


    it("The user is an explicit french user", function(done) {
      user.locale = "fr";
      it_sendMail(done);
    });
  });


  /**
   * sendVerificationEmail
   */
  describe("sendVerificationEmail", function() {
    var adapter;

    var it_sendVerificationEmail = function(done) {
      adapter.sendVerificationEmail({
        user: user,
        appName: appName,
        link: verificationLink

      }).then(function() {
        done();

      }).catch(function(error) {
        throw new Error(error);
        done();
      });
    };

    /**
     * sendVerificationEmail - Use template
     */
    describe("Use template", function() {

      beforeEach(function() {
        adapter = require("../index.js")({
         apiKey: apiKey,
         translation: {
           default: "en",
           locale: "locale"
         },
         verificationEmailTemplateId: {
           en: verificationEmailTemplateId_en,
           fr: verificationEmailTemplateId_fr
         }
        });
      });


      it("The user has no explicit locale set", function(done) {
        it_sendVerificationEmail(done);
      });


      it("The user is an explicit english user", function(done) {
        user.locale = "en";
        it_sendVerificationEmail(done);
      });


      it("The user is an explicit german user", function(done) {
        user.locale = "de";
        it_sendVerificationEmail(done);
      });


      it("The user is an explicit french user", function(done) {
        user.locale = "fr";
        it_sendVerificationEmail(done);
      });
    });


    /**
     * sendVerificationEmail - Use plain/html options
     */
    describe("Use plain/html options", function() {

      beforeEach(function() {
        adapter = require("../index.js")({
         apiKey: apiKey,
         fromName: fromName,
         fromEmail: fromEmail,
         translation: {
           default: "en",
           locale: "locale"
         },
         verificationEmailSubject: {
           en: "Verify your email on %APP_NAME%",
           fr: "Vérifier votre adresse e-mail sur %APP_NAME%"
         },
         verificationEmailTextPart: {
           en: "Hi,\n\nYou are being asked to confirm the e-mail address {EMAIL} with %APP_NAME%\n\nClick here to confirm it: %LINK%",
           fr: "Bonjour,\n\nMerci de confirmer l'adresse e-mail {EMAIL} avec %APP_NAME%\n\nCliquez ici pour confirmer : %LINK%"
         },
         verificationEmailHtmlPart: {
           en: "Hi,<p>You are being asked to confirm the e-mail address {EMAIL} with <b>%APP_NAME%</b></p><p>Click <a href=\"%LINK%\">here</a> to confirm it.</p>",
           fr: "Bonjour,<p>Merci de confirmer l'adresse e-mail {EMAIL} avec <b>%APP_NAME%</b></p><p>Cliquez <a href=\"%LINK%\">ici</a> pour confirmer.</p>"
         }
        });
      });


      it("The user has no explicit locale set", function(done) {
        it_sendVerificationEmail(done);
      });


      it("The user is an explicit english user", function(done) {
        user.locale = "en";
        it_sendVerificationEmail(done);
      });


      it("The user is an explicit german user", function(done) {
        user.locale = "de";
        it_sendVerificationEmail(done);
      });


      it("The user is an explicit french user", function(done) {
        user.locale = "fr";
        it_sendVerificationEmail(done);
      });
    });
  });


  /**
   * sendPasswordResetEmail
   */
  describe("sendPasswordResetEmail", function() {
    var adapter;

    var it_sendPasswordResetEmail = function(done) {
      adapter.sendPasswordResetEmail({
        user: user,
        appName: appName,
        link: passwordLink

      }).then(function() {
        done();

      }).catch(function(error) {
        throw new Error(error);
        done();
      });
    };

    /**
     * sendPasswordResetEmail - Use template
     */
    describe("Use template", function() {

      beforeEach(function() {
        adapter = require("../index.js")({
         apiKey: apiKey,
         translation: {
           default: "en",
           locale: "locale"
         },
         passwordResetTemplateId: {
           en: passwordResetTemplateId_en,
           fr: passwordResetTemplateId_fr
         }
        });
      });


      it("The user has no explicit locale set", function(done) {
        it_sendPasswordResetEmail(done);
      });


      it("The user is an explicit english user", function(done) {
        user.locale = "en";
        it_sendPasswordResetEmail(done);
      });


      it("The user is an explicit german user", function(done) {
        user.locale = "de";
        it_sendPasswordResetEmail(done);
      });


      it("The user is an explicit french user", function(done) {
        user.locale = "fr";
        it_sendPasswordResetEmail(done);
      });
    });


    /**
     * sendPasswordResetEmail - Use plain/html options
     */
    describe("Use plain/html options", function() {

      beforeEach(function() {
        adapter = require("../index.js")({
         apiKey: apiKey,
         fromName: fromName,
         fromEmail: fromEmail,
         translation: {
           default: "en",
           locale: "locale"
         },
         passwordResetSubject: {
           en: "Reset My Password on %APP_NAME%",
           fr: "Réinitialiser mon mot de passe sur %APP_NAME%"
         },
         passwordResetTextPart: {
           en: "Hello,\n\nYou requested to reset your password for %APP_NAME%.\n\nPlease, click here to set a new password: %LINK%",
           fr: "Bonjour,\n\nVous avez demandé la réinitialiser de votre mot de passe pour %APP_NAME%.\n\nMerci de cliquer ici pour choisir un nouveau mot de passe : %LINK%"
         },
         passwordResetHtmlPart: {
           en: "Hi,<p>You requested to reset your password for <b>%APP_NAME%</b>.</p><p>Please, click <a href=\"%LINK%\">here</a> to set a new password.</p>",
           fr: "Bonjour,<p>Vous avez demandé la réinitialiser de votre mot de passe pour <b>%APP_NAME%</b>.</p><p>Merci de cliquer <a href=\"%LINK%\">ici</a> pour choisir un nouveau mot de passe.</p>"
         },
        });
      });


      it("The user has no explicit locale set", function(done) {
        it_sendPasswordResetEmail(done);
      });


      it("The user is an explicit english user", function(done) {
        user.locale = "en";
        it_sendPasswordResetEmail(done);
      });


      it("The user is an explicit german user", function(done) {
        user.locale = "de";
        it_sendPasswordResetEmail(done);
      });


      it("The user is an explicit french user", function(done) {
        user.locale = "fr";
        it_sendPasswordResetEmail(done);
      });
    });
  });
});
