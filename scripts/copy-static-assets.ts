import * as shell from "shelljs";

shell.cp("-R", "public/", "dist/public/");
shell.cp("src/package.json", "dist/package.json");
shell.cp("src/yarn.lock", "dist/yarn.lock");
shell.cp("src/app.yaml", "dist/app.yaml");
