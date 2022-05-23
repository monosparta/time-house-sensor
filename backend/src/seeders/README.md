# Seeder

## Implementation

* cd into src directory to do all things below
* watch out the reference Seats.memberId -> Members.id, so please seed Member-seeder first, then seed Seats-seeder

``` code = bash
<!-- if you want to create a demo user for the User table -->
$ npx sequelize-cli seed:generate --name demo-user
<!-- running the seeds -->
$ npx sequelize-cli db:seed:all
<!-- if you want to run specific seeder files -->
$ npx sequelize-cli db:seed --seed <filename>.js
<!-- undo the seed -->
$ npx sequelize-cli db:seed:undo
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
```

## Reference

[sequelize-migrations](https://sequelize.org/docs/v6/other-topics/migrations/)
