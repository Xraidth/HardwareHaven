import { MikroORM,  } from '@mikro-orm/core'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter'
import { MySqlDriver } from '@mikro-orm/mysql';


export const orm = await MikroORM.init({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  dbName: 'hardware_haven',
  driver: MySqlDriver, 
  clientUrl: `${process.env.DB}`,
  highlighter: new SqlHighlighter(),
  debug: true,
  schemaGenerator: {
    disableForeignKeys: true,
    createForeignKeyConstraints: true,
    ignoreSchema: [], 
  },
});

export const syncSchema = async () => {
  const generator = orm.getSchemaGenerator()
  

  
  /*
  await generator.dropSchema()
  await generator.createSchema()
  */

  await generator.updateSchema()
}