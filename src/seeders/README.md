# Seeder

## Implementation

* cd into src directory to do all things below

``` code = bash
<!-- if you want to create a demo user for the User table -->
$ npx sequelize-cli seed:generate --name demo-user
<!-- running the seeds -->
$ npx sequelize-cli db:seed:all
<!-- undo the seed -->
$ npx sequelize-cli db:seed:undo
```

## Reference

[sequelize-migrations](https://sequelize.org/docs/v6/other-topics/migrations/)
