import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,  // Especificar el driver
      autoSchemaFile: 'schema.gql',  // Generar automáticamente el esquema GraphQL
    }),
    RecipeModule,  // Importar el módulo que creamos para recetas
  ],
})
export class AppModule {}
