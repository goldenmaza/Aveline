import {
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';

import ContactMultimediaOutput from './multimedia';
import ContactSocialOutput from './social';

// This is the Sequelize model definition (output type) of the Contact table...
const OfficeContactOutput = new GraphQLObjectType({
    name: 'OfficeContactOutput',
    description: 'This represents an OfficeContactOutput',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(contact) {
                    return contact.id;
                }
            },
            office: {
                type: GraphQLInt,
                resolve(contact) {
                    return contact.office;
                }
            },
            ordering: {
                type: GraphQLInt,
                resolve(contact) {
                    return contact.ordering;
                }
            },
            main: {
                type: GraphQLBoolean,
                resolve(contact) {
                    return contact.main;
                }
            },
            title: {
                type: GraphQLString,
                resolve(contact) {
                    return contact.title;
                }
            },
            forename: {
                type: GraphQLString,
                resolve(contact) {
                    return contact.forename;
                }
            },
            surname: {
                type: GraphQLString,
                resolve(contact) {
                    return contact.surname;
                }
            },
            street: {
                type: GraphQLString,
                resolve(contact) {
                    return contact.street;
                }
            },
            postal: {
                type: GraphQLString,
                resolve(contact) {
                    return contact.postal;
                }
            },
            country: {
                type: GraphQLString,
                resolve(contact) {
                    return contact.country;
                }
            },
            phone: {
                type: GraphQLString,
                resolve(contact) {
                    return contact.phone;
                }
            },
            email: {
                type: GraphQLString,
                resolve(contact) {
                    return contact.email;
                }
            },
            hidden: {
                type: GraphQLBoolean,
                resolve(contact) {
                    return contact.hidden;
                }
            },
            portraits: {
                args: {
                    hidden: {
                        type: GraphQLBoolean
                    },
                    box: {
                        type: GraphQLBoolean
                    }
                },
                type: new GraphQLList(ContactMultimediaOutput),
                resolve(parent, args, {contactPortraitsLoader}, info) {
                    const data = {
                        id: parent.id,
                        args: args
                    };
                    return contactPortraitsLoader.load(data);
                }
            },
            profiles: {
                args: {
                    hidden: {
                        type: GraphQLBoolean
                    }
                },
                type: new GraphQLList(ContactSocialOutput),
                resolve(parent, args, {contactProfilesLoader}, info) {
                    const data = {
                        id: parent.id,
                        args: args
                    };
                    return contactProfilesLoader.load(data);
                }
            }
        };
    }
});

export default OfficeContactOutput;
