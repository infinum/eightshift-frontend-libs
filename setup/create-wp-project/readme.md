# Create a new WordPress theme

## Requirements

To have the smoothest development and setup experience, you need to install a few things on your computer. Please install these packages before you start the setup:

- [Node.js](https://nodejs.org/en/)
- [Composer](https://getcomposer.org/)
- [WP-CLI](https://wp-cli.org/)
- [Git](https://git-scm.com/)

Make sure that you have all these packages installed and ready to use on your system. To make sure that they work, run these commands:

- `node -v`
- `composer -v`
- `wp --info`
- `git --version`

If it doesn't return any errors, you are good to go.

## Installation

Navigate to your WordPress theme folder and run the following command:

`npx create-wp-project`

The script will prompt you for a theme name, local development URL (used for BrowserSync) and project description. After that, your new theme will be installed.

After the script is finished, please follow the instructions provided by the setup script.

All additional steps after the initial setup are done using WP_CLI commands, so please make sure that you have WP-CLI set and ready to use.

To make sure you use the latest version of npx command you can add `@latest` flag to the command:

`npx create-wp-project@latest`

## Specify version to create

If you want to specify a version of Eightshift Libs or Frontend Libs to use, you can use add two additional attributes to this command to specify a branch or release to use:

```
--eightshiftLibsBranch
--eightshiftFrontendLibsBranch
```

Example:
If you want to pull the develop branch of the Eightshift Frontend libs and a specific release of the Eightshift Libs:

```
npx create-wp-project --eightshiftLibsBranch="release/6.0.0" --eightshiftFrontendLibsBranch="develop"
```

You can also specify the version of the create-wp-project script like this:

```
npx create-wp-project@2.0.12 --eightshiftLibsBranch="release/6.0.0" --eightshiftFrontendLibsBranch="develop"
```


## Use a different repository

If you want to specify a different repository from where to pull the boilerplate installation, you can use an additional attribute to this command to specify which git repository to use:

```
--eightshiftBoilerplateRepo
--eightshiftBoilerplateBranch
```

Example:
If you want to pull the develop branch of the Eightshift Frontend libs and a specific release of the Eightshift Libs:


```
npx create-wp-project --eightshiftBoilerplateRepo="https://github.com/example-repository/eightshift-boilerplate.git"
```

You can also specify which branch to use like this:


```
npx create-wp-project --eightshiftBoilerplateRepo="https://github.com/example-repository/eightshift-boilerplate.git" --eightshiftBoilerplateBranch="develop"
```

You can get a list of available script arguments by running:

`npx create-wp-project --help`


## Development

To do any development on the actual setup script you can run it locally by using this command:

```
npm run develop
```

This command will run the script from the code directly and it will output the theme/plugin to the setup folder.
