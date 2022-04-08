# Migration tips

## Implementation

* cd into src directory to do all things below

``` code = bash
<!-- generate a table schema -->
$ npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
<!-- if you want to migrate tables -->
$ npx sequelize-cli db:migrate
<!-- if you want to run specific migration files -->
$ npx sequelize-cli db:migrate --to <filename>.js
<!-- if you want to undo -->
$ npx sequelize-cli db:migrate:undo
<!-- Options -->
  --version          Show version number                                                                       [boolean]
  --help             Show help                                                                                 [boolean]
  --env              The environment to run the command in                             [string] [default: "development"]
  --config           The path to the config file                                                                [string]
  --options-path     The path to a JSON file with additional options                                            [string]
  --migrations-path  The path to the migrations folder                                  [string] [default: "migrations"]
  --seeders-path     The path to the seeders folder                                        [string] [default: "seeders"]
  --models-path      The path to the models folder                                          [string] [default: "models"]
  --url              The database connection string to use. Alternative to using --config files                 [string]
  --debug            When available show various debug information                            [boolean] [default: false]
  --to               Migration name to run migrations until                                                     [string]
  --from             Migration name to start migrations from (excluding)                                        [string]
--
```

## Reference

[sequelize-migrations](https://sequelize.org/docs/v6/other-topics/migrations/)
