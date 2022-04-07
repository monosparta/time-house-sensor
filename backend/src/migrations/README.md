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
```

## Reference

[sequelize-migrations](https://sequelize.org/docs/v6/other-topics/migrations/)
