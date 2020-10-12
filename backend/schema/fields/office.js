import {
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLString
} from 'graphql';

import Office from '../types/office';
import RegionalThumbnail from '../inputs/multimedia';//TODO: Rename Regional to something more generic...
import RegionalEmployee from '../inputs/contact';
import RegionalSocial from '../inputs/social';

import db from '../db';

// This is the Office's fields for the QueryBundle definition...
const officeFields = {
    type: new GraphQLList(Office),
    args: {
        id: {
            type: GraphQLInt
        },
        ordering: {
            type: GraphQLInt
        },
        main: {
            type: GraphQLBoolean
        },
        region: {
            type: GraphQLString
        },
        locale: {
            type: GraphQLString
        },
        label: {
            type: GraphQLString
        },
        orgnr: {
            type: GraphQLString
        },
        hidden: {
            type: GraphQLBoolean
        },
        thumbnail: {
            args: {
                hidden: {
                    type: GraphQLBoolean
                }
            },
            type: RegionalThumbnail
        },
        employees: {
            args: {
                hidden: {
                    type: GraphQLBoolean
                }
            },
            type: new GraphQLList(RegionalEmployee)
        },
        socials: {
            args: {
                hidden: {
                    type: GraphQLBoolean
                }
            },
            type: new GraphQLList(RegionalSocial)
        }
    },
    async resolve(root, args) {
        return await db.models.office.findAll({
            where: args
        });
    }
};

export default officeFields;
