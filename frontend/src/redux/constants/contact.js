export const contactState = {
    loading: true,
    offices: null,
    target: null,
    level: process.env.REACT_APP_DOC_FOOTER_CONTACT_LEVEL,
    label: process.env.REACT_APP_DOC_FOOTER_CONTACT_LABEL
};

export const navigationState = {
};

export const REQ_CONTACT_DETAILS = 'REQ_CONTACT_DETAILS';
export const RCV_CONTACT_DETAILS = 'RCV_CONTACT_DETAILS';
export const ERR_CONTACT_DETAILS = 'ERR_CONTACT_DETAILS';
export const TOGGLE_CONTACT_OFFICE = 'TOGGLE_CONTACT_OFFICE';
