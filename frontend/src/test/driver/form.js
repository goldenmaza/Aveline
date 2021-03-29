import ContactForm from '../components/form.page';

describe('validates the contact form', () => {// TODO: Possible to use env regex for automatic validation?
    beforeEach(() => {
        ContactForm.open('http://www.hellstrand.org');///p/contact
    });

    it('is validating the Regex used for the Forename', () => {
        //Valid alphabetic characters:z to a, Z to A.
        ContactForm.forenameInput.setValue('xxñ');
        expect(ContactForm.forenameInput).toHaveAttribute('class', 'invalid');
        ContactForm.forenameInput.setValue('xxÑ');
        expect(ContactForm.forenameInput).toHaveAttribute('class', 'invalid');
        //Valid others characters:ö, å, ä, Ö, Å, Ä, dot, space.
        ContactForm.forenameInput.setValue('xö-');
        expect(ContactForm.forenameInput).toHaveAttribute('class', 'invalid');
        ContactForm.forenameInput.setValue('xö1');
        expect(ContactForm.forenameInput).toHaveAttribute('class', 'invalid');
        //Valid range limit:Between 2 and 50.
        ContactForm.forenameInput.setValue(generateInvalidInput(1));
        expect(ContactForm.forenameInput).toHaveAttribute('class', 'invalid');
        ContactForm.forenameInput.setValue(generateInvalidInput(51));
        expect(ContactForm.forenameInput).toHaveAttribute('class', 'invalid');
    });

    it('is validating the Regex used for the Surname', () => {
        //Valid alphabetic characters:z to a, Z to A.
        ContactForm.surnameInput.setValue('xxñ');
        expect(ContactForm.surnameInput).toHaveAttribute('class', 'invalid');
        ContactForm.surnameInput.setValue('xxÑ');
        expect(ContactForm.surnameInput).toHaveAttribute('class', 'invalid');
        //Valid others characters:ö, å, ä, Ö, Å, Ä, dot, space.
        ContactForm.surnameInput.setValue('ö-');
        expect(ContactForm.surnameInput).toHaveAttribute('class', 'invalid');
        ContactForm.surnameInput.setValue('ö1');
        expect(ContactForm.surnameInput).toHaveAttribute('class', 'invalid');
        //Valid range limit:Between 2 and 50.
        ContactForm.surnameInput.setValue(generateInvalidInput(1));
        expect(ContactForm.surnameInput).toHaveAttribute('class', 'invalid');
        ContactForm.surnameInput.setValue(generateInvalidInput(51));
        expect(ContactForm.surnameInput).toHaveAttribute('class', 'invalid');
    });

    it('is validating the Regex used for the Address', () => {
        //Valid alphabetic characters:z to a, Z to A.
        ContactForm.addressInput.setValue('xxñ');
        expect(ContactForm.addressInput).toHaveAttribute('class', 'invalid');
        ContactForm.addressInput.setValue('xxÑ');
        expect(ContactForm.addressInput).toHaveAttribute('class', 'invalid');
        //Valid others characters:ö, å, ä, Ö, Å, Ä, dot, space.
        ContactForm.addressInput.setValue('ö-');
        expect(ContactForm.addressInput).toHaveAttribute('class', 'invalid');
        ContactForm.addressInput.setValue('ö*');
        expect(ContactForm.addressInput).toHaveAttribute('class', 'invalid');
        //Valid digits:0 to 9.
        //Valid range limit:Between 3 and 100.
        ContactForm.addressInput.setValue(generateInvalidInput(2));
        expect(ContactForm.addressInput).toHaveAttribute('class', 'invalid');
        ContactForm.addressInput.setValue(generateInvalidInput(101));
        expect(ContactForm.addressInput).toHaveAttribute('class', 'invalid');
    });

    it('is validating the Regex used for the Phone', () => {
        //Valid digits:0 to 9.
        //Valid others:hyphen, plus sign, space.
        ContactForm.phoneInput.setValue('++_');
        expect(ContactForm.phoneInput).toHaveAttribute('class', 'invalid');
        ContactForm.phoneInput.setValue('++X');
        expect(ContactForm.phoneInput).toHaveAttribute('class', 'invalid');
        //Valid range limit:Between 3 and 25.
        ContactForm.phoneInput.setValue(generateInvalidInput(2));
        expect(ContactForm.phoneInput).toHaveAttribute('class', 'invalid');
        ContactForm.phoneInput.setValue(generateInvalidInput(26));
        expect(ContactForm.phoneInput).toHaveAttribute('class', 'invalid');
    });

    it('is validating the Regex used for the E-mail', () => {
        //e.g. username + AT + domain + DOT + suffix
        //Username:z to a, Z to A. dot. Between 2 and 50.
        ContactForm.emailInput.setValue('foreñ');
        expect(ContactForm.emailInput).toHaveAttribute('class', 'invalid');
        ContactForm.emailInput.setValue('foreÑ');
        expect(ContactForm.emailInput).toHaveAttribute('class', 'invalid');
        ContactForm.emailInput.setValue('forename,surname');
        expect(ContactForm.emailInput).toHaveAttribute('class', 'invalid');
        ContactForm.emailInput.setValue(generateInvalidInput(1));
        expect(ContactForm.emailInput).toHaveAttribute('class', 'invalid');
        ContactForm.emailInput.setValue(generateInvalidInput(51));
        expect(ContactForm.emailInput).toHaveAttribute('class', 'invalid');
        //Domain:z to a, Z to A. dot. Between 2 and 50.
        ContactForm.emailInput.setValue('forename.surname@domainñ');
        expect(ContactForm.emailInput).toHaveAttribute('class', 'invalid');
        ContactForm.emailInput.setValue('forename.surname@domainÑ');
        expect(ContactForm.emailInput).toHaveAttribute('class', 'invalid');
        ContactForm.emailInput.setValue('forename.surname@domain,com');
        expect(ContactForm.emailInput).toHaveAttribute('class', 'invalid');
        ContactForm.emailInput.setValue(generateInvalidInput(1));
        expect(ContactForm.emailInput).toHaveAttribute('class', 'invalid');
        ContactForm.emailInput.setValue(generateInvalidInput(51));
        expect(ContactForm.emailInput).toHaveAttribute('class', 'invalid');
        //Suffix:z to a, Z to A. dot. Between 2 and 13.
        ContactForm.emailInput.setValue('forename.surname@domain.cñ');
        expect(ContactForm.emailInput).toHaveAttribute('class', 'invalid');
        ContactForm.emailInput.setValue('forename.surname@domain.cÑ');
        expect(ContactForm.emailInput).toHaveAttribute('class', 'invalid');
        ContactForm.emailInput.setValue('forename.surname@domain.c,');
        expect(ContactForm.emailInput).toHaveAttribute('class', 'invalid');
        ContactForm.emailInput.setValue(generateInvalidInput(1));
        expect(ContactForm.emailInput).toHaveAttribute('class', 'invalid');
        ContactForm.emailInput.setValue(generateInvalidInput(14));
        expect(ContactForm.emailInput).toHaveAttribute('class', 'invalid');
    });

    it('is validating the Regex used for the Purpose', () => {
        //Valid alphabetic characters:z to a, Z to A.
        ContactForm.purposeInput.setValue('xxñ');
        expect(ContactForm.purposeInput).toHaveAttribute('class', 'invalid');
        ContactForm.purposeInput.setValue('xxÑ');
        expect(ContactForm.purposeInput).toHaveAttribute('class', 'invalid');
        //Valid others:ö, å, ä, Ö, Å, Ä, dot, space.
        ContactForm.purposeInput.setValue('ö-');
        expect(ContactForm.purposeInput).toHaveAttribute('class', 'invalid');
        ContactForm.purposeInput.setValue('ö*');
        expect(ContactForm.purposeInput).toHaveAttribute('class', 'invalid');
        //Valid digits:0 to 9.
        //Valid range limit:Between 2 and 50.
        ContactForm.purposeInput.setValue(generateInvalidInput(1));
        expect(ContactForm.purposeInput).toHaveAttribute('class', 'invalid');
        ContactForm.purposeInput.setValue(generateInvalidInput(51));
        expect(ContactForm.purposeInput).toHaveAttribute('class', 'invalid');
    });

    it('is validating the Regex used for the Message', () => {
        //Valid alphabetic characters:z to a, Z to A.
        ContactForm.messageInput.setValue('xxñ');
        expect(ContactForm.messageInput).toHaveAttribute('class', 'invalid');
        ContactForm.messageInput.setValue('xxÑ');
        expect(ContactForm.messageInput).toHaveAttribute('class', 'invalid');
        //Valid others:ö, å, ä, Ö, Å, Ä, dot, space.
        ContactForm.messageInput.setValue('ö-');
        expect(ContactForm.messageInput).toHaveAttribute('class', 'invalid');
        ContactForm.messageInput.setValue('ö*');
        expect(ContactForm.messageInput).toHaveAttribute('class', 'invalid');
        //Valid digits:0 to 9.
        //Valid range limit:Between 5 and 5000.
        ContactForm.messageInput.setValue(generateInvalidInput(4));
        expect(ContactForm.messageInput).toHaveAttribute('class', 'invalid');
        ContactForm.messageInput.setValue(generateInvalidInput(5001));
        expect(ContactForm.messageInput).toHaveAttribute('class', 'invalid');
    });

    it('is validating the Clear button', () => {
        ContactForm.forenameInput.setValue('xxx');
        ContactForm.surnameInput.setValue('xxx');
        ContactForm.addressInput.setValue('xxx');
        ContactForm.phoneInput.setValue('xxx');
        ContactForm.emailInput.setValue('xxx');
        ContactForm.purposeInput.setValue('xxx');
        ContactForm.messageInput.setValue('xxx');
        assertEquals(3, ContactForm.forenameInput.getValue().length());
        assertEquals(3, ContactForm.surnameInput.getValue().length());
        assertEquals(3, ContactForm.addressInput.getValue().length());
        assertEquals(3, ContactForm.phoneInput.getValue().length());
        assertEquals(3, ContactForm.emailInput.getValue().length());
        assertEquals(3, ContactForm.purposeInput.getValue().length());
        assertEquals(3, ContactForm.messageInput.getValue().length());
        ContactForm.clear();
        assertEquals(0, ContactForm.forenameInput.getValue().length());
        assertEquals(0, ContactForm.surnameInput.getValue().length());
        assertEquals(0, ContactForm.addressInput.getValue().length());
        assertEquals(0, ContactForm.phoneInput.getValue().length());
        assertEquals(0, ContactForm.emailInput.getValue().length());
        assertEquals(0, ContactForm.purposeInput.getValue().length());
        assertEquals(0, ContactForm.messageInput.getValue().length());
    });

    it('is validating the Help button', () => {
        ContactForm.help();
        expect(ContactForm.displayHelp).toExist();
        expect(ContactForm.displayHelp).toHaveText(process.env.REACT_APP_DOC_HELP_SECTION_LABEL);
        ContactForm.help();
        assertEquals(false, ContactForm.displayHelp.isExisting());
    });

    it('is validating normal use of the form', () => {
        assertEquals(false, ContactForm.submitButton.toBeClickable());
        ContactForm.forenameInput.setValue('Forename');
        ContactForm.surnameInput.setValue('Surname');
        ContactForm.addressInput.setValue("Address 123");
        ContactForm.phoneInput.setValue('000-12345');
        ContactForm.emailInput.setValue('forename.surname@domain.com');
        ContactForm.purposeInput.setValue('Important message');
        ContactForm.messageInput.setValue('Hi, I have an important message for you... Kind regards, Forename');
        expect(ContactForm.submitButton).toBeClickable();
        ContactForm.submit();
        assertEquals(0, ContactForm.forenameInput.getValue().length());
        assertEquals(0, ContactForm.surnameInput.getValue().length());
        assertEquals(0, ContactForm.addressInput.getValue().length());
        assertEquals(0, ContactForm.phoneInput.getValue().length());
        assertEquals(0, ContactForm.emailInput.getValue().length());
        assertEquals(0, ContactForm.purposeInput.getValue().length());
        assertEquals(0, ContactForm.messageInput.getValue().length());
        assertEquals(false, ContactForm.submitButton.toBeClickable());
    });
});

function generateInvalidInput(max) {
    let invalidInput = '';

    for (let i = 0; i < max; i++) {
        invalidInput += 'x';
    }

    return invalidInput;
}
