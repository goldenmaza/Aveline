import {
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLString
} from 'graphql';

import MultimediaResourceOutput from '../output/multimedia';

// This is the Multimedia's fields for the QueryBundle definition...
const multimediaFields = {
    type: new GraphQLList(MultimediaResourceOutput),
    args: {
        id: {
            type: GraphQLInt
        },
        page: {
            type: GraphQLInt
        },
        content: {
            type: GraphQLInt
        },
        contact: {
            type: GraphQLInt
        },
        office: {
            type: GraphQLInt
        },
        ordering: {
            type: GraphQLInt
        },
        src: {
            type: GraphQLString
        },
        slideshow: {
            type: GraphQLBoolean
        },
        box: {
            type: GraphQLBoolean
        },
        logo: {
            type: GraphQLBoolean
        },
        hidden: {
            type: GraphQLBoolean
        },
        alt: {
            type: GraphQLString
        },
        title: {
            type: GraphQLString
        },
        aria: {
            type: GraphQLString
        }
    },
    async resolve(root, args, {db}) {
        return await db.models.multimedia.findAll({
            where: args
        });
    }
};

export default multimediaFields;
