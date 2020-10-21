import {
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLString
} from 'graphql';

import Social from '../output/social';

// This is the Social's fields for the QueryBundle definition...
const socialFields = {
    type: new GraphQLList(Social),
    args: {
        id: {
            type: GraphQLInt
        },
        contact: {
            type: GraphQLInt
        },
        office: {
            type: GraphQLInt
        },
        url: {
            type: GraphQLString
        },
        media: {
            type: GraphQLString
        },
        label: {
            type: GraphQLString
        },
        hidden: {
            type: GraphQLBoolean
        }
    },
    async resolve(root, args, {db}) {
        return await db.models.social.findAll({
            where: args
        });
    }
};

export default socialFields;