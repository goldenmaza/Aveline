import {
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLString
} from 'graphql';

import Office from '../types/office';
import RegionalThumbnail from '../inputs/multimedia';
import RegionalEmployee from '../inputs/contact';

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
            type: RegionalThumbnail
        },
        employees: {
            type: RegionalEmployee
        }
    },
    async resolve(root, args) {
        return await db.models.office.findAll({
            include: [{
                all: true,
                nested: true
//                model: [db.models.multimedia, db.models.contact],
//                as: ["thumbnail", "employees"],
//                required: false,
//                all: true
            }]
        });
    }
};

export default officeFields;
