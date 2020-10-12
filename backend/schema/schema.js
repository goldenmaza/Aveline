import {
    GraphQLObjectType,
    GraphQLSchema,
} from 'graphql';

// Main fields...
import pageFields from './fields/page';
import contentFields from './fields/content';
import multimediaFields from './fields/multimedia';
import officeFields from './fields/office';
import contactFields from './fields/contact';
import socialFields from './fields/social';
import navigationFields from './fields/navigation';

// Declaration of the Query tag for GraphQL...
const QueryBundle = new GraphQLObjectType({
    name: 'Query',
    description: 'This is the root query',
    fields: () => {
        return {
            pages: pageFields,
            paragraphs: contentFields,
            collage: multimediaFields,
            offices: officeFields,
            social: socialFields,
            navigation: navigationFields,
        };
    }
});

const Schema = new GraphQLSchema({
    query: QueryBundle
});

export default Schema;
