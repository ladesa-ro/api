import { InMemoryLRUCache } from "@apollo/utils.keyvaluecache";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";

@Module({
  imports: [
    //
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,

      useGlobalPrefix: true,
      autoSchemaFile: true,
      introspection: true,

      cache: new InMemoryLRUCache({
        maxSize: Math.pow(2, 20) * 100,
        ttl: 5 * 60 * 1000,
      }),
    }),
  ],
})
export class AdapterGraphQLModule {}
