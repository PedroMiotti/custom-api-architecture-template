const fs = require('fs');
const { join } = require('path');
const { program, Option } = require('commander');

const createNewModule = (options) => {
    const { name, orm } = options;

    const moduleName = name || 'module';
    const moduleFolderPath = join(__dirname, '..', 'src/modules');

    const modulePath = join(moduleFolderPath, moduleName);
    const dtoPath = join(modulePath, 'dto');
    const repositoryPath = join(modulePath, 'repository');
    const useCasesPath = join(modulePath, 'useCases');
    const schemasPath = join(modulePath, 'schemas');

    // Creates directories
    fs.mkdirSync(modulePath, { recursive: true });
    fs.mkdirSync(dtoPath, { recursive: true });
    fs.mkdirSync(repositoryPath, { recursive: true });
    fs.mkdirSync(useCasesPath, { recursive: true });
    fs.mkdirSync(schemasPath, { recursive: true });

    // Creates route and controller file
    fs.writeFile(
        join(modulePath, `${moduleName}.controller.ts`),
        `import BaseController from '../../shared/base/BaseController';\n\nexport class ${moduleName}Controller extends BaseController {}`,
        function (err) {
            if (err) throw err;
        },
    );
    fs.writeFile(
        join(modulePath, `${moduleName}.routes.ts`),
        `import express from 'express';\n\nimport { ${moduleName}Controller } from './${moduleName}.controller';\n\nconst router = express.Router();\n\nconst ${lowercaseFirstLetter(
            moduleName,
        )}Controller = new ${moduleName}Controller()\n\nexport default router; `,
        function (err) {
            if (err) throw err;
        },
    );

    // Creates default sequelize files
    if (orm === 'sequelize') {
        fs.mkdirSync(join(repositoryPath, 'sequelize'), { recursive: true });

        fs.writeFile(
            join(join(repositoryPath, 'sequelize'), `${moduleName}.entity.ts`),
            '',
            function (err) {
                if (err) throw err;
            },
        );
        fs.writeFile(
            join(join(repositoryPath, 'sequelize'), `${moduleName}.repository.ts`),
            '',
            function (err) {
                if (err) throw err;
            },
        );
    }

    if (orm === 'prisma') {
        fs.mkdirSync(join(repositoryPath, 'prisma'), { recursive: true });

        // Creates prisma repository implementation
        fs.writeFile(
            join(join(repositoryPath, 'prisma'), `${moduleName}.repository.ts`),
            `import { I${moduleName}Repository } from '../I${moduleName}Repository';\n\nexport class ${moduleName}Repository implements I${moduleName}Repository {}`,
            function (err) {
                if (err) throw err;
            },
        );
    }

    // Creates repository interface
    fs.writeFile(
        join(join(repositoryPath), `I${moduleName}Repository.ts`),
        `export interface I${moduleName}Repository {}`,
        function (err) {
            if (err) throw err;
        },
    );

    // Creates useCase export file
    fs.writeFile(
        join(join(useCasesPath), `index.ts`),
        'export {}',
        function (err) {
            if (err) throw err;
        },
    );
};

function lowercaseFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

program
    .command('g')
    .description('Generates a new resource')
    .argument('<action>')
    .requiredOption('-n, --name <value>', 'Module name')
    .addOption(
        new Option('-o, --orm <value>', 'Which ORM to use')
            .choices(['prisma', 'sequelize'])
            .default('prisma', 'Prisma'),
    )
    .description('Generates a new module')
    .action((action, op) => {
        if (action === 'mod') createNewModule(op);
    });

program.parse(process.argv);
