import {
    GraphQLBoolean,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLString
} from 'graphql';

import RegionalThumbnail from './multimedia';//TODO: Rename Regional to something more generic...
import SubParagraph from './subcontent';

// This is the Sequelize model definition (input type) of the Content table (top content)...
const PageParagraph = new GraphQLInputObjectType({
    name: 'PageParagraph',
    description: 'This represents a PageParagraph',
    fields: () => {
        return {
            id: {
                type: GraphQLInt
            },
            page: {
                type: GraphQLInt
            },
            content: {
                type: GraphQLInt
            },
            ordering: {
                type: GraphQLInt
            },
            box: {
                type: GraphQLBoolean
            },
            heading: {
                type: GraphQLString
            },
            text: {
                type: GraphQLString
            },
            hidden: {
                type: GraphQLBoolean
            },
            collage: {
                type: new GraphQLList(RegionalThumbnail)
            },
            paragraphs: {
                type: new GraphQLList(SubParagraph)
            }
        };
    }
});

export default PageParagraph;